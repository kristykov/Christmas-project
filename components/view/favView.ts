import AbstractPageView from "./abstractPageView";
import AppController from "../controller/controller";
import SettingsView from "./favViews/settingsView";
import BgsView from "./favViews/bgsView";
import TreesView from "./favViews/treesView";
import GarlandsView from "./favViews/garlandsView";
import TreeView from "./favViews/treeView";
import FavToysView from "./favViews/favToysView";
import SavedView from "./favViews/savedView";

class FavView extends AbstractPageView {
    settingsView: SettingsView;
    treesView: TreesView;
    bgsView: BgsView;
    garlandsView: GarlandsView;
    treeView: TreeView;
    favToysView: FavToysView;
    savedView: SavedView;
    private controller: AppController;

    constructor(controller: AppController) {
        super();
        this.controller = controller;
        this.settingsView = new SettingsView(controller);
        this.treeView = new TreeView(controller);
        this.bgsView = new BgsView(controller);
        this.garlandsView = new GarlandsView(controller);
        this.favToysView = new FavToysView(controller);
        this.savedView = new SavedView(controller);
        this.treesView = new TreesView(controller);
        this.controller.subscribers.push(this.treeView);
        this.controller.treeView = this.treeView;

    }

    drawPage() {
        this.resetPageContainer();
        this.drawFavPage();

    }

    drawFavPage() {
        const menu = document.createElement('section');
        menu.classList.add('menu');
        this.pageContainer.appendChild(menu);

        const mainTree = document.createElement('section');
        mainTree.classList.add('main-tree');
        this.pageContainer.appendChild(mainTree);

        const fav = document.createElement('section');
        fav.classList.add('favorites');
        this.pageContainer.appendChild(fav);

        this.treeView.draw(mainTree);

        this.settingsView.draw(menu);
        this.treesView.draw(menu);
        this.bgsView.draw(menu);
        this.garlandsView.draw(menu);

        this.favToysView.draw(fav);
        this.savedView.draw(fav);

        this.setAllListeners();
        this.controller.populateUI();
    }

    setAllListeners() {
        this.treesView.setTreesListeners();
        this.bgsView.setBgListeners();
        this.garlandsView.setGarlandListener();
        this.favToysView.setFavToyListeners();
        this.settingsView.setSettingsListeners();
    }
}

export default FavView;