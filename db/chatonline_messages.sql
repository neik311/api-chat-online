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
) ENGINE=InnoDB AUTO_INCREMENT=164 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1,6,'xin chào tôi là nvk','2023-01-31 08:58:18','nvk','text'),(6,7,'https://img1.kienthucvui.vn/uploads/2021/12/30/anh-thien-nhien-tuyet-dep_090101322.jpeg','2023-02-15 16:11:50','gialac','image'),(7,7,'https://img1.kienthucvui.vn/uploads/2021/12/30/anh-thien-nhien-dep-nhat_090100723.jpg','2023-02-16 13:40:21','nckien','image'),(8,7,'xin chaof okeeeeeeeeeeeeeeeeeeeeeeeeeee eeeeeeeeeeeeeeeeeeeeeeeeeeeee','2023-02-16 13:40:27','nckien','text'),(10,7,'oke','2023-02-16 13:40:38','nckien','text'),(73,7,'vfdvf','2023-03-03 13:36:53','gialac','text'),(74,7,'https://firebasestorage.googleapis.com/v0/b/messenger-da484.appspot.com/o/image%2F305480071_612495127038661_2016148140128080453_n.jpg?alt=media&token=f90dfd40-aa7f-4093-80c9-7cf63010a089','2023-03-03 13:37:03','gialac','image'),(76,5,'Ok','2023-03-03 13:54:59','nckien','text'),(77,7,'Ok','2023-03-03 13:55:06','nckien','text'),(78,7,'https://firebasestorage.googleapis.com/v0/b/messenger-da484.appspot.com/o/avatar-app-chat%2Fimage%2Fnckien?alt=media&token=b6ef0596-6b38-4677-9950-2a3a57a511af','2023-03-03 13:55:22','nckien','image'),(89,7,'hi','2023-03-03 15:11:26','gialac','text'),(95,5,'vfdvf','2023-03-04 07:26:05','nvk','text'),(98,7,'hi','2023-03-04 07:39:51','gialac','text'),(101,6,'https://firebasestorage.googleapis.com/v0/b/messenger-da484.appspot.com/o/image%2F305480071_612495127038661_2016148140128080453_n.jpg?alt=media&token=a857fbf9-c75e-43b4-9389-89dd06367b6b','2023-03-04 07:43:10','gialac','image'),(103,6,'https://firebasestorage.googleapis.com/v0/b/messenger-da484.appspot.com/o/image%2F284662431_3207650892840844_7063554153065724938_n%20(3).jpg?alt=media&token=082c3a74-00f9-4fff-87b7-a7d88f224dbc','2023-03-04 07:56:28','nvk','image'),(111,5,'okeeeeee','2023-03-04 08:44:48','nvk','text'),(127,14,'hi','2023-03-06 09:46:15','anhtn','text'),(131,14,'Hi','2023-03-06 09:48:09','gialac','text'),(132,12,'Oke','2023-03-06 09:48:24','nvk','text'),(133,12,'Hi','2023-03-06 09:48:26','nvk','text'),(134,5,'Hi','2023-03-06 09:51:21','nvk','text'),(135,5,'Hi','2023-03-06 09:51:26','nvk','text'),(136,14,'Hihihi','2023-03-06 09:54:37','gialac','text'),(137,7,'Hellobbbbhhhjjjjjjjghhhhhhhhhhhbhhjjjjjj','2023-03-06 09:57:50','gialac','text'),(138,7,'Jsjsjs','2023-03-06 09:57:57','gialac','text'),(139,7,'Jsjwj','2023-03-06 09:57:59','gialac','text'),(140,14,'Hi','2023-03-06 09:58:31','gialac','text'),(141,14,'Hi','2023-03-06 09:58:33','gialac','text'),(142,14,'Helllo','2023-03-06 09:58:39','gialac','text'),(143,8,'Hu','2023-03-06 09:59:06','gialac','text'),(144,8,'Gh','2023-03-06 09:59:07','gialac','text'),(150,8,'Gi','2023-03-06 10:02:50','gialac','text'),(151,8,'Hình ','2023-03-06 10:02:55','gialac','text'),(156,8,'Hi','2023-03-06 10:10:06','gialac','text'),(157,7,'Hi','2023-03-06 10:12:35','gialac','text'),(158,7,'Oke','2023-03-06 10:12:38','gialac','text'),(159,15,'134567899','2023-03-06 10:34:41','nolan','text'),(161,15,'Ncnc','2023-03-06 10:40:27','nolan','text'),(162,15,'sdfs','2023-03-06 10:57:08','nvk','text'),(163,15,'aca','2023-03-06 10:57:24','nvk','text');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
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
