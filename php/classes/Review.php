<?php

class Review {
    private $conn;
    private $table_name = "review";
    private $id;
    private $user_id;
    private $review_text;
    private $review_creation_date;
    public function getTableName() {return $this->table_name;}
    public function setTableName($table_name) {
        $this->table_name = $table_name;
    }
    public function getId() {return $this->id;}
    public function setId($id) {$this->id = $id;}
    public function getUserId() {return $this->user_id;}
    public function setUserId($user_id) {$this->user_id = $user_id;}
    public function getReviewText() {return $this->review_text;}
    public function setReviewText($review_text){
        $this->review_text = $review_text;
    }
    public function getReviewCreationDate(){
        return $this->review_creation_date;
    }
    public function setReviewCreationDate($review_creation_date) {
        $this->review_creation_date = $review_creation_date;
    }
    public function __construct($db) { $this->conn = $db;}

    public function createReview() {
        $this->review_creation_date = date('Y-m-d H:i:s');

        $query = "INSERT INTO " . $this->table_name . " (user_id, review_text,
         review_creation_date)
                  VALUES (:user_id, :review_text, :review_creation_date)";

        $stmt = $this->conn->prepare($query);

        // Sanitize input, TODO: unsanitize, zmenit to tak ze to dat do query
        $this->user_id = htmlspecialchars(strip_tags($this->user_id));
        $this->review_text = htmlspecialchars(strip_tags($this->review_text));
        $this->review_creation_date =
            htmlspecialchars(strip_tags($this->review_creation_date));

        $stmt->bindParam(":user_id", $this->user_id);
        $stmt->bindParam(":review_text", $this->review_text);
        $stmt->bindParam(":review_creation_date", $this->review_creation_date);

        return $stmt->execute();

    }

    public function getReviews() {
        $query = "SELECT id, user_id, review_text, review_creation_date
                FROM " . $this->table_name;

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $this->id);

        return $stmt->execute();
    }

    public function getReviewById(){
        $query = "SELECT id, user_id, review_text, review_creation_date
                FROM " . $this->table_name .  " WHERE id = :id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":user_id", $this->user_id);

        return $stmt->execute();
    }

    public function getReviewByUserId() {
        $query = "SELECT id, user_id, review_text, review_creation_date
                FROM " . $this->table_name . " WHERE user_id = :user_id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":user_id", $this->user_id);

        return $stmt->execute();
    }

    public function deleteReviewById() {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = :id";

        $stmt = $this->conn->prepare($query);

        $this->id = htmlspecialchars(strip_tags($this->id));
        $stmt->bindParam(':id', $this->id);

        return $stmt->execute();
    }
}