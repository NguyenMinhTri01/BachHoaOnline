
//    validate username
   
   $(document).ready(function () {
        
        $("#forminfor").validate({
            rules: {
                u_name: {
                    required: true,
                },
                u_phoneNumber: {
                    required: true,
                    minlength: 10,
                    maxlength:11,

                },
                u_email:{
                    required: true,
                },
                day:{
                    required: true,
                },
                o_password:{
                    required:true,
                },
                n_password:{
                    required:true,
                },
                r_password:{
                    required:true,
                }
            },
            messages: {
                u_name: {
                    required: "Vui lòng nhập họ và tên",
                },
                u_phoneNumber: {
                    required: "vui lòng nhập số điện thoại",
                    minlength:"Số bạn vừa nhâp không phải số điện thoại",
                    maxlength:"Số bạn vừa nhập không phải số điện thoại"
                },
                u_email:{
                    required: "vui lòng nhập vào Email"
                },
                day:{
                    required: "vui lòng nhập vào ngày sinh"
                },
                o_password:{
                    required:"Bạn phải nhật mật khẩu cũ"
                },
                n_password:{
                    required:"Bạn phải đặt mật khẩu mới"
                },
                r_password:{
                    required:"Nhập lại mật khẩu mới"
                }
                
            }
        })
    })
// sự kiện checkbox
        function showMe (box) {
        
        var chboxs = document.getElementsByName("pk");
        var vis = "none";
        for(var i=0;i<chboxs.length;i++) { 
            if(chboxs[i].checked){
             vis = "block";
                break;
            }
        }
        document.getElementById(box).style.display = vis;
    
    
    }
    
