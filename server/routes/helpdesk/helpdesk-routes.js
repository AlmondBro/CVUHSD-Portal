import { Router } from 'express';
import isDev from 'isdev';

import fetch from 'node-fetch';

const router = Router();

const createSDPRequest = async (
    email,
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

    const request_details = {
        request: {
            subject: supportRequestTitle || "Test Ticket 3",
            description:  description || "Test Ticket 3",
            requester: {
                //name: "Lopez, Juan David",
                email_id: email,
            },
            site: { 
                name: location || "Lawndale High School"
            },
            category: {
                name: category || "Computer Issue"
            },
            status: {
                name: "Open"
            },
            // phone: "(310) 263-3288",
            // profile_pic_url: "https://www.zooborns.com/.a/6a010535647bf3970b015433fc97e2970c-500wi"
        }
    };

    let sdpCreateReqResponse = await fetch(sdpCreateRequestsURL, {
        method: 'POST',
        headers: sdpCreateRequestsURLHeaders,
        body: `input_data=${JSON.stringify(request_details)}`
    })
    .then((serverResponse) => serverResponse.json()) //Parse the JSON of the response
    .then((jsonResponse) => jsonResponse)
    .catch((error) => {
        console.error(`Catching error:\t ${error}`);
    });

    return sdpCreateReqResponse;
};

router.post('/request/create', async (req, res) => {
    let {   
        email,  
        supportRequestTitle,
        category,
        description,
        location,
        phoneExt,
        room,
        attachment 
    } = req.body;

    const sdpCreateReqResponse = await createSDPRequest(
                                    email,
                                    supportRequestTitle,
                                    category,
                                    description,
                                    location,
                                    phoneExt,
                                    room,
                                    attachment );
    return res.json({ ...sdpCreateReqResponse });
});

module.exports = router;