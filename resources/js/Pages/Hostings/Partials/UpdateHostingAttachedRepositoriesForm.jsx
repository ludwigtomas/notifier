import { useForm, Link } from '@inertiajs/react'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import GoBackLink from '@/Components/GoBackLink'
import { UserIcon, TrashIcon, CheckIcon, PencilSquareIcon, XMarkIcon, ArchiveBoxIcon, EyeIcon } from '@heroicons/react/24/outline'

export default function UpdateHostingAttachedRepositoriesForm({ hosting, className = '' }) {
    const { data, setData, put, errors, processing, recentlySuccessful } = useForm({
        name: hosting.name,
        hosting_url: hosting.hosting_url ?? '',
    })

    const submit = (e) => {
        e.preventDefault()

        put(route('hostings.update', hosting.id), {
            preserveScroll: true,
        })
    }

    return (
        <section className={className}>
            <header>
                <h1 className="text-center text-xl font-bold text-gray-200">{hosting.name}</h1>

                <h2 className="text-lg font-medium text-gray-100">
                    Update hosting <u>Repositories</u>
                </h2>

                <p className="mt-1 text-sm text-gray-400">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla, molestiae!</p>
            </header>

            <div className="mt-6 grid grid-cols-3 gap-5">
                {hosting.relationships.repositories.map((repository) => {
                    return (
                        <div
                            className="grid"
                            key={repository.repository_id}
                        >
                            <div className="rounded-lg bg-zinc-800 p-4">
                                <div className="flex flex-row items-center justify-between">
                                    <div className="flex size-12 items-center justify-center rounded-lg bg-zinc-700">
                                        <ArchiveBoxIcon className="h-6 w-6 text-sky-500" />
                                    </div>

                                    <div className="w-6/12">
                                        <Link
                                            href={route('repositories.show', repository.repository_id)}
                                            className="text-lg font-semibold text-gray-100"
                                        >
                                            {repository.name}
                                        </Link>
                                    </div>

                                    <div className="flex flex-row items-center justify-center space-x-2">
                                        <Link
                                            className="faster-animation group inline-flex items-center rounded-md bg-zinc-900 px-3 py-2 text-sm hover:bg-green-500"
                                            href={route('repositories.edit', repository.repository_id)}
                                        >
                                            <EyeIcon className="h-6 w-6 text-green-500 group-hover:text-green-100" />
                                        </Link>

                                        <Link
                                            as="button"
                                            method="DELETE"
                                            preserveScroll
                                            className="faster-animation group inline-flex items-center rounded-md bg-zinc-900 px-3 py-2 text-sm hover:bg-red-500"
                                            href={route('hosting-repository.detach', {
                                                hosting: hosting.id,
                                                repository: repository.repository_id,
                                            })}
                                        >
                                            <TrashIcon className="h-6 w-6 text-red-500 group-hover:text-red-100" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
