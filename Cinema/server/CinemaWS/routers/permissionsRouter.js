import express, { request } from 'express';

import * as permissionsServices from "../srevices/permissionsServices.js";

const router = express.Router();

// Entry point: http://localhost:3000/permissions

router.get('/', async (req, res) => {
    try {
        const permissions = await permissionsServices.getEmployeesPermissions();
        
        res.send({status: true, data: permissions});
    } catch (error) {
        res.send({ status: false, data: error.message });
    }
});

export default router;