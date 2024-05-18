import { Link, useForm, usePage } from "@inertiajs/react";
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import GoBackLink from '@/Components/GoBackLink';
import TextInput from '@/Components/TextInput';
import { ClockIcon, LinkIcon } from "@heroicons/react/24/outline";

export default function UpdateRepositoryInformationForm({repository, className = ''}) {

    const { data, setData, put, errors, processing, recentlySuccessful } = useForm({
        analytics_property_id: repository.analytics_property_id ?? '',
        website_url: repository.website_url ?? '',
        repository_url: repository.repository_url ?? '',
        last_commit_at: repository.last_commit_at ?? '',
    });

    const submit = (e) => {
        e.preventDefault();

        put(route('repositories.update', repository.repository_id), {
            preserveScroll: true,
        });
    };

    return (
        <section className={className}>
            {/* HEADER */}
            <header>
                <h1 className="text-center text-2xl font-bold text-zinc-200">
                    {repository.name}
                </h1>

                <h2 className="text-lg font-medium text-zinc-100">
                    Repository edit
                </h2>

                <p className="mt-1 text-sm text-zinc-400">
                    Update your repository's information.
                </p>
            </header>

            {/* FORM */}
            <form
                onSubmit={submit}
                className="mt-6 grid grid-cols-12 gap-5 items-start"
            >
                <div className="col-span-12 border-2 border-zinc-700 bg-zinc-800 p-5 rounded-lg">
                    <div className="grid grid-cols-4 divide-x divide-zinc-600">
                        <div className="flex flex-col items-center justify-center space-y-2">
                            <div>
                                <ClockIcon className="w-7 h-7 text-sky-500" />
                            </div>

                            <div className="text-center">
                                <p className="text-white">
                                    Přidáno (sem)
                                </p>

                                <p className="flex items-start -mx-2">
                                    <span className="mx-2 text-zinc-400 truncate w-72">
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
                                    <span className="mx-2 text-zinc-400 truncate w-72">
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
                                    <span className="mx-2 text-zinc-400 truncate w-72">
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
                                    Nejnovější commit
                                </p>

                                <p className="flex items-start -mx-2">
                                    <span className="mx-2 text-zinc-400 truncate w-72">
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
                            value="Website URL"
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
                            value="Repository URL"
                        />

                        <div className="flex items-center mt-1">
                            <a
                                href={data.repository_url}
                                target="_blank"
                                className="py-2 px-3 text-zinc-500 bg-zinc-900 border-2 border-zinc-600 border-r-0 rounded-l-lg"
                            >
                                <LinkIcon className="w-6 h-6 text-zinc-400"/>
                            </a>

                            <input
                                type="text"
                                placeholder="ludwigtomas.cz"
                                className="block w-full rounded-l-none placeholder-zinc-400/70 px-3 py-2 bg-zinc-700 border-2 border-zinc-500 focus:border-sky-500 focus:ring-sky-500 text-zinc-200 rounded-md shadow-sm"
                                value={data.repository_url}
                                onChange={(e) => setData('repository_url', e.target.value)}
                            />
                        </div>

                        <InputError
                            className="mt-2"
                            message={errors.repository_url}
                        />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="last_commit_at"
                            value="Nejnovější commit"
                        />

                        <input
                            type="datetime-local"
                            id="last_commit_at"
                            className="mt-1 block w-full bg-zinc-700 border-2 border-zinc-500 focus:border-sky-500 focus:ring-sky-500 text-zinc-200 rounded-md shadow-sm"
                            value={data.last_commit_at}
                            onChange={(e) => setData('last_commit_at', e.target.value)}
                        />

                        <InputError
                            className="mt-2"
                            message={errors.last_commit_at}
                        />
                    </div>
                </div>

                <div className="col-span-6 space-y-6 border-2 border-zinc-700 bg-zinc-800 p-5 rounded-lg">
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
                            defaultValue={repository.repository_id}
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
                            defaultValue={repository.name}
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
                            defaultValue={repository.slug}
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
                            defaultValue={repository.database_verification_code}
                        />
                    </div>
                </div>

                <div className="col-span-12 flex items-center space-x-4">
                    <div>
                        <GoBackLink
                            href={route('repositories.index')}
                            className="w-full"
                        >
                            Zpátky
                        </GoBackLink>
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

                    {recentlySuccessful && (
                        <p className="text-green-500">
                            Repository information has been updated!
                        </p>
                    )}
                </div>
            </form>
        </section>
    );
}
