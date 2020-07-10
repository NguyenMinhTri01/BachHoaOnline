
  // Add active class to the current button (highlight it)
  var header = document.getElementById("tablist");
  var acs = header.getElementsByClassName("ac");
  for (var i = 0; i < acs.length; i++) {
    acs[i].addEventListener("click", function () {
      var current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      this.className += " active";
    });
  }
 