import { FormGroup } from "@angular/forms";

export interface FormComponent {
  form: FormGroup,
  groups: FormGrouping[]
}

interface FormGrouping{
  lines: FormLine[],
  layout: "none" | "card" | "expansion",
  title?: string,
  class?: string,
  expanded?: boolean
}

export interface FormCtrlAsyncOptions {
  options?: any[],
  readonly?: boolean,
  visible?: boolean,
  required?: boolean,
  reset?: boolean,
  tooltip?: string,
  mask?: string,
  width?: number,
  inputType?: "number" | "text" | "currency" | "email" | "time" | "cnpjCpf" | "password" | "onlyNumber" | "customPassword",
}

interface FormLine{
  fields: FormCtrl[],
  widthGap?: number,
  class?: string,
  layout?: string
}

interface FormCtrl{
  key: string,
  width: number,
  type: ""
  inputType?: "number" | "dropDown" | "checkBox" | "datePicker" | "monthPicker" | "intlPhone" | "textarea" | "simpleText" | "radioGroup" | "autoComplete" | "colorPicker" | "time" | "autoCompleteObjetcData";
  style?: "standard" | "fill" | "outline" | "legacy",
  label?: string
}
