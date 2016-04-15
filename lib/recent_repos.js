import _ from 'lodash';
import moment from 'moment';

var within = (days, date) => {
  return moment().subtract(days, 'days').isBefore(date);
};

export default function(repos, days = 30) {
  return _(repos)
    .filter((repo) => {
      return within(days, repo.pushedAt);
    })
    .sortBy((p) => p.name.toLowerCase())
    .value();
};
