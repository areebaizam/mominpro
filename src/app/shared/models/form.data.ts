import { CredentialConstants } from "./app.constant";
import { eGridSpan, FormControlModel, ReactiveForm } from "./form.model";

export const PLACEHOLDER_FORM_FIELD = {
    type: "placeholder",
    name: 'placeholder',
    colspan: eGridSpan.HALF,
} as FormControlModel;

export function createPlaceholderFormField(colspan: eGridSpan): FormControlModel {
    return { ...PLACEHOLDER_FORM_FIELD, colspan };
}

export const IQAMAH_FORM_SETTINGS_DATA = [
    {
        type: "date",
        name: 'startDate',
        label: 'Start date',
        value: new Date(),//TOD FIX Error        
        colspan: eGridSpan.ONE_THIRD,        
        validators: {
            required: true,
        },
        hint: 'MM/DD/YYYY',
    },
    createPlaceholderFormField(eGridSpan.ONE_THIRD),
    createPlaceholderFormField(eGridSpan.ONE_THIRD),
] as FormControlModel[];

export const IQAMAH_FORM_PRAYER_DATA = [
    {
        type: "iqamah",
        name: 'fajr',
        label: 'Fajr',
        value: { type: 'time', value: new Date(0, 0, 0, 4, 0) },
        colspan: eGridSpan.ONE_THIRD,
        validators: {
            required: true,
        },
        options: [
            {
                type: 'time',
                typeLabel: 'Fixed',
                recommended: true,
                control: {
                    name: 'time',
                    label: '',
                    value: null,
                    colspan: eGridSpan.ONE_FOURTH,
                    type: 'time',
                    validators: {
                        matTimepickerMin: '02:00',
                        matTimepickerMax: '10:00',
                    },
                }
            },
            {
                type: 'series',
                typeLabel: 'Offset',
                control: {
                    name: 'value',
                    label: '',
                    value: 20,
                    colspan: eGridSpan.ONE_FOURTH,
                    type: 'series',
                    validators: {
                        min: 0,
                        max: 30,
                    },
                    suffix: 'minutes after start time',
                    suffixUnit: 'minute after start time',
                    baseLabel: 'At start time',
                    recommendedValue: null,
                }
            },
        ]
    },
    {
        type: "iqamah",
        name: 'dhur',
        label: 'Dhuhr',
        value: { type: 'time', value: new Date(0, 0, 0, 12, 0) },
        validators: {
            required: true,
        },
        colspan: eGridSpan.ONE_THIRD,
        options: [
            {
                type: 'time',
                typeLabel: 'Fixed',
                recommended: true,
                control: {
                    name: 'time',
                    label: '',
                    value: null,
                    colspan: eGridSpan.ONE_FOURTH,
                    type: 'time',
                    validators: {
                        matTimepickerMin: '11:00',
                        matTimepickerMax: '16:00',
                    },
                }
            },
            {
                type: 'series',
                typeLabel: 'Offset',
                control: {
                    name: 'value',
                    label: '',
                    value: 20,
                    colspan: eGridSpan.ONE_FOURTH,
                    type: 'series',
                    validators: {
                        min: 0,
                        max: 60,
                    },
                    suffix: 'minutes after start time',
                    suffixUnit: 'minute after start time',
                    baseLabel: 'At start time',
                    recommendedValue: null,
                }
            },
        ]
    },
    {
        type: "iqamah",
        name: 'asr',
        label: 'Asr',
        value: { type: 'time', value: new Date(0, 0, 0, 16, 0) },
        validators: {
            required: true,
        },
        colspan: eGridSpan.ONE_THIRD,
        options: [
            {
                type: 'time',
                typeLabel: 'Fixed',
                recommended: true,
                control: {
                    name: 'time',
                    label: '',
                    value: null,
                    colspan: eGridSpan.ONE_FOURTH,
                    type: 'time',
                    validators: {
                        matTimepickerMin: '12:00',
                        matTimepickerMax: '20:00',
                    },
                }
            },
            {
                type: 'series',
                typeLabel: 'Offset',
                control: {
                    name: 'value',
                    label: '',
                    value: 20,
                    colspan: eGridSpan.ONE_FOURTH,
                    type: 'series',
                    validators: {
                        min: 0,
                        max: 60,
                    },
                    suffix: 'minutes after start time',
                    suffixUnit: 'minute after start time',
                    baseLabel: 'At start time',
                    recommendedValue: null,
                }
            },
        ]
    },
    {
        type: "iqamah",
        name: 'maghrib',
        label: 'Maghrib',
        value: { type: 'series', value: 0 },
        colspan: eGridSpan.ONE_THIRD,
        validators: {
            required: true,
        },
        options: [
            {
                type: 'time',
                typeLabel: 'Fixed',
                control: {
                    name: 'value',
                    label: '',
                    value: null,
                    colspan: eGridSpan.ONE_FOURTH,
                    type: 'time',
                    validators: {
                        matTimepickerMin: '14:00',
                        matTimepickerMax: '22:00',
                    },
                }
            },
            {
                type: 'series',
                typeLabel: 'Offset',
                recommended: true,
                control: {
                    name: 'value',
                    label: '',
                    value: 5,
                    colspan: eGridSpan.ONE_FOURTH,
                    type: 'series',
                    validators: {
                        min: 0,
                        max: 60,
                    },
                    suffix: 'minutes after start time',
                    suffixUnit: 'minute after start time',
                    baseLabel: 'At start time',
                    recommendedValue: null,
                }
            },
        ]
    },
    {
        type: "iqamah",
        name: 'isha',
        label: 'Isha',
        value: { type: 'time', value: new Date(0, 0, 0, 19, 0) },
        validators: {
            required: true,
        },
        colspan: eGridSpan.ONE_THIRD,
        options: [
            {
                type: 'time',
                typeLabel: 'Fixed',
                recommended: true,
                control: {
                    name: 'time',
                    label: '',
                    value: null,
                    colspan: eGridSpan.ONE_FOURTH,
                    type: 'time',
                }
            },
            {
                type: 'series',
                typeLabel: 'Offset',
                control: {
                    name: 'value',
                    label: '',
                    value: 20,
                    colspan: eGridSpan.ONE_FOURTH,
                    type: 'series',
                    validators: {
                        min: 0,
                        max: 60,
                    },
                    suffix: 'minutes after start time',
                    suffixUnit: 'minute after start time',
                    baseLabel: 'At start time',
                    recommendedValue: null,
                }
            },
        ]
    },
    createPlaceholderFormField(eGridSpan.ONE_THIRD),
] as FormControlModel[];

