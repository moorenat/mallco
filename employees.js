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
    function getEmployeeWithNameLike(req, res, mysql, context, complete) {
        //sanitize the input as well as include the % character
        var query = "SELECT employee_id as id, first_name, last_name, Stores.name AS store FROM Employees INNER JOIN Stores ON Employees.store_id = Stores.store_id WHERE Employees.first_name LIKE " + mysql.pool.escape(req.params.s + '%');
        console.log(query)

        mysql.pool.query(query, function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.people = results;
            complete();
        });
    }
    function getEmployees(res, mysql, context, complete) {
        mysql.pool.query("SELECT employee_id, first_name, last_name, Stores.name AS store FROM Employees INNER JOIN Stores ON Employees.store_id = Stores.store_id", function (error, results, fields) {

            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.employees = results;
            complete();
        });
    }
    function getEmployee(res, mysql, context, id, complete) {
        var sql = "SELECT employee_id as id, first_name, last_name, Stores.name AS store FROM Employees INNER JOIN Stores ON Employees.store_id = Stores.store_id WHERE employee_id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function (error, results, fields) {

            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.employee = results[0];
            complete();
        });
    }

    /*Display all Employees and their Store. */

    router.get('/', function (req, res) {
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getEmployees(res, mysql, context, complete);
        getStores(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 2) {
                res.render('employees', context);
            }

        }
    });


    /* Adds an Employee, redirects to the store page after adding */

    router.post('/', function (req, res) {
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Employees (first_name, last_name, store_id) VALUES (?, ?, ?)";
        var inserts = [req.body.first_name, req.body.last_name, req.body.store_id];
        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/employees');
            }
        });
    });

    /* Deletes an Employee */

    router.get('/delete/:employee_id', function (req, res) {
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Employees WHERE employee_id = ?";
        var inserts = [req.params.employee_id];
        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/employees');
            }
        });
    });

    // updates employee
    router.get('/:id', function (req, res) {
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["selectedstore.js", "updateemployee.js"];
        var mysql = req.app.get('mysql');
        getEmployee(res, mysql, context, req.params.id, complete);
        // getStore(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('update-employee', context);
            }

        }
    });
    // searches for employee
    router.get('/search/:s', function (req, res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["filteremployee.js", "searchemployee.js"];
        var mysql = req.app.get('mysql');
        getEmployeeWithNameLike(req, res, mysql, context, complete);
        getPlanets(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 2) {
                res.render('employees', context);
            }
        }
    });

    return router


}();



