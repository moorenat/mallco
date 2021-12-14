module.exports = function () {
    var express = require('express');
    var router = express.Router();


    function getStores(res, mysql, context, complete) {
        mysql.pool.query("SELECT store_id as id, name FROM Stores", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.stores = results;
            complete();
        });
    }

    function getEmployees(res, mysql, context, complete) {
        mysql.pool.query("SELECT employee_id as id, CONCAT(first_name, ' ', last_name) as employee FROM Employees", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.employees = results;
            complete();
        });
    }

    function getTransactions(res, mysql, context, complete) {
        mysql.pool.query("SELECT transaction_id, date, total, Stores.name AS store, CONCAT(Employees.first_name, ' ', Employees.last_name) as employee FROM Transactions INNER JOIN Stores ON Transactions.store_id = Stores.store_id INNER JOIN Employees ON Transactions.employee_id = Employees.employee_id", function (error, results, fields) {

            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.transactions = results;
            complete();
        });
    }


    /*Display all Employees and their Store. */

    router.get('/', function (req, res) {
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getTransactions(res, mysql, context, complete);
        getStores(res, mysql, context, complete);
        getEmployees(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 3) {
                res.render('transactions', context);
            }

        }
    });


    /* Adds an Employee, redirects to the store page after adding */

    router.post('/', function (req, res) {
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Transactions (date, employee_id, total, store_id) VALUES (?, ?, ?, ?)";
        var total = req.body.total
        if (total == '') {
            total = null
        }
        var inserts = [req.body.date, req.body.employee_id, total, req.body.store_id];
        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/transactions');
            }
        });
    });

    //delete transaction via id

    router.get('/delete/:transaction_id', function (req, res) {
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Transactions WHERE transaction_id = ?";
        var inserts = [req.params.transaction_id];
        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/transactions');
            }
        });
    });


    return router;
}();

