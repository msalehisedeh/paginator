import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';

import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/button-group/button-group.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';

export interface PaginationItemInterface {
  index: number;
  value?: string | number;
  disabled?: boolean;
}

@customElement('sl-page-counter')
export class PageCounter extends LitElement {
  static styles = css`
    :host {
      outline-style: none;
      display: inline-block;
      width: 100%;
      text-align: var(--sl-page-counter-alignment);
    }

    .button-group:not(:last-of-type) {
      margin-right: var(--sl-spacing-x-small);
    }

    .button {
      margin: var(--sl-spacing-1g) 0;
      padding: var(--sl-spacing-xxs) var(--sl-spacing-xxs);
    }
    .button.primary {
      --sl-counter-text-color: var(--sl-color-neutral-0);
      --sl-counter-background-color: var(--sl-color-primary-600);
      --sl-counter-border-color: var(--sl-color-primary-600);
    }
    .button.neutral {
      --sl-counter-text-color: var(--sl-color-neutral-0);
      --sl-counter-background-color: var(--sl-color-neutral-600);
      --sl-counter-border-color: var(--sl-color-neutral-600);
    }
    .button:focus, 
    .button:hover {
      opacity: 0.7;
    }

    .button::part(base) {
      height: 100%;
      border: 1px solid var(--sl-button-border-color, var(--sl-button-primary-bg));
      font-weight: var(--sl-button-label-font-weight);
      background-color: var(--sl-counter-background-color, var(--sl-color-neutral-0));
      border-color: var(--sl-counter-border-color , var(--sl-input-border-color));
      color: var(--sl-counter-text-color, var(--sl-color-neutral-700));
    }

    .button.active::part(base) {
      color: var(--sl-color-surface-fg-brand-primary);
      background-color: var(--sl-counter-text-color, var(--sl-color-neutral-0));
      border-color: var(--sl-counter-background-color , var(--sl-input-border-color));
    }

    .button::part(base):disabled {
      opacity: 0.8;
    }

    .button::part(label) {
      align-content: center;
    }

    .button.side.left {
      margin-right: var(--sl-pagination-side-padding);
    }

    .button.labeled {
      width: auto;
    }

    .button.labeled::part(base) {
      padding-left: 10px; 
      padding-right: 10px;
    }

    .button.counter {
      margin: 0 var(--sl-pagination-counter-padding, 0);
    }

    .button.counter::part(base) {
      border-radius: var(--sl-pagination-counter-radius, var(--sl-radius-xs));
    }
    .button.side.right {
      margin-left: var(--sl-pagination-side-padding);
    }

    .button.boundary.left {
      margin-right: var(--sl-pagination-boundary-padding);
    }

    .button.boundary.right {
      margin-left: var(--sl-pagination-boundary-padding);
    }
  `;

  @property({ type: Number }) activePage: number = 1;
  @property({ type: Number }) collectionSize: number = 1;
  @property({ type: Number }) pageSize: number = 1;
  @property({ type: Number }) maxSize!: number;
  @property({ type: Boolean }) disabled: boolean = false;
  @property({ type: Boolean }) rotate: boolean = false;
  @property({ type: Boolean }) showDirections: boolean = true;
  @property({ type: Boolean }) showBoundaries: boolean = false;
  @property({ type: Boolean }) showEllipses: boolean = false;
  @property({ type: Boolean }) pill!: boolean;
  @property({ type: String }) label: string = 'Paginator';
  @property({ type: String }) previousButtonLabel!: string;
  @property({ type: String }) nextButtonLabel!: string;
  @property({ type: String }) startBoundaryLabel!: string;
  @property({ type: String }) endBoundaryLabel!: string;
  @property({ type: String }) size: 'small' | 'medium' | 'large' = 'small';
  @property({ type: String }) variant: 'default' | 'primary' | 'neutral' = 'default';  
  @property({ type: Array }) symbols!: Array<any>;

  private totalPages: number = 1;
  private startIndex: number = 0;
  private triggered: boolean = false;

