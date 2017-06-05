$(document).ready(function(){
  $('#link-search').on('keyup', searchLinks);
});

function searchLinks() {
  let $links = $('#my-links');
  let search = $('#link-search').val().toLowerCase();
  $links.find(`div:contains(${search})`).show();
  $links.find(`div:not(:contains(${search}))`).hide();
};
