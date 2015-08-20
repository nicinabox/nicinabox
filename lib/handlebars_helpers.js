import moment from 'moment';

export default {
  link_to(context, options) {
    if (context.url) {
      return `<a href="${context.url}" class="${options.hash.className}">${options.fn(context)}</a>`;
    } else {
      return `<div class="${options.hash.className}">${options.fn(context)}</div>`;
    }
  },

  project_name(context, options) {
    if (context.isOwner) {
      return context.name;
    } else {
      return context.full_name;
    }
  },

  format_date(date) {
    return moment(date).format('dddd, MMMM Do, YYYY')
  }
}
