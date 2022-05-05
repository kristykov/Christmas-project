import AbstractComponentView from '../abstractComponentView';
import AppController from '../../controller/controller';
import SnowflakesGenerator from '../../utils/snowflakesGenerator';

class TreeView extends AbstractComponentView {
    private controller: AppController;

    constructor(controller: AppController) {
        super();
        this.controller = controller;
    }

    draw(container: HTMLElement) {
        container.innerHTML += `<div class="main-tree-container">
        <div id="snowflakes-container" class="snowflakes"></div>
        <div class="garland-tree-container">
        </div>
        <map name="tree-map">
          <area shape="poly"
            coords="251,0,307,69,273,125,310,120,302,164,354,139,338,198,356,222,403,219,350,266,395,289,349,306,383,343,431,356,334,413,409,408,447,455,414,490,437,530,495,537,437,672,261,699,42,610,14,546,89,499,24,444,115,420,112,385,72,351,119,316,112,217,177,186,160,130"
            href="" alt="">
        </map>
        <img src="./assets/tree/1.png" alt="tree" class="central-tree" usemap="#tree-map" />
      </div>`;
    }

    generateSnow() {
        const container = document.querySelector("#snowflakes-container") as HTMLElement;
        const snowGen = new SnowflakesGenerator(container);
        snowGen.createSnowflakes();
    }

    update() {
        this.generateSnow();
    }

}

export default TreeView;