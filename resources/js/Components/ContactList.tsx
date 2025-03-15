import { Button } from '@/Components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/ui/table';
import { Contact } from '@/types';
import { Link, router } from '@inertiajs/react';
import { Edit, Eye, Trash2 } from 'lucide-react';
import { PropsList } from '@/types';

export default function ContactList({ contacts, onEdit }: PropsList) {
    const handleDelete = (contact: Contact) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce contact ?')) {
            router.delete(route('contacts.destroy', contact.id));
        }
    };

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nom</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Téléphone</TableHead>
                        <TableHead>Ville</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {contacts.map((contact) => (
                        <TableRow key={contact.id}>
                            <TableCell className="font-medium">
                                {contact.first_name} {contact.last_name}
                            </TableCell>
                            <TableCell>{contact.email}</TableCell>
                            <TableCell>{contact.phone}</TableCell>
                            <TableCell>{contact.city}</TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end space-x-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        asChild
                                    >
                                        <Link href={route('contacts.show', contact.id)}>
                                            <Eye className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => onEdit(contact)}
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleDelete(contact)}
                                    >
                                        <Trash2 className="h-4 w-4 text-red-500" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
