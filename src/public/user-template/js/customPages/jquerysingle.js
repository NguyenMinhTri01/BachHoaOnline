
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  var captionText = document.getElementById("caption");
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  captionText.innerHTML = dots[slideIndex - 1].alt;
}



function btnAddCartDetailClick (numberOfProduct) {
  
  var bodyCart = $("#bodyCart");
  var sumPriceTotal = $("#sumPriceTotal");
  $(".btnAddCartDetail").on('click', function () {
    var numberCart = $('.numberCart');
    if(+numberOfProduct.val() > 0) {
      numberCart.text(`${+numberCart.text() + +numberOfProduct.val()}`);
      toastr.options = {
        "timeOut": "2000",
        "positionClass": "toast-bottom-right",
      }
      toastr.success('vào giỏ hàng', 'Đã thêm sản phẩm');                    
      var id = $(this).attr('data-id');
      var carts = localStorage.getItem('carts');
      carts = carts ? carts.split('@') : [];
      if (carts.length > 0) {
        var currentLength = carts.length;
        var _carts = carts.filter( cart => JSON.parse(cart)._id !== id)
        var newLength = _carts.length;
        if (currentLength > newLength) {
          var _cart = carts.find( cart => JSON.parse(cart)._id === id)
          var oldQuantity = JSON.parse(_cart).quantity
          var objectCart = {
            _id: id,
            quantity : +oldQuantity + +numberOfProduct.val()
          }
          var stringCart = JSON.stringify(objectCart);
          _carts.push(stringCart);
        }
        else {
          var objectCart = {
            _id: id,
            quantity : 1
          }
          var stringCart = JSON.stringify(objectCart);
          _carts.push(stringCart);
        }
        stringCarts = _carts.join('@');
        localStorage.setItem('carts', stringCarts);
      }
      else {
        var objectCart = {
          _id: id,
          quantity : 1
        }
        var stringCart = JSON.stringify(objectCart);
        carts.push(stringCart);
        localStorage.setItem('carts', carts.toString());
      }
      appendToCart(bodyCart, sumPriceTotal);
  
    }
  })
}

$(document).ready(function() {
  var numberOfProduct = $('#numberOfProduct');
  btnAddCartDetailClick(numberOfProduct);
})


