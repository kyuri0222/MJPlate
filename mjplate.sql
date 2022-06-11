DROP DATABASE mjplate;
CREATE DATABASE mjplate;
USE Mjplate;

-- User 테이블 정의
CREATE TABLE `User` (
   `id`   INT   AUTO_INCREMENT PRIMARY KEY,
   `user_ID`   VARCHAR(50)   NULL,
   `user_PW`   VARCHAR(250)   NULL,
   `user_name`   VARCHAR(50)   NULL,
   `user_birth`   DATE   NULL,
   `user_phoneNum`   VARCHAR(250)   NULL
)DEFAULT CHARSET=utf8;
DESC User;

-- Restr 테이블 정의
CREATE TABLE `Restr` (
   `id`   INT   AUTO_INCREMENT PRIMARY KEY,
   `restr_name`   VARCHAR(250)   NOT NULL,
   `restr_type`   VARCHAR(250)   NOT NULL,
   `restr_locate`   VARCHAR(250)   NOT NULL,
   `restr_desc`   VARCHAR(500)   NOT NULL
)DEFAULT CHARSET=utf8;
DESC Restr;

-- User_Restr 테이블 정의
CREATE TABLE `User_Restr` (
   `id`   INT   AUTO_INCREMENT PRIMARY KEY,
   `User_id`   INT   NOT NULL,
   `Restr_id`   INT   NOT NULL,
   FOREIGN KEY (User_id)
       REFERENCES User(id) ON UPDATE CASCADE,
   FOREIGN KEY (Restr_id)
       REFERENCES Restr(id) ON UPDATE CASCADE
)DEFAULT CHARSET=utf8;
DESC User_Restr;

SHOW TABLES;

INSERT INTO Restr(restr_name, restr_type, restr_locate, restr_desc) VALUES ('아쯔다무라', '일식당', '서울 서대문구 증가로 10길 25', '바삭한 일식돈까스, 연어덮밥 맛집');
INSERT INTO Restr(restr_name, restr_type, restr_locate, restr_desc) VALUES ('모래내곱창', '곱창', '서울 서대문구 증가로 10길 26', '폭식각 제어가 안되는 곱창 맛집');
INSERT INTO Restr(restr_name, restr_type, restr_locate, restr_desc) VALUES ('가타쯔무리', '우동,소바', '서울 서대문구 명지대길 72', '일본인 오너세프의 제대로 된 우동 맛집');
INSERT INTO Restr(restr_name, restr_type, restr_locate, restr_desc) VALUES ('여기돈까스', '돈까스', '서울 서대문구 명지대2길 28', '돈까스 맛집');
INSERT INTO Restr(restr_name, restr_type, restr_locate, restr_desc) VALUES ('주인백파스타', '양식', '서울 서대문구 증가로10길 57', '가성비 최강 파스타집');
select * from Restr;