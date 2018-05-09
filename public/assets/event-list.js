var tempEvents = []

$(document).ready(function(){ // Front-end Jquery FILE
  $('form').on('submit', function(e) {
    e.preventDefault();
    let events = {
      id: "" + new Date().getTime(),
      title: $("[name='title']").val(),
      location: $("[name='loc']").val(),
      time: $("[name='time']").val(),
      description: $("[name='desc']").val(),
      image: $("[name='img']").val()
    }
    tempEvents.push(events)
    $('.preview').append(`
      <li id='${events.id}'>
        <em>Title: ${events.title}</em>
        <p>Location: ${events.location} Time: ${events.time}</p>
        <p>Description: ${events.description}</p>
        <p>Image: ${events.image}</p>
        <span>ID: ${events.id}</span>
      </li>`)
  })

  $('#clear').on('click', function(e) {
    e.preventDefault();
    $('form input').val('')
  })

  // $(document).on({
  //   mouseenter: function q() {
  //     let hash = $(this).find('.hash')
  //     hash.html(hash.attr('href'))
  //   },
  //   mouseleave: function () {
  //     let hash = $(this).find('.hash')
  //     hash.html('HASH')
  //   }
  // }, ".preview li");

  $(document).on('click', '.preview li', function() {
    tempEvents.splice(tempEvents.findIndex(e => e.id === $(this).attr('id')),1);
    $(this).remove()
  })

  $('#publish').on('click', function(e){
    e.preventDefault();
    if ($("[name='pword']").val().length < 1) {
      alert('Password field is empty')
    } else {
      tempEvents.unshift({
        'user': $("[name='user']").val(),
        'password': hashPassword($("[name='pword']").val())
      })
      if (confirm('Are you sure you want to Publish?') == true) {
        let events = JSON.stringify(tempEvents)
        e.preventDefault();
        $.ajax({
          type: 'POST',
          url: '/events',
          dataType : 'json',
          data: {'events': events},
          success: function(data){
            location.reload(); // do something with the data via front-end framework
          },
          error: function (xhr) {
            alert(xhr.status + " Invalid Password");
          }
        });
        return false;
      }
      else {
        return
      }
    }
  });

  $('.eventList li').on('click', function(){
    var item = $(this).attr('id').replace(/ /g, '-');
    if ($("[name='pword']").val().length < 1) {
      alert('Invalid Password, Password field is empty')
      return
    } else {
      var login = {
        'user': $("[name='user']").val(),
        'password': hashPassword($("[name='pword']").val())
      }
      $.ajax({
        type: 'DELETE',
        url: '/events/' + item,
        dataType : 'json',
        data: {'login': JSON.stringify(login)},
        success: function(data){ // json data response from server
          // location.reload(); // do something with the data via front-end framework
        },
        error: function (xhr) {
          alert(xhr.status + " Invalid Password");
        }
      })
      $(this).remove()
    }
  })
})

window.onload = function() {
  var toSave = ['title','loc','time','desc','user','img']
  for (var i = 0; i < toSave.length; i++) {
    var item = sessionStorage.getItem(toSave[i])
    if (typeof item == 'string') $("[name='" + toSave[i] + "']").val(item);
  }
}

window.onbeforeunload = function() {
  sessionStorage.setItem('title', $("[name='title']").val());
  sessionStorage.setItem('loc', $("[name='loc']").val());
  sessionStorage.setItem('time', $("[name='time']").val());
  sessionStorage.setItem('desc', $("[name='desc']").val());
  sessionStorage.setItem('user', $("[name='user']").val());
  sessionStorage.setItem('image', $("[name='img']").val());
}
