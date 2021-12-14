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
        res.render('store_items', context)
    });





    return router;
}();
