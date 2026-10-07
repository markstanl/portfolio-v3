import RoughLink from "@/components/RoughLink";

export default function NotFound() {
  return (
    <div className="flex w-full max-w-3xl flex-col items-center gap-8 px-6 py-6">
      <h1 className="text-center font-noto-serif text-5xl text-black">404</h1>
      <p className="w-full text-center font-caveat text-2xl text-black">
        There aren&apos;t <i>that</i> many secrets on this website.
      </p>
      <span className="font-noto-serif text-xl text-black">
        <RoughLink href="/" revealOn="hover">
          Back home
        </RoughLink>
      </span>
    </div>
  );
}