export const IQAMAH_FORM_JUMUAH_DATA = [
    {
        type: "time",
        name: 'first',
        label: 'First Jumuah (optional)',
        value: new Date(0, 0, 0, 12, 30),
        colspan: eGridSpan.ONE_THIRD,
        validators: {
            matTimepickerMin: '11:00',
            matTimepickerMax: '16:00',
        },
    },
    {
        type: "time",
        name: 'second',
        label: 'Second Jumuah (optional)',
        value: null,
        colspan: eGridSpan.ONE_THIRD,
        validators: {
            matTimepickerMin: '11:00',
            matTimepickerMax: '16:00',
        },
    },
    {
        type: "time",
        name: 'third',
        label: 'Third Jumuah (optional)',
        value: null,
        colspan: eGridSpan.ONE_THIRD,
        validators: {
            matTimepickerMin: '11:00',
            matTimepickerMax: '16:00',
        },
    },
    createPlaceholderFormField(eGridSpan.ONE_THIRD),
] as FormControlModel[];

export const PREFERENCES_FORM_HIJRI_DATA = [
    {
        type: "input-toggle",
        typeLabel: "Show",
        inputType: 'series',
        name: 'days',
        label: 'Days',
        value: { checked: true, value: null },
        colspan: eGridSpan.HALF,
        props: {
            min: -3,
            max: 3,
            suffix: 'days',
            suffixUnit: 'day',
            baseLabel: 'No change',
            recommendedValue: null,
        }
    },
    {
        type: "input-toggle",
        typeLabel: "Show time",
        inputType: 'time',
        name: 'daytime',
        label: 'Days Time',
        value: { checked: true, value: new Date('Tue May 27 2025 10:30:00 GMT-0700 (Pacific Daylight Time)') },
        colspan: eGridSpan.HALF,
        validators: {
            matTimepickerMin: '11:00',
            matTimepickerMax: '16:00',
        },
    },
    PLACEHOLDER_FORM_FIELD,
] as FormControlModel[];

