module.exports = function () {
    var express = require('express');
    var router = express.Router();



    function getItems(res, mysql, context, complete) {
        mysql.pool.query("SELECT item_id, name, quantity, price FROM Items", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.items = results;
            complete();
        });
    }


    /*Display all Items. */

    router.get('/', function (req, res) {
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getItems(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('items', context);
            }

        }
    });


    /* Adds an item, redirects to the store page after adding */

    router.post('/', function (req, res) {
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Items (name, quantity, price) VALUES (?, ?, ?)";
        var inserts = [req.body.name, req.body.quantity, req.body.price];
        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/items');
            }
        });
    });


    return router;
}();
