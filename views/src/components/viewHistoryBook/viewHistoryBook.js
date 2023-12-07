import { useEffect, useState, useContext } from "react";
import axios from "axios"
import bookIcon from "../../img/book_icon.png"
import "../viewHistoryBook/viewHistoryBook.css"
function ViewHistoryBook (){
    const [books, setBooks] = useState([])
    const [filter, setFilter] = useState("0")
    const [data, setData] = useState([
        {book_id: 1, name: "Book name 1", author_name: "Tác giả 1", quantity: "20"},
        {book_id: 2, name: "Book name 2", author_name: "Tác giả 1", quantity: "10"},
        {book_id: 3, name: "Book name 1", author_name: "Tác giả 1", quantity: "20"},
        {book_id: 4, name: "Book name 2", author_name: "Tác giả 1", quantity: "10"},
        {book_id: 5, name: "Book name 1", author_name: "Tác giả 2", quantity: "20"},
        {book_id: 6, name: "Book name 2", author_name: "Tác giả 2", quantity: "10"},
        {book_id: 7, name: "Book name 1", author_name: "Tác giả 3", quantity: "20"},
        {book_id: 8, name: "Book name 2", author_name: "Tác giả 3", quantity: "10"},
    ])
    const BookList = ({ books }) => (
        <ul>
          {books.map((book) => (
            <>
          <div className="card-history">
            <img src={bookIcon} style = {{height: "100px", width: "100px"}}/>
            <div>
              <div style={{fontSize: "25px", fontWeight: "500"}}>Tên sách: {book.name}</div>
              <div>Số lượng đã mua: {book.quantity}</div>
              <div>Nhà cung cấp:</div>
            </div> 
          </div>
          </>
          ))}
        </ul>
      );
    const booksByAuthor = data.reduce((acc, book) => {
        const { author_name, ...bookDetails } = book;
        if (!acc[author_name]) {
          acc[author_name] = [];
        }
        acc[author_name].push(bookDetails);
        return acc;
      }, {});
    
    return(
       <div className="body">
       <h1>Tác giả yêu thích của bạn</h1>
       <div className="title">Danh sách các tác giả yêu thích kèm các tác phẩm của họ mà bạn đã mua. Tác giả mà bạn đã mua tổng số tác phẩm của họ: </div>
       <div style={{marginLeft: "40%", marginTop: "20px"}}>
        <select class="form-select" name="number-books" aria-label="Default select example" value={filter} onChange={(e) => setFilter(e.target.value)} style={{width: "30%",  height: "35px",marginLeft: "40px", marginRight: "40px"}}>
                <option value="0">Từ 1 cuốn trở lên</option>
                <option value="Trên 5 cuốn">Trên 5 cuốn</option>
                <option value="Trên 10 cuốn">Trên 10 cuốn</option>
        </select>
       </div>
        
        {Object.keys(booksByAuthor).map((authorName) => (
        <div key={authorName}>
          <h3 className="card_"> {`Tên tác giả: ${authorName}`}</h3>
          <BookList books={booksByAuthor[authorName]} />
        </div>
      ))}
       </div>
    )
}

export default ViewHistoryBook;