  private getEvent(event: CustomEvent) {
    const id = this.symbols ? this.symbols[this.activePage - 1] : this.activePage;

    event.preventDefault();
    event.stopPropagation();

    return new CustomEvent('sl-page-change', {
      detail: { source: 'sl-page-counter', value: id },
      bubbles: true,
      composed: true
    });
  }

  public goTo(index: number) {
    if (this.rotate && (this.maxSize < this.totalPages)) {
      this.startIndex = index > this.totalPages ? this.totalPages : index;
    }
    this.requestUpdate();
  }
  public start(event: CustomEvent) {
    this.activePage = 1;
    this.goTo(0)
    this.dispatchEvent(this.getEvent(event));
    return false;
  }

  public current(event: CustomEvent, next: number) {
    this.activePage = this.activePage + next;
    this.goTo(this.startIndex + next)
    this.dispatchEvent(this.getEvent(event));
    return false;
  }

  public end(event: CustomEvent) {
    this.activePage = this.totalPages;
    this.goTo(this.totalPages - this.maxSize)
    this.dispatchEvent(this.getEvent(event));
    return false;
  }

  protected handleClickEvent(event: CustomEvent, index: number) {
    this.activePage = index + 1;
    this.dispatchEvent(this.getEvent(event));
    this.requestUpdate();
    return false;
  }

  private triggerPaginationReady() {
    if (!this.triggered) {
      this.dispatchEvent(new CustomEvent('sl-page-ready', {
        detail: { source: 'sl-paginator', value: this.activePage },
        bubbles: true,
        composed: true
      }));
      this.triggered = true;
    }
  }

  private getPageItems(): Array<PaginationItemInterface> {
    if (this.symbols) {
      this.collectionSize = this.symbols.length;
      this.pageSize = this.pageSize > this.collectionSize ? this.collectionSize : this.pageSize;
      this.startIndex = 0;
    }
    const pageItems: Array<PaginationItemInterface> = [];
    this.totalPages = Math.ceil(this.collectionSize / this.pageSize);
    this.maxSize = this.maxSize ? this.maxSize : this.totalPages;
    this.activePage = this.activePage ? this.activePage : 1;

    if (this.totalPages > this.maxSize) {
      if (this.rotate) {
        if (this.showEllipses) {
          const index = this.activePage - this.maxSize;
          let firstIndex = index < 0 ? 0 : index;
          let lastIndex = firstIndex + this.maxSize;
          if (this.activePage < this.totalPages && this.activePage === lastIndex) {
            firstIndex += 1;
            lastIndex += 1;
          }
          pageItems.push({ index: 0, disabled: this.disabled, value: this.symbols ? this.symbols[0] : 1 });
          pageItems.push({ index: -1, disabled: true });
          for (let i = firstIndex + 1; i < lastIndex - 1; i++) {
            const flag = this.disabled || this.activePage === (this.symbols ? i : (i + 1));
            pageItems.push({ index: i, disabled: flag, value: this.symbols ? this.symbols[i] : i + 1 });
          }
          if (firstIndex + 1 < lastIndex - 1) {
            pageItems.push({ index: -1, disabled: true });
          }
          pageItems.push({
            index: this.symbols ? this.symbols.length - 1 : this.totalPages - 1,
            disabled: this.disabled,
            value: this.symbols ? this.symbols[this.symbols.length - 1] : this.totalPages
          });
        } else {
          const index = this.activePage - this.maxSize;
          const firstIndex = index < 0 ? 0 : index;
          const lastIndex = firstIndex + this.maxSize;
          for (let i = firstIndex; i < lastIndex; i++) {
            const flag = this.disabled || this.activePage === (this.symbols ? i : (i + 1));
            pageItems.push({ index: i, disabled: flag, value: this.symbols ? this.symbols[i] : i + 1 });
          }
        }
      } else {
        const halfSize = Math.floor(this.totalPages / 2);
        const startIndex = this.startIndex;
        if (this.activePage < halfSize + 1) {
          const lastValue = this.symbols ? this.symbols[this.symbols.length - 1] : this.totalPages;
          for (let i = startIndex; i < halfSize; i++) {
            const flag = this.disabled || this.activePage === (this.symbols ? i : (i + 1));
            pageItems.push({ index: i, disabled: flag, value: this.symbols ? this.symbols[i] : i + 1 });
          }
          pageItems.push({ index: -1, disabled: true });
          if (lastValue) {
            pageItems.push({ index: this.symbols ? this.symbols.length - 1 : this.totalPages - 1, disabled: this.disabled, value: lastValue });
          }
        } else {
          pageItems.push({ index: 0, disabled: this.disabled, value: this.symbols ? this.symbols[0] : 1 });
          pageItems.push({ index: -1, disabled: true });
          for (let i = halfSize; i < this.totalPages; i++) {
            const flag = this.disabled || this.activePage === (this.symbols ? i : (i + 1));
            pageItems.push({ index: i, disabled: flag, value: this.symbols ? this.symbols[i] : i + 1 });
          }
        }
      }
    } else {
      for (let i = 0; i < this.totalPages; i++) {
        const flag = this.disabled || this.activePage === (this.symbols ? i : (i + 1));
        pageItems.push({ index: i, disabled: flag, value: this.symbols ? this.symbols[i] : i + 1 });
      }
    }
    return pageItems;
  }

