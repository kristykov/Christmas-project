import AbstractComponentView from './abstractComponentView';
import { IData } from '../../data.interface';
import ISettings from '../controller/ISettings';
import noUiSlider from 'nouislider';
import { target } from 'nouislider';
import IUILSliderSettings from '../controller/IUILSliderSettings';
import AppController from '../controller/controller';
import App from '../app/app';

class FilterView extends AbstractComponentView {
    selectionSettings: ISettings[] = [];
    private controller: AppController;

    constructor(controller: AppController) {
        super();
        this.controller = controller;
    }

    draw(container: HTMLElement) {
        // container.addEventListener('change', (e) => this.controller.onFilterChange());
        container.addEventListener('change', (e) => (e != null && (e.target as HTMLSelectElement)?.id == 'sorting-type') ?
            this.controller.onSortChange(e.target as HTMLSelectElement) : this.controller.onFilterChange());

        container.innerHTML = "";
        container.innerHTML += `<aside class="aside">
        <div class="setting-panel">
            <button class="volume"></button>
            <button class="snow-turn"></button>
            <button class="search-btn" id="search-btn"></button>
            <button id="clear-btn" class="clear-btn hide"></button>
            <input type="text" class="search" name="search" id="input-search" autocomplete="off"
                placeholder="Search">
        </div>
        <div class="sorting-panel">
            <div class="sorting-panel-title">Sort</div>
            <select name="sorting-type" id="sorting-type" class="sorting-type">
                <option value="sorting-name-max" desabled selected>By name from 'A' to 'Z'</option>
                <option value="sorting-name-min">By name from 'Z' to 'A'</option>
                <option value="sorting-count-max" desabled selected>
                By number ascending</option>
                <option value="sorting-count-min" desabled selected>
                By number descending</option>
            </select>
        </div>

        <div class="filter-panel">
            <div class="filter shape">
                <div class="filter-title">Shape</div>
                <div class="filter-container">
                    <div class="shape-container">
                        <input type="checkbox" data-type="shape" name="shape-1" class="filter-checkbox"
                            value="shape">
                        <label for="shape-1" class="filter-checkbox-label sphere"></label>
                        <span>Sphere</span>
                    </div>
                    <div class="shape-container">
                        <input type="checkbox" data-type="shape" name="shape-2" class="filter-checkbox"
                            value="bell">
                        <label for="shape-2" class="filter-checkbox-label bell"></label>
                        <span>Bell</span>
                    </div>
                    <div class="shape-container">
                        <input type="checkbox" data-type="shape" name="shape-3" class="filter-checkbox"
                            value="cone">
                        <label for="shape-3" class="filter-checkbox-label pinecone"></label>
                        <span>Cone</span>
                    </div>
                    <div class="shape-container">
                        <input type="checkbox" data-type="shape" name="shape-4" class="filter-checkbox"
                            value="snowflake">
                        <label for="shape-4" class="filter-checkbox-label snowflacke"></label>
                        <span>Snowflake</span>
                    </div>
                    <div class="shape-container">
                        <input type="checkbox" data-type="shape" name="shape-5" class="filter-checkbox"
                            value="figure">
                        <label for="shape-5" class="filter-checkbox-label figure"></label>
                        <span>Figure</span>
                    </div>
                </div>
            </div>

            <div class="filter number-items">
                <div class="filter-title">Number of items</div>
                <output class="items-output" id="count-min">1</output>
                <div class="slider-number-container" id="slider-count"></div>
                <output class="items-output" id="count-max">12</output>
            </div>

            <div class="filter purchase-year">
                <div class="filter-title">Acquisition year</div>
                <output class="year-output" id="year-min">1940</output>
                <div class="slider-count-container" id="slider-year"></div>
                <output class="year-output" id="year-max">2021</output>
            </div>

            <div class="filter color">
                <div class="filter-title">Color</div>
                <div class="filter-container-color">
                    <div class="color-container">
                        <input type="checkbox" data-type="color" name="color1" class="filter-checkbox"
                            value="white">
                        <label for="color1" class="filter-color-checkbox-label white"></label>
                    </div>
                    <div class="color-container">
                        <input type="checkbox" data-type="color" name="color2" class="filter-checkbox"
                            value="yellow">
                        <label for="color2" class="filter-color-checkbox-label yellow"></label>
                    </div>
                    <div class="color-container">
                        <input type="checkbox" data-type="color" name="color3" class="filter-checkbox"
                            value="red">
                        <label for="color3" class="filter-color-checkbox-label red"></label>
                    </div>
                    <div class="color-container">
                        <input type="checkbox" data-type="color" name="color-4" class="filter-checkbox"
                            value="blue">
                        <label for="color-4" class="filter-color-checkbox-label blue"></label>
                    </div>
                    <div class="color-container">
                        <input type="checkbox" data-type="color" name="color-5" class="filter-checkbox"
                            value="green">
                        <label for="color-5" class="filter-color-checkbox-label green"></label>
                    </div>
                </div>
            </div>
            <div class="filter">
                <div class="filter-title">Size</div>
                <div class="filter-container-size">
                    <div class="size">
                        <input type="checkbox" class="checkbox-input filter-checkbox" name="size-1"
                            data-type="size" value="big">
                        <label for="size-1" class="size-input-label"></label>
                        <p class="size-title">Big</p>
                    </div>
                    <div class="size">
                        <input type="checkbox" class="checkbox-input filter-checkbox" name="size-2"
                            data-type="size" value="middle">
                        <label for="size-2" class="size-input-label"></label>
                        <p class="size-title">Middle</p>
                    </div>
                    <div class="size">
                        <input type="checkbox" class="checkbox-input filter-checkbox" name="size-3"
                            data-type="size" value="small">
                        <label for="size-3" class="size-input-label"></label>
                        <p class="size-title">Small</p>
                    </div>
                </div>
            </div>
            <div class="filter favourite">
                <input type="checkbox" class="checkbox-input filter-checkbox" id="favorite" name="favorite"
                    data-type="favorite" value='true'>
                <label for="favorite" class="size-input-label"></label>
                <div class="">Only favourites</div>
            </div>
            <div class="filter reset">
                <button class="reset-btn" id="reset-filter-btn">Reset filters</button>
                <button class="reset-btn" id="reset-settings-btn">Reset settings</button>
            </div>
        </div>
    </aside>`;
        this.setSearchListeners();
        this.setupNoUiSlider();
    }

