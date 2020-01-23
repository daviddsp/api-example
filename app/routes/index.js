const express = require('express');
const router = express.Router();

const ctrl =require('../controllers');

router.get('/init', ctrl.init);
router.get('/get-claims', ctrl.get);
router.post('/create-claims', ctrl.create);

module.exports = router;