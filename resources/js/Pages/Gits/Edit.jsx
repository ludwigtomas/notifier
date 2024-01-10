import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";

export default function Dashboard({ auth, git: initialGit }) {
    const [git, setGit] = useState({ name: initialGit.name });
    const [newName, setNewName] = useState("");

    const handleInputChange = (event) => {
        setNewName(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        if (!newName) return null;
        console.log(git.name);
        setGit({ ...git, name: newName });
        setNewName("");
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
                            <p className="ml-0.5">{git.name}</p>
                            <div>
                                <form onSubmit={handleFormSubmit}>
                                    <input
                                        type="text"
                                        value={newName}
                                        onChange={handleInputChange}
                                        placeholder="Enter new name"
                                    />
                                    <button type="submit" className="ml-4">
                                        Update Name
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
