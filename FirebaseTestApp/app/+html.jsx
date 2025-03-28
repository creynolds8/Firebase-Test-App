export default function Root({children}) {
  // this defines meta tags for the whole site regardless of endpoint 
  // but is picked up by Feacbook scraper
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:description" content="___PLACEHOLDER___"/>
        <meta property="og:title" content="___PLACEHOLDER___"/>
        <meta property="og:image" content="___PLACEHOLDER___"/>
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}