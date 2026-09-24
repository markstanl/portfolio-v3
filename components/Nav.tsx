import Link from "next/link";

export default function Nav() {
  return (
    <nav className="flex w-full items-center justify-end gap-[46px] whitespace-nowrap px-6 py-[24px] font-caveat text-[24px] font-bold text-black sm:px-10 lg:px-20">
      <Link href="/#about">About</Link>
      <Link href="/blog?tag=Research">Research</Link>
      <Link href="/blog?tag=Music">Creative</Link>
    </nav>
  );
}
