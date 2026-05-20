import { initCardPreview } from "../../three/sceneFactory.js";

export class ReportCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="report-card">
                <div class="card-preview" id="card-preview-${data.id}"></div>
                <div class="report-card-body">
                    <h3 class="report-card-title">${data.title}</h3>
                    <p class="report-card-text">${data.description}</p>

                    <div class="report-meta">
                        <span class="meta-pill">${data.period}</span>
                        <span class="meta-pill">${data.status}</span>
                        <span class="meta-pill">${data.metric}</span>
                    </div>

                    <button class="btn btn-outline-light w-100" id="open-report-${data.id}">
                        Открыть отчёт
                    </button>
                </div>
            </div>
        `;
    }

    addListeners(data, listener) {
        document
            .getElementById(`open-report-${data.id}`)
            .addEventListener("click", listener);
    }

    initPreview(data) {
        const container = document.getElementById(`card-preview-${data.id}`);
        initCardPreview(container, data.modelType);
    }

    render(data, listener) {
        this.parent.insertAdjacentHTML("beforeend", this.getHTML(data));
        this.addListeners(data, listener);
        this.initPreview(data);
    }
}