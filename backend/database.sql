CREATE
DATABASE taskTracker;

CREATE TABLE projectsList
(
    projectId SERIAL PRIMARY KEY,
        name      VARCHAR(255),
        createdAt DATE,
        updatedAt DATE
)

CREATE TABLE kanbancolumns
(
    columnId      SERIAL PRIMARY KEY,
    projectListId NUMERIC,
    name          VARCHAR(255),
    position NUMERIC
)

CREATE TABLE registration
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


