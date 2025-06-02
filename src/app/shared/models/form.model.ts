

export type alphanumericbool = string | number | boolean | Date;
export const INPUT_TYPES = ['color', 'email', 'month', 'search', 'tel', 'text', 'url', 'week'] as const;
export type InputType = typeof INPUT_TYPES[number];
export const CUSTOM_TYPES = ['input-toggle', 'option-select'] as const;
export type CustomType = typeof CUSTOM_TYPES[number];
export type CustomControlType = 'series' | 'time';
export type FormControlModel = InputModel | PasswordModel | TextAreaModel | SelectModel | SliderModel | NumberModel
    | SeriesModel | ToggleModel | InputToggleModel | OptionSelectModel | TimeModel | DatePickerModel | PlaceholderModel
    | CheckboxModel | RadioModel;
export type ControlType = InputType | CustomType | 'number' | 'select' | 'textarea' | 'slider' | 'series' | 'toggle' | 'date' | 'time' | 'placeholder' | 'hidden' | 'password' | 'checkbox' | 'radio';
export type ControlValue = alphanumericbool | InputToggleValue | OptionSelectValue;
export enum eGridSpan {
    FULL = '1 1 calc(100% - 1.25rem)',
    HALF = '1 1 calc(50% - 1.25rem)',
    ONE_THIRD = '1 1 calc(33.33% - 1.25rem)',
    ONE_FOURTH = '1 1 calc(25% - 1.25rem)',
    HIDDEN = '',//TODO Check the value
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
    type: ControlType;
    name: string;
    colspan: eGridSpan;
    label: string;
    value: ControlValue | null;
    validators: ValidatorModel | null;
}

//Placeholder
export interface PlaceholderModel extends BaseFormControlModel {
    type: 'placeholder',
}
//Input
export interface InputAttributes {
    placeholder: string;
    autocompleteLabel?: string;
}
export interface InputModel extends BaseFormControlModel {
    type: InputType;
    icon?: string;
    attr: InputAttributes;
}
//Password
export interface PasswordAttributes {
    autocompleteLabel: string;
}
export interface PasswordModel extends BaseFormControlModel {
    type: 'password';
    attr: PasswordAttributes;
}
//TextArea
export interface TextAreaAttributes {
    placeholder: string;
    rows: number;
}
export interface TextAreaModel extends BaseFormControlModel {
    type: 'textarea';
    attr: TextAreaAttributes;
}

//Date
export interface DatePickerModel extends BaseFormControlModel {
    type: 'date';
    hint: string;
}
//Slider
export interface SliderAttributes {
    min: number;
    max: number;
    step: number;
}
export interface SliderModel extends BaseFormControlModel {
    type: 'slider';
    attr: SliderAttributes;
}
//Select
export interface SelectOptionModel {
    value: alphanumericbool | null;
    name: string;
    recommended: boolean;
}
export interface SelectModel extends BaseFormControlModel {
    type: 'select';
    options: SelectOptionModel[];
}

//Number Model
export interface NumberAttributes {
    placeholder: string;
}
export interface NumberModel extends BaseFormControlModel {
    type: 'number',
    attr: NumberAttributes;
    suffix: string,
    step: number;
}
//Series
export interface SeriesOptionProperties {
    min: number,
    max: number,
    suffix: string,
    suffixUnit: string,
    baseLabel: string,
    recommended: alphanumericbool | null,
}
export interface SeriesModel extends BaseFormControlModel {
    type: 'series',
    optionProperties: SeriesOptionProperties;

}
//Toggle
export interface ToggleModel extends BaseFormControlModel {
    type: 'toggle',
}
export interface CheckboxModel extends BaseFormControlModel {
    type: 'checkbox';
    value: boolean;
}
export interface RadioModel extends BaseFormControlModel {
    type: 'radio';
}
//Time
export interface TimeAttributes {
    interval: string;
    min: string;
    max: string;
}
export interface TimeModel extends BaseFormControlModel {
    type: 'time',
    attr: TimeAttributes
}


// Custom Form Field : Input Toggle
export class InputToggleValue {
    constructor(public checked: boolean | null, public value: alphanumericbool | null) { }
}

export interface InputToggleModel extends BaseFormControlModel {
    type: 'input-toggle',
    toggleLabel: string,
    inputType: CustomControlType,
    value: InputToggleValue;
    props?: SeriesOptionProperties;
}
// Custom Form Field : Option Select
export interface SelectRadioOptionsModel {
    value: number | null;//must match the form control name option in the custom form fiels
    label: string;
    recommended?: boolean;
}
export interface CustomSelectOptionModel {
    optionValue: number | null;
    type: CustomControlType;
    attr: SeriesOptionProperties | TimeAttributes;
}
export class OptionSelectValue {
    constructor(public option: number | null, public value: alphanumericbool | null) { }
}
export interface OptionSelectModel extends BaseFormControlModel {
    type: 'option-select',
    options: SelectRadioOptionsModel[],
    value: OptionSelectValue;
    selectOptions: CustomSelectOptionModel[],
}

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