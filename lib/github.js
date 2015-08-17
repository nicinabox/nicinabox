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
    var matchedRepos = compact(map(repos, (repo) => {
      if (repo.private) return;

      return {
        name: repo.name,
        full_name: repo.full_name,
        description: repo.description,
        url: repo.html_url,
        pushed_at: repo.pushed_at,
        isOwner: repo.owner.login === OWNER,
        isFork: repo.fork
      };
    }));

    fs.writeFileSync('/tmp/repos.json', JSON.stringify(matchedRepos, null, 2));
    callback(matchedRepos);
  });
};
