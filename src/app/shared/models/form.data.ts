import { eGridSpan, FormControlModel } from "./form.model";

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
        validators: null
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
        min: 1,
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
        label: 'State',
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
        label: 'Postal Code / Zip',
        value: '',
        placeholder: 'Ex: USA',
        colspan: eGridSpan.HALF,
        validators: {
            required: true,
            minLength: 3,
            maxLength: 100
        }
    },
    {
        type: "text",
        name: 'country',
        label: 'Country',
        value: '',
        placeholder: 'Ex: USA',
        colspan: eGridSpan.HALF,
        validators: {
            required: true,
            minLength: 3,
            maxLength: 100
        }
    },
    // {
    //     type: "slider",
    //     name: 'fajrAngal',
    //     label: 'Fajr Angle',
    //     value: 15,
    //     validators: null,
    //     min: 10,
    //     max: 20,
    //     step: 0.1,
    // },
] as FormControlModel[];

export const MOSQUE_FORM_CONTACT_DATA = [
    {
        type: "text",
        name: 'phone',
        label: 'Phone',
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
            maxLength: 100
        }
    },
] as FormControlModel[];