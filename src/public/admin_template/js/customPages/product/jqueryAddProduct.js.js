function validationForm(formInput) {
  $.validator.addMethod("valueNotEquals", function (value, element, arg) {
    return arg !== value;
  }, "Value must not equal arg.");

  $.validator.addMethod("greaterThanZero", function (value, element, arg) {
    return (value > 0 && value != '') === arg;
  }, "Giá trị phải lớn hơn 0");

  $.validator.addMethod("nonNegativeValue", function (value, element, arg) {
    return (value >= 0 && value != '') === arg;
  }, "Giá trị không được là số âm");

  var validated = formInput.validate({
    rules: {
      pr_name: {
        required: true,
        minlength: 3
      },
      pr_price: {
        required: true,
        number: true,
        greaterThanZero: true,
      },
      pr_discount: {
        number: true,
        nonNegativeValue: true,
      },
      pr_unit: {
        valueNotEquals: "0"
      },
      c_level: {
        valueNotEquals: "0"
      },
      c_id: {
        valueNotEquals: "0"
      },
      br_id: {
        valueNotEquals: "0"
      },
      pr_value: {
        required: true,
        greaterThanZero: true,
      },
      pr_key: {
        required: true,
      },
      pr_description: {
        required: true,
      },
      pr_avatar: {
        required: true
      },

    },
    messages: {
      pr_name: {
        required: "Dữ liệu không được để trống ",
        minlength: "Tên Sản phẩm quá ngắn"
      },
      pr_price: {
        required: "Dữ liệu không được để trống",
        number: "Giá sản phẩm không hợp lệ",
        greaterThanZero: "Giá phải lớn hơn 0"
      },
      pr_discount: {
        number: "Giảm giá sản phẩm không hợp lệ",
        nonNegativeValue: "Giảm giá không được là số âm"
      },
      pr_unit: {
        valueNotEquals: "Hãy chọn đơn vị phù hợp"
      },
      c_level: {
        valueNotEquals: "Hãy chọn một cấp danh mục"
      },
      c_id: {
        valueNotEquals: "Hãy chọn một tên danh mục"
      },
      br_id: {
        valueNotEquals: "Hãy chọn một thương hiệu"
      },
      pr_value: {
        required: "Dữ liệu không được để trống",
        greaterThanZero: "Giá trị phải lớn hơn 0"
      },
      pr_key: {
        required: "Dữ liệu không được để trống"
      },
      pr_description: {
        required: "Dữ liệu không được để trống",
      },
      pr_avatar: {
        required: "Dữ liệu không được để trống"
      },
    },
  });
  return validated;
}


function reSetData(formInput, image_Preview, label_nameImage, label_feedback) {
  formInput.trigger("reset");
  image_Preview.attr("src", "https://res.cloudinary.com/nguyenminhtri/BachHoaOnline/image_default/placeholder250x250_lnsqrn.png");
  label_nameImage.text('Chon File Ảnh...');
  label_feedback.text('');
}


function getListDataCategories(c_level_select, c_name_select) {
  c_name_select.empty();
  c_name_select.append(new Option("Chọn danh mục phù hợp...", 0, true));
  var c_level = c_level_select.val();
  if (c_level > 0) {
    $.ajax({
      type: 'GET',
      url: `admin/category/getC_parent/${+c_level + 1}`,
      data: null,
      success: function (res) {
        if (res && res.length > 0) res.forEach(function (category) {
          c_name_select.append(new Option(category.c_name, category._id));
        });
      }
    })
  }
};


function loadImage(input, showImage, label_nameImage, label_feedback) {
  var checkExtension = /\.(jpe?g|png|gif|bmp)$/i;
  if (!checkExtension.test(input.files[0].name)) {
    label_nameImage.text(input.files[0].name);
    label_feedback.text('File không hợp lệ ví dụ: *.jpg,*png,*gif,*jpeg...');
    showImage.attr("src", "https://res.cloudinary.com/nguyenminhtri/BachHoaOnline/image_default/imageUploadErro_omzvhc.png");
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
    return true;
  }
  return false;
};


function sendDataInputToServer(formInput, mgs, callback) {
  var formData = new FormData(formInput[0]);
  $.ajax({
    url: "admin/product/add",
    type: 'POST',
    data: formData,
    async: false,
    datatype: 'formData',
    success: function (res) {  // Hàm thực thi khi nhận dữ liệu được từ server
      if (res == false) {
        alert('server không phản hồi');
      } else {
        if (res.type) {
          mgs.html("<div class='alert alert-success alert-dismissible'>" +
            "<button type='button' class='close' data-dismiss='alert'>&times;</button>" +
            res.message +
            "</div>");
          callback(true);
        }
        else {
          mgs.html("<div class='alert alert-danger alert-dismissible'>" +
            "<button type='button' class='close' data-dismiss='alert'>&times;</button>" +
            res.message +
            "</div>");
          callback(false);
        }
      }
    },
    cache: false,
    contentType: false,
    processData: false
  });
}


$(document).ready(function () {

  var formInput = $('#formInput');
  var pr_name = $('#pr_name');
  var c_name_select = $("#c_id");
  var c_level_select = $("#c_level");
  var mgs = $("#mgs");
  var submit = $("#submit");
  var inputFieldImage = $("#fileImageProduct");
  var image_Preview = $(".image-preview");
  var label_nameImage = $(".custom-file-label");
  var label_feedback = $(".feedback");
  var checkElementImage = false;
  var validated = validationForm(formInput);

  c_level_select.change(function () {
    getListDataCategories(c_level_select, c_name_select);
  });

  inputFieldImage.change(function () {
    checkElementImage = loadImage(this, image_Preview, label_nameImage, label_feedback);
  });


  submit.click(function (event) {
    event.preventDefault();
    if (validated.form() && checkElementImage) {
      sendDataInputToServer(formInput, mgs, (result)=>{
        if (result) return reSetData(formInput, image_Preview, label_nameImage, label_feedback);
        return 
      });
      return pr_name.focus();
    }
    alert('dữ liệu nhập không hợp lệ hoặc bị để trống !');
  });
});
$("#images").fileinput({
  'allowedFileExtensions': ["jpg", "png", "jpeg",]
});
jQuery(document).ready(function ($) {
  $(".scroll").click(function (event) {
    event.preventDefault();
    $('.init-arrow-down').animate({ scrollTop: $(this.hash).offset().top }, 1000);
  });
});


