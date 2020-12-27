import { escape } from 'querystring';
import { request, Router } from 'express';

import fetch from 'node-fetch';

import rateLimiter from 'express-rate-limit';

const router = Router();

const limiter = rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 70 // limit each IP to 100 requests per windows
});

/* === CREATE INDIVIDUAL TICKET === */
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

/* === VIEW SINGLE USER REQUEST === */
const viewUserRequests = async (sdpName, requestType) => {
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
                "requester.name": sdpName,
                ...(requestType && { "status.name": requestType})
            },
            filter_by: {
                "name" : "All_Requests"
            }
        }
    };

    //"Cleaner" method of transforming an object into a query is illustrated here:"
    const query = Object.keys(requestDetails).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(requestDetails[key])}`).join('&');
    
   //TODO: Find way to remove spaces and line breaks encoded characters, as they are not needed; makes the request cleaner in the fetchURL
    const fetchURL = sdpReadRequestsURL + "?input_data=" + escape(JSON.stringify(requestDetails));

    console.log("Query String:\t", query);
    console.log("FetchURL:\t", fetchURL);

    let userRequests = await fetch(fetchURL, {
        method: 'GET',
        headers: sdpReadRequestsURLHeaders
    })
    .then((serverResponse) => serverResponse.json()) //Parse the JSON of the response
    .then((jsonResponse) => jsonResponse)
    .catch((error) => console.error(`Catching error:\t ${error}`) );

    return userRequests;
}; //end viewUserRequest

const getSDPUserInfo = async (email) => {
    const getSDPUserInfo_URL = `${process.env.SDP_URL}/api/v3/users`; 
    const getSDPUserInfo_Headers = {
        'Content-Type'      :   'application/x-www-form-urlencoded',
        'technician_key'    :   process.env.SDP_TECH_KEY
    };

    //Possible fields_required array values:
    /*
        "name",
        "is_technician",
        "citype",
        "login_name",
        "email_id",
        "department",
        "phone",
        "mobile",
        "jobtitle",
        "project_roles",
        "employee_id",
        "first_name",
        "middle_name",
        "last_name",
        "is_vipuser",
        "ciid"
    */
    const requestDetails = {
        list_info: {
            sort_field: "name",
            start_index: 1,
            sort_order: "asc",
            row_count: "50",
            get_total_count: true,
            search_fields: {
                email_id: email
            }
        },
        fields_required: [
            "name",
        ]
    };

    const fetchURL = getSDPUserInfo_URL + "?input_data=" + escape(JSON.stringify(requestDetails));

    let sdpName = await fetch(fetchURL, {
        method: 'GET',
        headers: getSDPUserInfo_Headers
    })
    .then((serverResponse) => serverResponse.json()) //Parse the JSON of the response
    .then((jsonResponse) => jsonResponse["users"][0])
    .then((user) => user.name)
    .catch((error) => console.error(`getSDPUserInfo() catching error:\t ${error}`) ); 

    return sdpName; 
};

router.get('/request/read/all/user', async (req, res) => {
    let userRequests, error, message = null;
    let { email, requestType } = req.body;

    email = "noreply@cvuhsd.org";
    requestType = "Closed";

    let sdpName    =   await getSDPUserInfo(email);

    if (sdpName) {
        userRequests = await viewUserRequests(sdpName, requestType);
        error   =   false;
    } else {
        error   =   true;
        message = `Could not find a user with the email: ${email}`;
    }
    
    return res.json({userRequests, message, error});
});

module.exports = router;