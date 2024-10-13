export default function GitPlaceholderTable() {
    return (
        <div class="border-2 border-sky-700 rounded-xl overflow-hidden p-4">
            <div class="animate-pulse flex items-center space-x-4">
                <div class="flex-1 space-y-6 py-1">
                    <div class="grid grid-cols-12 gap-4">
                        <div class="h-2 bg-sky-800 rounded col-span-1"/>
                        <div class="h-2 bg-sky-800 rounded col-span-4"/>
                        <div class="h-2 bg-sky-800 rounded col-span-5"/>
                        <div class="h-2 bg-sky-800 rounded col-span-1"/>
                        <div class="h-2 bg-sky-800 rounded col-span-1"/>
                    </div>
                </div>
            </div>
        </div>
    );
}
