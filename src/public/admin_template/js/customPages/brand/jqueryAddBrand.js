function loadImage(input, showImage, label_nameImage, label_feedback) {
  var checkExtension = /\.(jpe?g|png|gif|bmp)$/i;
  if (!checkExtension.test(input.files[0].name)) {
    label_feedback.text('File không hợp lệ ví dụ: *.jpg,*png,*gif,*jpeg...');
    return false;
  }
  label_feedback.text('');
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      showImage.attr("src", e.target.result);
    }
    reader.readAsDataURL(input.files[0]);
    label_nameImage.text(input.files[0].name);
  }
};

function getDataCategoryChid(id, c_id) {
  c_id.empty();
  c_id.append(new Option("Chọn danh mục phù hợp...", 0, true));
  $.ajax({
    type: 'GET',
    url: `admin/category/getCategoryChild/${id}`,
    data: null,
    success: res => {
      if (res) if (res.length > 0) res.forEach(function (c_child) {
        c_id.append(new Option(c_child.c_name, c_child._id));
      });
    }
  })
};

function reSetNotification(formControl, notifications, label_feedback) {
  formControl.click(function () {
    notifications.html("");
    label_feedback.text('');
  })
};



function reSetData(formInput, image_Preview, label_nameImage, label_feedback) {
  formInput.trigger("reset");
  image_Preview.attr("src", "https://res.cloudinary.com/nguyenminhtri/BachHoaOnline/image_default/placeholder250x250_lnsqrn.png");
  label_nameImage.text('Chon File Ảnh...');
  label_feedback.text('');
}


$(document).ready(function () {
  var inputFieldImage = $("#fileImageBrand");
  var formInput = $(".form-group");
  var inputBrandName = $("input[name='br_name']");
  var notifications = $("#mgs");
  var formControl = $(".form-control");
  var image_Preview = $(".image-preview");
  var label_nameImage = $(".custom-file-label");
  var label_feedback = $(".feedback");
  var c_id = $("#c_id");
  var C_idParent = $("#C_idParent");


  // getDataCategoryChid

  C_idParent.change(function() {
    var id = $(this).val();
    if(id !== "0") {
      getDataCategoryChid(id, c_id);
    }
  })

  reSetNotification(formControl, notifications, label_feedback);

  inputFieldImage.change(function () {
    loadImage(this, image_Preview, label_nameImage, label_feedback);
  });
  formInput.submit(function (e) {
    e.preventDefault();
    // validation data
    var br_name = inputBrandName.val().trim(); //lấy giá trị trong input user
    if (br_name == '') {
      notifications.html("<div class='alert alert-danger alert-dismissible'>" +
        "<button type='button' class='close' data-dismiss='alert'>&times;</button>" +
        "Dữ liệu Không được để trống" +
        "</div>"
      );
      reSetData(formInput, image_Preview, label_nameImage, label_feedback);
      return false;
    }
    if (br_name.length < 3) {
      notifications.html("<div class='alert alert-danger alert-dismissible'>" +
        "<button type='button' class='close' data-dismiss='alert'>&times;</button>" +
        "Dữ liệu nhập phải trên lớn hơn 2 ký tự" +
        "</div>"
      );
      reSetData(formInput, image_Preview, label_nameImage, label_feedback);
      return false;
    }
    // var valid = /\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\>|\?|\/|\""|\;|\:/g;
    // if (valid.test(br_name)) {
    //   notifications.html("<div class='alert alert-danger alert-dismissible'>" +
    //     "<button type='button' class='close' data-dismiss='alert'>&times;</button>" +
    //     "Dữ liệu nhập không được chứa ký tự đặt biệt" +
    //     "</div>"
    //   );
    //   reSetData(formInput, image_Preview, label_nameImage, label_feedback);
    //   return false;
    // }
    try {
      var formData = new FormData(this);

    } catch (error) {
      console.log(error);
    }
    $.ajax({
      url: "admin/brand/add",
      type: 'POST',
      data: formData,
      async: false,
      datatype: 'formData',
      success: function (res) {  // Hàm thực thi khi nhận dữ liệu được từ server
        if (res == false) {
          alert('server không phản hồi');
        } else {
          if (res.type) {
            notifications.html("<div class='alert alert-success alert-dismissible'>" +
              "<button type='button' class='close' data-dismiss='alert'>&times;</button>" +
              res.message +
              "</div>");
            reSetData(formInput, image_Preview, label_nameImage, label_feedback);
          }
          else {
            notifications.html("<div class='alert alert-danger alert-dismissible'>" +
              "<button type='button' class='close' data-dismiss='alert'>&times;</button>" +
              res.message +
              "</div>");
            reSetData(formInput, image_Preview, label_nameImage, label_feedback);
          }
        }
      },
      cache: false,
      contentType: false,
      processData: false
    });

  });

});