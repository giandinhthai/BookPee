use assign_db;

DELIMITER | -- 1 hiển thị thông tin của tất cả sách
	create procedure show_all_book()
	begin
		select book_id, title, edition, price from book 
		order by book.title asc;
	end;


DELIMITER | -- 2 lọc sách theo thể loại và giá
	create procedure filter_book(in genres varchar(255), in price_range varchar(255), in order_by varchar(255))
    begin
        if genres is not null then
			create temporary table filter_genre as select book.book_id, title, edition, price from
            book join genres_book on book.book_id = genres_book.book_id
            where genres_book.genres = genres;
		else
			create temporary table filter_genre as
            select book_id, title, edition, price from book;
		end if;
        
        if price_range is not null then 
			if (price_range <=> 'low') then
				create temporary table filter_price as select * from filter_genre where filter_genre.price < 50000;
			elseif (price_range <=> 'mid') then
				create temporary table filter_price as select * from filter_genre where filter_genre.price > 50000 and filter_genre.price < 100000;
			elseif (price_range <=> 'high') then
				create temporary table filter_price as select * from filter_genre where filter_genre.price > 100000;
			end if;
		else create temporary table filter_price as select * from filter_genre;
        end if;
        
        if order_by is not null then
			if (order_by <=> 'titleasc') then
				select * from filter_price order by title asc;
			elseif (order_by <=> 'titledesc') then
				select * from filter_price order by title desc;
			elseif (order_by <=> 'priceasc') then
				select * from filter_price order by price asc;
			elseif (order_by <=> 'pricedesc') then 
				select * from filter_price order by price desc;
			end if;
		else select * from filter_price;
		end if;
        
        drop table filter_genre;
		drop table filter_price;
    end;

DELIMITER | -- 3 hiển thị full thông tin của sách
	create procedure show_book_info(in book_id int)
    begin
		if not (select exists (select * from book where book.book_id = book_id)) then
			signal sqlstate '45000' set message_text ='ID của sách không tồn tại';
		end if;
    
		-- Add rating
        
		create table rating_temp as select
			rate.book_id,
            count(*) as rating_quantity,
			avg(score) as rating_score
		from rate
        group by rate.book_id;
        if not (select exists(select * from rating_temp where rating_temp.book_id = book_id)) then
			create table rating_table(book_id int not null, rating_quantity int not null, rating_score float not null);
            insert into rating_table (book_id, rating_quantity, rating_score) values (book_id, 0, 0);
		else 
			create table rating_table as select * from rating_temp where rating_temp.book_id = book_id;
		end if;
		
        -- Add genres
        
        create table genre_book as select rating_table.book_id, rating_quantity, rating_score, genres from
        rating_table join genres_book on rating_table.book_id = genres_book.book_id;
        
        -- Add author
        
        create table author_book as select genre_book.book_id, rating_quantity, rating_score, genres, penname from
        genre_book join write_ on genre_book.book_id = write_.book_id
        join author on write_.author_id = author.author_id;
        
        -- Add series
        
        if not (select exists (select * from consisted where consisted.book_id = book_id)) then 
			create table series_book as select author_book.book_id, rating_quantity, rating_score, genres, penname from author_book;
            alter table series_book add series_name varchar(255);
            insert into series_book (series_name) values ('none');
		else 
			create table series_book as select author_book.book_id, rating_quantity, rating_score, genres, penname, name_ as series_name from
			author_book join consisted on author_book.book_id = consisted.book_id
			join series on consisted.series_id = series.series_id;
		end if;
        
        -- Add discount
        
        if not (select exists (select * from have_ where have_.book_id = book_id)) then
			create table discount_book as select series_book.book_id, rating_quantity, rating_score, genres, penname, series_name from series_book;
            alter table discount_book add discount_value int;
            insert into discount_book (discount_value) values (0);
		else 
			create table discount_have as select series_book.book_id, have_.discount_id, discount_value from
            series_book join have_ on series_book.book_id = have_.book_id 
            join discount on have_.discount_id = discount.discount_id;
            create table discount_max as select book_id, max(discount_value) as max_discount from discount_have group by book_id;
            create table discount_book as select series_book.book_id, rating_quantity, rating_score, genres, penname, series_name, max_discount from
            discount_max join series_book on discount_max.book_id = series_book.book_id;
		end if;
        
        -- Add detail
        
        select discount_book.book_id, title, genres, penname, series_name, reading_age, price, language_, edition, publication_date, 
        publisher_name, isbn, provider_id, quantity, max_discount, rating_quantity, rating_score from 
        discount_book join book on discount_book.book_id = book.book_id;
        
        drop table rating_temp;
        drop table rating_table;
        drop table genre_book;
        drop table author_book;
        drop table series_book;
        drop table discount_have;
        drop table discount_max;
        drop table discount_book;
    end;

