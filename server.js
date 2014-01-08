
var express = require('express');
var app = express();

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.get('/', function (req, res) {
    res.render('home.html');
});

app.get('/about', function (req, res) {
    res.render('about.html');
});

app.get('/search', function(req, res) {
   res.send('You searched for: ' + req.query.searchTerm);
});


app.use("/css", express.static(__dirname + '/css'));

app.listen(process.env.PORT);