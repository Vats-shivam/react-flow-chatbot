export interface Action {
    type: string;
    content: string;
    conditions?:string[]|undefined;
  }