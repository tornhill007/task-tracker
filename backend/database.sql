CREATE
DATABASE taskTracker;

CREATE TABLE projectsList
(
    projectId SERIAL PRIMARY KEY,
        name      VARCHAR(255),
        createdAt timestamp with time zone,
        updatedAt timestamp with time zone
)

CREATE TABLE usersProjects
(
    id SERIAL PRIMARY KEY,
    projectId NUMERIC,
    userId  NUMERIC

)



CREATE TABLE kanbancolumns
(
    columnId      SERIAL PRIMARY KEY,
    projectId NUMERIC,
    name          VARCHAR(255),
    position NUMERIC
)

CREATE TABLE users
(
    userId   SERIAL PRIMARY KEY,
    userName VARCHAR(255),
    password VARCHAR(255)
)

CREATE TABLE tasks
(
    taskId   SERIAL PRIMARY KEY,
    taskName VARCHAR(255),
    description VARCHAR(255),
    users VARCHAR(255)[],
    markers VARCHAR(255)[],
    columnId NUMERIC,
    projectId NUMERIC,
    position NUMERIC
)

CREATE TABLE usersTask
(
    id   SERIAL PRIMARY KEY,
    userId NUMERIC,
    taskId NUMERIC
)


CREATE TABLE student
(
    studentId   SERIAL PRIMARY KEY,
    studentName VARCHAR(255)
)

CREATE TABLE university
(
    universityId   SERIAL PRIMARY KEY,
    universityName VARCHAR(255)
)

CREATE TABLE studentsuniversity
(
    id SERIAL PRIMARY KEY,
    universityId NUMERIC,
    studentId NUMERIC
)


CREATE TABLE studentsuniversity(
id SERIAL PRIMARY KEY,
studentId INTEGER,
universityId INTEGER,
REFERENCES student (studentId),
REFERENCES university (universityId)
)

CREATE TABLE Orders(
    id SERIAL PRIMARY KEY,
    address VARCHAR(255)
)

CREATE TABLE Products(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description VARCHAR(255),
    price NUMERIC
)

CREATE TABLE ProductOrders(
    id SERIAL PRIMARY KEY,
    productId NUMERIC,
    orderId NUMERIC,
    price NUMERIC,
    quantity NUMERIC
)
