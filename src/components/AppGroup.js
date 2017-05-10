import React from 'react'
import App from './App'

export default function ProjectGroup ({title, description, projects = []}) {
  if (!projects.length) return null

  return (
    <div className="app-group">
      <h1>
        {title}

        <small className="text-muted description">
          {description}
        </small>
      </h1>

      <div className="row">
        {projects.map((p, i) => {
          return (
            <div key={i} className="col-xs-6 col-sm-4 apps-container">
              <App {...p} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
