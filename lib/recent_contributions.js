import { reject } from 'lodash';
import recentRepos from './recent_repos';

export default function(repos) {
  return reject(recentRepos(repos, 365), (project) => !project.isFork);
};
