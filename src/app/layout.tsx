import AuthCheck from "./auth-check";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthCheck />
        {children}
      </body>
    </html>
  );
}
