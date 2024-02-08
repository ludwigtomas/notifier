import { Link, useForm, usePage } from "@inertiajs/react";
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { ClockIcon } from "@heroicons/react/24/outline";

export default function UpdateRepositoryInformationForm({repository, className = "" }) {

    const { data, setData, put, errors, processing, recentlySuccessful } = useForm({
        name: repository.name,
        slug: repository.slug,
        website_url: repository.website_url,
        repository_url: repository.repository_url,
        description: repository.description,

        database_verification_code: repository.database_verification_code,
        last_commit_at: repository.last_commit_at,
        repository_created_at: repository.repository_created_at,

        updated_at: repository.updated_at,
        created_at: repository.created_at,
    });

    const submit = (e) => {
        e.preventDefault();

        put(route('repositories.update', repository.id));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-100">
                    Repository Information
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                    Update your repository's information.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 grid grid-cols-12 gap-5">
                <div className="col-span-7 space-y-6 border-2 border-zinc-700 bg-zinc-800 p-5 rounded-lg">
                    <div>
                        <InputLabel
                            isRequired={true}
                            htmlFor="name"
                            value="Name"
                        />

                        <TextInput
                            id="name"
                            className="mt-1 block w-full"
                            placeholder="Ludwig Tomas"
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
                            htmlFor="slug"
                            value="slug"
                        />

                        <TextInput
                            id="slug"
                            className="mt-1 block w-full cursor-not-allowed bg-zinc-800"
                            disabled
                            placeholder="ludwig-tomas"
                            value={data.slug}
                            onChange={(e) => setData('slug', e.target.value)}
                        />

                        <InputError
                            className="mt-2"
                            message={errors.slug}
                        />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="database_verification_code"
                            value="database_verification_code"
                        />

                        <TextInput
                            id="database_verification_code"
                            className="mt-1 block w-full cursor-not-allowed bg-zinc-800"
                            disabled
                            placeholder="ac8185c8-01cb-4e30-9639-870000000000"
                            value={data.database_verification_code}
                            onChange={(e) => setData('database_verification_code', e.target.value)}
                        />

                        <InputError
                            className="mt-2"
                            message={errors.database_verification_code}
                        />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="website_url"
                            value="website_url"
                        />

                        <TextInput
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
                            isRequired={true}
                            htmlFor="repository_url"
                            value="repository_url"
                        />

                        <TextInput
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
                </div>

                <div className="col-span-5 space-y-5 ">
                    <div className="border-2 border-zinc-700 bg-zinc-800 p-5 rounded-lg">
                        <div class="grid grid-cols-3 ">
                            <div className="flex flex-col items-center justify-center space-y-2">
                                <div>
                                    <ClockIcon className="w-7 h-7 text-sky-500" />
                                </div>

                                <div className="text-center">
                                    <p class="text-white">
                                        Vytvořeno
                                    </p>

                                    <p class="flex items-start -mx-2">
                                        <span class="mx-2 text-gray-700 truncate w-72 dark:text-gray-400">
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
                                    <p class="text-white">
                                        Aktualizováno
                                    </p>

                                    <p class="flex items-start -mx-2">
                                        <span class="mx-2 text-gray-700 truncate w-72 dark:text-gray-400">
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
                                    <p class="text-white">
                                        Repoziář vytvořen
                                    </p>

                                    <p class="flex items-start -mx-2">
                                        <span class="mx-2 text-gray-700 truncate w-72 dark:text-gray-400">
                                            {repository.repository_created_at_human}
                                        </span>
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="space-y-6 border-2 border-zinc-700 bg-zinc-800 p-5 rounded-lg">
                        <div>
                            <InputLabel
                                htmlFor="last_commit_at"
                                value="last_commit_at"
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

                <div className="col-span-12 flex items-center space-x-4">
                    <div>
                        <PrimaryButton
                            className="w-full"
                            processing={processing}
                        >
                            Update repository
                        </PrimaryButton>
                    </div>

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
        </section>
    );
}
