# litterai-api

## .env Contents

```
SERVER_PORT=<number>
MONGO_URI=<MongoDB URI>  // example:'mongodb://localhost:27017'
REFRESH_SECRET=<string>

```

## Authorization Endpoints

### Register User

This endpoint will create a user document and a photo category document which
stores the value of each category of trash determined by the AI based on the photo uploaded by the user.

**POST** `/register`

JSON Request body should follow

```
{
  "username": <string>,
  "email": <string>,
  "password": <string>,
  "confirmPassword": <string>,
  "firstName": <string>,
  "lastName": <string>,
  "zipCode": <string>
}
```

<details>
<summary>Response</summary>

```
{
  "user": {
    "userId": <string>,
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

### Login

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

### Logout

**POST** `/logout`

Include user's JWT in an authorization header

```
"Authorization": "Bearer <token>"
```

## Photo Info endpoints

### Add Photo info

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

### Get user's photos count

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

## Leaderboard endpoints

### Get Leaderboard by Total Uploads

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

### Get Leaderboard by Category

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
