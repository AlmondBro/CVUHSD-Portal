import { Router } from 'express';
import fetch from 'node-fetch';

import rateLimiter from 'express-rate-limit';

const router = Router();

const limiter = rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 70 // limit each IP to 100 requests per windows
}); //en

const createSDPRequest = async (
    fullName,
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

    console.log("\ncategory:\t", category);
    
    const request_details = {
        request: {
            subject: supportRequestTitle,
            description:  description,
            requester: {
                name: fullName || email,
                email_id: email 
            },
            site: { 
                name: location 
            },
            template: {
                name: "Helpdesk Ticket",
            },
            udf_fields: {
                udf_pick_301: location,
                udf_sline_601: phoneExt, 
                udf_sline_302: room 
            },
            category: {
                name: category || "Student Chromebook"
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

router.use(limiter);

router.post('/request/create', async (req, res) => {
    let {   
        fullName,
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
                                    fullName,
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