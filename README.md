# Authentication Service

A microservice to handle authentication for the ChatBuds application.

## System overview
ChatBuds is built as a small microservice-architecture. The consumer/client only communicates with the API Gateway which handles the back-end communication.

The client: https://gitlab.lnu.se/1dv613/student/ir222gn/projects/chatbuds

The API Gateway: https://gitlab.lnu.se/1dv613/student/ir222gn/projects/api-gateway

The Resource Service: https://gitlab.lnu.se/1dv613/student/ir222gn/projects/resource-service

![Architecture](./.readme/chatbuds-architecture.png)

## API documentation
The documentation of which http requests are possible to make is found at: https://app.swaggerhub.com/apis-docs/chatbuds/auth-service/1.0.0

## Starting up this project locally
To run the Authentication Service locally you will need to add a .env file to the root of the project.

The .env file should contain:

- PORT= which port the Authentication Service should run on
- DB_CONNECTION_STRING= the database connection string
- PRIVATE_KEY_FILEPATH= the file path to private key used for JWT encoding
- PUBLIC_KEY_FILEPATH= the file path to public key used for JWT decoding
- ACCESS_TOKEN_LIFE= specifies how long the JWT should be valid for

(replace the description next to "=" with its desired value)

### Enter "npm install" in the terminal to build the dependencies

## Running Authentication Service
Development mode: enter "npm run start:dev" in the terminal.

Production mode: enter "npm start" in the terminal.

## Linting the code
Check for linting problems by entering "npm run lint" in the terminal.

Fix linting problems automatically by entering "npm run lint:fix" in the terminal.
