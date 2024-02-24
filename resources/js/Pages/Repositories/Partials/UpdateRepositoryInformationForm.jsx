import { Link, useForm, usePage } from "@inertiajs/react";
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { ClockIcon } from "@heroicons/react/24/outline";
import Dropdown from "@/Components/Dropdown";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function UpdateRepositoryInformationForm({repository, className = ''}) {

    const { data, setData, put, errors, processing, recentlySuccessful } = useForm({
        analytics_property_id: repository.analytics_property_id ?? '',
        website_url: repository.website_url ?? '',
        repository_url: repository.repository_url ?? '',
        last_commit_at: repository.last_commit_at ?? '',
    });

    const submit = (e) => {
        e.preventDefault();

        put(route('repositories.update', repository.id));
    };

    return (
        <section className={className}>
            {/* HEADER */}
            <header>
                <h1 className="text-center text-2xl font-bold text-gray-200">
                    {repository.name}
                </h1>

                <h2 className="text-lg font-medium text-gray-100">
                    Repository edit
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                    Update your repository's information.
                </p>
            </header>

            {/* FORM */}
            <form
                onSubmit={submit}
                className="mt-6 grid grid-cols-12 gap-5 items-start"
            >
                <div className="col-span-12 border-2 border-zinc-700 bg-zinc-800 p-5 rounded-lg">
                    <div className="grid grid-cols-4">
                        <div className="flex flex-col items-center justify-center space-y-2">
                            <div>
                                <ClockIcon className="w-7 h-7 text-sky-500" />
                            </div>

                            <div className="text-center">
                                <p className="text-white">
                                    Vytvořeno
                                </p>

                                <p className="flex items-start -mx-2">
                                    <span className="mx-2 text-gray-700 truncate w-72 dark:text-gray-400">
                                        {repository.created_at_human}
                                    </span>
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-center space-y-2">
                            <div>
                                <ClockIcon className="w-7 h-7 text-sky-500" />
                            </div>

                            <div className="text-center">
                                <p className="text-white">
                                    Aktualizováno
                                </p>

                                <p className="flex items-start -mx-2">
                                    <span className="mx-2 text-gray-700 truncate w-72 dark:text-gray-400">
                                        {repository.updated_at_human}
                                    </span>
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-center space-y-2">
                            <div>
                                <ClockIcon className="w-7 h-7 text-sky-500" />
                            </div>

                            <div className="text-center">
                                <p className="text-white">
                                    Repozitář vytvořen
                                </p>

                                <p className="flex items-start -mx-2">
                                    <span className="mx-2 text-gray-700 truncate w-72 dark:text-gray-400">
                                        {repository.repository_created_at_human}
                                    </span>
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-center space-y-2">
                            <div>
                                <ClockIcon className="w-7 h-7 text-sky-500" />
                            </div>

                            <div className="text-center">
                                <p className="text-white">
                                    last_commit_at
                                </p>

                                <p className="flex items-start -mx-2">
                                    <span className="mx-2 text-gray-700 truncate w-72 dark:text-gray-400">
                                        {repository.last_commit_at_human}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-span-6 space-y-6 border-2 border-zinc-700 bg-zinc-800 p-5 rounded-lg">
                    <div>
                        <InputLabel
                            htmlFor="analytics_property_id"
                            value="Google Analytics"
                        />

                        <TextInput
                            type="number"
                            id="analytics_property_id"
                            className="mt-1 block w-full"
                            placeholder="google analytics"
                            value={data.analytics_property_id}
                            onChange={(e) => setData('analytics_property_id', e.target.value)}
                        />

                        <InputError
                            className="mt-2"
                            message={errors.analytics_property_id}
                        />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="website_url"
                            value="website_url"
                        />

                        <TextInput
                            type="url"
                            id="website_url"
                            className="mt-1 block w-full"
                            placeholder="https://ludwigtomas.cz/"
                            value={data.website_url}
                            onChange={(e) => setData('website_url', e.target.value)}
                        />

                        <InputError
                            className="mt-2"
                            message={errors.website_url}
                        />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="repository_url"
                            value="repository_url"
                        />

                        <TextInput
                            type="url"
                            id="repository_url"
                            className="mt-1 block w-full"
                            placeholder="https://gitlab.com/bubak1/portfolio/the-notifier"
                            value={data.repository_url}
                            onChange={(e) => setData('repository_url', e.target.value)}
                        />

                        <InputError
                            className="mt-2"
                            message={errors.repository_url}
                        />
                    </div>

                    <div className="space-y-6 border-2 border-zinc-700 bg-zinc-800 p-5 rounded-lg">
                        <div>
                            <InputLabel
                                htmlFor="last_commit_at"
                                value="Nejnovější commit"
                            />

                            <input
                                type="datetime-local"
                                id="last_commit_at"
                                className="mt-1 block w-full"
                                value={data.last_commit_at}
                                onChange={(e) => setData('last_commit_at', e.target.value)}
                            />

                            <InputError
                                className="mt-2"
                                message={errors.last_commit_at}
                            />
                        </div>
                    </div>
                </div>

                <div className="col-span-6 space-y-5 ">
                    <div className="border-2 border-zinc-700 bg-zinc-800 p-5 rounded-lg">
                        <div className="grid grid-cols-1 gap-y-4">

                            <div>
                                <InputLabel
                                    htmlFor="id"
                                    value="ID repozitáře"
                                />

                                <TextInput
                                    id="id"
                                    className="mt-1 block w-full cursor-not-allowed bg-zinc-500/20"
                                    disabled
                                    placeholder="52740614"
                                    value={repository.id}
                                />
                            </div>

                            <div>
                                <InputLabel
                                    disabled
                                    htmlFor="name"
                                    value="Název"
                                />

                                <TextInput
                                    id="name"
                                    className="mt-1 block w-full cursor-not-allowed bg-zinc-500/20"
                                    disabled
                                    placeholder="Ludwig Tomas"
                                    value={repository.name}
                                />
                            </div>


                            <div>
                                <InputLabel
                                    htmlFor="slug"
                                    value="slug"
                                />

                                <TextInput
                                    id="slug"
                                    className="mt-1 block w-full cursor-not-allowed bg-zinc-500/20"
                                    disabled
                                    placeholder="ludwig-tomas"
                                    value={repository.slug}
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="database_verification_code"
                                    value="database_verification_code"
                                />

                                <TextInput
                                    id="database_verification_code"
                                    className="mt-1 block w-full cursor-not-allowed bg-zinc-500/20"
                                    disabled
                                    placeholder="ac8185c8-01cb-4e30-9639-870000000000"
                                    value={repository.database_verification_code}
                                />
                            </div>

                        </div>
                    </div>
                </div>

                <div className="col-span-12 flex items-center space-x-4">
                    <div>
                        <PrimaryButton
                            typeOfButton="submit"
                            className="w-full"
                            disabled={processing}
                        >
                            Update
                        </PrimaryButton>
                    </div>

                    {recentlySuccessful && (
                        <p className="text-green-500">
                            Repository information has been updated!
                        </p>
                    )}

                    <div>
                        <Link
                            href={route('repositories.index')}
                            className="inline-flex items-center px-4 py-2 bg-gray-400 border border-transparent rounded-md font-bold text-xs text-white uppercase tracking-widest hover:bg-gray-300 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                        >
                            <span className="text-gray-800">
                                Zpátky
                            </span>
                        </Link>
                    </div>
                </div>
            </form>

            {/* Another options */}
            <div className="fixed right-10 bottom-10">
                <Dropdown>
                    <Dropdown.Trigger>
                        <div className="flex items-center space-x-2">
                            <div className="group inline-flex rounded-xl bg-sky-500 ">
                                <button
                                    type="button"
                                    className="px-6 py-3 rounded-md focus:outline-none"
                                >
                                    <span className="leading-4 font-medium text-white text-lg group-hover:text-sky-100 transition ease-in-out duration-150">
                                        Další možnosti
                                    </span>
                                </button>
                            </div>
                        </div>
                    </Dropdown.Trigger>

                    <Dropdown.Content direction="up">
                        <h3 className="text-center text-white font-bold uppercase p-2 mb-2 px border-b border-zinc-800">
                            Odeslání emailu
                        </h3>

                        <button
                            className="flex items-center w-full px-4 py-2 text-start text-sm leading-5 text-zinc-400 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out hover:bg-zinc-800 border-l-4 border-transparent hover:border-green-500 hover:text-green-500"
                        >
                            Last Commit
                        </button>

                        <button
                            className="flex items-center w-full px-4 py-2 text-start text-sm leading-5 text-zinc-400 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out hover:bg-zinc-800 border-l-4 border-transparent hover:border-green-500 hover:text-green-500"
                        >
                            Google analytics

                        </button>

                    </Dropdown.Content>
                </Dropdown>

            </div>

        </section>
    );
}
