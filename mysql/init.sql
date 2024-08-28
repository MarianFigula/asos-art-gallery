CREATE DATABASE IF NOT EXISTS `pkrim-art-gallery`;
USE `pkrim-art-gallery`;

-- Create the `user` table
CREATE TABLE IF NOT EXISTS `user`
(
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `email` VARCHAR(256) NOT NULL,
    `password` VARCHAR(512) NOT NULL,
    `security_question` VARCHAR(512) NOT NULL,
    `security_answer` VARCHAR(512) NOT NULL,
    `role` VARCHAR(2) NOT NULL,
    );

-- Insert sample data into `user` table
INSERT INTO `user` (`id`, `email`, `password`, `security_question`, `security_answer`, `role`)
VALUES
    ('1', 'adminGallery@admin.com', '$2y$10$sbHuKYKYDFNPMKJ4K42tQ.SxUQy.MpLXEQNXWYHkGmlXwL1rmCnfO', 'a', 'b', 'S'), /*ZE47ZX0aCntutXiTc2NU+*/
    ('2', 'alicebobova@gmail.com', '$2y$10$sbHuKYKYDFNPMKJ4K42tQ.SxUQy.MpLXEQNXWYHkGmlXwL1rmCnfO', 'a', 'b', 'U'),/*0QkbFaa3WbyWFCLLFdAT+*/
    ('3', 'bobalicovy@gmail.com', '$2y$10$sbHuKYKYDFNPMKJ4K42tQ.SxUQy.MpLXEQNXWYHkGmlXwL1rmCnfO', 'a', 'b', 'U');/*Zgyv8tvUgZt7fGr4mQ6Q+*/

-- Create the `art` table
CREATE TABLE IF NOT EXISTS `art`
(
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT UNSIGNED NOT NULL,
    `img_src` VARCHAR(512) NOT NULL,
    `title` VARCHAR(512) NOT NULL,
    `description` VARCHAR(1024) NOT NULL,
    `price` INT NOT NULL,
    `art_creation_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

ALTER TABLE `art` ADD FOREIGN KEY (`user_id`)
    REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- Create the `review` table
CREATE TABLE IF NOT EXISTS `review`
(
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT UNSIGNED NOT NULL,
    `review_text` VARCHAR(1024) NOT NULL,
    `review_creation_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

ALTER TABLE `review` ADD FOREIGN KEY (`user_id`)
    REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- Create the `credit_card` table
CREATE TABLE IF NOT EXISTS `credit_card`
(
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT UNSIGNED NOT NULL,
    `card_number` VARCHAR(36) NOT NULL,
    `expiration_date` DATE NOT NULL,
    `cvc` INT NOT NULL,
    `card_creation_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

ALTER TABLE `credit_card` ADD FOREIGN KEY (`user_id`)
    REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
