import { IItem } from "../types";

export class Item {
  protected itemElement: HTMLElement;
  protected title: HTMLElement;
  protected _id: string;

  constructor(template: HTMLTemplateElement) {
    this.itemElement = template.content
      .querySelector(".todo-item")
      .cloneNode(true) as HTMLElement;
    this.title = this.itemElement.querySelector(".todo-item__text");
  }

  set id(value: string) {
    this._id = value;
  }

  get id() {
    return this._id || "";
  }

  set name(value: string) {
    this.title.textContent = value;
  }

  get name() {
    return this.title.textContent || "";
  }

  render(item: IItem) {
    this.name = item.name;
    return this.itemElement;
  }
}
