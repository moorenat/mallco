-- MariaDB dump 10.18  Distrib 10.4.17-MariaDB, for Linux (x86_64)
--
-- Host: classmysql.engr.oregonstate.edu    Database: cs340_moorenat
-- ------------------------------------------------------
-- Server version	10.4.18-MariaDB-log
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
--
-- Table structure for table `Items`
--
DROP TABLE IF EXISTS `Items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Items` (
  `item_id` int(11) NOT NULL AUTO_INCREMENT,
  `quantity` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `price` decimal(10, 2) NOT NULL,
  PRIMARY KEY (`item_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
--
-- Dumping data for table `Items`
--
LOCK TABLES `Items` WRITE;
/*!40000 ALTER TABLE `Items` DISABLE KEYS */;
INSERT INTO
  `Items`
VALUES
  (1, 10, 'PS5', 450.00),(2, 12, 'Nintendo Switch', 300.00),(3, 21, 'Black Eyeliner', 4.50),(4, 13, 'Shock Rings', 11.50),(5, 34, 'Flip Flops', 15.00);
  /*!40000 ALTER TABLE `Items` ENABLE KEYS */;
UNLOCK TABLES;
--
  -- Table structure for table `Stores`
  --
  DROP TABLE IF EXISTS `Stores`;
  /*!40101 SET @saved_cs_client     = @@character_set_client */;
  /*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Stores` (
    `store_id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(45) NOT NULL,
    PRIMARY KEY (`store_id`)
  ) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8;
  /*!40101 SET character_set_client = @saved_cs_client */;
--
  -- Dumping data for table `Stores`
  --
  LOCK TABLES `Stores` WRITE;
  /*!40000 ALTER TABLE `Stores` DISABLE KEYS */;
INSERT INTO
  `Stores`
VALUES
  (1, 'Gamestop'),(2, 'Gap'),(3, 'Hot Topic'),(4, 'Spencers');
  /*!40000 ALTER TABLE `Stores` ENABLE KEYS */;
UNLOCK TABLES;
--
  -- Table structure for table `Employees`
  --
  DROP TABLE IF EXISTS `Employees`;
  /*!40101 SET @saved_cs_client     = @@character_set_client */;
  /*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Employees` (
    `employee_id` int(11) NOT NULL AUTO_INCREMENT,
    `first_name` varchar(45) NOT NULL,
    `last_name` varchar(45) NOT NULL,
    `store_id` int(11) NOT NULL,
    PRIMARY KEY (`employee_id`),
    KEY `fk_e_store_id` (`store_id`),
    CONSTRAINT `fk_e_store_id` FOREIGN KEY (`store_id`) REFERENCES `Stores` (`store_id`) ON DELETE CASCADE ON UPDATE CASCADE
  ) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8;
  /*!40101 SET character_set_client = @saved_cs_client */;
--
  -- Dumping data for table `Employees`
  --
  LOCK TABLES `Employees` WRITE;
  /*!40000 ALTER TABLE `Employees` DISABLE KEYS */;
INSERT INTO
  `Employees`
VALUES
  (1, 'James', 'Massey', 1),(2, 'Josh', 'Kimler', 2),(3, 'Whitney', 'Wash', 1),(4, 'Jerry', 'Jones', 3);
  /*!40000 ALTER TABLE `Employees` ENABLE KEYS */;
UNLOCK TABLES;
--
  -- Table structure for table `Transactions`
  --
  DROP TABLE IF EXISTS `Transactions`;
  /*!40101 SET @saved_cs_client     = @@character_set_client */;
  /*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Transactions` (
    `transaction_id` int(11) NOT NULL AUTO_INCREMENT,
    `date` date NOT NULL,
    `total` decimal(10, 2),
    `employee_id` int(11) NOT NULL,
    `store_id` int(11) NOT NULL,
    PRIMARY KEY (`transaction_id`),
    KEY `fk_transaction_employee_id` (`employee_id`),
    KEY `fk_transaction_stores` (`store_id`),
    CONSTRAINT `fk_transaction_employee_id` FOREIGN KEY (`employee_id`) REFERENCES `Employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `fk_t_stores` FOREIGN KEY (`store_id`) REFERENCES `Stores` (`store_id`) ON DELETE CASCADE ON UPDATE CASCADE
  ) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8;
  /*!40101 SET character_set_client = @saved_cs_client */;
--
  -- Dumping data for table `Transactions`
  --
  LOCK TABLES `Transactions` WRITE;
  /*!40000 ALTER TABLE `Transactions` DISABLE KEYS */;
INSERT INTO
  `Transactions`
VALUES
  (1, '2021-05-01', 750.00, 1, 1),(2, '2020-12-25', 16.00, 4, 3),(3, '2021-01-01', 15.00, 2, 2);
  /*!40000 ALTER TABLE `Transactions` ENABLE KEYS */;
UNLOCK TABLES;
  /*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
  /*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
  /*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
  /*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
  /*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
  /*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
  /*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
  /*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
--
  -- Table structure for table `Transaction_Items`
  --
  DROP TABLE IF EXISTS `Transaction_Items`;
  /*!40101 SET @saved_cs_client     = @@character_set_client */;
  /*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Transaction_Items` (
    `item_id` int(11) NOT NULL,
    `transaction_id` int(11) NOT NULL,
    PRIMARY KEY (`item_id`, `transaction_id`),
    KEY `fk_ti_transaction_id` (`transaction_id`),
    CONSTRAINT `fk_ti_item_id` FOREIGN KEY (`item_id`) REFERENCES `Items` (`item_id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `fk_ti_transaction_id` FOREIGN KEY (`transaction_id`) REFERENCES `Transactions` (`transaction_id`) ON DELETE CASCADE ON UPDATE CASCADE
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8;
  /*!40101 SET character_set_client = @saved_cs_client */;
--
  -- Dumping data for table `Transaction_Items`
  --
  LOCK TABLES `Transaction_Items` WRITE;
  /*!40000 ALTER TABLE `Transaction_Items` DISABLE KEYS */;
INSERT INTO
  `Transaction_Items`
VALUES
  (1, 1),(2, 1),(3, 2),(4, 2),(5, 3);
  /*!40000 ALTER TABLE `Transaction_Items` ENABLE KEYS */;
UNLOCK TABLES;
--
  -- Table structure for table `Store_Item`
  --
  DROP TABLE IF EXISTS `Store_Items`;
  /*!40101 SET @saved_cs_client     = @@character_set_client */;
  /*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Store_Items` (
    `store_id` int(11) NOT NULL,
    `item_id` int(11) NOT NULL,
    PRIMARY KEY (`store_id`, `item_id`),
    KEY `fk_si_item_id` (`item_id`),
    CONSTRAINT `fk_si_item_id` FOREIGN KEY (`item_id`) REFERENCES `Items` (`item_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `fk_si_store_id` FOREIGN KEY (`store_id`) REFERENCES `Stores` (`store_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8;
  /*!40101 SET character_set_client = @saved_cs_client */;
--
  -- Dumping data for table `Store_Item`
  --
  LOCK TABLES `Store_Items` WRITE;
  /*!40000 ALTER TABLE `Store_Items` DISABLE KEYS */;
INSERT INTO
  `Store_Items`
VALUES
  (1, 1),(1, 2),(2, 5),(3, 3),(3, 4);
  /*!40000 ALTER TABLE `Store_Items` ENABLE KEYS */;
UNLOCK TABLES;
-- Dump completed on 2021-05-14  0:27:39