module.exports = function () {
    var express = require('express');
    var router = express.Router();



    function getStores(res, mysql, context, complete) {
        mysql.pool.query("SELECT store_id, name FROM Stores", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.stores = results;
            complete();
        });
    }


    /*Display all Stores. */

    router.get('/', function (req, res) {
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getStores(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('stores', context);
            }

        }
    });


    /* Adds a Store, redirects to the store page after adding */

    router.post('/', function (req, res) {
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Stores (name) VALUES (?)";
        var inserts = [req.body.name];
        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/stores');
            }
        });
    });


    return router;
}();
