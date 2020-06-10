
const getViewAdd = (req, res) => {
  res.render("admin/product/add", {
    base_Url : process.env.BASE_URL,
    adminInfo: req.user,
    title : "Bach Hóa Online | Thêm Sản Phẩm",
  });
}

module.exports = {
  getViewAdd,
}