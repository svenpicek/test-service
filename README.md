# Introduction 
This is a simple API with 3 endpoints. Its primary purpose is testing connectivity in an environment, e.g. k8s cluster.
The same image can be deployed multiple times and given a unique name with the SERVICE_NAME env var.

# Usage
Run "npm i" to install dependencies, then run "node index.js" to start the app.

# Endpoints
/endpoint1 - returns service name and request source IP

/endpoint2 - sends request to whatever is set in the FORWARDING_URL env var, primarily meant to send requests to /endpoint1 of a different service.

/endpoint3 - queries a postgres DB (SELECT * FROM users)

# Env vars
FORWARDING_URL

SERVICE_NAME

DB_USER

DB_HOST

DB_PASS

DB_PORT

DB_NAME
