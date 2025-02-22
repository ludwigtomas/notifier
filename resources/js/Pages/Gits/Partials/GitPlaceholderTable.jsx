export default function GitPlaceholderTable() {
    return (
        <div className="overflow-hidden rounded-xl border-2 border-sky-700 p-4">
            <div className="flex animate-pulse items-center space-x-4">
                <div className="flex-1 space-y-6 py-1">
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-1 h-2 rounded bg-sky-800" />
                        <div className="col-span-4 h-2 rounded bg-sky-800" />
                        <div className="col-span-5 h-2 rounded bg-sky-800" />
                        <div className="col-span-1 h-2 rounded bg-sky-800" />
                        <div className="col-span-1 h-2 rounded bg-sky-800" />
                    </div>
                </div>
            </div>
        </div>
    )
}
