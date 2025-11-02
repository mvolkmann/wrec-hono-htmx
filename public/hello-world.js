// Copy node_modules/wrec/dist/wrec.es.js to the public directory.
import { css, html, Wrec } from "./wrec.es.js";

class HelloWorld extends Wrec {
  static properties = {
    name: { type: String, value: "World" },
  };

  static css = css`
    p {
      color: purple;
    }
  `;

  static html = html` <p>Hello, <span>this.name</span>!</p> `;
}

HelloWorld.register();
