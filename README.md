# Pollster-api
REST API for a real-time polls platform. Create and view results in real-time. Implements SocketIO for real-time features.

## Manual Installation

Install the dependencies:

```bash
npm install
```

Set the environment variables:

```bash
cd env
cp .env
# open .env and modify the environment variables
```

## Table of Contents

- [Commands](#commands)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)

## Commands

Running in development:

```bash
npm start
# or
npm run dev
# runs nodemon
```
Running in production:

```bash
# build
npm run build
# start
npm run prod
```

## Environment Variables

The environment variables can be found and modified in the `.env` file.

```bash
# Port
PORT = # default 8080

# URL of the Mongo DB
MONGO_URI = 

# Frontend deployment 
CLIENT_URL

# JWT
ACCESS_TOKEN_SECRET =
REFRESH_TOKEN_SECRET =

# Third Party Integrations for object uploads
AWS_S3_ACCESS_KEY_ID =
AWS_S3_SECRET_ACCESS_KEY =
AWS_S3_BUCKET_NAME =
```

## Project Structure

```
\                       # Root folder
 |--config\             # Configurations
 |--controllers\        # Controllers
 |--env\                # Environment variables
 |--middleware\         # Custom express middlewares
 |--models\             # Mongoose models
 |--routes\             # Routes
    |--v1\
 |--sockets\            # Sockets initialised
 |--tests\               # Unit Tests and Load Tests
 |--util\               # Utility functions
 |--.gitignore          # Folders to ignore from upload to repository
 |--index.js            # API server entry point
 |--package-lock.json   # Dependency management
 |--package.json        # Repository metadata, dependencies
```

### API Endpoints

List of available routes:

**Auth routes**: `api/v1/auth`
- `POST /register` - Create new user credentials
- `POST /login` - Create and receive access token
- `POST /logout` - Logout
- `POST /refresh-token` - Request new access token

**Comments routes**:`api/v1/comments`
- `GET /` - Get all comments
- `POST /poll/:poll_id` - Create a comment for a specific poll
- `GET /poll/:poll_id` - Get comments for a specific poll
- `DELETE /poll/:poll_id` - Delete all comments for a specific poll
- `GET /:comment_id` - Get a specific comment
- `PATCH /:comment_id` - Update a specific comment
- `DELETE /:comment_id` - Delete a specific comment
- `GET /:comment_id/replies` - Get replies for a specific comment

**Polls routes**: `api/v1/polls`
- `POST /` - Create a new poll
- `GET /` - Get all polls
- `GET /:id` - Get a specific poll
- `PATCH /:id` - Update a specific poll
- `DELETE /:id` - Delete a specific poll

**User routes**: `api/v1/users`
- `GET /profile` - Get user profile
- `POST /create-profile` - Create user profile
- `DELETE /delete` - Delete user profile
- `PATCH /update` - Update user profile

**Votes routes**: `api/v1/votes`
- `GET /` - Get all votes
- `GET /:poll_id` - Get votes for a specific poll
- `POST /:poll_id` - Add a vote for a specific poll
- `PATCH /:poll_id` - Update a vote for a specific poll
- `DELETE /:poll_id` - Delete a vote for a specific poll