import _ from 'lodash';

export default function(repos) {
  var data = require('../data');
  var projects = data.legacy_projects;

  return _(repos)
    .filter((repo) => {
      return _.contains(projects, repo.name);
    })
    .sortBy((p) => p.name.toLowerCase())
    .value();
}