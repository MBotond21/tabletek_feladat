-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Nov 15. 21:53
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `tabletdb`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tablets`
--

CREATE TABLE `tablets` (
  `id` int(11) NOT NULL,
  `manufacturer` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  `processor` varchar(100) NOT NULL,
  `processor_clock_speed` int(11) NOT NULL,
  `processor_cores` int(11) NOT NULL,
  `storage` int(11) NOT NULL,
  `screen_size` int(11) NOT NULL,
  `screen_resolution` varchar(50) NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `tablets`
--

INSERT INTO `tablets` (`id`, `manufacturer`, `model`, `processor`, `processor_clock_speed`, `processor_cores`, `storage`, `screen_size`, `screen_resolution`, `price`) VALUES
(1, 'Apple', 'iPad Pro', 'A12Z Bionic', 2600, 8, 128, 11, '2388x1668', 399990),
(2, 'Samsung', 'Galaxy Tab S7', 'Snapdragon 865+', 3100, 8, 256, 12, '2800x1752', 279990),
(3, 'Microsoft', 'Surface Pro 7', 'Intel Core i5-1035G4', 2400, 4, 128, 12, '2736x1824', 349990),
(4, 'Apple', 'iPad Air', 'A14 Bionic', 3000, 6, 64, 10, '2360x1640', 249990),
(5, 'Samsung', 'Galaxy Tab S6 Lite', 'Exynos 9611', 2300, 8, 64, 10, '2000x1200', 129990),
(6, 'Huawei', 'MatePad Pro', 'Kirin 990', 2900, 8, 128, 11, '2560x1600', 229990),
(7, 'Lenovo', 'Tab P11 Pro', 'Snapdragon 730G', 2200, 8, 128, 11, '2560x1600', 199990),
(8, 'Amazon', 'Fire HD 10', 'MediaTek MT8183', 2000, 8, 32, 10, '1920x1200', 59990),
(9, 'Microsoft', 'Surface Go 2', 'Intel Pentium Gold 4425Y', 1800, 2, 64, 10, '1920x1280', 209990),
(10, 'Xiaomi', 'Mi Pad 5', 'Snapdragon 860', 2960, 8, 128, 11, '2560x1600', 219990);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `tablets`
--
ALTER TABLE `tablets`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `tablets`
--
ALTER TABLE `tablets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
