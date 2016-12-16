import React from 'react'
import Project from './Project'
import { startCase } from 'lodash'

export default function ProjectGroup ({title, description, projects = []}) {
  if (!projects.length) return

  return (
    <div className="project-group">
      <h1>
        {startCase(title)}

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
