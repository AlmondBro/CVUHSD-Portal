import { request, Router } from 'express';
import fetch from 'node-fetch';

import { escape } from 'querystring';

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

var objectToQueryString = function (a) {
    var prefix, s, add, name, r20, output;
    s = [];
    r20 = /%20/g;
    add = function (key, value) {
        // If value is a function, invoke it and return its value
        value = ( typeof value == 'function' ) ? value() : ( value == null ? "" : value );
        s[ s.length ] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
    };
    if (a instanceof Array) {
        for (name in a) {
            add(name, a[name]);
        }
    } else {
        for (prefix in a) {
            buildParams(prefix, a[ prefix ], add);
        }
    }
    output = s.join("&").replace(r20, "+");
    return output;
};

function encode(queryObj, nesting = "") {
    let queryString = "";
  
    const pairs = Object.entries(queryObj).map(([key, val]) => {
      // Handle the nested, recursive case, where the value to encode is an object itself
      if (typeof val === "object") {
        return encode(val, nesting + `${key}.`);
      } else {
        // Handle base case, where the value to encode is simply a string.
        return [nesting + key, val].map(escape).join("=");
      }
    });
    return pairs.join("&");
};

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
                "requester.name": "lopezj@centinela.k12.ca.us"
            },
            filter_by: {
                "name" : "All_Requests"
            }
        }
    };

    //"Cleaner" method of transforming an object into a quert is illustrated here:"
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
    .catch((error) => {
        console.error(`Catching error:\t ${error}`);
    });

    return userRequests;
}; //end viewUserRequest

const getSDPUserID = async (email) => {
    const getAllSDPUsersURL = `${process.env.SDP_URL}/api/v3/requests`; 
    const getAllSDPUsersHeaders = {
        'Content-Type'      :   'application/x-www-form-urlencoded',
        'technician_key'    :   process.env.SDP_TECH_KEY
    };

    const fetchURL = sdpReadRequestsURL + "?input_data=" + hardCodedQueryString;

    let sdpUserID = await fetch(fetchURL, {
        method: 'GET',
        headers: getAllSDPUsersHeaders
    })
    .then((serverResponse) => serverResponse.json()) //Parse the JSON of the response
    .then((jsonResponse) => jsonResponse)
    .catch((error) => {
        console.error(`Catching error:\t ${error}`);
    }); 
};

router.get('/request/read/all/user', async (req, res) => {
    const { email } = req.body;

    let userRequests = await viewUserRequests(email);

    return res.json({...userRequests});
});

module.exports = router;