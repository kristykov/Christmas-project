import AbstractComponentView from '../abstractComponentView';
import AppController from '../../controller/controller';
import data from '../../../data';
import { IData } from '../../../data.interface';

class FavToysView extends AbstractComponentView {
  private controller: AppController;
  private droppedInArea: boolean = false;

  constructor(controller: AppController) {
    super();
    this.controller = controller;
  }

  draw(container: HTMLElement) {
    const favContainer = document.createElement('div');
    favContainer.classList.add('favorites-container');
    container.appendChild(favContainer);

    const selectedCards = this.controller.selectedCards;

    if (selectedCards.length == 0) {
      for (let i = 0; i < 20; i++) {
        this.generateFavCard(favContainer, i);
      }
    } else {
      selectedCards.forEach((selected) => {
        this.generateFavCard(favContainer, parseInt(selected) - 1);
      })
    }
  }

  generateFavCard(container: HTMLElement, index: number) {
    const cardData: IData = data[index];
    let imgString = '';
    const ln = parseInt(cardData.count) as number;

    for (let i = 0; i < ln; i++) {
      imgString += `
        <img src="./assets/toys/${cardData.num}.png" alt="toy" data-imgnum="${cardData.num}" class="favorites-card-img" draggable="true" />
        `;
    }

    container.innerHTML += `
      <div class="favorites-card" data-num="${cardData.num}">
      <p class="favorites-count">${cardData.count}</p>${imgString}
      </div>
      `;
  }

  setFavToyListeners() {
    const area = document.getElementsByTagName('area')[0];
    console.log('area', area);

    area.addEventListener('dragover', (e) => {
      e.preventDefault();
      console.log('change to false');
      this.droppedInArea = false;
    });

    area.addEventListener('drop', (e) => {
      console.log('droppppped')
      e.preventDefault();
      this.droppedInArea = true;
      const imgnum = e.dataTransfer?.getData('imgnum') as string;
      const favCard = document.querySelector(`.favorites-card[data-num="${imgnum}"]`) as HTMLElement;
      const draggedToy = favCard.querySelector(`.favorites-card-img[data-imgnum="${imgnum}"]`) as HTMLElement;
      console.log('draggedToy', draggedToy);
      favCard.removeChild(draggedToy);

      draggedToy.style.position = "absolute";

      draggedToy.style.top = e.pageY - 130 + "px";
      draggedToy.style.left = e.pageX - 410 + "px";
      draggedToy.addEventListener('dragend', (e) => {
        console.log('this.droppedInArea', this.droppedInArea);
        if (this.droppedInArea) return;
        const target = e.target as HTMLElement;
        console.log(target);
        console.log('drag end')
        const imgnum = target.dataset.imgnum as string;
        console.log('imgnum', imgnum);
        const favCard = document.querySelector(`.favorites-card[data-num="${imgnum}"]`) as HTMLElement;
        target.style.top = "auto";
        target.style.left = "auto";
        favCard.appendChild(target);
        this.updateCounter(imgnum);
      });

      (e.target as HTMLElement).appendChild(draggedToy);
      this.updateCounter(imgnum);
      // this.droppedInArea = false;
    });

    const toys = document.querySelectorAll('.favorites-card-img') as NodeListOf<HTMLElement>;
    const toyCards = document.querySelectorAll(`.favorites-card`) as NodeListOf<HTMLElement>;
    toys.forEach((toy) => {
      toy.addEventListener('dragstart', (e) => {
        // window.speechSynthesis.speak(new SpeechSynthesisUtterance("drag start"));
        const target = e.target as HTMLElement;
        if (target) {
          e.dataTransfer?.setData('imgnum', target.dataset.imgnum as string);
          e.dataTransfer?.setData('imgoffsetX', e.offsetX.toString() as string);
          e.dataTransfer?.setData('imgoffsetY', e.offsetY.toString() as string);
        }
      })
    })
  }


  updateCounter(imgnum: string) {
    const favDiv = document.querySelector(`.favorites-card[data-num="${imgnum}"]`) as HTMLElement;
    const allImgs = favDiv.querySelectorAll('.favorites-card-img');
    console.log('allImgs length:', allImgs.length);
    let p = favDiv.querySelector('.favorites-count') as HTMLElement;
    p.innerHTML = (allImgs.length).toString();
  }
}

export default FavToysView;