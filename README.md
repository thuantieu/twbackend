# TW Social Backend side

## How to run this app
implement the following commands:

```
git clone
npm install
npm start
```
or
```
npm run dev
```

## User register
Post: [http://localhost:3000/api/users](http://localhost:3000/api/users)

with request body form:
```json
{
  "name": "YOUR_USER_NAME",
  "password": "YOUR_PASSWORD",
  "email": "YOUR_EMAIL",
  "mobile": "YOUR_PHONE_NUMBER",
}
```
## Login
- Post: [http://localhost:3000/api/users/login](http://localhost:3000/api/users/login) with request body form:
```json
{
  "name": "YOUR_USER_NAME",
  "password": "YOUR_PASSWORD"
}
```
- Respone received:
```json
{
  "message": "the user is logged in!",
  "iv": "NEW_IV",
  "content": "NEW_CONTENT"
}
``` 
## Publish a new post

- Post: [http://localhost:3000/api/post](http://localhost:3000/api/post) with request body form:
```json
{
  "title": "TITLE",
  "content": "CONTENT"
}
```
- The headers of publish a new post need add two keys: iv and content from the response of login
## Get user post

- Get: [http://localhost:3000/api/post](http://localhost:3000/api/post)
- The headers of publish a new post need add two keys: iv and content from the response of login

## Editing post
- Patch: [http://localhost:3000/api/post/:id](http://localhost:3000/api/post/:id)
- The headers of publish a new post need add two keys: iv and content from the response of login

## Delete a apost
- Delete: [http://localhost:3000/api/post/:id](http://localhost:3000/api/post/:id)
- The headers of publish a new post need add two keys: iv and content from the response of login
