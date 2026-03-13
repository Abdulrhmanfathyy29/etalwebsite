// The (auth) route group has no shared layout chrome.
// Pages here are completely isolated from both the public site layout
// (Navbar/Footer) and the admin layout (sidebar/header).
export default function AuthGroupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
