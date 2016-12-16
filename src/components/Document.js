import React from 'react'
import Main from './Main'

export default function Document (props) {
  return (
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width" />
        <title>Nic Aitch - Frontend Engineer</title>
        <link rel="stylesheet" href="main.css" />
      </head>
      <body>
        <Main {...props} />
        <script src="client.js" />
      </body>
    </html>
  )
}
