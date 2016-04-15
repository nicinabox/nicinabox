import { map, compact } from 'lodash';
import fs from 'fs';
import Github from 'github-api';

const OWNER = 'nicinabox';

var github = new Github({
  token: process.env.GITHUB_TOKEN,
  auth: 'oauth'
});

var user = github.getUser();

export function getRepos(callback) {
  user.repos((err, repos) => {
    if (err) {
      console.warn(err)
      return
    }

    var matchedRepos = compact(map(repos, (repo) => {
      if (repo.private) return;

      return {
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description,
        url: repo.html_url,
        homepage: repo.homepage,
        pushedAt: repo.pushed_at,
        isOwner: repo.owner.login === OWNER,
        isFork: repo.fork
      };
    }));

    fs.writeFileSync('repos.json', JSON.stringify(matchedRepos));
    callback(matchedRepos);
  });
};
