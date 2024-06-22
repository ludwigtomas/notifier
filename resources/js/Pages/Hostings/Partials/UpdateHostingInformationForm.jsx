import { useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GoBackLink from "@/Components/GoBackLink";

export default function UpdateHostingInformationForm({
    hosting,
    className = "",
}) {
    const { data, setData, put, errors, processing, recentlySuccessful } =
        useForm({
            name: hosting.name,
            hosting_url: hosting.hosting_url ?? "",
        });

    const submit = (e) => {
        e.preventDefault();

        put(route("hostings.update", hosting.id), {
            preserveScroll: true,
        });
    };

    return (
        <section className={className}>
            <header>
                <h1 className="text-center text-xl font-bold text-gray-200">
                    {hosting.name}
                </h1>

                <h2 className="text-lg font-medium text-gray-100">
                    Hosting edit
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                    Update your hosting's information.
                </p>
            </header>

            <form
                onSubmit={submit}
                className="mt-6 w-6/12"
            >
                <div className="space-y-6 border-2 border-zinc-700 bg-zinc-800 p-5 rounded-lg">
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
                            className="mt-1 block w-full"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                        />

                        <InputError message={errors.name} htmlFor="name" />
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
                            className="mt-1 block w-full"
                            value={data.hosting_url}
                            onChange={(e) => setData("hosting_url", e.target.value)}
                        />

                        <InputError
                            message={errors.hosting_url}
                            htmlFor="hosting_url"
                        />
                    </div>
                </div>

                <div className="mt-6 col-span-12 flex items-center space-x-4">
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
                        <GoBackLink
                            href={route('hostings.index')}
                        >
                            Zpátky
                        </GoBackLink>
                    </div>

                    {recentlySuccessful && (
                        <p className="text-green-500">
                            Hosting information has been updated!
                        </p>
                    )}
                </div>
            </form>
        </section>
    );
}
