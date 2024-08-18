import Breadcrumbs from "@/Components/Breadcrumbs";
import Navbar from "@/Components/Navbar";

export default function Authenticated({ user, children }) {
    return (
        <main className="flex flex-row items-start justify-start min-h-screen">

            <Navbar user={user} />

            <section className="w-full">
                <Breadcrumbs/>

                <div className="max-w-[100rem] py-8 mx-auto">
                    {children}
                </div>
            </section>
        </main>
    );
}
