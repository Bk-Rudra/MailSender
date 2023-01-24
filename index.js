const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(bodyParser.json());
var nodemailer = require("nodemailer");
let PORT = process.env.PORT || 3000;
app.use(cors({ origin: "*" }));

app.post("/sendmail", (req, res) => {
  let email, msg, firstName, lastName, mobileNumber;
  email = req.body.email;
  msg = req.body.Message;
  firstName = req.body.Name;
  lastName = req.body.LastName;
  mobileNumber = req.body.Mobile;
  let transporter = nodemailer.createTransport({
    host: "smtp.cdac.in",
    port: 587,
    secure: true,
    auth: {
      user: "pki",
      pass: "pki@India@123",
    },
    tls: { secureProtocol: "TLSv1.3_method" },
  });
  let mailOptions = {
    from: "pki@cdac.in",
    to: "pki@cdac.in",
    subject: "New enquiry from " + firstName + " " + lastName,
    text:
      msg + "\nFor contact, mail me on: " + email + " or call: " + mobileNumber,
  };
  transporter.sendMail(mailOptions, (err, success) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Sent successfully!");
    }
  });
  res.sendStatus(200);
});
app.get("/hello", (req, res) => {
  res.send("hello am working");
});
app.listen(PORT);
