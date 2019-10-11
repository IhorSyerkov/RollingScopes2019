import { render, html } from "./node_modules/lit-html/lit-html.js";

class TodoItem extends HTMLElement {
  constructor() {
    super();
    this._root = this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.render();
  }
  disconnectedCallback() {}

  set text(value) {
    this._text = value;
  }
  get text() {
    return this._text;
  }
  set index(value) {
    this._index = value;
  }
  get index() {
    return this._index;
  }

  set checked(val) {
    this._checked = val;
    this.render();
  }

  get checked() {
    return this._checked;
  }

  _fireToggle(e) {
    e.preventDefault();
    this.dispatchEvent(new CustomEvent("toggle", { detail: this._index }));
  }

  _fireRemove(e) {
    e.preventDefault();
    this.dispatchEvent(new CustomEvent("remove", { detail: this._index }));
  }

  render() {
    render(this.template(), this._root, { eventContext: this });
  }

  template() {
    return html`
      <style>
        :host {
          display: block;
        }

        li.item {
          font-size: 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #ededed;
        }

        li.item span {
          word-break: break-word;
          padding: 15px;
          transition: color 0.4s;
          cursor: pointer;
        }

        li.item span.completed {
          color: #d9d9d9;
          text-decoration: line-through;
        }

        li.item button {
          outline: none;
        }

        li.item button {
          margin: 0;
          padding: 0;
          border: 0;
          background: none;
          font-size: 100%;
          vertical-align: baseline;
          font-family: inherit;
          font-weight: inherit;
          color: inherit;
        }

        li.item .destroy {
          width: 40px;
          height: 40px;
          font-size: 30px;
          color: #cc9a9a;
          margin-bottom: 11px;
          transition: color 0.2s ease-out;
        }

        li.item .destroy:hover {
          color: #af5b5e;
        }
      </style>
      <li class="item">
        <span
          class=${this._checked ? "completed" : ""}
          @click=${this._fireToggle}
        >
          ${this._text}
        </span>
        <button class="destroy" @click=${this._fireRemove}>x</button>
      </li>
    `;
  }
}

window.customElements.define("todo-item", TodoItem);