export const PREFERENCES_FORM_RAMADAN_DATA = [
    {
        type: "input-toggle",
        typeLabel: "Enable",
        inputType: 'series',
        name: 'fajr',
        label: 'Fajr',
        value: { checked: false, value: 20 },
        colspan: eGridSpan.HALF,
        props: {
            min: 0,
            max: 60,
            suffix: 'minutes after start time',
            suffixUnit: 'minute after start time',
            baseLabel: 'At start time',
            recommended: 20,
        }
    },
    {
        type: "input-toggle",
        typeLabel: "Enable",
        inputType: 'series',
        name: 'maghrib',
        label: 'Maghrib',
        value: { checked: true, value: null },
        colspan: eGridSpan.HALF,
        props: {
            min: 0,
            max: 30,
            suffix: 'minutes after start time',
            suffixUnit: 'minute after start time',
            baseLabel: 'At start time',
            recommended: 0,
        }
    },
    {
        type: "input-toggle",
        typeLabel: "Enable",
        inputType: 'series',
        name: 'isha',
        label: 'Isha',
        value: { checked: false, value: 0 },
        colspan: eGridSpan.HALF,
        props: {
            min: 0,
            max: 60,
            suffix: 'minutes after start time',
            suffixUnit: 'minute after start time',
            baseLabel: 'At start time',
            recommended: 20,
        }
    },
    {
        type: "input-toggle",
        typeLabel: "Enable",
        inputType: 'series',
        name: 'taraweeh',
        label: 'Taraweeh',
        value: { checked: true, value: 10 },
        colspan: eGridSpan.HALF,
        props: {
            min: 0,
            max: 30,
            suffix: 'minutes after Isha Iqamah',
            suffixUnit: 'minute after Isha Iqamah',
            baseLabel: 'Soon after Isha Iqamah',
            recommended: null,
        }
    },
] as FormControlModel[];

export const SALAH_FORM_SETTINGS_DATA = [
    {
        type: "slider",
        name: 'fajrAngle',
        label: 'Fajr',
        value: 15,
        colspan: eGridSpan.HALF,
        attr: {
            min: 10,
            max: 20,
            step: .1,
        }
    },
    {
        type: "slider",
        name: 'ishaAngle',
        label: 'Isha',
        value: 15,
        colspan: eGridSpan.HALF,
        attr: {
            min: 10,
            max: 20,
            step: .1,
        }
    },
    {
        type: "select",
        name: 'method',
        label: 'Calculation Method',
        value: 'CUS',
        colspan: eGridSpan.ONE_THIRD,
        options: [
            {
                value: 'ISNA',
                name: 'Islamic Society of North America'
            },
            {
                value: 'CUS',
                name: 'Custom (Set Fajr/Isha Angles)'
            },
        ]

    },
    {
        type: "select",
        name: 'juristic',
        label: 'Asr Juristic (Madhab)',
        value: 0,
        colspan: eGridSpan.ONE_THIRD,
        options: [
            {
                value: 0,
                name: 'Standard (Shafi\'i, Maliki \& Hanbali)'
            },
            {
                value: 1,
                name: 'Later Asr (Hanafi)'
            },
        ]
    },
    {
        type: "select",
        name: 'rule',
        label: 'High Latitude Rule',
        value: 1,
        colspan: eGridSpan.ONE_THIRD,
        options: [
            {
                value: 0,
                name: 'NONE'
            },
            {
                value: 1,
                name: 'Twilight Angle (Recommended)',
                recommended: true,
            },
            {
                value: 2,
                name: 'Middle of the Night',
            },
            {
                value: 3,
                name: 'Seventh of the Night'
            },
        ]
    },
    createPlaceholderFormField(eGridSpan.ONE_THIRD),
] as FormControlModel[];
//TODO Check for validators
export const SALAH_FORM_OFFSET_DATA = [
    {
        type: "series",
        name: 'fajr',
        label: 'Fajr',
        value: 0,
        colspan: eGridSpan.ONE_THIRD,
        optionProperties: {
            min: -90,
            max: 120,
            suffix: 'minutes',
            suffixUnit: 'minute',
            baseLabel: 'No Change',
            recommended: 0,
        }
    },
    {
        type: "series",
        name: 'sunrise',
        label: 'Sunrise (Shuruq)',
        value: 0,
        colspan: eGridSpan.ONE_THIRD,
        optionProperties: {
            min: -30,
            max: 30,
            suffix: 'minutes',
            suffixUnit: 'minute',
            baseLabel: 'No Change',
            recommended: 0,
        }
    },
    {
        type: "series",
        name: 'dhur',
        label: 'Dhuhr',
        value: 2,
        colspan: eGridSpan.ONE_THIRD,
        optionProperties: {
            min: 1,
            max: 30,
            suffix: 'minutes after Zawal',
            suffixUnit: 'minute after Zawal',
            baseLabel: 'At Zawal',
            recommended: 2,
        },
    },
    {
        type: "series",
        name: 'asr',
        label: 'Asr',
        value: 0,
        colspan: eGridSpan.ONE_THIRD,
        optionProperties: {
            min: -90,
            max: 120,
            suffix: 'minutes',
            suffixUnit: 'minute',
            baseLabel: 'No Change',
            recommended: 0,
        }
    },
    {
        type: "series",
        name: 'maghrib',
        label: 'Maghrib',
        value: 2,
        colspan: eGridSpan.ONE_THIRD,
        optionProperties: {
            min: 0,
            max: 30,
            suffix: 'minutes after Sunset',
            suffixUnit: 'minute after Sunset',
            baseLabel: 'At Sunset',
            recommended: 0,
        },
    },
    {
        type: "series",
        name: 'isha',
        label: 'Isha',
        value: 0,
        colspan: eGridSpan.ONE_THIRD,
        optionProperties: {
            min: 0,
            max: 60,
            suffix: 'minutes',
            suffixUnit: 'minute',
            baseLabel: 'No Change',
            recommended: 0,
        },
    },
] as FormControlModel[];

