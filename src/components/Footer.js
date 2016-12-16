import React from 'react'

export default function Footer (props) {
  return (
    <div id="footer">
      <p className="text-muted">
        Built on <strong>{props.lastBuild.toString()}</strong>.{' '}
        Curious how this site was made?{' '}
        <a href="https://github.com/nicinabox/nicinabox">Check out the source.</a>
      </p>
    </div>
  )
}
