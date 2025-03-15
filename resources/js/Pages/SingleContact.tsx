import { Button } from '@/Components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Mail, MapPin, Phone } from 'lucide-react';
import { PropsSinglePage } from '@/types';

export default function SingleContact({ contact }: PropsSinglePage) {
    return (
        <>
            <Head title={`${contact.first_name} ${contact.last_name}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <Button variant="ghost" asChild>
                            <Link href={route('contacts.index')}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Retour à la liste
                            </Link>
                        </Button>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">
                                {contact.first_name} {contact.last_name}
                            </CardTitle>
                            <CardDescription>Détails du contact</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {contact.email && (
                                <div className="flex items-center space-x-2">
                                    <Mail className="h-4 w-4 text-gray-500" />
                                    <a
                                        href={`mailto:${contact.email}`}
                                        className="text-blue-600 hover:underline"
                                    >
                                        {contact.email}
                                    </a>
                                </div>
                            )}

                            {contact.phone && (
                                <div className="flex items-center space-x-2">
                                    <Phone className="h-4 w-4 text-gray-500" />
                                    <a
                                        href={`tel:${contact.phone}`}
                                        className="text-blue-600 hover:underline"
                                    >
                                        {contact.phone}
                                    </a>
                                </div>
                            )}

                            {(contact.address || contact.city || contact.postal_code || contact.country) && (
                                <div className="flex items-start space-x-2">
                                    <MapPin className="h-4 w-4 text-gray-500 mt-1" />
                                    <div>
                                        {contact.address && <div>{contact.address}</div>}
                                        <div>
                                            {contact.city && <span>{contact.city}, </span>}
                                            {contact.postal_code && <span>{contact.postal_code}</span>}
                                        </div>
                                        {contact.country && <div>{contact.country}</div>}
                                    </div>
                                </div>
                            )}

                            {contact.notes && (
                                <div className="mt-6">
                                    <h3 className="text-lg font-medium mb-2">Notes</h3>
                                    <p className="text-gray-600 whitespace-pre-wrap">
                                        {contact.notes}
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
