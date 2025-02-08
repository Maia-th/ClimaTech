-- MySQL dump 10.13  Distrib 8.0.41, for Linux (x86_64)
--
-- Host: localhost    Database: ClimaTech
-- ------------------------------------------------------
-- Server version	8.0.41-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Inscricoes`
--

DROP TABLE IF EXISTS `Inscricoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Inscricoes` (
  `idInscricao` int NOT NULL AUTO_INCREMENT COMMENT 'ID da inscrição.',
  `email` varchar(100) NOT NULL COMMENT 'E-mail do inscrito.',
  `data_cadastro` date NOT NULL COMMENT 'Data de inscrição.',
  PRIMARY KEY (`idInscricao`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Inscricoes`
--

LOCK TABLES `Inscricoes` WRITE;
/*!40000 ALTER TABLE `Inscricoes` DISABLE KEYS */;
/*!40000 ALTER TABLE `Inscricoes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Mensagens`
--

DROP TABLE IF EXISTS `Mensagens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Mensagens` (
  `idMensagem` int NOT NULL AUTO_INCREMENT COMMENT 'ID da mensagem.',
  `name` varchar(45) NOT NULL COMMENT 'Nome do remetente.',
  `email` varchar(100) NOT NULL COMMENT 'E-mail do remetente.',
  `mensagem` longtext NOT NULL COMMENT 'Conteúdo da mensagem.',
  `status` tinyint(1) NOT NULL COMMENT 'Status: 1 = lida, 0 = não lida.',
  `user_id` int NOT NULL,
  PRIMARY KEY (`idMensagem`),
  KEY `fk_Mensagens_Usuarios_idx` (`user_id`),
  CONSTRAINT `fk_Mensagens_Usuarios` FOREIGN KEY (`user_id`) REFERENCES `Usuarios` (`idUsers`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Mensagens`
--

LOCK TABLES `Mensagens` WRITE;
/*!40000 ALTER TABLE `Mensagens` DISABLE KEYS */;
/*!40000 ALTER TABLE `Mensagens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Promocoes`
--

DROP TABLE IF EXISTS `Promocoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Promocoes` (
  `idPromocao` int NOT NULL AUTO_INCREMENT COMMENT 'ID da promoção.',
  `data_validade` date NOT NULL COMMENT 'Data limite da promoção.',
  `titulo` varchar(45) NOT NULL COMMENT 'Título da promoção.',
  `descricao` longtext NOT NULL COMMENT 'Descrição da promoção.',
  `status` enum('ativa','suspensa') NOT NULL COMMENT 'Status da promoção.',
  `valor` decimal(10,2) NOT NULL COMMENT 'Valor da promoção.',
  `condicoes` mediumtext NOT NULL COMMENT 'Condições da promoção.',
  `user_id` int NOT NULL,
  PRIMARY KEY (`idPromocao`),
  KEY `fk_Promocoes_Usuarios_idx` (`user_id`),
  CONSTRAINT `fk_Promocoes_Usuarios` FOREIGN KEY (`user_id`) REFERENCES `Usuarios` (`idUsers`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Promocoes`
--

LOCK TABLES `Promocoes` WRITE;
/*!40000 ALTER TABLE `Promocoes` DISABLE KEYS */;
/*!40000 ALTER TABLE `Promocoes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Usuarios`
--

DROP TABLE IF EXISTS `Usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Usuarios` (
  `idUsers` int NOT NULL AUTO_INCREMENT COMMENT 'ID do usuário.',
  `name` varchar(45) NOT NULL COMMENT 'Nome completo do usuário.',
  `email` varchar(100) NOT NULL COMMENT 'E-mail do usuário para login.',
  `password` varchar(16) NOT NULL COMMENT 'Senha do usuário, limitada a 16 caracteres.',
  `access` enum('root','padrao') NOT NULL COMMENT 'Nível de acesso do usuário.',
  PRIMARY KEY (`idUsers`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Usuarios`
--

LOCK TABLES `Usuarios` WRITE;
/*!40000 ALTER TABLE `Usuarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `Usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-07 22:30:18
