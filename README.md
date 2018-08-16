## (Currently being modified)
# PARTY-FY

PARTY-FY is the modern day jukebox for your next party. It is a collaborative playlist using the Spotify API. Users can search for a song and put it vote for the other party goers to decide if it should be added to the playlist. There is also a chat feature where you can interact with everyone in the party. This app requires a Spotify premium account to be able to play songs. This app utilizes a react front end and a rails back-end [located here](https://github.com/JDumadag25/Partify-backend), the back end authorizes users and allows the chat and vote feature to work using ActionCable web-sockets.

You will also need to run a node server to allow Spotify's Oauth to work to be able to log in to your account (instructions are down below)

[Video Demo](https://youtu.be/ZXYmRIIfzhQ)

## Setting up your node server for Spotify Authentication:

Fork and Clone [this repository](https://github.com/spotify/web-api-auth-examples) then follow their instructions.

Make sure your redirect_uri variable in the app.js file under the authorization_code folder is 'http://localhost:8888/callback'

Also add 'http://localhost:3001/partify/#' on line 107.

Run ```node authorization_code/app.js```

## Setting up the Party Playlist:

Open your Spotify Application and left click on the playlist you would like to use. Click on `Share` then `Copy Spotify URI`.

It should look something like this:  ```spotify:user:<your_user_name>:playlist:<playlist ID>```

Copy the playlist ID and paste it on line 12 in PartyRoom.js ```const partyplaylist = ''``` in the src/components folder.

run ```PORT=3001 yarn start```

You are now ready to start the party!
