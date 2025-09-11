
# Welcome to Paginator!

Paginator and PageCounter are Web Components based on shoelace to display a mechanisem to assist pagination.

**NOTE** Current version 1.0.0

Please send your requests or comments through [Comments/Requests](https://github.com/msalehisedeh/paginator/issues)

View it in action on [Live Demo](https://stackblitz.com/edit/paginator?file=app%2Fapp.component.ts)

Get it from [NPM](https://www.npmjs.com/package/@sedeh/paginator)


![alt text](https://raw.githubusercontent.com/msalehisedeh/paginator/master/paginator.png  "What you would see when a paginator is used")

## Features
* Responsive
* Pagination enabled / disabled
* ADA Compliant

## Dependencies

```javascript
Shoelace

EXPORTS:
Paginator
pageCounter

```

## Slots
| Attribute                         | Description                                                                                         |
|-----------------------------------|-----------------------------------------------------------------------------------------------------|
| paginationAddon                   | Creates a section to display label for the pagination counter.                                      |

## Design system
Create a css file with the following and modify its value to fit your application needs. Then include it in root of application css file.

| Attribute                         | Description                                                                                         |
|-----------------------------------|-----------------------------------------------------------------------------------------------------|
| --sl-page-counter-alignment       | set the position of counter to the left or right or center.                                         |
| --sl-page-counter-label-alignment | set the counter slot position.                                                                      |
| --sl-top-spacing                  | add top spacing to the pagination.                                                                  |
| --sl-selection-width              | set the width of the dropdown.                                                                      |
| --sl-paginator-direction          | set the direction of dropdown section and counter to row or column.                                 |
| --sl-align-selerction             | set the dropdown section alignment to the left, right, or center. this would be ideal to manage smaller view frames. |

## Attributes

| Attribute          |Type       | Description                                                                                             |
|--------------------|-----------|---------------------------------------------------------------------------------------------------------|
| size                | String   | Paginator visual size (height, padding of each page slot). 'small', 'medium', 'large'. Default is small |
| detaile             | String   | text to be displayed before pagination dropdown.                                                        |
| description         | String   | text to be displayed after pagination dropdown.                                                         |
| pageOptions         | String   | comma separated numbers to be displayed in dropdown.                                                    |
| pill                | Boolean  | Show curves on sides of page counter and dropdown.                                                      |
| showDirections      | Boolean  | Show arrow icons on the page counter.                                                                   |
| showLabels          | Boolean  | Show side labels on the page counter.                                                                   |
| maxSlots            | Number   | number of page counter slots.                                                                           |
| pageSize            | Number   | number of items per page.                                                                               |
| currentPage         | Number   | current paginated page.                                                                                 |
| collectionSize      | Number   | total items to be paginated.                                                                            |
| showPageSizing      | Boolean  | Show the dropdown.                                                                                      |
| disablePageSizing   | Boolean  | disable the dropdown.                                                                                   |
| showPaginator       | Boolean  | Show the page counter.                                                                                  |
| disablePaginator    | Boolean  | disable the pagination.                                                                                 |
| startDirectionLabel | String   | Start pagination label. Default is "Prev".                                                              |
| endDirectionLabel   | String   | End pagination label. Default is "Next".                                                                |
| variant             | String   | color settings of the paginator. 'default', 'primary', 'neutral'.                                       |

## Revision History

| Version | Description                                                                                                                    |
|---------|--------------------------------------------------------------------------------------------------------------------------------|
| 1.0.0   | First draft                                                                                                                    |