  override render() {
    const items = this.getPageItems();

    return html`
      <sl-button-group class="button-group" label=${this.label}>
        ${when(this.showBoundaries, () => html`
          <sl-button
            class="button boundary left ${this.variant}"
            ?labeled=${this.startBoundaryLabel}
            size=${this.size}
            ?pill=${this.pill}
            ?disabled=${this.disabled || this.activePage === 1}
            @click=${(event: CustomEvent) => this.start(event)}
          >
            ${when(this.startBoundaryLabel, () => html`${this.startBoundaryLabel}`)}
            ${when(!this.startBoundaryLabel, () => html`
              <sl-icon name="chevron-double-left" label="go to first page"></sl-icon>
            `)}
          </sl-button>
        `)}
        ${when(this.showDirections, () => html`
          <sl-button
            class="button side left ${this.variant}"
            ?labeled=${this.previousButtonLabel}
            size=${this.size}
            ?pill=${this.pill}
            ?disabled=${this.disabled || this.activePage === 1}
            @click=${(event: CustomEvent) => this.current(event, -1)}
          >
            ${when(this.previousButtonLabel, () => html`${this.previousButtonLabel}`)}
            ${when(!this.previousButtonLabel, () => html`
              <sl-icon name="chevron-left" label="go to previous page"></sl-icon>
            `)}
          </sl-button>
        `)}
        <!-- Render page items here -->
        ${items.map(item => html`
          <sl-button
            ?disabled=${item.disabled}
            class="button counter ${this.variant}"
            size=${this.size}
            @click=${(event: CustomEvent) => this.handleClickEvent(event, item.index)}
          >
            ${item.value}
          </sl-button>
        `)}
        ${when(this.showDirections, () => html`
          <sl-button
            class="button side right ${this.variant}"
            ?labeled=${this.nextButtonLabel}
            size=${this.size}
            ?pill=${this.pill}
            ?disabled=${this.disabled || this.activePage === this.totalPages}
            @click=${(event: CustomEvent) => this.current(event, 1)}
          >
            ${when(this.nextButtonLabel, () => html`${this.nextButtonLabel}`)}
            ${when(!this.nextButtonLabel, () => html`
              <sl-icon name="chevron-right" label="go to next page"></sl-icon>
            `)}
          </sl-button>
        `)}
        ${when(this.showBoundaries, () => html`
          <sl-button
            class="button boundary right ${this.variant}"
            ?labeled=${this.endBoundaryLabel}
            size=${this.size}
            ?pill=${this.pill}
            ?disabled=${this.disabled || this.activePage === this.totalPages}
            @click=${(event: CustomEvent) => this.end(event)}
          >
            ${when(this.endBoundaryLabel, () => html`${this.endBoundaryLabel}`)}
            ${when(!this.endBoundaryLabel, () => html`
              <sl-icon name="chevron-double-right" label="go to last page"></sl-icon>
            `)}
          </sl-button>
        `)}
      </sl-button-group>
      ${this.triggerPaginationReady()}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-page-counter': PageCounter;
  }
}