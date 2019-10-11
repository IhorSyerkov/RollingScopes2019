import { render, html } from "./node_modules/lit-html/lit-html.js";

class TodoInput extends HTMLElement {
  constructor() {
    super();
    this._root = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.$input = this._root.querySelector("input");
  }

  _handleSubmit(e) {
    e.preventDefault();
    if (!this.$input.value) return;
    this.dispatchEvent(
      new CustomEvent("add-item", { detail: this.$input.value })
    );
    this.$input.value = "";
  }

  render() {
    render(this.template(), this._root, { eventContext: this });
  }

  template() {
    return html`
      <style>
        #new-todo-form {
          position: relative;
          font-size: 24px;
          border-bottom: 1px solid #ededed;
        }

        #new-todo {
          background: rgba(0, 0, 0, 0.003);
          position: relative;
          margin: 0;
          width: 100%;
          font-size: 24px;
          line-height: 1.4em;
          outline: none;
          padding: 6px;
          border: 1px solid #ccc;
          box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
          box-sizing: border-box;
        }
      </style>
      <form id="new-todo-form" @submit=${this._handleSubmit}>
        <input
          id="new-todo"
          type="text"
          placeholder="What needs to be done?"
          autocomplete="off"
        />
      </form>
    `;
  }
}

window.customElements.define("todo-input", TodoInput);
