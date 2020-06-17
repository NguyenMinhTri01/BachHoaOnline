

	$(document).ready(function() {
		$("#formDemo").validate({
					rules: {
            pr_name:{
                        required:true,
                        minlength: 5
                        },
            pr_price:{
              required:true,
            },
            pr_value:{
                        required:true,
                        
                        },
            pr_description:{
                required:true,
            },
            pr_unit:{
              required:true
            },
            pr_key:{
              required:true
            },
            pr_avatar:{
              required:true
            },
					
					},
					messages: {
						pr_name: {
              required: "Dữ liệu không được để trống ",
							
                        },
             pr_price:{
              required:"Dữ liệu không được để trống"
             },
              pr_value:{
              required:"Dữ liệu không được để trống",
            },
            pr_description:{
              required:"Dữ liệu không được để trống",
            },
            pr_unit:{
              required:"Dữ liệu không được để trống"
            },
            pr_key:{
              required:"Dữ liệu không được để trống"
            },
            pr_avatar:{
              required:"Dữ liệu không được để trống"
            },
                      
          },
						
				});
	});
 $("#images").fileinput({

    'allowedFileExtensions': ["jpg", "png", "jpeg",]
    
    });
    jQuery(document).ready(function($) {
      $(".scroll").click(function(event){		
        event.preventDefault();
        $('.init-arrow-down').animate({scrollTop:$(this.hash).offset().top},1000);
      });
    });
    
    
