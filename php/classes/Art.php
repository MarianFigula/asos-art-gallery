<?php

class Art {
    private $conn;
    private $table_name = "art";
    private $id;
    private $user_id;
    private $img_src;
    private $title;
    private $description;
    private $price;
    private $art_creation_date;

    public function __construct($db) { $this->conn = $db;}

    public function createArt() {
        $this->art_creation_date = date('Y-m-d H:i:s');

        $query = "INSERT INTO " . $this->table_name . " (user_id, img_src, title, 
        description, price, art_creation_date)
                  VALUES (:user_id, :img_src, :title, :description,
                  price, art_creation_date)";

        $stmt = $this->conn->prepare($query);

        // Sanitize input, TODO: unsanitize, zmenit to tak ze to dat do query
        $this->user_id = htmlspecialchars(strip_tags($this->user_id));
        $this->img_src = htmlspecialchars(strip_tags($this->img_src));
        $this->title = htmlspecialchars(strip_tags($this->title));
        $this->description = htmlspecialchars(strip_tags($this->description));
        $this->price = htmlspecialchars(strip_tags($this->price));
        $this->art_creation_date = htmlspecialchars(strip_tags($this->art_creation_date));

        $stmt->bindParam(":user_id", $this->user_id);
        $stmt->bindParam(":img_src", $this->img_src);
        $stmt->bindParam(":title", $this->title);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":price", $this->price);
        $stmt->bindParam(":art_creation_date", $this->art_creation_date);

        return $stmt->execute();

    }

    public function getArts() {
        $query = "SELECT id, user_id, img_src, title, 
                description, price, art_creation_date FROM " . $this->table_name;

        $stmt = $this->conn->prepare($query);

        return $stmt->execute();
    }

    public function getArtById() {
        $query = "SELECT id, user_id, img_src, title, 
                description, price, art_creation_date FROM " . $this->table_name
            .  " WHERE id = :id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $this->id);

        return $stmt->execute();
    }
    public function getArtByUserId() {
        $query = "SELECT id, user_id, img_src, title, 
                description, price, art_creation_date FROM " . $this->table_name
            .  " WHERE user_id = :user_id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":user_id", $this->user_id);

        return $stmt->execute();
    }

    public function deleteArtById() {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = :id";

        $stmt = $this->conn->prepare($query);

        $this->id = htmlspecialchars(strip_tags($this->id));
        $stmt->bindParam(':id', $this->id);

        return $stmt->execute();
    }
}