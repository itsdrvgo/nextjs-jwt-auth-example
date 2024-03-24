import Link from "next/link";

function Page() {
    return (
        <section className="flex flex-1 items-center justify-center gap-5">
            <Link href="/auth/signin">Signin</Link>

            <Link href="/auth/signup">Signup</Link>
        </section>
    );
}

export default Page;
