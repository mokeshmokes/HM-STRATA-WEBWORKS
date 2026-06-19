'use client';

export default function Pricing() {
  const packages = [
    {
      name: 'Basic',
      price: '999',
      features: [
        '5 Page Website',
        'Responsive Design',
        'Contact Form',
        'Basic SEO Setup',
        '30 Days Support'
      ],
      featured: false
    },
    {
      name: 'Professional',
      price: '2499',
      features: [
        '10 Page Website',
        'Custom Design',
        'CMS Integration',
        'Advanced SEO',
        'E-Commerce Ready',
        '90 Days Support'
      ],
      featured: true
    },
    {
      name: 'Enterprise',
      price: '4999',
      features: [
        'Unlimited Pages',
        'Custom Development',
        'Full E-Commerce',
        'Advanced Analytics',
        'Priority Support',
        '1 Year Maintenance'
      ],
      featured: false
    }
  ];

  const handleGetStarted = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      window.scrollTo({
        top: contactSection.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="pricing" className="pricing">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <h2>Choose Your Package</h2>
          <p>Flexible pricing options for every business size</p>
        </div>
        <div className="pricing-grid">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`pricing-card ${pkg.featured ? 'featured' : ''}`}
              data-aos="fade-up"
              data-aos-delay={(index + 1) * 100}
            >
              {pkg.featured && <div className="pricing-badge">Most Popular</div>}
              <div className="pricing-header">
                <h3>{pkg.name}</h3>
                <div className="price">
                  <span className="currency">$</span>
                  <span className="amount">{pkg.price}</span>
                  <span className="period">/project</span>
                </div>
              </div>
              <ul className="pricing-features">
                {pkg.features.map((feature, fIndex) => (
                  <li key={fIndex}>
                    <i className="fas fa-check"></i> {feature}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="pricing-btn" onClick={handleGetStarted}>
                Get Started
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
