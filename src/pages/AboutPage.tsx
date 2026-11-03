import React from 'react';
import { ArrowUpRight, Laptop, Code2, ShoppingCart, TrendingUp } from 'lucide-react';
import { Button } from '../components/common/Button';
import { SEOHead } from '../components/common/SEOHead';
import { COMPANY_CONFIG } from '../lib/config';

export const AboutPage: React.FC = () => {
  const verifiedServices = [
    {
      icon: <Laptop size={22} className="text-accent" />,
      title: 'Website Design & Development',
      description:
        'Crafting responsive, visually engaging, and standards-compliant websites tailored to brand identities and business objectives.',
    },
    {
      icon: <Code2 size={22} className="text-accent" />,
      title: 'Web Application Development',
      description:
        'Building tailored web applications, management portals, and custom digital software engineered for operational efficiency.',
    },
    {
      icon: <ShoppingCart size={22} className="text-accent" />,
      title: 'E-Commerce Solutions',
      description:
        'Developing commercial storefronts with smooth product discovery, secure checkout workflows, and scalable architectures.',
    },
    {
      icon: <TrendingUp size={22} className="text-accent" />,
      title: 'Digital Marketing & Growth',
      description:
        'Helping businesses expand their market reach, connect with target customers, and measure conversion performance.',
    },
  ];

  const workflowSteps = [
    {
      number: '01',
      title: 'Understand Requirements',
      description:
        'We consult closely to clarify business objectives, end-user expectations, and technical requirements before writing code.',
    },
    {
      number: '02',
      title: 'Plan the Digital Experience',
      description:
        'We outline site architectures, user journeys, and component hierarchies to build a solid foundation for the project.',
    },
    {
      number: '03',
      title: 'Design & Develop',
      description:
        'We design accessible, editorial interfaces and write clean, performant frontend code adhering to current web standards.',
    },
    {
      number: '04',
      title: 'Review & Deliver',
      description:
        'We test cross-browser responsiveness, performance, and functionality to ensure a smooth deployment to your live client domain.',
    },
  ];

  return (
    <div className="py-12 md:py-16">
      <SEOHead
        title="About INPAND Technologies — Digital Studio & Craft"
        description={`${COMPANY_CONFIG.tagline}. Learn about INPAND Technologies, our digital services, and our approach to delivering client websites and web applications.`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-border rounded-sm text-xs font-semibold uppercase tracking-wider text-accent mb-4 shadow-subtle">
            <span>Company Introduction</span>
            <span className="text-border">&bull;</span>
            <span>INPAND Technologies</span>
          </div>

          <h1 className="font-heading font-extrabold text-4xl sm:text-6xl text-primary tracking-tight leading-[1.08] mb-6">
            &ldquo;{COMPANY_CONFIG.tagline}&rdquo;
          </h1>

          <p className="text-lg sm:text-xl text-secondary leading-relaxed">
            INPAND Technologies is a digital solutions and web development company. We work with businesses across different industries to design, develop, and deliver effective digital experiences.
          </p>
        </div>

        {/* Narrative Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-start">
          <div className="lg:col-span-7 flex flex-col gap-6 text-base text-secondary leading-relaxed">
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-primary tracking-tight">
              Our Approach to Digital Solutions
            </h2>
            <p>
              At INPAND Technologies, we approach each client engagement with clarity, precision, and technical rigor. A website or web application must do more than just exist online—it must effectively represent the brand, serve the user seamlessly, and contribute directly to commercial growth.
            </p>
            <p>
              We focus on clean visual hierarchy, generous whitespace, fast load times, and responsive behavior across all screen sizes. From simple informational business websites to complex web tools, every interface is built with maintainability and usability at the core.
            </p>
            <p>
              This showcase presents the digital projects engineered by our team, offering prospective clients a transparent view into what we build.
            </p>
          </div>

          <div className="lg:col-span-5 bg-white p-8 rounded-md border border-border flex flex-col gap-6 shadow-subtle">
            <h3 className="font-heading font-bold text-lg text-primary pb-3 border-b border-border">
              Company Overview
            </h3>

            <div className="flex flex-col gap-4 text-xs sm:text-sm">
              <div>
                <span className="text-secondary block text-xs mb-1">Company Name</span>
                <span className="font-semibold text-primary">{COMPANY_CONFIG.name}</span>
              </div>

              <div>
                <span className="text-secondary block text-xs mb-1">Company Tagline</span>
                <span className="font-semibold text-primary">&ldquo;{COMPANY_CONFIG.tagline}&rdquo;</span>
              </div>

              <div>
                <span className="text-secondary block text-xs mb-1">Office Location</span>
                <span className="font-semibold text-primary">{COMPANY_CONFIG.address}</span>
              </div>

              <div>
                <span className="text-secondary block text-xs mb-1">Working Schedule</span>
                <span className="font-semibold text-primary">{COMPANY_CONFIG.workingHours}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-border flex flex-col gap-2.5">
              <Button
                to="/contact"
                variant="primary"
                size="md"
                className="w-full justify-center"
                icon={<ArrowUpRight size={15} />}
              >
                Discuss a Project
              </Button>
              <Button
                to="/projects"
                variant="secondary"
                size="md"
                className="w-full justify-center"
              >
                Explore Project Showcase
              </Button>
            </div>
          </div>
        </div>

        {/* Verified Services Section */}
        <div className="pt-16 border-t border-border mb-20">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-accent mb-2 block">
              Capabilities
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-primary tracking-tight">
              What We Build &amp; Deliver
            </h2>
            <p className="text-secondary text-sm sm:text-base mt-2">
              Our core services encompass the full lifecycle of modern digital presence and web application development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {verifiedServices.map((service, idx) => (
              <div
                key={idx}
                className="bg-white p-7 rounded-md border border-border flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-sm bg-[#F7F7F5] border border-border flex items-center justify-center mb-5">
                    {service.icon}
                  </div>
                  <h3 className="font-heading font-bold text-lg text-primary mb-2.5">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Workflow Section */}
        <div className="pt-16 border-t border-border mb-20">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-accent mb-2 block">
              Process
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-primary tracking-tight">
              Our Delivery Workflow
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((step) => (
              <div
                key={step.number}
                className="bg-white p-6 rounded-md border border-border flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-2xl font-extrabold text-accent mb-4 block">
                    {step.number}
                  </span>
                  <h3 className="font-heading font-bold text-lg text-primary mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="bg-primary text-white p-8 sm:p-12 rounded-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-heading font-bold text-2xl sm:text-3xl tracking-tight mb-2">
              Ready to start your next digital project?
            </h3>
            <p className="text-sm text-neutral-300">
              Get in touch with INPAND Technologies to discuss your timeline, scope, and technical requirements.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button
              to="/contact"
              variant="accent"
              size="lg"
              icon={<ArrowUpRight size={16} />}
            >
              Contact Our Team
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};
