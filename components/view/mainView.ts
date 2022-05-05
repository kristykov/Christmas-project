import AbstractPageView from "./abstractPageView";
import FilterView from "./filterView";
import CardsView from "./cardsView";
import AppController from '../controller/controller';
import App from "../app/app";

class MainView extends AbstractPageView {
    cardsView: CardsView;
    filterVeiw: FilterView;
    controller = new AppController();


    constructor(controller: AppController) {
        super();
        this.cardsView = new CardsView(controller);
        this.filterVeiw = new FilterView(controller);
        this.controller = controller;
        this.controller.subscribers.push(this.cardsView);
    }

    drawPage() {
        this.resetPageContainer();
        this.drawMainPage();
    }

    drawMainPage() {
        this.filterVeiw.draw(this.pageContainer);
        this.cardsView.draw(this.pageContainer);
    }

}

export default MainView;