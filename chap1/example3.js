var http = require('http');
var fs = require('fs');

counter = 0;
// write out numbers
function writeNumbers(res) {

  // increment global, write to client
  while(true){
    counter++;
    res.write(counter.toString() + '\n');
  }
}

// create http server
http.createServer(function (req, res) {

   var query = require('url').parse(req.url).query;
   var app = require('querystring').parse(query).file + ".txt";

   // content header
   res.writeHead(200, {'Content-Type': 'text/plain'});

   // write out numbers
   writeNumbers(res);

   // timer to open file and read contents
   setTimeout(function() {

      console.log('opening ' + app);
      // open and read in file contents
      fs.readFile(app, 'utf8', function(err, data) {
         if (err)
            res.write('Could not find or open file for reading\n');
         else {
            res.write(data);
         }
         // reponse is done
         res.end();
      });
   },2000);
}).listen(8124);

console.log('Server running at 8124/');
