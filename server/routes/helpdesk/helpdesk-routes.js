import { Router } from 'express';
import isDev from 'isdev';

import fetch from 'node-fetch';

const router = Router();

const createSDPRequest = async ()  => {
    /* //Headers:
    'Content-Type': 'application/json',
        'credentials': 'include',
        'Access-Control-Allow-Origin': '*',
    */
    const sdpCreateRequestsURL = `${process.env.SDP_URL}/api/v3/requests`; 

    const sdpCreateRequestsURLHeaders = {
        'Content-Type'      : 'application/json',
        'technician_key'    :   process.env.SDP_TECH_KEY
    };

    const input_data = {
        request: {
            subject: "Test Ticket",
            description: "Test Ticket",
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
        body: JSON.stringify(input_data)
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