import express from 'express';

import * as shiftsService from '../services/shiftsService.js';

const router = express.Router();

// GET all shifts
router.get('/', async (req, res) => {
  const shifts = await shiftsService.getShifts();
  res.send({success: true, data: shifts});
});

// ADD new shift
router.post('/', async (req, res) => {
  const shift = req.body;
  try {
    const resp = await shiftsService.addShift(shift);
    if(resp) {
      return res.send({success: true, data: "Successfully shift added"});
    } else {
      return res.send({success: false, data: "Can't add shift"});
    }
  } catch (error) {
    return res.send({success: false, data: error});
  }
});

// UPDATE shift
router.post('/:id', async (req, res) => {
  const {id} = req.params;
  const shift = req.body;

  try {
    const resp = await shiftsService.updateShift(id, shift);
    if(resp) {
      return res.send({success: true, data: "Successfully shift updated"});
    } else {
      return res.send({success: false, data: "Can't update Shift"});
    }
  } catch (error) {
    return res.send({success: false, data: error});
  }
});

export default router;