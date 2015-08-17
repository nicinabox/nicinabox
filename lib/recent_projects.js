import _ from 'lodash';
import projects from './projects';
import moment from 'moment';

export default function() {
  var data = require('../data');
  var recent = projects(30 * 6);

  return _(recent).reject((project) => {
    return _.contains(data.legacy_projects, project.name) ||
    moment().subtract(30, 'days').isBefore(project.pushed_at) ||
    !project.isOwner ||
    project.isFork;
  }).sortBy((p) => p.name.toLowerCase()).value();
};
