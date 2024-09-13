<?php

class User {
    private $conn;
    private $table_name = "user";
    private $id;
    private $username;
    private $email;
    private $password;
    private $security_question;
    private $security_answer;
    private $role;

    public function __construct($db) { $this->conn = $db; }

    // Setters
    public function setId($id){
        $this->id = htmlspecialchars(strip_tags($id));
    }
    public function setEmail($email) {
        $this->email = htmlspecialchars(strip_tags($email));
    }
    public function setUsername($username) { $this->username = htmlspecialchars(strip_tags($username)); }

    public function setPassword($password) {
        $this->password = htmlspecialchars(strip_tags($password));
    }

    public function setSecurityQuestion($security_question) {
        $this->security_question = htmlspecialchars(strip_tags($security_question));
    }

    public function setSecurityAnswer($security_answer) {
        $this->security_answer = htmlspecialchars(strip_tags($security_answer));
    }

    public function getRole(){return $this->role;}

    public function setRole($role){$this->role = $role;}
    public function getTableName() {return $this->table_name;}
    public function getId() {return $this->id;}

    public function getUsername(){return $this->username;}
    public function getEmail() {return $this->email;}
    public function getPassword() {return $this->password;}
    public function getSecurityQuestion() {return $this->security_question;}
    public function getSecurityAnswer() {return $this->security_answer;}

    public function createUser() {
        $query = "INSERT INTO " . $this->table_name . " (email, username, password, security_question, security_answer)
                  VALUES (:email,:username, :password, :security_question, :security_answer)";

        $stmt = $this->conn->prepare($query);

        // Sanitize input, TODO: unsanitize, zmenit to tak ze to dat do query
        $this->setEmail($this->email);
        $this->setUsername($this->username);
        $this->setPassword($this->password);
        $this->setSecurityQuestion($this->security_question);
        $this->setSecurityAnswer($this->security_answer);

        $stmt->bindParam(':email', $this->getEmail());
        $stmt->bindParam(':password', $this->getPassword());
        $stmt->bindParam(':username', $this->getUsername());
        $stmt->bindParam(':security_question', $this->getSecurityQuestion());
        $stmt->bindParam(':security_answer', $this->getSecurityAnswer());

        return $stmt->execute();

    }

    public function getUsers()
    {
        $query = "SELECT id, username, email, security_question,
        security_answer FROM " . $this->table_name;

        $stmt = $this->conn->prepare($query);

        $stmt->execute();
        return $stmt;
    }

    public function getUserById() {
        $query = "SELECT id, username, email, password, security_question,
        security_answer FROM " . $this->table_name .  " WHERE id = :id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $this->id);

        $stmt->execute();
        return $stmt;
    }

    public function getUserByEmail() {
        $query = "SELECT id, username, email, password, security_question,
        security_answer FROM " . $this->table_name .  " WHERE email = :email";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":email", $this->email);

        $stmt->execute();
        return $stmt;
    }

    // Update user, mozno pridate do query toto:
    /*
     security_question = :security_question,
     security_answer = :security_answer
     */
    public function updateUserById() {
        $query = "UPDATE " . $this->table_name . "
                  SET email = :email,
                  username = :username
                  WHERE id = :id";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':email', $this->getEmail());
        $stmt->bindParam(':username', $this->getUsername());
        $stmt->bindParam(':id', $this->getId());

        $stmt->execute();
        return $stmt;
    }

    public function renewUserPassword() {
        $query = "UPDATE " . $this->table_name . "
                  SET password = :password
                  WHERE id = :id";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':password', $this->getPassword());
        $stmt->bindParam(':id', $this->getId());

        $stmt->execute();
        return $stmt;
    }

    public function deleteUserById() {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = :id";

        $stmt = $this->conn->prepare($query);

        $this->id = htmlspecialchars(strip_tags($this->id));
        $stmt->bindParam(':id', $this->id);

        return $stmt->execute();
    }

    public function deleteUsersByIds($ids) {
        $placeholders = implode(',', array_fill(0, count($ids), '?'));

        $query = "DELETE FROM " . $this->table_name . " WHERE id IN ($placeholders)";

        $stmt = $this->conn->prepare($query);

        foreach ($ids as $index => $id) {
            $stmt->bindValue($index + 1, htmlspecialchars(strip_tags($id)), PDO::PARAM_INT);
        }

        return $stmt->execute();
    }
}