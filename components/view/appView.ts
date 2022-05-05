import data from '../../data.js';
import StartView from "./startView";
import MainView from "./mainView";
import FavView from "./favView";
import AbstractPageView from './abstractPageView.js';
import AppController from '../controller/controller.js';

class AppView {
    startView: StartView;
    mainView: MainView;
    favView: FavView;
    currentView: AbstractPageView;
    private controller: AppController;

    constructor(controller: AppController) {
        this.startView = new StartView(controller);
        this.mainView = new MainView(controller);
        this.favView = new FavView(controller);
        this.currentView = this.startView;
        this.controller = controller;
    }

    drawStartView() {
        this.currentView = this.startView;
        this.startView.drawPage();
        (document.querySelector('.start-btn') as HTMLElement).addEventListener('click', () => {
            const data = this.controller.getFilteredData([]);
            this.mainView.cardsView.setData(data);
            this.drawMainView();
        });
    }

    drawMainView() {
        this.currentView = this.mainView;
        this.mainView.drawPage();
    }

    drawFavView() {
        this.currentView = this.favView;
        this.favView.drawPage();
    }
}

export default AppView;