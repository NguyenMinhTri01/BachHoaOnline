$(document).ready(function()
{ 
  $("#input-name").click(function(){
    $("#mgs").html("");
  });

  $("#Select1").click(function(){
    $("#mgs").html("");
  })
   //khai báo biến submit form lấy đối tượng nút submit
   var submit = $("button[type='submit']");

   //khi nút submit được click
   submit.click(function()
   {
     var c_name = $("input[name='c_name']").val().trim(); //lấy giá trị trong input user
     var c_parent = $("select[name='c_parent']").val();

     if(c_name == ''|| c_parent == '0'){
      $('#mgs').html("<div class='alert alert-danger alert-dismissible'>" +
        "<button type='button' class='close' data-dismiss='alert'>&times;</button>"+
        "Dữ liệu Không được để trống"+
        "</div>"
        );
      return false;
     }
     if (c_name.length < 3) {
      $('#mgs').html("<div class='alert alert-danger alert-dismissible'>" +
        "<button type='button' class='close' data-dismiss='alert'>&times;</button>"+
        "Dữ liệu nhập phải trên lớn hơn 2 ký tự"+
        "</div>"
        );
      return false;
     }
      var valid = /\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:/g;
      if (valid.test(c_name)) {
        $('#mgs').html("<div class='alert alert-danger alert-dismissible'>" +
        "<button type='button' class='close' data-dismiss='alert'>&times;</button>"+
        "Dữ liệu nhập không được chứa ký tự đặt biệt"+
        "</div>"
        );
        document.getElementById('form_input').reset();
        return false;
      }


     //Lấy toàn bộ dữ liệu trong Form
     var datas = $('form#form_input').serialize();
   
     //Sử dụng phương thức Ajax.
     $.ajax({
           type : 'POST', //Sử dụng kiểu gửi dữ liệu POST
           url : 'admin/category/edit', //gửi dữ liệu sang trang data.php
           data : datas, //dữ liệu sẽ được gửi
           success : function(res)  // Hàm thực thi khi nhận dữ liệu được từ server
                     { 
                        if(res == 'false') 
                        {
                          alert('server không phản hồi');
                        }else{
                          if (res.type){
                            $('#mgs').html("<div class='alert alert-success alert-dismissible'>" +
                                          "<button type='button' class='close' data-dismiss='alert'>&times;</button>"+
                                          res.message +
                                          "</div>");
                          }
                          else {
                            $('#mgs').html("<div class='alert alert-danger alert-dismissible'>" +
                                          "<button type='button' class='close' data-dismiss='alert'>&times;</button>"+
                                          res.message +
                                          "</div>");
                          }
                        }
                     }
           });
           return false;
     });
 });
