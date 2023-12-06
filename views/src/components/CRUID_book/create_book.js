import React, { useEffect, useState } from 'react';
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
  });
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
            <div>
              <label htmlFor="size">Kích thước file:</label>
              <input
                type="number"
                id="size"
                name="size"
                value={bookData.kindDetail.size || ''}
                onChange={(e) => handleBookDataChange('kindDetail.size', e.target.value)}
              />
              <span>Kb</span>
            </div>
            <div>
              <label htmlFor="pagerLength">Số trang:</label>
              <input
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
            <div>
              <label htmlFor="size">Kích thước file:</label>
              <input
                type="text"
                id="size"
                name="size"
                value={bookData.kindDetail.size || ''}
                onChange={(e) => handleBookDataChange('kindDetail.size', e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="time">Thời lượng:</label>
              <input
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
            <div>
              <label htmlFor="format">Định dạng:</label>
              <input
                type="text"
                id="format"
                name="format"
                value={bookData.kindDetail.format || ''}
                onChange={(e) => handleBookDataChange('kindDetail.format', e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="status">Tình trạng:</label>
              <input
                type="text"
                id="status"
                name="status"
                value={bookData.kindDetail.status || ''}
                onChange={(e) => handleBookDataChange('kindDetail.status', e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="dimension">Khổ sách:</label>
              <input
                type="text"
                id="dimension"
                name="dimension"
                value={bookData.kindDetail.dimension || ''}
                onChange={(e) => handleBookDataChange('kindDetail.dimension', e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="weight">Cân nặng:</label>
              <input
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
          // setResponseMessage(response);
          console.log(response);
          // setModalNoti(true);
       })
       .catch((error) => {
          console.log('Tạo sách không thành công: ' + error);

          // setResponseMessage('Tạo sách không thành công: ' + error.response.data.message);
          // setModalNoti(true);
       });
    console.log('After Axios POST request');
  };


  return (
    <>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Tên sách:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={bookData.title || ''}
          onChange={(e) => handleBookDataChange('title', e.target.value)}
        />
      </div>
      <div>
          <label htmlFor="authors">Tác giả:</label>
          {bookData.authors.map((author, index) => (
            <div key={index}>
              <input
                type="text"
                id={`author-${index}`}
                name={`author-${index}`}
                value={author}
                onChange={(e) => handleBookDataChange('authors', e.target.value, index)}
              />
              <button type="button" onClick={() => handleDeleteAuthor(index)}>
                Xóa tác giả
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddAuthor}>
            Thêm tác giả
          </button>
      </div>
      <div>
        <label htmlFor="readingAge">Độ tuổi tối thiểu:</label>
        <input
          type="number"
          id="readingAge"
          name="readingAge"
          value={bookData.readingAge || 0}
          onChange={(e) =>
            handleBookDataChange('readingAge', parseInt(e.target.value, 10) || 0)
          }
        />
      </div>
      <div>
        <label htmlFor="price">Giá:</label>
        <input
          type="text"
          id="price"
          name="price"
          step="1"
          value={bookData.price || ''}
          onChange={(e) => handleBookDataChange('price', e.target.value)}
        />
        <span>VND</span>
      </div>
      <div>
        <label htmlFor="language">Ngôn ngữ:</label>
        <input
          type="text"
          id="language"
          name="language"
          value={bookData.language || ''}
          onChange={(e) => handleBookDataChange('language', e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="edition">Edition:</label>
        <input
          type="text"
          id="edition"
          name="edition"
          value={bookData.edition || ''}
          onChange={(e) => handleBookDataChange('edition', e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="publicationDate">Ngày xuất bản:</label>
        <input
          type="date"
          id="publicationDate"
          name="publicationDate"
          value={bookData.publicationDate || ''}
          onChange={(e) => handleBookDataChange('publicationDate', e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="publisher">Nhà xuất bản:</label>
        <input
          type="text"
          id="publisher"
          name="publisher"
          value={bookData.publisher || ''}
          onChange={(e) => handleBookDataChange('publisher', e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="isbn">ISBN:</label>
        <input
          type="text"
          id="isbn"
          name="isbn"
          value={bookData.isbn || ''}
          onChange={(e) => handleBookDataChange('isbn', e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="providerId">Provider ID:</label>
        <input
          type="text"
          id="providerId"
          name="providerId"
          value={bookData.providerId || ''}
          onChange={(e) => handleBookDataChange('providerId', e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="quantity">Số lượng:</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={bookData.quantity || ''}
          onChange={(e) => handleBookDataChange('quantity', parseInt(e.target.value, 10) || 0)}
        />
      </div>
      <div>
        <label htmlFor="kindOfBook">Kiểu sách:</label>
        <select
          id="kindOfBook"
          name="kindOfBook"
          value={bookData.kindDetail.kindOfBook || ''}
          onChange={(e) => handleBookDataChange('kindDetail.kindOfBook', e.target.value)}
        >
          <option value="">Chọn kiểu sách</option>
          <option value="kindle_book">Sách Kindle</option>
          <option value="audio_book">Sách Nói</option>
          <option value="physical_book">Sách Giấy</option>
        </select>
      </div>
      <div>
        {AdditionalFieldsComponent()}
      </div>
      <button type="submit" onClick={(e) => handleSubmit(e)}>Create Book</button>
    </form>
    <ModalNoti isModalNotiOpen={isModalNotiOpen} setModalNoti={setModalNoti} message={responseMessage} />
    </>
  );
};

export default CreateBook;
export {ModalNoti}
