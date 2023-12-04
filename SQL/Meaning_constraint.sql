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
    
    Select Count(*)
    Into is_having_genres 
    from book_genres;
    
    If (is_having_genres<=0) then
		signal sqlstate '45000' set message_text ='Sách không thuộc thể loại của chương trình khuyến mãi này';
    end if;
END;
|
Create Trigger assign_db.have_match_genres_update
before update on assign_db.have_
for each row	
BEGIN
	Declare is_having_genres INT default 0;
    
    With book_genres As
    (Select book_id
    From genres_book p1
    inner join discount p2 on p1.genres=p2.genres
    where book_id=new.book_id and discount_id=new.discount_id)
    
    Select Count(*)
    Into is_having_genres 
    from book_genres;
    
    If (is_having_genres<=0) then
		signal sqlstate '45000' set message_text ='Sách không thuộc thể loại của chương trình khuyến mãi này';
    end if;
END
|
Create Trigger assign_db.adult_age_16_insert
before insert on assign_db.adult
for each row	
BEGIN
	Declare customer_birthday date;
    Declare age INT default 0;
	SELECT birthday into customer_birthday
	FROM customer
	WHERE customer_id=new.customer_id;
	SELECT TIMESTAMPDIFF(YEAR, customer_birthday, CURDATE()) into age;
    If (age<16) then
		signal sqlstate '45000' set message_text ='Tuổi của tài khoản trưởng thành phải lớn hơn bằng 16';
    end if;
END
|

Create Trigger assign_db.adult_age_16_update
before update on assign_db.adult
for each row	
BEGIN
	Declare customer_birthday date;
    Declare age INT default 0;
	SELECT birthday into customer_birthday
	FROM customer
	WHERE customer_id=new.customer_id;
	SELECT TIMESTAMPDIFF(YEAR, customer_birthday, CURDATE()) into age;
    If (age<16) then
		signal sqlstate '45000' set message_text ='Tuổi của tài khoản trưởng thành phải lớn hơn bằng 16';
    end if;
END
|

Create Trigger assign_db.adult_child_16_insert
before insert on assign_db.child
for each row	
BEGIN
	Declare customer_birthday date;
    Declare age INT default 0;
	SELECT birthday into customer_birthday
	FROM customer
	WHERE customer_id=new.customer_id;
	SELECT TIMESTAMPDIFF(YEAR, customer_birthday, CURDATE()) into age;
    If (age>16) then
		signal sqlstate '45000' set message_text ='Tuổi của tài khoản trẻ em phải bé hơn 16';
    end if;
END
|

Create Trigger assign_db.child_age_16_update
before update on assign_db.child
for each row	
BEGIN
	Declare customer_birthday date ;
    Declare age INT default 0;
	SELECT birthday into customer_birthday
	FROM customer
	WHERE customer_id=new.customer_id;
	SELECT TIMESTAMPDIFF(YEAR, customer_birthday, CURDATE()) into age;
    If (age>=16) then
		signal sqlstate '45000' set message_text ='Tuổi của tài khoản trẻ em phải bé hơn 16';
    end if;
END
-- |
-- Create Trigger assign_db.apply_for_membership_match
-- before update on assign_db.apply_for
-- for each row	
-- BEGIN
-- 	Declare membership_customer INT ;
--     Declare membership_promotion INT;
--     
--     Select membership
--     from  promotion_code
--     into membership_customer;
--     
--     
--     If (age>=16) then
-- 		signal sqlstate '45000' set message_text ='Tuổi của tài khoản trẻ em phải bé hơn 16';
--     end if;
-- END
|
Create Trigger assign_db.contain_age
before insert on assign_db.contain
for each row	
BEGIN
	Declare customer_id_of_order int;
	Declare customer_birthday date ;
    Declare age INT default 0;
    Declare book_reading_age int;
    
    Select customer_id into customer_id_of_order
    From order_
    where order_.order_id=new.order_id;
	SELECT birthday into customer_birthday
	FROM customer
	WHERE customer_id=new.customer_id;
	SELECT TIMESTAMPDIFF(YEAR, customer_birthday, CURDATE()) into age;
    
    Select reading_age
    into book_reading_age
    From book 
    Where book.book_id=new.book_id;
    
    If (age<book_reading_age) then
		signal sqlstate '45000' set message_text ='Tuổi của tài khoản không đủ để đọc cuốn sách này';
    end if;
END
|
Create Trigger assign_db.contain_age
before update on assign_db.contain
for each row	
BEGIN
	Declare customer_id_of_order int;
	Declare customer_birthday date ;
    Declare age INT default 0;
    Declare book_reading_age int;
    
    Select customer_id into customer_id_of_order
    From order_
    where order_.order_id=new.order_id;
	SELECT birthday into customer_birthday
	FROM customer
	WHERE customer_id=new.customer_id;
	SELECT TIMESTAMPDIFF(YEAR, customer_birthday, CURDATE()) into age;
    
    Select reading_age
    into book_reading_age
    From book 
    Where book.book_id=new.book_id;
    
    If (age<book_reading_age) then
		signal sqlstate '45000' set message_text ='Tuổi của tài khoản không đủ để đọc cuốn sách này';
    end if;
END
|
Create Trigger assign_db.contain_same_provider
before insert on assign_db.contain
for each row	
BEGIN
	Declare num_provider int;
	Select count(Distinct provider_id)
    into num_provider
    from contain c1
    inner join book b1 on c1.book_id=b1.book_id
    where c1.order_id=new.order_id;
    
    If (num_provider>=2) then
		signal sqlstate '45000' set message_text ='Các cuốn sách cần thuộc cùng một nhà cung cấp.';
    end if;
END
|
Create Trigger assign_db.contain_same_provider
before update on assign_db.contain
for each row	
BEGIN
	Declare num_provider int;
	Select count(Distinct provider_id)
    into num_provider
    from contain c1
    inner join book b1 on c1.book_id=b1.book_id
    where c1.order_id=new.order_id;
    
    If (num_provider>=2) then
		signal sqlstate '45000' set message_text ='Các cuốn sách cần thuộc cùng một nhà cung cấp.';
    end if;
END
DELIMITER ;