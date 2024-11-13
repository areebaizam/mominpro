
export type alphanumericbool = string | number | boolean;
export type InputType = 'color' | 'date' | 'datetime-local' | 'email' | 'month' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url' | 'week';
export type ControlType = InputType | 'number' | 'select' | 'textarea' | 'slider' | 'series' | 'toggle';
export enum eGridSpan {
    FULL = '1 1 100%',
    HALF = '1 1 calc(50% - 1.25rem)',
    ONE_THIRD = '1 1 calc(33.33% - 1.25rem)',
    ONE_FORTH = '1 1 calc(25% - 1.25rem)',
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
}

export interface BaseFormControlModel {
    name: string;
    label: string;
    value: alphanumericbool;
    colspan: eGridSpan;
    validators: ValidatorModel | null;
    placeholder: string;
    type: ControlType;
}
//Input
export interface InputModel extends BaseFormControlModel {
    type: InputType;
}
export interface TextAreaModel extends BaseFormControlModel {
    type: 'textarea';
    rows: number;
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

export interface SelectOptionModel {
    value: alphanumericbool;
    name: string;
}

export interface NumberModel extends BaseFormControlModel {
    type: 'number',
    suffix: string,
    step: number;
}
export interface SeriesModel extends BaseFormControlModel {
    type: 'series',
    suffix: string,
}
export interface ToggleModel extends BaseFormControlModel {
    type: 'toggle',
}

export type FormControlModel = InputModel | TextAreaModel | SelectModel | SliderModel | NumberModel | SeriesModel | ToggleModel;