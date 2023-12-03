import { useEffect, useState } from "react";
import axios from "axios"
import bookIcon from "../../img/book_icon.png"
import "../order/order.css"
function Order (){
    const [books, setBooks] = useState([])
    useEffect(() => {
        axios.get('/api/order')
          .then(response => setBooks(response.data))
          .catch(error => console.error('Error fetching books:', error));
      }, []);
    const handleSearch = (e) => {
        e.preventDefault();
        const name = e.target.elements.name.value;
        axios.post('/api/order/search', {bookName: name})
          .then(response => setBooks(response.data))
          .catch(error => console.error('Error fetching books:', error));
    }
    return(
        <div className="body">
            <div class="container" style={{marginBottom: "20px"}}>
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
            <div className = "row">
            {books.map((card, i) => (
                <div className='col-sm-4 product' style = {{cursor: "pointer"}}>
                    <div className='product-inner text-center'>
                        <img src={bookIcon} style = {{height: "100px", width: "100px"}}/>
                            <br />Tên sách: {card.title}
                            <br />Giá: {card.price} đ
                    </div>
                </div>))}
            </div>
        </div>
    )
}

export default Order;