DELIMITER | -- thêm sách vào order (chưa hoàn thiện)
	create procedure add_book_to_order(in order_id int, in book_id int, in quantity int)
    begin
		if not (select exists (select * from order_ where order_.order_id = order_id)) then
			signal sqlstate '45000' set message_text ='Đơn hàng chưa được tạo';
		end if;
        
		insert into contain (order_id, book_id, quantity) values (order_id, book_id, quantity);
    end;
    
DELIMITER | -- tính tiền ban đầu, tiền giảm giá và tiền phải trả
	create procedure cost_order(in order_id int)
    begin
		create table price_table as select order_id, contain.book_id, contain.quantity, price, discount_value from
        contain join book on contain.book_id = book.book_id 
        join have_ on book.book_id = have_.book_id
        join discount on have_.discount_id = discount.discount_id where order_id = 4;
        
        set SQL_SAFE_UPDATES = 0;
        alter table price_table add column (item_total double, total_discount double, grand_total double);
        update price_table set item_total = (price * quantity);
        update price_table set total_discount = (price * quantity * discount_value / 100);
        update price_table set grand_total = (price * quantity * (100 - discount_value) / 100);
        set SQL_SAFE_UPDATES = 1;
        
        create table total_price_table as select order_id, sum(item_total) as item_total, sum(total_discount) as total_discount, sum(grand_total) as grand_total from price_table group by order_id;
        select * from total_price_table
        
        drop table price_table;
        drop table total_price_table
    end;

DELIMITER | -- 4 tạo một đơn hàng mới
	create procedure add_order(in order_id int, in order_time date, in address varchar(255), in name_ varchar(255), in phone_number varchar(255), in customer_id int, in provider_id int)
    begin
		if not (select exists (select * from customer where customer.customer_id = customer_id)) then
			signal sqlstate '45000' set message_text ='Mã khách hàng không tồn tại';
		end if;
    
		if not (select exists (select * from provider where provider.provider_id = provider_id)) then
			signal sqlstate '45000' set message_text ='Mã nhà cung cấp không tồn tại';
		end if;
        
		insert into order_ (order_id, order_time, shipment_type, ship_fee, payment_method, status_, address, name_, phone_number, 
        customer_id, provider_id, take_status, paid_status) 
        values (order_id, order_time, 'vnpost', 15000, 'COD', 'đang giao', address, name_, phone_number, customer_id, provider_id, 'chưa lấy',
        'chưa trả');
    end;

DELIMITER | -- 5 thông tin sách đã mua của 1 khách hàng
	create procedure bought_book(in customer_id int)
    begin
		if not (select exists (select * from order_ where order_.customer_id = customer_id)) then
			signal sqlstate '45000' set message_text ='Không có đơn hàng nào';
		end if;
		
		create table bought_table as select customer_id, order_.order_id, contain.book_id, contain.quantity, title, penname from
        order_ join contain on order_.order_id = contain.order_id
        join book on contain.book_id = book.book_id
        join write_ on book.book_id = write_.book_id
        join author on write_.author_id = author.author_id;
        select * from bought_table where bought_table.customer_id = customer_id;
        
        drop table bought_table;
    end;

