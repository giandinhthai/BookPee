insert into assign_db.author
Values (1,"JK Rowling" );
insert into assign_db.author
Values (2,"Ramez Elmasri" );
insert into assign_db.author
Values (3,"Shamkant B. Navathe" );
insert into assign_db.author
Values (4,"William Shakespeare" );


insert into assign_db.provider
Values (1,"Nhà xuất bản trẻ", "0938437450","161B đường Lý Chính Thắng, Phường Võ Thị Sáu, Quận 3, Ho Chi Minh City, Vietnam",80);
insert into assign_db.provider
Values (2,"Nhà xuất bản Kim Đồng", "1900571595","55 Quang Trung, Hai Bà Trưng, Hanoi, Vietnam",75);
insert into assign_db.provider
Values (3,"Fahasa", "1900636467","387 Hai Bà Trưng, Ho Chi Minh City, Vietnam",75);

insert into assign_db.book
Values (1,"Harry Potter và hòn đá phù thủy", "13",50000,'Tiếng Việt','thường','2013-5-12',"Nhà xuất bản trẻ","0985676544681",1,100);
insert into assign_db.book
Values (2,"Harry Potter và hòn đá phù thủy", "13",80000,'Tiếng Việt','thường','2015-9-12',"Nhà xuất bản trẻ","0985676544752",1,1);
insert into assign_db.book
Values (3,"Harry Potter và hội phượng hoàng", "13",90000,'Tiếng Việt','thường','2018-3-12',"Nhà xuất bản trẻ","0985676544752",1,1);
insert into assign_db.book
values (4,"Chú heo giáng sinh","3", 150000,'Tiếng Việt','đặc biệt', '2021-12-3',"Nhà xuất bản Kim Đồng","0985676544831",2,100 );
insert into assign_db.book
values (5,"Chú heo giáng sinh","3", 90000,'Tiếng Việt','thường', '2021-12-3',"Nhà xuất bản Kim Đồng","0985676544831",2,100 );
insert into assign_db.book
values (6,"Chú heo giáng sinh","3", 120000,'Tiếng Việt','đặc biệt', '2021-12-3',"Nhà xuất bản Kim Đồng","0985676544831",2,100 );
insert into assign_db.book
Values (7,"Harry Potter và tù nhân ngục Azakaban", "13",50000,'Tiếng Việt','thường','2013-5-12',"Nhà xuất bản trẻ","0985676544681",1,1);
insert into assign_db.book
Values (8,"Harry Potter và tù nhân ngục Azakaban", "13",75000,'Tiếng Việt','thường','2013-5-12',"Fahasa","0985676544681",3,100);
insert into assign_db.book
Values (9,"Harry Potter và phòng chứa bí mật", "13",150000,'Tiếng Việt','thường','2013-5-12',"Fahasa","0985676544681",3,100);
insert into assign_db.book
Values (10,"Harry Potter và chiếc cốc lửa", "13",150000,'Tiếng Việt','thường','2013-5-12',"Fahasa","0985676544681",3,100);
insert into assign_db.book
Values (11,"Harry Potter và hoàng tử lai", "13",150000,'Tiếng Việt','thường','2013-5-12',"Fahasa","0985676544681",3,100);
insert into assign_db.book
Values (12,"Harry Potter và hoàng tử lai", "13",150000,'Tiếng Việt','thường','2013-5-12',"Fahasa","0985676544681",3,100);
insert into assign_db.book
Values (13,"Harry Potter và bảo bối tử thần", "13",150000,'Tiếng Việt','thường','2013-5-12',"Fahasa","0985676544681",3,100);
insert into assign_db.book
Values (14,"Harry Potter và bảo bối tử thần", "13",150000,'Tiếng Việt','thường','2013-5-12',"Fahasa","0985676544681",3,100);
insert into assign_db.book
Values (15,"Fundamentals of Database system, 8th", "13",150000,'Tiếng Anh','thường','2013-5-12',"Fahasa","0985676544681",3,100);
insert into assign_db.book
Values (16,"Fundamentals of Database system, 8th", "13",150000,'Tiếng Anh','thường','2013-5-12',"Fahasa","0985676544681",3,100);
insert into assign_db.book
Values (17,"Fundamentals of Database system, 7th", "13",150000,'Tiếng Anh','thường','2013-5-12',"Fahasa","0985676544681",3,100);
insert into assign_db.book
Values (18,"Romeo và Juliet", "13",150000,'Tiếng Anh','thường','2013-5-12',"Fahasa","0985676544681",3,100);
insert into assign_db.book
Values (19,"Đêm thứ mười hai", "13",150000,'Tiếng Anh','thường','2013-5-12',"Fahasa","0985676544681",3,100);
insert into assign_db.book
Values (20,"Hamlet", "13",150000,'Tiếng Anh','thường','2013-5-12',"Fahasa","0985676544681",3,100);

