var connect_DB = require('../model/DAO/connect_db');


module.exports = {

    createBook: function (req, res) {
        
        const sql = 'INSERT INTO book (title, reading_age, price, language_, edition, publication_date, publisher_name, isbn, provider_id, quantity) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
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
                console.log("///////////////////////");
                res.status(500).json({ message:err|| "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
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
        const sql = 'SELECT * FROM book WHERE book_id=?';
        connect_DB.query(sql, [
            req.body.book_id,
        ], function (err, result, field) {
            if (err) {
                console.log("///////////////////////");
                res.status(500).json({ message:err|| "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
                return;
            }
            else {
                const mappedResult = {
                    title: result[0].title || '',
                    readingAge: result[0].reading_age || 0,
                    price: result[0].price || '',
                    language: result[0].language_ || '',
                    edition: result[0].edition || '',
                    publicationDate: result[0].publication_date || '',
                    publisher: result[0].publisher_name || '',
                    isbn: result[0].isbn || '',
                    providerId: result[0].provider_id || '',
                    quantity: result[0].quantity || 0,
                    authors: result[0].authors || [''],
                    kindDetail: result[0].kindDetail || {},
                  };
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


}