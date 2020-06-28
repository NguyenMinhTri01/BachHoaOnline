$(document).ready(function(){
    $("#formiput").validate({
        rules:{
            t_name:{
                required:true,
            },
            phone:{
                required:true,
            },
            thanhpho:{
               required:true, 
            },
            
            quanhuuyen:{
                required:true,
            },
            phuongxa:{
                required:true,
            },
            sonha:{
                required:true,
            },
            date:{
                required:true,
            },
            time:{
                required:true,
            }
        
        },
        messages:{
            t_name:{
                required: "Vui lòng nhập họ và tên",
            },
            phone:{
                required:"Vui lòng nhập vào số điện thoại"
            },
            thanhpho:{
                required:"Vui lòng nhập thành phố(tỉnh)"
            },
            quanhuuyen:{
                required:"Vui lòng nhập quận/huyện"
            },
            phuongxa:{
                required:"Vui lòng nhập phường/xã"
            },
            sonha:{
                required:"vui lòng nhập số nhà,tên đường "
            },
            date:{
                required:"Vui lòng chọn ngày giao"
            },
            time:{
                required:"Vui lòng chọn giờ giao"
            }
        },

    });
});