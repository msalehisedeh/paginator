import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import { query } from 'lit/decorators/query.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import '@awesome.me/webawesome/dist/components/button/button.js';
import '@awesome.me/webawesome/dist/components/button-group/button-group.js';
import '@awesome.me/webawesome/dist/components/icon/icon.js';
import '@awesome.me/webawesome/dist/components/select/select.js';
import '@awesome.me/webawesome/dist/components/option/option.js';

import './page-counter.component';

@customElement('wa-paginator')
export class Paginator extends LitElement {
  static styles = css`
    :host {
      display: flex;
      width: 100%;
      flex-direction: var(--wa-paginator-direction, row);
      justify-content: space-between;
      --wa-spacing-3: 0 13px;
    }
    .page-counter {
      float: right;
      display: flex;
      padding-top: var(--wa-top-spacing);
    }
    .page-counter .label {
      white-space: nowrap;
      align-content: center;
      display: inline-block;
      padding: 0 5px;
      text-align: var(--wa-page-counter-label-alignment, right);
    }
    .page-counter span {
      height: 27px;
      display: inline-flex;
      white-space: nowrap;
      align-items: center;
    }
    .size-selection {
      float: left;
      display: flex;
      margin: var(--wa-spacing-6) 0;
      align-self: var(--wa-align-selerction, flex-start);
      padding-top: var(--wa-top-spacing);
    }
    .size-selection .selector {
      display: block;
      float: left;
      align-content: center;
      width: var(--wa-selection-width, 111px);
    }
    .size-selection .selector::part(combobox) {
      background-color: var(--wa-counter-background-color);
      border-color: var(--wa-counter-border-color);
      color: var(--wa-counter-text-color);
    }
    .size-selection .label {
      white-space: nowrap;
      float: left;
      align-content: center;
    }
    .size-selection .label:first-child {
      padding-right: 5px;
    }
    .size-selection .label:last-child {
      padding-left: 5px;
    }
    .size-selection .selector.primary::part(combobox) {
      background-color: var(--wa-counter-background-color, var(--wa-color-brand-fill-loud));
      border-color: var(--wa-counter-border-color, var(--wa-color-brand-fill-loud));
      color: var(--wa-counter-text-color, var(--wa-color-neutral-on-loud));
    }
    .size-selection .selector.primary::part(display-input),
    .size-selection .selector.primary::part(expand-icon) {
      color: var(--wa-color-neutral-on-loud);
    }
    .size-selection .selector.neutral::part(combobox) {
      background-color: var(--wa-counter-background-color, var(--wa-color-on-quiet));
      border-color: var(--wa-counter-border-color, var(--wa-color-neutral-loud));
      color: var(--wa-counter-text-color, var(--wa-color-neutral-on-loud));
    }
    .size-selection .selector.neutral::part(display-input),
    .size-selection .selector.neutral::part(expand-icon) {
      color: var(--wa-color-neutral-on-loud);
    }
    .size-selection .selector::part(combobox).disabled {
      bopavity: 0.8
    }
  `;

  @property({ type: String }) size: 'small' | 'medium' | 'large' = 'small';
  @property({ type: String }) variant: 'default' | 'primary' | 'neutral' = 'default';  
  @property({ type: String }) detail!: string;
  @property({ type: String }) description!: string;
  @property({ type: Boolean }) pill: boolean = false;
  @property({ type: Boolean }) showDirections: boolean = true;
  @property({ type: Boolean }) showLabels: boolean = true;
  @property({ type: Number }) maxSlots: number = 4;
  @property({ type: Array }) pageOptions!: string; // comma separated numbers
  @property({ type: Number }) pageSize!: number;
  @property({ type: Number }) currentPage!: number;
  @property({ type: Number }) collectionSize!: number;
  @property({ type: Boolean }) showPageSizing!: boolean;
  @property({ type: Boolean }) disablePageSizing!: boolean;
  @property({ type: Boolean }) showPaginator!: boolean;
  @property({ type: Boolean }) disablePaginator!: boolean;
  @property({ type: Boolean }) previousButtonLabel = 'Prev';
  @property({ type: Boolean }) nextButtonLabel = 'Next';

  @query('wa-page-counter') pagination: any;
  @query('.selector') selector: any;

  protected selectPageSize(event: CustomEvent) {
    this.pagination.pageSize = parseInt(this.selector.value, 10);
    this.pagination.currentPage = 1;
    this.pagination.activePage = 1;
    this.pagination.goTo(1);

    event.preventDefault();
    event.stopPropagation();

    this.dispatchEvent(new CustomEvent('wa-page-change', {
      detail: { source: 'wa-page-counter', value: 1 },
      bubbles: true,
      composed: true
    }));
  }

  override render() {
    return html`
      <div class="size-selection">
        ${when(this.detail, () => html`<div class="label" id=${this.id ? this.id + '-detail' : 'detail'}>${this.detail}</div>`)}
        ${when(this.pageOptions, () => html`
          <wa-select
            class="selector ${this.variant}"
            value=${this.pageSize}
            ?disabled=${this.disablePageSizing}
            size=${this.size}
            id=${this.id ? this.id + '-page-size' : 'page-size'}
            ?pill=${this.pill}
            @sl-change=${(event: CustomEvent) => this.selectPageSize(event)}
          >
            ${this.pageOptions.split(',').map(item => html`<wa-option value=${item}>${item}</wa-option>`)}
          </wa-select>
        `)}
        ${when(this.description, () => html`<div class="label" id=${this.id ? this.id + '-description' : 'description'}>${this.description}</div>`)}
      </div>
      <div class="page-counter">
        <div class="label" style="display: inline-block;">
          <slot name="paginationAddon"></slot>
        </div>
        ${when(this.showPaginator, () => html`
          <wa-page-counter
            size=${this.size}
            variant=${this.variant}
            id=${this.id ? this.id + '-pagination' : 'pagination'}
            ?pill=${this.pill}
            .collectionSize=${this.collectionSize ?? 10}
            .activePage=${this.currentPage ?? 1}
            .pageSize=${this.pageSize ?? 10}
            .maxSize=${this.maxSlots}
            ?disabled=${this.disablePaginator ?? false}
            .rotate=${true}
            .showEllipses=${true}
            ?showEllipses=${this.showDirections}
            ?showBoundaries=${this.showLabels}
            .previousButtonLabel=${ifDefined(this.previousButtonLabel)}
            .nextButtonLabel=${ifDefined(this.nextButtonLabel)}
          ></wa-page-counter>
        `)}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-paginator': Paginator;
  }
}