USE assign_db;
DELIMITER |
Create Trigger assign_db.rate_only_bought_insert
before insert on assign_db.rate
for each row	
BEGIN
	Declare is_bought_book INT default 0;
	With book_bought AS
	(SELECT book_id, adult_id
	FROM confirm
	Inner join contain on confirm.order_id=contain.order_id
    Where book_id=new.book_id and adult_id=new.adult_id)
    
    SELECT Count(*)
    INTO is_bought_book
	FROM book_bought;
    
    if (is_bought_book<=0) then
		signal sqlstate '45000' set message_text ='Người dùng phải mua mới được quyền đánh giá điểm cuốn sách';
    end if;
END;
|
Create Trigger assign_db.rate_only_bought_update
before update on assign_db.rate
for each row	
BEGIN
	Declare is_bought_book INT default 0;
	With book_bought AS
	(SELECT book_id, adult_id
	FROM confirm
	Inner join contain on confirm.order_id=contain.order_id
    Where book_id=new.book_id and adult_id=new.adult_id)
    
    SELECT Count(*)
    INTO is_bought_book
	FROM book_bought;
    
    if (is_bought_book<=0) then
		signal sqlstate '45000' set message_text ='Người dùng phải mua mới được quyền đánh giá điểm cuốn sách';
    end if;
END;
|

Create Trigger assign_db.have_match_genres_insert
before insert on assign_db.have_
for each row	
BEGIN
	Declare is_having_genres INT default 0;
    
    With book_genres As
    (Select book_id
    From genres_book p1
    inner join discount p2 on p1.genres=p2.genres
    where book_id=new.book_id and discount_id=new.discount_id)
    
-- 	With discount_genres As
--     (Select genres 
--     from discount
--     where discount_id=new.discount_id)
    
    Select Count(*)
    Into is_having_genres 
    from book_genres;
    
    
END;
|
DELIMITER ;