import _ from 'lodash';
import active_projects from './active_projects';
import recent_projects from './recent_projects';
import recent_contributions from './recent_contributions';
import legacy_projects from './legacy_projects';

export default function() {
  var templateData = {
    active_projects: active_projects(),
    current_projects: recent_projects(),
    recent_contributions: recent_contributions(),
    legacy_projects: legacy_projects()
  };


  return templateData;
};
