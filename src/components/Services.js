'use client';

import BackgroundVideo from './BackgroundVideo';

export default function Services() {
  const services = [
    {
      icon: 'fa-palette',
      title: 'Website Design',
      desc: 'Modern, responsive designs that captivate your audience and reflect your brand identity.'
    },
    {
      icon: 'fa-code',
      title: 'Website Development',
      desc: 'Custom web applications built with cutting-edge technologies for optimal performance.'
    },
    {
      icon: 'fa-shopping-cart',
      title: 'E-Commerce Solutions',
      desc: 'Complete online stores with secure payment integration and inventory management.'
    },
    {
      icon: 'fa-search',
      title: 'SEO Optimization',
      desc: 'Boost your search rankings and drive organic traffic with our proven SEO strategies.'
    },
    {
      icon: 'fa-mobile-alt',
      title: 'UI/UX Design',
      desc: 'Intuitive user experiences that convert visitors into customers through thoughtful design.'
    },
    {
      icon: 'fa-bullhorn',
      title: 'Digital Marketing',
      desc: 'Strategic campaigns that amplify your online presence and drive business growth.'
    }
  ];

  return (
    <section id="services" className="services" style={{ position: 'relative', overflow: 'hidden' }}>
      <BackgroundVideo hueRotate="190deg" opacity={0.15} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-header" data-aos="fade-up">
          <h2>Our Services</h2>
          <p>We offer comprehensive digital solutions to elevate your business</p>
        </div>
        <div className="services-grid">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card"
              data-aos="fade-up"
              data-aos-delay={(index + 1) * 100}
              style={{
                transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease, border-color 0.4s ease'
              }}
            >
              <div className="service-icon">
                <i className={`fas ${service.icon}`}></i>
              </div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