insert into assign_db.series
values(1,"Harry Potter",7);

insert into assign_db.consisted
values(1,1);
insert into assign_db.consisted
values(2,1);
insert into assign_db.consisted
values(3,1);
insert into assign_db.consisted
values(4,1);
insert into assign_db.consisted
values(5,1);
insert into assign_db.consisted
values(6,1);
insert into assign_db.consisted
values(7,1);
insert into assign_db.consisted
values(8,1);
insert into assign_db.consisted
values(9,1);
insert into assign_db.consisted
values(10,1);
insert into assign_db.consisted
values(11,1);
insert into assign_db.consisted
values(12,1);
insert into assign_db.consisted
values(13,1);
insert into assign_db.consisted
values(14,1);

insert into assign_db.genres_book
values(1,"novel");
insert into assign_db.genres_book
values(1,"mystery");
insert into assign_db.genres_book
values(2,"novel");
insert into assign_db.genres_book
values(2,"mystery");
insert into assign_db.genres_book
values(3,"novel");
insert into assign_db.genres_book
values(3,"mystery");
insert into assign_db.genres_book
values(4,"novel");
insert into assign_db.genres_book
values(4,"mystery");
insert into assign_db.genres_book
values(5,"novel");
insert into assign_db.genres_book
values(5,"mystery");
insert into assign_db.genres_book
values(6,"novel");
insert into assign_db.genres_book
values(6,"mystery");
insert into assign_db.genres_book
values(7,"novel");
insert into assign_db.genres_book
values(7,"mystery");
insert into assign_db.genres_book
values(8,"novel");
insert into assign_db.genres_book
values(8,"mystery");
insert into assign_db.genres_book
values(9,"novel");
insert into assign_db.genres_book
values(9,"mystery");
insert into assign_db.genres_book
values(10,"novel");
insert into assign_db.genres_book
values(10,"mystery");
insert into assign_db.genres_book
values(11,"novel");
insert into assign_db.genres_book
values(11,"mystery");
insert into assign_db.genres_book
values(12,"novel");
insert into assign_db.genres_book
values(12,"mystery");
insert into assign_db.genres_book
values(13,"novel");
insert into assign_db.genres_book
values(13,"mystery");
insert into assign_db.genres_book
values(14,"novel");
insert into assign_db.genres_book
values(14,"mystery");
insert into assign_db.genres_book
values(15,"education");
insert into assign_db.genres_book
values(15,"technology");
insert into assign_db.genres_book
values(16,"education");
insert into assign_db.genres_book
values(16,"technology");
insert into assign_db.genres_book
values(17,"education");
insert into assign_db.genres_book
values(17,"technology");
insert into assign_db.genres_book
values(18,"drama");
insert into assign_db.genres_book
values(19,"drama");
insert into assign_db.genres_book
values(20,"drama");


insert into assign_db.write_
values(1,1);
insert into assign_db.write_
values(2,1);
insert into assign_db.write_
values(3,1);
insert into assign_db.write_
values(4,1);
insert into assign_db.write_
values(5,1);
insert into assign_db.write_
values(6,1);
insert into assign_db.write_
values(7,1);
insert into assign_db.write_
values(8,1);
insert into assign_db.write_
values(9,1);
insert into assign_db.write_
values(10,1);
insert into assign_db.write_
values(11,1);
insert into assign_db.write_
values(12,1);
insert into assign_db.write_
values(13,1);
insert into assign_db.write_
values(14,1);
insert into assign_db.write_
values(15,2);
insert into assign_db.write_
values(16,2);
insert into assign_db.write_
values(17,2);
insert into assign_db.write_
values(15,3);
insert into assign_db.write_
values(16,3);
insert into assign_db.write_
values(17,3);
insert into assign_db.write_
values(18,4);
insert into assign_db.write_
values(19,4);
insert into assign_db.write_
values(20,1);

