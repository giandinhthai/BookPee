import { useEffect, useState, useContext } from "react";
import axios from "axios"
import bookIcon from "../../img/book_icon.png"
import "../order/order.css"
import SortIcon from '@mui/icons-material/Sort';



import '../CRUID_book/create_book.css'
import '../CRUID_book/book_detail.css'
import bookShopIcon from '../../img/bookshop.jpg'
const RatingStars = ({ rating }) => {
  const roundedRating = Math.round(rating * 2) / 2;
  const filledStars = Math.floor(roundedRating);
  return (
    <div className="rating-stars">
      {[...Array(5)].map((_, index) => {
        if (index < filledStars) {
          return <span key={index}>&#9733;</span>; // Filled star character
        }else {
          return <span key={index}>&#9734;</span>; // Unfilled star character
        }
      })}
    </div>
  );
};


function Order (){
    const [books, setBooks] = useState([])
    const [genres, setGenres] = useState([])
    const [criteria, setCriteria] = useState({
        genres: "",
        price: "",
        order: "titleasc"
    })
    const [bookQuantities, setBookQuantities] = useState({});
    const [detailSelectedBook, setDetailSelectedBook] = useState([]);
    const [individualModalOpen, setIndividualModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
  
    const [summaryOrderModalOpen, setSummaryOrderModalOpen] = useState(false);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCriteria((prevCriteria) => ({ ...prevCriteria, [name]: value }));
      };
    useEffect(() => {
      axios.post('/api/order/filter', {criteria})
      .then(response => {setBooks(response.data[0]);})
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
    const [orderItems, setOrderItems] = useState([]);
    const handleAddToCart = () => {
      if (selectedBook) {
        // Add the selected book details to the orderItems array
        setOrderItems(prevOrderItems => [...prevOrderItems, detailSelectedBook[0]]);
        
        // Close the individual modal
        closeIndividualModal();
      }
    };
    const handleRefresh = (e) => {
        setCriteria({
            genres: "",
            price: "",
            order: "titleasc"
        })
        axios.post('/api/order/filter', {criteria})
        .then(response => {setBooks(response.data[0]);})
        .catch(error => console.error('Error fetching books:', error));
    }
    const getDetail = (book) => {
      console.log(book.book_id)
      axios.post('/api/order/detail', {book_id: book.book_id})
          .then(response => {setDetailSelectedBook(response.data[0]); setSelectedBook(book); setIndividualModalOpen(true);  })
          .catch(error => console.error('Error fetching books:', error));
    }
    const openIndividualModal = (book) => {
        getDetail(book);
        //setSelectedBook(book);
        //setIndividualModalOpen(true); 
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


      
      const [bookData, setBookData] = useState({
        title: '',
        readingAge: 0,
        price: '',
        language: '',
        edition: '',
        publicationDate: '',
        publisher: '',
        isbn: '',
        quantity: 0,
        authors: [''],
        kindDetail: {},
    });
    const [responseMessage, setResponseMessage] = useState('');
    const [isModalNotiOpen,setModalNoti]=useState(false);
    const [isLoading,setLoading]=useState(true);
    const booktype = (audio, kindle, physical) => {
      if (audio != null) return "Audio Book"
      else if (kindle != null) return "Kindle Book"
      else return "Physical Book";
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
                <div className='col-sm-4 product' style = {{cursor: "pointer"}} key={i}  onClick={() => {openIndividualModal(card) }}>
                    <div className='product-inner text-center'>
                        <img src={bookIcon} style = {{height: "100px", width: "100px"}}/>
                            <br />Tên sách: {card.title}
                            <br />Giá: {card.price} đ
                            <br />Kiểu sách: {card.book_type}
                            <br />Mã: {card.book_id}
                    </div>
                </div>))}
            </div>

            {individualModalOpen && detailSelectedBook && (
                <div className="modal" style={{ display: individualModalOpen ? 'block' : 'none'}}>
                    <div className="modal-content" style={{width: "95%"}}>
                    <span className="close" style = {{marginLeft: "auto",  marginRight: "0"}} onClick={() => {handleQuantityChange(selectedBook.book_id, 0); closeIndividualModal()}}>x</span>
                    <div className="detail-book">
                        <div>Thông tin sách</div>
                        <div className='book-detail-all-ctn'>
                          <div className='infor-ctn-1' style={{
                              height: '400px',
                              width: '300px',
                              display: 'flex',
                              alignItems: 'center', 
                              justifyContent: 'center'
                            }}>
                              <img src={bookIcon} style={{ height: '200px', width: '200px' }} alt="Book Icon" />
                          </div>

                          <div style={{maxWidth:'50%'}}>
                            <div className='infor-ctn-1'>
                                <h3>{detailSelectedBook[0].title}</h3>
                                <RatingStars  rating={detailSelectedBook[0].rating_score}/>
                                <p>Độ tuổi giới hạn: {detailSelectedBook[0].readingAge}</p>
                                <p>Tác giả: {detailSelectedBook.map(item => item.penname).join(', ')}</p>
                                <p>Thể loại: {detailSelectedBook.map(item => item.genres).join(', ')}</p>
                                <p>{detailSelectedBook[0].price.toLocaleString('en-US')} VND - Hiện đang giảm giá {detailSelectedBook[0].max_discount ? detailSelectedBook[0].max_discount : 0}%</p>
                            </div>

                            <div className="info-container infor-ctn-1">
                              <div>
                                <label for="company">Nhà xuất bản:</label>
                                <p id="company">{detailSelectedBook[0].publisher_name}</p>
                              </div>
                              <div>
                                <label for="pubDate">Ngày xuất bản:</label>
                                <p id="pubDate">{detailSelectedBook[0].publication_date}</p>
                              </div>
                              <div>
                                <label for="edition">Phiên bản:</label>
                                <p id="edition">{detailSelectedBook[0].edition}</p>
                              </div>
                              <div>
                                <label for="isbn">Mã ISBN:</label>
                                <p id="isbn">{detailSelectedBook[0].isbn}</p>
                              </div>
                              <div>
                                <label for="language">Ngôn ngữ:</label>
                                <p id="language">{detailSelectedBook[0].language_}</p>
                              </div>
                              <div>
                                <label for="bookType">Kiểu sách:</label>
                                <p id="bookType">{booktype(detailSelectedBook[0].audio_size, detailSelectedBook[0].kindle_size, detailSelectedBook[0].physical_format)}</p>
                              </div>
                              {booktype(detailSelectedBook[0].audio_size, detailSelectedBook[0].kindle_size, detailSelectedBook[0].physical_format) == "Physical Book" &&
                                    <>
                                    <div>
                                      <label for="bookType">Format</label>
                                      <p id="bookType">{detailSelectedBook[0].physical_format}</p>
                                    </div>
                                    <div>
                                      <label for="bookType">Dimensions</label>
                                      <p id="bookType">{detailSelectedBook[0].physical_dimensions} inches</p>
                                    </div>
                                    <div>
                                      <label for="bookType">Paper length:</label>
                                      <p id="bookType">{detailSelectedBook[0].physical_paper_length} trang</p>
                                    </div>
                                    <div>
                                      <label for="bookType">Status:</label>
                                      <p id="bookType">{detailSelectedBook[0].physical_status}</p>
                                    </div>
                                    <div>
                                      <label for="bookType">Weight:</label>
                                      <p id="bookType">{detailSelectedBook[0].physical_weight} kg</p>
                                    </div>
                                    </>
                              }
                              {booktype(detailSelectedBook[0].audio_size, detailSelectedBook[0].kindle_size, detailSelectedBook[0].physical_format) == "Kindle Book" &&
                                    <>
                                    <div>
                                      <label for="bookType">Size</label>
                                      <p id="bookType">{detailSelectedBook[0].kindle_size} MB</p>
                                    </div>
                                    <div>
                                      <label for="bookType">Paper length</label>
                                      <p id="bookType">{detailSelectedBook[0].kindle_paper_length} trang</p>
                                    </div>
                                    </>
                              }
                              {booktype(detailSelectedBook[0].audio_size, detailSelectedBook[0].kindle_size, detailSelectedBook[0].physical_format) == "Audio Book" &&
                                    <>
                                    <div>
                                      <label for="bookType">Size</label>
                                      <p id="bookType">{detailSelectedBook[0].audio_size} MB</p>
                                    </div>
                                    <div>
                                      <label for="bookType">Time</label>
                                      <p id="bookType">{detailSelectedBook[0].audio_time}</p>
                                    </div>
                                    </>
                              }
                            </div>
                          </div>
                          <div className='infor-ctn-1' style={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignContent: 'center',
                              alignItems: 'center'
                          }}>
                            <img src={bookShopIcon} style={{ height: '200px', width: '200px', }}></img>
                            <label htmlFor="supplierName">Nhà cung cấp:</label>
                            <h4 id="supplierName">{detailSelectedBook[0].provider_name}</h4>
                            
                            <label htmlFor="quantity">Số lượng:</label>
                            <div className="row justify-content-center" style={{width: "60%"}}>
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
                            
                            <button class="btn btn-primary" type="submit" style={{width: "100%", marginRight: "0", marginLeft: "auto", marginTop:"20px"}} onClick={(e) => {handleRefresh();closeIndividualModal();handleAddToCart()}}>Thêm vào giỏ hàng</button>
                            
                          </div>
                        </div>
                    </div>
        
                    </div>
                </div>
        )}
  
        {summaryOrderModalOpen && (
          <div className="modal" style={{ display: summaryOrderModalOpen ? 'block' : 'none' }}>
            <div className="modal-content" style={{width: "98%"}}>
              <span className="close" onClick={closeSummaryOrderModal} style = {{marginLeft: "auto",  marginRight: "0"}}>x</span>
              <p>Summary Order:</p>
              <ul>
                {Object.entries(bookQuantities).map(([bookId, quantity]) => (
                  quantity > 0 && (
                    <li key={bookId} style = {{display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: "20px"}}>
                       <img src={bookIcon} style = {{height: "70px", width: "70px", marginRight: "20px"}}/>
                      <div style={{width: "70%", display: "flex", flexDirection: "column"}}>
                       <div>Book ID: {bookId}, Số lượng mua: {quantity}, Tên sách: {orderItems.find(book => book.book_id === parseInt(bookId, 10)).title}, Nhà phân phối: {orderItems.find(book => book.book_id === parseInt(bookId, 10)).provider_name}</div> 
                        <div>Kiểu sách: {booktype(orderItems.find(book => book.book_id === parseInt(bookId, 10)).audio_size,orderItems.find(book => book.book_id === parseInt(bookId, 10)).kindle_size,orderItems.find(book => book.book_id === parseInt(bookId, 10)).physical_format )}</div>
                      </div>
                      
                      <div className="row justify-content-center" style={{width: "40%"}}>
                                    <div class="input-group"style={{width: "30%"}} >
                                <div class="input-group-prepend">
                                    <button class="btn btn-outline-primary" type="button" onClick={() => handleQuantityChange(orderItems.find(book => book.book_id === parseInt(bookId, 10)).book_id, Math.max(0, (bookQuantities[orderItems.find(book => book.book_id === parseInt(bookId, 10)).book_id] || 0) - 1))} >-</button>
                                </div>
                                <input type="text" class="form-control" value={bookQuantities[orderItems.find(book => book.book_id === parseInt(bookId, 10)).book_id] || 0}/>
                                <div class="input-group-prepend">
                                    <button class="btn btn-outline-primary" type="button" onClick={() => handleQuantityChange(orderItems.find(book => book.book_id === parseInt(bookId, 10)).book_id, (bookQuantities[orderItems.find(book => book.book_id === parseInt(bookId, 10)).book_id] || 0) + 1)}>+</button>
                                </div>
                            
                                </div> 
                        </div>
                    </li>
        
                  )
                ))}
              </ul>
              <button class="btn btn-primary" type="submit" style={{width: "20%",marginLeft: "40%"}} onClick={(e) => {handleRefresh();closeIndividualModal();handleAddToCart()}}>Xác nhận đặt hàng</button>
            </div>
          </div>
        )}
        </div>

    )
}

export default Order;