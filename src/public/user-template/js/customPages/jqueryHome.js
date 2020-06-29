




$(document).ready(function () {

  // slider
  jQuery('#demo1').skdslider({ 'delay': 5000, 'animationSpeed': 2000, 'showNextPrev': true, 'showPlayButton': true, 'autoSlide': true, 'animationType': 'fading' });

  jQuery('#responsive').change(function () {
    $('#responsive_wrapper').width(jQuery(this).val());
  });

  // Mini Cart
  //var myTemplate = "<div><%= config.strings.subtotal %> <%= cart.total({ format: true, showCode: true }) %></div>";
  // paypal.minicart.render({
  // });
  // var data = { "business": "user@example.com", "item_name": "Product", "amount": 20.00, "currency_code": "USD" };
  // paypal.minicart.cart.add(data);
  // if (~window.location.search.indexOf('reset=true')) {
  //   paypal.minicart.reset();
  // };


})