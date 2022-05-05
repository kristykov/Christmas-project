import AbstractComponentView from '../abstractComponentView';
import AppController from '../../controller/controller';

class TreesView extends AbstractComponentView {
    private controller: AppController;

    constructor(controller: AppController) {
        super();
        this.controller = controller;
    }

    draw(container: HTMLElement) {
        container.innerHTML += `<div class="tree-container menu-container">
        <h2>Choose a tree</h2>
        <div class="tree-menu-item-container">
          <div class="tree menu-item" data-tree="1"></div>
          <div class="tree menu-item" data-tree="2"></div>
          <div class="tree menu-item" data-tree="3"></div>
          <div class="tree menu-item" data-tree="4"></div>
          <div class="tree menu-item" data-tree="5"></div>
          <div class="tree menu-item" data-tree="6"></div>
        </div>
      </div>`;
    }

    setTreesListeners() {
        (document.querySelectorAll(".tree") as NodeListOf<HTMLElement>).forEach((tree) => {
            tree.addEventListener('click', (e) => {
                this.controller.onTreeChange(e);
                this.controller.setTreeData(e);
            })
        })
    }

}

export default TreesView;