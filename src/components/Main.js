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
          {Object.keys(projects).map((k) => {
            return <ProjectGroup key={k} {...projects[k]} />
          })}

          <Footer {...props} />
        </div>
      </div>
    </div>
  )
}
