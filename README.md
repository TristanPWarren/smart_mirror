# Smart Mirror Instructions

This project is a simple web server used to host a smart mirror display that can be used to display the weather, news, time and date. It allows someone with an old laptop, one way glass/acrylic and a bit of DIY experience to easily create a smart mirror at home with very little coding knowledge. To see a running demonstration of the display please see the link below.

www.tristanwarren.co.uk/projects/smart_mirror

Instructions on how to set up:

- Install Node
- Run `node install` in project root directory
- In `credentials.json` change `weatherAPIkey` and `newsAPIkey` to your own api keys. This uses the APIs from https://openweathermap.org/api and https://newsapi.org/ respectively. 
- In `options.json` change `userName` to your name, `rotation` to true for landscape, false for portrait and `cityID` to your location. A list of UK cities and their IDs are included in the assets directory. 

Instruction how to run

- Open in browser
- Go to localhost:8080
- Make browser full screen
- Shown on a digital display and mounted in a frame behind a one way screen creates an easy smart mirror. 


This project is a work in progress with future updates including:

- [ ] User accounts with a dashboard for modifying preferences
- [ ] User proximity detected using Bluetooth to change preferences  
