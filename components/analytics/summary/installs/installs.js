import { DashAnalyticsSummary } from '../summary';

const TITLE = 'App Installs (Today & This Month)';

export class DashAnalyticsSummaryInstalls extends DashAnalyticsSummary {

  attachedCallback() {
    document.addEventListener('WebComponentsReady', this.update.bind(this));
  }

  update() {

    super.update({
      loading: true,
      title: TITLE,
      labels: {
        start: moment().utc().subtract(1, 'month').format('d MMM YYYY'),
        end: 'Today',
        trend: 'This Month'
      }
    });

    let start = moment().utc().subtract(1, 'month').toDate().getTime();
    let end = moment().utc().endOf('day').toDate().getTime();
    let client = 'politiken';

    fetch(this.endpoint(start, end, client)).then((r) => r.json()).then((result) => {

      let max = result.buckets.reduce((prev, curr) => {
        return (curr.value > prev) ? curr.value : prev;
      }, 0);

      let series = result.buckets.map((bucket) => bucket.value / max);

      let first = result.buckets[0].value;
      let last = result.buckets[result.buckets.length - 1].value;

      let trend = 100 * (last - first) / first;

      super.update({
        loading: false,
        headline: last,
        sparkline: { data: series },
        trend: {
          direction: (trend > 0) ? 'up' : 'down',
          meaning: (trend > 0) ? 'positive' : 'negative',
          label: trend.toFixed(0) + '%'
        }
      });

    });

  }

  endpoint(start, end, client) {

    return `https://analytics-api.dashaudio.co/app-installs` +
      `?override=input.glob.body.query.filtered.filter.bool.must[1].range.startTime.gte=${start}` +
      `&override=input.glob.body.query.filtered.filter.bool.must[1].range.startTime.lte=${end}` +
      `&override=input.glob.body.query.filtered.filter.bool.must[2].term.object___publisher=http://dashaudio.co/Publisher/${client}` +
      `&override=input.glob.body.aggs.date.date_histogram.extended_bounds.min=${start}` +
      `&override=input.glob.body.aggs.date.date_histogram.extended_bounds.max=${end}`;

  }

}
