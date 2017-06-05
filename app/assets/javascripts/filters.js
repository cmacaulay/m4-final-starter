$(document).ready(function(){
  $('#link-search').on('keyup', searchLinks);
  $('#all-unread').on('click', showUnreadLinks)
  $('#all-read').on('click', showReadLinks)
});

function searchLinks() {
  let $links = $('#my-links');
  let search = $('#link-search').val().toLowerCase();
  $links.find(`div:contains(${search})`).show();
  $links.find(`div:not(:contains(${search}))`).hide();
};

function showUnreadLinks() {
  let $links = $('#my-links');
  let search = "false"
  $links.find(`div:contains(${search})`).show();
  $links.find(`div:not(:contains(${search}))`).hide();
};

function showReadLinks() {
  let $links = $('#my-links');
  let search = "true"
  $links.find(`div:contains(${search})`).show();
  $links.find(`div:not(:contains(${search}))`).hide();
};
