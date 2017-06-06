$(document).ready(function(){
  $('.new-link').on("click", ".add-link", handleNewLink)
});

function handleNewLink () {
  event.preventDefault();
  $('.flash').empty();
  let form = new Object
  form['url']   = $("input[id=link_url]").val();
  form['title'] = $("input[id=link_title]").val();
  $.ajax({
    url: "/api/v1/links/",
    method: "POST",
    data: form
  })
  .then(function(data){
    addNewLink(data)
    $('.new-link').trigger("reset");
    $('.flash').html("You have added a new link.")
  })
  .fail( (error) => {
    const message = error.responseJSON.join(". ")
    $('.flash').html(message)
    console.error(error)
  });
};


function addNewLink(newLink) {
  let linkCard = `
    <div class="col-md-4 link false" id="${newLink.id}">
      <div class="hot"></div>
      <p>Title: ${newLink.title}</p>
      <p class="link-url">URL: ${newLink.url}</p>
      <p>Read? false</p>
      <p>
        <a class="btn btn-default" href="/links/${newLink.id}/edit">
         Edit
        </a>
        <a class="btn btn-default read mark-as-read" href='#'>Mark as Read</a>
      </p>
      <br>
    </div>
  `
  $("#my-links").prepend(linkCard)
};
