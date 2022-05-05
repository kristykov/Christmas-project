import AbstractComponentView from '../abstractComponentView';
import AppController from '../../controller/controller';

class BgsView extends AbstractComponentView {
  private controller: AppController;

  constructor(controller: AppController) {
    super();
    this.controller = controller;
  }

  draw(container: HTMLElement) {
    container.innerHTML += `
        <div class="bg-menu-item-container menu-container">
        <h2>Choose a background</h2>
        <div class="bg-menu-item-container">
          <div class="bg menu-item" data-bg="1"></div>
          <div class="bg menu-item" data-bg="2"></div>
          <div class="bg menu-item" data-bg="3"></div>
          <div class="bg menu-item" data-bg="4"></div>
          <div class="bg menu-item" data-bg="5"></div>
          <div class="bg menu-item" data-bg="6"></div>
          <div class="bg menu-item" data-bg="7"></div>
          <div class="bg menu-item" data-bg="8"></div>
          <div class="bg menu-item" data-bg="9"></div>
          <div class="bg menu-item" data-bg="10"></div>
          </div>
        </div>
      </div>`;
  }

  setBgListeners() {
    (document.querySelectorAll(".bg") as NodeListOf<HTMLElement>).forEach((bg) => {
      bg.addEventListener('click', (e) => {
        this.controller.onBgChange(e);
        this.controller.setBgData(e);
      })
    })
  }

}

export default BgsView;