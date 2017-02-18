  var express = require('express');
  var bodyParser = require('body-parser')
  var app = express();
  var nodemailer = require('nodemailer');

  app.use(express.static(__dirname+'/public'))
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'emakhobokeni@gmail.com',
        pass: 'amathumbu11'
    }
  });


  app.get('/',function(req,res){

  	res.sendfile('index.html')

  })


app.post('/contact',function(req,res){
	var client = req.body;

	var msg = "<div style='border:1px solid black;box-shadow:1px 1px 10px 1px black;padding:10%;'>"+
			  "<h2>"+client.name +"</h2>"+
			  "<h4> "+client.package +"</h4>"+
			  "<h4> "+client.email+"</h4>"+
			  "<h3> "+client.message+'</h3>'+
			  "</div>"
    console.log(msg)
	var mailOptions = {
	    from: 'online profile', // sender address
	    to: 'ayabonga@projectcodex.co', // list of receivers
	    subject: 'New Client', // Subject line
	    text: msg, // plaintext body
	    html: msg // html body
	};


	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        return console.log(error);
	    }
	    console.log('Message sent: ' + info.response);
	    res.redirect('/')

	});
})



module.exports = app;
