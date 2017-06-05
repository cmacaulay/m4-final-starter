$( document ).ready(function(){
  $("body").on("click", ".mark-as-read", markAsRead)
})

function markAsRead(e) {
  e.preventDefault();

  var $link = $(this).parents('.link');
  var linkId = $link[0].id;

  $.ajax({
    type: "PATCH",
    url: "/api/v1/links/" + linkId,
    data: { read: true },
  }).then(function(data){
    updateLinkStatus(data)
    updateReadButton(data)
  })
    .fail(displayFailure);
}

function updateReadButton(link) {
  $(`.link[id=${link.id}]`).find(".mark-as-read").text(`Mark as Unread`);
  $(`.link[id=${link.id}]`).find(".read").removeClass("mark-as-read");
  $(`.link[id=${link.id}]`).find(".read").addClass("mark-as-unread");
}

function updateLinkStatus(link) {
  $(`.link[id=${link.id}]`).find(".read-status").text(`Read? ${link.read}`);
  $(`.link[id=${link.id}]`).removeClass("false");
  $(`.link[id=${link.id}]`).addClass("true");
}

function displayFailure(failureData){
  console.log("FAILED attempt to update Link: " + failureData.responseText);
}
