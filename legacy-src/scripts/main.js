import fastclick from 'fastclick';
import $ from 'webpack-zepto';

fastclick.attach(document.body);

var container = '.project-container';
var group = '.project-group';

var isMiddleButton = (e) => {
  return e.which === 4 || e.button === 1;
}

$(document).on('click', container, (e) => {
  if (isMiddleButton(e)) return;

  var $link = $(e.target).closest('a');
  if ($link.length && !$(e.target).closest('a').hasClass('details')) return;
  e.preventDefault();

  $(e.currentTarget).siblings().removeClass('active');
  $(e.currentTarget).parents(group).siblings().find(container).removeClass('active');
  $(e.currentTarget).toggleClass('active');
});

$(document).on('click', (e) => {
  if ($(e.target).closest(container).length) return;
  $(container).removeClass('active');
});
