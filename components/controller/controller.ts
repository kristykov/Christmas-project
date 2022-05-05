import data from '../../data.js';
import ISettings from "./ISettings";
import { IData } from "../../data.interface";
import noUiSlider from 'nouislider';
import { target } from 'nouislider';
import IUILSliderSettings from './IUILSliderSettings';
import AbstractComponentView from '../view/abstractComponentView';
import ISubscriber from './ISubscriber';
import CardsView from '../view/cardsView';
import RangeKey from './IRange';
import TreeView from '../view/favViews/treeView.js';
import AppView from '../view/appView.js';
// import SnowflakesGenerator from '../utils/snowflakesGenerator';



class AppController {
    selectionSettings: ISettings[] = [];
    filteredData: IData[] = [];
    selectedCards: string[] = [];
    sliderCountSettings: IUILSliderSettings = { key: 'count', input: 'range', min: 1, max: 12 };
    sliderYearSettings: IUILSliderSettings = { key: 'year', input: 'range', min: 1940, max: 2021 };
    public subscribers: ISubscriber[] = [];
    treeView: TreeView | undefined;
    // private snowGenerator: SnowflakesGenerator;

    constructor() {
        // this.snowGenerator = new SnowflakesGenerator((document.querySelector("#snowflakes-container") as HTMLElement));
    }

    getAllData() {
        return data;
    }

    setResetData() {
        this.subscribers.forEach(subscriber => subscriber.update(data));
    }

    onFilterChange() {
        this.filteredData = this.findFilteredData();
        this.subscribers.forEach(subscriber => subscriber.update(this.filteredData));
    }

    onSortChange(selectEl: HTMLSelectElement) {
        let sortType = selectEl.options[selectEl.selectedIndex].value;

        let tempData = (this.filteredData.length > 0) ? this.filteredData : data;

        switch (sortType) {
            case 'sorting-name-max':
                // sort alphabetically (use name instead of id)
                tempData.sort((a, b) => (a.name > b.name ? 1 : -1));
                break;
            case 'sorting-name-min':
                // sort reversed name
                tempData.sort((a, b) => (a.name < b.name ? 1 : -1));
                break;
            case 'sorting-count-max':
                // sort count numerically
                tempData.sort((a, b) => (parseInt(a.count) > parseInt(b.count) ? 1 : -1));
                break;
            case 'sorting-count-min':
                // sort count reversed
                tempData.sort((a, b) => (parseInt(a.count) < parseInt(b.count) ? 1 : -1));
                break;
        }
        this.filteredData = tempData;
        this.subscribers.forEach(subscriber => subscriber.update(this.filteredData));

    }

    onSearchChange(e: KeyboardEvent | MouseEvent) {

        if (e.type == 'click' || e.type == 'keyup') {
            let tempData = (this.filteredData.length > 0) ? this.filteredData : data;
            let searchInput = (document.getElementById('input-search') as HTMLInputElement).value;
            let results = tempData.filter((item) => {
                return item.name.includes(searchInput);
            });

            //after sorting draw all cards using tempData
            this.filteredData = results;
            this.subscribers.forEach(subscriber => subscriber.update(this.filteredData));
        }
        if ((document.getElementById('input-search') as HTMLInputElement).value.length > 0) {
            //get a clear btn and show it
            (document.getElementById('clear-btn') as HTMLTemplateElement).classList.remove('hide');
        } else {
            (document.getElementById('input-search') as HTMLInputElement).value = '';
            (document.getElementById('clear-btn') as HTMLTemplateElement).classList.add('hide');
        }
    }

    getFilteredData(settings: ISettings[] = []) {
        this.filteredData = this.findFilteredData();
        //having filtering algorithm 
        if (settings) {
            return settings.length === 0 ? data : this.filteredData;
        }
        return this.filteredData;
    }

