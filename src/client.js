import fastclick from 'fastclick'
import $ from 'webpack-zepto'
import './analytics'

fastclick.attach(document.body)

;(function() {
  const isMiddleButton = (e) => e.which === 4 || e.button === 1

  const container = '.project-container'
  const group = '.project-group'

  $(document).on('click', container, (e) => {
    if (isMiddleButton(e)) return

    const $link = $(e.target).closest('a')
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
})()
