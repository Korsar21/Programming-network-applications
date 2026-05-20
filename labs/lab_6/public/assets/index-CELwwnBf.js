(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(r){if(r.ep)return;r.ep=!0;const n=t(r);fetch(r.href,n)}})();class m{constructor(e){this.parent=e}getHTML(e){return`
            <div class="report-card">
                <div class="report-card-body">
                    <h3 class="report-card-title">${e.title}</h3>
                    <p class="report-card-text">${e.summary}</p>

                    <div class="report-meta">
                        <span class="meta-pill">${e.period}</span>
                        <span class="meta-pill">${e.status}</span>
                        <span class="meta-pill">${e.category}</span>
                    </div>

                    <div class="card-actions">
                        <button class="button" id="open-report-${e.id}">Открыть</button>
                        <button class="button-secondary" id="edit-report-${e.id}">Редактировать</button>
                    </div>
                </div>
            </div>
        `}addListeners(e,t,s){document.getElementById(`open-report-${e.id}`).addEventListener("click",t),document.getElementById(`edit-report-${e.id}`).addEventListener("click",s)}render(e,t,s){this.parent.insertAdjacentHTML("beforeend",this.getHTML(e)),this.addListeners(e,t,s)}}class g{async get(e){const t=await fetch(e);return this._handleResponse(t)}async post(e,t){const s=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});return this._handleResponse(s)}async patch(e,t){const s=await fetch(e,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});return this._handleResponse(s)}async delete(e){const t=await fetch(e,{method:"DELETE"});return this._handleResponse(t)}async _handleResponse(e){let t=null;try{t=await e.json()}catch{t=null}return{data:t,status:e.status,ok:e.ok}}}const i=new g;class y{constructor(){this.baseUrl=""}getReports(e={}){const t=new URL(`${window.location.origin}/reports`);return e.title&&t.searchParams.set("title",e.title),e.category&&t.searchParams.set("category",e.category),e.status&&t.searchParams.set("status",e.status),t.toString()}getReportById(e){return`${this.baseUrl}/reports/${e}`}createReport(){return`${this.baseUrl}/reports`}updateReportById(e){return`${this.baseUrl}/reports/${e}`}deleteReportById(e){return`${this.baseUrl}/reports/${e}`}}const d=new y;class f{async getReports(e={}){return i.get(d.getReports(e))}async getReportById(e){return i.get(d.getReportById(e))}async createReport(e){return i.post(d.createReport(),e)}async updateReportById(e,t){return i.patch(d.updateReportById(e),t)}async deleteReportById(e){return i.delete(d.deleteReportById(e))}}const l=new f;class h{constructor(e){this.parent=e}getHTML(){return`
            <button id="back-button" class="button-secondary back-btn" type="button">
                ← Назад
            </button>
        `}addListeners(e){document.getElementById("back-button").addEventListener("click",e)}render(e){this.parent.insertAdjacentHTML("beforeend",this.getHTML()),this.addListeners(e)}}class v{constructor(e){this.parent=e}getHTML(e){return`
            <div class="detail-layout">
                <div class="detail-card">
                    <div class="detail-body">
                        <h2 class="detail-title">${e.title}</h2>

                        <div class="report-meta">
                            <span class="meta-pill">${e.period}</span>
                            <span class="meta-pill">${e.status}</span>
                            <span class="meta-pill">${e.category}</span>
                        </div>

                        <p class="detail-text">${e.summary}</p>

                        <div class="detail-actions">
                            <button class="button-secondary" id="edit-current-report">Редактировать</button>
                        </div>
                    </div>
                </div>

                <div class="summary-card">
                    <div class="summary-body">
                        <h3 class="report-card-title">Пояснение</h3>
                        <ul class="summary-list">
                            <li>На этой странице данные загружаются по API по id.</li>
                            <li>Кнопка редактирования открывает форму с уже заполненными полями.</li>
                            <li>В 5-й лабораторной кнопки сохранения нет.</li>
                        </ul>
                    </div>
                </div>
            </div>
        `}addListeners(e){document.getElementById("edit-current-report").addEventListener("click",e)}render(e,t){this.parent.insertAdjacentHTML("beforeend",this.getHTML(e)),this.addListeners(t)}}class u{constructor(e){this.parent=e}getHTML(e=null){const t=e||{title:"",category:"",status:"",period:"",summary:""};return`
            <div class="form-layout">
                <div class="form-card">
                    <div class="form-body">
                        <h2 class="detail-title">${e?"Редактирование отчёта":"Добавление отчёта"}</h2>
                        <p class="form-text">
                            В 5-й лабораторной форме уже можно вводить данные, но кнопка сохранения
                            и отправка на сервер появятся только в 6-й лабораторной.
                        </p>

                        <div class="form-grid">
                            <div class="form-field">
                                <label class="form-label" for="report-title">Название</label>
                                <input class="input" id="report-title" type="text" value="${t.title}">
                            </div>

                            <div class="form-field">
                                <label class="form-label" for="report-category">Категория</label>
                                <input class="input" id="report-category" type="text" value="${t.category}">
                            </div>

                            <div class="form-field">
                                <label class="form-label" for="report-status">Статус</label>
                                <input class="input" id="report-status" type="text" value="${t.status}">
                            </div>

                            <div class="form-field">
                                <label class="form-label" for="report-period">Период</label>
                                <input class="input" id="report-period" type="text" value="${t.period}">
                            </div>

                            <div class="form-field">
                                <label class="form-label" for="report-summary">Описание</label>
                                <textarea class="textarea" id="report-summary">${t.summary}</textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `}render(e){this.parent.insertAdjacentHTML("beforeend",this.getHTML(e))}}class c{constructor(e,t=null){this.parent=e,this.id=t}get pageRoot(){return document.getElementById("report-form-page")}getHTML(){return`
            <div class="container">
                <div id="report-form-page"></div>
            </div>
        `}clickBack(){new p(this.parent).render()}renderCreateForm(){new u(this.pageRoot).render(null)}async renderEditForm(){const{data:e,status:t}=await l.getReportById(this.id);if(t!==200||!e){this.pageRoot.insertAdjacentHTML("beforeend",'<div class="error-note">Не удалось загрузить данные для редактирования.</div>');return}new u(this.pageRoot).render(e)}render(){this.parent.innerHTML="",this.parent.insertAdjacentHTML("beforeend",this.getHTML()),new h(this.pageRoot).render(()=>this.clickBack()),this.id?this.renderEditForm():this.renderCreateForm()}}class b{constructor(e,t){this.parent=e,this.id=t}get pageRoot(){return document.getElementById("report-page")}getHTML(){return`
            <div class="container">
                <div id="report-page"></div>
            </div>
        `}clickBack(){new p(this.parent).render()}async render(){this.parent.innerHTML="",this.parent.insertAdjacentHTML("beforeend",this.getHTML()),new h(this.pageRoot).render(()=>this.clickBack());const{data:t,status:s}=await l.getReportById(this.id);if(s!==200||!t){this.pageRoot.insertAdjacentHTML("beforeend",'<div class="error-note">Не удалось загрузить отчёт по id.</div>');return}new v(this.pageRoot).render(t,()=>{new c(this.parent,this.id).render()})}}class p{constructor(e){this.parent=e}get pageRoot(){return document.getElementById("main-page")}getHTML(){return`
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
                    <h2 class="hero-title">Отчёты лунной ресурсной программы</h2>
                    <p class="hero-text">
                        Каталог аналитических материалов по добыче и использованию ресурсов на Луне.
                    </p>
                </section>

                <section class="section">
                    <h2 class="section-title">Список отчётов</h2>
                    <p class="section-text">
                        Просмотр, фильтрация и переход к карточкам отчётов.
                    </p>

                    <div class="toolbar">
                        <input class="input" id="filter-title" type="text" placeholder="Введите название отчёта">
                        <button class="button" id="filter-button">Фильтровать</button>
                        <button class="button-secondary" id="reset-button">Сбросить</button>
                        <button class="button-secondary" id="add-button">Добавить отчёт</button>
                    </div>

                    <div id="request-error" class="error-note"></div>
                    <div id="main-page" class="cards-grid"></div>
                </section>
            </div>
        `}bindToolbar(){document.getElementById("filter-button").addEventListener("click",()=>{const e=document.getElementById("filter-title").value.trim();this.loadReports({title:e})}),document.getElementById("reset-button").addEventListener("click",()=>{document.getElementById("filter-title").value="",this.loadReports({})}),document.getElementById("add-button").addEventListener("click",()=>{new c(this.parent,null).render()})}setError(e){const t=document.getElementById("request-error");t&&(t.textContent=e||"")}async loadReports(e={}){this.pageRoot.innerHTML="",this.setError("");const{data:t,status:s}=await l.getReports(e);if(s!==200){this.setError("Ошибка загрузки данных.");return}if(!Array.isArray(t)||t.length===0){this.pageRoot.innerHTML='<div class="info-note">По заданному фильтру записи не найдены.</div>';return}t.forEach(r=>{new m(this.pageRoot).render(r,()=>{new b(this.parent,r.id).render()},()=>{new c(this.parent,r.id).render()})})}render(){this.parent.innerHTML="",this.parent.insertAdjacentHTML("beforeend",this.getHTML()),this.bindToolbar(),this.loadReports({})}}const R=document.getElementById("root"),L=new p(R);L.render();
