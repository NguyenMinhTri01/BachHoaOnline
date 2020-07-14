function validation(formValidation) {
    var validator = formValidation.validate({
        rules: {
            u_name: {
                required: true,
            },
            u_phoneNumber: {
                required: true,
                minlength: 10,
                maxlength: 10,

            },
            o_password: {
                required: true,
            },
            n_password: {
                required: true,
            },
            r_password: {
                required: true,
                equalTo: '#n_password'
            },
            provincesOrCities: {
                required: true,
            },
            district: {
                required: true,
            },
            wards: {
                required: true
            },
            detail : {
                required: true
            }
        },
        messages: {
            u_name: {
                required: "Vui lòng nhập họ và tên",
            },
            u_phoneNumber: {
                required: "vui lòng nhập số điện thoại",
                minlength: "Số bạn vừa nhâp không phải số điện thoại",
                maxlength: "Số bạn vừa nhập không phải số điện thoại"
            },
            o_password: {
                required: "Bạn phải nhập mật khẩu cũ"
            },
            n_password: {
                required: "Bạn phải đặt mật khẩu mới"
            },
            r_password: {
                required: 'Bạn phải nhập lại mật khẩu',
                equalTo: 'Nhập Lại mật khẩu không chính xác',
            },
            provincesOrCities: {
                required: "Thông tin địa chỉ không được đê trống"
            },
            district: {
                required: "Thông tin địa chỉ không được đê trống"
            },
            wards: {
                required: "Thông tin địa chỉ không được đê trống"
            },
            detail : {
                required: "Thông tin địa chỉ không được đê trống"
            }
        }
    })
    return validator
}
function sendDataToUpdatesInfo(formInput, mgs) {
    var formDataInfo = formInput.serialize();
    $.ajax({
        type: 'POST', //Sử dụng kiểu gửi dữ liệu POST
        url: 'user/profile', //gửi dữ liệu sang trang data.php
        data: formDataInfo, //dữ liệu sẽ được gửi
        success: function (res)  // Hàm thực thi khi nhận dữ liệu được từ server
        {
            if (res == 'false') {
                alert('server không phản hồi');
            } else {
                if (res.type) {
                    mgs.html("<div class='alert alert-success alert-dismissible'>" +
                        "<button type='button' class='close' data-dismiss='alert'>&times;</button>" +
                        res.message +
                        "</div>");
                }
                else {
                    mgs.html("<div class='alert alert-danger alert-dismissible'>" +
                        "<button type='button' class='close' data-dismiss='alert'>&times;</button>" +
                        res.message +
                        "</div>");
                }
            }
        }
    });
}


// sự kiện checkbox
function showMe(box) {
    var chboxs = document.getElementsByName("pk");
    var vis = "none";
    for (var i = 0; i < chboxs.length; i++) {
        if (chboxs[i].checked) {
            vis = "block";
            break;
        }
    }
    document.getElementById(box).style.display = vis;
}



$(document).ready(function () {
    var formInput = $("#forminfor");
    var validator = validation(formInput);
    var btnSubmit = $("#submit");
    var mgs = $("#mgs");
    var u_name = $('input[name="u_name"');
    var userName = $('#userName');
    btnSubmit.click(function (event) {
        event.preventDefault();
        if (validator.form()) {
            sendDataToUpdatesInfo(formInput, mgs);
            userName.text(u_name.val());
        }
    })
})


