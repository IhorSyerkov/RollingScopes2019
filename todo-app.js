import { render, html } from "./node_modules/lit-html/lit-html.js";

class TodoApp extends HTMLElement {
  constructor() {
    super();
    this._root = this.attachShadow({ mode: "open" });
    this._list = [];
  }

  connectedCallback() {
    this.render();
  }

  addItem(e) {
    this._list.push({ text: e.detail, checked: false });
    this.render();
  }

  removeItem(e) {
    this._list.splice(e.detail, 1);
    this.render();
  }

  toggleItem(e) {
    const item = this._list[e.detail];
    this._list = Object.assign([], this._list, {
      [e.detail]: { ...item, checked: !item.checked }
    });
    this.render();
  }

  render() {
    render(this.template(), this._root, { eventContext: this });
  }

  template() {
    return html`
      <style>
        h1 {
          font-size: 100px;
          font-weight: 100;
          text-align: center;
          color: rgba(175, 47, 47, 0.15);
        }

        section {
          background: #fff;
          margin: 30px 0 40px 0;
          position: relative;
          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
            0 25px 50px 0 rgba(0, 0, 0, 0.1);
        }

        ul {
          margin: 0;
          padding: 0;
          list-style: none;
          border-top: 1px solid #e6e6e6;
        }
      </style>
      <section>
        <todo-input @add-item=${this.addItem}></todo-input>
        <ul id="list-container">
          ${this._list.map(
            (item, index) => html`
              <todo-item
                .checked=${item.checked}
                .text=${item.text}
                .index=${index}
                @remove=${this.removeItem}
                @toggle=${this.toggleItem}
              ></todo-item>
            `
          )}
        </ul>
      </section>
    `;
  }
}

window.customElements.define("todo-app", TodoApp);
