import { useForm } from '@inertiajs/react'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import GoBackLink from '@/Components/GoBackLink'

export default function UpdateClientRepositoriesForm({ client, className = '' }) {
    const { data, setData, put, errors, processing, recentlySuccessful } = useForm({
        name: client.name ?? '',
        email: client.email ?? '',
        phone: client.phone ?? '',
        ico: client.ico ?? '',
    })

    const submit = (e) => {
        e.preventDefault()

        put(route('clients.update', client.id), {
            preserveScroll: true,
        })
    }

    return (
        <section className={className}>
            <header>
                <h1 className="text-center text-xl font-bold text-gray-200">{client.name}</h1>

                <h2 className="text-lg font-medium text-gray-100">Client edit</h2>

                <p className="mt-1 text-sm text-gray-400">Update your client's information.</p>
            </header>

            <form
                onSubmit={submit}
                className="mt-6 w-6/12"
            >
                <div className="space-y-6 rounded-lg border-2 border-zinc-700 bg-zinc-800 p-5">
                    <div>
                        <InputLabel
                            isRequired
                            htmlFor="name"
                            value="Klient"
                        />

                        <TextInput
                            id="name"
                            type="text"
                            name="name"
                            placeholder="ludwig tomáš"
                            className="mt-1 block w-full"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />

                        <InputError
                            className="mt-2"
                            message={errors.name}
                        />
                    </div>

                    <div>
                        <InputLabel
                            isRequired
                            htmlFor="email"
                            value="Email"
                        />

                        <TextInput
                            type="text"
                            id="email"
                            className="mt-1 block w-full"
                            placeholder="info@ludwigtomas.cz"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                        />

                        <InputError
                            className="mt-2"
                            message={errors.email}
                        />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="phone"
                            value="Telefonní číslo"
                        />

                        <TextInput
                            type="text"
                            id="phone"
                            className="mt-1 block w-full"
                            placeholder="730 681 670"
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                        />

                        <InputError
                            className="mt-2"
                            message={errors.phone}
                        />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="ico"
                            value="ICO"
                        />

                        <TextInput
                            type="number"
                            id="ico"
                            className="mt-1 block w-full"
                            placeholder="ico"
                            value={data.ico}
                            onChange={(e) => setData('ico', e.target.value)}
                        />

                        <InputError
                            className="mt-2"
                            message={errors.ico}
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
                            Aktualizovat
                        </PrimaryButton>
                    </div>

                    <div>
                        <GoBackLink href={route('clients.index')}>Zpátky</GoBackLink>
                    </div>

                    {recentlySuccessful && <p className="text-green-500">Client information has been updated!</p>}
                </div>
            </form>
        </section>
    )
}
