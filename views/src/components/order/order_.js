import { useEffect, useState, useContext } from "react";
import axios from "axios"
import bookIcon from "../../img/book_icon.png"
import "../order/order.css"
import SortIcon from '@mui/icons-material/Sort';
import "bootstrap/dist/css/bootstrap.min.css";
function Order() {
    const [books, setBooks] = useState([]);
    const [genres, setGenres] = useState([]);
    const [criteria, setCriteria] = useState({
      genres: "All",
      price: "All",
      order: "Từ A đến Z"
    });
  
    // Manage quantities for each book
    const [bookQuantities, setBookQuantities] = useState({});
  
    const [individualModalOpen, setIndividualModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
  
    const [summaryOrderModalOpen, setSummaryOrderModalOpen] = useState(false);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setCriteria((prevCriteria) => ({ ...prevCriteria, [name]: value }));
    };
  
    useEffect(() => {
      axios.get('/api/order')
        .then(response => setBooks(response.data))
        .catch(error => console.error('Error fetching books:', error));
    }, []);
  
    useEffect(() => {
      axios.get('/api/order/genres')
        .then(response => setGenres(response.data))
        .catch(error => console.error('Error fetching books:', error));
    }, []);
  
    useEffect(() => {
      axios.post('/api/order/filter', { criteria })
        .then(response => setBooks(response.data))
        .catch(error => console.error('Error fetching books:', error));
    }, [criteria]);
  
    const handleSearch = (e) => {
      e.preventDefault();
      const name = e.target.elements.name.value;
      axios.post('/api/order/search', { bookName: name })
        .then(response => setBooks(response.data))
        .catch(error => console.error('Error fetching books:', error));
    }
  
    const handleRefresh = (e) => {
      setCriteria({
        genres: "All",
        price: "All",
        order: "Từ A đến Z"
      })
    }
  
    const openIndividualModal = (book) => {
      setSelectedBook(book);
      setIndividualModalOpen(true);
    }
  
    const closeIndividualModal = () => {
      setSelectedBook(null);
      setIndividualModalOpen(false);
    }
  
    // Update quantity for a book
    const handleQuantityChange = (bookId, quantity) => {
      setBookQuantities(prevQuantities => ({
        ...prevQuantities,
        [bookId]: quantity
      }));
    }
  
    const handleSummaryOrder = () => {
      setSummaryOrderModalOpen(true);
    }
  
    const closeSummaryOrderModal = () => {
      setSummaryOrderModalOpen(false);
    }
  
    return (
      <div className="body">
        
        <div class="container" style={{marginBottom: "20px"}}>
          <button class="btn btn-block btn-primary" onClick={handleSummaryOrder} style={{marginBottom: "20px", marginLeft: "auto",  marginRight: "0"}}>Summary Order</button>
	            <div class="row" id="search">
		            <form id="search-form" style={{display: "flex", flexDirection: "row"}} onSubmit={handleSearch}>
			            <div class="form-group col-xs-9" style={{width: "80%"}}>
				            <input class="form-control" type="text" placeholder="Search" name="name" />
			            </div>
			            <div class="form-group col-xs-3"style={{marginLeft: "50px"}}>
				            <button type="submit" class="btn btn-block btn-primary" >Search</button>
			            </div>
		            </form>
	            </div>
            </div>
            <div className="row justify-content-center" style={{marginBottom:"30px"}} >
                Thể loại
            <select class="form-select" name= "genres" aria-label="Default select example" value={criteria.genres}  onChange={handleInputChange} style={{width: "10%", height: "35px", marginLeft: "40px", marginRight: "40px"}}>
                <option value ="All">All</option>
                {genres.map((card, i) => (
                    <option key={i} value={card.genres}>
                    {card.genres}
                    </option>
                ))}
            </select>
                 Giá
            <select class="form-select" name="price" aria-label="Default select example" value={criteria.price} onChange={handleInputChange} style={{width: "30%",  height: "35px",marginLeft: "40px", marginRight: "40px"}}>
                <option value="All">All</option>
                <option value="Dưới 50.000đ">Dưới 50.000đ</option>
                <option value="Từ 50.000đ đến dưới 100.000đ">Từ 50.000đ đến dưới 100.000đ</option>
                <option value="Từ 100.000đ trở lên">Từ 100.000đ trở lên</option>
            </select>
                Sắp xếp theo
            <select class="form-select" name="order" aria-label="Default select example" value={criteria.order} onChange={handleInputChange} style={{width: "10%",  height: "35px",marginLeft: "40px", marginRight: "40px"}}>
                <option value="Từ A-Z">Từ A-Z</option>
                <option value="Từ Z-A">Từ Z-A</option>
                <option value="Giá tăng dần">Giá tăng dần</option>
                <option value="Giá giảm dần">Giá giảm dần</option>
            </select>
            <button class="btn btn-primary" type="submit" style={{width: "10%"}} onClick={handleRefresh}>Làm mới</button>
        </div>
        <div className="row">
          {books.map((book, i) => (
            <div className='col-sm-4 product' style={{ cursor: "pointer"}} key={i}>
              <div className='product-inner text-center' style={{ minHeight: "250px"}} onClick={() => openIndividualModal(book)}>
                <img src={bookIcon} style={{ height: "100px", width: "100px" }}/>
                <br />Tên sách: {book.title}, {book.edition}
                <br />Giá: {book.price} đ
              </div>
            </div>
          ))}
        </div>
  
        {selectedBook && (
          <div className="modal" style={{ display: individualModalOpen ? 'block' : 'none' }}>
            <div className="modal-content">
              <span className="close" style = {{marginLeft: "auto",  marginRight: "0"}} onClick={() => {handleQuantityChange(selectedBook.book_id, 0); closeIndividualModal()}}>x</span>
              <div className="row justify-content-center" style={{width: "20%"}}>
                    <div class="input-group">
                <div class="input-group-prepend">
                    <button class="btn btn-outline-primary" type="button" onClick={() => handleQuantityChange(selectedBook.book_id, Math.max(0, (bookQuantities[selectedBook.book_id] || 0) - 1))} >-</button>
                </div>
                <input type="text" class="form-control" value={bookQuantities[selectedBook.book_id] || 0}/>
                <div class="input-group-prepend">
                    <button class="btn btn-outline-primary" type="button" onClick={() => handleQuantityChange(selectedBook.book_id, (bookQuantities[selectedBook.book_id] || 0) + 1)}>+</button>
                </div>
               
                </div> 
            </div>
             <button class="btn btn-primary" type="submit" style={{width: "40%"}} onClick={(e) => {handleRefresh();closeIndividualModal()}}>Thêm vào giỏ hàng</button>
            </div>
          </div>
        )}
  
        {summaryOrderModalOpen && (
          <div className="modal" style={{ display: summaryOrderModalOpen ? 'block' : 'none' }}>
            <div className="modal-content">
              <span className="close" onClick={closeSummaryOrderModal} style = {{marginLeft: "auto",  marginRight: "0"}}>x</span>
              <p>Summary Order:</p>
              <ul>
                {Object.entries(bookQuantities).map(([bookId, quantity]) => (
                  quantity > 0 && (
                    <li key={bookId}>
                      Book ID: {bookId}, Quantity: {quantity}, , Name: {books.find(book => book.book_id === parseInt(bookId, 10)).title}, Provider: {books.find(book => book.book_id === parseInt(bookId, 10)).provider_id}
                    </li>
                  )
                ))}
              </ul>
            </div>
          </div>
        )}
  
        
      </div>
    )
  }
  
  export default Order;
  