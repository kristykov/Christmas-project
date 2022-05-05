import AbstractComponentView from '../abstractComponentView';
import AppController from '../../controller/controller';

class GarlandsView extends AbstractComponentView {
  private controller: AppController;

  constructor(controller: AppController) {
    super();
    this.controller = controller;
  }

  draw(container: HTMLElement) {
    container.innerHTML += `<div class="garland-container menu-container">
        <h2>Choose a garland</h2>
        <div class="garland-color">
        <div class="garland-switcher-container">
                <span id="toggle-state">Turn on</span>
                <div class="garland-switcher">
                    <div class="switcher-btn"></div>
                </div>
                </div>
        <div class="garland-container">
          <button class="garland-btn" data-color="multicolor"></button>
          <button class="garland-btn" data-color="yellow"></button>
          <button class="garland-btn" data-color="red"></button>
          <button class="garland-btn" data-color="green"></button>
          <button class="garland-btn" data-color="blue"></button>
        </div>
            
        </div>
      </div>`;
  }

  setGarlandListener() {
    const switcherBtn = document.querySelector('.switcher-btn') as HTMLElement;
    const garlandContainer = document.querySelector('.garland-tree-container') as HTMLElement;
    const toggleState = document.getElementById('toggle-state') as HTMLElement;

    (document.querySelector('.garland-color') as HTMLElement).addEventListener('click', (e) => {
      const btn = (e.target as HTMLElement).closest('.garland-btn') as HTMLElement;
      if (!btn) return;
      this.controller.onGarlandChange(btn.dataset.color as string);
      //call a method to set localStorage data
      this.controller.setGarlandData(btn.dataset.color as string);
      if (switcherBtn.classList.contains('nonactive-switcher-btn')) {
        switcherBtn.classList.remove('nonactive-switcher-btn');
        toggleState.innerHTML = 'Turn off';
      }
    });

    switcherBtn.addEventListener('click', (e) => {
      switcherBtn.classList.toggle('nonactive-switcher-btn');
      if (switcherBtn.classList.contains('nonactive-switcher-btn')) {
        toggleState.innerHTML = 'Turn off';
        while (garlandContainer.firstChild) {
          garlandContainer.removeChild(garlandContainer.firstChild);
        }
      } else {
        toggleState.innerHTML = 'Turn on';
      }
    })
  }
}

export default GarlandsView;