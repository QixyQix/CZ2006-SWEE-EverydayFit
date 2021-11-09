# CZ2006-SWEE-EverydayFit

## Setup

### Frontend

1. Go to the frontend folder `cd frontend`
1. Install dependencies `npm i`
1. Make a copy of the `.env.sample` and name it as `.env` and `.env.development`, and change the `API_URL` to your IP address indicated from `npm start`
1. Run app
   - Development mode: `npm start`
   - Production mode: `npm run start:prod`
   - Development mode (refresh env variables and clears cache): `npm run start:rc`

### Backend

Based on project template from https://github.com/maliksahil/expressjs-typescript Copyright (c) 2019 Sahil Malik. Licensed under MIT.

1. Ensure you have node and yarn installed
2. In the 'server' folder, make a copy of the `.env.sample` and name it as `.env`
3. Install dependencies

```bash
$ yarn install
```

4. Start application

```bash
$ yarn start
```
