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
      pr_origin: {
        required: true
      },
      pr_value: {
        required: true,
        greaterThanZero: true,
      },
      pr_key: {
        required: true,
      },
      pr_title: {
        required: true,
        maxlength: 100,
      },
      pr_description: {
        required: true,
      },
      pr_descriptionSeo: {
        required: true,
        maxlength: 300,
      }
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
      pr_origin: {
        required: "Dữ liệu không được để trống"
      },
      pr_value: {
        required: "Dữ liệu không được để trống",
        greaterThanZero: "Giá trị phải lớn hơn 0"
      },
      pr_key: {
        required: "Dữ liệu không được để trống"
      },
      pr_title: {
        required: "Dữ liệu không được để trống",
        maxlength: "tiêu đề không được quá 100 ký tự"
      },
      pr_description: {
        required: "Dữ liệu không được để trống",
      },
      pr_descriptionSeo: {
        required: "Dữ liệu không được để trống",
        maxlength: "Mô tả không được quá 300 ký tự",
      }
    },
  });
  return validated;
};

function addCommas(nStr) {
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
};

function deleteImage(url) {
  $.ajax({
    type: 'GET', //Sử dụng kiểu gửi dữ liệu POST
    url: url, //gửi dữ liệu sang trang data.php
    data: null, //dữ liệu sẽ được gửi
    success: function (res)  // Hàm thực thi khi nhận dữ liệu được từ server
    {
      if (res == false) {
        $(".modal-content").html("<p style='color: red'>server không phản hồi!");
        location.reload();
      } else {
        if (res.type) {
          toastr.options = {
            "timeOut": "2000",
            "positionClass": "toast-bottom-right",
          }
          toastr.success('Thành công', 'Xóa ảnh');
          return true;
        }
      }
    }
  });
};

function reSetData(formInput, image_Preview, label_nameImage, label_feedback) {
  // formInput.trigger("reset");
  // image_Preview.attr("src", "https://res.cloudinary.com/nguyenminhtri/BachHoaOnline/image_default/placeholder250x250_lnsqrn.png");
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
    url: "admin/product/edit",
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
};
$(document).ready(function () {
  var _id = $("#a_id").val();
  localStorage.uploadToken = _id;
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
  var pr_price = $("#pr_price");
  var checkElementImage = true;
  var _deleteImage = $(".deleteImage");

  var validated = validationForm(formInput);
  c_level_select.change(function () {
    getListDataCategories(c_level_select, c_name_select);
  });

  inputFieldImage.change(function () {
    checkElementImage = loadImage(this, image_Preview, label_nameImage, label_feedback);
  });

  _deleteImage.click(function (event) {
    event.preventDefault();
    var url = $(this).attr('href');
    deleteImage(url);
    var parent = $(this).parent().parent().parent();
    parent.remove();
  });

  submit.click(function (event) {
    event.preventDefault();
    var uploadToken = localStorage.uploadToken;
    if (validated.form() && checkElementImage) {
      if (uploadToken === _id) {
        $(this).html('<i class="fa fa-spinner fa-spin"></i> Đang tải');
        sendDataInputToServer(formInput, mgs, (result) => {
          if (result) {
            localStorage.uploadToken = _id;
            reSetData(formInput, image_Preview, label_nameImage, label_feedback);
            return $(this).html('<i class="fa fa-check"></i> Sửa');

          }
          return
        });
        return pr_name.focus();
      }
      return alert(' Album ảnh chưa được upload!');
    };
    alert('dữ liệu nhập không hợp lệ hoặc bị để trống');
  });

});

$("#images").fileinput({
  allowedFileTypes: ['image'],
  msgInvalidFileType: 'File không hợp lệ chỉ chấp nhận file ảnh',
  maxTotalFileCount: 5,
  msgTotalFilesTooMany: "Số file tải lên không quá 5 file",
  maxFileSize: 2048,
  msgSizeTooLarge: "Kích thước file ảnh không được quá 2MB",
  browseOnZoneClick: true,
  theme: 'fas',
  uploadUrl: "admin/product/uploadImage",
  uploadAsync: false,
  msgUploadEnd: "Tải ảnh lên thành công",
  layoutTemplates: {
    actionUpload: '',
    actionDelete: '<button type="button" class="kv-file-remove {removeClass}" title="Xóa ảnh này"{dataUrl}{dataKey}>{removeIcon}</button>\n',
    actionZoom: '<button type="button" class="kv-file-zoom {zoomClass}" title="Xem chi tiết">{zoomIcon}</button>',
  },
  previewZoomButtonTitles: {
    prev: 'Xem ảnh trước',
    next: 'Xem ảnh tiếp theo',
    toggleheader: 'ẩn tiêu đề',
    fullscreen: 'Xem toàn màng hình',
    borderless: 'Xem không viền',
    close: 'Đóng'
  },
  fileActionSettings: {
    indicatorNewTitle: 'Ảnh chưa được tải lên',
    indicatorSuccessTitle: 'Ảnh đã được tải lên'
  },
  msgZoomModalHeading: "Chi tiết",
  dropZoneTitle: "Kéo và thả file ảnh vào đây",
  dropZoneClickTitle: " (hoặc nhấp để chọn file ảnh)",
  removeLabel: "Hủy",
  uploadLabel: "Tải lên",
  browseLabel: "chọn file",
  msgPlaceholder: "Chọn các file ảnh..."
}).on('filebatchuploadsuccess', function (e, data) {
  localStorage.uploadToken = data.response.uploadToken;
}).on('change', function (event) {
  localStorage.uploadToken = undefined;
});
// jQuery(document).ready(function ($) {
//   $(".scroll").click(function (event) {
//     event.preventDefault();
//     $('.init-arrow-down').animate({ scrollTop: $(this.hash).offset().top }, 1000);
//   });
// });


