// Root-Layout — bewusst pass-through, weil sich (frontend) und (payload)
// jeweils selbst um <html>/<body> kuemmern. Standardpattern bei Payload.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
