import AdminLayout from '@/Layouts/AdminLayout'
import { Head, Link, router, useForm } from '@inertiajs/react'
import TextInput from '@/Components/TextInput'
import InputLabel from '@/Components/InputLabel'
import InputError from '@/Components/InputError'
import {
    PencilSquareIcon,
    TrashIcon,
    EyeIcon,
    PlusIcon,
    CheckIcon,
    XMarkIcon,
    ChevronRightIcon,
    ServerStackIcon,
    ArchiveBoxArrowDownIcon,
} from '@heroicons/react/24/outline'
import PrimaryButton from '@/Components/PrimaryButton'

export default function Index({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        hosting_url: '',
        repositories: [],
    })

    const submit = (e) => {
        e.preventDefault()

        post(route('hostings.store'))
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
                        href={route('hostings.index')}
                    >
                        Hostingy
                    </Link>

                    <span>
                        <ChevronRightIcon className="size-5" />
                    </span>

                    <Link
                        className="slower-animation text-lg leading-tight font-semibold text-sky-500"
                        href={route('hostings.create')}
                    >
                        Vytvořit
                    </Link>
                </header>
            }
        >
            <Head title="Dashboard" />

            <div className="mx-auto max-w-[90rem] space-y-6 sm:px-6 lg:px-8">
                <div className="bg-zinc-900 p-10 sm:rounded-xl">
                    <header>
                        <h1 className="text-center text-xl font-bold text-gray-200">Vytvořit Hosting</h1>
                    </header>

                    <form
                        onSubmit={submit}
                        className="mt-6 grid grid-cols-12 items-start gap-10"
                    >
                        <div className="col-span-7 flex flex-col space-y-4 rounded-lg border-2 border-zinc-700 bg-zinc-800 p-5">
                            <div>
                                <InputLabel
                                    isRequired
                                    htmlFor="name"
                                    value="Název"
                                />

                                <TextInput
                                    id="name"
                                    type="text"
                                    name="name"
                                    placeholder="Bohemia Cloud"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('name', e.target.value)}
                                />

                                <InputError
                                    message={errors.name}
                                    htmlFor="name"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="hosting_url"
                                    value="URL"
                                />

                                <TextInput
                                    id="hosting_url"
                                    type="text"
                                    name="hosting_url"
                                    placeholder="www.bohemia-cloud.cz"
                                    value={data.hosting_url}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('hosting_url', e.target.value)}
                                />

                                <InputError
                                    message={errors.hosting_url}
                                    htmlFor="hosting_url"
                                />
                            </div>
                        </div>

                        <div className="col-span-12">
                            <PrimaryButton
                                typeOfButton="submit"
                                disabled={processing}
                            >
                                <ServerStackIcon className="mr-4 size-6" />
                                Vytvořit
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    )
}
