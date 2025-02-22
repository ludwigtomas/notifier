import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import { Link, useForm, usePage } from '@inertiajs/react'
import { TrashIcon, EyeIcon, PlusIcon, ChevronRightIcon, UserIcon } from '@heroicons/react/24/outline'

export default function AttachClientRepositoriesForm({ hosting, repositories, className = '' }) {
    const { data, setData, put, processing, errors } = useForm({
        repositories: [],
    })

    const attachClientSubmit = (e) => {
        e.preventDefault()

        put(route('client-repository.attach', hosting.id))
    }

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-100">
                    Attach hosting <u>Repositories</u>
                </h2>

                <p className="mt-1 text-sm text-gray-400">Here you can see all unattached repositories to this client.</p>
            </header>

            <form
                onSubmit={attachClientSubmit}
                className="mt-6 grid grid-cols-12 gap-5"
            >
                {repositories.map((repository) => {
                    return (
                        <div
                            className="col-span-12 sm:col-span-6 lg:col-span-4"
                            key={repository.repository_id}
                        >
                            <div className="flex items-center justify-between rounded-lg bg-zinc-800 p-4">
                                <div className="flex items-center space-x-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-700">
                                        <UserIcon className="h-6 w-6 text-sky-500" />
                                    </div>

                                    <div>
                                        <Link
                                            href={route('repositories.show', repository.repository_id)}
                                            className="text-lg font-semibold text-gray-100"
                                        >
                                            {repository.name}
                                        </Link>

                                        <p className="mt-1 text-sm text-gray-400">{repository.email}</p>
                                    </div>
                                </div>

                                <div>
                                    <Link
                                        as="button"
                                        method="POST"
                                        preserveScroll
                                        preserveState
                                        className="faster-animation group inline-flex items-center rounded-md bg-zinc-900 px-3 py-2 text-sm hover:bg-green-500"
                                        href={route('hosting-repository.attach', {
                                            hosting: hosting.id,
                                            repository: repository.repository_id,
                                        })}
                                    >
                                        <PlusIcon className="h-6 w-6 text-green-500 group-hover:text-green-100" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </form>
        </section>
    )
}
