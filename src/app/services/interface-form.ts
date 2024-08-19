import { FormGroup } from "@angular/forms";

export interface FormComponent {
  form: FormGroup,
  groups: FormGrouping[]
}

export interface FormGrouping{
  lines: FormLine[],
  layout: "none" | "card" | "expansion",
  title?: string,
  class?: string,
  expanded?: boolean
}

export interface FormLine{
  fields: FormControlField[],
  widthGap?: number,
  class?: string,
  layout?: string
}

export interface FormControlField{
  ref: string,
  width: number,
  options?: any[],
  readonly?: boolean,
  visible?: boolean,
  required?: boolean,
  reset?: boolean,
  tooltip?: string,
  mask?: string,
  placeholder?: string,
  inputType?: "text" | "password" | "number" | "dropDown" | "checkBox" | "datePicker" | "monthPicker" | "intlPhone" | "textarea" | "simpleText" | "radioGroup" | "autoComplete" | "colorPicker" | "time" | "autoCompleteObjetcData" | "button";
  style?: "standard" | "fill" | "outline" | "legacy",
  label?: string
  buttontype?: "submit" | "reset" | "remove"
}
