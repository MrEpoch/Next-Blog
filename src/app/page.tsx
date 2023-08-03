import { randomUUID } from "crypto";
import Link from "next/link";

export default async function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Link href="/register" prefetch >Sign Up</Link>
        <Link href="/login" prefetch>Log In</Link>
        <Link href="/home" prefetch>Home</Link>
        <Link href={"/project/" + randomUUID()} prefetch>Project</Link>
    </main>
  )
}
