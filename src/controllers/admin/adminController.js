
let getInfoAdmin = (req, res) => {
  res.render("admin/form_InfoAndEditAdmin", {
    base_Url : process.env.BASE_URL,
    adminInfo: req.user
  });
};

module.exports = {
  getInfoAdmin : getInfoAdmin
}