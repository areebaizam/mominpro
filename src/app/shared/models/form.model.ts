
// TODO Remove this
export class IqamaValue {
    constructor(public type: ControlType, public value: alphanumericbool) { }
}
export class TimeOffsetValue {
    constructor(public type: ControlType, public value: alphanumericbool | null) { }
}
export type alphanumericbool = string | number | boolean | Date;
export type InputType = 'color' | 'email' | 'month' | 'password' | 'search' | 'tel' | 'text' | 'url' | 'week';
export type CustomType = 'iqama';
export type ControlType = InputType | CustomType | 'number' | 'select' | 'textarea' | 'slider' | 'series' | 'toggle' | 'date' | 'time' | 'placeholder';
export type ControlValue = alphanumericbool | TimeOffsetValue;
export enum eGridSpan {
    FULL = '1 1 calc(100% - 1.25rem)',
    TWO_THIRD = '1 1 calc(66.67% - 1.25rem)',
    HALF = '1 1 calc(50% - 1.25rem)',
    ONE_THIRD = '1 1 calc(33.33% - 1.25rem)',
    ONE_FOURTH = '1 1 calc(25% - 1.25rem)',
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
//Emty Placeholder
export interface PlaceholderModel extends BaseFormControlModel {
    type: 'placeholder',
}

//Iqamah
export interface TimeOffsetModel extends BaseFormControlModel {
    type: 'iqama',
    value: IqamaValue,
    options: IqamaOptions[];
}

export interface IqamaOptions {
    type: ControlType,
    typeLabel: string,
    recommended?: boolean,
    value: IqamaValue,
    control: FormControlModel,
}

export type FormControlModel = InputModel | TextAreaModel | SelectModel | SliderModel | NumberModel | SeriesModel | ToggleModel | TimeOffsetModel | DatePickerModel | PlaceholderModel;

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