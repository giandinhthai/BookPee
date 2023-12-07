import React, { useEffect, useState } from 'react';
import axios from "axios";
import Modal from 'react-modal'
import './create_book.css'
import { ModalNoti } from './create_book';
import bookIcon from "../../img/book_icon.png"
import './book_detail.css'
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


const ProviderBookDetail=()=>{
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
    useEffect(()=>{
        //get book data to update base on param id
        console.log("get book data show base on param id ");
        axios.post('/api/provider/getBookDetail', { 
            book_id:1,         
        })
           .then((response) => {
              setResponseMessage(response);
                const formattedDate = new Date(response.data.bookData.publicationDate).toISOString().split('T')[0];
                setBookData({
                    ...response.data.bookData,
                    publicationDate: formattedDate,
                });
                console.log(bookData);
                setLoading(false);
              
              // setModalNoti(true);
           })
           .catch((error) => {
              console.log('Lấy thông tin sách thất bại: ' + error);
              setLoading(false);
              setResponseMessage('Lấy thông tin sách thất bại: ' + error.response.data.message);
              setModalNoti(true);
           });
    },[isLoading]);
    return(
    <div className='book-detail-all-ctn'>
      <div className='infor-ctn-1' style={{
          height: '400px',
          width: '300px',
          display: 'flex',
          alignItems: 'center',  // Corrected typo here
          justifyContent: 'center'
        }}>
          <img src={bookIcon} style={{ height: '200px', width: '200px' }} alt="Book Icon" />
      </div>

      <div>
        <div className='infor-ctn-1'>
            <h3>{bookData.title}</h3>
            <RatingStars  rating={4.5}/>
            <p>Độ tuổi giới hạn: {bookData.readingAge}</p>
            <p>Tác giả</p>
            <p>Thể loại</p>
            <p>{bookData.price.toLocaleString('en-US')} VND - Hiện đang giảm giá {}%</p>
        </div>

        <div className="info-container infor-ctn-1">
          <div>
            <label for="company">Công ty phát hành:</label>
            <p id="company">yourCompany</p>
          </div>
          <div>
            <label for="pubDate">Ngày xuất bản:</label>
            <p id="pubDate">publicationDate</p>
          </div>
          <div>
            <label for="edition">Phiên bản:</label>
            <p id="edition">edition</p>
          </div>
          <div>
            <label for="isbn">Mã ISBN:</label>
            <p id="isbn">isbn</p>
          </div>
          <div>
            <label for="language">Ngôn ngữ:</label>
            <p id="language">language</p>
          </div>
          <div>
            <label for="bookType">Kiểu sách:</label>
            <p id="bookType">bookType</p>
          </div>
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
        <h4 id="supplierName">Your Supplier Name</h4>
        
        <label htmlFor="quantity">Số lượng:</label>
        <p id="quantity">Your Quantity</p>
        
        <button className="nav-button">Thêm vào giỏ hàng</button>
        
      </div>
    </div>
    );
}
export default ProviderBookDetail;