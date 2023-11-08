class Image extends HTMLElement {
  static tagName = "cruk-img";
  static attrs = {
    width: "width",
    height: "height",
    src: "src",
    alt: "alt",
    lowsrc: "lowsrc",
  };

  static css = `
    :host {
      --_img-shape-margin: var(--cruk-img__shape-margin, 0.75rem);
      --_img-background-color: var(--cruk-img__background-color, #ededed);
    }

    img {
      max-width: 100%;
      height: auto;
      vertical-align: middle;
      font-style: italic;
      background-repeat: no-repeat;
      background-size: cover;
      shape-margin: var(--_img-shape-margin);
      
      background-color: var(--_img-background-color);
    } 
  `;

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });
    const template = document.createElement("template");

    const width = this.getAttribute(Image.attrs.width);
    const height = this.getAttribute(Image.attrs.height);
    const src = this.getAttribute(Image.attrs.src);
    const alt = this.getAttribute(Image.attrs.alt);
    const lowsrc = this.getAttribute(Image.attrs.lowsrc);

    const sheet = new CSSStyleSheet();
    sheet.replaceSync(Image.css);
    shadowRoot.adoptedStyleSheets = [sheet];
    template.innerHTML = `
      <img
        style="background-image: url(${lowsrc})"
        src="${src}"
        alt="${alt || ''}"
        ${ width  && `width="${width}"`}
        ${ height  && `height="${height}"`}
      /> 
    `;
    shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

if ("customElements" in window) {
  customElements.define(Image.tagName, Image);
}
