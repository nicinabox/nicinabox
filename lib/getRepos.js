import Github from 'github-api'

const OWNER = 'nicinabox'

var github = new Github({
  token: process.env.GITHUB_TOKEN,
  auth: 'oauth'
})

var user = github.getUser()

export default function getRepos() {
  return new Promise((resolve, reject) => {
    user.repos((err, repos) => {
      if (err) return reject(err)

      var matchedRepos = repos.reduce((result, repo) => {
        if (repo.private) return result

        return result.concat({
          name: repo.name,
          fullName: repo.full_name,
          description: repo.description,
          url: repo.html_url,
          homepage: repo.homepage,
          pushedAt: repo.pushed_at,
          isOwner: repo.owner.login === OWNER,
          isFork: repo.fork
        })
      }, [])

      resolve(matchedRepos)
    })
  })
}
