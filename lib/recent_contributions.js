import { reject } from 'lodash';
import projects from './projects';

export default function(repos) {
  var recent = projects(repos, 30 * 12);

  return reject(recent, (project) => {
    return !project.isFork;
  });
};