export const ATHAN_FORM_SALAH_DATA = [
    {
        type: "athan",
        name: 'fajr',
        label: 'Fajr',
        value: { type: 'iqamah', value: 10 },
        colspan: eGridSpan.ONE_THIRD,
        validators: {
            required: true,
        },
        options: [
            {
                type: 'series',
                typeLabel: 'Iqamah',
                subtype: 'iqamah',
                control: {
                    name: 'value',
                    label: '',
                    value: 20,
                    colspan: eGridSpan.ONE_FOURTH,
                    type: 'series',
                    validators: {
                        min: 0,
                        max: 30,
                    },
                    suffix: 'minutes before Iqamah',
                    suffixUnit: 'minute before Iqamah',
                    baseLabel: 'Soon before Iqamah',
                    recommendedValue: null,
                }
            },
            {
                type: 'series',
                typeLabel: 'Salah',
                subtype: 'salah',
                control: {
                    name: 'value',
                    label: '',
                    value: 20,
                    colspan: eGridSpan.ONE_FOURTH,
                    type: 'series',
                    validators: {
                        min: 0,
                        max: 30,
                    },
                    suffix: 'minutes after salah',
                    suffixUnit: 'minute after salah',
                    baseLabel: 'Salah start time',
                    recommendedValue: null,
                }
            },
        ]
    },
    {
        type: "athan",
        name: 'dhuhr',
        label: 'Dhuhr',
        value: { type: 'iqamah', value: 10 },
        colspan: eGridSpan.ONE_THIRD,
        validators: {
            required: true,
        },
        options: [
            {
                type: 'series',
                typeLabel: 'Iqamah',
                subtype: 'iqamah',
                control: {
                    name: 'value',
                    label: '',
                    value: 20,
                    colspan: eGridSpan.ONE_FOURTH,
                    type: 'series',
                    validators: {
                        min: 0,
                        max: 30,
                    },
                    suffix: 'minutes before Iqamah',
                    suffixUnit: 'minute before Iqamah',
                    baseLabel: 'Soon before Iqamah',
                    recommendedValue: null,
                }
            },
            {
                type: 'series',
                typeLabel: 'Salah',
                subtype: 'salah',
                control: {
                    name: 'value',
                    label: '',
                    value: 20,
                    colspan: eGridSpan.ONE_FOURTH,
                    type: 'series',
                    validators: {
                        min: 0,
                        max: 30,
                    },
                    suffix: 'minutes after salah',
                    suffixUnit: 'minute after salah',
                    baseLabel: 'Salah start time',
                    recommendedValue: null,
                }
            },
        ]
    },
    {
        type: "athan",
        name: 'asr',
        label: 'Asr',
        value: { type: 'iqamah', value: 10 },
        colspan: eGridSpan.ONE_THIRD,
        validators: {
            required: true,
        },
        options: [
            {
                type: 'series',
                typeLabel: 'Iqamah',
                subtype: 'iqamah',
                control: {
                    name: 'value',
                    label: '',
                    value: 20,
                    colspan: eGridSpan.ONE_FOURTH,
                    type: 'series',
                    validators: {
                        min: 0,
                        max: 30,
                    },
                    suffix: 'minutes before Iqamah',
                    suffixUnit: 'minute before Iqamah',
                    baseLabel: 'Soon before Iqamah',
                    recommendedValue: null,
                }
            },
            {
                type: 'series',
                typeLabel: 'Salah',
                subtype: 'salah',
                control: {
                    name: 'value',
                    label: '',
                    value: 20,
                    colspan: eGridSpan.ONE_FOURTH,
                    type: 'series',
                    validators: {
                        min: 0,
                        max: 30,
                    },
                    suffix: 'minutes after salah',
                    suffixUnit: 'minute after salah',
                    baseLabel: 'Salah start time',
                    recommendedValue: null,
                }
            },
        ]
    },
    {
        type: "athan",
        name: 'maghrib',
        label: 'Maghrib',
        value: { type: 'salah', value: 0 },
        colspan: eGridSpan.ONE_THIRD,
        validators: {
            required: true,
        },
        options: [
            {
                type: 'series',
                typeLabel: 'Iqamah',
                subtype: 'iqamah',
                control: {
                    name: 'value',
                    label: '',
                    value: 20,
                    colspan: eGridSpan.ONE_FOURTH,
                    type: 'series',
                    validators: {
                        min: 0,
                        max: 30,
                    },
                    suffix: 'minutes before Iqamah',
                    suffixUnit: 'minute before Iqamah',
                    baseLabel: 'Soon before Iqamah',
                    recommendedValue: null,
                }
            },
            {
                type: 'series',
                typeLabel: 'Salah',
                subtype: 'salah',
                control: {
                    name: 'value',
                    label: '',
                    value: 20,
                    colspan: eGridSpan.ONE_FOURTH,
                    type: 'series',
                    validators: {
                        min: 0,
                        max: 30,
                    },
                    suffix: 'minutes after salah',
                    suffixUnit: 'minute after salah',
                    baseLabel: 'Salah start time',
                    recommendedValue: null,
                }
            },
        ]
    },
    {
        type: "athan",
        name: 'isha',
        label: 'Isha',
        value: { type: 'iqamah', value: 10 },
        colspan: eGridSpan.ONE_THIRD,
        validators: {
            required: true,
        },
        options: [
            {
                type: 'series',
                typeLabel: 'Iqamah',
                subtype: 'iqamah',
                control: {
                    name: 'value',
                    label: '',
                    value: 20,
                    colspan: eGridSpan.ONE_FOURTH,
                    type: 'series',
                    validators: {
                        min: 0,
                        max: 30,
                    },
                    suffix: 'minutes before Iqamah',
                    suffixUnit: 'minute before Iqamah',
                    baseLabel: 'Soon before Iqamah',
                    recommendedValue: null,
                }
            },
            {
                type: 'series',
                typeLabel: 'Salah',
                subtype: 'salah',
                control: {
                    name: 'value',
                    label: '',
                    value: 20,
                    colspan: eGridSpan.ONE_FOURTH,
                    type: 'series',
                    validators: {
                        min: 0,
                        max: 30,
                    },
                    suffix: 'minutes after salah',
                    suffixUnit: 'minute after salah',
                    baseLabel: 'Salah start time',
                    recommendedValue: null,
                }
            },
        ]
    },
    createPlaceholderFormField(eGridSpan.ONE_THIRD),
] as FormControlModel[];

