CREATE DATABASE sugerpocket_test;
use sugerpocket_test;

create table users(
  user_id int not null PRIMARY KEY AUTO_INCREMENT,
  username char(18) not null UNIQUE KEY,
  email varchar(64) not null UNIQUE KEY,
  nickname char(12) not null,
  password char(18) not null,
  is_admin bool not null default false,
  join_time timestamp not null default CURRENT_TIMESTAMP,
  avatar varchar(64),
  github varchar(64)
);

create table articles(
  article_id int not null PRIMARY KEY AUTO_INCREMENT,
  title char(30) not null UNIQUE KEY,
  description text(50),
  content text(1000) not null,
  update_time timestamp not null DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  create_time timestamp not null DEFAULT CURRENT_TIMESTAMP,
  stars int default 0,
  view_times int default 0,
  author_id int not null,
  FOREIGN KEY (author_id) REFERENCES users(user_id)
);

create table comments(
  comment_id int not null PRIMARY KEY AUTO_INCREMENT,
  article_id int not null,
  user_id int not null,
  update_time timestamp not null DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  create_time timestamp not null DEFAULT CURRENT_TIMESTAMP,
  content text(200),
  stars int default 0,
  FOREIGN KEY (article_id) REFERENCES articles(article_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

create table tags(
  user_id int not null,
  tag_name char(12) not null,
  PRIMARY KEY (user_id, tagname),
  FOREIGN KEY (user_id) REFERENCES users(user_id),
);

create table article_tags(
  article_id int not null,
  user_id int not null,
  tag_name int not null,
  FOREIGN KEY (article_id) REFERENCES articles(article_id),
  FOREIGN KEY (user_id, tag_name) REFERENCES tags(user_id, tag_name),
  PRIMARY KEY (article_id, user_id, tag_name)
);

insert into users(username, email, password, nickname) values ('sugerpocket', 'mymikotomisaka@gmail.com', '8a52dd784469f73b364245d78373282b', 'sugerpocket');