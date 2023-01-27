# Gabrovowoch backend

Backend for an upcoming app on gabrovo jokes.

## Usage

First try to get free api_key using the [web app](https://gabrovowoch.vercel.app/) then use the endpoints listed below by combining the base url with the specified route url.

<b>Base URL: </b>https://gabrovowoch-backend.onrender.com/

### Endpoints

| Endpoints     | Request type | Param/Body                                          | Response                            | URL                                          |
|---------------|--------------|-----------------------------------------------------|-------------------------------------|----------------------------------------------|
| Signup        | POST         | Body: { username, email, password }                 | { token, user }                     | /api/signup                                  |
| Login         | POST         | Body: { username, password }                        | { token, user }                     | /api/login                                   |
| AddJoke       | POST         | Body: { title, description, likes }  Query: api_key | { id, title, description, likes }   | /api/add?api_key=api_key                     |
| GetAllJokes   | GET          | Query: skip, take, api_key                          | [{ id, title, description, likes }] | /api/all?skip=skip&take=take&api_key=api_key |
| GetRandomJoke | GET          | Query: api_key                                      | { id, title, description, likes }   | /api/random?api_key=api_key                  |
| GetJokeById   | GET          | Param: id  Query: api_key                           | { id, title, description, likes }   | /api/joke/:id?api_key=api_key                |
| Like          | PUT          | Param: id  Query: api_key                           | { id, title, description, likes }   | /api/like/:id?api_key=api_key