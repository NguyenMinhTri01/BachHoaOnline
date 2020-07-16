
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

    $('.table tbody').on('click', '._delete', function (action){
      action.preventDefault();
      var link = $(this).attr('href');
      $('#confirm').attr('href', link);
    })
});