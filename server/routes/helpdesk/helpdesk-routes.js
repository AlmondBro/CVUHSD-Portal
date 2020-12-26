import { Router } from 'express';
import fetch from 'node-fetch';

import rateLimiter from 'express-rate-limit';

const router = Router();

const limiter = rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 70 // limit each IP to 100 requests per windows
});

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
    
    const requestDetails = {
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

    const sdpCreateReqResponse = await fetch(sdpCreateRequestsURL, {
        method: 'POST',
        headers: sdpCreateRequestsURLHeaders,
        body: `input_data=${JSON.stringify(requestDetails)}`
    })
    .then((serverResponse) => serverResponse.json()) //Parse the JSON of the response
    .then((jsonResponse) => jsonResponse)
    .catch((error) => {
        console.error(`Catching error:\t ${error}`);
    });

    return sdpCreateReqResponse;
};

//router.use(limiter);

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

const viewUserRequests = async (email) => {
    const sdpReadRequestsURL = `${process.env.SDP_URL}/api/v3/requests`; 

    const sdpReadRequestsURLHeaders = {
        'Content-Type'      :   'application/x-www-form-urlencoded',
        'technician_key'    :   process.env.SDP_TECH_KEY
    };

    const requestDetails = {
        list_info: {
            row_count: 20,
            start_index: 1,
            sort_field: "subject",
            sort_order: "asc",
            get_total_count: true,
            search_fields: {
                "requester.name": "Lopez, Juan David"
            },
            filter_by: {
                "name" : "All_Requests"
            }
        }
    };

    //One way of extracting the keys from the requestDetails Object is via a for in loop
    var formBody = [];
    for (var p in requestDetails) {
      var encodedKey = encodeURIComponent(p);
      var encodedValue = encodeURIComponent(requestDetails[p]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    console.log("formBody:\t", formBody);

    //"Cleaner" method of transforming an object into a quert is illustrated here:"
    const query = Object.keys(requestDetails).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(requestDetails[key])}`).join('&');
    const hardCodedQueryString = "{\n    \"list_info\": {\n        \"row_count\": 20,\n        \"start_index\": 1,\n        \"sort_field\": \"subject\",\n        \"sort_order\": \"asc\",\n        \"get_total_count\": true,\n        \"search_fields\": {\n            \"requester.name\": \"Lopez, Juan David\"\n        },\n        \"filter_by\": {\n            \"name\": \"All_Requests\"\n        }\n    }\n}";
    
    const fetchURL = sdpReadRequestsURL + "?input_data=" + hardCodedQueryString;

    console.log("Query String:\t", JSON.stringify(hardCodedQueryString));
    console.log("FetchURL:\t", fetchURL);

    let userRequests = await fetch(fetchURL, {
        method: 'GET',
        headers: sdpReadRequestsURLHeaders
    })
    .then((serverResponse) => serverResponse.json()) //Parse the JSON of the response
    .then((jsonResponse) => jsonResponse)
    .catch((error) => {
        console.error(`Catching error:\t ${error}`);
    });

    return userRequests;
}; //end viewUserRequest

router.get('/request/read/all/user', async (req, res) => {
    const { email } = req.body;

    let userRequests = await viewUserRequests(email);

    return res.json({...userRequests});
});

module.exports = router;