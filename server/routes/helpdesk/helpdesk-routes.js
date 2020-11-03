import { Router } from 'express';
import isDev from 'isdev';

import fetch from 'node-fetch';

const router = Router();

const createSDPRequest = async (
    supportRequestTitle,
    category,
    description,
    location,
    phoneExt,
    room,
    attachment )  => {
    const sdpCreateRequestsURL = `${process.env.SDP_URL}/api/v3/requests`; 

    const sdpCreateRequestsURLHeaders = {
        'Content-Type'      :   'application/x-www-form-urlencoded',
        'technician_key'    :   process.env.SDP_TECH_KEY
    };

    const input_data = {
        request: {
            subject: "Test Ticket 1",
            description: "Test Ticket 1",
            requester: {
                id: "4",
                name: "Lopez, Juan David",
                email_id: "lopezj@centinela.k12.ca.us"
            },
            status: {
                name: "Open"
            }
        }
    };

    let sdpCreateReqResponse = await fetch(sdpCreateRequestsURL, {
        method: 'POST',
        headers: sdpCreateRequestsURLHeaders,
        body: `input_data=${JSON.stringify(input_data)}`
    })
    .then((serverResponse) => serverResponse.json()) //Parse the JSON of the response
    .then((response) => {
        console.log("response JSON:\t", response);
        return response;
    })
    .catch((error) => {
        toastNotify(error);
        console.error(`Catching error:\t ${error}`);
    });

    return sdpCreateReqResponse;
};

router.post('/request/create', async (req, res) => {
    let {     
        supportRequestTitle,
        category,
        description,
        location,
        phoneExt,
        room,
        attachment 
    } = req.body;


    const sdpCreateReqResponse = await createSDPRequest();
    return res.json({ ...sdpCreateReqResponse });
});

module.exports = router;