import PhilosopherHero from "@/components/PhilosopherHero";
import RoughLink from "@/components/RoughLink";
import SocialIcons from "@/components/icons/SocialIcons";

export default function Home() {
  return (
    <div className="flex w-full max-w-[913px] flex-col items-center gap-8 px-6 py-8">
      <div className="flex w-full flex-col items-center gap-8 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full flex-col items-start gap-4 md:max-w-[460px]">
          <h1 className="font-noto-serif text-5xl font-bold text-black sm:text-6xl">
            Mark Stanley
          </h1>
          <SocialIcons />
          <h2 className="font-noto-serif text-2xl text-accent-purple sm:text-3xl">
            CS, Math, Philos @ UW-Madison
          </h2>
        </div>
        <div className="w-full max-w-[280px] shrink-0 md:w-[320px] md:max-w-none">
          <PhilosopherHero />
        </div>
      </div>

      <section
        id="about"
        className="flex w-full scroll-mt-12 flex-col items-start gap-2 font-caveat text-lg text-black sm:text-xl"
      >
        <p>I do AI research and spend my time philosophizing.</p>
        <p>Learning as much as I can so I can do some good with it.</p>
        <p>
          I am doing my senior honors thesis in LLM generative uncertainty
          quantification.
        </p>
        <p>
          I am a SPAR mentee for an{" "}
          <RoughLink href="https://sparai.org/projects/f26/rec9MdqTLmwjnxJo3/">
            emergent alignment
          </RoughLink>{" "}
          project.
        </p>
      </section>
    </div>
  );
}
