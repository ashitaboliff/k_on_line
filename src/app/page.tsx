import { Hono } from 'hono'
import { renderToString } from 'react-dom/server'
import { html, raw } from 'hono/html'
import React from 'react'

const Page = () => {
  return (
    <html>
      <head>
        <title>My Page</title>
      </head>
      <body>
        <h1>Hello World</h1>
      </body>
    </html>
  )
}

export default Page