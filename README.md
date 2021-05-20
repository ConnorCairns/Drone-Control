<div align="center">
  
  # DroneControl
  [Live demo](https://dronecontrol.netlify.app)
  
  [![spe-uob](https://circleci.com/gh/spe-uob/DroneControl.svg?style=svg&circle-token=6a0a470141397038f88ba3abb834c0ef1542e7ff)](https://app.circleci.com/pipelines/github/spe-uob/DroneControl)
  ![frontend coverage](https://github.com/spe-uob/DroneControl/workflows/frontend-coverage/badge.svg?branch=main)

</div>

## Overview

Drone Control is an interactive drone simulator where users of any age can learn and use basic coding concepts in an accessible and interractive format (Scratch-style blocks or simple code) to command a simulated drone to achieve a goal, e.g. navigation of obstacle course or maze and to engage with control system design in a limited form, e.g. modify parameters in simulation to improve the flight dynamics of a quadcopter.

Intended to support at least 50 concurrent users, scalable to more and to run on Chrome, IE/Edge, Firefox, Safari on Win and Mac. Javascript is used heavily to allow this to scale easily.

## Usage

#### Prerequisites
* Node.js v15+
* http-server or similar

### Development Setup
- Clone the repo

```
git clone https://github.com/spe-uob/DroneControl.git
```

- Modify AUTONAVx to postMessage to any URL, navigate to `software/frontend/autonavx/js/init/viewer.js` and change line 63
```
window.parent.postMessage({source: 'drone simulator', message: 'drone loaded'}, "https://dronecontrol.netlify.app/")
```

to

```
window.parent.postMessage({source: 'drone simulator', message: 'drone loaded'}, "*")
```

- Start AUTONAVx server

```
cd software/frontend/src/assets/autonavx
http-server
```

- Now that AUTONAVx is running, you will need to modify `line 38 in Grid.js` and `line 25 in Simulator.js` so the URL for `postMessage` and `iframe` matches the URL where AUTONAVx is running. If using http-server this should default to `http://127.0.0.1:8080`


- Install required packages in frontend

```
cd software/frontend
npm install
```

- Start development server with hot reload etc

```
npm start
```

You now should be able to access the website at `localhost:3000`

### Production Deploy

For `postMessage` to work without errors some headers need to be set, the required headers can be found in the root directory of AUTONAVx and the frontend in the `netlify.toml` file. If you are deploying somewhere else you will need to create a config for your specific webserver.

- AUTONAVx postMessage URL should be modified from any (*) to frontend URL for security reasons, see development setup for where to change this

- Start AUTONAVx server

```
cd software/frontend/src/assets/autonavx
http-server
```

- Modify the postMessage and iframe URL as in the development setup

- Build the frontend

```
cd software/frontend
npm run build
```

- And deploy

```
cd build
http-server
```

Website is now up and running


