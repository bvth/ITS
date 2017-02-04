require("source-map-support").install();
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var express = __webpack_require__(1);
	var mysql   = __webpack_require__(2);
	var bodyParser  = __webpack_require__(3);
	var md5 = __webpack_require__(4);
	var rest = __webpack_require__(5);
	var app  = express();
	
	function REST(){
	    var self = this;
	    self.connectMysql();
	};
	
	REST.prototype.connectMysql = function() {
	    var self = this;
	    var pool      =    mysql.createPool({
	        connectionLimit : 100,
	        host     : 'mysql.cc.puv.fi',
	        user     : 'e1300501',
	        password : '38ZWfz4EhBEw',
	        database : 'e1300501_inventory',
	        debug    :  false
	    });
	    pool.getConnection(function(err,connection){
	        if(err) {
	          self.stop(err);
	        } else {
	          self.configureExpress(connection);
	        }
	    });
	}
	
	REST.prototype.configureExpress = function(connection) {
	      var self = this;
	      app.use(bodyParser.urlencoded({ extended: true }));
	      app.use(bodyParser.json());
	      var router = express.Router();
	      app.use('/link', router);
	      var rest_router = new rest(router,connection,md5);
	      self.startServer();
	}
	
	REST.prototype.startServer = function() {
	      app.listen(3000,function(){
	          console.log("All right ! I am alive at Port 3000.");
	      });
	}
	
	REST.prototype.stop = function(err) {
	    console.log("ISSUE WITH MYSQL \n" + err);
	    process.exit(1);
	}
	
	new REST();


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("mysql");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("MD5");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var mysql   = __webpack_require__(2);
	
	function REST_ROUTER(router,connection,md5) {
	    var self = this;
	    self.handleRoutes(router,connection,md5);
	}
	
	REST_ROUTER.prototype.handleRoutes = function(router,connection,md5) {
	    var self = this;
	    router.get("/",function(req,res){
	        res.json({"Message" : "Hello World !"});
	    });
	
	    router.get("/users",function(req,res){
	        var query = "SELECT * FROM ??";
	        var table = ["user_login"];
	        query = mysql.format(query,table);
	        connection.query(query,function(err,rows){
	            if(err) {
	                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
	            } else {
	                res.json({"Error" : false, "Message" : "Success", "Users" : rows});
	            }
	        });
	    });
	
	    router.get("/users/:user_id",function(req,res){
	        var query = "SELECT * FROM ?? WHERE ??=?";
	        var table = ["user_login","user_id",req.params.user_id];
	        query = mysql.format(query,table);
	        connection.query(query,function(err,rows){
	            if(err) {
	                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
	            } else {
	                res.json({"Error" : false, "Message" : "Success", "Users" : rows});
	            }
	        });
	    });
	
	    router.post("/users",function(req,res){
	        var query = "INSERT INTO ??(??,??) VALUES (?,?)";
	        var table = ["user_login","user_email","user_password",req.body.email,md5(req.body.password)];
	        query = mysql.format(query,table);
	        connection.query(query,function(err,rows){
	            if(err) {
	                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
	            } else {
	                res.json({"Error" : false, "Message" : "User Added !"});
	            }
	        });
	    });
	
	    router.put("/users",function(req,res){
	        var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
	        var table = ["user_login","user_password",md5(req.body.password),"user_email",req.body.email];
	        query = mysql.format(query,table);
	        connection.query(query,function(err,rows){
	            if(err) {
	                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
	            } else {
	                res.json({"Error" : false, "Message" : "Updated the password for email "+req.body.email});
	            }
	        });
	    });
	
	    router.delete("/users/:email",function(req,res){
	        var query = "DELETE from ?? WHERE ??=?";
	        var table = ["user_login","user_email",req.params.email];
	        query = mysql.format(query,table);
	        connection.query(query,function(err,rows){
	            if(err) {
	                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
	            } else {
	                res.json({"Error" : false, "Message" : "Deleted the user with email "+req.params.email});
	            }
	        });
	    });
	}
	
	module.exports = REST_ROUTER;


/***/ }
/******/ ]);
//# sourceMappingURL=backend.js.map