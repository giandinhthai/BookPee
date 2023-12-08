var connect_DB = require('../model/DAO/connect_db');


module.exports = {
    getAllBooks: function (req, res) {
        connect_DB.query("call show_all_book()", function (err, result, field) {
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
    getAllGenres: function (req, res) {
        connect_DB.query("SELECT DISTINCT genres FROM genres_book", function (err, result, field) {
            if (err) {
                res.status(500).json({ message: "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
            }
            else if (result.length == 0) {
                res.status(400).json({ message: "Không tồn tại thể loại" });
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
    filter: function(req, res){
        if (req.body.criteria.price == '') price = null
        else price = req.body.criteria.price
        if (req.body.criteria.genres == '') genres = null
        else genres = req.body.criteria.genres
        connect_DB.query("call filter_book(?, ?, ?)", [genres, price, req.body.criteria.order], function (err, result, field) {
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
    getDetail: function(req, res){
        connect_DB.query("call show_book_info(?)", [req.body.book_id], function (err, result, field) {
            if (err) {
                res.status(500).json({ message: "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
            }
            else if (result.length == 0) {
                res.status(400).json({ message: "Không tồn tại sách" });
            }
            else {
                console.log(result)
                res.json(result)
            }
        })
    }

}