export const ATHAN_FORM_RAMADAN_DATA = [
    {
        type: "athan",
        name: 'fajr',
        label: 'Fajr',
        value: { type: 'salah', value: 0 },
        colspan: eGridSpan.ONE_THIRD,
        validators: {
            required: true,
        },
        options: [
            {
                type: 'series',
                typeLabel: 'Iqamah',
                subtype: 'iqamah',
                control: {
                    name: 'value',
                    label: '',
                    value: 20,
                    colspan: eGridSpan.ONE_FOURTH,
                    type: 'series',
                    validators: {
                        min: 0,
                        max: 30,
                    },
                    suffix: 'minutes before Iqamah',
                    suffixUnit: 'minute before Iqamah',
                    baseLabel: 'Soon before Iqamah',
                    recommendedValue: null,
                }
            },
            {
                type: 'series',
                typeLabel: 'Salah',
                subtype: 'salah',
                control: {
                    name: 'value',
                    label: '',
                    value: 20,
                    colspan: eGridSpan.ONE_FOURTH,
                    type: 'series',
                    validators: {
                        min: 0,
                        max: 30,
                    },
                    suffix: 'minutes after salah',
                    suffixUnit: 'minute after salah',
                    baseLabel: 'Salah start time',
                    recommendedValue: null,
                }
            },
        ]
    },
    {
        type: "athan",
        name: 'dhuhr',
        label: 'Dhuhr',
        value: { type: 'iqamah', value: 10 },
        colspan: eGridSpan.ONE_THIRD,
        validators: {
            required: true,
        },
        options: [
            {
                type: 'series',
                typeLabel: 'Iqamah',
                subtype: 'iqamah',
                control: {
                    name: 'value',
                    label: '',
                    value: 20,
                    colspan: eGridSpan.ONE_FOURTH,
                    type: 'series',
                    validators: {
                        min: 0,
                        max: 30,
                    },
                    suffix: 'minutes before Iqamah',
                    suffixUnit: 'minute before Iqamah',
                    baseLabel: 'Soon before Iqamah',
                    recommendedValue: null,
                }
            },
            {
                type: 'series',
                typeLabel: 'Salah',
                subtype: 'salah',
                control: {
                    name: 'value',
                    label: '',
                    value: 20,
                    colspan: eGridSpan.ONE_FOURTH,
                    type: 'series',
                    validators: {
                        min: 0,
                        max: 30,
                    },
                    suffix: 'minutes after salah',
                    suffixUnit: 'minute after salah',
                    baseLabel: 'Salah start time',
                    recommendedValue: null,
                }
            },
        ]
    },
    {
        type: "athan",
        name: 'asr',
        label: 'Asr',
        value: { type: 'iqamah', value: 10 },
        colspan: eGridSpan.ONE_THIRD,
        validators: {
            required: true,
        },
        options: [
            {
                type: 'series',
                typeLabel: 'Iqamah',
                subtype: 'iqamah',
                control: {
                    name: 'value',
                    label: '',
                    value: 20,
                    colspan: eGridSpan.ONE_FOURTH,
                    type: 'series',
                    validators: {
                        min: 0,
                        max: 30,
                    },
                    suffix: 'minutes before Iqamah',
                    suffixUnit: 'minute before Iqamah',
                    baseLabel: 'Soon before Iqamah',
                    recommendedValue: null,
                }
            },
            {
                type: 'series',
                typeLabel: 'Salah',
                subtype: 'salah',
                control: {
                    name: 'value',
                    label: '',
                    value: 20,
                    colspan: eGridSpan.ONE_FOURTH,
                    type: 'series',
                    validators: {
                        min: 0,
                        max: 30,
                    },
                    suffix: 'minutes after salah',
                    suffixUnit: 'minute after salah',
                    baseLabel: 'Salah start time',
                    recommendedValue: null,
                }
            },
        ]
    },
    {
        type: "athan",
        name: 'maghrib',
        label: 'Maghrib',
        value: { type: 'salah', value: 0 },
        colspan: eGridSpan.ONE_THIRD,
        validators: {
            required: true,
        },
        options: [
            {
                type: 'series',
                typeLabel: 'Iqamah',
                subtype: 'iqamah',
                control: {
                    name: 'value',
                    label: '',
                    value: 20,
                    colspan: eGridSpan.ONE_FOURTH,
                    type: 'series',
                    validators: {
                        min: 0,
                        max: 30,
                    },
                    suffix: 'minutes before Iqamah',
                    suffixUnit: 'minute before Iqamah',
                    baseLabel: 'Soon before Iqamah',
                    recommendedValue: null,
                }
            },
            {
                type: 'series',
                typeLabel: 'Salah',
                subtype: 'salah',
                control: {
                    name: 'value',
                    label: '',
                    value: 20,
                    colspan: eGridSpan.ONE_FOURTH,
                    type: 'series',
                    validators: {
                        min: 0,
                        max: 30,
                    },
                    suffix: 'minutes after salah',
                    suffixUnit: 'minute after salah',
                    baseLabel: 'Salah start time',
                    recommendedValue: null,
                }
            },
        ]
    },
    {
        type: "athan",
        name: 'isha',
        label: 'Isha',
        value: { type: 'salah', value: 0 },
        colspan: eGridSpan.ONE_THIRD,
        validators: {
            required: true,
        },
        options: [
            {
                type: 'series',
                typeLabel: 'Iqamah',
                subtype: 'iqamah',
                control: {
                    name: 'value',
                    label: '',
                    value: 20,
                    colspan: eGridSpan.ONE_FOURTH,
                    type: 'series',
                    validators: {
                        min: 0,
                        max: 30,
                    },
                    suffix: 'minutes before Iqamah',
                    suffixUnit: 'minute before Iqamah',
                    baseLabel: 'Soon before Iqamah',
                    recommendedValue: null,
                }
            },
            {
                type: 'series',
                typeLabel: 'Salah',
                subtype: 'salah',
                control: {
                    name: 'value',
                    label: '',
                    value: 20,
                    colspan: eGridSpan.ONE_FOURTH,
                    type: 'series',
                    validators: {
                        min: 0,
                        max: 30,
                    },
                    suffix: 'minutes after salah',
                    suffixUnit: 'minute after salah',
                    baseLabel: 'Salah start time',
                    recommendedValue: null,
                }
            },
        ]
    },
    createPlaceholderFormField(eGridSpan.ONE_THIRD),
] as FormControlModel[];

