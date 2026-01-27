import { redirect } from "next/navigation";

export default function LoginPage() {
    const backend = process.env.BACKEND_URL!;
    const returnTo = encodeURIComponent("http://localhost:3000/admin");
    redirect(`${backend}/login-redirect?redirect=${returnTo}`);
}