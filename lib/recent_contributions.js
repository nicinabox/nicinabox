import { reject } from 'lodash';
import projects from './projects';

export default function() {
  var recent = projects(30 * 12);

  return reject(recent, (project) => {
    return !project.isFork;
  });
};
