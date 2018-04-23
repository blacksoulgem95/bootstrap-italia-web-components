const css = require('bootstrap-italia/dist/css/bootstrap-italia.min.css');

export default class BITButton extends HTMLElement {
    get type() {
        return this.getAttribute('type')
    }

    set type(value) {
        this.setAttribute('type', value);
        this.toggleDrawer()
    }

    get size() {
        return this.getAttribute('size')
    }

    set size(value) {
        this.setAttribute('size', value);
        this.toggleDrawer()
    }

    get label() {
        return this.getAttribute('label')
    }

    set label(value) {
        this.setAttribute('label', value);
        this.toggleDrawer()
    }

    get disabled() {
        return this.hasAttribute('disabled');
    }

    set disabled(val) {
        // Reflect the value of `disabled` as an attribute.
        if (val) {
            this.setAttribute('disabled', '');
        } else {
            this.removeAttribute('disabled');
        }
        this.toggleDrawer();
    }

    constructor() {
        super();
        this.shadowRoot = this.attachShadow({mode: 'open'});

        this.toggleDrawer()
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        this.toggleDrawer();
    }

    toggleDrawer() {
        this.shadowRoot.innerHTML = '';
        let classes = 'btn';

        if (this.type && this.type.length > 0) {
            classes += ' btn-'  + this.type;
        }
        if (this.size && this.size.length > 0) {
            classes += ' btn-'  + this.size;
        }

        this.shadowRoot.innerHTML = `<style rel="stylesheet">${css}</style><button class="${classes}">${this.label}</button>`;
    }
}

window.customElements.define('bit-button', BITButton);