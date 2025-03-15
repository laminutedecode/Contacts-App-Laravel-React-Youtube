<?php

namespace App\Http\Services;


use App\Models\Contact;
use Illuminate\Support\Facades\Auth;

class ContactService
{
    public function getAllContacts(){
        $user = Auth::user();
        if(!$user){
            return [];
        }

        return Contact::where('user_id', $user->id)->orderBy('first_name')->get();
    }

    public function createContact(array $data){
        $user = Auth::user();
        if(!$user){
            return null;
        }

        $data['user_id'] = $user->id;
        return Contact::create($data);

    }

    public function updateContact(Contact $contact, array $data)
    {
        $user = Auth::user();
        if(!$user){
            return null;
        }

        return $contact->update($data);

    }

    public function deleteContact(Contact $contact) {
        $user = Auth::user();
        if(!$user || $contact->user_id !== $user->id) {
            return false;
        }
        return $contact->delete();
    }

}