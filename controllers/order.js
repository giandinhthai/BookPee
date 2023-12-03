var connect_DB = require('../model/DAO/connect_db');


module.exports = {
    getAllBooks: function (req, res) {
        connect_DB.query("SELECT * FROM book", function (err, result, field) {
            if (err) {
                res.status(500).json({ message: "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
            }
            else if (result.length == 0) {
                res.status(400).json({ message: "Không tồn tại sách" });
            }
            else {
                res.json(result)
            }
        })
    
    },
    search: function (req, res) {
        console.log("123")
        console.log(req.body)
        connect_DB.query("SELECT * FROM book WHERE title = ?", [req.body.bookName], function (err, result, field) {
            if (err) {
                res.status(500).json({ message: "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
            }
            else if (result.length == 0) {
                res.status(400).json({ message: "Không tồn tại sách" });
            }
            else {
                res.json(result)
            }
        })
    
    },

}