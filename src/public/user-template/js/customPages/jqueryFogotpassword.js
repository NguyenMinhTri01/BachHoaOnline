


$(document).ready(function () {


  var formForgotPassword = $('#forgot-form');
  var submitForm = $('#submitForm');
  var email = $('input[name="email"]');
  var response = $('#response')

  submitForm.click(function (event) {
    event.preventDefault();
    $.ajax({
      url: `/user/forgotPassword/${email.val()}`,
      type: 'GET',
      data: null,
      success: function (res) {
        if (res == false) {
          alert('server không phản hồi');
        }
        else {
          if (res.type) {
            response.attr('class','show');
            response.text(res.message);
            response.css('color','#6a7479');
          }
          else {
            response.attr('class','show');
            response.css('color','red');
            response.text(res.message);
          }
        }
      }
    })
  })


})