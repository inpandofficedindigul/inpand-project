import React from 'react';

export const HomeProcess: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: "Understand Requirements",
      description: "We begin by understanding your business objectives, target audience, and specific functional requirements to determine the right technical scope.",
    },
    {
      number: '02',
      title: "Plan the Experience",
      description: "We map user journeys, page structures, content hierarchies, and technology architecture to create a structured development roadmap.",
    },
    {
      number: '03',
      title: "Design & Develop",
      description: "We craft clean, responsive interfaces and write clean, maintainable frontend code using modern standards for speed, security, and accessibility.",
    },
    {
      number: '04',
      title: "Review & Deliver",
      description: "We conduct thorough cross-browser and cross-device testing before final handover, ensuring your website or application is ready for client deployment.",
    },
  ];

  return (
    <section className="py-24 border-t border-border bg-[#F7F7F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-accent mb-2 block">
            How We Work
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-primary tracking-tight">
            Our Delivery Workflow
          </h2>
          <p className="text-secondary text-base mt-3">
            A clear, structured development process ensuring quality, alignment, and predictable project milestones from start to delivery.
          </p>
        </div>

        {/* Process Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-white p-7 rounded-md border border-border flex flex-col justify-between relative group hover:border-border-strong hover:shadow-subtle transition-all duration-200"
            >
              <div>
                <span className="font-mono text-3xl font-extrabold text-accent mb-6 block">
                  {step.number}
                </span>
                <h3 className="font-heading font-bold text-xl text-primary mb-3">
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
