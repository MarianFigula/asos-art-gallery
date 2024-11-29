<?php

class CartArt
{
    private $conn;
    private $table_name = "cart_art";
    private int $id;
    private int $cartId;
    private int $artId;

    public function __construct($db) { $this->conn = $db;}

    public function getId(): int
    {
        return $this->id;
    }

    public function setId(int $id): void
    {
        $this->id = $id;
    }

    public function getCartId(): int
    {
        return $this->cartId;
    }

    public function setCartId(int $cartId): void
    {
        $this->cartId = $cartId;
    }

    public function getArtId(): int
    {
        return $this->artId;
    }

    public function setArtId(int $artId): void
    {
        $this->artId = $artId;
    }


    public function getCartArtsByUserId()
    {
        $query = "SELECT * FROM " . $this->table_name . " WHERE user_id = :user_id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":user_id", $this->user_id);
        $stmt->execute();
        return $stmt;
    }

    public function createCartArt()
    {
        try {
            $query = "INSERT INTO cart_art (cart_id, art_id) 
                      VALUES (:cart_id, :art_id)";

            $stmt = $this->conn->prepare($query);

            $stmt->bindParam(":cart_id", $this->cartId);
            $stmt->bindParam("art_id", $this->artId);

            return $stmt->execute();

        }catch (Exception $e){
            throw $e;
        }
    }

    public function deleteCartArtByArtId()
    {
        $query = "DELETE FROM " . $this->table_name . " WHERE art_id = :art_id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':art_id', $this->artId);

        return $stmt->execute();

    }

    public function deleteCartArtByCartId()
    {
        $query = "DELETE FROM " . $this->table_name . " WHERE cart_id = :cart_id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':cart_id', $this->cartId);

        return $stmt->execute();
    }

    public function deleteCartArtByCartIdAndArtId()
    {
        $query = "DELETE FROM " . $this->table_name . " WHERE cart_id = :cart_id AND art_id = :art_id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':cart_id', $this->cartId);
        $stmt->bindParam(':art_id', $this->artId);

        return $stmt->execute();
    }

    /**
     * Remove all rows when the user will buy the arts
     * @param array $artIds Array of artwork IDs
     * @return void
     */
    public function clearCartArt(array $artIds): void
    {
        try {
            // Build a parameterized query with placeholders for the art IDs
            $placeholders = implode(',', array_fill(0, count($artIds), '?'));

            // Define the SQL query
            $query = "DELETE FROM " . $this->table_name . " WHERE cart_id = ? AND art_id IN ($placeholders)";

            // Prepare the statement
            $stmt = $this->conn->prepare($query);

            $stmt->bindParam(1, $this->cartId);

            // Bind the `art_id` values dynamically
            foreach ($artIds as $index => $artId) {
                $stmt->bindValue($index + 2, $artId); // Start from the second parameter
            }

            // Execute the statement
            $stmt->execute();
        } catch (Exception $e) {
            throw $e; // Rethrow the exception for error handling
        }
    }
}

