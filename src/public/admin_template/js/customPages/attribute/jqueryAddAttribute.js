$(document).ready(function () {
        
    $("#forminputs").validate({
        rules: {
            attr_name: {
                required: true,
            },
            br_image:{
                required:true,
            },
            attr_discription:{
                required:true,
            },
            attr_type:{
                required:true,
            }
            
        },
        messages: {
            attr_name: {
                required: "Vui lòng nhập họ và tên",
            },
            br_image:{
                required:"Vui lòng chọn ảnh",
            },
            attr_discription:{
                required:"Vui lòng thêm mô tả"
            },
            attr_type:{
                required:"Vui lòng chọn loại thuộc tính"
            }
            
           
            
        }
    })
})