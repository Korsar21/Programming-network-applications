const fileService = require('./fileService');

async function getAllReports(filters = {}) {
    const reports = await fileService.readReportsFile();

    let filteredReports = [...reports];

    if (filters.title) {
        filteredReports = filteredReports.filter(report =>
            report.title.toLowerCase().includes(filters.title.toLowerCase())
        );
    }

    if (filters.category) {
        filteredReports = filteredReports.filter(report =>
            report.category.toLowerCase() === filters.category.toLowerCase()
        );
    }

    if (filters.status) {
        filteredReports = filteredReports.filter(report =>
            report.status.toLowerCase() === filters.status.toLowerCase()
        );
    }

    return filteredReports;
}

async function getReportById(id) {
    const reports = await fileService.readReportsFile();
    return reports.find(report => report.id === id);
}

async function createReport(reportData) {
    const reports = await fileService.readReportsFile();

    const newId = reports.length > 0
        ? Math.max(...reports.map(report => report.id)) + 1
        : 1;

    const newReport = {
        id: newId,
        ...reportData
    };

    reports.push(newReport);
    await fileService.writeReportsFile(reports);

    return newReport;
}

async function updateReport(id, updateData) {
    const reports = await fileService.readReportsFile();
    const reportIndex = reports.findIndex(report => report.id === id);

    if (reportIndex === -1) {
        return null;
    }

    reports[reportIndex] = {
        ...reports[reportIndex],
        ...updateData,
        id
    };

    await fileService.writeReportsFile(reports);

    return reports[reportIndex];
}

async function deleteReport(id) {
    const reports = await fileService.readReportsFile();
    const reportIndex = reports.findIndex(report => report.id === id);

    if (reportIndex === -1) {
        return false;
    }

    reports.splice(reportIndex, 1);
    await fileService.writeReportsFile(reports);

    return true;
}

module.exports = {
    getAllReports,
    getReportById,
    createReport,
    updateReport,
    deleteReport
};