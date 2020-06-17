
function validationInput (formInput) {
  var validator = formInput.validate({
    rules : {
      'ad_avatar': {
        extension : "jpg|jpeg|png|git",
      },

      'ad_name' : {
        maxlength : 50,
        minlength : 2,
      },
      'ad_phoneNumber' : {
        maxlength : 10,
        minlength : 10,
        number : true,
      },
      'ad_email' : {
        email : true,
      },
      'ad_userName' : {
        maxlength : 20,
        minlength : 3,
      },
      'ad_currentPW' : {
        required: true
      },
      'ad_password' : {
        maxlength : 50,
        minlength : 4
      },
      'confirmPassword' : {
        equalTo : "#ad_password"
      }

    },
    messages : {
      'ad_avatar': {
        extension : "File ảnh không hợp lệ vui lòng thử lại",
      },
      'ad_name' : {
        maxlength : "Tên quá dài!",
        minlength : "Tên quá ngắn!",
      },
      'ad_phoneNumber' : {
        maxlength : "Số điện thoại không hợp lệ!",
        minlength : "Số điện thoại không hợp lệ!",
        number : "Số điện thoại không hợp lệ!",
      },
      'ad_email' : {
        email : "Email không hợp lệ!",
      },
      'ad_userName' : {
        maxlength : "Tên đăng nhập tối đa 20 ký tự!",
        minlength : "Tên đăng nhập tối thiểu 3 ký tự!",
      },
      'ad_currentPW' : {
        required: "Dữ liệu không được để trống",
      },
      'ad_password' : {
        minlength : "Mật khẩu quá ngắn!"
      },
      'confirmPassword' : {
        equalTo : "Nhập lại mật khẩu không đúng!"
      }
    }
  });
  return validator;
};

function loadImage (fileInput, showImage) {
  var checkExtension = /\.(jpe?g|png|gif|bmp)$/i 
  if (!checkExtension.test(fileInput.files[0].name)) {
    return false;
  }
  if (fileInput.files && fileInput.files[0]){
    var reader = new FileReader();
    reader.onload = function(e) {
      showImage.attr("src", e.target.result);
    }
    reader.readAsDataURL(fileInput.files[0]);
  }
};



$(document).ready(function() {
  var formInput = $('#formInput');
  var btnEdit = $('#btnEdit');
  var btnReturn = $('#btnReturn');
  var itemsHidden = $('.hidden');
  var itemsFormControl = $('.form-control');
  var ad_name = $('input[name="ad_name"');
  var itemsPW = $('.PW');
  var currentPWLabel = $('#currentPWLabel');
  var ad_currentPW = $("input[name='ad_currentPW']");
  var ad_avatar = $('input[name=ad_avatar]');
  var notifications = $('#notifications');
  var image_Preview = $("#image-preview");
  var mainWrapper = $('#main-wrapper');
  mainWrapper.attr({
    "data-sidebartype" : "mini-sidebar",
    "class" : "mini-sidebar"
  })
  var validator = validationInput(formInput);

  ad_avatar.change(function() {
    loadImage(this, image_Preview);
  })
  btnEdit.click(function() {
    itemsHidden.removeClass('hidden');
    itemsFormControl.prop('disabled',false);
    ad_name.focus();
    btnReturn.html('<i class="fa fa-check" aria-hidden="true"></i> Lưu');
    btnReturn.attr({
      "class": "btn btn-success",
      "id" : "btnSave",
      "onclick" : "",
      "type" : "submit"
    })
    btnEdit.html('<i class="fas fa-undo"></i> Đặt Lại');
    btnEdit.attr({
      "class": "btn btn-info"
    });
    itemsPW.attr('value','');
    currentPWLabel.text('Mật khẩu hiện tại:');
    btnReset = $('#btnReset');
    formInput.trigger("reset");
  });

  formInput.submit(function(e) {
    e.preventDefault();
    if (validator && ad_currentPW.val() !== '') {
      var formData = new FormData(formInput[0]);
      $.ajax({
        url: "admin/updateInfo",
        type: 'POST',
        data: formData,
        async: false,
        datatype: 'formData',
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
                }
                else {
                  notifications.html("<div class='alert alert-danger alert-dismissible show' role='alert'>" +
                  `<i class='fa fa-exclamation-triangle' aria-hidden='true'></i><strong> ${res.error}</strong>`+
                  "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
                  "<span aria-hidden='true'>&times;</span>" + 
                  "</button></div>");
                }
              }
        },
        cache: false,
        contentType: false,
        processData: false
      });
    }
  })
})