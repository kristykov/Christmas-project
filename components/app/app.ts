import AppController from '../controller/controller';
import AppView from '../view/appView';

class App {
    controller: AppController;
    view: AppView;
    mainBtn: HTMLElement;
    favBtn: HTMLElement;
    logostartBtn: HTMLElement;
    startBtn: HTMLElement;


    constructor() {
        this.controller = new AppController();
        this.view = new AppView(this.controller);
        this.logostartBtn = document.getElementById('logo-start-btn') as HTMLElement;
        this.startBtn = document.querySelector('.start-btn') as HTMLElement;
        this.mainBtn = document.getElementById('main-btn') as HTMLElement;
        this.favBtn = document.getElementById('fav-btn') as HTMLElement;
        this.init();
    }

    init() {

        this.logostartBtn.addEventListener('click', () => this.view.drawStartView());
        this.mainBtn.addEventListener('click', () => this.startMainPage());
        this.favBtn.addEventListener('click', () => this.view.drawFavView());
    }

    start() {
        this.view.drawStartView();
    }

    startMainPage() {
        const data = this.controller.getFilteredData([]);
        this.view.mainView.cardsView.setData(data);
        this.view.drawMainView();
    }
}

export default App;