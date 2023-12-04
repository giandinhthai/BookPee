DELIMITER |
USE assign_db;



Create Trigger assign_db.rate_only_bought_insert
before insert on assign_db.rate
for each row	
BEGIN
	With book_bought AS
	(SELECT book_id, adult_id
	FROM confirm
	Inner join contain on confirm.order_id=contain.order_id )
    
    SELECT Count(*)
	FROM book_bought
	Where adult_id=1 and book_id=1;
    

END;


|
DELIMITER ;