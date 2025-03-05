import { IToDoModel } from "../types";
import { IViewItemConstructor } from "./item";
import { IForm, IFormConstructor } from "./Form";
import { IPage } from "./Page";

export class ItemPresenter {
  protected itemTemplate: HTMLTemplateElement;
  protected formTemplate: HTMLTemplateElement;
  protected todoForm: IForm;
  protected todoEditForm: IForm;

  constructor(
    protected model: IToDoModel,
    protected formConstructor: IFormConstructor,
    protected viewPageConteiner: IPage,
    protected viewItemConstructor: IViewItemConstructor
  ) {
    this.itemTemplate = document.querySelector(
      "#todo-item-template"
    ) as HTMLTemplateElement;
    this.formTemplate = document.querySelector(
      "#todo-form-template"
    ) as HTMLTemplateElement;
  }

  init() {
    this.todoForm = new this.formConstructor(this.formTemplate);
    this.todoForm.setHandler(this.handleSubmitForm.bind(this));
    this.viewPageConteiner.formConteiner = this.todoForm.render();
  }

  handleSubmitForm(data: string) {
    this.model.addItem(data);
    this.renderView();
    this.todoForm.clearValue();
  }

  renderView() {
    const itemList = this.model.items
      .map((item) => {
        const todoItem = new this.viewItemConstructor(this.itemTemplate);
        const itemElement = todoItem.render(item);
        return itemElement;
      })
      .reverse();

    this.viewPageConteiner.todoConteiner = itemList;
  }
}
