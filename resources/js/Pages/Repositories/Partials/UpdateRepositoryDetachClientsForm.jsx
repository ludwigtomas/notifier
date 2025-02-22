import { Link, useForm } from '@inertiajs/react'
import InputError from '@/Components/InputError'
import TextInput from '@/Components/TextInput'
import { UserIcon, TrashIcon, CheckIcon, PencilSquareIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

export default function Show({ repository, className = '' }) {
    const [selectedClient, setSelectedClient] = useState(null)

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        client_email_secondary: '',
        relationship: 'repository_client',
    })

    const detachSubmit = (e) => {
        e.preventDefault()

        delete route('client-repository.detach', [selectedClient, repository.repository_id])
    }

    const updateSubmit = (e) => {
        e.preventDefault()

        patch(route('client-repository.update', [selectedClient, repository.repository_id]), {
            preserveScroll: true,
            onSuccess: () => {
                setSelectedClient(null)
                setData('client_email_secondary', '')
            },
        })
    }

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-100">Detach Clients</h2>

                <p className="mt-1 text-sm text-gray-400">
                    Defaultně se využije <code>client.email</code>, případně lze zadat custom pro každého klienta.
                </p>
            </header>

            <form
                onSubmit={detachSubmit}
                className="mt-6 grid grid-cols-12 gap-5"
            >
                {repository.relationships.clients.map((client) => {
                    return (
                        <div
                            className="col-span-12 sm:col-span-6"
                            key={client.id}
                        >
                            <div className="flex items-center justify-between rounded-lg bg-zinc-800 p-2">
                                <div className="flex w-full items-center space-x-4">
                                    <div className="flex size-12 items-center justify-center rounded-lg bg-zinc-700">
                                        <UserIcon className="h-6 w-6 text-sky-500" />
                                    </div>

                                    <div className="w-full">
                                        <Link
                                            href={route('clients.show', client.id)}
                                            className="text-lg font-semibold text-gray-100 hover:underline"
                                        >
                                            {client.name}
                                        </Link>

                                        <p className="mt-1 text-sm text-gray-400">{client.email ?? 'N/A'}</p>

                                        <p className="mt-1 text-sm text-gray-400">{client.client_email_secondary ?? 'N/A'}</p>

                                        {selectedClient === client.id ? (
                                            <>
                                                <TextInput
                                                    id="client_email_secondary"
                                                    className="mt-1 block w-full"
                                                    placeholder="info@ludwigtomas.cz"
                                                    value={data.client_email_secondary}
                                                    onChange={(e) => setData('client_email_secondary', e.target.value)}
                                                    isFocused
                                                />

                                                <InputError
                                                    className="mt-2"
                                                    message={errors.client_email_secondary}
                                                />
                                            </>
                                        ) : (
                                            <TextInput
                                                id="client_email_secondary"
                                                className="mt-1 block w-full"
                                                placeholder="---"
                                                defaultValue={client.client_email_secondary}
                                                disabled
                                            />
                                        )}
                                    </div>
                                </div>

                                <div className="ml-4 flex flex-col space-y-2">
                                    {selectedClient === client.id ? (
                                        <>
                                            <button
                                                type="button"
                                                onClick={() => setSelectedClient(null)}
                                                className="faster-animation group inline-flex items-center rounded-md bg-zinc-900 px-3 py-2 text-sm hover:bg-red-500"
                                            >
                                                <XMarkIcon className="h-6 w-6 text-red-500 group-hover:text-red-100" />
                                            </button>

                                            <button
                                                type="submit"
                                                onClick={updateSubmit}
                                                className="faster-animation group inline-flex items-center rounded-md bg-zinc-900 px-3 py-2 text-sm hover:bg-green-500"
                                            >
                                                <CheckIcon className="h-6 w-6 text-green-500 group-hover:text-green-100" />
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <Link
                                                as="button"
                                                method="DELETE"
                                                preserveScroll
                                                className="faster-animation group inline-flex items-center rounded-md bg-zinc-900 px-3 py-2 text-sm hover:bg-red-500"
                                                href={route('client-repository.detach', {
                                                    client: client.id,
                                                    repository: repository.repository_id,
                                                })}
                                            >
                                                <TrashIcon className="h-6 w-6 text-red-500 group-hover:text-red-100" />
                                            </Link>

                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setSelectedClient(client.id)
                                                    setData('client_email_secondary', client.client_email_secondary ?? '')
                                                }}
                                                className="faster-animation group inline-flex items-center rounded-md bg-zinc-900 px-3 py-2 text-sm hover:bg-green-500"
                                            >
                                                <PencilSquareIcon className="h-6 w-6 text-green-500 group-hover:text-green-100" />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </form>
        </section>
    )
}
