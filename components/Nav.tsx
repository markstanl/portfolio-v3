import Link from "next/link";

export default function Nav() {
  return (
    <nav className="flex w-full items-center justify-end gap-12 whitespace-nowrap px-6 py-6 font-caveat text-2xl font-bold text-black sm:px-10 lg:px-20">
      <Link href="/">Home</Link>
      <Link href="/blog?tag=Research">Research</Link>
      <Link href="/blog">Blog</Link>
      <Link href="/contact">Contact</Link>
    </nav>
  );
}
