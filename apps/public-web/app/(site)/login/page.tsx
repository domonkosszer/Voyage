import Link from "next/link";
import { redirect } from "next/navigation";

export default function LoginPage() {
    const backend = process.env.BACKEND_URL;

    if (!backend) {
        return (
            <div className="flex min-h-screen items-center justify-center px-6">
                <div className="max-w-md rounded-2xl border border-black/10 p-8">
                    <h1 className="text-xl font-bold">Login unavailable</h1>
                    <p className="mt-3 text-sm leading-relaxed opacity-70">
                        No backend is configured, so login can’t start. Set{" "}
                        <code className="font-mono">BACKEND_URL</code> in{" "}
                        <code className="font-mono">.env.local</code> and start the
                        Spring backend (<code className="font-mono">workspace-api</code>).
                    </p>
                    <Link
                        href="/"
                        className="mt-6 inline-block text-sm font-semibold underline underline-offset-4"
                    >
                        ← Back to site
                    </Link>
                </div>
            </div>
        );
    }

    const returnTo = encodeURIComponent("http://localhost:3000/admin");
    redirect(`${backend}/login-redirect?redirect=${returnTo}`);
}
