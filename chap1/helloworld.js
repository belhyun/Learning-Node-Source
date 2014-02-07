var global = {};
global.http = require('http');
global.underscore = require('underscore');
global.query_string = require('querystring');
global.query = require("url");
global.header = {
  'content-type': 'text/plain',
  'Pragma': 'no-cache'
};
(function($_){
  // load http module
  /*
  var http = require('http');

  // create http server
  http.createServer(function (req, res) {	

    console.log('accessed');
    // content header
    res.writeHead(200, {'content-type': 'text/plain'});
    // write message and signal communication is complete
    res.end("Hello, World!\n");
  }).listen(8124);
  console.log('Server running on 8124/');
  */
  //test
  /*
  var http = require("http");
  http.foo = 'bar';
  http.createServer(function (req, res) {	
    console.log('accessed');
    // content header
    //res.writeHead(200, {'content-type': 'text/plain'});
    res.writeHead(200, $_.header);
    // write message and signal communication is complete
    //res.end("Hello, World!\n");
    //res.end(http.constructor.toString());
    //var text='';for(ele in http){text+=ele.toString()+"\n"}res.end(text);
    //console.log(http.foo);
  }).listen(8124);
  */
  /*
  //v1
  var http = $_.http, belhyun = {}, _ = $_.underscore;
  _.extend(belhyun,http);
  belhyun.customServer = function(){
    return belhyun.createServer(function (req, res) {	
      console.log('accessed');
      res.writeHead(200, $_.header);
      res.end("Hello, World!\n");
    });
  };
  belhyun.customServer.call().listen(8124);
  */
  /*
  //v2
  var http = $_.http, belhyun = {}, _ = $_.underscore;
  _.extend(belhyun,http);
  belhyun.customServer = function($header, $body){
    return belhyun.createServer(function (req, res) {	
      console.log('accessed');
      //res.writeHead(200, $_.header);
      //res.end("Hello, World!\n");
      _.compose(function(body){
        console.log(body);
        res.end(body);
      },function(){
        var args = Array.prototype.slice.call(arguments, 0); 
        res.writeHead.apply(res,[200,args[0]]);
        return args[1];
      })($header, $body);
    });
  };
  belhyun.customServer.apply(belhyun.customServer,[$_.header,"belhyun custom server\n"]).listen(8124);
  */
  //v3
  var http = $_.http, belhyun = {}, _ = $_.underscore;
  _.extend(belhyun,http);
  belhyun.customServer = function($header, $body){
    return belhyun.createServer(function (req, res) {	
      console.log('accessed');
      _.compose(function(body){
        console.log(body);
        res.end(body);
      },function(){
        var args = Array.prototype.slice.call(arguments, 0), query; 
        res.writeHead.apply(res,[200,args[0]]);
        return _.map($_.query_string.parse($_.query.parse(req.url).query),function(v,k){
          return k+":"+v;
        }).join("\n");
        return Array.prototype.slice.call($_.query_string.parse($_.query.parse(req.url).query),0).join("\n");
      })($header, $body);
    });
  };
  belhyun.customServer.apply(belhyun.customServer,[$_.header]).listen(8124);
}).call(this, global);
