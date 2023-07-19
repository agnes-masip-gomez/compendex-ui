# Execution

### `npm start`

### DOCKER

(admin account that is part of docker-users access group)

run the docker daemon (open dockerhub)

sudo docker build -t compendex-ui .

(the container needs to be killed before)
sudo docker run -p 8889:8889 --name compendex-service compendex-ui

(after its existence)

docker run -p 8889:8889 dashboard-service


## Available Scripts


Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

