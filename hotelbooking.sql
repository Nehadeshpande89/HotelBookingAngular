-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 20, 2020 at 12:44 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hotelbooking`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookingdata`
--

CREATE TABLE `bookingdata` (
  `BookingId` int(11) NOT NULL,
  `CustomerName` varchar(50) NOT NULL,
  `StartDate` date NOT NULL,
  `EndDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bookingdata`
--

INSERT INTO `bookingdata` (`BookingId`, `CustomerName`, `StartDate`, `EndDate`) VALUES
(1, 'Ms.Neha Deshpande', '2020-10-14', '2020-10-22'),
(17, 'Mr.Ganesh', '2020-11-06', '2020-11-10'),
(21, 'Shweta Das 123456', '2020-11-17', '2020-11-24'),
(22, 'Mr Vishal Talati', '2020-11-19', '2020-11-27');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookingdata`
--
ALTER TABLE `bookingdata`
  ADD PRIMARY KEY (`BookingId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookingdata`
--
ALTER TABLE `bookingdata`
  MODIFY `BookingId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
