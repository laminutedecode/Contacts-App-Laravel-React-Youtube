import { Button } from '@/Components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/Components/ui/dialog';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { router, useForm } from '@inertiajs/react';
import React, { useEffect } from 'react';
import {schemaModal, ContactFormData} from '@/Schemas/index';
import { PropsModal } from '@/types';
import * as yup from 'yup';


export default function ContactModal({ showModal, modalType, contact, onClose }: PropsModal) {
    const { data, setData, post, put, errors, processing, reset } =
        useForm<ContactFormData>({
        first_name: contact?.first_name || '',
        last_name: contact?.last_name || '',
        email: contact?.email || '',
        phone: contact?.phone || '',
        address: contact?.address || '',
        city: contact?.city || '',
        postal_code: contact?.postal_code || '',
        country: contact?.country || '',
        notes: contact?.notes || '',
    });

    // Réinitialiser le formulaire quand le contact change
    useEffect(() => {
        if (contact && modalType === 'edit') {
            setData({
                first_name: contact.first_name,
                last_name: contact.last_name,
                email: contact.email,
                phone: contact.phone,
                address: contact.address,
                city: contact.city,
                postal_code: contact.postal_code,
                country: contact.country,
                notes: contact.notes,
            });
        } else if (modalType === 'create') {
            reset();
        }
    }, [contact, modalType, showModal]);

const validateForm = async (): Promise<boolean> => {
    try {
        await schemaModal.validate(data, { abortEarly: false });
        return true;
    } catch (err) {
        if (err instanceof yup.ValidationError) {
            const validationErrors: Record<string, string> = {};
            err.inner.forEach((error) => {
                if (error.path) {
                    validationErrors[error.path] = error.message;
                }
            });
            return false;
        }
        return false;
    }
};


    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const isValid = await validateForm();
        if (!isValid) return;

        if (modalType === 'create') {
            post(route('contacts.store'), {
                preserveScroll: true,
                onSuccess: () => {
                    handleClose();
                    router.reload();
                },
                onError: (errors) => {
                    console.error('Erreur lors de la création:', errors);
                }
            });
        } else {
            put(route('contacts.update', contact?.id), {
                preserveScroll: true,
                onSuccess: () => {
                    handleClose();
                    router.reload();
                },
                onError: (errors) => {
                    console.error('Erreur lors de la modification:', errors);
                }
            });
        }
    };

    const handleClose = () => {
        if (modalType === 'create') {
            reset();
        }
        onClose();
    };

    return (
        <Dialog open={showModal} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {modalType === 'create' ? 'Créer un contact' : 'Modifier le contact'}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="first_name">Prénom</Label>
                            <Input
                                id="first_name"
                                value={data.first_name}
                                onChange={(e) => setData('first_name', e.target.value)}
                                className={errors.first_name ? 'border-red-500' : ''}
                            />
                            {errors.first_name && (
                                <p className="text-sm text-red-500">
                                    {errors.first_name}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="last_name">Nom</Label>
                            <Input
                                id="last_name"
                                value={data.last_name}
                                onChange={(e) => setData('last_name', e.target.value)}
                                className={errors.last_name ? 'border-red-500' : ''}
                            />
                            {errors.last_name && (
                                <p className="text-sm text-red-500">
                                    {errors.last_name}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={data.email || ''}
                            onChange={(e) => setData('email', e.target.value)}
                            className={errors.email ? 'border-red-500' : ''}
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500">{errors.email}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input
                            id="phone"
                            value={data.phone || ''}
                            onChange={(e) => setData('phone', e.target.value)}
                            className={errors.phone ? 'border-red-500' : ''}
                        />
                        {errors.phone && (
                            <p className="text-sm text-red-500">{errors.phone}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="address">Adresse</Label>
                        <Input
                            id="address"
                            value={data.address || ''}
                            onChange={(e) => setData('address', e.target.value)}
                            className={errors.address ? 'border-red-500' : ''}
                        />
                        {errors.address && (
                            <p className="text-sm text-red-500">{errors.address}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="city">Ville</Label>
                            <Input
                                id="city"
                                value={data.city || ''}
                                onChange={(e) => setData('city', e.target.value)}
                                className={errors.city ? 'border-red-500' : ''}
                            />
                            {errors.city && (
                                <p className="text-sm text-red-500">{errors.city}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="postal_code">Code postal</Label>
                            <Input
                                id="postal_code"
                                value={data.postal_code || ''}
                                onChange={(e) => setData('postal_code', e.target.value)}
                                className={errors.postal_code ? 'border-red-500' : ''}
                            />
                            {errors.postal_code && (
                                <p className="text-sm text-red-500">
                                    {errors.postal_code}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="country">Pays</Label>
                        <Input
                            id="country"
                            value={data.country || ''}
                            onChange={(e) => setData('country', e.target.value)}
                            className={errors.country ? 'border-red-500' : ''}
                        />
                        {errors.country && (
                            <p className="text-sm text-red-500">{errors.country}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="notes">Notes</Label>
                        <Textarea
                            id="notes"
                            value={data.notes || ''}
                            onChange={(e) => setData('notes', e.target.value)}
                            className={errors.notes ? 'border-red-500' : ''}
                        />
                        {errors.notes && (
                            <p className="text-sm text-red-500">{errors.notes}</p>
                        )}
                    </div>

                    <div className="flex justify-end space-x-2">
                        <Button variant="outline" type="button" onClick={handleClose}>
                            Annuler
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {modalType === 'create' ? 'Créer' : 'Modifier'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
