CREATE DATABASE IF NOT EXISTS `pkrim-art-gallery`;
USE `pkrim-art-gallery`;

-- Create the `user` table
CREATE TABLE IF NOT EXISTS `user`
(
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(36) NOT NULL,
    `email` VARCHAR(256) NOT NULL,
    `password` VARCHAR(512) NOT NULL,
    `security_question` VARCHAR(512) NOT NULL,
    `security_answer` VARCHAR(512) NOT NULL,
    `role` CHAR(1) NOT NULL
    );

-- Insert sample data into `user` table
INSERT INTO `user` (`id`, `username`, `email`, `password`, `security_question`, `security_answer`, `role`)
VALUES
    ('1', 'admin', 'adminGallery@admin.com', '$2y$10$sbHuKYKYDFNPMKJ4K42tQ.SxUQy.MpLXEQNXWYHkGmlXwL1rmCnfO', 'a', 'b', 'S'), /*ZE47ZX0aCntutXiTc2NU+*/
    ('2', 'alice', 'alicebobova@gmail.com', '$2y$10$sbHuKYKYDFNPMKJ4K42tQ.SxUQy.MpLXEQNXWYHkGmlXwL1rmCnfO', 'a', 'b', 'U'),/*0QkbFaa3WbyWFCLLFdAT+*/
    ('3', 'bob', 'bobalicovy@gmail.com', '$2y$10$sbHuKYKYDFNPMKJ4K42tQ.SxUQy.MpLXEQNXWYHkGmlXwL1rmCnfO', 'a', 'b', 'U');/*Zgyv8tvUgZt7fGr4mQ6Q+*/
    ('4', 'charlie', 'charliebrown@gmail.com', '$2y$10$N8dF1j5pTQvmlSLrU/3k8Q0dcLd5z9fJKSzUd3QZ9nPb8TcH6nNOe', 'a', 'b', 'U'),/*5Hjs8Tyt2WbwZgZZVfAR+*/
    ('5', 'david', 'davidsmith@gmail.com', '$2y$10$3fnTlwXGJ7MkTq5K/QP/JKQJ4bKP5sHgRmchDwQh5Dq4vUOzmfNkK', 'a', 'b', 'U');/*X7hdYlvUg7z8rJd8mS6P+*/
    ('6', 'eva', 'evajones@gmail.com', '$2y$10$Tn8jPKlJZuN6L5kdrI/XjOxG9zZbThXgLyP5xFsMkl1O3oE5DQIXy', 'a', 'b', 'U'),/*9HfkVaa4XcyWFHL9LdFT+*/
    ('7', 'frank', 'frankwilliams@gmail.com', '$2y$10$U9ldRj7qNz3dkSmXzQ/Hl1KQZRm2EPqfT3W4c7Zj9NpxnO7vBkM3A', 'a', 'b', 'U'),/*J8fkL6fUkQz4gGr9mQ5L+*/
    ('8', 'sheldon', 'sheldoncooper@gmail.com', '$2y$10$3pn9LlNvT9Pq1dNmXzJ/BzOPq7YPdErfK9zd8WTZmMkPqv8NrYMQs', 'a', 'b', 'U'),/*Bazinga123!*/
    ('9', 'george', 'georgewilson@gmail.com', '$2y$10$W9opSLvJZu3k9NmC4/DkEKOw4RMpzRdJ8ZTf9Zd6Gjk3mPbVvAXNa', 'a', 'b', 'U');/*X9fvR6cVkTq7fFr6mS4Q+*/
    ('10', 'anna', 'annakovacova@gmail.com', '$2y$10$Zj8F1p7rVlLs9nYzS/Hl9Z5eQfDkJ6Fs9Rtq0TpG9kLp5mCbLnZGK', 'a', 'b', 'U'),/*7KlfH3sLgQz5rDg7nS8A+*/
    ('11', 'betty', 'bettysmith@gmail.com', '$2y$10$U8hkWm4tNx3p8LmVY/Xj7NQ4sQkL9mXfR5bR7TxHkQp4mD9nGnMqE', 'a', 'b', 'U'),/*3FgkR9pVbWp9cTl3mQ6D+*/
    ('12', 'clara', 'claramiller@gmail.com', '$2y$10$P9qlRlMvT6Nq5kZnV/Hm7LQ3dKpJ7sKgS4qT5UwF9mPp9lCbLnFGA', 'a', 'b', 'U'),/*8FglJ8nVkWp7sHf7lS5C+*/


-- Create the `art` table
CREATE TABLE IF NOT EXISTS `art`
(
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT UNSIGNED NOT NULL,
    `img_url` VARCHAR(512) NOT NULL,
    `title` VARCHAR(512) NOT NULL,
    `description` VARCHAR(1024) NOT NULL,
    `price` INT,
    `upload_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

ALTER TABLE `art` ADD FOREIGN KEY (`user_id`)
    REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

INSERT INTO `art` (`id`,`user_id`, `img_url`, `title`, `description`, `price`, `upload_date`)
VALUES ('1', '2', '/arts/camera.png', 'Kamera', 'Toto je kamera', '20', CURRENT_TIMESTAMP());
VALUES ('2', '7', '/arts/abstract.png', 'Abstract No.45', 'A colorful abstract composition filled with organic shapes and dynamic flow.', '150', CURRENT_TIMESTAMP());
VALUES ('3', '7', '/arts/composition.png', 'Still life', 'A not so classic still life with fruit and flowers.', '56', CURRENT_TIMESTAMP());
VALUES ('4', '5', '/arts/raffael.png', 'The School of Athens', 'A Renaissance masterpiece by Raphael, depicting great philosophers.', '50000000', CURRENT_TIMESTAMP());
VALUES ('5', '10', '/arts/reflection.png', 'Reflection', 'Reflection on the water surface captured in painting.', '74', CURRENT_TIMESTAMP());
VALUES ('6', '11', '/arts/sunset.png', 'Sunset at the beach', 'Sun setting over a sandy beach, capturing the peaceful light.', '42', CURRENT_TIMESTAMP());
VALUES ('7', '4', '/arts/sunset2.png', 'Horizon', 'A minimalist landscape with a setting sun on the horizon and gentle color transitions.', '176', CURRENT_TIMESTAMP());

-- Create the `review` table
CREATE TABLE IF NOT EXISTS `review`
(
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT UNSIGNED NOT NULL,
    `art_id` INT UNSIGNED NOT NULL,
    `review_text` VARCHAR(1024) NOT NULL,
    `rating` INT NOT NULL,
    `review_creation_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

ALTER TABLE `review` ADD FOREIGN KEY (`user_id`)
    REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `review` ADD FOREIGN KEY (`art_id`)
    REFERENCES `art`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

INSERT INTO `review` (`id`, `user_id`,`art_id`, `review_text`, `rating`, `review_creation_date`)
VALUES ('1', '3', '1', 'Toto je recenzia kamery', '5', CURRENT_TIMESTAMP());


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
