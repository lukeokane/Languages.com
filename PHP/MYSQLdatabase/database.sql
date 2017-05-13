-- phpMyAdmin SQL Dump
-- version 4.0.10.18
-- https://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: Apr 13, 2017 at 09:44 AM
-- Server version: 10.1.22-MariaDB
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `database_name`
--

-- --------------------------------------------------------

--
-- Table structure for table `active_users`
--

CREATE TABLE IF NOT EXISTS `active_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `sess_id` longtext NOT NULL,
  `bought` tinyint(1) NOT NULL,
  `expiry` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=75 ;

--
-- Dumping data for table `active_users`
--

INSERT INTO `active_users` (`id`, `user_id`, `sess_id`, `bought`, `expiry`) VALUES
(0, 0, 'ERROR', 0, NULL),
(20, 23, 'ql8kf3ect1ii3p4mhmjmh21vs5', 1, NULL),
(58, 118, '0bmn7egttq4fbrmpm4h7f3d4u7', 1, NULL),
(74, 118, 'e7lhf0uf64lkf4597ovmt00065', 1, NULL),
(71, 121, 'q7vsfh17vsom8eht6m17g1a4u7', 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `languages`
--

CREATE TABLE IF NOT EXISTS `languages` (
  `cID` int(11) NOT NULL AUTO_INCREMENT,
  `cName` varchar(30) NOT NULL,
  `cPrice` decimal(10,2) NOT NULL,
  `cSmallDesc` varchar(90) NOT NULL,
  `cFullDesc` varchar(200) NOT NULL,
  `image` varchar(30) NOT NULL,
  PRIMARY KEY (`cID`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `languages`
--

INSERT INTO `languages` (`cID`, `cName`, `cPrice`, `cSmallDesc`, `cFullDesc`, `image`) VALUES
(1, 'English2', '59.00', 'Beginners course to English. This includes common words, verbs and adjectives.    ', ' This guide introduces anyone who is new to the English language and teaches the basics of it.    ', 'english.png'),
(2, 'French         ', '49.99', 'This course is for new learners to the French language.          ', 'The course is composed of learning the most common French words used on a daily basis, most used verbs and adjectives to begin constructing sentences.       ', 'french.png');

-- --------------------------------------------------------

--
-- Table structure for table `lessons`
--

CREATE TABLE IF NOT EXISTS `lessons` (
  `lesson_id` int(3) NOT NULL,
  `course_id` int(3) NOT NULL,
  `lesson_desc` varchar(50) NOT NULL,
  PRIMARY KEY (`lesson_id`,`course_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `lessons`
--

INSERT INTO `lessons` (`lesson_id`, `course_id`, `lesson_desc`) VALUES
(1, 1, 'English Lesson 1'),
(1, 2, 'French Lesson 1'),
(2, 2, 'French Lesson 2'),
(3, 2, 'French Lesson 3'),
(2, 1, 'English Lesson 2'),
(3, 1, 'English Lesson 3');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(10) NOT NULL AUTO_INCREMENT,
  `username` varchar(15) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(80) NOT NULL,
  `join_date` date NOT NULL,
  `u_permission` int(4) NOT NULL,
  `image_name` varchar(50) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=122 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password`, `join_date`, `u_permission`, `image_name`) VALUES
(23, 'Luke', 'luke@gmail.com', '$2y$12$x.PigR2aBAzHXDgO3Liraelhy2UCi88lM5ct/UojqxWM03Sk5k1YW', '2016-12-09', 1337, '0'),
(24, 'CollinDev', 'cadams@premierleague.com', '$2y$12$sQtVF6sEkOyWemvQ8J6vAOFb3z/wteB11/mbuj127SZbXeZhwH326', '2016-11-09', 1337, '0'),
(25, 'DEVACC', 'guestacc@premierleague.com', '$2y$12$GztwCr5OEM69hN2xH0zdGOzJPy7hSU/DImwwNQdlr9Gk7q8JaCsF6', '2016-12-10', 1337, '0'),
(26, 'DamianCEO', 'Damian@premierleague.com', '$2y$12$XvxRa2atcXWY8XpSpp/Z4eBH7V2UqS6/WiifhKHaamFrgZ.het1qu', '2015-11-10', 1337, '0'),
(27, 'ChrisCOO', 'chris@premierleague.com', '$2y$12$TaV5nS6H2q3z.8Ds.3hD1Op9FuBfdZFD8HGiu9L357cWGqz.lSMdu', '2015-11-10', 1337, '0'),
(118, 'LukeOKane', 'lukek@gmail.com', '$2y$12$qiTw0IIwfKfuzRSqT6XFX.E.e4bj91eZQf96Wsgy8QYGh1Gb7O40S', '2017-03-09', 0, ''),
(120, 'JohnDoe', 'Jd@gmail.com', '$2y$12$2tw9PLFNTDipm5giSeRPOOEDi1.84ynP4HcTb7PFeVIpKLBxCqVqS', '2017-03-13', 0, ''),
(121, 'Derek@gmail.com', 'Derek2@gmail.com', '$2y$12$ilCd35ffR9NuZzKzJmwgIOpT1OPTNz8c86Y2jwZuybUiWBOsm9lS6', '2017-03-13', 0, '');

-- --------------------------------------------------------

--
-- Table structure for table `user_courses`
--

CREATE TABLE IF NOT EXISTS `user_courses` (
  `user_id` int(11) NOT NULL,
  `course_id` varchar(3) NOT NULL,
  `current_lesson` varchar(3) NOT NULL,
  `current_user_sess_id` varchar(100) DEFAULT NULL,
  `expiry` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`,`course_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_courses`
--

INSERT INTO `user_courses` (`user_id`, `course_id`, `current_lesson`, `current_user_sess_id`, `expiry`) VALUES
(23, '1', '3', NULL, NULL),
(23, '2', '2', NULL, NULL),
(115, '1', '0', NULL, NULL),
(115, '2', '1', NULL, NULL),
(114, '1', '0', NULL, NULL),
(116, '1', '2', NULL, NULL),
(116, '2', '0', NULL, NULL),
(118, '1', '1', NULL, NULL),
(118, '2', '0', NULL, NULL),
(120, '1', '0', NULL, NULL),
(121, '2', '2', NULL, NULL);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
