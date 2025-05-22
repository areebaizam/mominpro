

export type alphanumericbool = string | number | boolean | Date;
export type InputType = 'color' | 'email' | 'month' |  'search' | 'tel' | 'text' | 'url' | 'week';
export type CustomType = 'iqamah' | 'athan' | 'flag';
export type AthanType = 'iqamah' | 'salah';
export type ControlType = InputType | CustomType | 'number' | 'select' | 'textarea' | 'slider' | 'series' | 'toggle' | 'date' | 'time' | 'placeholder' | 'hidden' | 'password' | 'checkbox' | 'radio';
export type ControlValue = alphanumericbool | ControlTypeValue | AthanTypeValue | FlagTypeValue;
export enum eGridSpan {
    FULL = '1 1 calc(100% - 1.25rem)',
    HALF = '1 1 calc(50% - 1.25rem)',
    ONE_THIRD = '1 1 calc(33.33% - 1.25rem)',
    ONE_FOURTH = '1 1 calc(25% - 1.25rem)',
    HIDDEN = '',//TODO Check the value
}

export class ControlTypeValue {
    constructor(public type: ControlType, public value: alphanumericbool | null) { }
}
export class AthanTypeValue {
    constructor(public type: AthanType, public value: alphanumericbool | null) { }
}
export class FlagTypeValue {
    constructor(public type: boolean, public value: alphanumericbool | null) { }
}

export interface ValidatorModel {
    required?: boolean;
    requiredTrue?: boolean;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    email?: boolean;
    pattern?: string;
    matTimepickerMin?: string;
    matTimepickerMax?: string;
    matTimepickerParse?: boolean;

}

export interface BaseFormControlModel {
    name: string;
    label: string;
    value: ControlValue | null;
    colspan: eGridSpan;
    validators: ValidatorModel | null;
    type: ControlType;
}
//Input
export interface InputModel extends BaseFormControlModel {
    type: InputType;
    placeholder: string;
    icon?:string;
    autocompleteLabel?:string;
}
export interface PasswordModel extends BaseFormControlModel {
    type: 'password';
    autocompleteLabel:string;
}
//TextArea
export interface TextAreaModel extends BaseFormControlModel {
    type: 'textarea';
    placeholder: string;
    rows: number;
}
//Date
export interface DatePickerModel extends BaseFormControlModel {
    type: 'date';
    hint: string;
}
//Slider
export interface SliderModel extends BaseFormControlModel {
    type: 'slider';
    step: number;
}
//Select
export interface SelectModel extends BaseFormControlModel {
    type: 'select';
    options: SelectOptionModel[];
}
//Option
export interface SelectOptionModel {
    value: alphanumericbool | null;
    name: string;
    recommended: boolean;
}
//Number Model
export interface NumberModel extends BaseFormControlModel {
    type: 'number',
    placeholder: string;
    suffix: string,
    step: number;
}
//Series
export interface SeriesModel extends BaseFormControlModel {
    type: 'series',
    suffix: string,
    suffixUnit: string,
    baseLabel: string,
    recommendedValue: alphanumericbool | null,
}
//Toggle
export interface ToggleModel extends BaseFormControlModel {
    type: 'toggle',
}
export interface CheckboxModel extends BaseFormControlModel {
    type: 'checkbox';
    value:boolean;
}
export interface RadioModel extends BaseFormControlModel {
    type: 'radio';
}
//Time
export interface TimeModel extends BaseFormControlModel {
    type: 'time',
}
//Empty
export interface PlaceholderModel extends BaseFormControlModel {
    type: 'placeholder',
}
//Empty
export interface HiddenModel extends BaseFormControlModel {
    type: 'hidden',
}


export interface ControlTypeValueModel extends BaseFormControlModel {
    value: ControlTypeValue,

}
//Iqamah
export interface IqamahModel extends BaseFormControlModel {
    type: 'iqamah',
    value: ControlTypeValue;
    options: ControlTypeValueOptions[];
}
//Athaan
export interface AthanModel extends BaseFormControlModel {
    type: 'athan',
    value: AthanTypeValue;
    options: AthanControlTypeValueOptions[];
}

export interface FlagModel extends BaseFormControlModel {
    type: 'flag',
    typeLabel: string,
    value: FlagTypeValue;
    series: SeriesModel;
}

export interface ControlTypeValueOptions {
    type: ControlType,
    typeLabel: string,
    recommended?: boolean,
    value: ControlTypeValue,
    control: FormControlModel,
}

export interface AthanControlTypeValueOptions {
    value: AthanType;
    type: ControlType,
    typeLabel: string,
    recommended?: boolean,
    control: FormControlModel,
    subtype: AthanType;
}

export type FormControlModel = InputModel | PasswordModel | TextAreaModel | SelectModel | SliderModel | NumberModel 
| SeriesModel | ToggleModel | IqamahModel | AthanModel | FlagModel | TimeModel | DatePickerModel | PlaceholderModel 
| HiddenModel | CheckboxModel | RadioModel;

export interface ReactiveForm {
    name: string;
    label: string;
    data: FormControlModel[];
}

export interface TabModel<T extends string> {
  index: number;
  key: T;
  label: string;
  forms: ReactiveForm[];
}

export function generateTabs<T extends string, D extends Record<T, { label: string; forms: ReactiveForm[] }>>(
    definitions: D
): { tabForms: TabModel<T>[], indexes: Record<T, number> } {
    const entries = Object.entries(definitions) as [T, D[T]][];
    const indexes: Record<T, number> = {} as any;
    const tabForms = entries.map(([key, { label, forms }], index) => {
        indexes[key] = index;
        return { index, key, label, forms };
    });
    return { tabForms, indexes };
}