export const MOSQUE_FORM_GENERAL_DATA = [
    {
        type: "hidden",
        name: 'organisationId',
        label: 'Organisation ID',
        value: null,
        colspan: eGridSpan.HIDDEN,
        validators: null
    },
    {
        type: "text",
        name: 'name',
        label: 'Mosque Name',
        value: null,
        placeholder: 'Ex: Al Hidaya Center',
        colspan: eGridSpan.HALF,
        validators: {
            required: true,
            minLength: 3,
            maxLength: 100
        }
    },
    {
        type: "text",
        name: 'alternateId',
        label: 'Public URL',
        value: null,
        attr: {
            placeholder: 'Ex: Add tags separated by comma',
        },
        colspan: eGridSpan.HALF,
        validators: {
            maxLength: 100,
            required: true,
        }
    }
] as FormControlModel[];

export const MOSQUE_FORM_ADDRESS_DATA = [
    {
        type: "textarea",
        name: 'address',
        label: 'Address',
        value: null,
        placeholder: 'Ex: 4/189 Montogemery St.',
        colspan: eGridSpan.FULL,
        validators: {
            required: true,
            minLength: 3,
            maxLength: 500,
        },
        min: 2,
    },
    {
        type: "text",
        name: 'city',
        label: 'City',
        value: null,
        placeholder: 'Ex: San Franciso',
        colspan: eGridSpan.ONE_FOURTH,
        validators: {
            required: true,
            minLength: 3,
            maxLength: 100
        }
    },
    {
        type: "text",
        name: 'state',
        label: 'State / Province',
        value: null,
        placeholder: 'Ex: California',
        colspan: eGridSpan.ONE_FOURTH,
        validators: {
            required: true,
            minLength: 3,
            maxLength: 100
        }
    },
    {
        type: "text",
        name: 'code',
        label: 'Postal / Zip Code',
        value: null,
        placeholder: 'Ex: 90220 / V6P1Z3',
        colspan: eGridSpan.ONE_FOURTH,
        validators: {
            required: true,
            minLength: 3,
            maxLength: 20
        }
    },
    {
        type: "select",
        name: 'country',
        label: 'Country',
        value: null,
        colspan: eGridSpan.ONE_FOURTH,
        validators: {
            required: true,
        },
        options: [
            {
                value: null,
                name: 'Select Country'
            },
            {
                value: 'US',
                name: 'United States of America'
            },
            {
                value: 'CA',
                name: 'Canada'
            },
        ]

    },
] as FormControlModel[];

