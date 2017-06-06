$( document ).ready(function(){
  $("body").on("click", ".mark-as-read", markAsRead)
  $("body").on("click", ".mark-as-read", hotRead)
})
function hotRead(e) {
  e.preventDefault();
  var $link = $(this).parents('.link');
  var linkId = $link[0].id;
  var link = $(`.link[id=${linkId}]`).find(".link-url")[0]
  var fullText = link.innerHTML
  var url = fullText.split(" ")[1]
  let form = new Object
  form['url'] = url
  $.ajax({
    url: "https://macaulay-hot-reads.herokuapp.com/api/v1/links",
    method: "POST",
    data: form
  })
  .then(function(link){
    if (link.hot) {
      hottestRead(link.id)
    }
  })
  .fail((error)=>{
    console.error(error)
  })
};

function hottestRead(id) {
  $(`.link[id=${id}]`).text('Hawt')
}

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
