use assign_db;

select * from book
delete from book where book_id = 32

DELIMITER |
create procedure add_book (
	in title varchar(255),
	in reading_age int,
	in price double,
	in language_ varchar(255),
	in edition varchar(255),
	in publication_date DATE,
	in publisher_name varchar(255),
	in isbn varchar(13),
	in provider_id int,
	in quantity int
)
begin
    if (reading_age <= 0) then 
		signal sqlstate '45000' set message_text ='Độ tuổi giới hạn đọc sách phải lớn hơn 0';
	end if;
    if (price <= 0) then 
		signal sqlstate '45000' set message_text ='Giá bán của sách phải lớn hơn 0';
	end if;
    if not (isbn  regexp '^[0-9]{13}') then
		signal sqlstate '45000' set message_text ='Mã ISBN của quyển sách phải là 13 ký tự chữ số';
	end if;
    if (provider_id <= 0) then 
		signal sqlstate '45000' set message_text ='ID của nhà cung cấp sách phải lớn hơn 0';
	end if;
    if (quantity < 0) then 
		signal sqlstate '45000' set message_text ='Số lượng sách không thể là số âm';
	end if;

	if (title ='') then 
		signal sqlstate '45000' set message_text ='Tên sách không được để trống';
	end if;
    
    insert into book value (NUll, title, reading_age, price, language_, edition, publication_date, publisher_name, isbn, provider_id, quantity);
end;	
|
DELIMITER |
create procedure add_contain(in inpenname varchar(255))
begin
	declare id_author int default 0;
select id into id_author 
	from author
	where author.penname=inpename
	insert into value ();

end;
|
DELIMITER |

create procedure update_book (
	in book_id int, 
	in title varchar(255),
	in reading_age int,
	in price double,
	in language_ varchar(255),
	in edition varchar(255),
	in publication_date DATE,
	in publisher_name varchar(255),
	in isbn varchar(13),
	in provider_id int,
	in quantity int
)
begin
	if (book_id <= 0) then 
		signal sqlstate '45000' set message_text ='ID của sách phải lớn hơn 0';
	end if;
    if not (select exists (select * from book where book.book_id = book_id)) then
		signal sqlstate '45000' set message_text ='ID của sách không tồn tại';
	end if;
    if (reading_age <= 0) then 
		signal sqlstate '45000' set message_text ='Độ tuổi giới hạn đọc sách phải lớn hơn 0';
	end if;
    if (price <= 0) then 
		signal sqlstate '45000' set message_text ='Giá bán của sách phải lớn hơn 0';
	end if;
    if not (isbn  regexp '^[0-9]{13}') then
		signal sqlstate '45000' set message_text ='Mã ISBN của quyển sách phải là 13 ký tự chữ số';
	end if;
    if (provider_id <= 0) then 
		signal sqlstate '45000' set message_text ='ID của nhà cung cấp sách phải lớn hơn 0';
	end if;
    if (quantity < 0) then 
		signal sqlstate '45000' set message_text ='Số lượng sách không thể là số âm';
	end if;
    
    update book set 
		book.title = title,
		book.reading_age = reading_age,
		book.price = price,
		book.language_ = language_,
		book.edition = edition,
		book.publication_date = publication_date,
		book.publisher_name = publisher_name,
		book.isbn = isbn,
		book.provider_id = provider_id,
		book.quantity = quantity
    where book.book_id = book_id;
end;
|

DELIMITER |
create procedure delete_book(in book_id int)
begin
	if (book_id <= 0) then 
		signal sqlstate '45000' set message_text ='ID của sách phải lớn hơn 0';
	end if;
    if not (select exists (select * from book where book.book_id = book_id)) then
		signal sqlstate '45000' set message_text ='ID của sách không tồn tại';
	end if;
    
    delete from book where book.book_id = book_id;
end;
|

-- call add_book('Còn chút gì để nhớ', 5, 100000, 'Tiếng Việt', 'thường', '2003-05-06', 'Nhà xuất bản trẻ', '1234567890123', 1, 10);
-- call update_book(40, 'Còn chút gì để nhớ', 5, 80000, 'Tiếng Việt', 'thường', '2003-05-06', 'Nhà xuất bản trẻ', '1234567890123', 2, 10);
-- call delete_book(33);

-- select * from book

-- insert into book value (21, 'Còn chút gì để quên', 5, 100, 'Tiếng Việt', 'thường', '2003-05-06', 'Nhà xuất bản trẻ', '1234567890123', 1, 10)
