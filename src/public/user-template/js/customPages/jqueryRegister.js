function validationFormRegister (formRegister) {
  var validator = formRegister.validate({
    rules: {
      'lastName' : {
        required: true,
        maxlength : 50
      },
      'firstName' : {
        required: true,
        maxlength : 50
      },
      'u_email' : {
        required: true,
        maxlength: 50,
        email : true
      },
      'u_password' : {
        required: true,
        minlength: 4,
      },
      'confirmPassword' : {
        required: true,
        equalTo : "#u_password"
      }
    },
    messages : {
      'lastName' : {
        required: 'Dữ liệu không được để trống',
        maxlength : 'Dữ liệu nhập không được quá 50 ký tự'
      },
      'firstName' : {
        required: 'Dữ liệu không được để trống',        
        maxlength : 'Dữ liệu nhập không được quá 50 ký tự'
      },
      'u_email' : {
        required: 'Dữ liệu không được để trống',
        maxlength: 'Dữ liệu nhập không được quá 50 ký tự',
        email : 'Địa chỉ email không hợp lệ'
      },
      'u_password' : {
        required: 'Dữ liệu không được để trống',
        minlength: 'Mật khẩu quá ngắn'
      },
      'confirmPassword' : {
        required: 'Dữ liệu không được để trống',
        equalTo : 'Xác nhận mật khẩu không chính xác'
      }
    }
  });
  return validator;
};

function sentDataToServer(submit, validator, formRegister, notifications){
  submit.on('click',function(event){
    event.preventDefault();
    if (validator.form()){
      var data_input = formRegister.serialize();
      $.ajax({
        url: "register",
        type: 'POST',
        data: data_input,
        success : function(res){  // Hàm thực thi khi nhận dữ liệu được từ server
              if(res == false){
                alert('server không phản hồi');
              } 
              else {
                if (res.type){
                  notifications.html("<div class='alert alert-success alert-dismissible show' role='alert'>" +
                  `<i class='fa fa-check'></i> ${res.notify.action} <strong>${res.notify.status}</strong>`+
                  "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
                  "<span aria-hidden='true'>&times;</span>" + 
                  "</button></div>");
                  formRegister.trigger("reset");
                }
                else {
                  notifications.html("<div class='alert alert-danger alert-dismissible show' role='alert'>" +
                  `<i class='fa fa-exclamation-triangle' aria-hidden='true'></i><strong> ${res.error}</strong>`+
                  "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
                  "<span aria-hidden='true'>&times;</span>" + 
                  "</button></div>");
                  formRegister.trigger("reset");
                }
              }
        }
      });
    }
  })
}



$(document).ready(function(){
  var lastName = $("input[name='lastName']");
  var firstName = $("input[name='firstName']");
  var userName = $("input[name='userName']");
  var u_password = $("input[name='u_password']");
  var confirmPassword = $("input[name='confirmPassword']");
  var formRegister = $("#register-form");
  var submit = $("input[name='submit']");
  var notifications = $("#notifications");
  var validator = validationFormRegister(formRegister);
  sentDataToServer(submit, validator, formRegister, notifications);
});