export const MOSQUE_FORM_COORDINATE_DATA = [
    {
        type: 'number',
        name: 'latitude',
        label: 'Latitude',
        value: null,
        placeholder: 'Ex: 40.7128',
        colspan: eGridSpan.ONE_THIRD,
        step: 2,
        validators: {
            required: true,
            maxLength: 20,
            min: -90,
            max: 90,
        }
    },
    {
        type: 'number',
        name: 'longitude',
        label: 'Longitude',
        value: null,
        placeholder: 'Ex: -74.0060',
        colspan: eGridSpan.ONE_THIRD,
        step: 2,
        validators: {
            required: true,
            min: -180,
            max: 180,
            maxLength: 20,
        }
    },
    {
        type: "select",
        name: 'timezoneId',
        label: 'Timezone',
        value: null,
        colspan: eGridSpan.ONE_THIRD,
        validators: {
            required: true,
        },
        options: [
            {
                value: null,
                name: 'Select timezone'
            },
            {
                value: 'America/New_York',
                name: 'Eastern Time(GMT -05:00)'
            },
            {
                value: 'America/Vancouver',
                name: 'Pacific Time(GMT -08:00)'
            },
        ]

    },
    createPlaceholderFormField(eGridSpan.ONE_THIRD),
] as FormControlModel[];

export const MOSQUE_FORM_CONTACT_DATA = [
    {
        type: "text",
        name: 'phone',
        label: 'Phone (Optional)',
        prefix: '+',
        value: null,
        placeholder: 'Ex: +1 604 500 500',
        colspan: eGridSpan.ONE_THIRD,
        validators: {
            maxLength: 100
        }
    },
    {
        type: "email",
        name: 'email',
        label: 'Email (Optional)',
        value: null,
        placeholder: 'Ex: mosque@gmail.com',
        colspan: eGridSpan.ONE_THIRD,
        validators: {
            email: true,
            maxLength: 100
        }
    },
    {
        type: "text",
        name: 'website',
        label: 'Website (Optional)',
        value: null,
        placeholder: 'Ex: www.my-mosque.com',
        colspan: eGridSpan.ONE_THIRD,
        validators: {
            maxLength: 100,
        }
    },
    createPlaceholderFormField(eGridSpan.ONE_THIRD)
] as FormControlModel[];


export const CRED_FORM_LOGIN_DATA = [
    {
        type: "text",
        name: 'email',
        label: 'Email',
        value: null,
        colspan: eGridSpan.HALF,
        validators: {
            required: true,
            email: true,
            maxLength: 254,
        },
        attr: {
            placeholder: 'Ex: john.doe@gmail.com',
            icon: 'alternate_email',
            autocompleteLabel: 'username',
        }
    },
    {
        type: "password",
        name: 'password',
        label: 'Password',
        value: null,
        colspan: eGridSpan.HALF,
        validators: {
            required: true,
            minLength: 8,//TODO Robust password with custom validation
        },
        attr: {
            autocompleteLabel: 'current-password',
        },
    },
    // {
    //     type: "checkbox",
    //     name: 'rememberMe',
    //     label: 'Remember Me',
    //     value: false,
    //     colspan: eGridSpan.HALF,
    // },
    // createPlaceholderFormField(eGridSpan.HALF),
] as FormControlModel[];

