# AMA-nda


A React Native iOS application that allows users to interact with an AI endpoint for text-based requests.

When I began this project, the intent was to push myself and work with as much new stuff as I can. I admit there are definitely better and more elegant solutions than what I've done, but this project encompasses the spirit of learning as much as I can in a short time, to see how well I adapt to so many unknowns.
<br><br>
My learnings in summary: React-Native, Expo-Go, React-Native & Expo-Go compatible libraries, NOT using an ORM in Flask, OpenAI, Firebase, Docker, AWS Lightsail are the main takeaways....

<br>

## Authors

- [@lunfy](https://github.com/lunfy)

<br>

## Tech Stack

**Client:** React Native

**Server:** Flask

**Database:** ElephantSQL (PostgreSQL)

**[ERD Diagram Here](https://github.com/lunfy/AMA-nda/blob/dev/assets/ERD.png?raw=true)**

**Backend Hosting:** AWS Lightsail

**User Auth Service:** Firebase

<br>

## Features

- User creation and email verification
- Light/dark mode toggle
- 4 types of AI request structure
- Usage history
- Notifications
- react-native-paper
- react-navigation/native-stack

<br>

## Deployment

1. Deployment of React Native iOS requires an Apple Developer Subscription, hence the limitation of this product preview via Expo GO local network. I may consider subscribing after this just to test out the deployment process to App Store (of course, with monetized banner ads :p)

2. Used **Docker** to create an image of **Flask server** (this took 2 hours to rectify compiler and package issues). Ran image on local container to test.

3. Once successful and stable, created a container service on **AWS Lightsail**, an Amazon VPS service. Pushed stable image to active container.

<br>

## API Reference

#### Registration

#### 1) Post registration details

```http
  POST /api/users/register
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
