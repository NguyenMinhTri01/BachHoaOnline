function loadImage (input) {
  var showImage = $(".image-preview");
  if (input.files && input.files[0]){
    var reader = new FileReader();
    reader.onload = function(e) {
      showImage.attr("src", e.target.result);
    }
    reader.readAsDataURL(input.files[0]);
  }
}


$(document).ready(function(){
  var groupCategory = $("select[id='list_group']");
  var category = $("select[id='list_category']");
  var inputFieldImage = $("#fileImageBrand");
  groupCategory.change(function(){
    var groupId = $(this).val();
    $.ajax({
      type : 'GET', //Sử dụng kiểu gửi dữ liệu POST
      url : `admin/brand/getCategoryOfGroup/${groupId}`, //gửi dữ liệu sang trang data.php
      data : null, //dữ liệu sẽ được gửi
      success : function(res)  // Hàm thực thi khi nhận dữ liệu được từ server
                { 
                   if(res == 'false') 
                   {
                     alert('server không phản hồi');
                   }else{
                    category.prop("disabled" , false);
                    if(res.length > 0 ){
                      var list_categories = res;
                      category.empty();
                      list_categories.forEach(function(item) {
                        category.append(new Option(item.c_name, item._id));
                      })
                    }
                   }
                }
    })
  });
  inputFieldImage.change(function(){
    loadImage(this);
  })

});