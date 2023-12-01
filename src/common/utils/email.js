const nodemailer = require("nodemailer");

async function sendEmail(code, reciver) {
  console.log("daspojd");
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

  let info = await transporter.sendMail({
    from: '"Me" <johnnycash@protonmail.com>',
    to: reciver,
    subject: "Hello!",
    text: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>One-Time Password (OTP) Code</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f9f9f9;
            }
            h1, h2, p {
                color: #333;
            }
            h1 {
                font-size: 24px;
                margin-bottom: 20px;
            }
            h2 {
                font-size: 18px;
                margin-bottom: 10px;
            }
            p {
                font-size: 16px;
                margin-bottom: 20px;
            }
            .button {
                background-color: #4CAF50;
                color: white;
                padding: 10px 20px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                text-decoration: none;
            }
            .button:hover {
                background-color: #45a049;
            }
        </style>
    </head>
    <body>
        <h1>One-Time Password (OTP) ${code}</h1>
        <h2>Hello!</h2>
        <p>Your OTP code is: <strong>[INSERT_OTP_CODE_HERE]</strong></p>
        <p>This code is valid for a short period of time and should be entered on the relevant page to complete your action.</p>
        <p>If you did not request this code, please disregard this email.</p>
        <button class="button">Copy Code</button>
        <script>
            var copyButton = document.querySelector('.button');
            copyButton.addEventListener('click', function() {
                navigator.clipboard.writeText([INSERT_OTP_CODE_HERE]);
                alert('Code copied to clipboard!');
            });
        </script>
    </body>
    </html>`,
  });

  console.log("Message sent: %s", info.messageId);
}

module.exports = { sendEmail };
