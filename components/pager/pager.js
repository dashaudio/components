import template from './pager.html';
import styles from './host.scss';
import polyfills from '../common/polyfills';

export class DashPager extends HTMLElement {

  createdCallback() {
    let polyfilledStyles = polyfills.styles(styles, 'dash-pager');
    this.createShadowRoot().innerHTML = `<style>${polyfilledStyles}</style>${template}`;
  }

  set totalPages(total) {

    this.values.total = Math.max(1, Number(total));
    this.values.current = 1;

    this.updateArray();

  }

  set paddingPages(padding) {

    this.values.padding = Math.max(0, Number(padding));
    this.values.current = 1;

    this.updateArray();

  }

  showPage(number) {

    this.values.current = Math.max(1, Math.min(this.values.total, page));
    this.updateArray();

    this.change.next(page);

  }

  showPreviousPage() {
    this.showPage(Math.max(1, this.values.current - 1));
  }

  showNextPage() {
    this.showPage(Math.min(this.values.total, this.values.current + 1));
  }

  get firstPage() {
    return 1;
  }

  get lastPage() {
    return this.values.total;
  }

  get firstVisiblePage() {

    let value = this.values.current - this.values.padding;
    let expansion = this.values.total - (this.values.current + this.values.padding);

    return Math.max(1, value + Math.min(0, expansion));

  }

  get lastVisiblePage() {

    let value = this.values.current + this.values.padding;
    let expansion = this.values.current - this.values.padding - 1;

    return Math.min(this.values.total, value - Math.min(0, expansion));

  }

  get currentPage() {
    return this.values.current;
  }

}
