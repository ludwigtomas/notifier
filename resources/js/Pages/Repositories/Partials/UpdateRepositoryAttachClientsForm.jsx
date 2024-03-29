import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import {
    TrashIcon,
    EyeIcon,
    PlusIcon,
    ChevronRightIcon,
    UserIcon,
} from "@heroicons/react/24/outline";

export default function Show({ clients, repository, className = "" }) {

    const { data, setData, put, processing, errors } = useForm({
        clients: []
    });

    const attachClientSubmit = (e) => {
        e.preventDefault();

        put(route('client.repository.attach', repository.id));

    }

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-100">
                    Attach new <b>Clients</b>
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                    Here you can see all unattached clients to this repository.
                </p>
            </header>

            <form onSubmit={attachClientSubmit} className="mt-6 grid grid-cols-12 gap-5">
                {clients.map((client) => {
                    return (
                        <div
                            className="col-span-12 sm:col-span-6 lg:col-span-4"
                            key={client.id}
                        >
                            <div className="flex items-center justify-between bg-zinc-800 rounded-lg p-4">
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center justify-center w-12 h-12 bg-zinc-700 rounded-lg">
                                        <UserIcon className="w-6 h-6 text-sky-500" />
                                    </div>

                                    <div>
                                        <Link
                                            href={route('clients.show', client.id)}
                                            className="text-lg font-semibold text-gray-100"
                                        >
                                            {client.name}
                                        </Link>

                                        <p className="mt-1 text-sm text-gray-400">
                                            {client.email}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <Link
                                        as="button"
                                        method="POST"
                                        preserveScroll
                                        preserveState
                                        className="group inline-flex items-center text-sm bg-zinc-900 px-3 py-2 rounded-md hover:bg-green-500 faster-animation"
                                        href={route('client.repository.attach', {client: client.id, repository: repository.id})}
                                    >
                                        <PlusIcon className="w-6 h-6 text-green-500 group-hover:text-green-100"/>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                }
                )}

            </form>
        </section>
    );
}
