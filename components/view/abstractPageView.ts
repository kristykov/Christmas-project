abstract class AbstractPageView {
    pageContainer: HTMLTemplateElement;

    constructor() {
        this.pageContainer = document.getElementById("page-container") as HTMLTemplateElement;
    }

    abstract drawPage(): void;

    resetPageContainer() {
        this.pageContainer.innerHTML = "";
        this.pageContainer.style.width = '95%';
        this.pageContainer.classList.add("container");
    }

}

export default AbstractPageView;