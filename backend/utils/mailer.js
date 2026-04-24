// // Gmail Mailer Utility using Nodemailer
// const nodemailer = require('nodemailer');

// // Create transporter using Gmail SMTP
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.GMAIL_EMAIL || 'your-email@gmail.com',
//     pass: process.env.GMAIL_APP_PASSWORD || 'your-app-password'
//   }
// });

// const sendEmail = async ({ to, subject, body }) => {
//   try {
//     console.log('\n=======================================');
//     console.log('📧 SENDING EMAIL VIA GMAIL SMTP');
//     console.log('=======================================');
//     console.log(`TO:      ${to}`);
//     console.log(`SUBJECT: ${subject}`);
//     console.log(`STATUS:  Sending...`);

//     const info = await transporter.sendMail({
//       from: process.env.GMAIL_EMAIL || 'noreply@compostify.com',
//       to: to,
//       subject: subject,
//       text: body,
//       html: `<pre>${body}</pre>`
//     });

//     console.log(`STATUS:  ✅ Sent successfully`);
//     console.log(`RESPONSE ID: ${info.messageId}`);
//     console.log('=======================================\n');

//     return true;
//   } catch (error) {
//     console.error('\n=======================================');
//     console.error('📧 EMAIL SENDING FAILED');
//     console.error('=======================================');
//     console.error(`ERROR: ${error.message}`);
//     console.error('=======================================\n');

//     // Log to console for dev purposes
//     console.log('\n⚠️ FALLBACK: Console Email Display:');
//     console.log('=======================================');
//     console.log(`TO:      ${to}`);
//     console.log(`SUBJECT: ${subject}`);
//     console.log(`BODY:\n${body}`);
//     console.log('=======================================\n');

//     return false;
//   }
// };

// module.exports = { sendEmail };




const nodemailer = require('nodemailer');

// ✅ Check required env variables
const EMAIL = process.env.GMAIL_EMAIL;
const PASSWORD = process.env.GMAIL_APP_PASSWORD;

if (!EMAIL || !PASSWORD) {
  console.warn("⚠️ Email credentials not set. Emails will not be sent.");
}

// ✅ Create transporter (SMTP config - more reliable)
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: EMAIL,
    pass: PASSWORD
  }
});

// ✅ Verify connection (optional but useful)
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email server connection failed:', error.message);
  } else {
    console.log('✅ Email server ready');
  }
});

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

    // fallback log
    console.log('\n⚠️ Email content (fallback):');
    console.log(`TO: ${to}`);
    console.log(`SUBJECT: ${subject}`);
    console.log(`BODY:\n${body}\n`);

    return false;
  }
};

module.exports = { sendEmail };
