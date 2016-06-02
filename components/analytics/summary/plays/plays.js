import { DashAnalyticsSummary } from '../summary';

export class DashAnalyticsSummaryPlays extends DashAnalyticsSummary {

  update() {
    this.title.textContent = 'Foo';
    this.value.textContent = 'Bar';
  }

}
