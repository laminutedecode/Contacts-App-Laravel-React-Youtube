export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

// Une interface en TypeScript est un moyen de décrire la forme ou la structure d'un objet. Elle permet de définir les propriétés et les types de données que cet objet doit avoir.

export interface Contact {
    id: number;
    user_id: number;
    first_name: string;
    last_name: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    postal_code?: string;
    country?: string;
    notes?: string;
    created_at: string;
    updated_at: string;
}

export interface PropsModal {
    showModal: boolean;
    modalType: 'create' | 'edit';
    contact?: Contact;
    onClose: () => void;
}

export interface PropsList {
    contacts: Contact[];
    onEdit: (contact: Contact) => void;
}

export interface PropsSinglePage {
    contact: Contact;
}

export interface PropsDashboard extends PageProps {
    contacts: Contact[];
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};
