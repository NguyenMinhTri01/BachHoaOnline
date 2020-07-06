function reloadReady () {
  return $(document).ready(function(){
    var bodyCart = $("#bodyCart");
    var numberCart = $('.numberCart');
    var sumPriceTotal = $("#sumPriceTotal");
    var currentNumber = getNumberOfItemsInCart();
    var formPay = $("#formPay");

    $('._delete').on('click', function(){
      var id = $(this).attr('data');
      //
      changeLocalStorage(id, 0);
      var parent = $(this).parents('tr');
      var sumPriceData = parent.find('.sumPrice').attr('data');
      var pr_quantity = parent.find('.pr_quantity').val();
      var sumPriceTotalData = sumPriceTotal.attr('data');
      var subTotal = sumPriceTotalData - sumPriceData
      sumPriceTotal.attr('data', subTotal);
      sumPriceTotal.text(formatNumber(subTotal));
      $(`#${id}`).remove();
      numberCart.text(`${+numberCart.text() - +pr_quantity}`);
    })


    $('.pr_quantity').on('input', function (){

      var checkUpDown
      var pr_quantity = $(this).val();
      var parent = $(this).parents('tr');
      
      // thay doi localStorage


      var pr_priceNew = parent.find('.priceNew').attr('data');
      var sumPrice = parent.find('.sumPrice');

      var sumPriceData = sumPrice.attr('data');
      var total = +pr_priceNew * pr_quantity;
      (+sumPriceData < total) ? checkUpDown = 1 : checkUpDown = -1;
      var sumCart = +sumPriceTotal.attr('data') + pr_priceNew*checkUpDown;
      numberCart.text(`${+numberCart.text() + checkUpDown}`);
      sumPriceData = sumPrice.attr('data', total);
      total = formatNumber(total);
      sumPrice.text(total);

      sumPriceTotal.attr('data', sumCart);
      sumCart = formatNumber(sumCart);
      sumPriceTotal.text(sumCart);
      var id = parent.attr('id');
      changeLocalStorage(id, pr_quantity);
    })


  });
}



function getNumberOfItemsInCart(){
  var carts = localStorage.getItem('carts');
  carts = carts ? carts.split('@') : [];
  var count = 0;
  carts.forEach((cart) => {
    var objectCart = JSON.parse(cart)
    count = count + objectCart.quantity;
  })
  return count;
};


function changeLocalStorage(id, quantity){
  var carts = localStorage.getItem('carts');
  var cartsArr = carts.split('@');
  if (quantity > 0) {
    cartsArr = cartsArr.map((cart) =>{
      cart = JSON.parse(cart);
      if (cart._id === id) {
        cart.quantity = +quantity;
        return JSON.stringify(cart);
      }
      return JSON.stringify(cart);
    })
  }
  else {
    cartsArr = cartsArr.filter(  cart => JSON.parse(cart)._id !== id);
  }
  localStorage.setItem('carts', cartsArr.join('@'));
}


function formatNumber(nStr) {
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + '.' + '$2');
  }
  return x1 + x2 + "₫";
};

// function appendOneProductToCart (id , bodyCart, sumPrice){
//   var item = $(`#${id}`)
//   if(item.text()){

//   }
// }

function appendToCart(bodyCart, sumPriceTotal){
  bodyCart.empty();
  var carts = localStorage.getItem('carts');
  if(carts && carts.length > 0){
    $.ajax({
      url: "getProductsAddCart",
      type: 'POST',
      data: {carts : carts},
      success : function(res){  // Hàm thực thi khi nhận dữ liệu được từ server
            if(res == false){
              alert('server không phản hồi');
            } 
            else {
              if (res.type){
                res.data.forEach(function(product){
                  bodyCart.append(
                    `<tr id="${product._id}" class="fontSiteContent">`+
                    `<td class="w-25 imageCard">`+
                      `<img src="${res.SECURE_DELIVERY_URL + product.pr_avatar}" class="img-fluid img-thumbnail" alt="Sheep">`+
                    `</td>`+
                    `<td>${product.pr_name}</td>`+
                    `<td><span class="priceSp">${product.pr_priceString} </span>`+
                    `<span class="priceNew" data="${product.pr_priceNew}">${product.pr_priceNewString}</span></td>`+
                    `<td class="qty"><input name="pr_quantity" class="pr_quantity" type="number" value="${product.pr_quantity}"  min="1" max="999"></td>`+
                    `<td data='${product.pr_sumPrice}' class="sumPrice">${product.pr_sumPriceString}</td>`+
                    `<td>`+
                      `<button data="${product._id}" class="btn btn-danger btn-sm _delete">`+
                        `<i class="fa fa-times"></i>`+
                      `</button>`+
                    `</td>`+
                  `</tr>`
                  )
                })
                sumPriceTotal.text(res.sumPriceString);
                sumPriceTotal.attr("data",res.sumPrice);
                reloadReady();
              }
            }
      }
    });
  }
};





$(document).ready(function () {
  
  var bodyCart = $("#bodyCart");
  var numberCart = $('.numberCart');
  var sumPriceTotal = $("#sumPriceTotal");
  var currentNumber = getNumberOfItemsInCart();
  var formPay = $("#formPay");
  numberCart.text(currentNumber);
  appendToCart(bodyCart, sumPriceTotal);
  // setTimeout(function(){

  //   $('._delete').on('click', function(){
  //     var id = $(this).attr('data');
  //     //
  //     changeLocalStorage(id, 0);
  //     var parent = $(this).parents('tr');
  //     var sumPriceData = parent.find('.sumPrice').attr('data');
  //     var pr_quantity = parent.find('.pr_quantity').val();
  //     var sumPriceTotalData = sumPriceTotal.attr('data');
  //     var subTotal = sumPriceTotalData - sumPriceData
  //     sumPriceTotal.attr('data', subTotal);
  //     sumPriceTotal.text(formatNumber(subTotal));
  //     $(`#${id}`).remove();
  //     numberCart.text(`${+numberCart.text() - +pr_quantity}`);
  //   })


  //   $('.pr_quantity').on('input', function (){


  //     var checkUpDown
  //     var pr_quantity = $(this).val();
  //     var parent = $(this).parents('tr');
      
  //     // thay doi localStorage


  //     var pr_priceNew = parent.find('.priceNew').attr('data');
  //     var sumPrice = parent.find('.sumPrice');

  //     var sumPriceData = sumPrice.attr('data');
  //     var total = +pr_priceNew * pr_quantity;
  //     (+sumPriceData < total) ? checkUpDown = 1 : checkUpDown = -1;
  //     var sumCart = +sumPriceTotal.attr('data') + pr_priceNew*checkUpDown;
  //     numberCart.text(`${+numberCart.text() + checkUpDown}`);
  //     sumPriceData = sumPrice.attr('data', total);
  //     total = formatNumber(total);
  //     sumPrice.text(total);

  //     sumPriceTotal.attr('data', sumCart);
  //     sumCart = formatNumber(sumCart);
  //     sumPriceTotal.text(sumCart);
  //     var id = parent.attr('id');
  //     changeLocalStorage(id, pr_quantity);
  //   })
  // }, 2000);

  // slider
  jQuery('#demo1').skdslider({ 'delay': 5000, 'animationSpeed': 2000, 'showNextPrev': true, 'showPlayButton': true, 'autoSlide': true, 'animationType': 'fading' });

  jQuery('#responsive').change(function () {
    $('#responsive_wrapper').width(jQuery(this).val());
  });



  $(".btnAddCart").on('click', function () {
    numberCart.text(`${+numberCart.text() + 1}`);
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
          quantity : +oldQuantity + 1
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
  })
})
