import { escape } from 'querystring';
import { Router } from 'express';

import fetch from 'node-fetch';

import rateLimiter from 'express-rate-limit';
import nodemailer from 'nodemailer';

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

/* === GET INDIVIDUAL REQUEST DETAILS === */
const getSingleRequestDetails = async (id) => {
    console.log("\n\n\getSingleReqDetails() singleReq ID:\t", id);

    const sdpReadRequestsURL = `${process.env.SDP_URL}/api/v3/requests/${id}`; 

    const sdpReadRequestsURLHeaders = {
        'Content-Type'      :   'application/x-www-form-urlencoded',
        'technician_key'    :   process.env.SDP_TECH_KEY
    };

    let getSingleReqInfo = await fetch(sdpReadRequestsURL, {
        method: 'GET',
        headers: sdpReadRequestsURLHeaders
    })
    .then((serverResponse) => serverResponse.json()) //Parse the JSON of the response
    .then((jsonResponse) => jsonResponse)
    .catch((error) => console.error(`Catching error:\t ${error}`) );

    return getSingleReqInfo;
}; //end getSingleRequestDetails()


router.get('/request/read/:id', async (req, res) => {
    const { id } = req.params;

    let requestInfo = "";
    let message = "";
    let error = null;

    let requestDetails = await getSingleRequestDetails(id);

    const { response_status, request } = requestDetails;
    const status = response_status.status;

    if (requestDetails && status === "success") {
        message = "Success getting request details";
        requestInfo = request;
        error = false;
    } else {
        message = response_status.messages[0].message;
        error = true;
    }

    return res.json({ requestInfo, message, error});
});

/* === GET INDIVIDUAL REQUEST CONVOS' DETAILS === */
const getSingleRequestConvoDetails = async (id) => {
    const params = {
        OPERATION_NAME : "GET_ALL_CONVERSATIONS",
        format          : "json"
    };

    const query = "?" + Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`).join('&');

    const sdpRequestConvosURL = `${process.env.SDP_URL}/sdpapi/request/${id}/allconversation`; 

    const sdpRequestConvosHeaders = {
        'Content-Type'      :   'application/x-www-form-urlencoded',
        'technician_key'    :   process.env.SDP_TECH_KEY
    };


    let getSingleReqInfo = await fetch(sdpRequestConvosURL + query, {
        method: 'GET',
        headers: sdpRequestConvosHeaders
    })
    .then((serverResponse) => { 
        console.log(serverResponse); 
        return serverResponse.json();  
    }) //Parse the JSON of the response
    .then((jsonResponse) => jsonResponse)
    .catch((error) => console.error(`Catching error:\t ${error}`) );

    return getSingleReqInfo;
}; //end getSingleRequestDetails()


router.get('/request/get-convos/:id', async (req, res) => {
    const { id } = req.params;

    let convos = [];
    let requestDetails = await getSingleRequestConvoDetails(id);

    let message, error = null;


    if (requestDetails.operation.result.status === "Success") {
        error = null;
        message  = requestDetails.operation.result.message;

        convos =    requestDetails.operation.details;
    } else {
        error = true;
        message = `Could not fetch request with ID ${id}'s convos`;
    }

    return res.json({convos, message, error});
});

