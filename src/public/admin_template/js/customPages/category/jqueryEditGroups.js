function getModal (objectThis) {
  //get name form tagname tr
  var name =  objectThis.parent().parent().text().trim().split('\n');
  // set group name to modal notifications
  $("#notifistr").text(name[1].trim());
  //get url delete form button delete to button comfirm
  var deleteUrl = objectThis.attr("href");
  
  $("#comfirm").click(function (){
    $(".modal-content").html("<img style='margin: 100px 0px 100px 200px' src='admin_template/images/loading.gif' width='60px'>");
   $.ajax({
         type : 'GET', //Sử dụng kiểu gửi dữ liệu POST
         url : deleteUrl, //gửi dữ liệu sang trang 
         data : null, //dữ liệu sẽ được gửi
         success : function(res)  // Hàm thực thi khi nhận dữ liệu được từ server
                   {
                    if(res == 'false') 
                      {
                        $(".modal-content").html("<p style='color: red'>server không phản hồi!").delay(2000);
                        location.reload();
                      }else{
                        $(".modal-content").html("<img style='margin: 100px 0px 100px 200px' src='admin_template/images/OK.png' width='60px'>");
                        location.reload();
                      }
                   }
         });
  })
}

function getNotifications (thisActive){
  var urlActive = thisActive.attr("href");
  $.ajax({
    type : 'GET', //Sử dụng kiểu gửi dữ liệu POST
    url : urlActive, //gửi dữ liệu sang trang data.php
    data : null, //dữ liệu sẽ được gửi
    success : function(res)  // Hàm thực thi khi nhận dữ liệu được từ server
              {
               if(res == 'false') 
                 {
                   $(".modal-content").html("<p style='color: red'>server không phản hồi!");
                   location.reload();
                 }else{
                   if (res.type){
                    var strClass = thisActive.attr("class");
                    if (strClass.indexOf("primary") != -1){ 
                    thisActive.attr("class", "active_group badge badge-secondary");
                    } else {
                    thisActive.attr("class", "active_group badge badge-primary");
                    };
                    toastr.options = {
                      "timeOut": "1000",
                      "positionClass": "toast-bottom-right",
                    }
                    toastr.success('Thành công', 'Cập nhật');                    
                   }
                 }
              }
    });  
}

$(document).ready(function()
{ 
  $("#input-name").click(function(){
    $("#mgs").html("");
  });
   //khai báo biến submit form lấy đối tượng nút submit
   var submit = $("button[type='submit']");
   //khi nút submit được click
   submit.click(function()
   {
     console.log('ok');
     
     var gc_name = $("input[name='gc_name']").val().trim(); //lấy giá trị trong input user
     if(gc_name == ""){
      $('#mgs').html("<div class='alert alert-danger alert-dismissible'>" +
        "<button type='button' class='close' data-dismiss='alert'>&times;</button>"+
        "Dữ liệu Không được để trống"+
        "</div>"
        );
        document.getElementById('form_input').reset();
        return false;
     }
     if (gc_name.length < 3) {
      $('#mgs').html("<div class='alert alert-danger alert-dismissible'>" +
        "<button type='button' class='close' data-dismiss='alert'>&times;</button>"+
        "Dữ liệu nhập phải trên lớn hơn 2 ký tự"+
        "</div>"
        );
      document.getElementById('form_input').reset();
      return false;
     }
      var valid = /\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:/g;
      if (valid.test(gc_name)) {
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
           url : 'admin/category/edit_group', //gửi dữ liệu sang trang data.php
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

  //cofig table
  $('.table').DataTable({
    "language" : {
      "emptyTable": "Không có dữ liệu",
      "lengthMenu": "Xem _MENU_ Mục",
      "zeroRecords": "không tìm thấy dòng nào phù hợp",
      "search": "Tìm:",      
      "info": "Trang _PAGE_ / _PAGES_",
      "infoEmpty": "Không có dữ liệu",
      "infoFiltered": "(Được tìm kiếm từ _MAX_ mục)",
      "paginate": {
        "first":      "Đầu",
        "last":       "Cuối",
        "next":       "Sau",
        "previous":   "Trước"
      },      
    },
    "lengthMenu": [ 5, 10, 20, 50, 100]
  });


  $("._delete").click(function(){
    $("#notifi").text("Bạn có chắc muốn xóa danh mục: ");
    var objectThis = $(this);
    getModal (objectThis);
  });

  $("._Active_").click(function (action){
    action.preventDefault();
    getNotifications($(this));
  })  
});
