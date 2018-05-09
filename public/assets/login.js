$(function(){
  $('form button').on('click', function(){
    let login = $('[name="login"]').val();
    let password = MD5($('[name="pword"]').val());
    console.log("Password: " + password)
    $.ajax({
      type: 'POST',
      url: '/login/authenticate',
      data: {'login': login, 'password': password},
      success: function(data){
        if (data == 'failed') {
          alert('Failed')
        } else {
          sessionStorage.setItem('token', data);
          console.log('Token: ' + data)
          alert(sessionStorage.getItem('token'))
        }
      }
    })
  })
})
