import React from 'react'

export default function Project (props) {
  return (
    <div className="project">
      <div className="actions">
        <nav>
          <a href={props.url}>Code</a>
          {props.homepage && <a href={props.homepage}>Homepage</a>}
        </nav>
      </div>

      <a href={props.url} className="details">
        <h4 className="title">
          {props.isOwner ? props.name : props.fullName}
        </h4>
        <p>
          {props.description}
        </p>
      </a>
    </div>
  )
}
