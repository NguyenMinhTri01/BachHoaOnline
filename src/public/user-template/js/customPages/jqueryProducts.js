
$(document).ready(function () {
  var selectSort = $('.selectSort');
  var tagCategory = $('#products');
  var addMoreProducts = $('.addMoreProducts');
  selectSort.change(function () {
    var sortVal = $(this).children("option:selected").val();
    addMoreProducts.attr('href', `products/viewMore/sort/${sortVal}/skip/`);
    addMoreProducts.attr('data-count', 8);
    $('.addMoreProducts').css('display', 'block');
    $.ajax({
      type: 'GET',
      url: `products/sort/${sortVal}`,
      data: null,
      success: function (res) {
        if (res && res.products.length > 0) {
          tagCategory.html('');
          if(products.length < 8){
            $('.addMoreProducts').css('display', 'none');
          }
          res.products.forEach(function (product) {
            var strOne = `<div style="min-height: 70px;">` +
              `<p>${product.pr_name}</p>` +
              `</div>`
            var strTwo = `<div style="min-height: 48px;">` +
              `<br>` + `<h4>${formatNumber(product.pr_price)} </h4>` + `</div>`

            if (product.pr_name.length >= 70) {
              strOne = `<div style="min-height: 70px;">` +
                `<p>${product.pr_name.slice(0, 70)}...</p>` +
                `</div>`
            };
            var strImageHot = '';
            if (product.pr_discount > 0) {
              strTwo = `<div style="min-height: 48px;">` +
                `<span data='${product.pr_price}' class="priceSp">${product.pr_priceString} </span><label ` +
                ` class="discount" style="margin-left: 6px;"> -${product.pr_discount}%</label>` +
                `<h4>${product.pr_priceNewString} </h4>` + `</div>`
            };
            if (product.pr_hot) {
              strImageHot = `<div class="agile_top_brand_left_grid_pos">` +
                `<img src="${res.SECURE_DELIVERY_URL}c_scale,w_40/BachHoaOnline/icon/hot_fire"` +
                `alt="logoHot" class="img-responsive" style="position: relative; top: -10px; left: 2px;">` +
                `</div> ` 
            }
            tagCategory.append(
              `<div class="col-md-3 top_brand_left">` +
              `<div class="hover14 column">` +
              `<div class="agile_top_brand_left_grid"> ` + strImageHot +
              `<div class="agile_top_brand_left_grid1">` +
              `<figure>` +
              `<div class="snipcart-item block text-center">` +
              `<div class="snipcart-thumb">` +
              `<a href="product/${res.category.c_slug}/${product.pr_slug}"><img title=" " alt=" "` +
              `src="${res.SECURE_DELIVERY_URL}${product.pr_avatar}" style="width: 100%"></a>` +
              strOne + strTwo + `</div>` +
              `<div class="snipcart-details top_brand_home_details">` +
              `<button data-id="${product._id}" class="btnAddCart"> Chọn mua</button>` +
              `</div>` +
              `</div>` +
              `</figure>` +
              `</div>` +
              `</div>` +
              `</div>` +
              `</div>`
            )
          })
          btnAddCartClick();
        }
        else {
        }
      }
    });
  });
  addMoreProducts.click(function(event) {
    event.preventDefault();
    var dataCount = $(this).attr("data-count");
    var newDataCount = +dataCount + 8;
    $(this).attr("data-count", `${newDataCount}`);
    var link = $(this).attr("href");
    $.ajax({
      type: 'GET',
      url: `${link}${dataCount}`,
      data: null,
      success: function (res) {
        if (res && res.products.length > 0) {
          if(res.products.length < 8){
            $('.addMoreProducts').css('display', 'none');
          };
          res.products.forEach(function (product) {
            var strOne = `<div style="min-height: 70px;">` +
              `<p>${product.pr_name}</p>` +
              `</div>`
            var strTwo = `<div style="min-height: 48px;">` +
              `<br>` + `<h4>${formatNumber(product.pr_price)} </h4>` + `</div>`

            if (product.pr_name.length >= 70) {
              strOne = `<div style="min-height: 70px;">` +
                `<p>${product.pr_name.slice(0, 70)}...</p>` +
                `</div>`
            };
            var strImageHot = '';
            if (product.pr_discount > 0) {
              strTwo = `<div style="min-height: 48px;">` +
                `<span data='${product.pr_price}' class="priceSp">${product.pr_priceString} </span><label ` +
                ` class="discount" style="margin-left: 6px;"> -${product.pr_discount}%</label>` +
                `<h4>${product.pr_priceNewString} </h4>` + `</div>`
            };
            if (product.pr_hot) {
              strImageHot = `<div class="agile_top_brand_left_grid_pos">` +
                `<img src="${res.SECURE_DELIVERY_URL}c_scale,w_40/BachHoaOnline/icon/hot_fire"` +
                `alt="logoHot" class="img-responsive" style="position: relative; top: -10px; left: 2px;">` +
                `</div> ` 
            }

            tagCategory.append(
              `<div class="col-md-3 top_brand_left">` +
              `<div class="hover14 column">` +
              `<div class="agile_top_brand_left_grid"> ` + strImageHot +
              `<div class="agile_top_brand_left_grid1">` +
              `<figure>` +
              `<div class="snipcart-item block text-center">` +
              `<div class="snipcart-thumb">` +
              `<a href="product/${res.category.c_slug}/${product.pr_slug}"><img title=" " alt=" "` +
              `src="${res.SECURE_DELIVERY_URL}${product.pr_avatar}" style="width: 100%"></a>` +
              strOne + strTwo + `</div>` +
              `<div class="snipcart-details top_brand_home_details">` +
              `<button data-id="${product._id}" class="btnAddCart"> Chọn mua</button>` +
              `</div>` +
              `</div>` +
              `</figure>` +
              `</div>` +
              `</div>` +
              `</div>` +
              `</div>`
            )
          })
          btnAddCartClick();
        }
        else {
          $('.addMoreProducts').css('display', 'none');
        }
      }
    });
  });


})