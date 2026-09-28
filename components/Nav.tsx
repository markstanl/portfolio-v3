import Link from "next/link";

export default function Nav() {
  return (
    <nav className="flex w-full items-center justify-between gap-5 whitespace-nowrap px-4 py-6 font-caveat text-lg font-bold text-black sm:justify-end sm:gap-12 sm:px-10 sm:text-2xl lg:px-20">
      <Link href="/">Home</Link>
      <Link href="/blog?tag=Research">Research</Link>
      <Link href="/blog">Blog</Link>
      <Link href="/contact">Contact</Link>
    </nav>
  );
}
