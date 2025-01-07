import { eGridSpan, FormControlModel, ReactiveForm } from "./form.model";

export const MOSQUE_FORM_GENERAL_DATA = [
    {
        type: "text",
        name: 'name',
        label: 'Mosque Name',
        value: '',
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
        name: 'meta',
        label: 'Meta Tags (optional)',
        value: '',
        placeholder: 'Ex: Add tags separated by comma',
        colspan: eGridSpan.HALF,
        validators: {
            maxLength: 100
        }
    }
] as FormControlModel[];

export const MOSQUE_FORM_ADDRESS_DATA = [
    {
        type: "textarea",
        name: 'address',
        label: 'Address',
        value: '',
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
        value: '',
        placeholder: 'Ex: San Franciso',
        colspan: eGridSpan.HALF,
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
        value: '',
        placeholder: 'Ex: California',
        colspan: eGridSpan.HALF,
        validators: {
            required: true,
            minLength: 3,
            maxLength: 100
        }
    },
    {
        type: "text",
        name: 'code',
        label: 'Postal Code / Zip Code',
        value: '',
        placeholder: 'Ex: USA',
        colspan: eGridSpan.HALF,
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
        value: 'CA',
        colspan: eGridSpan.HALF,
        validators: {
            required: true,
        },
        options: [
            {
                value: '',
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

export const MOSQUE_FORM_CONTACT_DATA = [
    {
        type: "text",
        name: 'phone',
        label: 'Phone (Optional)',
        prefix: '+',
        value: '',
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
        value: '',
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
        value: '',
        placeholder: 'Ex: www.my-mosque.com',
        colspan: eGridSpan.ONE_THIRD,
        validators: {
            maxLength: 100,
        }
    },
] as FormControlModel[];

export const LOCATION_FORM_COORD_DATA = [
    {
        type: 'number',
        name: 'latitude',
        label: 'Latitude',
        value: '',
        placeholder: 'Ex: 40.7128',
        colspan: eGridSpan.HALF,
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
        value: '',
        placeholder: 'Ex: -74.0060',
        colspan: eGridSpan.HALF,
        step: 2,
        validators: {
            required: true,
            min: -180,
            max: 180,
            maxLength: 20,
        }
    },
] as FormControlModel[];

export const LOCATION_FORM_TIMEZONE_DATA = [
    {
        type: "select",
        name: 'timezone',
        label: 'Timezone',
        value: -480,
        colspan: eGridSpan.FULL,
        validators: {
            required: true,
        },
        options: [
            {
                value: '',
                name: 'Select Timezone'
            },
            {
                value: -300,
                name: 'Eastern (GMT -05:00)'
            },
            {
                value: -480,
                name: 'Pacific (GMT -08:00)'
            },
        ]

    },
] as FormControlModel[];
export const LOCATION_FORM_SOLAR_DATA = [
    {
        type: "series",
        name: 'sunriseOffset',
        label: 'Sunrise',
        value: 0,
        colspan: eGridSpan.ONE_THIRD,
        validators: {
            min: -30,
            max: 30,
        },
        suffix: 'minutes',
        suffixUnit: 'minute',
        baseLabel: 'No change',
        recommendedValue: 0,
    },
    {
        type: "series",
        name: 'middayOffset',
        label: 'Midday',
        value: 0,
        colspan: eGridSpan.ONE_THIRD,
        validators: {
            min: -30,
            max: 30,
        },
        suffix: 'minutes',
        suffixUnit: 'minute',
        baseLabel: 'No change',
        recommendedValue: 0,
    },
    {
        type: "series",
        name: 'sunsetOffset',
        label: 'Sunset',
        value: 0,
        colspan: eGridSpan.ONE_THIRD,
        validators: {
            min: -30,
            max: 30,
        },
        suffix: 'minutes',
        suffixUnit: 'minute',
        baseLabel: 'No change',
        recommendedValue: 0,
    },
] as FormControlModel[];

export const HIJRI_FORM_SETTINGS_DATA = [
    {
        type: "series",
        name: 'hijri',
        label: 'Hijri Adjustment',
        value: 0,
        colspan: eGridSpan.HALF,
        validators: {
            min: -3,
            max: 3,
        },
        suffix: 'days',
        suffixUnit: 'day',
        baseLabel: 'No change',
        recommendedValue: null,
    },
    {
        type: "toggle",
        name: 'isHijri',
        label: 'Show Hijri Calender',
        value: true,
        colspan: eGridSpan.HALF,
    },
] as FormControlModel[];

export const ATHAN_FORM_SALAH_DATA = [
    {
        type: "series",
        name: 'fajrOffset',
        label: 'Fajr',
        value: 20,
        colspan: eGridSpan.ONE_THIRD,
        validators: {
            min: 0,
            max: 60,
        },
        suffix: 'minutes before Iqama',
        suffixUnit: 'minute before Iqama',
        baseLabel: 'Same as Iqama',
        recommendedValue: 10,
    },
    {
        type: "series",
        name: 'dhurOffset',
        label: 'Dhuhr',
        value: 10,
        colspan: eGridSpan.ONE_THIRD,
        validators: {
            min: 0,
            max: 60,
        },
        suffix: 'minutes before Iqama',
        suffixUnit: 'minute before Iqama',
        baseLabel: 'Same as Iqama',
        recommendedValue: 10,
    },
    {
        type: "series",
        name: 'asrOffset',
        label: 'Asr',
        value: 30,
        colspan: eGridSpan.ONE_THIRD,
        validators: {
            min: 0,
            max: 60,
        },
        suffix: 'minutes before Iqama',
        suffixUnit: 'minute before Iqama',
        baseLabel: 'Same as Iqama',
        recommendedValue: 10,
    },
    {
        type: "series",
        name: 'maghribOffset',
        label: 'Maghrib',
        value: 1,
        colspan: eGridSpan.ONE_THIRD,
        validators: {
            min: 0,
            max: 60,
        },
        suffix: 'minutes before Iqama',
        suffixUnit: 'minute before Iqama',
        baseLabel: 'Same as Iqama',
        recommendedValue: 5,
    },
    {
        type: "series",
        name: 'ishaOffset',
        label: 'Isha',
        value: 10,
        colspan: eGridSpan.ONE_THIRD,
        validators: {
            min: 0,
            max: 60,
        },
        suffix: 'minutes before Iqama',
        suffixUnit: 'minute before Iqama',
        baseLabel: 'Same as Iqama',
        recommendedValue: 5,
    },
] as FormControlModel[];

export const ATHAN_FORM_REGULAR_DATA = [
    ...ATHAN_FORM_SALAH_DATA,
    {
        type: "series",
        name: 'jumuahOffset',
        label: 'Jumuah',
        value: 0,
        colspan: eGridSpan.ONE_THIRD,
        validators: {
            min: 0,
            max: 60,
        },
        suffix: 'minutes before Khutbah',
        suffixUnit: 'minute before Khutbah',
        baseLabel: 'Soon before Khutbah',
        recommendedValue: 0,
    },
] as FormControlModel[];

export const ATHAN_FORM_RAMADAN_DATA = [
    ...ATHAN_FORM_SALAH_DATA,
    // {
    //     type: "series",
    //     name: 'taraweehOffset',
    //     label: 'Taraweeh Iqama',
    //     value: 5,
    //     colspan: eGridSpan.ONE_THIRD,
    //     validators: {
    //         min: 0,
    //         max: 60,
    //     },
    //     suffix: 'minutes after Iqama',
    //     suffixUnit: 'minute after Iqama',
    //     baseLabel: 'Soon after Isha',
    //     recommendedValue: 10,
    // },
    {
        type: "series",
        name: 'jumuahOffset',
        label: 'Jumuah',
        value: 0,
        colspan: eGridSpan.ONE_THIRD,
        validators: {
            min: 0,
            max: 60,
        },
        suffix: 'minutes before Khutbah',
        suffixUnit: 'minute before Khutbah',
        baseLabel: 'Soon before Khutbah',
        recommendedValue: 0,
    },
] as FormControlModel[];

export const SALAH_FORM_OVERRIDE_DATA = [
    {
        type: "series",
        name: 'fajrOffset',
        label: 'Fajr',
        value: 0,
        colspan: eGridSpan.ONE_THIRD,
        validators: {
            min: -90,
            max: 120,
        },
        suffix: 'minutes',
        suffixUnit: 'minute',
        baseLabel: 'No Change',
        recommendedValue: 0,
    },
    {
        type: "series",
        name: 'dhurOffset',
        label: 'Dhuhr',
        value: 2,
        colspan: eGridSpan.ONE_THIRD,
        validators: {
            min: 1,
            max: 30,
        },
        suffix: 'minutes after Zawal',
        suffixUnit: 'minute after Zawal',
        baseLabel: 'At Zawal',
        recommendedValue: 2,
    },
    {
        type: "series",
        name: 'asrOffset',
        label: 'Asr',
        value: 0,
        colspan: eGridSpan.ONE_THIRD,
        validators: {
            min: -90,
            max: 120,
        },
        suffix: 'minutes',
        suffixUnit: 'minute',
        baseLabel: 'No Change',
        recommendedValue: 0,
    },
    {
        type: "series",
        name: 'maghribOffset',
        label: 'Maghrib',
        value: 1,
        colspan: eGridSpan.ONE_THIRD,
        validators: {
            min: 0,
            max: 30,
        },
        suffix: 'minutes after Sunset',
        suffixUnit: 'minute after Sunset',
        baseLabel: 'At Sunset',
        recommendedValue: 2,
    },
    {
        type: "series",
        name: 'ishaOffset',
        label: 'Isha',
        value: 0,
        colspan: eGridSpan.ONE_THIRD,
        validators: {
            min: 0,
            max: 60,
        },
        suffix: 'minutes',
        suffixUnit: 'minute',
        baseLabel: 'No Change',
        recommendedValue: 0,
    },
] as FormControlModel[];
export const SALAH_FORM_CONFIG_DATA = [
    {
        type: "slider",
        name: 'fajr',
        label: 'Fajr',
        value: 15,
        colspan: eGridSpan.HALF,
        validators: {
            min: 10,
            max: 20,
        },
        step: .1,
    },
    {
        type: "slider",
        name: 'isha',
        label: 'Isha',
        value: 15,
        colspan: eGridSpan.HALF,
        validators: {
            min: 10,
            max: 20,
        },
        step: .1,
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
        value: '',
        colspan: eGridSpan.ONE_THIRD,
        validators: {
            required: true,
        },
        options: [
            {
                value: 1,
                name: 'Standard (Shafi\'i, Maliki \& Hanbali)'
            },
            {
                value: 2,
                name: 'Later Asr (Hanafi)'
            },
        ]
    },
    {
        type: "select",
        name: 'ha',
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
] as FormControlModel[];

export const IQAMAH_FORM_PRAYER_DATA = [
    {
        type: "iqama",
        name: 'fajr',
        label: 'Fajr',
        value: { type: 'time', value: '05:00' },
        colspan: eGridSpan.ONE_FOURTH,
        validators: {
            required: true,
        },
        options: [
            {
                type: 'series',
                typeLabel: 'Offset',
                recommended: false,
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
                    suffix: 'minutes after Start Time',
                    suffixUnit: 'minute after Start Time',
                    baseLabel: 'At Start Time',
                    recommendedValue: 20,
                }
            },
            {
                type: 'time',
                typeLabel: 'Fixed',
                recommended: true,
                control: {
                    name: 'time',
                    label: '',
                    value: '',
                    colspan: eGridSpan.ONE_FOURTH,
                    type: 'time'
                }
                //             name: string;
                // label: string;
                // value: ControlValue;
                // colspan: eGridSpan;
                // validators: ValidatorModel | null;
                // placeholder: string;
                // type: ControlType;
            },
        ]
    },
    {
        type: "iqama",
        name: 'dhur',
        label: 'Dhuhr',
        value: { type: 'series', value: 5 },
        colspan: eGridSpan.ONE_FOURTH,
        options: [
            {
                type: 'series',
                typeLabel: 'Offset',
                recommended: false,
                control: {
                    name: 'offset',
                    label: '',
                    value: '',
                    colspan: eGridSpan.ONE_FOURTH,
                    type: 'select',
                    // validators: {
                    //     min: 0,
                    //     max: 30,
                    // },
                    // suffix: 'minutes after Start Time',
                    // suffixUnit: 'minute after Start Time',
                    // baseLabel: 'At Start Time',
                    // recommendedValue: 30,
                }
            },
            {
                type: 'time',
                typeLabel: 'Fixed',
                recommended: true,
                control: {
                    name: 'time',
                    label: '',
                    value: '',
                    colspan: eGridSpan.ONE_FOURTH,
                    type: 'time'
                }
                //             name: string;
                // label: string;
                // value: ControlValue;
                // colspan: eGridSpan;
                // validators: ValidatorModel | null;
                // placeholder: string;
                // type: ControlType;
            },
        ]
    },
    {
        type: "iqama",
        name: 'asr',
        label: 'Asr',
        value: { type: 'series', value: 5 },
        colspan: eGridSpan.ONE_FOURTH,
        options: [

            {
                type: 'series',
                typeLabel: 'Offset',
                recommended: false,
                control: {
                    name: 'offset',
                    label: '',
                    value: '',
                    colspan: eGridSpan.ONE_FOURTH,
                    type: 'select',
                    // validators: {
                    //     min: 0,
                    //     max: 30,
                    // },
                    // suffix: 'minutes after Start Time',
                    // suffixUnit: 'minute after Start Time',
                    // baseLabel: 'At Start Time',
                    // recommendedValue: 30,
                }
            },
            {
                type: 'time',
                typeLabel: 'Fixed',
                recommended: true,
                control: {
                    name: 'time',
                    label: '',
                    value: '',
                    colspan: eGridSpan.ONE_FOURTH,
                    type: 'time'
                }
                //             name: string;
                // label: string;
                // value: ControlValue;
                // colspan: eGridSpan;
                // validators: ValidatorModel | null;
                // placeholder: string;
                // type: ControlType;
            },
        ]
    },
    {
        type: "iqama",
        name: 'maghrib',
        label: 'Maghrib',
        value: { type: 'series', value: 5 },
        colspan: eGridSpan.ONE_FOURTH,
        validators: {
            required: true,
        },
        options: [
            {
                type: 'series',
                typeLabel: 'Offset',
                recommended: false,
                control: {
                    name: 'value',
                    label: '',
                    value: 3,
                    colspan: eGridSpan.ONE_FOURTH,
                    type: 'series',
                    validators: {
                        min: 0,
                        max: 60,
                    },
                    suffix: 'minutes after Sunset',
                    suffixUnit: 'minute after Sunset',
                    baseLabel: 'At Sunset',
                    recommendedValue: 5,
                }
            },
            {
                type: 'time',
                typeLabel: 'Fixed',
                recommended: true,
                control: {
                    name: 'value',
                    label: '',
                    value: '',
                    colspan: eGridSpan.ONE_FOURTH,
                    type: 'time'
                }
                //             name: string;
                // label: string;
                // value: ControlValue;
                // colspan: eGridSpan;
                // validators: ValidatorModel | null;
                // placeholder: string;
                // type: ControlType;
            },
        ]
    },
    {
        type: "iqama",
        name: 'isha',
        label: 'Isha',
        value: { type: 'series', value: 5 },
        colspan: eGridSpan.ONE_FOURTH,
        validators: {
            required: true,
        },
        options: [
            {
                type: 'series',
                typeLabel: 'Offset',
                recommended: false,
                control: {
                    name: 'offset',
                    label: '',
                    value: '',
                    colspan: eGridSpan.ONE_FOURTH,
                    type: 'select',
                    // validators: {
                    //     min: 0,
                    //     max: 30,
                    // },
                    // suffix: 'minutes after Start Time',
                    // suffixUnit: 'minute after Start Time',
                    // baseLabel: 'At Start Time',
                    // recommendedValue: 30,
                }
            },
            {
                type: 'time',
                typeLabel: 'Fixed',
                recommended: true,
                control: {
                    name: 'time',
                    label: '',
                    value: '',
                    colspan: eGridSpan.ONE_FOURTH,
                    type: 'time'
                }
                //             name: string;
                // label: string;
                // value: ControlValue;
                // colspan: eGridSpan;
                // validators: ValidatorModel | null;
                // placeholder: string;
                // type: ControlType;
            },
        ]
    },
    {
        type: "iqama",
        name: 'taraweeh',
        label: 'Taraweeh',
        value: { type: 'series', value: 5 },
        colspan: eGridSpan.ONE_FOURTH,
        validators: null,
        options: [
            {
                type: 'series',
                typeLabel: 'Offset',
                recommended: false,
                control: {
                    name: 'offset',
                    label: '',
                    value: '',
                    colspan: eGridSpan.ONE_FOURTH,
                    type: 'select',
                    // validators: {
                    //     min: 0,
                    //     max: 30,
                    // },
                    // suffix: 'minutes after Start Time',
                    // suffixUnit: 'minute after Start Time',
                    // baseLabel: 'At Start Time',
                    // recommendedValue: 30,
                }
            },
            {
                type: 'time',
                typeLabel: 'Fixed',
                recommended: true,
                control: {
                    name: 'time',
                    label: '',
                    value: '',
                    colspan: eGridSpan.ONE_FOURTH,
                    type: 'time'
                }
                //             name: string;
                // label: string;
                // value: ControlValue;
                // colspan: eGridSpan;
                // validators: ValidatorModel | null;
                // placeholder: string;
                // type: ControlType;
            },
        ]
    },
] as FormControlModel[];

export const MOSQUE_FORM_DATA = [
    {
        key: "general",
        label: "Information",
        data: MOSQUE_FORM_GENERAL_DATA,
    },
    {
        key: "address",
        label: "Address",
        data: MOSQUE_FORM_ADDRESS_DATA,
    },
    {
        key: "contact",
        label: "Contact",
        data: MOSQUE_FORM_CONTACT_DATA,
    },
] as ReactiveForm[];

export const LOCATION_FORM_DATA = [
    {
        key: "coordinates",
        label: "Coordinates",
        data: LOCATION_FORM_COORD_DATA,
    },
    {
        key: "timezone",
        label: "Timezone",
        data: LOCATION_FORM_TIMEZONE_DATA,
    },
] as ReactiveForm[];

export const HIJRI_FORM_DATA = [
    {
        key: "Hijri",
        label: "Adjustments",
        data: HIJRI_FORM_SETTINGS_DATA,
    }
] as ReactiveForm[]

export const ATHAN_FORM_DATA = [
    {
        key: "general",
        label: "Regular Timings",
        data: ATHAN_FORM_REGULAR_DATA,
    },
    {
        key: "ramadan",
        label: "Ramadan Timings",
        data: ATHAN_FORM_RAMADAN_DATA,
    },
] as ReactiveForm[]


export const SALAH_FORM_DATA = [
    {
        key: "configuration",
        label: "Configuration",
        data: SALAH_FORM_CONFIG_DATA,
    },
    {
        key: "overrides",
        label: "Start Time Adjustments",
        data: SALAH_FORM_OVERRIDE_DATA,
    },
    {
        key: "solarOffset",
        label: "Solar Adjustments",
        data: LOCATION_FORM_SOLAR_DATA,
    },
] as ReactiveForm[];

export const IQAMA_FORM_DATA = [
    {
        key: "iqama",
        label: "Iqamah Timings",
        data: IQAMAH_FORM_PRAYER_DATA,
    }

] as ReactiveForm[];
