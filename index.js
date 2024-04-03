import dotenv from 'dotenv';
import {spawn} from "child_process";
import http from 'http';

dotenv.config();

let validating = false;

async function get_local_data() {
    try {
        const child = spawn("palomad",['status']);


        for await (const data of child.stdout) {
            return JSON.parse(data);
        };

        for await (const data of child.stderr) {
            captureException(`CHECK IS SERVER IS UP: ${data}`);
        };
    } catch (err) {
        //captureException(err);
        console.log(err);
	return null;
    }
}

async function check_and_sync(local_data) {
    try {
        console.log(local_data);
        if (local_data.validator_info.voting_power) {
            console.log(local_data.validator_info.voting_power)
            validating = local_data.validator_info.voting_power > 0;
        } else {

        }
    } catch (err) { console.log(err); }
}

async function main() {
    console.log('checking local');
    let local_data = await get_local_data();

    await check_and_sync(local_data);



    return 0;
}

await main();

setInterval(main, 1000 * 60);

const requestListener = function (req, res) {
    try {
        res.setHeader('Content-Type', 'text/plain');
        res.writeHead(200);
        //let response =
        res.end(validating.toLocaleString());
    } catch (error) {
        console.log(error);
    }
}

const server = http.createServer(requestListener);
server.listen(process.env.PORT);
