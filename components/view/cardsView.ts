import AbstractComponentView from './abstractComponentView';
import AppController from '../controller/controller';
import { IData } from '../../data.interface';
import ISubscriber from '../controller/ISubscriber';

class CardsView extends AbstractComponentView implements ISubscriber {
    data: IData[];
    private controller: AppController;
    quantityOfSelectedToys = document.getElementById('selected-toys') as HTMLInputElement;

    constructor(controller: AppController) {
        super();
        this.controller = controller;
        this.data = [];
    }

    draw(container: HTMLElement) {
        const main = document.createElement('main');
        main.classList.add('main');
        container.appendChild(main);
        const mainContainer = document.createElement('div');
        mainContainer.classList.add('main-container');
        main.appendChild(mainContainer);
        const header = document.createElement('h1');
        header.innerHTML = 'Toys';
        mainContainer.appendChild(header);

        //after all cards created add listeners to them
        this.generateAllCards();
    }

    generateAllCards() {
        const mainContainer = document.querySelector('.main-container');
        let div = document.querySelector('.card-container');
        if (!div) {
            div = document.createElement('div');
            div.classList.add('card-container');
        }
        div.innerHTML = '';

        this.setCardListener(div);

        for (let i = 0; i < this.data.length; i++) {
            div.innerHTML += this.generateCard(this.data[i]);
        }


        if (mainContainer) {
            mainContainer.appendChild(div);
        }
    }

    generateCard(item: IData) {
        return `
        <div class='card' data-num='${item.num}'>
            <h2 class='card-title'>${item.name}</h2>
            <div class='img-container'>
            <img class='card-img' src='assets/toys/${item.num}.png' alt='toy'>
            </div>
            <div class='card-description'>
                <p class='card-description-paragraph count'>Quantity: <span>${item.count}</span></p>
                <p class='card-description-paragraph year'>Year: <span>${item.year}</span></p>
                <p class='card-description-paragraph shape'>Shape: <span>${item.shape}</span></p>
                <p class='card-description-paragraph color'>Color: <span>${item.color}</span></p>
                <p class='card-description-paragraph size'>Size:&nbsp;<span>${  item.size}</span></p>
                <p class='card-description-paragraph favorite'>Favorite:  <span>${item.favorite === true ? 'yes' : 'no'}</span></p>
                <div class='ribbon'></div>
            </div>
        </div>`;
    }


    setCardListener(div: Element) {

        div.addEventListener('click', (e) => {
            let card = (e.target as HTMLElement).closest('.card') as HTMLTemplateElement;
            // if card doesn't exist exit method
            if (!card) return;

            // if (this.controller.selectedCards.includes(card.dataset.num as string)) {
            //     card.classList.add('active');
            // }
            let num = parseInt(this.quantityOfSelectedToys.innerHTML);
            const cardNum = card.dataset.num as string;
            if (card.classList.contains('active')) {
                //remove card
                if (this.controller.selectedCards.includes(cardNum)) {
                    this.quantityOfSelectedToys.innerHTML = `${--num}`;
                    card.classList.remove('active');
                    let index = this.controller.selectedCards.indexOf(cardNum);
                    this.controller.selectedCards.splice(index, 1);
                }

            } else {
                //add card
                if (!this.controller.selectedCards.includes(cardNum) && this.controller.selectedCards.length < 20) {

                    card.classList.add('active');
                    this.quantityOfSelectedToys.innerHTML = `${++num}`;
                    this.controller.selectedCards.push(cardNum);
                } else {
                    alert('only 20 toys are allowed');
                }
            }

        })
    }


    setData(data: IData[]) {
        this.data = data;
    }

    getData() {
        return this.data;
    }

    update(changedData: IData[]) {
        this.data = changedData;
        this.generateAllCards();
    }
}

export default CardsView;
