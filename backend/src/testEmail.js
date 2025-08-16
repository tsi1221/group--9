const nodemailer = require('nodemailer');

(async () => {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "tsehayneshbiruh2@gmail.com",
        pass: "brsocwtxbevknvha"
      }
    });

    let info = await transporter.sendMail({
      from: '"Test" <tsehayneshbiruh2@gmail.com>',
      to: "tsehayneshbiruh62@gmail.com",
      subject: "Hello",
      text: "Test email"
    });

    console.log("Message sent: %s", info.messageId);
  } catch (err) {
    console.error(err);
  }
})();
