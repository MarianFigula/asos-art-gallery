<?php

class User {
    private $conn;
    private $table_name = "user";
    private $id;
    private $email;
    private $password;
    private $security_question;
    private $security_answer;

    public function __construct($db) { $this->conn = $db; }

    // Setters
    public function setId($id){
        $this->id = htmlspecialchars(strip_tags($id));
    }
    public function setEmail($email) {
        $this->email = htmlspecialchars(strip_tags($email));
    }

    public function setPassword($password) {
        $this->password = htmlspecialchars(strip_tags($password));
    }

    public function setSecurityQuestion($security_question) {
        $this->security_question = htmlspecialchars(strip_tags($security_question));
    }

    public function setSecurityAnswer($security_answer) {
        $this->security_answer = htmlspecialchars(strip_tags($security_answer));
    }
    public function getTableName() {return $this->table_name;}
    public function getId() {return $this->id;}
    public function getEmail() {return $this->email;}
    public function getPassword() {return $this->password;}
    public function getSecurityQuestion() {return $this->security_question;}
    public function getSecurityAnswer() {return $this->security_answer;}

    public function createUser() {
        $query = "INSERT INTO " . $this->table_name . " (email, password, security_question, security_answer)
                  VALUES (:email, :password, :security_question, :security_answer)";

        $stmt = $this->conn->prepare($query);

        // Sanitize input, TODO: unsanitize, zmenit to tak ze to dat do query
        $this->setEmail($this->email);
        $this->setPassword($this->password);
        $this->setSecurityQuestion($this->security_question);
        $this->setSecurityAnswer($this->security_answer);

        $stmt->bindParam(':email', $this->getEmail());
        $stmt->bindParam(':password', $this->getPassword());
        $stmt->bindParam(':security_question', $this->getSecurityQuestion());
        $stmt->bindParam(':security_answer', $this->getSecurityAnswer());

        return $stmt->execute();

    }

    public function getUsers()
    {
        $query = "SELECT id, email, security_question,
        security_answer FROM " . $this->table_name;

        $stmt = $this->conn->prepare($query);

        return $stmt->execute();
    }

    public function getUserById() {
        $query = "SELECT id, email, security_question,
        security_answer FROM " . $this->table_name .  " WHERE id = :id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $this->id);

        return $stmt->execute();
    }

    public function getUserByEmail() {
        $query = "SELECT id, email, security_question,
        security_answer FROM " . $this->table_name .  " WHERE email = :email";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":email", $this->email);

        return $stmt->execute();
    }

    // Update user
    public function updateUserById() {
        $query = "UPDATE " . $this->table_name . "
                  SET email = :email, password = :password, 
                  security_question = :security_question, 
                  security_answer = :security_answer
                  WHERE id = :id";

        $stmt = $this->conn->prepare($query);

        $this->setEmail($this->email);
        $this->setPassword($this->password);
        $this->setSecurityQuestion($this->security_question);
        $this->setSecurityAnswer($this->security_answer);
        $this->setId($this->id);

        $stmt->bindParam(':email', $this->getEmail());
        $stmt->bindParam(':password', $this->getPassword());
        $stmt->bindParam(':security_question', $this->getSecurityQuestion());
        $stmt->bindParam(':security_answer', $this->getSecurityAnswer());
        $stmt->bindParam(':id', $this->getId());

        return $stmt->execute();
    }
    public function deleteUserById() {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = :id";

        $stmt = $this->conn->prepare($query);

        $this->id = htmlspecialchars(strip_tags($this->id));
        $stmt->bindParam(':id', $this->id);

        return $stmt->execute();
    }
}