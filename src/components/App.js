import React from 'react'

const requireImage = require.context('../images')

export default function App (props) {
  return (
    <div className="app">
      <a href={props.url} className="details">
        <div className="icon">
          {props.icon ? (
            <img src={requireImage('./' + props.icon)} />
          ) : (
            <div className="icon-placeholder" />
          )}
        </div>

        <h4 className="title">
          {props.name}
        </h4>
      </a>
    </div>
  )
}
