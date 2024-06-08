# Bitespeed Backend Task: Identity Reconciliation

## Project Overview

This project is a backend service for identity reconciliation, designed to link different orders made with different contact information (email addresses and phone numbers) to the same person. It uses a MySQL database to store and manage contact information.

## Features

- Identify and link customer orders based on email and phone number.
- Consolidate contact information into primary and secondary contacts.
- Expose an endpoint `/identify` for querying and updating contact information.

## Technologies Used

- Node.js
- Express
- MySQL
- dotenv (for managing environment variables)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MySQL database

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Atmalviya/Bitespeed-Backend-Task.git
   cd bitespeed-backend-task

### Install dependencies:

```bash
  npm install

```
    
## Environment Variables

Set up your environment variables:

`DB_NAME=your_database_name`

`DB_USER=your_database_username`

`DB_PASSWORD=your_database_password`

`DB_HOST=your_database_host`

`DB_PORT=3306`

`PORT=3000`

## Set up the database:
Ensure your MySQL database is running and create the database specified in DB_NAME. Then, run the migrations:

`npx sequelize-cli db:migrate`


## Start the server

```bash
  npm run dev
```


## API Endpoints

### Identify by Email and Phone Number:
#### POST /identify
To Run locally
```http
  curl -X POST http://localhost:3000/identify \ 
  -H "Content-Type: application/json" \ 
  -d '{"email": "test@example.com", "phoneNumber": "1234567890"}'
```
To Run hosted
```http
  curl -X POST https://bitespeed-backend-task-rby0.onrender.com/identify \
-H "Content-Type: application/json" \
-d '{"email": "mcfly@hillvalley.edu", "phoneNumber": "123456"}'
```

### Identify by Phone Number Only:
```http
curl -X POST https://bitespeed-backend-task-rby0.onrender.com/identify \
-H "Content-Type: application/json" \
-d '{"phoneNumber": "123456"}'

```
## Deployment

The application is hosted on Render. You can access it at:

### Endpoint: 
```bash
  https://bitespeed-backend-task-rby0.onrender.com/identify
```


## Feedback

If you have any feedback, please reach out to us at atulmalviyawork1@gmail.com


# Hi, I'm Atul! 👋


## 🚀 About Me


Hey! I'm Atul Malviya, a software developer and Computer Science graduate from Jabalpur Engineering College. Currently, I'm gaining valuable experience as a Software Developer at Opensense Labs. Apart from coding, I've served as the TPO of my college and have a passion for karate, having represented India and won three national gold medals. Let's connect and code together! 🚀

Reach me at [email](mailto:atulmalviyawork@gmail.com) or find me on [LinkedIn](https://www.linkedin.com/in/atul-malviya/).


## 🔗 Links

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/atul-malviya/)



## 🛠 Skills
Javascript, TypeScript, SQL, MERN/MEAN, GIt, Bit Bucket, PHP


## 
👩‍💻 I'm currently working on MERN & MEAN Stack

🧠 I'm currently learning Node.js

📫 How to reach me...-> https://www.linkedin.com/in/atul-malviya/

