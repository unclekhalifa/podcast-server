# podcast-server

1. Description
This repo is a podcast server implemented with Node. The main goal of a podcast server 
is simple: serve audio tracks and an updated XML feed with all the track links and descriptions.

2. Prerequisites
- SSL is required to work as a podcast server. Platforms like Apple Podcasts & Spotify will not accept HTTP only
- Have some tracks to serve
- Create the XML (see https://feed.syntax.fm/rss for an example)

4. Running/testing
```
npm install
node main.js
```

