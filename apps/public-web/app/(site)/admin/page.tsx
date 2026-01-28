import Link from "next/link";

export default function AdminPage() {
    const backend = process.env.BACKEND_URL ?? "http://localhost:8080";

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex gap-10 p-8 font-sans text-slate-900">
            {/* 1. SINGLE CLEAN SIDEBAR */}
            <aside className="w-64 bg-white border border-slate-200 rounded-2xl flex flex-col sticky top-8 h-[calc(100vh-4rem)]">
                <div className="p-8 mb-4">
                    <div className="text-2xl font-black tracking-tighter text-indigo-600"></div>
                </div>

                <div className="flex-1" />

                {/* SINGLE LOGOUT AT BOTTOM */}
                <div className="p-4 border-t border-slate-100">
                    <form action={`${backend}/logout`} method="post">
                        <button className="w-full flex items-center justify-center gap-2 px-4 py-3 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all rounded-lg text-sm font-bold uppercase tracking-wider">
                            ⏻ Logout
                        </button>
                    </form>
                </div>
            </aside>

            {/* 2. MAIN CONTENT AREA */}
            <main className="flex-1 flex flex-col min-w-0 pt-24">                {/* FAT VOYAGE HEADER */}

                <header className="px-12 py-10 bg-white border-b border-slate-200 rounded-2xl">                    <div className="max-w-5xl">
                        <Link href="/" className="inline-block">
                            <h1 className="text-8xl md:text-9xl font-[1000] tracking-tighter text-slate-900 uppercase leading-none hover:opacity-90 transition">
                                VOYAGE <span className="text-slate-200">OFFICE</span>
                            </h1>
                        </Link>
                        <div className="flex items-center gap-3 mt-6">
                            <span className="h-2 w-2 rounded-full bg-emerald-400/80"></span>
                            <p className="text-[10px] font-mono font-semibold text-slate-300 uppercase tracking-[0.25em] truncate">
                                System Connected: {backend}
                            </p>
                        </div>
                    </div>
                </header>

                {/* 3. SYMMETRICAL DASHBOARD CONTENT */}
                <div className="p-10 max-w-5xl w-full space-y-8">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Main Action Card */}
                        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between min-h-[200px]">
                            <div>
                                <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-1">Content</h3>
                                <h2 className="text-2xl font-bold text-slate-800">Post Management</h2>
                                <p className="text-slate-500 mt-2 text-sm leading-relaxed">
                                    Review and edit all current voyage publications.
                                </p>
                            </div>
                            <Link href="/admin/posts" className="mt-6 inline-flex items-center font-bold text-indigo-600 hover:gap-2 transition-all">
                                Manage Posts →
                            </Link>
                        </div>

                        {/* Database Status Card */}
                        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between min-h-[200px]">
                            <div>
                                <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-1">Infrastructure</h3>
                                <h2 className="text-2xl font-bold text-slate-800">SQL Database</h2>
                                <p className="text-slate-500 mt-2 text-sm leading-relaxed truncate">
                                    Status: Operational at {backend}/h2-console
                                </p>
                            </div>
                            <a href={`${backend}/h2-console`} target="_blank" className="mt-6 inline-flex items-center font-bold text-indigo-600 hover:gap-2 transition-all">
                                Open Console ↗
                            </a>
                        </div>
                    </div>

                    {/* Large Summary Box */}
                    <div className="bg-indigo-600 rounded-3xl p-10 text-white shadow-xl shadow-indigo-200">
                        <h3 className="text-indigo-200 text-xs font-black uppercase tracking-widest mb-2">Office Overview</h3>
                        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                            <div className="max-w-md">
                                <p className="text-2xl font-medium leading-tight italic">
                                    "Efficiency is doing things right; effectiveness is doing the right things."
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-4xl font-black">100%</p>
                                <p className="text-indigo-200 text-xs font-bold uppercase">System Uptime</p>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}