export const CRED_FORM_SIGNUP_DATA = [
    {
        type: "text",
        name: 'email',
        label: 'Email',
        value: null,
        colspan: eGridSpan.HALF,
        validators: {
            required: true,
            email: true,
            maxLength: 254,
        },
        attr: {
            placeholder: 'Ex: john.doe@gmail.com',
            icon: 'alternate_email',
            autocompleteLabel: 'username',
        },
    },
    {
        type: "password",
        name: 'password',
        label: 'Password',
        value: null,
        colspan: eGridSpan.HALF,
        validators: {
            required: true,
            minLength: 8,//TODO Robust password with custom validation
        },
        attr: {
            autocompleteLabel: 'new-password',
        },
    },
    {
        type: "text",
        name: 'name',
        label: 'Name (Optional)',
        value: null,
        colspan: eGridSpan.HALF,
        validators: {
            maxLength: 100, //TODO Change to enum
        },
         attr: {
            placeholder: 'John Doe',
            icon: 'account_circle',
            autocompleteLabel: 'name',
        },
    },
    createPlaceholderFormField(eGridSpan.HALF),
] as FormControlModel[];

export const IQAMAH_FORM_DATA = [
    {
        name: "start",
        label: "Iqamah Change Date",
        data: IQAMAH_FORM_SETTINGS_DATA,
    },
    {
        name: "offset",
        label: "Iqamah Timings",
        data: IQAMAH_FORM_PRAYER_DATA,
    },
    {
        name: "jumuah",
        label: "Jumuah Timings",
        data: IQAMAH_FORM_JUMUAH_DATA,
    },
] as ReactiveForm[];

export const PREFERENCES_FORM_DATA = [
    {
        name: "hijri",
        label: "Hijri Days Adjustments",
        data: PREFERENCES_FORM_HIJRI_DATA,
    },
    {
        name: "ramadan",
        label: "Ramadan Iqamah Timings",
        data: PREFERENCES_FORM_RAMADAN_DATA,
    },
] as ReactiveForm[];

export const SALAH_FORM_DATA = [
    {
        name: "settings",
        label: "Settings",
        data: SALAH_FORM_SETTINGS_DATA,
    },
    {
        name: "offset",
        label: "Start Time Adjustments",
        data: SALAH_FORM_OFFSET_DATA,
    },
] as ReactiveForm[];

export const ATHAN_FORM_DATA = [
    {
        name: "offset",
        label: "Regular Timings",
        data: ATHAN_FORM_SALAH_DATA,
    },
    {
        name: "ramadan",
        label: "Ramadan Timings",
        data: ATHAN_FORM_RAMADAN_DATA,
    },
] as ReactiveForm[];

export const MOSQUE_FORM_DATA = [
    {
        name: "information",
        label: "Information",
        data: MOSQUE_FORM_GENERAL_DATA,
    },
    {
        name: "coordinate",
        label: "Location",
        data: MOSQUE_FORM_COORDINATE_DATA,
    },
    {
        name: "address",
        label: "Address",
        data: MOSQUE_FORM_ADDRESS_DATA,
    },
    {
        name: "contact",
        label: "Contact",
        data: MOSQUE_FORM_CONTACT_DATA,
    },
] as ReactiveForm[];
//TODO Fix this as well
export const CRED_FORM_DATA = [
    {
        name: CredentialConstants.LOGIN,
        label: "Login",
        data: CRED_FORM_LOGIN_DATA,
    },
    {
        name: CredentialConstants.SIGNUP,
        label: "Sign Up",
        data: CRED_FORM_SIGNUP_DATA,
    },
] as ReactiveForm[];

export const TIMINGS_TAB_DEFINITIONS = {
    IQAMAH: { label: "Iqamah", forms: IQAMAH_FORM_DATA },
    PREFERENCE: { label: "Preferences", forms: PREFERENCES_FORM_DATA },
}
export type TimingsTabKey = keyof typeof TIMINGS_TAB_DEFINITIONS;

export const SETTINGS_TAB_DEFINITIONS = {
    SALAH: { label: "Salah", forms: SALAH_FORM_DATA },
    ATHAN: { label: "Athan", forms: ATHAN_FORM_DATA },
}
export type SettingsTabKey = keyof typeof SETTINGS_TAB_DEFINITIONS;

export const ACCOUNTS_TAB_DEFINITIONS = {
    MOSQUE: { label: "Mosque", forms: MOSQUE_FORM_DATA },
    SALAH: { label: "Salah", forms: SALAH_FORM_DATA },
}
export type AccountsTabKey = keyof typeof ACCOUNTS_TAB_DEFINITIONS;
