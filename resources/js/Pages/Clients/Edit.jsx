import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    PencilSquareIcon,
    TrashIcon,
    EyeIcon,
    PlusIcon,
    XMarkIcon,
    ChevronRightIcon,
    PhotoIcon,
    UserCircleIcon,
} from "@heroicons/react/24/outline";
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import UpdateClientInformationForm from "@/Pages/Clients/Partials/UpdateClientInformationForm";
import UpdateClientDetachRepositoriesForm from "@/Pages/Clients/Partials/UpdateClientDetachRepositoriesForm";
import UpdateClientAttachRepositoriesForm from "@/Pages/Clients/Partials/UpdateClientAttachRepositoriesForm";

export default function Edit({ auth, client, repositories }) {

    const { data, setData, put, processing, errors } = useForm({
        name: client.name ?? '',
        email: client.email ?? '',
        phone: client.phone ?? '',
        ico: client.ico ?? '',
        repositories: [...client.relationships.repositories.map((repository) => repository.id)],
    });

    // define new variable
    const [test, setTest] = useState(false);

    const submit = (e) => {
        e.preventDefault();

        put(route('clients.update', client.id), {
            preserveScroll: true,
            onSuccess: () => {
                alert('Klient byl úspěšně upraven.');
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <header className="flex items-center justify-start flex-row space-x-4 text-zinc-500">
                    <Link
                        className="font-semibold text-lg leading-tight hover:text-sky-500 slower-animation"
                        href={route("dashboard.index")}
                    >
                        Dashboard
                    </Link>

                    <span>
                        <ChevronRightIcon className="size-5" />
                    </span>

                    <Link
                        className="font-semibold text-lg leading-tight hover:text-sky-500 slower-animation"
                        href={route("clients.index")}
                    >
                        Klienti
                    </Link>

                    <span>
                        <ChevronRightIcon className="size-5" />
                    </span>

                    <Link
                        className="font-semibold text-lg leading-tight text-sky-500 slower-animation"
                        href={route("clients.edit", client.id)}
                    >
                        {client.name}
                    </Link>

                    <span>
                        <ChevronRightIcon className="size-5" />
                    </span>

                    <Link
                        className="font-semibold text-lg leading-tight text-sky-500"
                        href={route("clients.edit", client.id)}
                    >
                        Edit
                    </Link>
                </header>
            }
        >
            <Head title={client.name + " - Edit"} />

            <div className="py-12">
                <div className="max-w-[90rem] mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-10 bg-zinc-900 sm:rounded-xl">
                        <UpdateClientInformationForm
                            client={client}
                        />
                    </div>

                   <div className="p-10 bg-zinc-900 sm:rounded-xl">
                        <UpdateClientDetachRepositoriesForm
                            client={client}
                        />
                    </div>

                    <div className="p-10 bg-zinc-900 sm:rounded-xl">
                        <UpdateClientAttachRepositoriesForm
                            client={client}
                            repositories={repositories}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
