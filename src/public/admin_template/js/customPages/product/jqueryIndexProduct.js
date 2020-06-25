function getNotificationActive (thisActive){
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
                      if (strClass.indexOf("success") != -1){ 
                      thisActive.attr("class", "_Active_ btn btn-secondary");
                      } else {
                      thisActive.attr("class", "_Active_ btn btn-success");
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
  function getNotificationHot (thisActive){
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
                      if (strClass.indexOf("danger") != -1){ 
                      thisActive.attr("class", "_hot_ btn btn-secondary mt-2 ");
                      } else {
                      thisActive.attr("class", "_hot_ btn btn-danger mt-2 ");
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
      //config table
      var table = $('.table').DataTable({
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
        "lengthMenu": [ 5, 10, 20, 50, 100],
        "sPaginationType": "full_numbers",
        "drawCallback" : function() {
        },
      });
  
      $('.table tbody').on('click', '._hot_', function(action){
        action.preventDefault();
        getNotificationHot($(this));

      })
  
  
      $('.table tbody').on('click', '._Active_', function(action){
        action.preventDefault();
        getNotificationActive($(this));
      });
  });
  
  
  
  
  
  