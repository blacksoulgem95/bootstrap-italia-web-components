const css = require('bootstrap-italia/dist/css/bootstrap-italia.min.css');

export default class BITNavbar extends HTMLElement {

    constructor() {
        super();
        this.shadowRoot = this.attachShadow({mode: 'open'});

        this.toggleDrawer()
    }

    get size() {
        return this.getAttribute('size')
    }

    set size(value) {
        this.setAttribute('size', value);
        this.toggleDrawer()
    }

    get color() {
        return this.getAttribute('color')
    }

    set color(value) {
        this.setAttribute('color', value);
        this.toggleDrawer()
    }

    get kind() { // es. light or dark
        return this.getAttribute('kind')
    }

    set kind(value) {
        value = value === 'dark' ? value : 'light';
        this.setAttribute('kind', value);
        this.toggleDrawer()
    }

    get logoUri() {
        return this.getAttribute('logo-uri')
    }

    set logoUri(value) {
        this.setAttribute('logo-uri', value);
        this.toggleDrawer()
    }

    get brandHref() {
        return this.getAttribute('brand-href')
    }

    set brandHref(value) {
        this.setAttribute('brand-href', value);
        this.toggleDrawer()
    }

    get brand() {
        return this.getAttribute('brand')
    }

    set brand(value) {
        this.setAttribute('brand', value);
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

    attributeChangedCallback(attrName, oldVal, newVal) {
        this.toggleDrawer();
    }

    toggleDrawer() {
        let html = this.innerHTML;
        this.innerHTML = '';
        this.shadowRoot.innerHTML = '';
        let classes = [].concat(['btn']);
        let styles = [];

        if (this.size && this.size.length > 0) {
            classes.concat(['navbar-' + this.size]);
        }

        if (this.kind && this.kind.length > 0) {
            classes.concat(['navbar-' + this.kind]);
        }

        if (this.color && this.color.length > 0) {
            if (this.color.indexOf('#') !== -1 || this.color.indexOf('rgb') !== -1)
                classes.concat(['navbar-' + this.color]);
            else {
                styles.concat([`background-color: ${this.color}`])
            }
        }

        let brandImg = ``;
        if (this.logoUri && this.logoUri.length > 0) {
            brandImg = `<img src="${this.logoUri}" class="d-inline-block align-top" style="max-height: 30px;" alt="${this.brand}">`;
        }


        this.shadowRoot.innerHTML = `<style rel="stylesheet">${css}</style>
<nav class="${classes.join(' ')}" style="${styles.join(';')}">
    <a class="navbar-brand" href="${this.brandHref}">
        ${brandImg}
        ${this.brand}
    </a>
    ${html}
</nav>
`;
    }
}

window.customElements.define('bit-navbar', BITNavbar);