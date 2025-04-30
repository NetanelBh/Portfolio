import express from "express";
import * as subscriptionsServices from '../services/subscriptionsServices.js';

const router = express.Router();

// Entry point: http://localhost:3001/subscriptions

router.get("/get", async (req, res) => {
    try {
        const resp = await subscriptionsServices.getSubscriptions();        
        if (resp) {
            res.send({status: true, data: resp});
        } else {
            res.send({status: false, data: "No subscriptions found."});
        }
    } catch (error) {
        res.send({status: false, data: error.message});
    }
});

router.get("/get/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const resp = await subscriptionsServices.getSubscriptionById(id);
        if (resp) {
            res.send({status: true, data: resp});
        } else {
            res.send({status: false, data: "No subscriptions found."});
        }
    } catch (error) {
        res.send({status: false, data: error.message});
    }
});

router.post('/add', async (req, res) => {
    const subscription = req.body;
    
    try {
        const resp = await subscriptionsServices.addSubscription(subscription);
        res.send({status: true, data: resp});
    } catch (error) {
        res.send({status: false, data: error.message});
    }
});

router.patch('/update', async (req, res) => {
    try {
        const resp = await subscriptionsServices.updateSubscriptions(req.body);
        res.send({status: true, data: resp});
    } catch (error) {
        res.send({status: false, data: error.message});
    }
});

router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await subscriptionsServices.deleteSubscription(id);
        res.send({status: true, data: 'Subscription deleted successfully'});
    } catch (error) {
        res.send({status: false, data: error.message});
    }
});

export default router;