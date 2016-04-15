import _ from 'lodash';
import recentRepos from './recent_repos';
import moment from 'moment';
import data from '../data';

var requirements = (project) => {
  return _.contains(data.legacy_projects, project.name) ||
    moment().subtract(30, 'days').isBefore(project.pushedAt) ||
    !project.isOwner ||
    project.isFork;
};

export default function(repos) {
  return _(recentRepos(repos, 30 * 6))
    .reject(requirements)
    .sortBy((p) => p.name.toLowerCase())
    .value();
};
