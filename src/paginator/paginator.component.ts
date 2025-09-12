import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import { query } from 'lit/decorators/query.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/button-group/button-group.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/select/select.js';
import '@shoelace-style/shoelace/dist/components/option/option.js';

import './page-counter.component';

@customElement('sl-paginator')
export class Paginator extends LitElement {
  static styles = css`
    :host {
      display: flex;
      width: 100%;
      flex-direction: var(--sl-paginator-direction, row);
      justify-content: space-between;
      --sl-select-padding: 0 13px;
    }
    .page-counter {
      float: right;
      display: flex;
      padding-top: var(--sl-top-spacing);
    }
    .page-counter .label {
      white-space: nowrap;
      align-content: center;
      display: inline-block;
      padding: 0 5px;
      text-align: var(--sl-page-counter-label-alignment, right);
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
      margin: var(--sl-spacing-1g) 0;
      align-self: var(--sl-align-selerction, flex-start);
      padding-top: var(--sl-top-spacing);
    }
    .size-selection .selector {
      display: block;
      float: left;
      align-content: center;
      width: var(--sl-selection-width, 111px);
    }
    .size-selection .selector::part(combobox) {
      background-color: var(--sl-counter-background-color);
      border-color: var(--sl-counter-border-color);
      color: var(--sl-counter-text-color);
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
    .size-selection .selector[variant='primary']::part(combobox) {
      background-color: var(--sl-counter-background-color, var(--sl-color-primary-600));
      border-color: var(--sl-counter-border-color, var(--sl-color-primary-600));
      color: var(--sl-counter-text-color, var(--sl-color-neutral-0));
    }
    .size-selection .selector[variant='primary']::part(display-input),
    .size-selection .selector[variant='primary']::part(expand-icon) {
      color: var(--sl-color-neutral-0);
    }
    .size-selection .selector[variant='neutral']::part(combobox) {
      background-color: var(--sl-counter-background-color, var(--sl-color-neutral-600));
      border-color: var(--sl-counter-border-color, var(--sl-color-neutral-600));
      color: var(--sl-counter-text-color, var(--sl-color-neutral-0));
    }
    .size-selection .selector[variant='neutral']::part(display-input),
    .size-selection .selector[variant='neutral']::part(expand-icon) {
      color: var(--sl-color-neutral-0);
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

  @query('sl-page-counter') pagination: any;
  @query('.selector') selector: any;

  protected selectPageSize(event: CustomEvent) {
    this.pagination.pageSize = parseInt(this.selector.value, 10);
    this.pagination.currentPage = 1;
    this.pagination.activePage = 1;
    this.pagination.goTo(1);

    event.preventDefault();
    event.stopPropagation();

    this.dispatchEvent(new CustomEvent('sl-page-change', {
      detail: { source: 'sl-page-counter', value: 1 },
      bubbles: true,
      composed: true
    }));
  }

  override render() {
    return html`
      <div class="size-selection">
        ${when(this.detail, () => html`<div class="label" id=${this.id ? this.id + '-detail' : 'detail'}>${this.detail}</div>`)}
        ${when(this.pageOptions, () => html`
          <sl-select
            class="selector"
            value=${this.pageSize}
            variant=${this.variant}
            ?disabled=${this.disablePageSizing}
            size=${this.size}
            id=${this.id ? this.id + '-page-size' : 'page-size'}
            ?pill=${this.pill}
            @sl-change=${(event: CustomEvent) => this.selectPageSize(event)}
          >
            ${this.pageOptions.split(',').map(item => html`<sl-option value=${item}>${item}</sl-option>`)}
          </sl-select>
        `)}
        ${when(this.description, () => html`<div class="label" id=${this.id ? this.id + '-description' : 'description'}>${this.description}</div>`)}
      </div>
      <div class="page-counter">
        <div class="label" style="display: inline-block;">
          <slot name="paginationAddon"></slot>
        </div>
        ${when(this.showPaginator, () => html`
          <sl-page-counter
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
          ></sl-page-counter>
        `)}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-paginator': Paginator;
  }
}