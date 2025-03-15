import * as yup from "yup";


export const schemaModal = yup.object({
    first_name: yup.string().required('Le prénom est requis'),
    last_name: yup.string().required('Le nom est requis'),
    email: yup.string().email('Le courriel doit être valide').nullable(),
    phone: yup.string().nullable(),
    address: yup.string().nullable(),
    city: yup.string().nullable(),
    postal_code: yup.string().nullable(),
    country: yup.string().nullable(),
    notes: yup.string().nullable(),
}).required();

export type ContactFormData = yup.InferType<typeof schemaModal>;