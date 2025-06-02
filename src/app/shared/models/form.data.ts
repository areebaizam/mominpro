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
        type: "option-select",
        name: 'fajr',
        label: 'Fajr',
        value: { option: 0, value: new Date(0, 0, 0, 4, 0) },
        colspan: eGridSpan.HALF,
        validators: {
            required: true,
        },
        options: [{ value: 0, label: 'Fixed', recommended: true }, { value: 1, label: 'Offset', recommended: false }],
        selectOptions: [
            {
                optionValue: 0,
                type: 'time',
                attr: {
                    min: '02:00',
                    max: '09:00',
                    interval: '5m',
                }
            },
            {
                optionValue: 1,
                type: 'series',
                attr: {
                    min: 0,
                    max: 60,
                    suffix: 'minutes after start time',
                    suffixUnit: 'minute after start time',
                    baseLabel: 'At start time',
                    recommended: null,
                }
            },
        ],
    },
    {
        type: "option-select",
        name: 'dhur',
        label: 'Dhuhr',
        value: { option: 0, value: new Date(0, 0, 0, 12, 0) },
        colspan: eGridSpan.HALF,
        validators: {
            required: true,
        },
        options: [{ value: 0, label: 'Fixed', recommended: true }, { value: 1, label: 'Offset', recommended: false }],
        selectOptions: [
            {
                optionValue: 0,
                type: 'time',
                attr: {
                    min: '11:00',
                    max: '17:00',
                    interval: '5m',
                }
            },
            {
                optionValue: 1,
                type: 'series',
                attr: {
                    min: 0,
                    max: 60,
                    suffix: 'minutes after start time',
                    suffixUnit: 'minute after start time',
                    baseLabel: 'At start time',
                    recommended: null,
                }
            },
        ],
    },
    {
        type: "option-select",
        name: 'asr',
        label: 'Asr',
        value: { option: 0, value: new Date(0, 0, 0, 16, 0) },
        colspan: eGridSpan.HALF,
        validators: {
            required: true,
        },
        options: [{ value: 0, label: 'Fixed', recommended: true }, { value: 1, label: 'Offset', recommended: false }],
        selectOptions: [
            {
                optionValue: 0,
                type: 'time',
                attr: {
                    min: '12:00',
                    max: '20:00',
                    interval: '5m',
                }
            },
            {
                optionValue: 1,
                type: 'series',
                attr: {
                    min: 0,
                    max: 60,
                    suffix: 'minutes after start time',
                    suffixUnit: 'minute after start time',
                    baseLabel: 'At start time',
                    recommended: null,
                }
            },
        ],
    },
    {
        type: "option-select",
        name: 'maghrib',
        label: 'Maghrib',
        value: { option: 1, value: 5 },
        colspan: eGridSpan.HALF,
        validators: {
            required: true,
        },
        options: [{ value: 0, label: 'Fixed', recommended: true }, { value: 1, label: 'Offset', recommended: false }],
        selectOptions: [
            {
                optionValue: 0,
                type: 'time',
                attr: {
                    min: '15:00',
                    max: '23:00',
                    interval: '5m',
                }
            },
            {
                optionValue: 1,
                type: 'series',
                attr: {
                    min: 0,
                    max: 60,
                    suffix: 'minutes after start time',
                    suffixUnit: 'minute after start time',
                    baseLabel: 'At start time',
                    recommended: 2,
                }
            },
        ],
    },
    {
        type: "option-select",
        name: 'isha',
        label: 'Isha',
        value: { option: 0, value: new Date(0, 0, 0, 19, 0) },
        colspan: eGridSpan.HALF,
        validators: {
            required: true,
        },
        options: [{ value: 0, label: 'Fixed', recommended: true }, { value: 1, label: 'Offset', recommended: false }],
        selectOptions: [
            {
                optionValue: 0,
                type: 'time',
                attr: {
                    min: '00:00',//TODO FIX FOR ISHA
                    max: '23:59',
                    interval: '5m',
                }
            },
            {
                optionValue: 1,
                type: 'series',
                attr: {
                    min: 0,
                    max: 60,
                    suffix: 'minutes after start time',
                    suffixUnit: 'minute after start time',
                    baseLabel: 'At start time',
                    recommended: null,
                }
            },
        ],
    },
    createPlaceholderFormField(eGridSpan.HALF),
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
        toggleLabel: "Show",
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
        toggleLabel: "Show",
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
        toggleLabel: "Enable",
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
        toggleLabel: "Enable",
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
        toggleLabel: "Enable",
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
        toggleLabel: "Enable",
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
        type: "option-select",
        name: 'fajr',
        label: 'Fajr',
        value: { option: 0, value: 10 },
        colspan: eGridSpan.HALF,
        validators: {
            required: true,
        },
        options: [{ value: 0, label: 'Iqamah', recommended: true }, { value: 1, label: 'Salah', recommended: false }],
        selectOptions: [
            {
                optionValue: 0,
                type: 'series',
                attr: {
                    min: 0,
                    max: 60,
                    suffix: 'minutes before Iqamah time',
                    suffixUnit: 'minute before Iqamah time',
                    baseLabel: 'At Iqamah time',
                    recommended: 10,
                }
            },
            {
                optionValue: 1,
                type: 'series',
                attr: {
                    min: 0,
                    max: 60,
                    suffix: 'minutes after start time',
                    suffixUnit: 'minute after start time',
                    baseLabel: 'At start time',
                    recommended: 20,
                }
            },
        ],
    },
    {
        type: "option-select",
        name: 'dhuhr',
        label: 'Dhuhr',
        value: { option: 0, value: 10 },
        colspan: eGridSpan.HALF,
        validators: {
            required: true,
        },
        options: [{ value: 0, label: 'Iqamah', recommended: true }, { value: 1, label: 'Salah', recommended: false }],
        selectOptions: [
            {
                optionValue: 0,
                type: 'series',
                attr: {
                    min: 0,
                    max: 60,
                    suffix: 'minutes before Iqamah time',
                    suffixUnit: 'minute before Iqamah time',
                    baseLabel: 'At Iqamah time',
                    recommended: 10,
                }
            },
            {
                optionValue: 1,
                type: 'series',
                attr: {
                    min: 0,
                    max: 60,
                    suffix: 'minutes after start time',
                    suffixUnit: 'minute after start time',
                    baseLabel: 'At start time',
                    recommended: 30,
                }
            },
        ],
    },
    {
        type: "option-select",
        name: 'asr',
        label: 'Asr',
        value: { option: 0, value: 10 },
        colspan: eGridSpan.HALF,
        validators: {
            required: true,
        },
        options: [{ value: 0, label: 'Iqamah', recommended: true }, { value: 1, label: 'Salah', recommended: false }],
        selectOptions: [
            {
                optionValue: 0,
                type: 'series',
                attr: {
                    min: 0,
                    max: 60,
                    suffix: 'minutes before Iqamah time',
                    suffixUnit: 'minute before Iqamah time',
                    baseLabel: 'At Iqamah time',
                    recommended: 10,
                }
            },
            {
                optionValue: 1,
                type: 'series',
                attr: {
                    min: 0,
                    max: 60,
                    suffix: 'minutes after start time',
                    suffixUnit: 'minute after start time',
                    baseLabel: 'At start time',
                    recommended: 30,
                }
            },
        ],
    },
    {
        type: "option-select",
        name: 'maghrib',
        label: 'Maghrib',
        value: { option: 1, value: 0 },
        colspan: eGridSpan.HALF,
        validators: {
            required: true,
        },
        options: [{ value: 0, label: 'Iqamah', recommended: true }, { value: 1, label: 'Salah', recommended: false }],
        selectOptions: [
            {
                optionValue: 0,
                type: 'series',
                attr: {
                    min: 0,
                    max: 60,
                    suffix: 'minutes before Iqamah time',
                    suffixUnit: 'minute before Iqamah time',
                    baseLabel: 'At Iqamah time',
                    recommended: 0,
                }
            },
            {
                optionValue: 1,
                type: 'series',
                attr: {
                    min: 0,
                    max: 60,
                    suffix: 'minutes after start time',
                    suffixUnit: 'minute after start time',
                    baseLabel: 'At start time',
                    recommended: 0,
                }
            },
        ],
    },
    {
        type: "option-select",
        name: 'isha',
        label: 'Isha',
        value: { option: 0, value: 10 },
        colspan: eGridSpan.HALF,
        validators: {
            required: true,
        },
        options: [{ value: 0, label: 'Iqamah', recommended: true }, { value: 1, label: 'Salah', recommended: false }],
        selectOptions: [
            {
                optionValue: 0,
                type: 'series',
                attr: {
                    min: 0,
                    max: 60,
                    suffix: 'minutes before Iqamah time',
                    suffixUnit: 'minute before Iqamah time',
                    baseLabel: 'At Iqamah time',
                    recommended: 10,
                }
            },
            {
                optionValue: 1,
                type: 'series',
                attr: {
                    min: 0,
                    max: 60,
                    suffix: 'minutes after start time',
                    suffixUnit: 'minute after start time',
                    baseLabel: 'At start time',
                    recommended: 30,
                }
            },
        ],
    },
    createPlaceholderFormField(eGridSpan.HALF),
] as FormControlModel[];

