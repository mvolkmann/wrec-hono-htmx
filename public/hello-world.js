// Copy node_modules/wrec/dist/wrec.es.js to the public directory.
// This is needed because this project does not use Vite
// to bundle the code needed on the client side.
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

HelloWorld.define("hello-world");
