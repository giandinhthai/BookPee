DELIMITER |

Create Trigger assign_db.apply_for_check_min_order_insert
before insert on assign_db.apply_for
for each row	
BEGIN
	Declare is_bought_book INT default 0;
	Select
    
    if (is_bought_book<=0) then
		signal sqlstate '45000' set message_text ='Người dùng phải mua mới được quyền đánh giá điểm cuốn sách';
    end if;
END;
|
DELIMITER ;