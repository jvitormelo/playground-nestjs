export class CreateTodoDto {
  public title: any;
  public isDone: boolean;

  constructor(props) {
    this.title = props.title;
  }
}
