import { Paginator } from './paginator/paginator.component';
import { PageCounter } from './paginator/page-counter.component';

export { Paginator };
export { PageCounter };

import { setBasePath, registerIconLibrary } from '@awesome.me/webawesome/dist/webawesome.js';
setBasePath('./');

registerIconLibrary('shoelace', {
    resolver: name => `/shoelace/icons/${name}.svg`,
    mutator: svg => {
      svg.setAttribute('fill', 'currentColor');
    }
});