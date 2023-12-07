import { useEffect, useState, useContext } from "react";
import axios from "axios"
import bookIcon from "../../img/book_icon.png"
import "../order/order.css"

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
            <li key={book.book_id}>
              {`Book ID: ${book.book_id}, Book Name: ${book.name}, Quantity: ${book.quantity}`}
            </li>
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
       <>
       <h1>Tác giả yêu thích của bạn</h1>
        Danh sách các tác giả yêu thích kèm các tác phẩm của họ mà bạn đã mua. Tác phẩm của tác giả mà bạn đã mua: 
        <select class="form-select" name="number-books" aria-label="Default select example" value={filter} onChange={(e) => setFilter(e.target.value)} style={{width: "30%",  height: "35px",marginLeft: "40px", marginRight: "40px"}}>
                <option value="0">Từ 1 cuốn trở lên</option>
                <option value="Trên 5 cuốn">Trên 5 cuốn</option>
                <option value="Trên 10 cuốn">Trên 10 cuốn</option>
        </select>
        {Object.keys(booksByAuthor).map((authorName) => (
        <div key={authorName}>
          <h3>{`Author Name: ${authorName}`}</h3>
          <BookList books={booksByAuthor[authorName]} />
        </div>
      ))}
       </>
    )
}

export default ViewHistoryBook;