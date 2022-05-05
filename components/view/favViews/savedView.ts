import AbstractComponentView from '../abstractComponentView';
import AppController from '../../controller/controller';

class SavedView extends AbstractComponentView {
    private controller: AppController;

    constructor(controller: AppController) {
        super();
        this.controller = controller;
    }

    draw(container: HTMLElement) {
        container.innerHTML += ``;
    }
}

export default SavedView;