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
        label: 'Postal Code / Zip Code (optional)',
        value: '',
        placeholder: 'Ex: USA',
        colspan: eGridSpan.HALF,
        validators: {
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
        label: 'Phone',
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
        label: 'Email',
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
        label: 'Website',
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
        label: 'Sunrise Adjustment',
        value: 0,
        colspan: eGridSpan.HALF,
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
        label: 'Sunset Adjustment',
        value: 0,
        colspan: eGridSpan.HALF,
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
        type: "toggle",
        name: 'isHijri',
        label: 'Show Hijri Calender',
        value: true,
        colspan: eGridSpan.HALF,
    },
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
] as FormControlModel[];

export const ATHAN_FORM_REGULAR_DATA = [
    {
        type: "series",
        name: 'fajrOffset',
        label: 'Fajr Athan',
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
        label: 'Dhuhr Athan',
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
        label: 'Asr Athan',
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
        label: 'Maghrib Athan',
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
        name: 'ishaffset',
        label: 'Isha Athan',
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

export const ATHAN_FORM_RAMADAN_DATA = [
    ...ATHAN_FORM_REGULAR_DATA,
    {
        type: "series",
        name: 'taraweehffset',
        label: 'Taraweeh Iqama',
        value: 5,
        colspan: eGridSpan.ONE_THIRD,
        validators: {
            min: 0,
            max: 60,
        },
        suffix: 'minutes after Iqama',
        suffixUnit: 'minute after Iqama',
        baseLabel: 'Soon after Isha',
        recommendedValue: 10,
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
    {
        key: "solarOffset",
        label: "Solar Adjustments",
        data: LOCATION_FORM_SOLAR_DATA,
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