import React, {memo , useCallback, useEffect, useState } from 'react';
import axios from "axios";
import Modal from 'react-modal'
import '../create_book.css'
const BookDataFormThree=({bookDataMain,setBookMain,currentPage,handleNext,handleBack,handleSubmit})=>{
    const [bookData, setBookData] = useState(bookDataMain);
      const genresList = ['Kinh doanh','Truyện tranh','Giáo dục','Hư cấu','Sức khỏe','Lịch sử','Luật','Thần thoại','Y học','Chính trị','Lãng mạn','Tôn giáo','Khoa học','Self-help','Thể thao','Công nghệ','Du lịch','Thơ ca'];
      const [selectedGenres, setSelectedGenres] = useState([]);
      const [showGenres, setShowGenres] = useState(false);
      const handleGenreChange = (genre) => {
        if (selectedGenres.includes(genre)) {
          setSelectedGenres(selectedGenres.filter((selectedGenre) => selectedGenre !== genre));
        } else {
          setSelectedGenres([...selectedGenres, genre]);
        }
      };
      const toggleGenresVisibility = () => {
        setShowGenres(!showGenres);
      };
    
      const handleBookDataChange = (name, value, index = null) => {
        if (name === 'authors') {
          const newAuthors = [...bookData.authors];
          newAuthors[index] = value;
      
          setBookData({
            ...bookData,
            authors: newAuthors,
          });
        } else if (name.startsWith('kindDetail.')) {
          
          const kindDetailProperty = name.split('.')[1];
          setBookData({
            ...bookData,
            kindDetail: {
              ...bookData.kindDetail,
              [kindDetailProperty]: value,
            },
          });
        }else if (name === 'genres') {
          handleGenreChange(value);
          setBookData({
            ...bookData,
            genres: selectedGenres,
          });
        } else {
          setBookData({
            ...bookData,
            [name]: value,
          });
        }
      };
    
      const handleAddAuthor = () => {
        setBookData({
          ...bookData,
          authors: [...bookData.authors, ''],
        });
      };
      const handleDeleteAuthor = (index) => {
        const newAuthors = [...bookData.authors];
        newAuthors.splice(index, 1);
    
        setBookData({
          ...bookData,
          authors: newAuthors,
        });
      };
  const AdditionalFieldsComponent = () => {
    switch (bookData.kindDetail.kindOfBook) {
      case 'kindle_book':
        return (
          <>
            <div className='form-wrapper'>
              <label htmlFor="size">Kích thước file:</label>
              <input
                className='form-control'
                type="number"
                id="size"
                name="size"
                value={bookData.kindDetail.size || ''}
                onChange={(e) => handleBookDataChange('kindDetail.size', e.target.value)}
              />
              <span>Kb</span>
            </div>
            <div className='form-wrapper'>
              <label htmlFor="pagerLength">Số trang:</label>
              <input
                className='form-control'
                type="number"
                id="pagerLength"
                name="pagerLength"
                value={bookData.kindDetail.pagerLength || ''}
                onChange={(e) => handleBookDataChange('kindDetail.pagerLength', e.target.value)}
              />
            </div>
          </>
        );
      case 'audio_book':
        return (
          <>
            <div className='form-wrapper'>
              <label htmlFor="size">Kích thước file:</label>
              <input
                className='form-control'
                type="text"
                id="size"
                name="size"
                value={bookData.kindDetail.size || ''}
                onChange={(e) => handleBookDataChange('kindDetail.size', e.target.value)}
              />
            </div>
            <div className='form-wrapper'>
              <label htmlFor="time">Thời lượng:</label>
              <input
                className='form-control'
                type="text"
                id="duration"
                name="time"
                pattern="^\d{2}:\d{2}:\d{2}$"
                placeholder="HH:mm:ss"
                value={bookData.kindDetail.time || ''}
                onChange={(e) => handleBookDataChange('kindDetail.time', e.target.value)}
              />
            </div>
          </>
        );
      case 'physical_book':
        return (
          <>
            <div className='form-wrapper'>
              <label htmlFor="format">Định dạng:</label>
              <input
                className='form-control'
                type="text"
                id="format"
                name="format"
                value={bookData.kindDetail.format || ''}
                onChange={(e) => handleBookDataChange('kindDetail.format', e.target.value)}
              />
            </div>
            <div className='form-wrapper'>
              <label htmlFor="status">Tình trạng:</label>
              <input
                className='form-control'
                type="text"
                id="status"
                name="status"
                value={bookData.kindDetail.status || ''}
                onChange={(e) => handleBookDataChange('kindDetail.status', e.target.value)}
              />
            </div>
            <div className='form-wrapper'>
              <label htmlFor="dimension">Khổ sách:</label>
              <input
                className='form-control'
                type="text"
                id="dimension"
                name="dimension"
                value={bookData.kindDetail.dimension || ''}
                onChange={(e) => handleBookDataChange('kindDetail.dimension', e.target.value)}
              />
            </div>
            <div className='form-wrapper'>
              <label htmlFor="weight">Cân nặng:</label>
              <input
                className='form-control'
                type="text"
                id="weight"
                name="weight"
                value={bookData.kindDetail.weight || ''}
                onChange={(e) => handleBookDataChange('kindDetail.weight', e.target.value)}
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };
  return(<>
    {AdditionalFieldsComponent()}
    {/* <div className='form-wrapper'>
      <label htmlFor="providerId">Provider ID:</label>
      <input
        className='form-control'
        type="text"
        id="providerId"
        name="providerId"
        value={bookData.providerId || ''}
        onChange={(e) => handleBookDataChange('providerId', e.target.value)}
      />
    </div> */}
    <div className='form-wrapper'>
      <label htmlFor="isbn">ISBN:</label>
      <input
        className='form-control'
        type="text"
        id="isbn"
        name="isbn"
        value={bookData.isbn || ''}
        onChange={(e) => handleBookDataChange('isbn', e.target.value)}
      />
    </div>
    <button type="button" className="nav-button" onClick={()=>{setBookMain(bookData); handleBack(); }} disabled={currentPage === 1}>
          Trở lại
        </button>
        <button type="button" className="nav-button" onClick={()=>{setBookMain(bookData);handleNext();}} disabled={currentPage === 3}>
          Tiếp
        </button>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <button type='submit' className="nav-button" onClick={async (e) => {
                await setBookMain(bookData);
                handleSubmit(e);
            }}>
            Tạo sách
          </button>
        </div>
  </>)
}
export default BookDataFormThree;