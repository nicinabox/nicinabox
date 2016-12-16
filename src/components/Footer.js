import React from 'react'
import { format } from 'date-fns'

export default function Footer (props) {
  return (
    <div id="footer">
      <p className="text-muted">
        Built on <strong>{format(props.lastBuild, 'dddd, MMMM Do, YYYY')}</strong>.{' '}
        Curious how this site was made?{' '}
        <a href="https://github.com/nicinabox/nicinabox">Check out the source.</a>
      </p>
    </div>
  )
}
