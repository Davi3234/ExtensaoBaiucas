export class Formulario {
  constructor(
    public id: number,
    public title: string,
    public lines: Line[]
  ) {}
}

export class Campo {
  constructor(
    public width: number,
    public label: string,
    public ref: string,
    public type: "text" | "password" | "number" | "dropDown" | "checkBox" | "datePicker" | "monthPicker" | "intlPhone" | "textarea" | "simpleText" | "radioGroup" | "autoComplete" | "colorPicker" | "time" | "autoCompleteObjetcData" | "button",
    public placeholder: string,
    public required: boolean,
    public maxWidth?: string,
    public minWidth?: string,
    public options?: Array<Option>,
    public rows?: number
  ) {}
}

export class Option {
  constructor(public id?: string, public nome?: string) {}
}

export class Line{
  constructor( public fields: Campo[]){}
}
