import ContactList from '@/Components/ContactList';
import ContactModal from '@/Components/ContactModal';
import { Button } from '@/Components/ui/button';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Contact, PropsDashboard } from '@/types';
import { Head } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';



export default function Dashboard({ contacts, auth }: PropsDashboard) {
    const [showModal, setShowModal] = useState(false);
    const [selectedContact, setSelectedContact] = useState<Contact | undefined>();
    const [modalType, setModalType] = useState<'create' | 'edit'>('create');

    const handleCreate = () => {
        setModalType('create');
        setSelectedContact(undefined);
        setShowModal(true);
    };

    const handleEdit = (contact: Contact) => {
        setModalType('edit');
        setSelectedContact(contact);
        setShowModal(true);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-2xl font-semibold text-gray-900">
                                    Mes Contacts
                                </h2>
                                <Button onClick={handleCreate} className="gap-2">
                                    <Plus className="h-5 w-5" />
                                    Nouveau contact
                                </Button>
                            </div>

                            <ContactList contacts={contacts} onEdit={handleEdit} />

                            <ContactModal
                                showModal={showModal}
                                modalType={modalType}
                                contact={selectedContact}
                                onClose={() => setShowModal(false)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
