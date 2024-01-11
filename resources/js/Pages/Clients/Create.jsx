import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import { useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Dashboard({ auth, repositories }) {
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

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">

                            <form
                                onSubmit={submit}
                                className="grid grid-cols-12"
                            >
                                <div className="col-span-8">
                                    <div>
                                        <InputLabel
                                            htmlFor="name"
                                            value="name"
                                        />

                                        <TextInput
                                            id="name"
                                            type="text"
                                            name="name"
                                            value={data.name}
                                            autoComplete="name"
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
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
                                            value={data.email}
                                            autoComplete="email"
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
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
                                            value={data.phone}
                                            autoComplete="phone"
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData("phone", e.target.value)
                                            }
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
                                            value={data.ico}
                                            autoComplete="given-name"
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData("ico", e.target.value)
                                            }
                                        />

                                        <InputError
                                            message={errors.ico}
                                            htmlFor="ico"
                                        />
                                    </div>
                                </div>

                                <div className="col-span-4">
                                    <div>
                                        <InputLabel
                                            htmlFor="repositories"
                                            value="repositories"
                                        />

                                        {repositories.map((repository) => (
                                            <div
                                                className="flex items-center gap-x-2"
                                                key={repository.id}
                                            >
                                                <input
                                                    type="checkbox"
                                                    value={repository.id}
                                                    onChange={(e) => {
                                                        const repositoryId = e.target.value;

                                                        if (e.target.checked) {
                                                            setData("repositories", [ ...data.repositories, repositoryId,]
                                                            );
                                                        } else {
                                                            setData("repositories", data.repositories.filter((id) => id !== repositoryId)
                                                            );
                                                        }


                                                    }}
                                                />
                                                <p>{repository.name}</p>
                                            </div>
                                        ))}

                                        <InputError
                                            message={errors.repositories}
                                            htmlFor="repositories"
                                        />
                                    </div>
                                </div>

                                <div className="col-span-12 mt-5 ">
                                    <PrimaryButton disabled={processing}>
                                        ADD
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
