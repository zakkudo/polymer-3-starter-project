import '@webcomponents/webcomponentsjs/webcomponents-bundle.js';
import './theme.css';

import('./Application').then(() => {
    document.body.appendChild(document.createElement('z-application'));
});
