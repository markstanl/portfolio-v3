import PhilosopherHero from "@/components/PhilosopherHero";
import RoughLink from "@/components/RoughLink";
import SocialIcons from "@/components/icons/SocialIcons";

export default function Home() {
  return (
    <div className="flex w-full max-w-4xl flex-col items-center gap-8 px-6 py-8 md:flex-row md:items-start">
      <div className="flex w-full flex-col items-start gap-8 md:w-full md:max-w-md md:shrink-0">
        <div className="flex w-full flex-col items-start gap-4">
          <h1 className="font-noto-serif text-5xl font-bold text-black sm:text-6xl">
            Mark Stanley
          </h1>
          <SocialIcons />
          <h2 className="font-noto-serif text-2xl text-accent-purple sm:text-3xl">
            CS, Math, Phil @ UW-Madison
          </h2>
        </div>

        <section
          id="about"
          className="flex w-full scroll-mt-12 flex-col items-start gap-2 font-caveat text-lg text-black sm:text-xl"
        >
          <p>I do AI research and spend my time philosophizing.</p>
          <p>Learning as much as I can so I can do some good with it.</p>
          <p>
            My senior honors thesis is in LLM generative uncertainty
            quantification.
          </p>
          <p>
            Also a SPAR mentee for an{" "}
            <RoughLink href="https://sparai.org/projects/f26/rec9MdqTLmwjnxJo3/">
              emergent alignment
            </RoughLink>{" "}
            project.
          </p>
        </section>
      </div>

      <div className="flex w-full justify-center md:flex-1">
        <div className="w-full max-w-xs md:max-w-md">
          <PhilosopherHero />
        </div>
      </div>
    </div>
  );
}
