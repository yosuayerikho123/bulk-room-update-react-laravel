-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 15, 2021 at 06:22 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 7.4.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bulk_update`
--

-- --------------------------------------------------------

--
-- Table structure for table `custom_dates`
--

CREATE TABLE `custom_dates` (
  `id` bigint(255) UNSIGNED NOT NULL,
  `rooms_id` bigint(255) UNSIGNED DEFAULT NULL,
  `dates` date NOT NULL,
  `price` bigint(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `custom_dates`
--

INSERT INTO `custom_dates` (`id`, `rooms_id`, `dates`, `price`) VALUES
(220, 3, '2021-05-15', 5),
(221, 3, '2021-05-16', 5),
(228, 3, '2021-05-21', 3),
(229, 3, '2021-05-22', 3),
(230, 3, '2021-05-17', 10),
(231, 3, '2021-05-18', 10),
(232, 3, '2021-05-19', 10),
(233, 3, '2021-05-20', 10),
(236, 1, '2021-05-21', 90),
(237, 1, '2021-05-22', 90),
(238, 1, '2021-05-23', 90),
(239, 1, '2021-05-24', 90),
(240, 1, '2021-05-25', 90),
(241, 1, '2021-05-17', 30),
(242, 1, '2021-05-18', 30),
(243, 1, '2021-05-19', 30),
(244, 1, '2021-05-20', 30),
(252, 2, '2021-05-18', 18),
(253, 2, '2021-05-19', 18),
(254, 2, '2021-05-20', 18),
(255, 2, '2021-05-21', 18),
(256, 2, '2021-05-22', 18),
(257, 2, '2021-05-23', 18),
(258, 2, '2021-05-24', 18),
(268, 3, '2021-06-15', 4),
(269, 3, '2021-06-16', 4),
(270, 3, '2021-06-17', 4),
(271, 3, '2021-06-18', 4),
(272, 3, '2021-06-19', 4),
(273, 3, '2021-06-20', 4),
(274, 3, '2021-06-21', 4),
(277, 2, '2021-06-09', 4),
(283, 2, '2021-06-15', 4),
(284, 2, '2021-06-16', 4),
(285, 2, '2021-06-17', 4),
(286, 2, '2021-06-18', 4),
(287, 2, '2021-06-10', 1),
(288, 2, '2021-06-11', 1),
(289, 2, '2021-06-12', 1),
(290, 2, '2021-06-13', 1),
(291, 2, '2021-06-14', 1),
(292, 3, '2021-06-22', 10),
(293, 3, '2021-06-23', 10),
(294, 3, '2021-06-24', 10),
(295, 3, '2021-06-25', 10),
(296, 3, '2021-06-26', 10),
(297, 3, '2021-07-25', 654),
(298, 3, '2021-07-26', 654),
(299, 3, '2021-07-27', 654),
(300, 3, '2021-07-28', 654),
(301, 3, '2021-07-29', 654),
(302, 3, '2021-07-30', 654),
(303, 3, '2021-07-31', 654);

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `id` bigint(255) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` bigint(255) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`id`, `name`, `price`) VALUES
(1, 'Luxury', 400),
(2, 'Deluxe', 200),
(3, 'Standar', 700),
(5, 'Double', 10);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `custom_dates`
--
ALTER TABLE `custom_dates`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rooms_id` (`rooms_id`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `custom_dates`
--
ALTER TABLE `custom_dates`
  MODIFY `id` bigint(255) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=304;

--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` bigint(255) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `custom_dates`
--
ALTER TABLE `custom_dates`
  ADD CONSTRAINT `custom_dates_ibfk_1` FOREIGN KEY (`rooms_id`) REFERENCES `rooms` (`id`) ON DELETE SET NULL ON UPDATE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
