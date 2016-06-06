import template from './plays.html';
import styles from './host.scss';
import polyfills from '../../../common/polyfills';

const TITLE = 'Plays';

export class DashAnalyticsSummaryPlays extends HTMLElement {

  get summary() { return this._summary || (this._summary = this.shadowRoot.querySelector('#summary')); }

  createdCallback() {
    let polyfilledStyles = polyfills.styles(styles, 'dash-analytics-summary-plays');
    this.createShadowRoot().innerHTML = `<style>${polyfilledStyles}</style>${template}`;
  }

  attachedCallback() {
    document.addEventListener('WebComponentsReady', this.update.bind(this));
  }

  refresh() {
    this.update();
  }

  update() {

    this.summary.update({
      title: TITLE,
      loading: true,
      dateStart: '1 May 2016',
      dateEnd: 'Today',
      trendPeriod: '1 Month Ago'
    });

    let start = (new Date);
    let end = (new Date);

    start.setHours(0); start.setMinutes(0); start.setSeconds(0); start.setMonth(start.getMonth() - 1);
    end.setHours(23); end.setMinutes(59); end.setSeconds(59);

    let url = `https://analytics-api.dashaudio.co/plays/count` +
      `?override=input.glob.body.query.filtered.filter.bool.must[1].range.startTime.gte=${start.getTime()}` +
      `&override=input.glob.body.query.filtered.filter.bool.must[1].range.startTime.lte=${end.getTime()}` +
      `&override=input.glob.body.query.filtered.filter.bool.must[2].term.object___publisher=http://dashaudio.co/Publisher/politiken` +
      `&override=input.glob.body.aggs.plays.date_histogram.extended_bounds.min=${start.getTime()}` +
      `&override=input.glob.body.aggs.plays.date_histogram.extended_bounds.max=${end.getTime()}`;

    fetch(url).then((r) => r.json()).then((response) => {
        let max = 0;
        for (let i = 0; i < response.buckets.length; i++) {
          let value = response.buckets[i].doc_count
          if (value > max) {
            max = value;
          }
        }

        return {
          sparkline: response.buckets.map((bucket) => bucket.doc_count / max),
          value: response.buckets.reduce((prev, curr) => prev + curr.doc_count, 0)
        }
    }).then((data) => {
      window.setTimeout(() => {
        this.summary.update({
          loading: false,
          sparkline: { data: data.sparkline },
          headline: data.value
        });
      }, 1500);

    });

  }

}
