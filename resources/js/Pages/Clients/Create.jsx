import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import { useForm, Link } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import {
    TrashIcon,
    EyeIcon,
    PlusIcon,
    ChevronRightIcon,
    ArchiveBoxIcon,
    XMarkIcon,
    UsersIcon,
} from "@heroicons/react/24/outline";
export default function Dashboard({
    auth,
    repositories
}) {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        phone: "",
        ico: "",
        repositories: [],
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("clients.store"));
    };

    const handleRepositories = (repositoryId) => {
        if (data.repositories.includes(repositoryId)) {
            setData("repositories", data.repositories.filter((id) => id !== repositoryId));
        } else {
            setData("repositories", [...data.repositories, repositoryId]);
        }
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <header className="flex items-center justify-start flex-row space-x-4 text-zinc-500">
                    <Link
                        className="font-semibold text-lg leading-tight hover:text-sky-500 slower-animation"
                        href={route("dashboard.index")}
                    >
                        Dashboard
                    </Link>

                    <span>
                        <ChevronRightIcon className="size-5" />
                    </span>

                    <Link
                        className="font-semibold text-lg leading-tight hover:text-sky-500 slower-animation"
                        href={route("clients.index")}
                    >
                        Klienti
                    </Link>

                    <span>
                        <ChevronRightIcon className="size-5" />
                    </span>

                    <Link
                        className="font-semibold text-lg leading-tight text-sky-500 slower-animation"
                        href={route("clients.create")}
                    >
                        Vytvořit
                    </Link>

                </header>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-[90rem] mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-10 bg-zinc-900 sm:rounded-xl">

                        <header>
                            <h1 className="text-center text-xl font-bold text-gray-200">
                                Vytvořit klienta
                            </h1>
                        </header>

                        <form
                            onSubmit={submit}
                            className="mt-6 grid grid-cols-12 gap-10 items-start"
                        >
                            <div className="col-span-7 flex flex-col space-y-4 border-2 border-zinc-700 bg-zinc-800 p-5 rounded-lg">
                                <div>
                                    <InputLabel
                                        isRequired
                                        htmlFor="name"
                                        value="name"
                                    />

                                    <TextInput
                                        id="name"
                                        type="text"
                                        name="name"
                                        placeholder="Tomáš Ludwig"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData("name", e.target.value)}
                                    />

                                    <InputError
                                        message={errors.name}
                                        htmlFor="name"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="email"
                                        value="email"
                                    />

                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        placeholder="info@ludwigtomas.cz"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData("email", e.target.value)}
                                    />

                                    <InputError
                                        message={errors.email}
                                        htmlFor="email"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="phone"
                                        value="phone"
                                    />

                                    <TextInput
                                        id="phone"
                                        type="text"
                                        name="phone"
                                        placeholder="+420 730 681 670"
                                        value={data.phone}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData("phone", e.target.value)}
                                    />

                                    <InputError
                                        message={errors.phone}
                                        htmlFor="phone"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="ico"
                                        value="ico"
                                    />

                                    <TextInput
                                        id="ico"
                                        type="text"
                                        name="ico"
                                        placeholder="19090901"
                                        value={data.ico}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData("ico", e.target.value)}
                                    />

                                    <InputError
                                        message={errors.ico}
                                        htmlFor="ico"
                                    />
                                </div>
                            </div>

                            <div className="col-span-5 h-[23.1rem] overflow-y-auto pr-4">
                                <div className="flex flex-col space-y-2">
                                    {repositories.map((repository) => (
                                        <div
                                            className={'flex items-center justify-between rounded-lg p-4 border-2 bg-zinc-800' +
                                            (data.repositories.includes(repository.id) ? ' border-green-700' : ' border-zinc-700')}
                                            key={repository.id}
                                        >
                                            <div className="flex items-center space-x-4">
                                                <div className="flex items-center justify-center w-12 h-12 bg-zinc-700 rounded-lg">
                                                    <ArchiveBoxIcon className="size-6 text-sky-500" />
                                                </div>

                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-100">
                                                        {repository.name}
                                                    </h3>

                                                    <p className="mt-1 text-sm text-gray-400">
                                                        {repository.email}
                                                    </p>
                                                </div>
                                            </div>
                                            { data.repositories.includes(repository.id) ? (
                                                <button
                                                    type="button"
                                                    onClick={() => handleRepositories(repository.id)}
                                                    className="group inline-flex items-center text-sm bg-zinc-900 px-3 py-2 rounded-md hover:bg-red-500 faster-animation"
                                                >
                                                    <XMarkIcon className="size-8 text-red-500 group-hover:text-red-100"/>
                                                </button>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={() => handleRepositories(repository.id)}
                                                    className="group inline-flex items-center text-sm bg-zinc-900 px-3 py-2 rounded-md hover:bg-green-500 faster-animation"
                                                >
                                                    <PlusIcon className="size-8 text-green-500 group-hover:text-green-100"/>
                                                </button>
                                            )}
                                        </div>
                                    ))}

                                    <InputError
                                        message={errors.repositories}
                                        htmlFor="ico"
                                    />
                                </div>
                            </div>

                            <div className="col-span-12">
                                <PrimaryButton
                                    typeOfButton='submit'
                                    disabled={processing}
                                >
                                    <UsersIcon className="size-6 mr-4"/>
                                    Vytvořit
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
