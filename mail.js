const nodemailer = require('nodemailer');
const express = require("express");
const app = express();
const path = require('path');
const bodyparser = require("body-parser");
let code = 0;


app.use(bodyparser.urlencoded({extended : true}));
app.use(bodyparser.json());

const transporter = nodemailer.createTransport({
  service: '' // sender address, 
  auth: {
    user: '' // sender address, 
    pass: "" // app password, 
  },
});
 
function send(receiveradd , verificationcode)
{
  const mailOptions = {
    from: '' // sender address, 
    to: receiveradd, 
    subject: 'subject', 
    text: `${verificationcode}`,
  };
  

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });   
}

function verificationmessage()
{
const verificationcode = Math.floor(Math.random()*8999 + 1000);
send("" , verificationcode); // receiver address
console.log(verificationcode);
return verificationcode;
}

app.get('/' , (req , res)=>{

  res.sendFile(path.join(__dirname, '/index.html'));
  code = verificationmessage();
});


app.post('/' , (req , res)=>{
  const entercode = req.body.code;
  console.log(entercode);
     if(code == entercode)
     res.send("sucess");

     else res.send("failed");
})

app.listen(80 , ()=>{
  console.log("server started");
});
