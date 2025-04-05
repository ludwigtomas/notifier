import AdminLayout from '@/Layouts/AdminLayout'
import { Head } from '@inertiajs/react'

export default function Create({ auth }) {
    return (
        <AdminLayout
            user={auth.user}
            header={<h2 className="text-xl leading-tight font-semibold text-gray-800">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">projects</div>
                </div>
            </div>
        </AdminLayout>
    )
}
