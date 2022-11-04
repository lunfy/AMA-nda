# AMA-nda


A React Native iOS application that allows users to interact with an AI endpoint for text-based requests.

<br>

## Authors

- [@lunfy](https://github.com/lunfy)

<br>

## Tech Stack

**Client:** React Native

**Server:** Flask

**Database:** ElephantSQL (PostgreSQL)

**Backend Hosting:** AWS Lightsail

**User Auth Service:** Firebase

<br>

## API Reference

#### Registration

#### 1) Post registration details

```http
  POST /api/registration
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | Email address from registration form |
| `uid` | `string` | User ID from Firebase's successful registration |

<br>

### Requires JWT Authentication
#### Users
#### 1) Get all user's details
```http
  GET /api/users
```

#### 2) Post user sign in session
```http
  POST /api/users
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email` | `string` | Email address from sign-in form |
| `uid` | `string` | User ID from Firebase's successful sign-in form |

Route will update login time of user and increment login count. 

<br>

#### Requests
#### 1) Get user's usage history
```http
  GET /api/requests?uid={uid}
```

| Argument | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `uid` | `string` | User ID from Firebase |

#### 2) Log user's request to openAI to log usage history
```http
  POST /api/requests
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `uid` | `string` | User ID from Firebase |
| `user_request` | `string` | User prompt from request form |
| `ai_response` | `string` | AI response from openAI API |

<br>

#### Notifications
#### 1) Get user's notifications
```http
  GET /api/notifications?uid={uid}
```

| Argument | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `uid` | `string` | User ID from Firebase |

#### 2) Send notification(s) to user(s) [Admin verification on backend]
```http
  POST /api/notifications
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `admin_uid` | `string` | User ID from Firebase |
| `users_uid` | `array` | Array of User ID(s) |
| `message` | `string` | Notification message |

#### 3) Set notification visibility (read/unread)
```http
  PUT /api/notifications
```

| Argument | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `nid` | `string` | Notification ID |
| `visible` | `boolean` | Set notification visibility to True/False |

#### 4) Delete notification
```http
  DELETE /api/notifications
```

| Argument | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `nid` | `string` | Notification ID |
