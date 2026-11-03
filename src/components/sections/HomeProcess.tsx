import React from 'react';

export const HomeProcess: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Understand',
      description: 'We analyze your commercial goals, audience dynamics, and technical scope to establish a decisive strategic roadmap.',
    },
    {
      number: '02',
      title: 'Design',
      description: 'We craft high-fidelity editorial wireframes and bespoke interactive prototypes tailored specifically to your brand identity.',
    },
    {
      number: '03',
      title: 'Develop',
      description: 'We engineer responsive, accessible, and high-performance frontends using modern TypeScript, React, and robust API contracts.',
    },
    {
      number: '04',
      title: 'Deliver',
      description: 'Rigorous cross-device testing, SEO optimization, and seamless deployment to your live client domain with full code ownership.',
    },
  ];

  return (
    <section className="py-24 border-t border-border bg-[#F7F7F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-accent mb-2 block">
            Execution Methodology
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-primary tracking-tight">
            How We Deliver Excellence
          </h2>
          <p className="text-secondary text-base mt-3">
            Our disciplined, four-phase delivery framework ensures transparency, velocity, and craftsmanship from concept to final launch.
          </p>
        </div>

        {/* Process Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-white p-7 rounded-md border border-border flex flex-col justify-between relative group hover:border-border-strong hover:shadow-subtle transition-all duration-200"
            >
              <div>
                <span className="font-mono text-3xl font-extrabold text-accent mb-6 block">
                  {step.number}
                </span>
                <h3 className="font-heading font-bold text-2xl text-primary mb-3">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-border/60 flex items-center justify-between text-[11px] font-semibold text-secondary uppercase tracking-wider">
                <span>Phase {step.number}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
