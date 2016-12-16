import recentRepos from './recent_repos';

export default function(repos) {
  return recentRepos(repos, 30)
    .filter((repo) => repo.isOwner);
};
