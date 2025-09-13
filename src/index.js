import { Paginator } from './paginator/paginator.component';
import { PageCounter } from './paginator/page-counter.component';

export { Paginator };
export { PageCounter };

import { setBasePath, registerIconLibrary } from '@awesome.me/webawesome/dist/webawesome.js';
setBasePath('./');

registerIconLibrary('hack', {
    resolver: name => `/hack/icons/${name}.svg`,
    mutator: svg => {
      svg.setAttribute('fill', 'currentColor');
    }
});