import { Link, useForm, usePage } from '@inertiajs/react'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import { PaperAirplaneIcon, TrashIcon } from '@heroicons/react/24/outline'
import { ActionButton } from '@/Components/Buttons/ActionButtons'
import { useCallback } from 'react'

export default function Show({ hostings, hosting, hosting_repository, className = '' }) {
    const { data, setData, put, errors, processing, recentlySuccessful } = useForm({
        hosting_id: hosting_repository.hosting_id ?? '',

        ip_address: hosting_repository.ip_address ?? '',
        ip_port: hosting_repository.ip_port ?? '',
        login_user: hosting_repository.login_user ?? '',
        login_password: hosting_repository.login_password ?? '',
    })

    const submit = (e) => {
        e.preventDefault()

        put(route('hosting-repository.update', hosting_repository.id), {
            preserveScroll: true,
        })
    }

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-100">Update Repository Hosting</h2>

                <p className="mt-1 text-sm text-gray-400">Update hosting information for this repository.</p>
            </header>

            <form
                onSubmit={submit}
                className="mt-6"
            >
                <div className="space-y-6 rounded-lg border-2 border-zinc-700 bg-zinc-800 p-5">
                    <div>
                        <InputLabel
                            htmlFor="hosting_id"
                            value="Hosting"
                        />

                        <select
                            id="hosting_id"
                            className="mt-1 block w-full rounded-md border-2 border-zinc-500 bg-zinc-700 text-zinc-200 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                            value={data.hosting_id}
                            onChange={(e) => setData('hosting_id', e.target.value)}
                        >
                            <option value="">Vyberte hosting</option>

                            {hostings.map((hosting) => (
                                <option
                                    key={hosting.id}
                                    value={hosting.id}
                                >
                                    {hosting.name}
                                </option>
                            ))}
                        </select>

                        <InputError
                            className="mt-2"
                            message={errors.hosting_id}
                        />
                    </div>

                    <div className="pt-10">
                        <InputLabel
                            htmlFor="login_user"
                            value="User"
                        />

                        <TextInput
                            type="text"
                            id="login_user"
                            className="mt-1 block w-full"
                            placeholder="tech1"
                            value={data.login_user}
                            onChange={(e) => setData('login_user', e.target.value)}
                        />

                        <InputError
                            className="mt-2"
                            message={errors.login_user}
                        />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="ip_address"
                            value="IP adresa"
                        />

                        <TextInput
                            type="text"
                            id="ip_address"
                            className="mt-1 block w-full"
                            placeholder="127.0.0.10"
                            value={data.ip_address}
                            onChange={(e) => setData('ip_address', e.target.value)}
                        />

                        <InputError
                            className="mt-2"
                            message={errors.ip_address}
                        />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="ip_port"
                            value="IP port"
                        />

                        <TextInput
                            type="text"
                            id="ip_port"
                            className="mt-1 block w-full"
                            placeholder="1788"
                            value={data.ip_port}
                            onChange={(e) => setData('ip_port', e.target.value)}
                        />

                        <InputError
                            className="mt-2"
                            message={errors.ip_port}
                        />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="login_password"
                            value="Heslo"
                        />

                        <TextInput
                            type="text"
                            id="login_password"
                            className="mt-1 block w-full"
                            placeholder="empty"
                            value={data.login_password}
                            onChange={(e) => setData('login_password', e.target.value)}
                        />

                        <InputError
                            className="mt-2"
                            message={errors.login_password}
                        />
                    </div>
                </div>

                <div className="col-span-12 mt-6 flex items-center space-x-4">
                    <PrimaryButton
                        typeOfButton="submit"
                        className="justify-center"
                        disabled={processing}
                    >
                        Update
                    </PrimaryButton>

                    <Link
                        as="button"
                        method="DELETE"
                        preserveScroll
                        href={route('hosting-repository.destroy', hosting_repository.id)}
                        className="flex items-center justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-red-500 focus:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-red-900"
                    >
                        <TrashIcon className="mr-2 size-5 text-white" />
                        Smazat
                    </Link>

                    {recentlySuccessful && <p className="text-green-500">Repository information has been updated!</p>}
                </div>
            </form>
        </section>
    )
}