-- DELIMITER | -- 6 not finish
	
-- 	create procedure show_info_list_book(in list_id varchar(255))
--     begin
-- 		create table id_table_temp (id int);
        
--         insert into id_table_temp 
--         select cast(value as int) as id
--         from json_table(list_id, "$[*]" columns (value int path "$")) as id_table;
        
--         select * from book where book_id in (select id from id_table_temp)
        
--         drop table id_table_temp;
--     end;

-- -- Tạo stored procedure
-- DELIMITER |
-- CREATE PROCEDURE SelectRowsByIDs(IN input_ids VARCHAR(255))
-- BEGIN
--     -- Tạo bảng tạm thời để lưu trữ các ID
--     CREATE TEMPORARY TABLE temp_ids_table (id UNSIGNED);

--     -- Biến đếm cho vòng lặp
--     SET @counter = 0;

--     -- Vòng lặp để chèn các ID từ chuỗi vào bảng tạm thời
--     WHILE @counter < LENGTH(input_ids) DO
--         -- Tìm vị trí của dấu phẩy trong chuỗi
--         SET @comma_position = IFNULL(LOCATE(',', input_ids, @counter + 1), LENGTH(input_ids) + 1);

--         -- Lấy một ID từ chuỗi
--         SET @current_id = SUBSTRING(input_ids, @counter + 1, @comma_position - @counter - 1);

--         -- Chuyển đổi ID sang kiểu INT và chèn vào bảng tạm thời
--         INSERT INTO temp_ids_table (id) VALUES (CAST(@current_id AS UNSIGNED));

--         -- Di chuyển biến đếm đến vị trí tiếp theo
--         SET @counter = @comma_position;
--     END WHILE;

--     -- Thực hiện truy vấn để lấy các dòng có ID trong bảng tạm thời
--     SELECT *
--     FROM book
--     WHERE id IN (SELECT id FROM temp_ids_table);

--     -- Xóa bảng tạm thời
--     DROP TEMPORARY TABLE IF EXISTS temp_ids_table;
-- END;

DELIMITER | -- 7 + 8 hiển thị thông tin sách theo nhà cung cấp, thể loại, giá, thứ tự
	create procedure show_book_by_provider(in provider_id int, in genres varchar(255), in price_range double, in order_by varchar(255))
    begin
		if not (select exists (select * from book where book.provider_id = provider_id)) then
			signal sqlstate '45000' set message_text = 'Không có nhà cung cấp này';
		end if;
		
        if genres is not null then
			create temporary table filter_genre as select book.book_id, title, edition, price from
            book join genres_book on book.book_id = genres_book.book_id
            where genres_book.genres = genres and book.provider_id = provider_id;
		else
			create temporary table filter_genre as
            select book_id, title, edition, price from book where book.provider_id = provider_id;
		end if;
        
        if price_range is not null then 
			if (price_range <=> 'low') then
				create temporary table filter_price as select * from filter_genre where filter_genre.price < 50000;
			elseif (price_range <=> 'mid') then
				create temporary table filter_price as select * from filter_genre where filter_genre.price > 50000 and filter_genre.price < 100000;
			elseif (price_range <=> 'high') then
				create temporary table filter_price as select * from filter_genre where filter_genre.price > 100000;
			end if;
		else create temporary table filter_price as select * from filter_genre;
        end if;
        
        if order_by is not null then
			if (order_by <=> 'titleasc') then
				select * from filter_price order by title asc;
			elseif (order_by <=> 'titledesc') then
				select * from filter_price order by title desc;
			elseif (order_by <=> 'priceasc') then
				select * from filter_price order by price asc;
			elseif (order_by <=> 'pricedesc') then 
				select * from filter_price order by price desc;
			end if;
		else select * from filter_price;
		end if;
        
        drop table filter_genre;
		drop table filter_price;
    end;

-- DELIMITER | -- 9
-- 	create procedure 