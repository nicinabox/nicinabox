import Github from 'github-api'

const OWNER = 'nicinabox'
const ZEUMO = 'Zeumo'

var github = new Github({
  token: process.env.GITHUB_TOKEN,
  auth: 'oauth'
})

var user = github.getUser()

export default function getRepos() {
  return user.listRepos({ type: 'all' })
    .then(resp => resp.data)
    .then((repos) => {
      return repos.reduce((result, repo) => {
        if (repo.private || (repo.owner.login === ZEUMO && repo.fork)) return result

        return result.concat({
          name: repo.name,
          fullName: repo.full_name,
          description: repo.description,
          url: repo.html_url,
          homepage: repo.homepage,
          pushedAt: repo.pushed_at,
          isOwner: repo.owner.login === OWNER,
          isFork: repo.fork,
          isContributor: !repo.permissions.admin && repo.permissions.push
        })
      }, [])
    })
}