    findFilteredData(): IData[] {
        const filterCheckboxes = Array.from(document.querySelectorAll('.filter-checkbox')) as HTMLInputElement[];
        if (!filterCheckboxes) {
            return []
        }
        let checkboxSettings = filterCheckboxes
            .filter((input) => input.checked)
            //map to create an array of key - value objects
            .map((input) => {
                return { key: input.dataset.type as keyof IData, input: 'single', value: input.value };
            });

        let sliderSettings: IUILSliderSettings[] = [];
        sliderSettings.push(this.sliderCountSettings);
        sliderSettings.push(this.sliderYearSettings);
        // filter per data item for checkbox settings only
        let filteredResults = data.filter((dataItem) => {
            for (let settings of checkboxSettings) {
                console.log(typeof dataItem[settings.key]);
                // if (dataItem[settings.key] == settings.value) return true;
                if ((dataItem[settings.key as keyof IData]).toString() == settings.value) return true;

            }
            return false;
        });
        filteredResults = checkboxSettings.length === 0 ? data : filteredResults;
        // filter again on the result for slider settings
        filteredResults = filteredResults.filter((dataItem) => {
            for (let settings of sliderSettings) {
                const value = parseInt(dataItem[settings.key as RangeKey]);
                return (value >= settings.min && value <= settings.max)
            }
            return false;
        });
        return filteredResults;
    }

    onFilterSlider(sliderSettings: IUILSliderSettings) {
        if (sliderSettings.key === 'count') {
            this.sliderCountSettings = sliderSettings;
        } else if (sliderSettings.key === 'year') {
            this.sliderYearSettings = sliderSettings;
        }
        this.onFilterChange();
    }


    onAudioChange() {
        const audioBtn = document.getElementById('audio-btn') as HTMLElement;
        const audio = document.getElementById('audio') as HTMLAudioElement;
        audioBtn?.classList.toggle('audio-playing');
        if (!audioBtn.classList.contains('audio-playing')) {
            audio?.pause();
        } else {
            audio?.play();
        }
    }

    onTreeChange(e: Event) {
        const treeNum = (e.target as HTMLElement).dataset.tree;
        (document.querySelector('.central-tree') as HTMLImageElement).src = `./assets/tree/${treeNum}.png`;
    }

    onBgChange(e: Event) {
        const bgNum = (e.target as HTMLElement).dataset.bg;
        (document.querySelector('.main-tree-container') as HTMLImageElement).style.backgroundImage = `url(./assets/bg/${bgNum}.jpg)`;
    }

    onGarlandChange(color: string) {
        const container = (document.querySelector('.garland-tree-container') as HTMLElement);
        container.innerHTML = '';
        let ropes = 9;
        //2*n + 3 for ligths per a rope
        //5*(n^2 + 5*n + 10)) for heights per a rope
        for (let r = 1; r < ropes; r++) {
            let ul = document.createElement('ul');
            ul.classList.add('lightrope');
            let height = 5 * (Math.pow(r, 2) + 5 * r + 10);
            // ul.style = `width: ${height}px; height: ${height}px`;
            ul.style.width = `${height}px`;
            ul.style.height = `${height}px`;
            let lights = 2 * r + 3; //5 lights
            let subAngle = 60 / lights;
            let startAngle = 60;
            for (let i = 0; i < lights; i++) {
                let radius = startAngle + subAngle * i;
                let t = `rotate(${radius}deg) translate(${height / 2}px) rotate(-${radius}deg)`;
                let li = document.createElement('li');
                li.classList.add(color);
                li.style.transform = t;
                ul.append(li);
            }
            container.append(ul);
        }
    }

    setSnowflakesData() {
        localStorage.setItem('snowOn', 'on');
    }

    setTreeData(e: Event) {
        const treeNum = (e.target as HTMLElement).dataset.tree as string;
        localStorage.setItem('treeType', treeNum);
    }

    setBgData(e: Event) {
        const bgNum = (e.target as HTMLElement).dataset.bg as string;
        localStorage.setItem('bgType', bgNum);
    }

    setGarlandData(color: string) {
        localStorage.setItem('garlandColor', color);
    }

    populateUI() {
        // const garlandColor = JSON.parse(localStorage.getItem('garlandColor') as string);
        const garlandColor = localStorage.getItem('garlandColor') as string;
        const snowBtn = localStorage.getItem('snowOn');
        const treeType = localStorage.getItem('treeType') as string;
        const bgType = localStorage.getItem('bgType') as string;
        if (garlandColor) this.onGarlandChange(garlandColor);
        // if(snowBtn) this.snowGenerator?.toggleSnowflakes();
        if (treeType) {
            (document.querySelector('.central-tree') as HTMLImageElement).src = `./assets/tree/${treeType}.png`;
        };
        if (bgType) {
            (document.querySelector('.main-tree-container') as HTMLImageElement).style.backgroundImage = `url(./assets/bg/${bgType}.jpg)`;
        }

    }
}


export default AppController;