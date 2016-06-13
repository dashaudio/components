import template from './summary.html';
import styles from './host.scss';
import polyfills from '../../common/polyfills';

export class DashAnalyticsSummary extends HTMLElement {

  get box() { return this._box || (this._box = this.shadowRoot.querySelector('#box')); }
  get title() { return this._title || (this._title = this.shadowRoot.querySelector('#title')); }
  get headline() { return this._headline || (this._headline = this.shadowRoot.querySelector('#headline')); }
  get sparkline() { return this._sparkline || (this._sparkline = this.shadowRoot.querySelector('#sparkline')); }
  get startLabel() { return this._startLabel || (this._startLabel = this.shadowRoot.querySelector('#label-start')); }
  get endLabel() { return this._endLabel || (this._endLabel = this.shadowRoot.querySelector('#label-end')); }
  get trend() { return this._trend || (this._trend = this.shadowRoot.querySelector('#trend')); }
  get trendLabel() { return this._trendLabel || (this._trendLabel = this.shadowRoot.querySelector('#label-trend')); }

  createdCallback() {
    let polyfilledStyles = polyfills.styles(styles, this.tagName);
    this.createShadowRoot().innerHTML = `<style>${polyfilledStyles}</style>${template}`;
  }

  attributeChangedCallback() {
    // this.update();
  }

  update(state) {

    if (typeof state === 'string') {
      try { state = JSON.parse(state); } catch (error) {
        console.warn(`dash-analytics-summary: invalid state parameter (${state})`);
        return;
      }
    }

    // TODO: Lots more validation!

    this.box.loading = !! state.loading;

    if (state.title) this.title.textContent = state.title;
    if (state.headline) this.headline.textContent = state.headline.toLocaleString();

    this.sparkline.loading = !! state.loading;
    if (state.sparkline) this.sparkline.data = state.sparkline.data;

    if (state.labels) {
      if (state.labels.start) this.startLabel.textContent = state.labels.start;
      if (state.labels.end) this.endLabel.textContent = state.labels.end;
      if (state.labels.trend) this.trendLabel.textContent = state.labels.trend;
    }

    if (state.trend) {
      if (state.trend.label) this.trend.label = state.trend.label;
      if (state.trend.direction) this.trend.direction = state.trend.direction;
      if (state.trend.meaning) this.trend.meaning = state.trend.meaning;
    }

  }

}
