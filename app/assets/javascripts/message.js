$(function() {

  function buildPost(post){
    var html = `<div class="message">
                  <div class="message__user">
                    ${post.user_name}
                  </div>
                  <div class="message__time">
                    ${post.created_at}
                  </div>
                  <div class="lower-message">
                    <div class="lower-message__text">
                      ${post.content}
                    </div>
                  </div>
                </div>`
    return html;
  }


  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(post) {
      var html = buildPost(post);
      if (post.image.url == null){
        html = $(html).append()
      } else {
        html = $(html).append(`<div class = 'lower-message__image'><img src = '${post.image.url}' width="256" height="256"}</div>`)
      }
      $('.messages').append(html)
      $('#message_content').val('')
      $('#message_image').val('')
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      return false
    })
    .fail(function() {
      alert('エラー');
    })
    return false;
  })
});  