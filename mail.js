const nodemailer = require('nodemailer');
const express = require("express");
const app = express();
const path = require('path');
const bodyparser = require("body-parser");
let code = 0;


app.use(bodyparser.urlencoded({extended : true}));
app.use(bodyparser.json());

const transporter = nodemailer.createTransport({
  service: 'chiragbansal112004@gmail.com', 
  auth: {
    user: 'chiragbansal112004@gmail.com', 
    pass: "osei mgmo bdzc pizk", 
  },
});
 
function send(receiveradd , verificationcode)
{
  const mailOptions = {
    from: 'chiragbansal112004@gmail.com', 
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
send("chiragbansal511@gmail.com" , verificationcode);
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