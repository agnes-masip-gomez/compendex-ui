# Execution

### `npm start`

### DOCKER

(admin account that is part of docker-users access group)

run the docker daemon (open dockerhub)

docker build -t dashboard-ui .

(the container needs to be killed before)
docker run -p 3000:3000 --name dashboard-service dashboard-ui

(after its existence)

docker run -p 8001:8001 dashboard-service


## Available Scripts


Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

