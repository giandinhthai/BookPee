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
	in quantity int,
	out return_book_id int
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
	SELECT LAST_INSERT_ID() AS return_book_id;
	end;	
|
DELIMITER |
create procedure add_write_(in inpenname varchar(255), in book_id int )
begin
	declare get_id_author int default 0;
select author_id into get_id_author 
	from author
	where author.penname=inpename;
	if get_id_author is null then
		insert into author value (null,inpename);
		SELECT LAST_INSERT_ID() AS get_id_author;
	end if;
	insert into write_ value(book_id,get_id_author);
		
end;
|
	DELIMITER |
create procedure delete_write_(in inpenname varchar(255), in book_id int)
begin
	 Declare id_of_author int default 0;
	Select author_id into id_of_author
		from author 
		where penname=inpenname;
	 delete from write_ where  write_.book_id = book_id and write_.author_id=id_of_author;
		
end;
|

create procedure add_genres_(in genre_of_book  varchar(255), in book_id int )
begin
	if genre_of_book not in ('Kinh doanh','Truyện tranh','Giáo dục','Hư cấu','Sức khỏe','Lịch sử','Luật','Thần thoại','Y học','Chính trị','Lãng mạn','Tôn giáo','Khoa học','Self-help','Thể thao','Công nghệ','Du lịch','Thơ ca') then
		signal sqlstate '45000' set message_text ='Thể loại không hợp lệ.';
	end if;

	insert into genres_book value( book_id,genres);
		
end;
|

create procedure delete_genres_(in genre_of_book  varchar(255), in book_id int)
begin
	if genre_of_book not in ('Kinh doanh','Truyện tranh','Giáo dục','Hư cấu','Sức khỏe','Lịch sử','Luật','Thần thoại','Y học','Chính trị','Lãng mạn','Tôn giáo','Khoa học','Self-help','Thể thao','Công nghệ','Du lịch','Thơ ca') then
		signal sqlstate '45000' set message_text ='Thể loại không hợp lệ.';
	end if;
	 delete from genres_book where  genres_book.book_id = book_id and genres_book.genres=genre_of_book;
		
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
