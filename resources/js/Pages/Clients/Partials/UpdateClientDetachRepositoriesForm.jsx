import { Link, useForm } from "@inertiajs/react";
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import {
    UserIcon,
    TrashIcon,
    CheckIcon,
    PencilSquareIcon,
    XMarkIcon,
    ArchiveBoxIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

export default function UpdateClientInformationForm({ client, className }) {

    const [selectedRepository, setSelectedRepository] = useState(null)

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        client_email: "",
        relationship: "client_repository",
    });

    const detachSubmit = (e) => {
        e.preventDefault();

        delete route("client-repository.detach", repository.repository_id);
    };

    const updateSubmit = (e) => {
        e.preventDefault();

        patch(route('client-repository.update', [client.id, selectedRepository]), {
            preserveScroll: true,
            onSuccess: () => {
                setSelectedRepository(null);
                setData("client_email", "");
            },
        });
    }

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-100">
                    Detach repositories
                </h2>

                <p className="maxmt-1 text-sm text-gray-400">
                    Defaultně se využije <code>client.email</code>, případně lze
                    zadat custom pro každého klienta.
                </p>
            </header>

            <form
                onSubmit={detachSubmit}
                className="mt-6 grid grid-cols-12 gap-5"
            >
                {client.relationships.repositories.map((repository) => {
                    return (
                        <div
                            className="col-span-12 sm:col-span-6 lg:col-span-4"
                            key={repository.repository_id}
                        >
                            <div className="flex items-center justify-between bg-zinc-800 rounded-lg p-4">
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center justify-center w-12 h-12 bg-zinc-700 rounded-lg">
                                        <ArchiveBoxIcon className="w-6 h-6 text-sky-500" />
                                    </div>

                                    <div>
                                        <Link
                                            href={route("repositories.show", repository.repository_id)}
                                            className="text-lg font-semibold text-gray-100"
                                        >
                                            {repository.name}
                                        </Link>

                                        <p className="mt-1 text-sm text-gray-400">
                                            {client.email ?? "N/A"}
                                        </p>

                                        {selectedRepository == repository.repository_id ? (
                                            <>
                                                <TextInput
                                                    id="client_email"
                                                    type="email"
                                                    className="mt-1 block w-full"
                                                    placeholder="info@ludwigtomas.cz"
                                                    value={data.client_email}
                                                    onChange={(e) => setData("client_email", e.target.value)}
                                                    isFocused
                                                    required
                                                />

                                                <InputError
                                                    className="mt-2"
                                                    message={errors.client_email}
                                                />
                                            </>
                                        ): (
                                            <p className="mt-1 text-sm text-gray-400">
                                                {repository.client_email ?? "N/A"}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-col space-y-2">
                                    {selectedRepository === repository.repository_id ? (
                                        <>
                                            <button
                                                type="button"
                                                onClick={() => setSelectedRepository(null)}
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
                                                    onClick={() => {
                                                        setSelectedRepository(repository.repository_id);
                                                        setData("client_email", repository.client_email ?? "");
                                                    }}
                                                    className="group inline-flex items-center text-sm bg-zinc-900 px-3 py-2 rounded-md hover:bg-green-500 faster-animation"
                                                >
                                                    <PencilSquareIcon className="w-6 h-6 text-green-500 group-hover:text-green-100"/>
                                                </button>

                                                <Link
                                                    as="button"
                                                    method="DELETE"
                                                    preserveScroll
                                                    className="group inline-flex items-center text-sm bg-zinc-900 px-3 py-2 rounded-md hover:bg-red-500 faster-animation"
                                                    href={route('client-repository.detach', {client: client.id, repository: repository.repository_id})}
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
