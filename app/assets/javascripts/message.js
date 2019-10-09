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
      $('.messages').append(html)
      $('#message_content').val('')
      // $('.form__submit').attr('disabled', false);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      return false
    })
    .fail(function() {
      alert('エラー');
    })
    return false;
  })
});  