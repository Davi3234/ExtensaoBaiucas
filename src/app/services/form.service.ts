export class Campo{
  constructor(
    public label: string,
    public type: string,
    public placeholder: string,
    public required: boolean,
    public options?: Array<Option>,
    public maxWidth?: string,
    public minWidth?: string,
    public rows?: number
  ){}
}

export class Formulario{
  constructor(public title: string, public fields: Campo[]){}
}

export class Option{
  constructor(public id: string, public nome: string){}
}
