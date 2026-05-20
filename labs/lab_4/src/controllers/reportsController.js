const reportsService = require('../services/reportsService');

async function getAllReports(req, res, next) {
    try {
        const { title, category, status } = req.query;

        const reports = await reportsService.getAllReports({
            title,
            category,
            status
        });

        res.status(200).json(reports);
    } catch (error) {
        next(error);
    }
}

async function getReportById(req, res, next) {
    try {
        const id = Number(req.params.id);
        const report = await reportsService.getReportById(id);

        if (!report) {
            return res.status(404).json({
                message: 'Отчёт не найден'
            });
        }

        res.status(200).json(report);
    } catch (error) {
        next(error);
    }
}

async function createReport(req, res, next) {
    try {
        const { title, category, status, period, summary } = req.body;

        if (!title || !category || !status || !period || !summary) {
            return res.status(400).json({
                message: 'Не заполнены обязательные поля'
            });
        }

        const newReport = await reportsService.createReport({
            title,
            category,
            status,
            period,
            summary
        });

        res.status(201).json(newReport);
    } catch (error) {
        next(error);
    }
}

async function updateReport(req, res, next) {
    try {
        const id = Number(req.params.id);
        const updatedReport = await reportsService.updateReport(id, req.body);

        if (!updatedReport) {
            return res.status(404).json({
                message: 'Отчёт не найден'
            });
        }

        res.status(200).json(updatedReport);
    } catch (error) {
        next(error);
    }
}

async function deleteReport(req, res, next) {
    try {
        const id = Number(req.params.id);
        const isDeleted = await reportsService.deleteReport(id);

        if (!isDeleted) {
            return res.status(404).json({
                message: 'Отчёт не найден'
            });
        }

        res.status(204).send();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllReports,
    getReportById,
    createReport,
    updateReport,
    deleteReport
};