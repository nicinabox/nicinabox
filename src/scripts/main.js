import fastclick from 'fastclick';
import $ from 'webpack-zepto';

fastclick.attach(document.body);

var selector = '.project-container';

$(document).on('click', selector, (e) => {
  var $link = $(e.target).closest('a');
  if ($link.length && !$(e.target).closest('a').hasClass('details')) return;
  e.preventDefault();

  $(e.currentTarget).siblings().removeClass('active');
  $(e.currentTarget).toggleClass('active');
});

$(document).on('click', (e) => {
  if ($(e.target).closest(selector).length) return;
  $(selector).removeClass('active');
});
