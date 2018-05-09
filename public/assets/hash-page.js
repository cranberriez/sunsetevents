$(function(){
  $('form').on('submit', function(e){
    e.preventDefault();
    let text = hashPassword($('input').val())
    $.ajax({
      type: 'POST',
      url: '/dev/hash',
      data: {input : text},
      success: function(data){
        console.log(data)
        $('.hash').html(`Result: ${data}`)
      },
      error: function (request, status) {
        alert(status);
      }
    });
  })
})