/* === OLD REPLY TO REQUEST === */
/* 
    Reply to a request using the public SDP API. However, the requester name will 
    always be the technician; this is a limitation with the public API as there is 
    for a non-technician request's name to appear.
*/
/*
const sdpReplyToReq = async (id, title, emailTo, description) => {
    let replyTo = emailTo || "lopezj@centinela.k12.ca.us";
    let cc      = emailTo || "lopezj@centinela.k12.ca.us";
    let subject = title ||"View Requests Open Ticket";

    const sdpReplyURL = `${process.env.SDP_URL}/sdpapi/request/${id}/`; 
    const sdpReplyHeaders = {
        'Content-Type'      :   'application/x-www-form-urlencoded',
        'technician_key'    :   process.env.SDP_TECH_KEY
    };

    const inputData = {
        operation: {
            details: {
                to: replyTo,
                cc: cc,
                subject: subject,
                description: description || "No reply description provided"
            }
        }
    }; //end inputData object

    const params = {
        OPERATION_NAME  : "REPLY_REQUEST",
        format          : "json"
    };  //end params object

    const query = "?" + Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`).join('&');

    const fetchUrl = sdpReplyURL + query + `&INPUT_DATA=${escape(JSON.stringify(inputData))}`;

    const sdpReplyResponse = await fetch(fetchUrl, {
        method: 'POST',
        headers: sdpReplyHeaders,
    })
    .then((serverResponse) => serverResponse.json()) //Parse the JSON of the response
    .then((jsonResponse) => jsonResponse)
    .catch((error) => {
        console.error(`Catching error:\t ${error}`);
    });

    console.log("fetchUrl:\t", fetchUrl);
    console.log(sdpReplyResponse);
    return sdpReplyResponse;
}; //end getSingleRequestDetails()

router.post('/request/:id/reply', async (req, res) => {
    const { id } = req.params;
    const { subject, description, email } = req.body;

    let message, error = null;

    let replyResp = await sdpReplyToReq(id, subject, email, description);

    if (replyResp.operation.result.status === "Success") {
        error = null;
        message  = replyResp.operation.result.message;
    } else {
        error = true;
        message = `Could not reply to request with ID ${id}'s convos. Error message: ${replyResp.operation.result.message}`;
    }

    return res.json({ message, error });
});
*/

const sendEmail = async (from, to, subject, description) => {
    // /*
    try {
      // Create a transporter
      let transporter = nodemailer.createTransport({
        host: process.env.MAIL_SERVER,
        port: process.env.MAIL_PORT,
        auth: {
          user: process.env.REPLY_ACCOUNT,
          pass: process.env.REPLY_PASSWORD,
        },
      });
  
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: from, // sender address
        to: process.env.HELPDESK_EMAIL, // list of receivers
        subject: subject, // Subject line
        text: description, // plain text body
        // html: {
        //   path: path.resolve(__dirname, "../template/mail.html"),
        // }, // html body
      });
  
      console.log(`Message sent: ${info.messageId}`);
      return true;
    } catch (error) {
      console.error(error);

      return false; 
    //   throw new Error(
    //     `Something went wrong in the sendmail method. Error: ${error.message}`
    //   );
    } //end catch block
   // */
   
}; //end sendEmail() 

router.post('/request/:id/reply', async (req, res) => {
    const { id } = req.params;
    const { subject, description, email, techEmail } = req.body;

    const from = email;
    const to   = techEmail;

    let message = null;
    let error = null;

    let replyResp;
    // /*
    try {
        let replyResp = await sendEmail(from, to, subject, description);

        if (replyResp) {
            error = false;
            message  = replyResp.operation.result.message;
        } else {
            error = true;
            message = `Could not reply to request with ID ${id}'s convos. Error message: ${replyResp.operation.result.message}`;
        }
    } catch (error) {
        replyResp = "";
        error = true;
        message = error.message;
    } //end catch() block
//*/
    return res.json({ replyResp, message, error });
});

/* === VIEW SINGLE USER REQUEST === */
const viewUserRequests = async (sdpName, requestType) => {
    const sdpReadRequestsURL = `${process.env.SDP_URL}/api/v3/requests`; 

    const sdpReadRequestsURLHeaders = {
        'Content-Type'      :   'application/x-www-form-urlencoded',
        'technician_key'    :   process.env.SDP_TECH_KEY
    };

    if (requestType === "All") {
        requestType = null;
    }

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


/* === READ ALL USERS === */
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


router.post('/request/read/all/user', async (req, res) => {
    let userRequests, error, message = null;
    let { email, requestsType } = req.body;

    let sdpName =   await getSDPUserInfo(email);

    if (sdpName) {
        userRequests = await viewUserRequests(sdpName, requestsType);
        error   =   false;
    } else {
        error   =   true;
        message = `Could not find a user with the email: ${email}`;
    }
    
    console.log("user requests:\t", userRequests);
    return res.json({...userRequests, message, error});
});

module.exports = router;