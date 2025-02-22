import { Link, useForm, usePage } from '@inertiajs/react'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import { BackButton, EditButton } from '@/Components/Buttons/ActionButtons'

export default function ({ git, className = '' }) {
    const { data, setData, put, errors, processing, recentlySuccessful } = useForm({
        name: git.name ?? '',
        api_token: git.api_token ?? '',

        username: git.username ?? '',
        user_id: git.user_id ?? '',
        user_avatar_url: git.user_avatar_url ?? '',
    })

    const submit = (e) => {
        e.preventDefault()

        put(route('gits.update', git.id), {
            preserveScroll: true,
        })
    }

    return (
        <section className={className}>
            <header>
                <h1 className="text-center text-2xl font-bold text-zinc-200">{git.name}</h1>

                <h2 className="text-lg font-medium text-zinc-100">Git edit</h2>

                <p className="mt-1 text-sm text-zinc-400">Update your git information.</p>
            </header>

            <form
                onSubmit={submit}
                className="mt-6 grid grid-cols-12 items-start gap-5"
            >
                <div className="col-span-12 mr-auto w-5/12">
                    <InputLabel
                        htmlFor="name"
                        value="Name"
                    />

                    <TextInput
                        type="text"
                        id="name"
                        className="mt-1 block w-full"
                        placeholder="Name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                    />

                    <InputError
                        className="mt-2"
                        message={errors.name}
                    />
                </div>

                <div className="col-span-12 mr-auto w-5/12">
                    <InputLabel
                        htmlFor="api_token"
                        value="API Token"
                    />

                    <TextInput
                        type="text"
                        id="api_token"
                        className="mt-1 block w-full"
                        placeholder="API Token"
                        value={data.api_token}
                        onChange={(e) => setData('api_token', e.target.value)}
                    />

                    <InputError
                        className="mt-2"
                        message={errors.api_token}
                    />
                </div>

                <div className="col-span-12 mr-auto w-5/12">
                    <InputLabel
                        htmlFor="username"
                        value="Username"
                    />

                    <TextInput
                        type="text"
                        id="username"
                        className="mt-1 block w-full"
                        placeholder="Username"
                        value={data.username}
                        onChange={(e) => setData('username', e.target.value)}
                    />

                    <InputError
                        className="mt-2"
                        message={errors.username}
                    />
                </div>

                <div className="col-span-12 mr-auto w-5/12">
                    <InputLabel
                        htmlFor="user_id"
                        value="User ID"
                    />

                    <TextInput
                        type="number"
                        id="user_id"
                        className="mt-1 block w-full"
                        placeholder="User ID"
                        value={data.user_id}
                        onChange={(e) => setData('user_id', e.target.value)}
                    />

                    <InputError
                        className="mt-2"
                        message={errors.user_id}
                    />
                </div>

                <div className="col-span-12 flex items-center space-x-4">
                    <div>
                        <BackButton
                            href={route('gits.index')}
                            className="w-full"
                        >
                            Zpátky
                        </BackButton>
                    </div>

                    <div>
                        <PrimaryButton
                            typeOfButton="submit"
                            className="w-full"
                            disabled={processing}
                        >
                            Update
                        </PrimaryButton>
                    </div>

                    {recentlySuccessful && <p className="text-green-500">Repository information has been updated!</p>}
                </div>
            </form>
        </section>
    )
}
