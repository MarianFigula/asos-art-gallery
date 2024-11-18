<?php

class Cart {

    private $conn;
    private $table_name = "cart";
    private $id;
    private $user_id;
    public function __construct($db) { $this->conn = $db;}

    public function getTableName(): string
    {
        return $this->table_name;
    }
    public function setTableName(string $table_name): void
    {
        $this->table_name = $table_name;
    }
    public function getId()
    {
        return $this->id;
    }
    public function setId($id): void
    {
        $this->id = $id;
    }
    public function getUserId()
    {
        return $this->user_id;
    }
    public function setUserId($user_id): void
    {
        $this->user_id = $user_id;
    }

    public function createCart($artIds) {
        $this->conn->beginTransaction();

        try {
            $query = "INSERT INTO " . $this->table_name . " (user_id) VALUES (:user_id)";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':user_id', $this->user_id);

            if (!$stmt->execute()) {
                $this->conn->rollBack();
                return false;
            }

            $cartId = $this->conn->lastInsertId();

            $query = "INSERT INTO cart_art (cart_id, art_id) VALUES (:cart_id, :art_id)";
            $stmt = $this->conn->prepare($query);

            foreach ($artIds as $artId) {
                $stmt->bindParam(':cart_id', $cartId);
                $stmt->bindParam(':art_id', $artId);

                if (!$stmt->execute()) {
                    $this->conn->rollBack();
                    return false;
                }
            }

            $this->conn->commit();
            return true;
        } catch (Exception $e) {
            $this->conn->rollBack();
            return false;
        }
    }


    public function getCartById(){

        $query = "SELECT b.* 
              FROM " . $this->table_name . " AS c
              JOIN cart_art AS cb ON c.id = cb.cart_id
              JOIN art AS b ON cb.art_id = b.id
              WHERE c.id = :id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $this->id);

        $stmt->execute();
        return $stmt;
    }

    public function updateCartById($newArtIds) {
        $sanitizedArtIds = array_map('intval', $newArtIds);

        if (empty($sanitizedArtIds)) {
            return false;
        }

//        $deleteQuery = "DELETE FROM cart_art WHERE cart_id = :cart_id";

//        $stmt = $this->conn->prepare($deleteQuery);
//        $stmt->bindParam(':cart_id', $this->id);
//
//        if (!$stmt->execute()) {
//            return false;
//        }

        $insertQuery = "INSERT INTO cart_art (cart_id, art_id) VALUES (:cart_id, :art_id)";

        $stmt = $this->conn->prepare($insertQuery);
        $stmt->bindParam(':cart_id', $this->id);

        foreach ($sanitizedArtIds as $art_id) {
            $stmt->bindParam(':art_id', $art_id);
            if (!$stmt->execute()) {
                return false;
            }
        }

        return true;
    }

    public function deleteCartById() {
        $this->conn->beginTransaction();

        try {
            $query = "DELETE FROM cart_art WHERE cart_id = :cart_id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':cart_id', $this->id);

            if (!$stmt->execute()) {
                $this->conn->rollBack();
                return false;
            }

            $query = "DELETE FROM " . $this->table_name . " WHERE id = :id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':id', $this->id);

            if (!$stmt->execute()) {
                $this->conn->rollBack();
                return false;
            }

            $this->conn->commit();
            return true;
        } catch (Exception $e) {
            $this->conn->rollBack();
            return false;
        }
    }




}