# Outreach

[![Greenkeeper badge](https://badges.greenkeeper.io/pitops/outreach.svg)](https://greenkeeper.io/)

Is a social media statistics management platform. For now it only shows youtube statistics by checking for an update every 60 seconds.

## SETUP

Navigate to [Google developer console](https://console.developers.google.com/projectselector/apis/dashboard)

and enable the following API

`Youtube Data Api V3`

Also you need to get credentials `CLIENT_ID` & `CLIENT_SECRET` and save them in a `credentials.json` file 
in the root directory with the following structure

```
module.exports = {
  'youtube': {
    'CLIENT_ID': <INSERT> ,
    'CLIENT_SECRET': <INSERT>
  }
}
```

Next install pm2 (a process manager) using `npm i -g pm2`

Once pm2 is installed start the project using the following command

`pm2 start ecosystem.system.json`

This will start two child processes one for the API and one for the Client

### Setup OAUTH and Youtube access

Once the servers are running (API, Client) navigate to

`localhost:8080/auth/google` and follow the steps to successfully authenticate with google.

Then just open `localhost:8081` and the youtube statistics should be displayed.

#### Note

The app needs `mongodb` installed to work.

Port 8080 is for the API
Port 8081 is for the Client

