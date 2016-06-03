import template from './plays.html';
import styles from './host.scss';
import polyfills from '../../../common/polyfills';

// Specialised DashAnalyticsSummary for play count
// Intentionally NOT a subclass - instead composes DashAnalyticsSummary by including it in the
// view and manipulates it that way. Could revisit later?

export class DashAnalyticsSummaryPlays extends HTMLElement {

  // get box() { return this._box || (this._box = this.shadowRoot.querySelector('#box')); }
  //
  // get headline() { return this._headline || (this._headline = this.shadowRoot.querySelector('#headline')); }
  // get sparkline() { return this._sparkline || (this._sparkline = this.shadowRoot.querySelector('#sparkline')); }
  // get trend() { return this._trend || (this._trend = this.shadowRoot.querySelector('#trend')); }
  //

  createdCallback() {
    let polyfilledStyles = polyfills.styles(styles, 'dash-analytics-summary-plays');
    this.createShadowRoot().innerHTML = `<style>${polyfilledStyles}</style>${template}`;
  }

  // attachedCallback() {
  //   this.update();
  // }
  //
  // update() {
  //
  //   this.box.setAttribute('loading', '');
  //
  //   let start = (new Date);
  //   let end = (new Date);
  //
  //   start.setHours(0); start.setMinutes(0); start.setSeconds(0); start.setMonth(start.getMonth() - 1);
  //   end.setHours(23); end.setMinutes(59); end.setSeconds(59);
  //
  //   let url = `https://analytics-api.dashaudio.co/plays/count` +
  //     `?override=input.glob.body.query.filtered.filter.bool.must[1].range.startTime.gte=${start.getTime()}` +
  //     `&override=input.glob.body.query.filtered.filter.bool.must[1].range.startTime.lte=${end.getTime()}` +
  //     `&override=input.glob.body.query.filtered.filter.bool.must[2].term.object___publisher=http://dashaudio.co/Publisher/politiken` +
  //     `&override=input.glob.body.aggs.plays.date_histogram.extended_bounds.min=${start.getTime()}` +
  //     `&override=input.glob.body.aggs.plays.date_histogram.extended_bounds.max=${end.getTime()}`;
  //
  //   fetch(url).then((r) => r.json()).then(this.parse).then(this.render.bind(this)).then((data) => this.updateLastMonth(data));
  //
  //
  // }
  //
  // updateLastMonth(thisMonthData) {
  //
  //   let start = (new Date);
  //   let end = (new Date);
  //
  //   start.setHours(0); start.setMinutes(0); start.setSeconds(0); start.setMonth(start.getMonth() - 2);
  //   end.setHours(23); end.setMinutes(59); end.setSeconds(59); end.setMonth(end.getMonth() - 1)
  //
  //   let url = `https://analytics-api.dashaudio.co/plays/count` +
  //     `?override=input.glob.body.query.filtered.filter.bool.must[1].range.startTime.gte=${start.getTime()}` +
  //     `&override=input.glob.body.query.filtered.filter.bool.must[1].range.startTime.lte=${end.getTime()}` +
  //     `&override=input.glob.body.query.filtered.filter.bool.must[2].term.object___publisher=http://dashaudio.co/Publisher/politiken` +
  //     `&override=input.glob.body.aggs.plays.date_histogram.extended_bounds.min=${start.getTime()}` +
  //     `&override=input.glob.body.aggs.plays.date_histogram.extended_bounds.max=${end.getTime()}`;
  //
  //   fetch(url).then((r) => r.json()).then(this.parse.bind(this)).then((lastMonthData) => {
  //     let difference = thisMonthData.value - lastMonthData.value;
  //     let percentage = (100 * difference / lastMonthData.value).toFixed(0);
  //     this.trend.setAttribute('value', `${percentage}%`);
  //     if (difference > 0) {
  //       this.trend.setAttribute('up', '');
  //       this.trend.setAttribute('positive', '');
  //       this.trend.removeAttribute('down');
  //       this.trend.removeAttribute('flat');
  //       this.trend.removeAttribute('negative');
  //     } else {
  //       this.trend.setAttribute('down', '');
  //       this.trend.setAttribute('negative', '');
  //       this.trend.removeAttribute('up');
  //       this.trend.removeAttribute('flat');
  //       this.trend.removeAttribute('positive');
  //     }
  //     this.box.removeAttribute('loading');
  //   });
  //
  // }
  //
  // parse(response) {
  //
  //   let max = 0;
  //   for (let i = 0; i < response.buckets.length; i++) {
  //     let value = response.buckets[i].doc_count
  //     if (value > max) {
  //       max = value;
  //     }
  //   }
  //
  //   return {
  //     sparkline: response.buckets.map((bucket) => bucket.doc_count / max),
  //     value: response.buckets.reduce((prev, curr) => prev + curr.doc_count, 0)
  //   }
  //
  // }
  //
  // render(data) {
  //   this.headline.textContent = data.value.toLocaleString();
  //   this.sparkline.update(data.sparkline);
  //   this.box.removeAttribute('loading');
  //   return data;
  // }

}
