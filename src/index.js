import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import Document from './components/Document'

import './CNAME'
import './favicon.ico'
import './styles/main.scss'

export default (locals) => {
  const html = renderToStaticMarkup(createElement(Document, locals))

  return Promise.resolve('<!DOCTYPE html>' + html)
}
