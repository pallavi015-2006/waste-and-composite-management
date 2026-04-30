
// const nodemailer = require('nodemailer');

// // ✅ Check required env variables
// const EMAIL = process.env.GMAIL_EMAIL;
// const PASSWORD = process.env.GMAIL_APP_PASSWORD;

// if (!EMAIL || !PASSWORD) {
//   console.warn("⚠️ Email credentials not set. Emails will not be sent.");
// }

// // ✅ Create transporter (SMTP config - more reliable)
// // const transporter = nodemailer.createTransport({
// //   host: 'smtp.gmail.com',
// //   port: 587,
// //   secure: false,
// //   auth: {
// //     user: EMAIL,
// //     pass: PASSWORD
// //   }
// // });

// // ✅ Verify connection (optional but useful)

// const transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 587,
//   secure: false,
//   auth: {
//     user: EMAIL,
//     pass: PASSWORD
//   },
//   connectionTimeout: 60000,
//   greetingTimeout: 30000,
//   socketTimeout: 60000,
//   tls: {
//     rejectUnauthorized: false
//   }
// });
// transporter.verify((error, success) => {
//   if (error) {
//     console.error('❌ Email server connection failed:', error.message);
//   } else {
//     console.log('✅ Email server ready');
//   }
// });

// const sendEmail = async ({ to, subject, body }) => {
//   try {
//     if (!EMAIL || !PASSWORD) {
//       console.log('⚠️ Email skipped (no credentials)');
//       return false;
//     }

//     console.log(`📧 Sending email to: ${to}`);

//     const info = await transporter.sendMail({
//       from: `"Compostify" <${EMAIL}>`,
//       to,
//       subject,
//       text: body,
//       html: `<p style="white-space: pre-line;">${body}</p>`
//     });

//     console.log(`✅ Email sent: ${info.messageId}`);
//     return true;

//   } catch (error) {
//     console.error('❌ Email sending failed:', error.message);

//     // fallback log
//     console.log('\n⚠️ Email content (fallback):');
//     console.log(`TO: ${to}`);
//     console.log(`SUBJECT: ${subject}`);
//     console.log(`BODY:\n${body}\n`);

//     return false;
//   }
// };

// module.exports = { sendEmail };


const nodemailer = require('nodemailer');

// ✅ Environment variables
const EMAIL = process.env.GMAIL_EMAIL;
const PASSWORD = process.env.GMAIL_APP_PASSWORD;

if (!EMAIL || !PASSWORD) {
  console.warn("⚠️ Email credentials not set. Emails will not be sent.");
}

// ✅ Create transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: EMAIL,
    pass: PASSWORD
  },
  connectionTimeout: 60000,
  greetingTimeout: 30000,
  socketTimeout: 60000,
  tls: {
    rejectUnauthorized: false
  }
});

// ✅ Verify connection only if credentials exist
if (EMAIL && PASSWORD) {
  transporter.verify((error) => {
    if (error) {
      console.error('❌ Email server connection failed:', error.message);
    } else {
      console.log('✅ Email server ready');
    }
  });
}

// ✅ Send Email Function
const sendEmail = async ({ to, subject, body }) => {
  try {
    if (!EMAIL || !PASSWORD) {
      console.log('⚠️ Email skipped (no credentials)');
      return false;
    }

    console.log(`📧 Sending email to: ${to}`);

    const info = await transporter.sendMail({
      from: `"Compostify" <${EMAIL}>`,
      to,
      subject,
      text: body,
      html: `<p style="white-space: pre-line;">${body}</p>`
    });

    console.log(`✅ Email sent: ${info.messageId}`);
    return true;

  } catch (error) {
    console.error('❌ Email sending failed:', error.message);

    // fallback (for debugging)
    console.log('\n⚠️ Email content (fallback):');
    console.log(`TO: ${to}`);
    console.log(`SUBJECT: ${subject}`);
    console.log(`BODY:\n${body}\n`);

    return false;
  }
};

module.exports = { sendEmail };
