export default function GitPlaceholderTable() {
    return (
        <div className="border-2 border-sky-700 rounded-xl overflow-hidden p-4">
            <div className="animate-pulse flex items-center space-x-4">
                <div className="flex-1 space-y-6 py-1">
                    <div className="grid grid-cols-12 gap-4">
                        <div className="h-2 bg-sky-800 rounded col-span-1"/>
                        <div className="h-2 bg-sky-800 rounded col-span-4"/>
                        <div className="h-2 bg-sky-800 rounded col-span-5"/>
                        <div className="h-2 bg-sky-800 rounded col-span-1"/>
                        <div className="h-2 bg-sky-800 rounded col-span-1"/>
                    </div>
                </div>
            </div>
        </div>
    );
}
