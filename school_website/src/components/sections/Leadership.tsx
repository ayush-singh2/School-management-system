import Image from "next/image";
import Icon from "../Icon";

export default function Leadership() {
  return (
    <section className="py-20 md:py-[120px] bg-primary text-white overflow-hidden">
      <div className="mx-auto max-w-[1500px] px-8 space-y-24">
        {/* Director */}
        <div className="grid md:grid-cols-[1fr_auto] gap-12 items-center">
          <div className="reveal-left order-2 md:order-1">
            <div className="glass-gold shimmer rounded-[40px] p-9 md:p-11 shadow-2xl">
              <Icon name="format_quote" className="text-secondary text-5xl opacity-50" />
              <p className="font-display italic text-xl md:text-2xl leading-relaxed text-white/90 my-6">
                Our mission is to create a nurturing environment where students are
                not just taught but inspired to think, imagine and innovate. We value
                character as much as curriculum, ensuring every child steps into the
                world with confidence and compassion.
              </p>
              <div className="flex items-center gap-4">
                <span className="w-12 h-px bg-secondary" />
                <div>
                  <p className="font-bold text-lg">Amrendra Kumar Sinha</p>
                  <p className="text-secondary text-xs uppercase tracking-[0.2em] font-bold">
                    Director, Jitendra Public School
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="reveal-right order-1 md:order-2 flex flex-col items-center gap-4">
            <div className="relative group floaty-slow">
              <div className="absolute inset-0 bg-secondary rounded-[36px] rotate-3 transition-transform duration-500 group-hover:rotate-0" />
              <Image
                alt="Amrendra Kumar Sinha, Director of Jitendra Public School"
                className="relative w-64 h-80 object-cover object-top rounded-[36px] shadow-2xl"
                src="/assets/director-couple.jpg"
                width={256}
                height={320}
              />
            </div>
            <p className="text-secondary text-xs uppercase tracking-[0.25em] font-bold">
              Director&apos;s Message
            </p>
          </div>
        </div>

        {/* Felicitation / values */}
        <div className="grid md:grid-cols-[auto_1fr] gap-12 items-center">
          <div className="reveal-left flex flex-col items-center gap-4">
            <div className="relative group floaty">
              <div className="absolute inset-0 bg-secondary rounded-[36px] -rotate-3 transition-transform duration-500 group-hover:rotate-0" />
              <Image
                alt="Director felicitating a student at Jitendra Public School"
                className="relative w-64 h-80 object-cover rounded-[36px] shadow-2xl"
                src="/assets/director-award-student.jpg"
                width={256}
                height={320}
              />
            </div>
            <p className="text-secondary text-xs uppercase tracking-[0.25em] font-bold">
              Celebrating Our Students
            </p>
          </div>
          <div className="reveal-right">
            <div className="glass-gold shimmer rounded-[40px] p-9 md:p-11 shadow-2xl">
              <Icon name="format_quote" className="text-secondary text-5xl opacity-50" />
              <p className="font-display italic text-xl md:text-2xl leading-relaxed text-white/90 my-6">
                Dear Parents, choosing the right school for your child is vitally
                important. At Jitendra Public School we value every child and strive
                to make their time here fun, rewarding and fulfilling — focusing on
                academic excellence alongside personal, social and spiritual growth.
              </p>
              <div className="flex items-center gap-4">
                <span className="w-12 h-px bg-secondary" />
                <div>
                  <p className="font-bold text-lg">The Principal</p>
                  <p className="text-secondary text-xs uppercase tracking-[0.2em] font-bold">
                    In memory of Late Jitendra Narayan Sinha
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
