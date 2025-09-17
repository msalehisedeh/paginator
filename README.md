
# Welcome to Paginator!

Paginator and PageCounter are Web Components based on shoelace to display a mechanisem to assist pagination.

**NOTE** Current version 2.0.0

Please send your requests or comments through [Comments/Requests](https://github.com/msalehisedeh/paginator/issues)

Get it from [NPM](https://www.npmjs.com/package/@sedeh/paginator)


![alt text](https://raw.githubusercontent.com/msalehisedeh/paginator/master/paginator.png  "What you would see when a paginator is used")

## Features
* Responsive
* Pagination enabled / disabled
* ADA Compliant

## Dependencies

```javascript
version 1: shoelace
version 2: web awesome

EXPORTS:
Paginator
pageCounter

```
## PageCounter Component

### Events
| Attribute                         | Description                                                                                         |
|-----------------------------------|-----------------------------------------------------------------------------------------------------|
| wa-page-change                    | triggered when a page is selected or page size is changed.                                          |

### Tokens
| Attribute                         | Description                                                                                         |
|-----------------------------------|-----------------------------------------------------------------------------------------------------|
| --wa-pagination-boundary-padding  | Will space out the padding of pagination counter's boundary buttons.                                |
| --wa-page-counter-alignment       | set the position of counter to the left or right or center.                                         |
| --wa-counter-background-color     | sets the background color of buttons other than colors defined by variant option if not assigned.   |
| --wa-counter-border-color         | sets the border color of buttons other than colors defined by variant option if not assigned.       |
| --wa-counter-yext-color           | sets the text color of buttons other than colors defined by variant option if not assigned.         |
| --wa-pagination-side-padding      | sets the padding of pagination as a whole.                                                          |
| --wa-pagination-counter-padding   | sets padding between counter buttons.                                                               |
| --wa-pagination-counter-radius    | sets border radious between counter buttons.                                                        |


### Attributes
| Attribute          |Type       | Description                                                                                             |
|--------------------|-----------|---------------------------------------------------------------------------------------------------------|
| size                | String   | Paginator visual size (height, padding of each page slot). 'small', 'medium', 'large'. Default is small |
| type                | String   | Paginator type. 'symbole', 'icon', 'text', 'number'. Default is number                                  |
| pill                | Boolean  | Show curves on sides of page counter and dropdown.                                                      |
| showDirections      | Boolean  | Show arrow icons on the page counter.                                                                   |
| pageSize            | Number   | number of items per page.                                                                               |
| collectionSize      | Number   | total items to be paginated.                                                                            |
| previousButtonLabel | String   | Start pagination label. Default is "Prev".                                                              |
| nextButtonLabel     | String   | End pagination label. Default is "Next".                                                                |
| variant             | String   | color settings of the paginator. 'default', 'primary', 'neutral'.                                       |
| activePage          | Number   | Inicated the page to be displayed as active/selected.                                                   |
| maxSize             | Number   | max number of buttons to be displayed in the pagination.                                                |
| disabled            | Boolean  | disable the entire pagination.                                                                          |
| rotate              | Boolean  | Enables number/symbol rotation in pagination slots if number of pages are more than maxSize.            |
| showBoundaries      | Boolean  | Allows boundary buttons display.                                                                        |
| showEllipses        | Boolean  | Includes ellipses section between the pagination buttons if roltation is enabled and number of pages are more than maxSize.      |
| label               | String   | Label to be read by screen reader. Default is 'Paginator'.                                              |
| startBoundaryLabel  | String   | label to be displayed on start boundary (e.g., 'Previous).                                              |
| endBoundaryLabel    | String   | label to be displayed on end boundary (e.g., 'Next).                                                    |
| items               | Array<any> | Icon names, symbols, or text.  if given will display the items in the array instead of page numbers.  |


## Paginator Component

### events
| Attribute                         | Description                                                                                         |
|-----------------------------------|-----------------------------------------------------------------------------------------------------|
| wa-page-ready                     | triggered when paginator is displayed for the first time.                                           |
| wa-page-change                    | triggered when a page is selected or page size is changed.                                          |


### Slots
| Attribute                         | Description                                                                                         |
|-----------------------------------|-----------------------------------------------------------------------------------------------------|
| paginationAddon                   | Creates a section to display label for the pagination counter.                                      |

### Design system
Create a css file with the following and modify its value to fit your application needs. Then include it in root of application css file.

| Attribute                         | Description                                                                                         |
|-----------------------------------|-----------------------------------------------------------------------------------------------------|
| --wa-description-alignment        | set the counter slot position.                                                                      |
| --wa-top-spacing                  | add top spacing to the pagination.                                                                  |
| --wa-selection-width              | set the width of the dropdown.                                                                      |
| --wa-paginator-direction          | set the direction of dropdown section and counter to row or column.                                 |
| --wa-align-selerction             | set the dropdown section alignment to the left, right, or center. this would be ideal to manage smaller view frames. |

### Attributes

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
| previousButtonLabel | String   | Start pagination label. Default is "Prev".                                                              |
| nextButtonLabel     | String   | End pagination label. Default is "Next".                                                                |
| variant             | String   | color settings of the paginator. 'default', 'primary', 'neutral'.                                       |


## Revision History

| Version | Description                                                                                                                    |
|---------|--------------------------------------------------------------------------------------------------------------------------------|
| 1.0.0   | Draft using shoelace                                                                                                           |
| 2.0.0   | Draft using webawesome                                                                                                         |
