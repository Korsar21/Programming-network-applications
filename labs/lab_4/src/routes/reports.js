const express = require('express');
const reportsController = require('../controllers/reportsController');

const router = express.Router();

router.get('/', reportsController.getAllReports);
router.get('/:id', reportsController.getReportById);
router.post('/', reportsController.createReport);
router.patch('/:id', reportsController.updateReport);
router.delete('/:id', reportsController.deleteReport);

module.exports = router;