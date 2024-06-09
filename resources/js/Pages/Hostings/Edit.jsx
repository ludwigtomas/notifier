import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
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
} from "@heroicons/react/24/outline";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Index({ auth, hosting }) {

    const { data, setData, put, processing, errors, recentlySuccessful } = useForm({
        name: hosting.name,
        hosting_url: hosting.hosting_url ?? "",
        repositories: [],
    });

    const submit = (e) => {
        e.preventDefault();

        put(route("hostings.update", hosting.id));
    };


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
                        href={route("hostings.index")}
                    >
                        Hostingy
                    </Link>

                    <span>
                        <ChevronRightIcon className="size-5" />
                    </span>

                    <Link
                        className="font-semibold text-lg leading-tight text-sky-500 slower-animation"
                        href={route("hostings.edit", hosting.id)}
                    >
                        { hosting.name }
                    </Link>

                    <span>
                        <ChevronRightIcon className="size-5" />
                    </span>

                    <Link
                        className="font-semibold text-lg leading-tight text-sky-500 slower-animation"
                        href={route("hostings.edit", hosting.id)}
                    >
                        Edit
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
                            {hosting.name}
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
                                    value="Název"
                                />

                                <TextInput
                                    id="name"
                                    type="text"
                                    name="name"
                                    placeholder="Bohemia Cloud"
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
                                    onChange={(e) => setData("hosting_url", e.target.value)}
                                />

                                <InputError
                                    message={errors.hosting_url}
                                    htmlFor="hosting_url"
                                />
                            </div>
                        </div>

                        <div className="mt-6 col-span-12 flex items-center space-x-4">
                            <PrimaryButton
                                typeOfButton='submit'
                                disabled={processing}
                            >
                                <ServerStackIcon className="size-6 mr-4"/>

                                Aktualizovat
                            </PrimaryButton>

                            {recentlySuccessful && (
                                <p className="text-green-500">
                                    Repository information has been updated!
                                </p>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>

        </AuthenticatedLayout>
    );
}
