import { initDetailViewer } from "../../three/sceneFactory.js";

export class ReportDetailComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getAccordionHTML(data) {
        return `
            <div class="accordion mt-4" id="reportAccordion">
                ${data.sections.map((section, index) => `
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="heading-${index}">
                            <button class="accordion-button ${index !== 0 ? "collapsed" : ""}" type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapse-${index}"
                                aria-expanded="${index === 0 ? "true" : "false"}"
                                aria-controls="collapse-${index}">
                                ${section.title}
                            </button>
                        </h2>
                        <div id="collapse-${index}"
                             class="accordion-collapse collapse ${index === 0 ? "show" : ""}"
                             aria-labelledby="heading-${index}"
                             data-bs-parent="#reportAccordion">
                            <div class="accordion-body">
                                ${section.text}
                            </div>
                        </div>
                    </div>
                `).join("")}
            </div>
        `;
    }

    getHTML(data) {
        return `
            <h1 class="section-title mb-3">Карточка отчёта</h1>
            <p class="section-text">
                Ниже представлена расширенная информация по выбранному направлению освоения ресурсов Луны.
            </p>

            <div class="detail-layout">
                <div class="detail-card">
                    <div class="detail-preview" id="detail-preview"></div>
                    <div class="detail-body">
                        <h2 class="detail-title">${data.title}</h2>
                        <div class="report-meta">
                            <span class="meta-pill">${data.period}</span>
                            <span class="meta-pill">${data.status}</span>
                            <span class="meta-pill">${data.metric}</span>
                        </div>
                        <p class="detail-text">${data.description}</p>
                        ${this.getAccordionHTML(data)}
                        <p class="viewer-note">
                            3D-сцену можно вращать мышью. Масштаб и ракурс управляются через OrbitControls.
                        </p>
                    </div>
                </div>

                <div class="summary-card">
                    <div class="summary-body">
                        <h3 class="mb-3">Основные тезисы</h3>
                        <ul class="summary-list">
                            ${data.bullets.map(item => `<li>${item}</li>`).join("")}
                        </ul>
                        <p class="footer-note">
                            Демо-страница оформлена как витрина аналитических отчётов по освоению ресурсов лунной поверхности.
                        </p>
                    </div>
                </div>
            </div>
        `;
    }

    initViewer(data) {
        const container = document.getElementById("detail-preview");
        initDetailViewer(container, data.modelType);
    }

    render(data) {
        this.parent.insertAdjacentHTML("beforeend", this.getHTML(data));
        this.initViewer(data);
    }
}