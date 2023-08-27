export const metadata = {
  title: "Tile Game",
  icons: {
    icon: "/favicon.ico"
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
