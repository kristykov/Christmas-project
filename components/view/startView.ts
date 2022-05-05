import AbstractPageView from "./abstractPageView";
import AppController from '../controller/controller';
import AppView from '../view/appView';


class StartView extends AbstractPageView {
    private controller: AppController;
    constructor(controller: AppController) {
        super();
        this.controller = controller;
    }

    drawPage() {
        this.resetPageContainer();
        this.drawStartPage();

    }

    drawStartPage() {
        this.pageContainer.style.width = '100%';
        this.pageContainer.innerHTML += `<div class="page start-page ">
        <div class="ball ball1"></div>
        <div class="ball ball2"></div>
        <h1 class="start-page-title">
            Help your grandma to
            <span>decorate a Christmas Tree</span>
        </h1>
        <button class="start-btn">Start</button>
    </div>`;
    }
}

export default StartView;