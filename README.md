###MdSync

Install it and run:

```bash
yarn
yarn dev
```

Run app 

```bash
yarn dev -p PORT
```

##.env vars to set: 
- REACT_APP_SERVER_URL : url of the server

## Deploy heroku
```bash
heroku git:remote -a mdsync-deploy
git push heroku $BRANCH:master
heroku config:set REACT_APP_SERVER_URL
```
