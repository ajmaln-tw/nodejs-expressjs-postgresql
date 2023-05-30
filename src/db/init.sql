CREATE TABLE Users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  password VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  age INT,
 status BOOLEAN DEFAULT true
);

INSERT INTO Users(name, email, password, age)
VALUES ('John Doe', 'john.doe@example.com', "123", 25),
       ('Jane Smith', 'jane.smith@example.com', "123", 30),
      ('Ajmal Nasumdeen', 'ajmal.n@test.com', "123", 20),
       ('Mike Johnson', 'mike.johnson@example.com', "123", 35);
