import HeartIcon from "@/components/icons/HeartIcon";

export default function Footer() {
  return (
    <footer className="flex w-full justify-end items-end bg-footer px-6 py-6">
      <div className="font-caveat text-base text-black">
        <p>Designed in Figma.</p>
        <p>Crafted with Next.</p>
        <p>
          Built with L
          <HeartIcon className="inline-block h-[0.55em] w-[0.63em] translate-y-[0.1em] -mr-[0.08em] align-baseline" />
          ve.
        </p>
        <p>-Mark</p>
      </div>
    </footer>
  );
}
