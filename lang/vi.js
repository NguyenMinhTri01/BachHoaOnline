export const transValidation = {
  email_incorrect: "email không chính xác",
}

export const transErrors = {
  login_failed : "Tên đăng nhập hoặc mật khẩu không đúng!",
  checkPasswordFailed : "Mật khẩu hiện tại không đúng!",
  add_data_failed : "Dữa liệu đã tồn tại",
  data_invalid : "Dữ liệu không tồn tại",
  remove_data_failed : {
    status : 'Thất Bại',
    action : 'Xóa Dữ liệu'
  },
  update_status_failed: {
    status : 'Thất Bại',
    action : 'Cập Nhật'
  },
  register_failed : 'Địa chỉ email đã được sử dụng',
  adminUserNameIsExists : 'Tên đăng nhập đã tồn tại',
  updateProfileUserFailed : 'Mật khẩu cũ không đúng',
};

export const transMail = {
  subject: "Đặt lại mật khẩu Bách Hóa Online",
  contentSetPassword: (newPassword, urlHome) => {
    return `
      <h2>Bạn nhận được email này vì đã yêu cầu đặt lại mật tại <a href="${urlHome}"> Bách Hóa Online </a></h2>
      <h3>Mật khẩu mới của bạn là: <srtong><font color="red"> ${newPassword}</font></strong>.</h3>
      <h3>Nếu email này là nhầm lẫn, hay bỏ qua nó. Trân trọng.</h3>
    `;
  }
}

export const transSuccess = {
  login_successful : "Đăng nhập thành công",
  add_data_successful : "Thêm dữ liệu Thành công",
  remove_data_successful : {
    status : 'Thành Công',
    action : 'Xóa Dữ liệu'
  },
  register_successful : {
    status : 'Thành Công',
    action : 'Đăng Ký'
  },
  update_infoAdmin_successful: {
    status : 'Thành Công',
    action : 'Cập Nhật'
  },
  update_status_successful: {
    status : 'Thành Công',
    action : 'Cập Nhật'
  },
  update_data_successful : "Cập nhật dữ liệu thành công",
  updateProfileUserSuccess : "Cập nhật thông tin thành công"
}
export const notification = {
  category_disabled : "Danh mục sản phẩm không còn tồn tại trên hệ thống"
}
