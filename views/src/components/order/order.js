import { useEffect, useState, useContext } from "react";
import axios from "axios"
import bookIcon from "../../img/book_icon.png"
import "../order/order.css"
import SortIcon from '@mui/icons-material/Sort';

function Order (){
    const [books, setBooks] = useState([])
    const [genres, setGenres] = useState([])
    const [criteria, setCriteria] = useState({
        genres: "",
        price: "",
        order: "titleasc"
    })
    const [bookQuantities, setBookQuantities] = useState({});
    const [detailSelectedBook, setDetailSelectedBook] = useState();
    const [individualModalOpen, setIndividualModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
  
    const [summaryOrderModalOpen, setSummaryOrderModalOpen] = useState(false);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCriteria((prevCriteria) => ({ ...prevCriteria, [name]: value }));
      };
    useEffect(() => {
        axios.get('/api/order')
          .then(response => {setBooks(response.data[0])})
          .catch(error => console.error('Error fetching books:', error));
      }, []);
    useEffect(() => {
        axios.get('/api/order/genres')
          .then(response => setGenres(response.data))
          .catch(error => console.error('Error fetching books:', error));
      }, []);
    const handleFilter = () => {
        axios.post('/api/order/filter', {criteria})
          .then(response => {setBooks(response.data[0]);})
          .catch(error => console.error('Error fetching books:', error));

    }
    const handleSearch = (e) => {
        e.preventDefault();
        const name = e.target.elements.name.value;
        axios.post('/api/order/search', {bookName: name})
          .then(response => setBooks(response.data))
          .catch(error => console.error('Error fetching books:', error));
    }
    const handleRefresh = (e) => {
        setCriteria({
            genres: "",
            price: "",
            order: "titleasc"
        })
        axios.get('/api/order')
          .then(response => {setBooks(response.data[0]);})
          .catch(error => console.error('Error fetching books:', error));
    }
    const openIndividualModal = (book) => {
        axios.post('/api/order/detail', {book_id: book.book_id})
          .then(response => {console.log(response.data);})
          .catch(error => console.error('Error fetching books:', error));
        setSelectedBook(book);
        setIndividualModalOpen(true);
        //setDetailSelectedBook(response.data[0])
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




    return(
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
            <select class="form-select" name= "genres" aria-label="Default select example" value={criteria.genres}  onChange={handleInputChange} style={{width: "10%", height: "35px", marginLeft: "30px", marginRight: "30px"}}>
                <option value ="">All</option>
                {genres.map((card, i) => (
                    <option key={i} value={card.genres}>
                    {card.genres}
                    </option>
                ))}
            </select>
                 Giá
            <select class="form-select" name="price" aria-label="Default select example" value={criteria.price} onChange={handleInputChange} style={{width: "30%",  height: "35px",marginLeft: "30px", marginRight: "30px"}}>
                <option value = "">All</option>
                <option value="low">Dưới 50.000đ</option>
                <option value="mid">Từ 50.000đ đến dưới 100.000đ</option>
                <option value="high">Từ 100.000đ trở lên</option>
            </select>
                Sắp xếp theo
            <select class="form-select" name="order" aria-label="Default select example" value={criteria.order} onChange={handleInputChange} style={{width: "10%",  height: "35px",marginLeft: "30px", marginRight: "30px"}}>
                <option value="titleasc">Từ A-Z</option>
                <option value="titledesc">Từ Z-A</option>
                <option value="priceasc">Giá tăng dần</option>
                <option value="pricedesc">Giá giảm dần</option>
            </select>
            <button class="btn btn-primary" type="submit" style={{width: "5%", marginRight: "20px"}} onClick={handleFilter}>Lọc</button>
            <button class="btn btn-primary" type="reset" style={{width: "10%"}} onClick={handleRefresh}>Làm mới</button>
            </div>

            <div className = "row">
            {books.map((card, i) => (
                <div className='col-sm-4 product' style = {{cursor: "pointer"}} key={i}  onClick={() => openIndividualModal(card)}  >
                    <div className='product-inner text-center'>
                        <img src={bookIcon} style = {{height: "100px", width: "100px"}}/>
                            <br />Tên sách: {card.title}
                            <br />Giá: {card.price} đ
                    </div>
                </div>))}
            </div>

            {selectedBook && (
                <div className="modal" style={{ display: individualModalOpen ? 'block' : 'none' }}>
                    <div className="modal-content">
                    <span className="close" style = {{marginLeft: "auto",  marginRight: "0"}} onClick={() => {handleQuantityChange(selectedBook.book_id, 0); closeIndividualModal()}}>x</span>
                    <div className="detail-book">
                        <div>Thông tin sách</div>
                    </div>
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
                    <button class="btn btn-primary" type="submit" style={{width: "40%", marginRight: "0", marginLeft: "auto", marginTop:"20px"}} onClick={(e) => {handleRefresh();closeIndividualModal()}}>Thêm vào giỏ hàng</button>
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