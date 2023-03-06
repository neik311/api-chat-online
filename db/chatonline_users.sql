-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: chatonline
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` varchar(20) NOT NULL,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `password` varchar(300) NOT NULL,
  `email` varchar(100) NOT NULL,
  `describe` varchar(200) DEFAULT NULL,
  `role` varchar(45) NOT NULL,
  `birthday` datetime DEFAULT NULL,
  `lock` tinyint NOT NULL,
  `avatar` varchar(1000) DEFAULT NULL,
  `verify` tinyint DEFAULT NULL,
  `refreshToken` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('anhtn','thẩm','ánh','$2b$08$o9NY0SXi501ogbCtHw./A.MrZr1g37ChVy/zOa/QdYaf85Kaj1AG2','n19dccn012@student.ptithcm.edu.vn','','admin',NULL,0,'https://firebasestorage.googleapis.com/v0/b/messenger-da484.appspot.com/o/avatar-app-chat%2F323426500_689717096027265_7455657298681718938_n.jpg?alt=media&token=7443fcf5-7da3-4774-980c-b4a2f16bf7c8',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFuaHRuIiwicnVsZSI6InVzZXIiLCJpYXQiOjE2NzgwOTQ2OTcsImV4cCI6MTY3ODk1ODY5N30.q-GYtweFHY8q6TVDi84pdmeFlY8_0wBpXkmILUxJx1c'),('gialac','Nguyen Hữu','Gia Lac','$2b$08$qi10CwE/IRVMtRaxh1nhBucD4HH9vvpq3Mj2Cpfqd.d56OAm8TRN.','gialac@gmail.com','hello !!!!!','user',NULL,0,'https://firebasestorage.googleapis.com/v0/b/messenger-da484.appspot.com/o/avatar-app-chat%2Favatar-app-chat%2Fgialac?alt=media&token=fb08f72c-928c-4d40-9e5d-90172c8ada9d',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImdpYWxhYyIsInJ1bGUiOiJ1c2VyIiwiaWF0IjoxNjc3Mzg1NDQ0LCJleHAiOjE2NzgyNDk0NDR9.MTGAzgIlV-id6pg6lpwExTbQ4t-3WwX6S2gD0QhKggQ'),('nckien','Kien','Kien','$2b$08$s0Al/oYhrvPwG/dkRnH0luZKTX3cuvRI79x.O/HpN7YbkU/q.q66m','nvkien@mail.com','hello every','user',NULL,0,'https://dubaothoitiet.info/Uploads/images/bao-ve-thien-nhien.jpg',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im5ja2llbiIsInJ1bGUiOiJ1c2VyIiwiaWF0IjoxNjc3NTU5MjE1LCJleHAiOjE2Nzg0MjMyMTV9.ENx8ui8IS-2P7VLjViioT0sWXc2HmjwX4oAa74FYZLY'),('nolan','Nguyễn','Sơn','$2b$08$7NvbGz9f7ohFHMayG4sYjuVV7rsRF0BbA1UU3Lg7GcVpkXTHDeT5.','trongson2k@gmail.com','','user',NULL,0,'https://firebasestorage.googleapis.com/v0/b/messenger-da484.appspot.com/o/avatar-app-chat%2Favatar-app-chat%2Fnolan?alt=media&token=ae501fe6-4e83-4d5f-8855-da1441887665',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im5vbGFuIiwicnVsZSI6InVzZXIiLCJpYXQiOjE2NzgwOTg4MzMsImV4cCI6MTY3ODk2MjgzM30.gzxS-xPY5PWQEBccD6E1w6KtVu7U6IbSYMT-s9EkBSs'),('nvk','Van','Kien','$2b$08$LR4J4j9XECtjt1uj415gVePJWB2U0VNz0U82rcHSQiIWeSwfztNwq','vankien@gmail.com','','admin',NULL,0,'https://nld.mediacdn.vn/2021/2/2/897a4903-16122387669281414921097.jpg',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im52ayIsInJ1bGUiOiJhZG1pbiIsImlhdCI6MTY3ODA5NjA5OSwiZXhwIjoxNjc4OTYwMDk5fQ.dmSSxG3mn1HgBVSQHmq9tj_89Z3G_Snij7Hh4d2uRog'),('user001','Nguyễn Văn','An','$2b$08$8oP9VxnHVVQWqFrqD.ttMOnjve2TEG4qVJYmarezgrsvSl1ylPlHW','user001@gmail.com','','user',NULL,0,'https://vtvcollege.vtv.vn/storage/galleries/thien-nhien/hinh-anh-ho-nuoc-dep-1.jpg',1,NULL),('user002','Nguyễn Văn','Bình','$2b$08$8oP9VxnHVVQWqFrqD.ttMOnjve2TEG4qVJYmarezgrsvSl1ylPlHW','user002@gmail.com',NULL,'user',NULL,0,'https://vtvcollege.vtv.vn/storage/galleries/thien-nhien/hinh-anh-ho-nuoc-dep-1.jpg',1,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-06 19:58:06