export const ATHAN_FORM_RAMADAN_DATA = [
    {
        type: "option-select",
        name: 'fajr',
        label: 'Fajr',
        value: { option: 1, value: 0 },
        colspan: eGridSpan.HALF,
        validators: {
            required: true,
        },
        options: [{ value: 0, label: 'Iqamah', recommended: true }, { value: 1, label: 'Salah', recommended: false }],
        selectOptions: [
            {
                optionValue: 0,
                type: 'series',
                attr: {
                    min: 0,
                    max: 60,
                    suffix: 'minutes before Iqamah time',
                    suffixUnit: 'minute before Iqamah time',
                    baseLabel: 'At Iqamah time',
                    recommended: 20,
                }
            },
            {
                optionValue: 1,
                type: 'series',
                attr: {
                    min: 0,
                    max: 60,
                    suffix: 'minutes after start time',
                    suffixUnit: 'minute after start time',
                    baseLabel: 'At start time',
                    recommended: 0,
                }
            },
        ],
    },
    {
        type: "option-select",
        name: 'dhuhr',
        label: 'Dhuhr',
        value: { option: 0, value: 10 },
        colspan: eGridSpan.HALF,
        validators: {
            required: true,
        },
        options: [{ value: 0, label: 'Iqamah', recommended: true }, { value: 1, label: 'Salah', recommended: false }],
        selectOptions: [
            {
                optionValue: 0,
                type: 'series',
                attr: {
                    min: 0,
                    max: 60,
                    suffix: 'minutes before Iqamah time',
                    suffixUnit: 'minute before Iqamah time',
                    baseLabel: 'At Iqamah time',
                    recommended: 10,
                }
            },
            {
                optionValue: 1,
                type: 'series',
                attr: {
                    min: 0,
                    max: 60,
                    suffix: 'minutes after start time',
                    suffixUnit: 'minute after start time',
                    baseLabel: 'At start time',
                    recommended: 30,
                }
            },
        ],
    },
    {
        type: "option-select",
        name: 'asr',
        label: 'Asr',
        value: { option: 0, value: 10 },
        colspan: eGridSpan.HALF,
        validators: {
            required: true,
        },
        options: [{ value: 0, label: 'Iqamah', recommended: true }, { value: 1, label: 'Salah', recommended: false }],
        selectOptions: [
            {
                optionValue: 0,
                type: 'series',
                attr: {
                    min: 0,
                    max: 60,
                    suffix: 'minutes before Iqamah time',
                    suffixUnit: 'minute before Iqamah time',
                    baseLabel: 'At Iqamah time',
                    recommended: 10,
                }
            },
            {
                optionValue: 1,
                type: 'series',
                attr: {
                    min: 0,
                    max: 60,
                    suffix: 'minutes after start time',
                    suffixUnit: 'minute after start time',
                    baseLabel: 'At start time',
                    recommended: 30,
                }
            },
        ],
    },
    {
        type: "option-select",
        name: 'maghrib',
        label: 'Maghrib',
        value: { option: 1, value: 0 },
        colspan: eGridSpan.HALF,
        validators: {
            required: true,
        },
        options: [{ value: 0, label: 'Iqamah', recommended: true }, { value: 1, label: 'Salah', recommended: false }],
        selectOptions: [
            {
                optionValue: 0,
                type: 'series',
                attr: {
                    min: 0,
                    max: 60,
                    suffix: 'minutes before Iqamah time',
                    suffixUnit: 'minute before Iqamah time',
                    baseLabel: 'At Iqamah time',
                    recommended: 0,
                }
            },
            {
                optionValue: 1,
                type: 'series',
                attr: {
                    min: 0,
                    max: 60,
                    suffix: 'minutes after start time',
                    suffixUnit: 'minute after start time',
                    baseLabel: 'At start time',
                    recommended: 0,
                }
            },
        ],
    },
    {
        type: "option-select",
        name: 'isha',
        label: 'Isha',
        value: { option: 1, value: 0 },
        colspan: eGridSpan.HALF,
        validators: {
            required: true,
        },
        options: [{ value: 0, label: 'Iqamah', recommended: true }, { value: 1, label: 'Salah', recommended: false }],
        selectOptions: [
            {
                optionValue: 0,
                type: 'series',
                attr: {
                    min: 0,
                    max: 60,
                    suffix: 'minutes before Iqamah time',
                    suffixUnit: 'minute before Iqamah time',
                    baseLabel: 'At Iqamah time',
                    recommended: 10,
                }
            },
            {
                optionValue: 1,
                type: 'series',
                attr: {
                    min: 0,
                    max: 60,
                    suffix: 'minutes after start time',
                    suffixUnit: 'minute after start time',
                    baseLabel: 'At start time',
                    recommended: 0,
                }
            },
        ],
    },
    createPlaceholderFormField(eGridSpan.HALF),
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
