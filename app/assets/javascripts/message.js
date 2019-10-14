$(function() {

  function buildHTML(message){
    var image = message.image ? `<img src = '${message.image}'>` : "";
    var html =
      `<div class="message" data-message-id="${message.id}">
         <div class="upper-message">
           <div class="upper-message__user">
             ${message.user_name}
           </div>
           <div class="upper-message__time">
             ${message.date}
           </div>
         </div>
         <div class="lower-message">
           <p class="lower-message__text">
             ${message.content}
           </p>
           <div class="lower-message__image">
             ${image}
           </div>
         </div>
       </div>`
    return html
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
    .done(function(message) {
      var html = buildHTML(message);
      $('.messages').append(html)
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('form')[0].reset();
    })
    .fail(function() {
      alert('エラー');
    })
    return false;
  })

  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      last_message_id = $('.message:last').data("message-id");
      $.ajax({
        url: "api/messages",
        type: 'GET',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = '';
        messages.forEach(function (message) {
        insertHTML = buildHTML(message);
        $('.messages').append(insertHTML); 
        $('.messages').animate({scrollTop: $('.messages').height()})
        })
      })
      .fail(function() {
        alert('更新に失敗しました');
      });
    };
  } 
  setInterval(reloadMessages, 5000); 
});  
