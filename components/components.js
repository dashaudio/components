import { DashButton } from './button/button';

import { DashBox } from './box/box';
import { DashBoxHeader } from './box/header/header';

document.registerElement('dash-button', { prototype: DashButton.prototype });

document.registerElement('dash-box', { prototype: DashBox.prototype });
document.registerElement('dash-box-header', { prototype: DashBoxHeader.prototype });
