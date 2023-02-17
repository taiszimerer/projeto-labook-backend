-- Active: 1673874119312@@127.0.0.1@3306
 CREATE TABLE 
users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

INSERT INTO users (id, name, email, password, role)
VALUES
	("u001", "Margarida", "margarida@email.com", "margarida123", "role"),
	("u002", "Jose", "jose@email.com", "jose123", "role"),
	("u003", "Carol", "carolzinha@email.com", "carol123", "role");

DROP TABLE users;

CREATE TABLE 
posts (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER NOT NULL,
    dislikes INTEGER NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    updated_at TEXT DEFAULT (DATETIME()) NOT NULL, 
    FOREIGN KEY (creator_id) REFERENCES users (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

INSERT INTO posts (id, creator_id, content, likes, dislikes)
VALUES
	("p001", "u001", "Bom dia de sol!!", 1, 2),
	("p002", "u002", "Sextou em!", 3, 0),
	("p003", "u003", "Hoje ninguem vai estragar meu dia :D", 1, 0);

DROP TABLE posts;

CREATE TABLE 
likes_dislikes (
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,   
    FOREIGN KEY (post_id) REFERENCES posts (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

INSERT INTO likes_dislikes (user_id, post_id, like)
VALUES
    ("u001", "p002", 1),
    ("u002", "p001", 1), 
    ("u003", "p002", 1);

DROP TABLE likes_dislikes;

SELECT * FROM likes_dislikes;
SELECT * FROM users;
SELECT 
    posts.id,
    posts.creator_id,
    posts.content,
    posts.likes,
    posts.dislikes,
    posts.created_at,
    posts.updated_at,
    users.name AS creator_name
 FROM posts
JOIN users 
ON posts.creator_id = users.id

