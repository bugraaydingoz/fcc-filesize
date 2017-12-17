var express = require('express');
var multer = require('multer');
var fs = require('fs');

var app = express();
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')   
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)      
    }
})
var upload = multer({ storage: storage });

app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});


app.post("/get-file-size", upload.single('myfile'), function (req, res) {
  
  if (!req.file) {
    console.log("No file received");
  } else {
    console.log('file received');
  }
  
  var stats = fs.statSync("./uploads/" + req.file.filename)
  var size = stats.size;
  
  res.send({size:size});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
