import _ from 'lodash';

export default function(repos) {
  var data = require('../data');
  var legacyProjects = data.legacy_projects;

  return _(repos)
    .filter((repo) => {
      return _.contains(legacyProjects, repo.name);
    })
    .sortBy((p) => p.name.toLowerCase())
    .value();
}
