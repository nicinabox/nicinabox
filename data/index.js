import moment from 'moment';

export default {
  lastBuild: moment().format('dddd, MMMM Do, YYYY'), 
  active_projects: [],
  current_projects: [],
  recent_contributions: [],
  legacy_projects: [
    'superslides', 'shortcode.js', 'petrie', 'trolley', 'boiler',
    'boliler-registry', 'slackware-packages', 'slapp', 'boxcar', 'slackpack',
    'colorvom', 'tallybro', 'binary-clock'
  ]
}
