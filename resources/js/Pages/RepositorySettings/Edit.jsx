import AdminLayout from '@/Layouts/AdminLayout'
import UpdateRepositoryInformationForm from '@/Pages/Repositories/Partials/UpdateRepositoryInformationForm'
import UpdateRepositoryDetachClientsForm from '@/Pages/Repositories/Partials/UpdateRepositoryDetachClientsForm'
import UpdateRepositoryAttachClientsForm from '@/Pages/Repositories/Partials/UpdateRepositoryAttachClientsForm'
import UpdateRepositoryHostingForm from '@/Pages/Repositories/Partials/UpdateRepositoryHostingForm'
import CreateRepositoryHostingForm from '@/Pages/Repositories/Partials/CreateRepositoryHostingForm'
import Dropdown from '@/Components/Dropdown'
import { Head, Link, useForm } from '@inertiajs/react'
import { motion } from 'framer-motion'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import { EyeIcon, ChevronRightIcon, ClipboardIcon, CommandLineIcon, PencilSquareIcon } from '@heroicons/react/24/outline'

export default function Edit({ auth, repository, repository_setting, option_keys, option_values }) {
    const { data, setData, put, errors, processing, recentlySuccessful } = useForm({
        key: repository_setting.key,
        value: repository_setting.value,
        is_active: repository_setting.is_active,
        last_attempt_at: repository_setting.last_attempt_at,
        attempts: repository_setting.attempts,
        was_successful: repository_setting.was_successful,
    })

    const submit = (e) => {
        e.preventDefault()

        put(
            route('repository-settings.update', {
                repository: repository.repository_id,
                repository_setting: repository_setting.id,
            }),
            {
                preserveScroll: true,
            }
        )
    }

    return (
        <AdminLayout
            user={auth.user}
            header={
                <header className="flex flex-row items-center justify-start space-x-4 text-zinc-500">
                    <Link
                        className="slower-animation text-lg leading-tight font-semibold hover:text-sky-500"
                        href={route('dashboard.index')}
                    >
                        Dashboard
                    </Link>

                    <span>
                        <ChevronRightIcon className="size-5" />
                    </span>

                    <Link
                        className="slower-animation text-lg leading-tight font-semibold hover:text-sky-500"
                        href={route('repositories.index')}
                    >
                        Repozitáře
                    </Link>

                    <span>
                        <ChevronRightIcon className="size-5" />
                    </span>

                    <div className="group relative">
                        <Link
                            className="slower-animation text-lg leading-tight font-semibold hover:text-sky-500"
                            href={route('repositories.edit', repository.repository_id)}
                        >
                            {repository.name}
                        </Link>

                        <div className="invisible absolute top-full left-0 z-30 flex w-full flex-col pt-6 group-hover:visible">
                            <div className="grid gap-y-2 rounded-xl border-2 border-zinc-700 bg-zinc-900 p-2 shadow-xl shadow-black">
                                <Link
                                    className="flex items-center justify-center space-x-4 rounded-md border border-transparent bg-zinc-800 px-4 py-2 hover:border-sky-500"
                                    href={route('repositories.show', repository.repository_id)}
                                >
                                    <span className="text-gray-200">Zobrazit</span>

                                    <EyeIcon className="size-6 text-sky-500" />
                                </Link>

                                <Link
                                    className="flex items-center justify-center space-x-4 rounded-md border border-transparent bg-zinc-800 px-4 py-2 hover:border-green-500"
                                    href={route('repositories.edit', repository.repository_id)}
                                >
                                    <span className="text-gray-200">Editovat</span>

                                    <PencilSquareIcon className="h-6 w-6 text-green-500" />
                                </Link>

                                {repository.relationships.hosting_repository && repository.relationships.hosting_repository.id && (
                                    <Link
                                        className="flex items-center justify-center space-x-4 rounded-md border border-transparent bg-zinc-800 px-4 py-2 hover:border-orange-500"
                                        href={route('hosting-repository.vps-connect', repository.relationships.hosting_repository.id)}
                                    >
                                        <span className="text-gray-200">Hosting</span>

                                        <CommandLineIcon className="size-6 text-orange-500" />
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>

                    <span>
                        <ChevronRightIcon className="size-5" />
                    </span>

                    <div className="group relative">
                        <Link
                            className="text-lg leading-tight font-semibold text-sky-500"
                            href={route('repository-settings.create', repository.repository_id)}
                        >
                            Repository settings
                        </Link>

                        <div className="invisible absolute top-full left-0 z-30 flex flex-col pt-6 group-hover:visible">
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

                        <div className="w-full text-white">
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

                        <div className="w-full">
                            <InputLabel
                                htmlFor="last_attempt_at"
                                value="poslední pokus"
                            />

                            <TextInput
                                name="last_attempt_at"
                                type="datetime-local"
                                value={data.last_attempt_at}
                                onChange={(e) => setData('last_attempt_at', e.target.value)}
                                className="w-full rounded-md !border-zinc-600 bg-zinc-900 text-white"
                            />

                            <InputError
                                message={errors.last_attempt_at}
                                className="mt-2"
                            />
                        </div>

                        <div className="w-full">
                            <InputLabel
                                htmlFor="attempts"
                                value="pokusy"
                            />

                            <TextInput
                                name="attempts"
                                type="number"
                                value={data.attempts}
                                onChange={(e) => setData('attempts', e.target.value)}
                                className="w-full rounded-md !border-zinc-600 bg-zinc-900 text-white"
                            />

                            <InputError
                                message={errors.attempts}
                                className="mt-2"
                            />
                        </div>

                        <div className="w-full">
                            <InputLabel
                                htmlFor="was_successful"
                                value="úspěšné"
                            />

                            <input
                                type="checkbox"
                                name="was_successful"
                                checked={data.was_successful}
                                onChange={(e) => setData('was_successful', e.target.checked)}
                                className="rounded-md bg-zinc-900 text-sky-500"
                            />

                            <InputError
                                message={errors.was_successful}
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
