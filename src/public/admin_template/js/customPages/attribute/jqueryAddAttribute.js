$(document).ready(function () {
    $.validator.addMethod("valueNotEquals", function(value, element, arg){
        return arg !== value;
       }, "Value must not equal arg.");
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
                valueNotEquals:"1"
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
                valueNotEquals:"Vui lòng chọn một thuộc tính"
            }
            
           
            
        }
    })
})