// view password in form login admin
function viewPassword() {
  var x = document.getElementById("passInput");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}
