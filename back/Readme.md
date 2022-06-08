# Library Project

# *Table of contents*
1. [Description](#description)
2. [List Of Services](#list-of-services)
    - [User Service](#user-service)
    - [Authentication](#authentication)
    - [Book Service](#book-service)
    - [Comment Service](#comment-service)
    - [Eureka Server](#eureka-server)
    - [Gateway Service](#gateway-service)
3. [Run Using Docker](#run-using-docker)
4. [Deploy](#deploy)

## *Description*

Micro services project simulating an online library.
- *Technologies used*
    * *Back:* Java Spring Boot
    * *Front:* React/NextJS
    
## *List Of Services*
- User Service
- Authentication
- Book Service
- Comment Service
- Eureka Server
- Gateway Service

## *Run Using Docker*
In order to start the databases, and run all microservices using docker, use the following commands
```bash
    # Run eureka server and app gateway
    docker-compose up -d
    # Run User, Book, Comment service and Database and front 
    docker-compose -f apps-docker-compose.yml up -d --build
```

Use this command to restart it
```bash
    docker-compose -f apps-docker-compose.yml restart app-books
```
## *Deploy*
- Creation of images with *Docker*
- Setting up pipelines on *GithubAction* to build docker images and push it in artefact registry on gcp 




 

