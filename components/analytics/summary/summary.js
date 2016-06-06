import template from './summary.html';
import styles from './host.scss';
import polyfills from '../../common/polyfills';

export class DashAnalyticsSummary extends HTMLElement {

  get box() { return this._box || (this._box = this.shadowRoot.querySelector('#box')); }
  get title() { return this._title || (this._title = this.shadowRoot.querySelector('#title')); }
  get headline() { return this._headline || (this._headline = this.shadowRoot.querySelector('#headline')); }
  get sparkline() { return this._sparkline || (this._sparkline = this.shadowRoot.querySelector('#sparkline')); }
  get dateStart() { return this._dateStart || (this._dateStart = this.shadowRoot.querySelector('#date-start')); }
  get dateEnd() { return this._dateEnd || (this._dateEnd = this.shadowRoot.querySelector('#date-end')); }
  get trend() { return this._trend || (this._trend = this.shadowRoot.querySelector('#trend')); }
  get trendPeriod() { return this._trendPeriod || (this._trendPeriod = this.shadowRoot.querySelector('#trend-period')); }

  createdCallback() {
    let polyfilledStyles = polyfills.styles(styles, 'dash-analytics-summary');
    this.createShadowRoot().innerHTML = `<style>${polyfilledStyles}</style>${template}`;
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
    if (state.headline) this.headline.textContent = state.headline;

    this.sparkline.loading = !! state.loading;
    if (state.sparkline) this.sparkline.data = state.sparkline.data;

    if (state.dateStart) this.dateStart.textContent = state.dateStart;
    if (state.dateEnd) this.dateEnd.textContent = state.dateEnd;

    if (state.trendPeriod) this.trendPeriod.textContent = state.trendPeriod;

  }

}
