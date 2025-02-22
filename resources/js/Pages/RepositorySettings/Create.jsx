import AdminLayout from '@/Layouts/AdminLayout'
import { Head, Link, useForm } from '@inertiajs/react'
import { EyeIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'

export default function Edit({ auth, repository, option_keys, option_values }) {
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        key: option_keys[0],
        value: option_values[0],
        is_active: true,
    })

    const submit = (e) => {
        e.preventDefault()

        post(route('repository-settings.store', repository.repository_id), {
            preserveScroll: true,
        })
    }

    return (
        <AdminLayout
            user={auth.user}
            header={
                <header className="flex flex-row items-center justify-start space-x-4 text-zinc-500">
                    <Link
                        className="slower-animation text-lg font-semibold leading-tight hover:text-sky-500"
                        href={route('dashboard.index')}
                    >
                        Dashboard
                    </Link>

                    <span>
                        <ChevronRightIcon className="size-5" />
                    </span>

                    <Link
                        className="slower-animation text-lg font-semibold leading-tight hover:text-sky-500"
                        href={route('repositories.index')}
                    >
                        Repozitáře
                    </Link>

                    <span>
                        <ChevronRightIcon className="size-5" />
                    </span>

                    <Link
                        className="slower-animation text-lg font-semibold leading-tight hover:text-sky-500"
                        href={route('repositories.edit', repository.repository_id)}
                    >
                        {repository.name}
                    </Link>

                    <span>
                        <ChevronRightIcon className="size-5" />
                    </span>

                    <div className="group relative">
                        <Link
                            className="text-lg font-semibold leading-tight text-sky-500"
                            href={route('repository-settings.create', repository.repository_id)}
                        >
                            Repository settings
                        </Link>

                        <div className="invisible absolute left-0 top-full z-30 flex flex-col pt-6 group-hover:visible">
                            <div className="grid gap-y-2 rounded-xl border-2 border-zinc-700 bg-zinc-900 p-2 shadow-xl shadow-black">
                                <Link
                                    className="flex items-center justify-center space-x-4 rounded-md border border-transparent bg-zinc-800 px-4 py-2 hover:border-sky-500"
                                    href={route('repository-settings.create', repository.repository_id)}
                                >
                                    <span className="text-gray-200">Create</span>

                                    <EyeIcon className="size-6 text-sky-500" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>
            }
        >
            <Head title={repository.name + ' - Edit'} />

            <div className="mx-auto max-w-[50rem] space-y-6 sm:px-6 lg:px-8">
                <form
                    className="col-span-6 space-y-6"
                    onSubmit={submit}
                >
                    <div className="grid grid-cols-1 place-items-start space-y-6 rounded-lg border-2 border-zinc-700 bg-zinc-800 p-5">
                        <div className="w-full">
                            <InputLabel
                                htmlFor="key"
                                value="klíč"
                            />

                            <select
                                name="key"
                                value={data.key}
                                onChange={(e) => setData('key', e.target.value)}
                                className="w-full rounded-md !border-zinc-600 bg-zinc-900 text-white"
                            >
                                {option_keys.map((key) => (
                                    <option
                                        key={key}
                                        value={key}
                                    >
                                        {key}
                                    </option>
                                ))}
                            </select>

                            <InputError
                                message={errors.key}
                                className="mt-2"
                            />
                        </div>

                        <div className="w-full">
                            <InputLabel
                                htmlFor="value"
                                value="hodnota"
                            />

                            <select
                                name="value"
                                value={data.value}
                                onChange={(e) => setData('value', e.target.value)}
                                className="w-full rounded-md !border-zinc-600 bg-zinc-900 text-white"
                            >
                                {option_values.map((value) => (
                                    <option
                                        key={value}
                                        value={value}
                                    >
                                        {value}
                                    </option>
                                ))}
                            </select>

                            <InputError
                                message={errors.value}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="is_active"
                                value="aktivní"
                            />

                            <input
                                type="checkbox"
                                name="is_active"
                                checked={data.is_active}
                                onChange={(e) => setData('is_active', e.target.checked)}
                                className="rounded-md bg-zinc-900 text-sky-500"
                            />

                            <InputError
                                message={errors.is_active}
                                className="mt-2"
                            />
                        </div>

                        <div className="flex justify-end space-x-4">
                            <PrimaryButton type="submit">Save</PrimaryButton>

                            {recentlySuccessful && <span className="text-green-500">Uloženo</span>}
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    )
}
