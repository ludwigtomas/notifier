import { Link, useForm, usePage } from '@inertiajs/react'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import { BackButton, EditButton, ActionButton } from '@/Components/Buttons/ActionButtons'

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
                <h2 className="text-lg font-medium text-zinc-100">{git.name}</h2>

                <p className="mt-1 text-sm text-zinc-400">Update your git information.</p>
            </header>

            <form
                onSubmit={submit}
                className="mt-6 grid grid-cols-1 items-start gap-5"
            >
                <div className="col-span-full xl:mr-auto xl:w-5/12">
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

                <div className="col-span-full xl:mr-auto xl:w-5/12">
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

                <div className="col-span-full xl:mr-auto xl:w-5/12">
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

                <div className="col-span-full xl:mr-auto xl:w-5/12">
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

                <div className="col-span-full xl:mr-auto xl:w-5/12">
                    <InputLabel
                        htmlFor="user_avatar_url"
                        value="User Avatar URL"
                    />

                    <TextInput
                        id="user_avatar_url"
                        className="mt-1 block w-full"
                        placeholder="User Avatar URL"
                        value={data.user_avatar_url}
                        onChange={(e) => setData('user_avatar_url', e.target.value)}
                    />

                    <InputError
                        className="mt-2"
                        message={errors.user_avatar_url}
                    />
                </div>

                <div className="flex items-center space-x-2">
                    <ActionButton
                        elementType="link"
                        elementAction="back"
                        href={route('gits.index')}
                    >
                        Zpátky
                    </ActionButton>

                    <ActionButton
                        elementType="button"
                        elementAction="update"
                        type="submit"
                        disabled={processing}
                    >
                        Uložit
                    </ActionButton>

                    {recentlySuccessful && <p className="text-green-500">Git information has been updated!</p>}
                </div>
            </form>
        </section>
    )
}
