import React, { useCallback, useEffect, useState } from 'react';
import axios from "axios";
import Modal from 'react-modal'
import './create_book.css'
const ModalNoti=({isModalNotiOpen,setModalNoti,message})=>{
  return(
    <Modal
      className={"popup-complete-config"}
      overlayClassName={"complete-config-ctn"}
      isOpen={isModalNotiOpen}
      onRequestClose={() => setModalNoti(false)}
      ariaHideApp={false}
    >
      <h2>Thông báo</h2>
      <span className="span-complete-config">
        <p className="complete-noti-content">{message}</p>
        <button onClick={() => setModalNoti(false)} className="complete-noti-btn">
          Đóng
        </button>
      </span>
    </Modal>
  )
}
const CreateBook = () => {
  
  const [bookData, setBookData] = useState({
    title: '',
    readingAge: 0,
    price: '',
    language: '',
    edition: '',
    publicationDate: '',
    publisher: '',
    isbn: '',
    providerId: '',
    quantity: 0,
    authors: [''],
    kindDetail: {},
    genres:[''],
  });
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

  const [responseMessage, setResponseMessage] = useState('');
  const [isModalNotiOpen,setModalNoti]=useState(false);
  

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Before Axios POST request');
    console.log(bookData);
    axios.post('/api/provider/createBook', { bookData: bookData })
       .then((response) => {
          setResponseMessage(response);
          console.log(response);
          // setModalNoti(true);
       })
       .catch((error) => {
          console.log('Tạo sách không thành công: ' + error);

          setResponseMessage('Tạo sách không thành công: ' + error.response.data.message);
          // setModalNoti(true);
       });
    console.log('After Axios POST request');
  };
  const [currentPage,setCurrentPage]=useState(1);
  const BookDataFormOne=()=>{
    return(
    <>
      <div className='form-wrapper'>
        <label htmlFor="title">Tên sách:</label>
        <input
          className='form-control'
          type="text"
          id="title"
          name="title"
          value={bookData.title || ''}
          onChange={(e) => handleBookDataChange('title', e.target.value)}
        />
      </div>
      <div className='author-detail-ctn'>
          <div style={{marginBottom: '10px'}}>
            <label htmlFor="authors">Tác giả:</label>
            <button type="button" className="nav-button" style={{marginLeft: '10px'}} onClick={handleAddAuthor}>
              Thêm tác giả
            </button>
          </div>
          {bookData.authors.map((author, index) => (
            <div key={index} className='single-author' style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
              <input
                className='form-control'
                type="text"
                id={`author-${index}`}
                name={`author-${index}`}
                value={author}
                onChange={(e) => handleBookDataChange('authors', e.target.value, index)}
              />
              <button type="button"  className="nav-button delete-author-btn" onClick={() => handleDeleteAuthor(index)}>
                Xóa tác giả
              </button>
            </div>
          ))}
          
      </div>
      <div className='form-wrapper'>
        <label htmlFor="readingAge">Độ tuổi tối thiểu:</label>
        <input
          className='form-control'
          type="number"
          id="readingAge"
          name="readingAge"
          value={bookData.readingAge || 0}
          onChange={(e) =>
            handleBookDataChange('readingAge', parseInt(e.target.value, 10) || 0)
          }
        />
      </div>
      <div className='form-wrapper'>
        <label htmlFor="edition">Edition:</label>
        <input
          className='form-control'
          type="text"
          id="edition"
          name="edition"
          value={bookData.edition || ''}
          onChange={(e) => handleBookDataChange('edition', e.target.value)}
        />
      </div>
      <div className="genre-container form-wrapper">
        <button className="genre-button nav-button" onClick={toggleGenresVisibility}>
          {showGenres ? 'Ẩn thể loại' : 'Hiện thể loại'}
        </button>
        {showGenres && (
          <>
            <ul className="genre-list">
              {genresList.map((genre) => (
                <li key={genre}>
                  <label>
                    <input
                      type="checkbox"
                      value={genre}
                      checked={selectedGenres.includes(genre)}
                      onChange={() => handleBookDataChange('genres', genre)}
                    />
                    {genre}
                  </label>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      <div className='form-wrapper'>
        <label htmlFor="kindOfBook">Kiểu sách:</label>
        <select
          className='form-control'
          id="kindOfBook"
          name="kindOfBook"
          value={bookData.kindDetail.kindOfBook || ''}
          onChange={(e) => handleBookDataChange('kindDetail.kindOfBook', e.target.value)}
        >
          <option className='form-control' value="">Chọn kiểu sách</option>
          <option className='form-control' value="kindle_book">Sách Kindle</option>
          <option className='form-control' value="audio_book">Sách Nói</option>
          <option className='form-control' value="physical_book">Sách Giấy</option>
        </select>
      </div>
    </>
    )
  }
  const BookDataFormTwo=()=>{
    return(<>
<div className='form-wrapper'>
        <label htmlFor="language">Ngôn ngữ:</label>
        <input
          className='form-control'
          type="text"
          id="language"
          name="language"
          value={bookData.language || ''}
          onChange={(e) => handleBookDataChange('language', e.target.value)}
        />
      </div>
      
      <div className='form-wrapper'>
        <label htmlFor="publicationDate">Ngày xuất bản:</label>
        <input
          className='form-control'
          type="date"
          id="publicationDate"
          name="publicationDate"
          value={bookData.publicationDate || ''}
          onChange={(e) => handleBookDataChange('publicationDate', e.target.value)}
        />
      </div>
      <div className='form-wrapper'>
        <label htmlFor="publisher">Nhà xuất bản:</label>
        <input
          className='form-control'
          type="text"
          id="publisher"
          name="publisher"
          value={bookData.publisher || ''}
          onChange={(e) => handleBookDataChange('publisher', e.target.value)}
        />
      </div>
      
      <div className='form-wrapper'>
        <label htmlFor="quantity">Số lượng:</label>
        <input
          className='form-control'
          type="number"
          id="quantity"
          name="quantity"
          value={bookData.quantity || ''}
          onChange={(e) => handleBookDataChange('quantity', parseInt(e.target.value, 10) || 0)}
        />
      </div>
      <div className='form-wrapper'>
        <label htmlFor="price">Giá:</label>
        <input
          className='form-control'
          placeholder="Nhập giá sách (VND)"
          type="text"
          id="price"
          name="price"
          step="1"
          value={bookData.price || ''}
          onChange={(e) => handleBookDataChange('price', e.target.value)}
        />
      </div>
    </>)
  }
  const BookDataFormThree=()=>{
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
    </>)
  }
  const BookDataForm=({currentPage})=>{
    console.log("Current Page:", currentPage);
    if (currentPage === 1) {
      console.log(123);
      return <BookDataFormOne />;
    } else  if (currentPage === 2) {
      return <BookDataFormTwo />;
    }else{
      return<BookDataFormThree/>
    }
  }
  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };
  
  const handleBack = () => {
    setCurrentPage(currentPage - 1);
  };
  return (
    <>
    <form onSubmit={handleSubmit} className='all-crt-bdt-ctn'>
      
      <div className='crt-book-data-ctn'>
        <h3>Đăng kí bán sách</h3>
        <BookDataForm currentPage={currentPage}/>
        <button type="button" className="nav-button" onClick={handleBack} disabled={currentPage === 1}>
          Back
        </button>
        <button type="button" className="nav-button" onClick={handleNext} disabled={currentPage === 3}>
          Next
        </button>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <button type='submit' className="nav-button" onClick={(e) => handleSubmit(e)}>
            Create Book
          </button>
        </div>
      </div>
      <div style={{position: 'relative', height: '600px'}}>
        <img
        style={{position: 'absolute', // Ensure the image doesn't exceed the container width
        maxHeight: '100%',
        top:'20%'}} 
        decoding="async" src="https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/img1-12.png"></img>
      </div>
    </form>
    <ModalNoti isModalNotiOpen={isModalNotiOpen} setModalNoti={setModalNoti} message={responseMessage} />
    </>
  );
};

export default CreateBook;
export {ModalNoti}
