
export type alphanumeric = string | number;
export type InputType = 'color' | 'date' | 'datetime-local' | 'email' | 'month' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url' | 'week';
export type TextArea = 'textarea';
export type Slider = 'slider';
// export type ControlType = InputType | TextArea | Slider;
export enum eGridSpan {
    FULL = '1 1 100%',
    HALF = '1 1 calc(50% - 1.25rem)',
    ONE_THIRD = '1 1 calc(33.33% - 1.25rem)',
    ONE_FORTH = '1 1 calc(25% - 1.25rem)',
}

export interface ValidatorModel{
    required?:boolean;
    requiredTrue?:boolean;
    min?:number;
    max?:number;
    minLength?:number;
    maxLength?:number;
    email?:boolean;
    pattern?:string;
}

export interface BaseFormControlModel {
    name: string;
    label: string;
    value: alphanumeric;    
    colspan: eGridSpan;
    validators: ValidatorModel | null;
}
//Input
export interface InputBaseModel extends BaseFormControlModel {    
    placeholder: string;
    minLength: string;
    maxLength: string;
}
export interface InputModel extends InputBaseModel {
    type: InputType;    
}
export interface TextAreaModel extends InputBaseModel {
    type: TextArea;
    min: number;
}
//Slider
export interface SliderModel extends BaseFormControlModel {
    type: Slider;
    min: number;
    max: number;
    step: number;
}

export type FormControlModel = InputModel | TextAreaModel;