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
//{ carts: carts, couponPay: couponPay, dataOr : data_input},



function sentDataPayToServer(formInputPay, numberCart, bodyCartPay, sumPriceProduct, totalPay, transportCost) {
    var carts = localStorage.getItem('carts');
    if (carts && carts.length > 0) {
        var data_input = formInputPay.serialize();
        $.ajax({
            url: "sentDataPayToServer",
            type: 'POST',
            data: data_input,
            success: function (res) {  
                if (res == false) {
                    alert('server không phản hồi');
                }
                else {
                    if (res.type) {
                        localStorage.setItem('carts', '');
                        numberCart.text('0');
                        formInputPay.trigger("reset");
                        bodyCartPay.empty();
                        sumPriceProduct.text('0₫');
                        totalPay.text('0₫');
                        transportCost.text('0₫');
                        toastr.options = {
                            "timeOut": "3000",
                            "positionClass": "toast-bottom-right",
                          }
                          toastr.success('Thành Công', 'Đặt hàng');
                    }
                    else {
                        toastr.options = {
                            "timeOut": "2000",
                            "positionClass": "toast-bottom-right",
                          }
                          toastr.error('Không Thành Công', 'Đặt hàng');
                    }

                }
            }
        })
    }
    else {
        alert('Giỏ hàng đang rổng');
    }
}

function appendToCartPay(bodyCartPay, sumPriceProduct, totalPay, transportCost) {
    bodyCartPay.empty();
    var carts = localStorage.getItem('carts');
    if (carts && carts.length > 0) {
        $.ajax({
            url: "getProductsAddCart",
            type: 'POST',
            data: { carts: carts },
            success: function (res) {  // Hàm thực thi khi nhận dữ liệu được từ server
                if (res == false) {
                    alert('server không phản hồi');
                }
                else {
                    if (res.type) {
                        res.data.forEach(function (product) {
                            bodyCartPay.append(
                                `<tr id="${product._id}" class="fontSiteContent">` +
                                `<td class="w-25 imageCard">` +
                                `<img src="${res.SECURE_DELIVERY_URL + product.pr_avatar}" class="img-fluid img-thumbnail" alt="Sheep">` +
                                `</td>` +
                                `<td>${product.pr_name}</td>` +
                                `<td><span class="priceSp">${product.pr_priceString} </span>` +
                                `<span class="priceNew" data="${product.pr_priceNew}">${product.pr_priceNewString}</span></td>` +
                                `<td><i>x${product.pr_quantity}</i></td>` +
                                `<td data='${product.pr_sumPrice}' class="sumPrice">${product.pr_sumPriceString}</td>` +
                                `</tr>`
                            )
                        })
                        sumPriceProduct.text(res.sumPriceString);
                        sumPriceProduct.attr("data", res.sumPrice);
                        var fee = transportCost.attr("data");
                        var total = +res.sumPrice + (+fee)
                        totalPay.attr("data", total);
                        totalPay.text(formatNumber(total));
                    }
                }
            }
        });
    }


};


$(document).ready(function () {
    var bodyCartPay = $("#bodyCartPay");
    var sumPriceProduct = $(".sumPriceProduct");
    var discountPay = $(".discountPay");
    var couponPay = $("#couponPay");
    var transportCost = $(".transportCost");
    var totalPay = $(".totalPay");
    var finishPay = $('#finishPay');
    var formInputPay = $('#formInputPay');
    var _carts = $("#_carts");
    var numberCart = $(".numberCart");
    appendToCartPay(bodyCartPay, sumPriceProduct, totalPay, transportCost);

    finishPay.click(function (event) {
        event.preventDefault();
        var carts = localStorage.getItem('carts');
        _carts.val(carts);
        sentDataPayToServer(formInputPay, numberCart, bodyCartPay, sumPriceProduct, totalPay, transportCost);
    })


    $("#formInputPay").validate({
        rules: {
            u_name: {
                required: true,
            },
            u_phoneNumber: {
                required: true,
            },
            provincesOrCities: {
                required: true,
            },

            district: {
                required: true,
            },
            wards: {
                required: true,
            },
            detail: {
                required: true,
            },
            date: {
                required: true,
            },
            time: {
                required: true,
            }

        },
        messages: {
            u_name: {
                required: "Vui lòng nhập họ và tên",
            },
            u_phoneNumber: {
                required: "Vui lòng nhập vào số điện thoại"
            },
            provincesOrCities: {
                required: "Vui lòng nhập thành phố(tỉnh)"
            },
            district: {
                required: "Vui lòng nhập quận/huyện"
            },
            wards: {
                required: "Vui lòng nhập phường/xã"
            },
            detail: {
                required: "vui lòng nhập số nhà,tên đường "
            },
            or_deliveryDate: {
                required: "Vui lòng chọn ngày giao"
            },
            time: {
                required: "Vui lòng chọn giờ giao"
            }
        },

    });
});