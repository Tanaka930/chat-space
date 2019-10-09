$(function() {

  function buildPost(message){
    if ( message.image.url !== null ) {
      var html =
        `<div class="message">
          <div class="message__user">
            ${message.user_name}
          </div>
          <div class="message__time">
            ${message.date}
          </div>
          <div class="lower-message">
            <div class="lower-message__text">
              ${message.content}
            </div>
            <div class = 'lower-message__image'>
              <img src = '${message.image.url}' width="256" height="256"}
            </div>
          </div>
        </div>`
      return html;
    } else {
      var html =
        `<div class="message">
          <div class="message__user">
            ${message.user_name}
          </div>
          <div class="message__time">
            ${message.date}
          </div>
          <div class="lower-message">
            <div class="lower-message__text">
              ${message.content}
            </div>
          </div>
        </div>`
      return html;
    };
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
    .done(function(date) {
      var html = buildPost(date);
      $('.messages').append(html)
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('form')[0].reset();
    })
    .fail(function() {
      alert('エラー');
    })
    return false;
})
});  