function checkInputData (c_name, c_level, c_parentId, mgs) {
  if(c_name == ''|| c_level == '0' || (c_level != '1' && c_parentId == '0')){
    mgs.html("<div class='alert alert-danger alert-dismissible'>" +
      "<button type='button' class='close' data-dismiss='alert'>&times;</button>"+
      "Dữ liệu Không được để trống"+
      "</div>"
      );
    document.getElementById('form_input').reset();
    return false;
   }
   if (c_name.length < 3) {
    mgs.html("<div class='alert alert-danger alert-dismissible'>" +
      "<button type='button' class='close' data-dismiss='alert'>&times;</button>"+
      "Dữ liệu nhập phải trên lớn hơn 2 ký tự"+
      "</div>"
      );
    return false;
   }
    var valid = /\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:/g;
    if (valid.test(c_name)) {
      mgs.html("<div class='alert alert-danger alert-dismissible'>" +
      "<button type='button' class='close' data-dismiss='alert'>&times;</button>"+
      "Dữ liệu nhập không được chứa ký tự đặt biệt"+
      "</div>"
      );
      document.getElementById('form_input').reset();
      return false;
    }
    return true;
 };

 function resetForm(formInput, blockSelectC_parentId){
  formInput.trigger("reset");
  blockSelectC_parentId.css({
    "visibility" : "hidden",
    "display" : "none"
  })
 };

 function getDataC_parentId(c_level_select, c_parentId_select, blockSelectC_parentId) {

  c_parentId_select.empty();
  c_parentId_select.append(new Option("Chọn danh mục phù hợp...", 0, true));
  var c_level = c_level_select.val();
  if (c_level > 1){
    $.ajax({
      type: 'GET',
      url: `admin/category/getC_parent/${c_level}`,
      data: null,
      success: function(res){
        if(res){
          blockSelectC_parentId.css({
            "visibility" : "visible",
            "display" : "block"
          });
          if(res.length > 0){
            res.forEach(function(c_parent){
              c_parentId_select.append(new Option(c_parent.c_name, c_parent._id));
            });
          }
        }
      }
    })
  }
  else {
    blockSelectC_parentId.css({
      "visibility" : "hidden",
      "display" : "none"
    })
  }
 }

 function sendDataInputToServer(formInput, mgs){
       //Lấy toàn bộ dữ liệu trong Form
       var data_input = formInput.serialize();
       $.ajax({
        type : 'POST', //Sử dụng kiểu gửi dữ liệu POST
        url : 'admin/category/add', //gửi dữ liệu sang trang data.php
        data : data_input, //dữ liệu sẽ được gửi
        success : function(res)  // Hàm thực thi khi nhận dữ liệu được từ server
                  { 
                     if(res == 'false') 
                     {
                       alert('server không phản hồi');
                     }else{
                       if (res.type){
                         mgs.html("<div class='alert alert-success alert-dismissible'>" +
                                       "<button type='button' class='close' data-dismiss='alert'>&times;</button>"+
                                       res.message +
                                       "</div>");
                         
                       }
                       else {
                         mgs.html("<div class='alert alert-danger alert-dismissible'>" +
                                       "<button type='button' class='close' data-dismiss='alert'>&times;</button>"+
                                       res.message +
                                       "</div>");
                        
                      }
                     }
                  }
        });
 }

$(document).ready(function()
{
  var formInput = $('#form_input');
  var input = $('#input-name');
  var c_level_select = $('#c_level');
  var c_parentId_select = $('#c_parentId');
  var mgs = $('#mgs');
  var submit = $("button[type='submit']");
  var blockSelectC_parentId = $('#blockSelectC_parentId');
  
  
  input.click(function(){
    mgs.html("");
  });
  c_level_select.click(function(){
    mgs.html("");
  })
  c_parentId_select.click(function(){
    mgs.html("");
  })

  c_level_select.change(function(){
    getDataC_parentId(c_level_select, c_parentId_select, blockSelectC_parentId);
  })
   //khi nút submit được click
   submit.click(function(event)
   {
     event.preventDefault();
     var c_name = input.val().trim(); 
     var c_level = c_level_select.val();
     var c_parentId = c_level_select.val();
     if (checkInputData(c_name, c_level, c_parentId, mgs)){
      sendDataInputToServer(formInput, mgs);
     }
     resetForm(formInput, blockSelectC_parentId);
  });
 });


