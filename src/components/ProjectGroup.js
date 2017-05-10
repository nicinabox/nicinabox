import React from 'react'
import Project from './Project'

export default function ProjectGroup ({title, description, projects = []}) {
  if (!projects.length) return null

  return (
    <div className="project-group">
      <h1>
        {title}

        <small className="text-muted description">
          {description}
        </small>
      </h1>

      <div className="row">
        {projects.map((p, i) => {
          return (
            <div key={i} className="col-sm-4 project-container">
              <Project {...p} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
