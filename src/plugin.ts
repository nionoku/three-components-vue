import { Plugin } from 'vue';
import * as Components from './index';

export const ThreeComponents: Plugin = {
  install(app): void {
    const componentNames = Object.keys(Components);
    // @ts-expect-error Components returns array of exported library components
    componentNames.forEach((it) => app.component(it, Components[it]));
  },
};
