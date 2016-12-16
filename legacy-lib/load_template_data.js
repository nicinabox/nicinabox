import _ from 'lodash';
import active_projects from './active_projects';
import recent_projects from './recent_projects';
import recent_contributions from './recent_contributions';
import legacy_projects from './legacy_projects';

export default function(repos) {
  var data = require('../data');

  var templateData = {
    ...data,
    active_projects: active_projects(repos),
    current_projects: recent_projects(repos),
    recent_contributions: recent_contributions(repos),
    legacy_projects: legacy_projects(repos)
  };

  return templateData;
};
