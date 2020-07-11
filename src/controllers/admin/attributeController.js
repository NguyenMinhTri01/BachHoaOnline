const getViewIndex = ( req, res) => {
  res.send("chưa có gì")
}

const getViewAdd = ( req, res) => {
  res.render("admin/attribute/add", {
    base_Url: process.env.BASE_URL,
    adminInfo: req.adminInfo,
    title: "Bach Hóa Online | Thêm Thuộc Tính Giao Diện",
  });
};

module.exports = {
  getViewIndex,
  getViewAdd
}