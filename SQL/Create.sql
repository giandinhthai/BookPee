CREATE SCHEMA `assign_db` ;

CREATE TABLE assign_db.author (
    author_id int NOT NULL primary key,
    penname varchar(255) NOT NULL
);

CREATE table  assign_db.customer(
	customer_id int  NOT NULL AUTO_INCREMENT primary key,
    name_ varchar(255) NOT NULL,
    password_ varchar(255) NOT NULL,
    username varchar(255) NOT NULL unique,
    gender char(1) NOT NULL,
    birthday DATE NOT NULL
);

Create table  assign_db.provider(
	provider_id  int  NOT NULL AUTO_INCREMENT primary key,
    name_ varchar(255) NOT NULL,
    phone_number char(10) NOT NULL,
    address varchar(255) NOT NULL,
    ratio_supplier_payment double NOT NULL
);

create table  assign_db.discount(
	discount_id int  NOT NULL AUTO_INCREMENT primary key,
    start_date datetime NOT NULL, 
    end_date datetime NOT NULL,
    name_ varchar(255) NOT NULL,
    discount_value int NOT NULL,
    genres varchar(255) not null
);
Create table  assign_db.book(
	book_id int  NOT NULL AUTO_INCREMENT primary key,
    title varchar(255) NOT NULL,
    reading_age int NOT NULL,
    price double NOT NULL,
    language_ varchar(255) NOT NULL,
    edition varchar(255) NOT NULL,
    publication_date DATE NOT NULL,
    publisher_name varchar(255) NOT NULL,
    isbn varchar(13),
    provider_id int  NOT NULL,
    quantity int NOT NULL,
    FOREIGN KEY (provider_id) references provider(provider_id)
);

create table  assign_db.kindle_book(
	book_id int NOT NULL primary key,
    size int NOT NULL,
    paper_length int NOT NULL,
    FOREIGN KEY (book_id) references book(book_id)
);

create table  assign_db.audio_book (
	book_id int NOT NULL primary key,
    size int NOT NULL,
    time_ TIME Not NULL,
    FOREIGN KEY (book_id) references book(book_id)
);

create table  assign_db.physical_book(
	book_id int NOT NULL primary key,
    format_ varchar(255) NOT NULL,
	dimensions varchar(255) NOT NULL,
    paper_length int NOT NULL,
    weigth double NOT NULL,
    status_ varchar(255) NOT NULL,
    FOREIGN KEY (book_id) references book(book_id)
);

create table  assign_db.series(
	series_id int NOT NULL primary key,
    name_ varchar(255) NOT NULL,
    number_of_episode int NOT NULL
);

create table  assign_db.order_(
	order_id int NOT NULL primary key,
    order_time datetime NOT NULL,
    shipment_time datetime ,
    shipment_type  varchar(255) NOT NULL,
    shipper varchar(255),
    ship_fee double not null,
    payment_method varchar(255) not null,
    payment_time datetime,
    status_ varchar (255) not null,
    address varchar(255) not null,
    name_ varchar(255) not null,
    phone_number char(10) not null,
    customer_id int not null,
    provider_id int not null,
    take_status varchar(255) not null,
    take_time datetime,
    paid_status varchar(255) not null,
    supplier_payment_method varchar(255),
    supplier_payment_time datetime,
    FOREIGN KEY (customer_id) references customer(customer_id),
    FOREIGN KEY (provider_id) references provider(provider_id)
);

create table  assign_db.promotion_code(
	code_id int NOT NULL primary key,
    name_ varchar(255) NOT NULL,
    start_date datetime NOT NULL, 
    end_date datetime NOT NULL,
    min_order int NOT NULL,
    maximum_promo int NOT NULL,
    promo_value double NOT NULL,
    init_quantity int NOT NULL,
    membership varchar(255)
);

create table  assign_db.adult(
	customer_id int NOT NULL,
    phone_number char(10) not null,
    FOREIGN KEY (customer_id) references customer(customer_id)
);
create table  assign_db.child(
	customer_id int NOT NULL primary key,
    guardian_id int NOT NULL,
    FOREIGN KEY (customer_id) references customer(customer_id),
    FOREIGN KEY (guardian_id)  references adult (customer_id)
);

create table  assign_db.confirm(
	order_id int not NULL primary key,
    adult_id int not NULL,
    foreign key (order_id) references adult(customer_id) 
);

create table  assign_db.apply_for(
	order_id int not NULL primary key,
    promotion_code_id int not NULL,
    foreign key (order_id) references order_(order_id),
    foreign key (promotion_code_id) references promotion_code(code_id)
);

create table  assign_db.contain(
	order_id int not NULL,
    book_id int not NULL,
    quantity int not NULL,
    foreign key (order_id) references order_(order_id),
    foreign key (book_id) references book(book_id),
    CONSTRAINT pk_contain PRIMARY KEY (order_id, book_id)
);

create table  assign_db.consisted(
	book_id int not NULL primary key,
    series_id int not NULL,
    foreign key (book_id) references book(book_id),
    foreign key (series_id) references series(series_id)
);

create table  assign_db.have_(
	discount_id int not NULL,
    book_id int not NULL,
	CONSTRAINT pk_have_ PRIMARY KEY (discount_id, book_id),
    foreign key (discount_id) references discount(discount_id),
    foreign key (book_id) references book(book_id)
);

CREATE table  assign_db.rate(
	adult_id int  NOT NULL,
    book_id int NOT NULL,
    score int NOT NULL,
    CONSTRAINT pk_rate PRIMARY KEY (adult_id, book_id),
    foreign key (adult_id) references adult (customer_id),
    foreign key (book_id) references book (book_id)
);


CREATE table  assign_db.own (
	adult_id int  NOT NULL,
    promotion_code_id int NOT NULL,
    CONSTRAINT pk_own PRIMARY KEY (adult_id, promotion_code_id),
    foreign key (adult_id) references adult (customer_id),
    foreign key (promotion_code_id) references promotion_code (code_id)
);

CREATE table  assign_db.follow (
	customer_id int NOT NULL,
	author_id int  NOT NULL,
    CONSTRAINT pk_follow PRIMARY KEY (customer_id,author_id ),
    foreign key (customer_id)  references customer (customer_id),
    foreign key (author_id) references author (author_id)
);



CREATE table  assign_db.write_ (
	book_id int  NOT NULL,
    author_id int NOT NULL,
    CONSTRAINT pk_follow PRIMARY KEY (book_id,author_id),
    foreign key (book_id) references book (book_id),
    foreign key (author_id) references author (author_id)
);

Create table assign_db.review(
	book_id int NOT NULL,
    ordinal_number int NOT NULL,
    content varchar(255) not null,
    time_ datetime not null,
    reviewer_id  int not null,
    constraint pk_review Primary key (book_id, ordinal_number),
	foreign key (book_id) references book (book_id),
    foreign key (reviewer_id) references adult(customer_id)
);

create table assign_db.genres_book(
	book_id int not null,
    genres varchar(255) not null,
    constraint pk_genres_book primary key (book_id, genres),
    foreign key (book_id) references book (book_id)
);

create table assign_db.adult_address (
	customer_id int not null,
    address varchar(255) not null,
    constraint pk_adult_address primary key (customer_id,address),
    foreign key (customer_id) references adult(customer_id)
);




