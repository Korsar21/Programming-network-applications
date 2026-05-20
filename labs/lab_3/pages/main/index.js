import { ReportCardComponent } from "../../components/report-card/index.js";
import { ReportPage } from "../report/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    getData() {
        return [
            {
                id: 1,
                modelType: "oxygen",
                title: "Отчёт: добыча кислорода из реголита",
                description: "Аналитический обзор технологий извлечения кислорода из лунного грунта для жизнеобеспечения баз и топливных систем.",
                period: "I квартал 2035",
                status: "Новый отчёт",
                metric: "Выход O₂: 18.4%"
            },
            {
                id: 2,
                modelType: "metal",
                title: "Отчёт: извлечение алюминия и железа",
                description: "Сводка по получению конструкционных металлов из реголита для производства деталей, каркасов и защитных оболочек на поверхности Луны.",
                period: "II квартал 2035",
                status: "Проверено",
                metric: "Металлы: Al / Fe"
            },
            {
                id: 3,
                modelType: "habitat",
                title: "Отчёт: строительные материалы из реголита",
                description: "Материал о получении базовых строительных смесей и защитных блоков для экранов от радиации и возведения инфраструктуры.",
                period: "III квартал 2035",
                status: "В разработке",
                metric: "TRL: 5 → 6"
            }
        ];
    }

    get pageRoot() {
        return document.getElementById("main-page");
    }

    getHTML() {
        return `
            <header class="site-header">
                <div class="container">
                    <div class="site-header-inner">
                        <h1 class="site-title">Отчёты по добыче ресурсов на Луне</h1>
                    </div>
                </div>
            </header>

            <div class="header-line"></div>

            <div class="container">
                <section class="hero-section">
                    <div class="hero-badge">Moon Resource Intelligence Platform</div>
                    <h2 class="hero-title">Powering the future of lunar industry</h2>
                    <p class="hero-text">
                        Аналитические материалы по добыче кислорода, металлов и строительных ресурсов
                        из лунного реголита в визуальном стиле космической технологической платформы.
                    </p>
                </section>

                <section class="pb-5">
                    <h2 class="section-title">Актуальные отчёты</h2>
                    <p class="section-text">
                        На карточках показано 3D-превью по теме каждого отчёта. Нажатие открывает детальную страницу
                        с расширенным описанием и интерактивной 3D-сценой.
                    </p>
                    <div id="main-page" class="cards-row"></div>
                </section>
            </div>
        `;
    }

    clickCard(id) {
        const reportPage = new ReportPage(this.parent, id);
        reportPage.render();
    }

    render() {
        this.parent.innerHTML = "";
        this.parent.insertAdjacentHTML("beforeend", this.getHTML());

        const data = this.getData();

        data.forEach(item => {
            const card = new ReportCardComponent(this.pageRoot);
            card.render(item, () => this.clickCard(item.id));
        });
    }
}