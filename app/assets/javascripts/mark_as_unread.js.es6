$( document ).ready(function(){
  $("body").on("click", ".mark-as-unread", markAsUnread)
})

function markAsUnread(e) {
  e.preventDefault();

  var $link = $(this).parents('.link');
  var linkId = $link[0].id;

  $.ajax({
    type: "PATCH",
    url: "/api/v1/links/" + linkId,
    data: { read: false },
  }).then(function(data){
    updateLinkStatus(data)
    updateUnreadButton(data)
    $(`.link[id=${data.id}]`).removeClass("true")
  })
    .fail(displayFailure);
}

function updateUnreadButton(link) {
  $(`.link[id=${link.id}]`).find(".mark-as-unread").text(`Mark as Read`);
  $(`.link[id=${link.id}]`).find(".read").removeClass("mark-as-unread");
  $(`.link[id=${link.id}]`).find(".read").addClass("mark-as-read");
}

function updateLinkStatus(link) {
  $(`.link[id=${link.id}]`).find(".read-status").text(`Read? ${link.read}`);
}

function displayFailure(failureData){
  console.log("FAILED attempt to update Link: " + failureData.responseText);
}
