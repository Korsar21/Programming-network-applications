export class ProductComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="card mt-3">
                <img class="card-img-top" src="${data.src}" alt="${data.title}">
                <div class="card-body">
                    <h2 class="card-title">${data.title}</h2>
                    <p class="card-text">${data.text}</p>
                    <p class="card-text">ID товара: ${data.id}</p>
                </div>
            </div>
        `;
    }

    render(data) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
    }
}