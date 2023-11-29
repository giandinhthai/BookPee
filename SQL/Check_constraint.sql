DELIMITER |
create Trigger assign_db.phone_number1
before insert on assign_db.provider
for each row
Begin
	if not (new.phone_number  regexp '^[0]+[0-9]{9}') then
		signal sqlstate '45000' set message_text ='Số điện thoại phải có 10 chữ số, bắt đầu từ 0';
	end if;
End;

create Trigger assign_db.phone_number2
before update on assign_db.provider
for each row
Begin
	if not (new.phone_number  regexp '^[0]+[0-9]{9}') then
		signal sqlstate '45000' set message_text ='Số điện thoại phải có 10 chữ số, bắt đầu từ 0';
	end if;
End;


create Trigger assign_db.rate1
before insert on assign_db.rate
for each row
Begin
	if (new.score  <1 or new.score >5) then
		signal sqlstate '45000' set message_text ='Số điểm phải từ 1 đến 5';
	end if;
End;

create Trigger assign_db.rate1
before update on assign_db.rate
for each row
Begin
	if (new.score  <1 or new.score >5) then
		signal sqlstate '45000' set message_text ='Số điểm phải từ 1 đến 5';
	end if;
End;
|
DELIMITER ;


-- alter table assign_db.rate
-- add CHECK (score>=1 and score <=5);

-- alter table assign_db.provider
-- add CHECK (phone_number regexp '^[0]+[0-9]{9}' );

-- ALTER TABLE assign_db.provider
-- DROP CONSTRAINT provider_chk_1;

-- alter table assign_db.order_
-- add CHECK (phone_number regexp '^[0]' and phone_number regexp '^[0-9]{10}$');


-- DROP TRIGGER assign_db.phone_number1;
-- DROP TRIGGER assign_db.phone_number2;