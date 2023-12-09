import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
    const book_id=useParams().bookId;
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
        console.log("get book data show base on param id ",book_id);
        axios.post('/api/provider/getBookDetail', { 
            book_id:book_id,         
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
    },[]);
    const AdditionalFieldsComponent=()=>{
      const [bookType,setBookType] = useState('');
      useEffect(() => {
        if (bookData.audio && bookData.audio.audio_size) {
          setBookType('Audio');
        } else if (bookData.physical && bookData.physical.physical_status) {
          setBookType('Physical');
        } else if (bookData.kindle && bookData.kindle.kindle_size) {
          setBookType('Kindle');
        }
      }, [bookData]);
      if (!bookType) return;
      return (
        <>
              <div>
                <label htmlFor="book_type">Loại sách:</label>
                <p id="book_type">{bookType}</p>
              </div>
          {bookType === 'Audio' && (
            <>
              <div>
                <label htmlFor="audio_size">Kích thước:</label>
                <p id="audio_size">{bookData.audio.audio_size}</p>
              </div>
              <div>
                <label htmlFor="audio_time">Thời lượng:</label>
                <p id="audio_time">{bookData.audio.audio_time}</p>
              </div>
            </>
          )}
          {bookType === 'Kindle' && (
            <>
              <div>
                <label htmlFor="kindle_size">Kích thước:</label>
                <p id="kindle_size">{bookData.kindle.kindle_size} (Kb)</p>
              </div>
              <div>
                <label htmlFor="kindle_paper_length">Số trang:</label>
                <p id="kindle_paper_length">{bookData.kindle.kindle_paper_length}</p>
              </div>
            </>
          )}
          {bookType === 'Physical' && (
            <>
              <div>
                <label htmlFor="physical_status">Tình trạng sách:</label>
                <p id="physical_status">{bookData.physical.physical_status}</p>
              </div>
              <div>
                <label htmlFor="physical_format">Định dạng sách:</label>
                <p id="physical_format">{bookData.physical.physical_format}</p>
              </div>
              <div>
                <label htmlFor="physical_dimensions">Khổ giấy:</label>
                <p id="physical_dimensions">{bookData.physical.physical_dimensions} (cm)</p>
              </div>
              <div>
                <label htmlFor="physical_weight">Khối lượng:</label>
                <p id="physical_weight">{bookData.physical.physical_weight} (kg)</p>
              </div>
              <div>
                <label htmlFor="physical_paper_length">Số trang:</label>
                <p id="physical_paper_length">{bookData.physical.physical_paper_length}</p>
              </div>
            </>
          )}
        </>
      );
    };
    return(
    <div className='book-detail-all-ctn'>
      <div className='infor-ctn-1' style={{
          height: '400px',
          width: '300px',
          display: 'flex',
          alignItems: 'center',  // Corrected typo here
          justifyContent: 'center',
          flexDirection: 'column'
        }}>
          <img src={bookIcon} style={{ height: '200px', width: '200px' }} alt="Book Icon" />
          <div>
            <button className='nav-button'>Sửa</button>
            <button className='nav-button'>Xóa</button>

          </div>
      </div>

      <div style={{maxWidth:'50%'}}>
        <div className='infor-ctn-1'>
            <h3>{bookData.title}</h3>
            <RatingStars  rating={4.5}/>
            <p>Độ tuổi giới hạn: {bookData.readingAge}</p>
            <p>Tác giả: {bookData.penname}</p>
            <p>Thể loại: {bookData.genres}</p>
            <p>{bookData.price.toLocaleString('en-US')} VND {(bookData.maxDiscount) ? '- Hiện đang giảm giá '+bookData.maxDiscount+'%':''}</p>
        </div>

        <div className="info-container infor-ctn-1">
          <div>
            <label for="company">Công ty phát hành:</label>
            <p id="company">{bookData.publisher}</p>
          </div>
          <div>
            <label for="pubDate">Ngày xuất bản: </label>
            <p id="pubDate">{bookData.publicationDate}</p>
          </div>
          <div>
            <label for="edition">Phiên bản:</label>
            <p id="edition">{bookData.edition}</p>
          </div>
          <div>
            <label for="isbn">Mã ISBN:</label>
            <p id="isbn">{bookData.isbn}</p>
          </div>
          <div>
            <label for="language">Ngôn ngữ:</label>
            <p id="language">{bookData.language}</p>
          </div>
          <AdditionalFieldsComponent/>
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
        <h4 id="supplierName">{bookData.providerName}</h4>
        
        <label htmlFor="quantity">Số lượng:</label>
        <p id="quantity">{bookData.quantity}</p>
      </div>
    </div>
    );
}
export default ProviderBookDetail;