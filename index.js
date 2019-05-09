const sgMail = require('@sendgrid/mail');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
// Make the app to parse request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Route to send mail
app.post('/sendmail', async (req, res) => {
  try {
    // Extract data from request body
    const { subject, content, mail } = req.body;
    // init sendgrid with api key
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    // Create the message object
    const msg = {
      to: mail,
      from: 'this is the mail from where the mail will be sent',
      subject: subject,
      text: content,
      html: content,
    };
    //send the mail
    await sgMail.send(msg);
    // Return any success message
    return res.send({
      status: 200,
      message: 'Mail sent successfully',
    });
  } catch (error) {
    // Fallback response
    return res.send({
      status: 404,
      message: 'Something went wrong',
    });
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
