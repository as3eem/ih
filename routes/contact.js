const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');


router.post('/', (req, res) => {
  const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.phone}</li>
      <li>Field of Interest: ${req.body.field}</li>

      <li>Preffered Language: ${req.body.lang}</li>
      

    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'yourmailnames@gmail.com', // generated ethereal user
        pass: 'your-password'  // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
  });

    // setup email data with unicode symbols
  let mailOptions = {
    from: '"Imagine Huge" <yourmailnames@gmail.com>', // sender address
    to: 'ritikajais1999@gmail.com', // list of receivers
    subject: 'Contact Details', // Subject line
    text: 'Hello world?', // plain text body
    html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
       } else {

          console.log('Message sent: %s', info.messageId);   
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

          res.redirect('/');

       }
    });
});


module.exports = router;

