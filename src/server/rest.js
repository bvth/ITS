var mysql   = require("mysql");

function REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}
//=====check connection=====//
REST_ROUTER.prototype.handleRoutes = function(router,connection,md5) {
    var self = this;
    router.post("/hello",function(req,res){
        res.json({"Message" : "Hello World !"});
    });
//=====end=====//
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
                // rows.length !=0 ? res.json(rows[1]): res.json("error");
            }
        });
    });
//=====end=====//
//=====check inventory=====//
    router.post("/inventory",function(req,res){
        var query = "SELECT * FROM ??";
        var table = ["inventory"];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json(err.code);
            } else {
                res.json({"Inventory" : rows});
                // rows.length !=0 ? res.json(rows[1]): res.json("error");
            }
        });
    })
//=====end=====//
//=====check inventory on condition====//
    router.post("/search",function(req,res){
        var query;
        var compa;
        var value;
        if(isNaN(req.body.value)){
            console.log("string");
            value = req.body.value
        }
        else{
            console.log("#");
            value = Number(req.body.value)
        }
        switch(req.body.compare){
            case "less":
                query = "SELECT * FROM ?? WHERE ??<?";
                break;
            case "equals":
                query = "SELECT * FROM ?? WHERE ??=?";
                break;
            case "more":
                query = "SELECT * FROM ?? WHERE ??>?";
                break;
        }
        var table = ["inventory",req.body.col,value];
        query = mysql.format(query,table);
        console.log(query);
        connection.query(query,function(err,rows){
            if(err) {
                res.json(err.code);
            } else {
                res.json({"Inventory" : rows});
                // rows.length !=0 ? res.json(rows[1]): res.json("error");
            }
        });
    })
//=====end=====//
//=====LOG_IN=====//
    router.post('/login',function(req,res){
        var query = "SELECT ?? FROM ?? WHERE ??=? AND ??=?";
        var table = ['level','account','username',req.body.username,'password',req.body.password];
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
//=====end=====//
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
//=====end=====//
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
//=====history=====//
    router.post("/history",function(req,res){
        var query = "SELECT *,DATE_FORMAT(?,?) AS ? FROM ?? WHERE ??=(SELECT ?? FROM ?? WHERE ??=?)";
        var table = ["date","%m-%d-%y","date","history","inventory_inven_id","inven_id","inventory","title",req.body.title];
        query = mysql.format(query,table);
        console.log(req.body.title);
        var inven_id;
        connection.query(query,function(err,rows){
            if(err){
                console.log(err.code);
            }
            else{
                console.log(rows);
                res.json(rows);
            }
            }
        )
    })
//=====end=====//
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
//======delete account=====//
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
//=====end=====//
}

module.exports = REST_ROUTER;
