module.exports = function () {
    var express = require('express');
    var router = express.Router();



    function getTransactions(res, mysql, context, complete) {
        mysql.pool.query("SELECT transaction_id as id FROM Transactions", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.transactions = results;
            complete();
        });
    }
    function getItems(res, mysql, context, complete) {
        mysql.pool.query("SELECT item_id as id, name FROM Items", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.items = results;
            complete();
        });
    }


    function getTransactionItems(res, mysql, context, complete, transaction_id) {
        var sql = "SELECT transaction_id, item_id FROM Transaction_Items";
        mysql.pool.query(sql, function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.transaction_items = results;
            complete();
        });
    }

    /*Display transaction_items list. */

    router.get('/', function (req, res) {
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getTransactions(res, mysql, context, complete);
        getItems(res, mysql, context, complete);
        getTransactionItems(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 3) {
                res.render('transaction_items', context);
            }

        }
    });



    /* Adds a transaction_item */

    router.post('/', function (req, res) {
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Transaction_Items (transaction_id, item_id) VALUES (?, ?)";
        var inserts = [req.body.transaction_id, req.body.item_id];
        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/transaction_items');
            }
        });
    });


    return router;
}();
