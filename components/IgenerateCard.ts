import { IData } from "../data.interface";

export interface IGenerateCard {
    generateCard(item: IData): string,
}
