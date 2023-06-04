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
-- Table structure for table `blockuser`
--

DROP TABLE IF EXISTS `blockuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blockuser` (
  `id` int NOT NULL AUTO_INCREMENT,
  `blocker` varchar(20) NOT NULL,
  `blocked` varchar(20) NOT NULL,
  `createAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `blocker` (`blocker`),
  KEY `blocked` (`blocked`),
  CONSTRAINT `blockuser_ibfk_1` FOREIGN KEY (`blocker`) REFERENCES `users` (`id`),
  CONSTRAINT `blockuser_ibfk_2` FOREIGN KEY (`blocked`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blockuser`
--

LOCK TABLES `blockuser` WRITE;
/*!40000 ALTER TABLE `blockuser` DISABLE KEYS */;
/*!40000 ALTER TABLE `blockuser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `forgotpassword`
--

DROP TABLE IF EXISTS `forgotpassword`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `forgotpassword` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `uniqueString` varchar(50) NOT NULL,
  `createAt` datetime NOT NULL,
  `effectiveSeconds` int NOT NULL,
  `password` varchar(300) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forgotpassword`
--

LOCK TABLES `forgotpassword` WRITE;
/*!40000 ALTER TABLE `forgotpassword` DISABLE KEYS */;
/*!40000 ALTER TABLE `forgotpassword` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groups`
--

DROP TABLE IF EXISTS `groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `groups` (
  `id` int NOT NULL AUTO_INCREMENT,
  `isDelete` tinyint NOT NULL,
  `updateAt` datetime DEFAULT NULL,
  `sender` varchar(20) NOT NULL,
  `receive` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sender` (`sender`),
  KEY `receive` (`receive`),
  CONSTRAINT `groups_ibfk_1` FOREIGN KEY (`sender`) REFERENCES `users` (`id`),
  CONSTRAINT `groups_ibfk_2` FOREIGN KEY (`receive`) REFERENCES `users` (`id`),
  CONSTRAINT `groups_ibfk_3` FOREIGN KEY (`receive`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groups`
--

LOCK TABLES `groups` WRITE;
/*!40000 ALTER TABLE `groups` DISABLE KEYS */;
INSERT INTO `groups` VALUES (5,0,'2023-03-06 15:39:35','nckien','nvk'),(6,0,'2023-03-06 14:28:58','gialac','nvk'),(7,0,'2023-03-06 15:04:46','gialac','nckien'),(8,1,'2023-03-06 13:32:57','gialac','user001'),(9,1,'2023-03-06 13:36:29','nvk','user001'),(10,1,'2023-03-04 13:32:38','gialac','gialac'),(12,1,'2023-03-06 13:36:27','nvk','user002'),(13,0,'2023-03-06 09:25:44','anhtn','nckien'),(14,1,'2023-03-24 10:14:20','anhtn','gialac'),(15,0,'2023-03-06 13:45:49','nolan','nvk'),(16,0,'2023-03-06 15:08:40','Bin04','anhtn'),(17,1,'2023-03-06 15:09:25','Bin04','nckien'),(18,1,'2023-03-06 16:10:15','Bin04','nvk');
/*!40000 ALTER TABLE `groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `groupId` int NOT NULL,
  `messages` varchar(500) NOT NULL,
  `createAt` datetime NOT NULL,
  `sender` varchar(20) NOT NULL,
  `type` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `messages_ibfk_1` (`groupId`),
  KEY `sender` (`sender`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`groupId`) REFERENCES `groups` (`id`),
  CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`sender`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=201 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1,6,'xin chào tôi là nvk','2023-01-31 08:58:18','nvk','text'),(6,7,'https://img1.kienthucvui.vn/uploads/2021/12/30/anh-thien-nhien-tuyet-dep_090101322.jpeg','2023-02-15 16:11:50','gialac','image'),(7,7,'https://img1.kienthucvui.vn/uploads/2021/12/30/anh-thien-nhien-dep-nhat_090100723.jpg','2023-02-16 13:40:21','nckien','image'),(8,7,'xin chaof okeeeeeeeeeeeeeeeeeeeeeeeeeee eeeeeeeeeeeeeeeeeeeeeeeeeeeee','2023-02-16 13:40:27','nckien','text'),(10,7,'oke','2023-02-16 13:40:38','nckien','text'),(73,7,'vfdvf','2023-03-03 13:36:53','gialac','text'),(74,7,'https://firebasestorage.googleapis.com/v0/b/messenger-da484.appspot.com/o/image%2F305480071_612495127038661_2016148140128080453_n.jpg?alt=media&token=f90dfd40-aa7f-4093-80c9-7cf63010a089','2023-03-03 13:37:03','gialac','image'),(76,5,'Ok','2023-03-03 13:54:59','nckien','text'),(77,7,'Ok','2023-03-03 13:55:06','nckien','text'),(78,7,'https://firebasestorage.googleapis.com/v0/b/messenger-da484.appspot.com/o/avatar-app-chat%2Fimage%2Fnckien?alt=media&token=b6ef0596-6b38-4677-9950-2a3a57a511af','2023-03-03 13:55:22','nckien','image'),(89,7,'hi','2023-03-03 15:11:26','gialac','text'),(95,5,'vfdvf','2023-03-04 07:26:05','nvk','text'),(98,7,'hi','2023-03-04 07:39:51','gialac','text'),(101,6,'https://firebasestorage.googleapis.com/v0/b/messenger-da484.appspot.com/o/image%2F305480071_612495127038661_2016148140128080453_n.jpg?alt=media&token=a857fbf9-c75e-43b4-9389-89dd06367b6b','2023-03-04 07:43:10','gialac','image'),(103,6,'https://firebasestorage.googleapis.com/v0/b/messenger-da484.appspot.com/o/image%2F284662431_3207650892840844_7063554153065724938_n%20(3).jpg?alt=media&token=082c3a74-00f9-4fff-87b7-a7d88f224dbc','2023-03-04 07:56:28','nvk','image'),(111,5,'okeeeeee','2023-03-04 08:44:48','nvk','text'),(127,14,'hi','2023-03-06 09:46:15','anhtn','text'),(131,14,'Hi','2023-03-06 09:48:09','gialac','text'),(132,12,'Oke','2023-03-06 09:48:24','nvk','text'),(133,12,'Hi','2023-03-06 09:48:26','nvk','text'),(136,14,'Hihihi','2023-03-06 09:54:37','gialac','text'),(140,14,'Hi','2023-03-06 09:58:31','gialac','text'),(141,14,'Hi','2023-03-06 09:58:33','gialac','text'),(142,14,'Helllo','2023-03-06 09:58:39','gialac','text'),(143,8,'Hu','2023-03-06 09:59:06','gialac','text'),(144,8,'Gh','2023-03-06 09:59:07','gialac','text'),(150,8,'Gi','2023-03-06 10:02:50','gialac','text'),(151,8,'Hình ','2023-03-06 10:02:55','gialac','text'),(156,8,'Hi','2023-03-06 10:10:06','gialac','text'),(159,15,'134567899','2023-03-06 10:34:41','nolan','text'),(164,15,'hi','2023-03-06 13:41:37','nvk','text'),(165,15,'okee','2023-03-06 13:41:45','nvk','text'),(168,15,'kk','2023-03-06 13:43:04','nvk','text'),(170,15,'Ok','2023-03-06 13:44:13','nolan','text'),(171,15,'okeee','2023-03-06 13:44:19','nvk','text'),(172,15,'https://firebasestorage.googleapis.com/v0/b/messenger-da484.appspot.com/o/image%2F284662431_3207650892840844_7063554153065724938_n%20(3).jpg?alt=media&token=94c4ba87-3978-4bac-9c58-49af0e54d746','2023-03-06 13:45:14','nvk','image'),(173,15,'https://firebasestorage.googleapis.com/v0/b/messenger-da484.appspot.com/o/avatar-app-chat%2Fimage%2Fnolan?alt=media&token=75557383-62ab-4f8f-aa2c-70597e1c6a84','2023-03-06 13:45:49','nolan','image'),(177,6,'Hi','2023-03-06 13:51:26','gialac','text'),(178,6,'Hi','2023-03-06 14:00:01','gialac','text'),(179,6,'ok','2023-03-06 14:00:05','nvk','text'),(180,5,'hi','2023-03-06 14:11:00','nvk','text'),(181,5,'hi\\','2023-03-06 14:11:47','nvk','text'),(182,6,'hi','2023-03-06 14:12:39','nvk','text'),(183,5,'hi','2023-03-06 14:16:48','nvk','text'),(184,5,'hi','2023-03-06 14:17:03','nvk','text'),(185,5,'Ok','2023-03-06 14:17:06','nckien','text'),(188,6,'hi','2023-03-06 14:19:18','gialac','text'),(198,5,'k,j','2023-03-06 15:39:35','nvk','text');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

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
INSERT INTO `users` VALUES ('anhtn','thẩm','ánh','$2b$08$o9NY0SXi501ogbCtHw./A.MrZr1g37ChVy/zOa/QdYaf85Kaj1AG2','n19dccn012@student.ptithcm.edu.vn','','admin',NULL,0,'https://firebasestorage.googleapis.com/v0/b/messenger-da484.appspot.com/o/avatar-app-chat%2F323426500_689717096027265_7455657298681718938_n.jpg?alt=media&token=7443fcf5-7da3-4774-980c-b4a2f16bf7c8',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFuaHRuIiwicnVsZSI6InVzZXIiLCJpYXQiOjE2NzgwOTQ2OTcsImV4cCI6MTY3ODk1ODY5N30.q-GYtweFHY8q6TVDi84pdmeFlY8_0wBpXkmILUxJx1c'),('Bin04','Trần','Tuấn','$2b$08$YzW.F9Z5beUEewx15NXI6OComK3/35zpOTvBEmvv7n/v/ZBP9IgNq','anhhhh.0404@gmail.com','','user',NULL,0,'https://firebasestorage.googleapis.com/v0/b/messenger-da484.appspot.com/o/avatar-app-chat%2Fsomi.png?alt=media&token=deb80c97-9073-4b18-90d8-6aa4b86bd120',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkJpbjA0IiwicnVsZSI6InVzZXIiLCJpYXQiOjE2NzgxMTUyNjksImV4cCI6MTY3ODk3OTI2OX0.TCEuMLhMnmNqYf7QjHjW2ZvozA80jewV4ROL2p-W5Pg'),('gialac','Nguyen Hữu','Gia Lac','$2b$08$qi10CwE/IRVMtRaxh1nhBucD4HH9vvpq3Mj2Cpfqd.d56OAm8TRN.','gialac@gmail.com','hello !!!!!','user',NULL,0,'https://firebasestorage.googleapis.com/v0/b/messenger-da484.appspot.com/o/avatar-app-chat%2Favatar-app-chat%2Fgialac?alt=media&token=fb08f72c-928c-4d40-9e5d-90172c8ada9d',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImdpYWxhYyIsInJ1bGUiOiJ1c2VyIiwiaWF0IjoxNjc5NjQ3ODg2LCJleHAiOjE2ODA1MTE4ODZ9.KJlljO0rtdsoOMi82b7tvShpUAvcg8Qww1RsAGGrFTA'),('nckien','Kien','Kien','$2b$08$s0Al/oYhrvPwG/dkRnH0luZKTX3cuvRI79x.O/HpN7YbkU/q.q66m','nvkien@mail.com','hello every','user',NULL,0,'https://dubaothoitiet.info/Uploads/images/bao-ve-thien-nhien.jpg',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im5ja2llbiIsInJ1bGUiOiJ1c2VyIiwiaWF0IjoxNjc5NjUxOTUyLCJleHAiOjE2ODA1MTU5NTJ9.L40cV2t0vkChaiFr7zHZuWbw9PKQfLQ_z1XH-6ErivE'),('nolan','Nguyễn','Sơn','$2b$08$7NvbGz9f7ohFHMayG4sYjuVV7rsRF0BbA1UU3Lg7GcVpkXTHDeT5.','trongson2k@gmail.com','','user',NULL,0,'https://firebasestorage.googleapis.com/v0/b/messenger-da484.appspot.com/o/avatar-app-chat%2Favatar-app-chat%2Fnolan?alt=media&token=ae501fe6-4e83-4d5f-8855-da1441887665',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im5vbGFuIiwicnVsZSI6InVzZXIiLCJpYXQiOjE2NzgwOTg4MzMsImV4cCI6MTY3ODk2MjgzM30.gzxS-xPY5PWQEBccD6E1w6KtVu7U6IbSYMT-s9EkBSs'),('nvk','Van','Kien','$2b$08$LR4J4j9XECtjt1uj415gVePJWB2U0VNz0U82rcHSQiIWeSwfztNwq','vankien@gmail.com','','admin',NULL,0,'https://nld.mediacdn.vn/2021/2/2/897a4903-16122387669281414921097.jpg',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im52ayIsInJ1bGUiOiJhZG1pbiIsImlhdCI6MTY3OTY1MjAxMiwiZXhwIjoxNjgwNTE2MDEyfQ.GEWU4oFLYNSw15f6G1saQ4hxKodCrvIiiIVaOMcYuxQ'),('user001','Nguyễn Văn','An','$2b$08$8oP9VxnHVVQWqFrqD.ttMOnjve2TEG4qVJYmarezgrsvSl1ylPlHW','user001@gmail.com','','user',NULL,0,'https://vtvcollege.vtv.vn/storage/galleries/thien-nhien/hinh-anh-ho-nuoc-dep-1.jpg',1,NULL),('user002','Nguyễn Văn','Bình','$2b$08$8oP9VxnHVVQWqFrqD.ttMOnjve2TEG4qVJYmarezgrsvSl1ylPlHW','user002@gmail.com',NULL,'user',NULL,0,'https://vtvcollege.vtv.vn/storage/galleries/thien-nhien/hinh-anh-ho-nuoc-dep-1.jpg',1,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `verify`
--

DROP TABLE IF EXISTS `verify`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `verify` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `uniqueString` varchar(50) NOT NULL,
  `createAt` datetime NOT NULL,
  `effectiveSeconds` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `verify`
--

LOCK TABLES `verify` WRITE;
/*!40000 ALTER TABLE `verify` DISABLE KEYS */;
/*!40000 ALTER TABLE `verify` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-02 21:50:13
