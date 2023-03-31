## PhoneBook Front End

This application was made using next.js and styled with Chakra.ui, most of the commands for that frameworks are valid

## To use the Application:

### 1. Install the Dependencies

```
yarn install

or

yarn
```

### 2. Run the server.

After installing all the dependencies, you can run the server through the command

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The server will open on (http://localhost:3000), having that in mind the API is configured to run in the port 3001, if you can't use the port 3001 you can change it directly on the API, through changing the port on server.ts or through the .env file present in the API side (this apply only for running the server locally)

### Caution

Be aware that all the requisitions are made using the axios that is located in the folder(services), before starting using the front-end please change the baseURL for your desired one, it should works without problem.

This application was made to be used together with the clientcontact_api that can be found in this repository: https://github.com/Yokorosan/clientandcontact-api

Hope you have a great day!
