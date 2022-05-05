import IUILSliderSettings from "./IUILSliderSettings";

type ISettings = Omit<IUILSliderSettings, 'min' | 'max'>;

export default ISettings;