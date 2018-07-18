import React from 'react'

export default function Aside () {
  return (
    <div id="aside">
      <a href="/">
        <img className="avatar"
          src="http://www.gravatar.com/avatar/4da26f5e9ba2c59d01717c8e823df09c?size=200"
          width="100"
          height="100"
          alt="" />
      </a>

      <h1><a href="/">Nic Aitch</a></h1>
      <p className="text-muted lead">
        UI Engineer
      </p>

      <p className="description">
        I'm a frontend engineer at <a href="https://www.remotelock.com/">Remote Lock</a>.
      </p>

      <nav className="contact">
        <a href="http://github.com/nicinabox">Github</a>
        <span> &bull; </span>
        <a href="http://twitter.com/nicinabox">Twitter</a>
      </nav>
    </div>
  )
}
