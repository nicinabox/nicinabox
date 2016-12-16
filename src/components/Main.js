import React from 'react'
import Aside from './Aside'
import ProjectGroup from './ProjectGroup'
import Footer from './Footer'

export default function Main (props) {
  let { projects } = props

  return (
    <div id="root" className="container">
      <div className="row">
        <div className="col-sm-3">
          <Aside />
        </div>

        <div className="col-sm-8 col-sm-offset-1">
          {/* <ProjectGroup
            title="Active Projects"
            description="Last 30 days"
            projects={props.activeProjects} />

          <ProjectGroup
            title="Recent Projects"
            description="Last 30 days"
            projects={props.currentProjects} />

          <ProjectGroup
            title="Forks & Contributions"
            description="Last 30 days"
            projects={props.recentContributions} /> */}

          {/* <ProjectGroup
            title="Retired Projects"
            description="Last 30 days"
            projects={legacyProjects} /> */}

          {Object.keys(projects).map((k) => {
            return <ProjectGroup key={k} title={k} projects={projects[k]} />
          })}

          <Footer {...props} />
        </div>
      </div>
    </div>
  )
}
