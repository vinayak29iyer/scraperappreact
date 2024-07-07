# React.js App with Metadata Scraper API Integration

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Axios](https://img.shields.io/badge/Axios-671DDF?style=for-the-badge&logo=axios&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Redux-Tool-Kit](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)

## Overview

This project is a React.js application that integrates with a Metadata Scraper API mentioned (https://github.com/vinayak29iyer/scraperappreact) . It demonstrates how to create a seamless front-end interface to interact with a backend service, showcasing my skills in React, Redux-Tool-Kit, Axios, and API integration.

## Features

- **Metadata Retrieval:** Users can input a URL to retrieve and display metadata such as title, description, keywords, and primary image.
- **Responsive Design:** The app is fully responsive, providing a great user experience on both desktop and mobile devices.
- **Error Handling:** Proper error handling ensures users are informed of issues like invalid URLs or network errors.
- **Clean UI:** A user-friendly interface designed with simplicity and usability in mind.

## Table of Contents

- [Installation](#installation)
- [High Level Architecture](#High Level Architecture)
- [Usage](#usage)
- [API Integration](#api-integration)
- [Contact](#contact)

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/vinayak29iyer/scraperappreact.git
    cd scraperappreact
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Create a `.env` file in the root directory and add the following:**

    ```env
    REACT_APP_BASE_API='YOUR NODE APP BASE URL ex: "{http://localhost:3000}"'
    REACT_APP_LOGIN_API='/api/auth/login'
    REACT_APP_SCRAPER_API='/api/websitescraper/fetch-metadata'
    ```

4. **Start the development server:**

    ```bash
    npm start
    ```

## High Level Architecture
Here’s a high-level overview of the architecture:
+-------------------+          +-------------------+          +----------------------+
|    User          | -------> |   CloudFront     | -------> |      S3 Bucket      |
+-------------------+          +-------------------+          +----------------------+
                             (Content Delivery Network)             (Static React App)
                                                                      |   |
                                                                     \|/
                                                                 +---------------+
                                                                 | API Gateway   |
                                                                 +---------------+
                                                                      |   |
                                                                     \|/
                                                             +-------------------+
                                                             |     EC2 Instance   |
                                                             |   Node.js Express  |
                                                             +-------------------+
                                                                      |   |
                                                                     \|/
                                                             +-------------------+
                                                             | MongoDB Atlas     |
                                                             +-------------------+

 **Diagram Explanation:**
1. User: The user interacts with your web application through a web browser.
2. CloudFront: This content delivery network caches your static React app across the globe, ensuring fast and efficient content delivery to users worldwide.
3. S3 Bucket: Your React app (built using npm run build or a similar command) is stored as static files (HTML, CSS, JavaScript) in an S3 bucket.
4. API Gateway: When your React app needs to perform scraping or access data, it sends requests to the API Gateway. This gateway acts as a front door, handling authentication, request routing, and other API management tasks.
5. EC2 Instance: The Node.js Express API runs on an EC2 instance. This is where your scraping logic resides and where data is processed and retrieved from the database & Scrapper API(AXIOS).
6. MongoDB Atlas: Your scraped metadata is stored in MongoDB Atlas, a fully managed cloud database service. This provides scalability, flexibility, and ease of management for your data. I have added a ttl of 5mins to avoid high data retention.

This high-level diagram provides a clear visual representation of the major components and their interactions within your AWS architecture.

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Enter a URL in the input field and click the "Scrape Metadata" button.
3. View the retrieved metadata displayed on the page.

## API Integration

This app integrates with a Metadata Scraper API built with Node.js and Express. The API endpoint accepts a URL as a query parameter and returns metadata in JSON format.

## Contact
- **LinkedIn:** [Your LinkedIn](https://www.linkedin.com/in/vinayak-iyer-65610b17)
