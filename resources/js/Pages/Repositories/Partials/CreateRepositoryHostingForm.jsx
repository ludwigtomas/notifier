import { Link, useForm, usePage } from '@inertiajs/react'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import { ClockIcon } from '@heroicons/react/24/outline'
import Dropdown from '@/Components/Dropdown'
import { TrashIcon } from '@heroicons/react/24/outline'

export default function CreateRepositoryHostingForm({ repository_id, hosting_repository, hostings, className = '' }) {
    const { data, setData, post, errors, processing } = useForm({
        repository_id: repository_id,
        hosting_id: '',

        ip_address: '',
        ip_port: '',
        login_user: '',
        login_password: '',
    })

    const submit = (e) => {
        e.preventDefault()

        post(route('hosting-repository.store'), {
            preserveScroll: true,
        })
    }

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-100">Create Repository Hosting</h2>

                <p className="mt-1 text-sm text-gray-400">Create hosting information for this repository.</p>
            </header>

            <form
                onSubmit={submit}
                className="mt-6"
            >
                <div className="space-y-6 rounded-lg border-2 border-zinc-700 bg-zinc-800 p-5">
                    {/* <div>
                        <InputLabel
                            htmlFor="name"
                            value="Název"
                        />

                        <TextInput
                            type="text"
                            id="name"
                            className="mt-1 block w-full"
                            placeholder="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />

                        <InputError
                            className="mt-2"
                            message={errors.name}
                        />
                    </div> */}
                    <div>
                        <InputLabel
                            htmlFor="hosting"
                            value="Hosting"
                        />

                        <select
                            className="mt-1 block w-full rounded-md border-2 border-zinc-500 bg-zinc-700 text-zinc-200 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                            value={data.hosting_id}
                            onChange={(e) => setData('hosting_id', e.target.value)}
                        >
                            <option
                                disabled
                                hidden
                                value={''}
                            >
                                Select hosting
                            </option>

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
                    <div>
                        <PrimaryButton
                            typeOfButton="submit"
                            className="w-full"
                            disabled={processing}
                        >
                            Create
                        </PrimaryButton>
                    </div>
                </div>
            </form>
        </section>
    )
}
