import { DashAnalyticsSummary } from '../summary'

const TITLE = 'Plays (Today & This Month)'

export class DashAnalyticsSummaryPlays extends DashAnalyticsSummary {

  attachedCallback() {
    document.addEventListener('WebComponentsReady', this.update.bind(this))
  }

  update() {

    super.update({
      title: TITLE,
      loading: true,
      labels: {
        start: moment().utc().subtract(1, 'month').format('d MMM YYYY'),
        end: 'Today',
        trend: 'This Month'
      }
    })

    let start = moment().utc().subtract(1, 'month').toDate().getTime()
    let end = moment().utc().endOf('day').toDate().getTime()
    let client = 'politiken'

    fetch(this.endpoint(start, end, client)).then((r) => r.json()).then((result) => {

      let max = result.buckets.reduce((prev, curr) => {
        return (curr.doc_count > prev) ? curr.doc_count : prev
      }, 0)

      let series = result.buckets.map((bucket) => bucket.doc_count / max)

      let first = result.buckets[0].doc_count
      let last = result.buckets[result.buckets.length - 1].doc_count

      let trend = 100 * (last - first) / first

        super.update({
          loading: false,
          sparkline: { data: series },
          headline: last,
          trend: {
            direction: (trend > 0) ? 'up' : 'down',
            meaning: (trend > 0) ? 'positive' : 'negative',
            label: trend.toFixed(0) + '%'
          }
        })

    })

  }

  endpoint(start, end, client) {

    return `https://analytics-api.dashaudio.co/plays/count` +
      `?override=input.glob.body.query.filtered.filter.bool.must[1].range.startTime.gte=${start}` +
      `&override=input.glob.body.query.filtered.filter.bool.must[1].range.startTime.lte=${end}` +
      `&override=input.glob.body.query.filtered.filter.bool.must[2].term.object___publisher=http://dashaudio.co/Publisher/${client}` +
      `&override=input.glob.body.aggs.plays.date_histogram.extended_bounds.min=${start}` +
      `&override=input.glob.body.aggs.plays.date_histogram.extended_bounds.max=${end}`

  }

}

document.registerElement('dash-analytics-summary-plays', { prototype: DashAnalyticsSummaryPlays.prototype })
