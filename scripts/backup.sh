#!/bin/bash
# Taegliches Backup von SQLite-DB + hochgeladenen Medien.
# Lauft auf dem VPS via cron. Aufbewahrung: 14 Tage rolling.
#
# Cron-Eintrag (auf VPS als root): crontab -e
#   0 3 * * * /opt/fristd-bau-website/scripts/backup.sh >> /var/log/fristd-backup.log 2>&1

set -euo pipefail

STACK_NAME="fristd-bau-website"
BACKUP_DIR="/opt/fristd-bau-backups"
RETENTION_DAYS=14
STAMP=$(date +%Y%m%d-%H%M%S)

mkdir -p "$BACKUP_DIR"

# 1) SQLite-Datei aus dem Volume holen (sauber: SQLite-eigenes .backup-Command)
docker exec "$STACK_NAME" sh -c \
  'sqlite3 /app/data/payload.db ".backup /tmp/backup.db" 2>/dev/null || cp /app/data/payload.db /tmp/backup.db'
docker cp "$STACK_NAME":/tmp/backup.db "$BACKUP_DIR/db-$STAMP.db"
docker exec "$STACK_NAME" rm -f /tmp/backup.db

# 2) Medien-Volume tar.gz
docker run --rm -v "${STACK_NAME}_fristd-media":/media -v "$BACKUP_DIR":/backup alpine \
  tar -czf "/backup/media-$STAMP.tar.gz" -C / media

# 3) Rotation: alles aelter als RETENTION_DAYS loeschen
find "$BACKUP_DIR" -type f \( -name "db-*.db" -o -name "media-*.tar.gz" \) \
  -mtime +$RETENTION_DAYS -delete

echo "[$(date)] Backup OK -> $BACKUP_DIR/db-$STAMP.db + media-$STAMP.tar.gz"
