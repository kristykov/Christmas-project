import { IData } from "../../data.interface";

abstract class AbstractComponentView {
    constructor() {
    }


    abstract draw(container: HTMLElement): void;



}

export default AbstractComponentView;