insert into assign_db.physical_book
values (1,"bìa mềm",'45x30',354,0.5,"sách cũ");
insert into assign_db.physical_book
values (4,"bìa cứng",'45x35',124,0.4,"sách mới");
insert into assign_db.physical_book
values (6,"bìa mềm",'45x35',124,0.2,"sách mới");
insert into assign_db.physical_book
values (11,"bìa mềm",'45x35',124,0.2,"sách mới");
insert into assign_db.physical_book
values (13,"bìa mềm",'45x35',124,0.2,"sách mới");
insert into assign_db.physical_book
values (16,"bìa mềm",'45x35',124,0.2,"sách mới");
insert into assign_db.physical_book
values (17,"bìa mềm",'45x35',124,0.2,"sách mới");
insert into assign_db.physical_book
values (18,"bìa mềm",'45x35',124,0.2,"sách mới");
insert into assign_db.physical_book
values (19,"bìa mềm",'45x35',124,0.2,"sách mới");
insert into assign_db.physical_book
values (20,"bìa mềm",'45x35',124,0.2,"sách mới");

insert into assign_db.audio_book
values (2,590,"4:45:59");
insert into assign_db.audio_book
values (7,690,"5:27:25");
insert into assign_db.audio_book
values (10,750,"6:27:25");
insert into assign_db.audio_book
values (8,390,"5:27:25");
insert into assign_db.audio_book
values (9,390,"5:27:25");
insert into assign_db.audio_book
values (12,390,"5:27:25");

insert into assign_db.kindle_book
values (3,190,354);
insert into assign_db.kindle_book
values (5,250,124);
insert into assign_db.kindle_book
values (14,250,124);
insert into assign_db.kindle_book
values (15,250,124);

insert into assign_db.customer
values(1,"Nguyễn Hoài Trung","hoaitrung", "hoaitrung","M","2003:01:26");
insert into assign_db.customer
values(2,"Nguyễn Châu Long","chaulong", "chaulong","M","2003:01:26");
insert into assign_db.customer
values(3,"Hồ Trọng Nhân","trongnhan", "trongnhan","M","2003:01:26");
insert into assign_db.customer
values(4,"Giản Đình Thái","dinhthai", "dinhthai","M","2003:01:26");
insert into assign_db.customer
values(5,"Vũ Lê Khánh My","khanhmy", "khanhmy","F","2017:01:26");

insert into assign_db.adult
values(1,"0397253405");
insert into assign_db.adult
values(2,"0397253406");
insert into assign_db.adult
values(3,"0397253407");
insert into assign_db.adult
values(4,"0397253408");

insert into assign_db.adult_address
values(1,"16 Võ Thị Sáu, thị trấn Madaguoi, huyện Đạ Huoai, Tỉnh Lâm Đồng");
insert into assign_db.adult_address
values(1,"497 Hòa Hảo, phường 7, Quận 10, Thành phố Hồ Chí Minh");
insert into assign_db.adult_address
values(2,"Kí túc xá khu A, phường Linh Trung, thành phố Thủ Đức");
insert into assign_db.adult_address
values(3,"Kí túc xá khu A, phường Linh Trung, thành phố Thủ Đức");
insert into assign_db.adult_address
values(4,"Kí túc xá khu A, phường Linh Trung, thành phố Thủ Đức");

insert into assign_db.child
values(5,1);

insert into assign_db.discount
values(1,"2023:11:28 00:00:00","2003:12:29 00:00:00", "Khuyến mãi giáng sinh",50,"novel");
insert into assign_db.discount
values(2,"2024:08:7 00:00:00","2024:09:10 00:00:00", "Khuyến mãi năm học mới",20,"education");

insert into assign_db.have_
values(1,1);
insert into assign_db.have_
values(1,2);
insert into assign_db.have_
values(1,3);
insert into assign_db.have_
values(1,4);
insert into assign_db.have_
values(1,5);
insert into assign_db.have_
values(1,6);
insert into assign_db.have_
values(1,7);
insert into assign_db.have_
values(1,8);
insert into assign_db.have_
values(1,9);
insert into assign_db.have_
values(1,10);
insert into assign_db.have_
values(1,11);
insert into assign_db.have_
values(1,12);
insert into assign_db.have_
values(1,13);
insert into assign_db.have_
values(1,14);
insert into assign_db.have_
values(2,15);
insert into assign_db.have_
values(2,16);
insert into assign_db.have_
values(2,17);

