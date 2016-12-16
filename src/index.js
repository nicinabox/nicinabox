// import { h } from 'preact'
// import render from 'preact-render-to-string'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import Document from './components/Document'

import './styles/main.scss'

export default (locals) => {
  const html = renderToStaticMarkup(createElement(Document, locals))

  return Promise.resolve('<!DOCTYPE html>' + html)
}
