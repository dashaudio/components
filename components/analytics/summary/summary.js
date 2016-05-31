import template from './summary.html';
import styles from './host.scss';
import polyfills from '../../common/polyfills';

export class DashAnalyticsSummary extends HTMLElement {

  createdCallback() {
    let polyfilledStyles = polyfills.styles(styles, 'dash-analytics-summary');
    this.createShadowRoot().innerHTML = `<style>${polyfilledStyles}</style>${template}`;
  }

}
