

export type alphanumericbool = string | number | boolean | Date;
export type InputType = 'color' | 'email' | 'month' | 'password' | 'search' | 'tel' | 'text' | 'url' | 'week';
export type CustomType = 'iqamah' | 'athan' | 'flag';
export type AthanType = 'iqamah' | 'salah';
export type ControlType = InputType | CustomType | 'number' | 'select' | 'textarea' | 'slider' | 'series' | 'toggle' | 'date' | 'time' | 'placeholder';
export type ControlValue = alphanumericbool | ControlTypeValue | AthanTypeValue | FlagTypeValue;
export enum eGridSpan {
    FULL = '1 1 calc(100% - 1.25rem)',
    HALF = '1 1 calc(50% - 1.25rem)',
    ONE_THIRD = '1 1 calc(33.33% - 1.25rem)',
    ONE_FOURTH = '1 1 calc(25% - 1.25rem)',
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
//Time
export interface TimeModel extends BaseFormControlModel {
    type: 'time',
}
//Empty
export interface PlaceholderModel extends BaseFormControlModel {
    type: 'placeholder',
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

export type FormControlModel = InputModel | TextAreaModel | SelectModel | SliderModel | NumberModel | SeriesModel | ToggleModel | IqamahModel | AthanModel | FlagModel | TimeModel | DatePickerModel | PlaceholderModel;

export interface ReactiveForm {
    name: string;
    label: string;
    data: FormControlModel[];
}

export interface TabModel {
    id: string;
    label: string;
    editMode: boolean;
    forms: ReactiveForm[]
}