import { IGenerateCard } from "./IgenerateCard";
import { IData } from "../data.interface";


class GenerateCard implements IGenerateCard {
    generateCard(item: IData) {
        return `
        <div class='card' data-num='${item.num}'>
            <h2 class='card-title'>${item.name}</h2>
            <div class='img-container'>
            <img class='card-img' src='assets/toys/${item.num}.png' alt='toy'>
            </div>
            <div class='card-description'>
                <p class='card-description-paragraph count'>Количество: <span>${item.count}</span></p>
                <p class='card-description-paragraph year'>Год покупки: <span>${item.year}</span></p>
                <p class='card-description-paragraph shape'>Форма: <span>${item.shape}</span></p>
                <p class='card-description-paragraph color'>Цвет: <span>${item.color}</span></p>
                <p class='card-description-paragraph size'>Размер:  <span>${item.size}</span></p>
                <p class='card-description-paragraph favorite'>Любимая:  <span>${item.favorite === true ? 'да' : 'нет'}</span></p>
                <div class='ribbon'></div>
            </div>
        </div>`;
    }
}