    setupNoUiSlider() {
        const sliderCount: target = document.getElementById('slider-count') as HTMLTemplateElement;
        const sliderYear: target = document.getElementById('slider-year') as HTMLTemplateElement;
        const sliderCountSettings: IUILSliderSettings = { key: 'count', input: 'range', min: 1, max: 12 };
        const sliderYearSettings: IUILSliderSettings = { key: 'year', input: 'range', min: 1940, max: 2021 };

        noUiSlider.create(sliderYear, {
            start: [1940, 2021],
            range: {
                min: 1940,
                max: 2021,
            },
            step: 10,
            connect: true,
        });

        noUiSlider.create(sliderCount, {
            start: [1, 12],
            range: {
                min: 1,
                max: 12,
            },
            step: 1,
            connect: true,
        });

        sliderCount.noUiSlider?.on('change', () => {
            this.setSliderMinMax(sliderCount, sliderCountSettings, 'count-min', 'count-max');
        });

        sliderYear.noUiSlider?.on('change', () => {
            this.setSliderMinMax(sliderYear, sliderYearSettings, 'year-min', 'year-max');
        });
    }

    setSliderMinMax(slider: target, sliderSettings: IUILSliderSettings, minId: string, maxId: string) {
        let [min, max] = [...slider.noUiSlider?.get() as string[]];
        sliderSettings.min = parseInt(min);
        sliderSettings.max = parseInt(max);
        (document.getElementById(minId) as HTMLInputElement).value = min;
        (document.getElementById(maxId) as HTMLInputElement).value = max;
        this.controller.onFilterSlider(sliderSettings);
    }

    setSearchListeners() {
        (document.getElementById('input-search') as HTMLTemplateElement).addEventListener('keyup', (e) => this.controller.onSearchChange(e));
        (document.getElementById('search-btn') as HTMLTemplateElement).addEventListener('click', (e) => this.controller.onSearchChange(e));
        (document.getElementById('clear-btn') as HTMLTemplateElement).addEventListener('click', (e) => {
            (e.target as HTMLElement).classList.add('hide');
            (document.getElementById('input-search') as HTMLInputElement).value = '';
            this.controller.setResetData();
        });

    }

}

export default FilterView;