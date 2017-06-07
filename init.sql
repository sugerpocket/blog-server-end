CREATE DATABASE sugerpocket_test;
use sugerpocket_test;

create table users(
  user_id int not null PRIMARY KEY AUTO_INCREMENT,
  username char(18) not null UNIQUE KEY,
  email varchar(64) not null UNIQUE KEY,
  nickname char(12) not null,
  password char(18) not null,
  is_admin bool not null default false,
  join_time datetime not null default current_timestamp,
  avatar varchar(64) not null,
  github varchar(64)
);

create table articles(
  article_id int not null PRIMARY KEY AUTO_INCREMENT,
  title char(30) not null UNIQUE KEY,
  description text(50),
  content text(1000) not null,
  create_time datetime not null default current_timestamp,
  update_time datetime not null default current_timestamp,
  stars int default 0,
  view_times int default 0,
  author_id int not null,
  FOREIGN KEY (author_id) REFERENCES users(user_id)
);

create table comments(
  comment_id int not null PRIMARY KEY AUTO_INCREMENT,
  article_id int not null,
  user_id int not null,
  create_time datetime not null default current_timestamp,
  update_time datetime not null default current_timestamp,
  content text(200),
  stars int default 0,
  FOREIGN KEY (article_id) REFERENCES articles(article_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

create table tags(
  tag_id int not null PRIMARY KEY AUTO_INCREMENT,
  tag_name char(12) not null
);

create table article_tags(
  article_id int not null,
  tag_id int not null,
  FOREIGN KEY (article_id) REFERENCES articles(article_id),
  FOREIGN KEY (tag_id) REFERENCES tags(tag_id)
);