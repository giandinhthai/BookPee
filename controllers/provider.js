var connect_DB = require('../model/DAO/connect_db');


module.exports = {

    createBook: function (req, res) {
        console.log("controller createBook",req.body.bookData);
        req.body.bookData.providerId=1;
        const sql = 'CALL add_book(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        connect_DB.query(sql, [
            req.body.bookData.title,
            req.body.bookData.readingAge,
            req.body.bookData.price,
            req.body.bookData.language,
            req.body.bookData.edition,
            req.body.bookData.publicationDate,
            req.body.bookData.publisher,
            req.body.bookData.isbn,
            req.body.bookData.providerId,
            req.body.bookData.quantity,
        ], function (err, result, field) {
            if (err) {
                console.log(err);
                res.status(500).json({ message:err.sqlMessage|| "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
                // res.status(500).json({ message:err.message|| "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
                return;
            }
            else {
                console.log("///////////2341////////////");
                res.json({message:"Thêm sách thành công"});
                return;
            }
        })
    
    },
    getBookDetail:function(req,res){
        console.log("////2///////////////////");

        connect_DB.query("call show_book_info(?)", [req.body.book_id], function (err, result, field) {
            if (err) {
                console.log(111);
                res.status(500).json({ message: "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
            }
            else if (result.length == 0) {
                console.log(222);

                res.status(400).json({ message: "Không tồn tại sách" });
            }
            else {
                console.log(result[0][0]);

                const mappedResult = {
                    title: result[0][0].title || '',
                    readingAge: result[0][0].reading_age || 0,
                    price: result[0][0].price || '',
                    language: result[0][0].language_ || '',
                    edition: result[0][0].edition || '',
                    publicationDate: result[0][0].publication_date || '',
                    publisher: result[0][0].publisher_name || '',
                    isbn: result[0][0].isbn || '',
                    providerName: result[0][0].provider_name || '',
                    quantity: result[0][0].quantity || 0,
                    penname: result[0][0].penname || '',
                    maxDiscount: result[0][0].max_discount || '',
                    genres:result[0][0].genres||'',
                    // authors: result[0].authors || [''],
                    // kindDetail: result[0].kindDetail || {},
                };
                for (const key in result[0][0]) {
                    if (result[0][0].hasOwnProperty(key)) {
                      // Check if the property has a specific prefix
                      if (key.startsWith('audio_')||key.startsWith('rating_') || key.startsWith('kindle_') || key.startsWith('physical_')) {
                        const prefix = key.split('_')[0]; // Get the prefix (audio, kindle, physical)
                        if (!mappedResult[prefix]) {
                          mappedResult[prefix] = {};
                        }
                        // Assign the property to the corresponding prefix
                        mappedResult[prefix][key] = result[0][0][key] || '';
                      }
                    }
                  }
                console.log(mappedResult);
                res.json({message:"Lấy thông tin sách thành công", bookData:mappedResult});
                return;
            }
        })
    },
    updateBook:function(req,res){
        const sql = 'UPDATE book SET title = ?, reading_age = ?, price = ?, language_ = ?, edition = ?, publication_date = ?, publisher_name = ?, quantity = ?, isbn = ? WHERE book_id=? AND provider_id = ?';
        connect_DB.query(sql, [
        req.body.bookData.title,
        req.body.bookData.readingAge,
        req.body.bookData.price,
        req.body.bookData.language,
        req.body.bookData.edition,
        req.body.bookData.publicationDate,
        req.body.bookData.publisher,
        req.body.bookData.quantity,
        req.body.bookData.isbn,
        req.body.bookId,
        req.body.providerId,
        ], (error, results) => {
        if (error) {
            // Handle the error
            console.error(error);
            res.status(500).json({message:error||"Hệ thống gặp vấn đề. Vui lòng thử lại sau"});
            return;
        } else {
            // Handle the success
            res.status(200).json({message:'Cập nhật thông tin sách thành công'});
            console.log('Cập nhật thông tin sách thành công');
            return;
        }
        });
    },
    getAllBooks: function (req, res) {
        
        connect_DB.query("call show_book_by_provider(?, ?, ?, ?)", [req.body.providerid, null, null, 'titleasc'], function (err, result, field) {
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
        connect_DB.query("SELECT * FROM book WHERE title = ? and provider_id = ?", [req.body.bookName, req.body.providerid], function (err, result, field) {
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
        console.log(req.body)
        if (req.body.criteria.price == '') price = null
        else price = req.body.criteria.price
        if (req.body.criteria.genres == '') genres = null
        else genres = req.body.criteria.genres
        connect_DB.query("call show_book_by_provider(?, ?, ?, ?)", [req.body.providerid, genres, price, req.body.criteria.order], function (err, result, field) {
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
                res.json(result)
            }
        })
    }
}