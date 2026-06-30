#!/bin/bash
# Restore aus einem Backup.
# Aufruf:  ./restore.sh <backup-stempel>
# Beispiel: ./restore.sh 20260701-030000
#
# WARNUNG: Ueberschreibt die laufende DB und Medien. Container wird kurz gestoppt.

set -euo pipefail

if [ -z "${1:-}" ]; then
  echo "Aufruf: $0 <stempel>"
  echo "Verfuegbare Backups:"
  ls /opt/fristd-bau-backups/ | grep -oE '[0-9]{8}-[0-9]{6}' | sort -u
  exit 1
fi

STAMP="$1"
STACK_NAME="fristd-bau-website"
BACKUP_DIR="/opt/fristd-bau-backups"

DB_FILE="$BACKUP_DIR/db-$STAMP.db"
MEDIA_FILE="$BACKUP_DIR/media-$STAMP.tar.gz"

if [ ! -f "$DB_FILE" ] || [ ! -f "$MEDIA_FILE" ]; then
  echo "FEHLER: Backup-Dateien fuer Stempel $STAMP nicht gefunden."
  exit 1
fi

echo "Container stoppen ..."
docker stop "$STACK_NAME"

echo "DB zuruecksetzen ..."
docker cp "$DB_FILE" "$STACK_NAME":/app/data/payload.db

echo "Medien zuruecksetzen ..."
docker run --rm -v "${STACK_NAME}_fristd-media":/media -v "$BACKUP_DIR":/backup alpine \
  sh -c "rm -rf /media/* && tar -xzf /backup/media-$STAMP.tar.gz -C /"

echo "Container neu starten ..."
docker start "$STACK_NAME"

echo "Restore fertig."
