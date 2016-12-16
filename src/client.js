import fastclick from 'fastclick'
import $ from 'webpack-zepto'

fastclick.attach(document.body)

var container = '.project-container'
var group = '.project-group'

var isMiddleButton = (e) => {
  return e.which === 4 || e.button === 1
}

$(document).on('click', container, (e) => {
  if (isMiddleButton(e)) return

  var $link = $(e.target).closest('a')
  if ($link.length && !$(e.target).closest('a').hasClass('details')) return
  e.preventDefault()

  $(e.currentTarget).siblings().removeClass('active')
  $(e.currentTarget).parents(group).siblings().find(container).removeClass('active')
  $(e.currentTarget).toggleClass('active')
})

$(document).on('click', (e) => {
  if ($(e.target).closest(container).length) return
  $(container).removeClass('active')
})

var _gauges = _gauges || [];
(function() {
  var t   = document.createElement('script');
  t.type  = 'text/javascript';
  t.async = true;
  t.id    = 'gauges-tracker';
  t.setAttribute('data-site-id', '4f83803b613f5d23300000a9');
  t.setAttribute('data-track-path', 'https://track.gaug.es/track.gif');
  t.src = 'https://track.gaug.es/track.js';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(t, s);
})();
