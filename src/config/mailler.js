import nodeMailer from "nodemailer";

let adminEmail = process.env.EMAIL;
let adminPassword = process.env.PW_EMAIL;
let emailHost = "smtp.gmail.com";
let emailPort = 587;

let sendMail =  (to, subject, htmlContent) => {
  let stranSporter = nodeMailer.createTransport({
    host: emailHost,
    port: emailPort,
    secure: false,
    auth: {
      user: adminEmail,
      pass: adminPassword
    },
    requireTLS: true,
    requireSSL : true,
  });

  let options = {
    from: adminEmail,
    to: to,
    subject: subject,
    html: htmlContent
  };
  return stranSporter.sendMail(options);
};
module.exports = sendMail;
