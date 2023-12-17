# LitterAI API

# Table of Contents

1. [Introduction](#introduction)
2. [API Overview and Purpose](#api-overview-and-purpose)
3. [Technical Details](#technical-details)
4. [Versioning](#versioning)
5. [Rate Limits and Quotas](#rate-limits-and-quotas)
6. [Error Handling](#error-handling)
7. [env Contents](#env-contents)
8. [Authentication System](#authentication-system)
    - [Access Tokens](#access-tokens)
    - [Handling Invalid Access Tokens](#handling-invalid-access-tokens)
    - [Refresh Token Mechanism](#refresh-token-mechanism)
    - [Requesting New Access Tokens](#requesting-new-access-tokens)
9. [Endpoints](#endpoints)
    - [Authorization Endpoints](#authorization-endpoints)
        - [Register User](#register-user)
        - [Login](#login)
        - [Logout](#logout)
    - [Photo Info Endpoints](#photo-info-endpoints)
        - [Add Photo Info](#add-photo-info)
        - [Get User's Photos Count](#get-users-photos-count)
    - [Leaderboard Endpoints](#leaderboard-endpoints)
        - [Get Leaderboard by Total Uploads](#get-leaderboard-by-total-uploads)
        - [Get Leaderboard by Category](#get-leaderboard-by-category)

## Introduction

Welcome to the LitterAI API. This documentation provides detailed information about the API's functionality, including how to effectively integrate and utilize its features.

## API Overview and Purpose

**LitterAI** is an innovative API designed to leverage the power of image recognition artificial intelligence (AI) to assist users in proper trash disposal. By analyzing images of refuse, LitterAI determines the type of waste and advises on the appropriate disposal methods, which can vary by zipcode. This not only promotes environmental sustainability but also supports local waste management efforts.

The API's core functionality includes identifying the category of trash through image recognition and providing localized disposal instructions. Additionally, it allows users to track the number of images they've uploaded for analysis and features leaderboards to encourage community engagement in waste management.

This API is particularly useful for individuals seeking guidance on responsible trash disposal and waste management entities aiming to improve community recycling and waste handling practices. LitterAI's commitment to environmental stewardship makes it a valuable tool in promoting sustainability and ecological awareness.

## Technical Details

-   **Server:** Node.js and Express.js
-   **Database:** MongoDB
-   **Architecture:** RESTful design

## Versioning

-   **Beta Phase:** Currently in beta, indicating ongoing testing and improvements.

## Rate Limits and Quotas

**Coming Soon:**

-   Plans to introduce rate limits and quotas to ensure optimal performance and fair usage.

## Error Handling

-   **Common Error Codes:** `400 Bad Request`, `401 Unauthorized`, `422 Unprocessable Entity`.

## .env contents

```
SERVER_PORT=<number>
MONGO_URI=<MongoDB URI>  // example:'mongodb://localhost:27017'
REFRESH_SECRET=<string>
ACCESS_SECRET=<string>

```

## Authentication System

### Access Tokens

LitterAI uses JWT (JSON Web Tokens) for managing access to its API. These tokens are essential for authorizing and maintaining secure communication between the client and the server.

-   **Usage:** To access protected endpoints, the JWT access token must be included in the request's Authentication header as a Bearer token.
-   **Format:** The header format should be: `"Authorization": "Bearer <access_token>"`.

### Handling Invalid Access Tokens

The API has mechanisms to handle scenarios where the provided JWT access token is invalid, expired, or if there's an internal server error. Here's how these scenarios are managed:

1. **Expired Access Token:**

    - **Error Code:** `EXPIRED_TOKEN`
    - **Status Code:** `401 Unauthorized`
    - **Message:** "Your token has expired. Please refresh the token."
    - **Action:** When an access token is expired, the user needs to request a new access token using their refresh token.

2. **Invalid Access Token:**

    - **Error Code:** `INVALID_TOKEN`
    - **Status Code:** `401 Unauthorized`
    - **Message:** "Your token is invalid."
    - **Action:** This response is triggered when the access token provided in the request is malformed, tampered with, or otherwise invalid. The user should authenticate again to receive a new token.

3. **Internal Server Error:**
    - **Error Code:** `SERVICE_ERROR`
    - **Status Code:** `500 Internal Server Error`
    - **Message:** "Internal server error."
    - **Action:** This is a generic error response for unexpected server-side issues. Users are advised to try the request again or contact support if the problem persists.

## Refresh Token Mechanism

### Handling Refresh Tokens

-   **Token Storage:** Refresh tokens are delivered to the frontend as HTTP-Only cookies.
-   **Cookie Name:** The cookie is named `refreshToken`.
-   **Token Lifecycle:**
    -   **Issuance:** Issued at the time of user login.
    -   **Validity Duration:** Valid for 30 days.
    -   **Revocation:** Revoked upon user logout to terminate the session.

### Requesting New Access Tokens

-   **Endpoint:** `/refresh-token`
-   **Trigger:** Should be requested when an access token is rejected, typically due to expiration.
-   **Process:** Upon validation of the refresh token, the API issues a new access token for continued access.

## Endpoints

### Authorization Endpoints

#### Register User

Creates a user and a corresponding photo category document for trash categorization. This is used to track user uploads and categorize trash based on AI analysis.

**POST** `/register`

**JSON Request Body:**

```json
{
    "username": "<string>",
    "email": "<string>",
    "password": "<string>",
    "confirmPassword": "<string>",
    "firstName": "<string>",
    "lastName": "<string>",
    "zipCode": "<string>"
}
```

<details>
<summary>Response</summary>

```
{
  "status": "pending"
}
```

</details>

#### Login

**POST** `/login`

JSON Request body should follow

```
{
  "email": <string>,
  "password": <string>
}
```

<details>
<summary>Response</summary>

```
{
  "user": {
    "_id": <string>,
    "username": <string>,
    "displayUsername": <string>,
    "firstName": <string>,
    "lastName": <string>,
    "zipCode": <string>,
  }
  "token": <string>
}
```

</details>

#### Logout

**POST** `/logout`

Revokes a user's refresh token.

### Photo Info endpoints

#### Add Photo info

After a photo has had its contents parsed by the AI send a request to this endpoint in order to have their photo information stored for the leaderboard

**POST** `/photo`

Include user's JWT in an authorization header

```
"Authorization": "Bearer <token>"
```

Valid Categories: `"paper"`, `"cardboard"`, `"compost"`, `"metal"`, `"glass"`, `"plastic"`, `"trash"`, `"other"`, `"unknown"`

JSON Request body should follow

```
{
  "category": <string>,
  "email": <string>
}
```

<details>
<summary>Response</summary>

```
{
  "username": <string>,
  "category": <string>,
  "categoryUploads": <number>,
  "totalUploads": <number>,
}
```

</details>

#### Get user's photos count

**GET** `/photo/:username`

Include user's JWT in an authorization header

```
"Authorization": "Bearer <token>"
```

<details>
<summary>Response</summary>

```
{
    "_id": <string>,
    "userId": <string>,
    "username": <string>,
    "displayUsername": <string>,
    "pictureData": {
        "paper": <number>,
        "cardboard": <number>,
        "compost": <number>,
        "metal": <number>,
        "glass": <number>,
        "plastic": <number>,
        "trash": <number>,
        "other": <number>,
        "unknown": <number>,
    },
    "totalUploads": <number>
}
```

</details>

### Leaderboard endpoints

#### Get Leaderboard by Total Uploads

Returns a json object that contains a leaderboard, and information about the logged in user if possible.

**GET** `/leaderboard`

**Query Params**

| Syntax  | Description      | Default |
| ------- | ---------------- | ------- |
| page    | page to query    | 1       |
| perPage | results per page | 10      |

Ex: `/leaderboard?page=2&perPage=3`

<details>
<summary>Response</summary>

When `userRank` is `null` a user is not logged in

When `userRank` is `-1` the logged in user has not uploaded a photo of selected category

```
{
    "category": <string>,
    "totalEntries": <number>,
    "username": <string>,
    "userRank": <number>,
    "userItemCount": <number>
    "leaderboard": [
        {
            "username": <string>,
            "itemCount": <number>
            "rank": <number>
        }
        // ...
    ]
}
```

</details>

#### Get Leaderboard by Category

Returns a json object that contains a category, a leaderboard, and information about the logged in user if possible.

**GET** `/leaderboard/:category`

Valid Categories: `"paper"`, `"cardboard"`, `"compost"`, `"metal"`, `"glass"`, `"plastic"`, `"trash"`, `"other"`, `"unknown"`

**Query Params**

| Syntax  | Description      | Default |
| ------- | ---------------- | ------- |
| page    | page to query    | 1       |
| perPage | results per page | 10      |

Ex: `/leaderboard/:glass?page=2&perPage=3`

<details>
<summary>Response</summary>

When `userRank` is `null` a user is not logged in

When `userRank` is `-1` the logged in user has not uploaded a photo of selected category

```
{
    "category": <string>,
    "totalEntries": <number>,
    "username": <string>,
    "userRank": <number>,
    "userItemCount": <number>
    "leaderboard": [
        {
            "username": <string>,
            "itemCount": <number>
            "rank": <number>
        }
        // ...
    ]
}
```

</details>
