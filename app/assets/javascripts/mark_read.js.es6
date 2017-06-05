$( document ).ready(function(){
  $("body").on("click", ".mark-as-read", markAsRead)
})

function determineId(data) {
  let $link   = $(data).parents('.link');
  let $linkId =  $link[0].id
  return $linkId;
}

function markAsRead(e) {
  e.preventDefault();

  var linkId = determineId(this);

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
  $(`.link[id=${link.id}]`).removeClass("mark-as-read");
  $(`.link[id=${link.id}]`).addClass("mark-as-unread");
}

function updateLinkStatus(link) {
  $(`.link[id=${link.id}]`).find(".read-status").text(`Read? ${link.read}`);
  $(`.link[id=${link.id}]`).removeClass("true");
  $(`.link[id=${link.id}]`).addClass("false");
}

function displayFailure(failureData){
  console.log("FAILED attempt to update Link: " + failureData.responseText);
}