insert into assign_db.promotion_code
values(1,"Mã giảm giá 12/12 cho thành viên đồng","2023-12-11 23:59:59","2023-12-12 23:59:59",30000,100000,40,1,"đồng");
insert into assign_db.promotion_code
values(2,"Mã giảm giá 12/12 cho thành viên bạc","2023-12-11 23:59:59","2023-12-12 23:59:59",30000,100000,60,5,"bạc");
insert into assign_db.promotion_code
values(3,"Mã giảm giá 12/12 cho thành viên vàng","2023-12-11 23:59:59","2023-12-12 23:59:59",30000,100000,70,5,"vàng");
insert into assign_db.promotion_code
values(4,"Mã giảm giá 12/12 cho thành viên kim cương","2023-12-11 23:59:59","2023-12-12 23:59:59",30000,100000,80,5,"kim cương");
insert into assign_db.promotion_code
values(5,"Mã 1/12","2023:12:1 00:00:01","2023-12-31 23:59:59",30000,100000,20,5,"đồng");

insert into assign_db.follow
values(1,1);
insert into assign_db.follow
values(2,1);
insert into assign_db.follow
values(1,4);
insert into assign_db.follow
values(3,4);

insert into assign_db.own
values(1,1);
insert into assign_db.own
values(1,2);
insert into assign_db.own
values(1,3);
insert into assign_db.own
values(1,4);
insert into assign_db.own
values(2,1);
insert into assign_db.own
values(2,2);
insert into assign_db.own
values(2,3);
insert into assign_db.own
values(2,4);
insert into assign_db.own
values(3,1);
insert into assign_db.own
values(3,2);
insert into assign_db.own
values(3,3);
insert into assign_db.own
values(3,4);
insert into assign_db.own
values(4,1);
insert into assign_db.own
values(4,2);
insert into assign_db.own
values(4,3);
insert into assign_db.own
values(4,4);

insert into assign_db.order_
values(1,"2018-01-01 11:00:00",NULL,"vnpost",NULL ,15000,"OCD",null,"đã hủy","16 Võ Thị Sáu, thị trấn Madaguoi, huyện Đạ Huoai, Tỉnh Lâm Đồng","Nguyễn Hoài Trung","0397253405",1,1,"đã hủy", null,"đã hủy","online",null);
insert into assign_db.order_
values(2,"2018-02-01 12:00:00","2018-02-13 07:27:47","vnpost","Phạm Văn Bé" ,5000,"OCD","2018-02-13 07:27:47","đã giao","16 Võ Thị Sáu, thị trấn Madaguoi, huyện Đạ Huoai, Tỉnh Lâm Đồng","Nguyễn Hoài Trung","0397253405",1,1,"đã lấy", "2018-02-02 07:27:47","đã trả","online","2018-02-28 07:27:47");
insert into assign_db.order_
values(3,"2023-11-30 13:00:00",NULL,"vnpost",NULL ,15000,"OCD",null,"đang giao","16 Võ Thị Sáu, thị trấn Madaguoi, huyện Đạ Huoai, Tỉnh Lâm Đồng","Nguyễn Hoài Trung","0397253405",5,2,"đã lấy","2023-12-01 13:00:00","chưa trả","trực tiếp",null);
insert into assign_db.order_
values(4,"2023-12-01 14:00:00","2023-12-01 14:05:00","kindle","Phạm Văn Bé" ,0,"Momo","2023-12-01 14:02:55","đã giao","hoaitrungchar","Nguyễn Hoài Trung","0397253405",1,3,"đã lấy", "2023-12-01 14:03:55","đã trả","online","2023-12-22 14:04:55");

insert into assign_db.contain
values(1,1,1);
insert into assign_db.contain
values(1,2,1);
insert into assign_db.contain
values(1,7,1);
insert into assign_db.contain
values(1,3,1);
insert into assign_db.contain
values(2,1,1);
insert into assign_db.contain
values(2,2,1);
insert into assign_db.contain
values(2,7,1);
insert into assign_db.contain
values(2,3,1);
insert into assign_db.contain
values(3,4,1);
insert into assign_db.contain
values(3,5,1);
insert into assign_db.contain
values(3,6,1);
insert into assign_db.contain
values(4,10,1);
insert into assign_db.contain
values(4,11,1);
insert into assign_db.contain
values(4,12,1);

insert into assign_db.confirm
values(1,1);
insert into assign_db.confirm
values(2,1);
insert into assign_db.confirm
values(3,1);
insert into assign_db.confirm
values(4,1);

insert into assign_db.apply_for
values (4,1);

insert into assign_db.review
values(1,1,"The beginning is boring","2018-12-11 23:25:30",1);
insert into assign_db.review
values(1,2,"This is the book of magic","2019-1-25 12:25:30",1);
insert into assign_db.review
values(1,3,"The story is fantastic","2019-7-25 12:25:30",1);

insert into assign_db.rate
values (1,4,3);
insert into assign_db.rate
values (1,5,5);
insert into assign_db.rate
values (1,7,2);















