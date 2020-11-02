import { Router } from 'express';
import isDev from 'isdev';

const router = Router();

router.post('/request/create', (req, res) => {
    let {     
        supportRequestTitle,
        category,
        description,
        location,
        phoneExt,
        room,
        attachment 
    } = req.body;
});

module.exports = router;