import AbstractComponentView from '../abstractComponentView';
import AppController from '../../controller/controller';
import SnowflakesGenerator from '../../utils/snowflakesGenerator';
// <source src="../../../assets/audio/audio.mp3" type="audio/mpeg">


class SettingsView extends AbstractComponentView {
  private controller: AppController;
  private snowGenerator: SnowflakesGenerator | undefined;

  constructor(controller: AppController) {
    super();
    this.controller = controller;
  }

  draw(container: HTMLElement) {
    container.innerHTML += `<div class="snow-audio-container">
        <div class="setting-panel">
          <button id="audio-btn" class="volume"></button>
          <audio id="audio">
          <source src="./assets/audio/audio.mp3" type="audio/mpeg">
          </audio>
          <button id="snow-btn" class="snow-turn"></button>
        </div>
      </div>`;
    this.snowGenerator = new SnowflakesGenerator(document.querySelector("#snowflakes-container") as HTMLElement);
  }

  setSettingsListeners() {
    document.getElementById('snow-btn')?.addEventListener('click', () => {
      this.snowGenerator?.toggleSnowflakes();
      // this.controller.setSnowflakesData();
    });
    document.getElementById('audio-btn')?.addEventListener('click', () => this.controller.onAudioChange());
  }
}

export default SettingsView;
