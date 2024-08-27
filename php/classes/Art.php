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

    public function getTableName() {return $this->table_name;}
    public function setTableName($table_name) {
        $this->table_name = $table_name;
    }
    public function getId() { return $this->id;}
    public function setId($id) { $this->id = $id;}
    public function getUserId() { return $this->user_id;}
    public function setUserId($user_id) {$this->user_id = $user_id;}
    public function getImgSrc() { return $this->img_src;}
    public function setImgSrc($img_src) { $this->img_src = $img_src;}
    public function getTitle() {return $this->title;}
    public function setTitle($title) {$this->title = $title;}
    public function getDescription() {return $this->description;}
    public function setDescription($description) {
        $this->description = $description;
    }
    public function getPrice() {return $this->price;}
    public function setPrice($price) {$this->price = $price;}
    public function getArtCreationDate() {return $this->art_creation_date;}
    public function setArtCreationDate($art_creation_date) {
        $this->art_creation_date = $art_creation_date;
    }



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

        $stmt->execute();
        return $stmt;
    }

    public function getArtById() {
        $query = "SELECT id, user_id, img_src, title, 
                description, price, art_creation_date FROM " . $this->table_name
            .  " WHERE id = :id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $this->id);

        $stmt->execute();
        return $stmt;
    }
    public function getArtByUserId() {
        $query = "SELECT id, user_id, img_src, title, 
                description, price, art_creation_date FROM " . $this->table_name
            .  " WHERE user_id = :user_id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":user_id", $this->user_id);

        $stmt->execute();
        return $stmt;
    }

    public function deleteArtById() {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = :id";

        $stmt = $this->conn->prepare($query);

        $this->id = htmlspecialchars(strip_tags($this->id));
        $stmt->bindParam(':id', $this->id);

        return $stmt->execute();
    }
}