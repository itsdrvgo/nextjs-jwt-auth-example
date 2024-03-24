import Link from "next/link";

function Page() {
    return (
        <section className="flex flex-1 items-center justify-center">
            <Link href="/profile">Profile</Link>
        </section>
    );
}

export default Page;
