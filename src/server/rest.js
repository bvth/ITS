var mysql   = require("mysql");

function REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}
//=====check connection=====//
REST_ROUTER.prototype.handleRoutes = function(router,connection,md5) {
    var self = this;
    router.get("/hello",function(req,res){
        res.json({"Message" : "Hello World !"});
    });
//=====show accounts=====//
    router.post("/show",function(req,res){
        var query = "SELECT * FROM ??";
        var table = ["account"];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Users" : rows});
            }
        });
    });
//=====LOG_IN=====//
    router.post('/login',function(req,res){
        var query = "SELECT ?? FROM ?? WHERE ??=? AND ??=?";
        var table = ['level','account','username',req.body.username,'password',md5(req.body.password)];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err){
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            }
            else {
                res.json({"Error" : false, "Message" : "Success", "Users" : rows});
            }
        })
    })
//=====show account with ID=====//
    router.post("/users/:user_id",function(req,res){
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
//======Add account=====//
    router.post("/users",function(req,res){
        var query = "INSERT INTO ??(??,??,??,??,??) VALUES (?,?,?,?,?)";
        var table = ["account","username","password","name","level","department",
                        req.body.username,md5(req.body.password),req.body.name,req.body.level,req.body.dep];
        query = mysql.format(query,table);
        console.log(req.body.username,req.body.password, md5(req.body.password));
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
                console.log(err.code);
            } else {
                res.json({"Error" : false, "Message" : "User Added !"});
            }
        });
    });
//======update ID======//
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
//======deleet account=====//
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
