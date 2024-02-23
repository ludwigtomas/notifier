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

    const detachSubmit = (e) => {
        e.preventDefault();

        delete route("client.repository.detach", repository.id);
    };

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
                            key={repository.id}
                        >
                            <div className="flex items-center justify-between bg-zinc-800 rounded-lg p-4">
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center justify-center w-12 h-12 bg-zinc-700 rounded-lg">
                                        <ArchiveBoxIcon className="w-6 h-6 text-sky-500" />
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-100">
                                            {repository.name}
                                        </h3>

                                        <p className="mt-1 text-sm text-gray-400">
                                            {client.email ?? "N/A"}
                                        </p>

                                        {selectedRepository == repository.id ? (
                                            <>
                                                <TextInput
                                                    id="client_email"
                                                    type="email"
                                                    className="mt-1 block w-full"
                                                    value={data.client_email}
                                                    onChange={(e) => setData("client_email", e.target.value)}
                                                    isFocused
                                                    required
                                                />
                                            </>
                                        ): (
                                            <p className="mt-1 text-sm text-gray-400">
                                                {repository.email ?? "N/A"}
                                            </p>
                                        )}



                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="flex items-center justify-center w-8 h-8 bg-red-500 rounded-lg"
                                >
                                    <TrashIcon className="w-4 h-4 text-gray-100" />
                                </button>
                            </div>

                        </div>
                    );
                })}
            </form>
        </section>
    );
}
