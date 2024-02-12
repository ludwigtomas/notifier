import { Link, useForm, usePage } from "@inertiajs/react";
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { UserIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function Show({ repository, className = "" }) {

    const { data, setData, put, errors, processing, recentlySuccessful } = useForm({
    });


    const detachSubmit = (e) => {

        e.preventDefault();

        put(route('repository.clients.detach', repository.id));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-100">
                    Attached Clients
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                    Here you can see all clients attached to this repository.
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
                                            {client.email}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <Link
                                        as="button"
                                        method="DELETE"
                                        preserveScroll
                                        className="group inline-flex items-center text-sm bg-zinc-900 px-3 py-2 rounded-md hover:bg-red-500 faster-animation"
                                        href={route('repository.clients.detach', {repository: repository.id, client: client.id})}
                                    >
                                        <TrashIcon className="w-6 h-6 text-red-500 group-hover:text-red-100"/>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );

                })}


            </form>
        </section>
    );
}
