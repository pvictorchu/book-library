﻿# Book Library Application

Welcome to the Book Library Application! This project is designed to manage a library of books, providing functionalities to add, update, delete, and search for books. The application consists of a backend written in C# utilizing Entity Framework for database interaction, a frontend written in React with TypeScript, and a SQL Server database to store book information. Additionally, the project is fully Dockerized, allowing for easy deployment and demonstration.
Features

    Add Books: Easily add new books to the library with relevant details such as title, author, genre, isbn, and type.
    Update Books: Modify existing book details such as author, genre, or publication year as needed.
    Delete Books: Remove books from the library database when they are no longer relevant or available.
    Search Books: Utilize search functionality to find specific books based on title, author, genre, isbn or type.
    Dockerized: The entire application is containerized with Docker, enabling seamless deployment and running of the application with minimal setup.

Technologies Used

    Backend:
        Language: C#
        Framework: .NET Core
        Database ORM: Entity Framework
    Frontend:
        Framework: React.js
        Language: TypeScript
    Database:
        SQL Server
    Containerization:
        Docker

Getting Started

To get started with the Book Library Application, follow these steps:

    Clone the Repository:

    bash

    git clone https://github.com/your-username/book-library.git

    Navigate to the Project Directory:

    bash

    cd book-library

    Build Docker Images:

    docker-compose build

    Run Docker Containers:

    docker-compose up

Access the Application:
Once the containers are up and running, you can access the application at http://localhost:3000 in your web browser.
