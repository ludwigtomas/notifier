import { Link, useForm, usePage } from "@inertiajs/react";
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import {
    UserIcon,
    TrashIcon,
    CheckIcon,
    PencilSquareIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

export default function Show({ repository, className = "" }) {
    const [selectedClient, setSelectedClient] = useState(null);

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        client_email: "",
    });


    const detachSubmit = (e) => {

        e.preventDefault();

        delete(route('repository.clients.detach', repository.id));
    };

    const updateSubmit = (e) => {
        e.preventDefault();

        patch(route('repository.clients.update', [repository.id, selectedClient]));
    }

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-100">
                    Attached Clients
                </h2>

                <p className="maxmt-1 text-sm text-gray-400">
                    Defaultně se využije <code>client.email</code>, případně lze zadat custom pro každého klienta.
                </p>
            </header>

            <form onSubmit={detachSubmit} className="mt-6 grid grid-cols-12 gap-5">
                {repository.relationships.clients.map((client) => {
                    return (
                        <div className="col-span-12 sm:col-span-6 lg:col-span-4" key={client.id}>
                            <div className="flex items-center justify-between bg-zinc-800 rounded-lg p-4">
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center justify-center w-12 h-12 bg-zinc-700 rounded-lg">
                                        <UserIcon className="w-6 h-6 text-sky-500" />
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-100">
                                            {client.name}
                                        </h3>

                                        <p className="mt-1 text-sm text-gray-400">
                                            {client.email ?? "N/A"}
                                        </p>

                                        {selectedClient === client.id ? (
                                            <TextInput
                                                id="client_email"
                                                type="text"
                                                className="mt-1 bg-white"
                                                value={data.client_email}
                                                onChange={(e) => setData("client_email", e.target.value)}
                                                errors={errors.client_email}
                                            />
                                        ) : (
                                            <TextInput
                                                id="client_email"
                                                type="text"
                                                disabled
                                                value={client.client_email}
                                                className="mt-1 block w-full cursor-not-allowed bg-zinc-700/40 border-zinc-800"
                                            />
                                        )
                                        }
                                    </div>
                                </div>

                                <div className="flex flex-col space-y-2">
                                    {selectedClient === client.id ? (
                                        <>
                                             <button
                                                type="button"
                                                onClick={() => setSelectedClient(null)}
                                                className="group inline-flex items-center text-sm bg-zinc-900 px-3 py-2 rounded-md hover:bg-red-500 faster-animation"
                                            >
                                                <XMarkIcon className="w-6 h-6 text-red-500 group-hover:text-red-100"/>
                                            </button>

                                            <button
                                                type="submit"
                                                onClick={updateSubmit}
                                                className="group inline-flex items-center text-sm bg-zinc-900 px-3 py-2 rounded-md hover:bg-green-500 faster-animation"
                                            >
                                                <CheckIcon className="w-6 h-6 text-green-500 group-hover:text-green-100"/>
                                            </button>
                                        </>
                                        ) : (
                                            <>
                                                <button
                                                    type="button"
                                                    onClick={() => setSelectedClient(client.id)}
                                                    className="group inline-flex items-center text-sm bg-zinc-900 px-3 py-2 rounded-md hover:bg-green-500 faster-animation"
                                                >
                                                    <PencilSquareIcon className="w-6 h-6 text-green-500 group-hover:text-green-100"/>
                                                </button>

                                                <Link
                                                    as="button"
                                                    method="DELETE"
                                                    preserveScroll
                                                    className="group inline-flex items-center text-sm bg-zinc-900 px-3 py-2 rounded-md hover:bg-red-500 faster-animation"
                                                    href={route('repository.clients.detach', {repository: repository.id, client: client.id})}
                                                >
                                                    <TrashIcon className="w-6 h-6 text-red-500 group-hover:text-red-100"/>
                                                </Link>
                                            </>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    );
                })}
            </form>
        </section>
    );
}
