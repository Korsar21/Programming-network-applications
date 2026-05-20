import { ajax } from './ajax.js';
import { reportUrls } from './reportUrls.js';

class ReportApi {
    async getReports(filters = {}) {
        return ajax.get(reportUrls.getReports(filters));
    }

    async getReportById(id) {
        return ajax.get(reportUrls.getReportById(id));
    }

    async createReport(data) {
        return ajax.post(reportUrls.createReport(), data);
    }

    async updateReportById(id, data) {
        return ajax.patch(reportUrls.updateReportById(id), data);
    }

    async deleteReportById(id) {
        return ajax.delete(reportUrls.deleteReportById(id));
    }
}

export const reportApi = new ReportApi();