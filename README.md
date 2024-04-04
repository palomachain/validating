
# Node.js Validator Sync Check

This script is used to check the status of a local validator node and ensure it is in sync with the network. It uses a child process to spawn a local instance of `palomad` and listens for its status output. If the node is out of sync for more than 4 consecutive checks, the script will set the validating status to false.

## Prerequisites

- Node.js
- npm
- dotenv
- A local instance of `palomad`

## Setup

1. First, install the necessary dependencies:

npm install

2. Create a `.env` file in the root directory and set the PORT variable:

PORT=3000
DISABLE_VOTE_POWER=false

## Running the Script

To run the script, use the following command:

node index.js

The script will check the local validator node every minute.

## HTTP Server

The script also starts an HTTP server that listens on the port specified in the `.env` file. When a request is made to the server, it will respond with the current validating status.

## Error Handling

Errors are captured and logged to the console. If an error occurs when checking the local data, the function will return null and the error will be logged.

## Configurations

You can disable the vote power check by setting the `DISABLE_VOTE_POWER` variable in the `.env` file to "true".

## Note

This script assumes that `palomad` is available in your system's PATH. If it's installed in a different location, you'll need to update the path accordingly.
