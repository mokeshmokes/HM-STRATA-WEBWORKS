'use client';

import BackgroundVideo from './BackgroundVideo';

export default function Process() {
  const steps = [
    {
      num: '01',
      title: 'Discovery',
      desc: 'We understand your business, goals, and target audience to create the perfect strategy.',
      align: 'fade-right'
    },
    {
      num: '02',
      title: 'Design',
      desc: 'Creating wireframes and mockups that align with your brand and user expectations.',
      align: 'fade-left'
    },
    {
      num: '03',
      title: 'Development',
      desc: 'Building your website with clean code, optimized performance, and modern technologies.',
      align: 'fade-right'
    },
    {
      num: '04',
      title: 'Testing',
      desc: 'Rigorous testing across all devices and browsers to ensure flawless functionality.',
      align: 'fade-left'
    },
    {
      num: '05',
      title: 'Launch',
      desc: 'Smooth deployment and go-live process with full optimization and monitoring setup.',
      align: 'fade-right'
    },
    {
      num: '06',
      title: 'Support',
      desc: 'Ongoing maintenance, updates, and support to keep your website running perfectly.',
      align: 'fade-left'
    }
  ];

  return (
    <section className="process" style={{ position: 'relative', overflow: 'hidden' }}>
      <BackgroundVideo hueRotate="80deg" opacity={0.14} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-header" data-aos="fade-up">
          <h2>Our Process</h2>
          <p>How we bring your vision to life</p>
        </div>
        <div className="process-steps">
          {steps.map((step, index) => (
            <div
              key={index}
              className="process-step"
              data-aos={step.align}
              data-aos-delay={(index + 1) * 100}
            >
              <div className="step-number">{step.num}</div>
              <div className="step-content">
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
