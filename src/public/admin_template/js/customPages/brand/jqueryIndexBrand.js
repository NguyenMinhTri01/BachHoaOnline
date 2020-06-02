

function addRowCount(tableAttr) {
  
  $(tableAttr).each(function(){
    $('th:first-child, thead td:first-child', this).each(function(){
      var tag = $(this).prop('tagName');
      $(this).before('<'+tag+'>STT</'+tag+'>');
    });
    $('td:first-child', this).each(function(i){
      $(this).before('<td>'+(i+1)+'</td>');
    });
  });
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
                    thisActive.attr("class", "_Active_ badge badge-secondary");
                    } else {
                    thisActive.attr("class", "_Active_ badge badge-primary");
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

  //addRowCount('.table');
  function getModal (objectThis) {
    //get name form tagname tr
    var name =  objectThis.parent().parent().text().trim().split('\n');
    // set group name to modal notifications
    $("#notifistr").text(name[0].trim());
    //get url delete form button delete to button comfirm
    var deleteUrl = objectThis.attr("href");
    $("#comfirm").click(function (){
      console.log('ok');
      
      $(".modal-content").html("<img style='margin: 100px 0px 100px 200px' src='https://res.cloudinary.com/nguyenminhtri/BachHoaOnline/effect/loading_xdywil.gif' width='60px'>");
     $.ajax({
           type : 'GET', //Sử dụng kiểu gửi dữ liệu POST
           url : deleteUrl, //gửi dữ liệu sang trang data.php
           data : null, //dữ liệu sẽ được gửi
           success : function(res)  // Hàm thực thi khi nhận dữ liệu được từ server
                     {
                      if(res == 'false') 
                        {
                          $(".modal-content").html("<p style='color: red'>server không phản hồi!");
                          location.reload();
                        }else{
                          $(".modal-content").html("<img style='margin: 100px 0px 100px 200px' src='https://res.cloudinary.com/nguyenminhtri/BachHoaOnline/effect/OK_labqne.png' width='60px'>");
                          location.reload();
                        }
                     }
           });
    })
  }


    //config table
    // var table = $('.table').DataTable({
    //   "language" : {
    //     "emptyTable": "Không có dữ liệu",
    //     "lengthMenu": "Xem _MENU_ Mục",
    //     "zeroRecords": "không tìm thấy dòng nào phù hợp",
    //     "search": "Tìm:",      
    //     "info": "Trang _PAGE_ / _PAGES_",
    //     "infoEmpty": "Không có dữ liệu",
    //     "infoFiltered": "(Được tìm kiếm từ _MAX_ mục)",
    //     "paginate": {
    //       "first":      "Đầu",
    //       "last":       "Cuối",
    //       "next":       "Sau",
    //       "previous":   "Trước"
    //     },      
    //   },
    //   "lengthMenu": [ 5, 10, 20, 50, 100],
    //   "sPaginationType": "full_numbers",
    //   "drawCallback" : function() {


    //     // $(".delete_group").click(function(){
    //     //   $("#notifi").text("");
    //     //   $("#notifi").text("Bạn có chắc muốn xóa nhóm danh mục: ");
    //     //   var objectThis = $(this);
    //     //   getModal (objectThis);
    //     // })
    //   },
    // });



    addRowCount('.table');
    $("._delete").click(function(){
      $("#notifi").text("");
      $("#notifi").text("Bạn có chắc muốn xóa danh mục: ");
      var objectThis = $(this);
      getModal (objectThis);
      //console.log('sai me gi');
    })


    $('.table tbody').on('click', '._Active_', function(action){
      action.preventDefault();
      getNotifications($(this));
    });

    // $('.table tbody').on('click', '._delete', function (action){
    //   action.preventDefault();
    //   $("#notifi").text("");
    //   $("#notifi").text("Bạn có chắc muốn xóa nhóm danh mục: ");
    //   getModal ($(this));
    // })

// còn fix thao tác Xóa
// mới viết thêm hàm thêm colunm đếm xó thứ tự addRowCount
// cú pháp xóa cột đầu tiên $('#table').find('td,th').first().remove();








});





