<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreContactRequest;
use App\Models\Contact;
use App\Http\Services\ContactService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class ContactController extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    protected $contactService;

    public function __construct(ContactService $contactService)
    {
        $this->contactService = $contactService;
    }


    public function index(Request $request)
    {
        $contacts = $this->contactService->getAllContacts();
        return Inertia::render('Dashboard', [
            'contacts' => $contacts
        ]);
    }

    public function create()
    {
        return Inertia::render('Dashboard', [
            'showModal' => true,
            'modalType' => 'create'
        ]);
    }

    public function store(StoreContactRequest $request)
    {
        $validated = $request->validated();
        $this->contactService->createContact($validated);
        return Redirect::route('dashboard')->with('message', 'Contact créé avec succès.');
    }


    public function show(Contact $contact)
    {
        $this->authorize('view', $contact);
        return Inertia::render('SingleContact', [
            'contact' => $contact
        ]);
    }

    public function edit(Contact $contact)
    {
        $this->authorize('update', $contact);
        return Inertia::render('Dashboard', [
            'contact' => $contact,
            'showModal' => true,
            'modalType' => 'edit'
        ]);
    }

    public function update(StoreContactRequest $request, Contact $contact)
        {
            $this->authorize('update', $contact);
            $validated = $request->validated();
            $this->contactService->updateContact($contact, $validated);
            return Redirect::route('dashboard')->with('message', 'Contact modifié avec succès.');
        }

    public function destroy(Contact $contact)
    {
        $this->authorize('delete', $contact);
        $this->contactService->deleteContact($contact);
        return Redirect::route('dashboard')->with('message', 'Contact supprimé avec succès.');
    }
}
