import fs from 'fs'
import getRepos from '../lib/getRepos'

export default () => {
  return getRepos()
    .then((repos) => {
      fs.writeFileSync('repos.json', JSON.stringify(repos))
    })
    .catch((err) => {
      console.warn(err)
    })
}
