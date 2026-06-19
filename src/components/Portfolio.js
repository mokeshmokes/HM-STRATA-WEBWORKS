'use client';

import { useSelector, useDispatch } from 'react-redux';
import { setActiveFilter } from '@/redux/slices/portfolioSlice';
import BackgroundVideo from './BackgroundVideo';

export default function Portfolio() {
  const dispatch = useDispatch();
  const activeFilter = useSelector((state) => state.portfolio.activeFilter);

  const filters = [
    { label: 'All Projects', value: 'all' },
    { label: 'Websites', value: 'website' },
    { label: 'E-Commerce', value: 'ecommerce' },
    { label: 'Branding', value: 'branding' }
  ];

  const projects = [
    {
      id: 1,
      category: 'website',
      title: 'NovaPulse SaaS Platform',
      desc: 'Full-stack dashboard & marketing site for a B2B analytics startup',
      stats: ['+210% Traffic', '+95% Lead Gen'],
      img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      link: '#'
    },
    {
      id: 2,
      category: 'ecommerce',
      title: 'Luxe Noir Fashion Store',
      desc: 'High-end Shopify-powered store with custom theme & AR try-on feature',
      stats: ['+320% Sales', '+74% Returning Users'],
      img: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80',
      link: '#'
    },
    {
      id: 3,
      category: 'branding',
      title: 'Ember & Oak Restaurant',
      desc: 'Complete brand identity — logo, menu design, signage & website',
      stats: ['+180% Bookings', '+400% Social Reach'],
      img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
      link: '#'
    },
    {
      id: 4,
      category: 'website',
      title: 'ArchVision Studio',
      desc: 'Portfolio website for a luxury architecture firm with 3D project viewer',
      stats: ['+260% Enquiries', '+88% Session Time'],
      img: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80',
      link: '#'
    },
    {
      id: 5,
      category: 'ecommerce',
      title: 'GreenLeaf Organics',
      desc: 'Subscription-based organic grocery store with smart reorder system',
      stats: ['+145% Subscriptions', '+60% Avg Order Value'],
      img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80',
      link: '#'
    },
    {
      id: 6,
      category: 'branding',
      title: 'Vertex Fitness',
      desc: 'Brand overhaul, app UI design & marketing collateral for a gym chain',
      stats: ['+500% Brand Recall', '+230% Memberships'],
      img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
      link: '#'
    },
    {
      id: 7,
      category: 'website',
      title: 'Horizon Real Estate',
      desc: 'Property listing platform with map integration & virtual tours',
      stats: ['+190% Listings Views', '+112% Inquiries'],
      img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
      link: '#'
    },
    {
      id: 8,
      category: 'ecommerce',
      title: 'TechGear Pro',
      desc: 'Multi-vendor electronics marketplace with real-time inventory sync',
      stats: ['+280% Revenue', '+91% Checkout Rate'],
      img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
      link: '#'
    }
  ];

  const filteredProjects = projects.filter(
    (project) => activeFilter === 'all' || project.category === activeFilter
  );

  return (
    <section id="portfolio" className="portfolio" style={{ position: 'relative', overflow: 'hidden' }}>
      <BackgroundVideo hueRotate="260deg" opacity={0.14} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-header" data-aos="fade-up">
          <h2>Our Portfolio</h2>
          <p>Explore our latest projects and success stories</p>
        </div>
        <div className="portfolio-filters" data-aos="fade-up">
          {filters.map((filter) => (
            <button
              key={filter.value}
              className={`filter-btn ${activeFilter === filter.value ? 'active' : ''}`}
              onClick={() => dispatch(setActiveFilter(filter.value))}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <div className="portfolio-grid">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="portfolio-item"
              data-category={project.category}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
              style={{
                transition: 'opacity 0.4s ease, transform 0.4s ease',
              }}
            >
              <div className="portfolio-image">
                <img src={project.img} alt={project.title} />
                <div className="portfolio-overlay">
                  <div className="portfolio-content">
                    <span className="portfolio-category-tag">{project.category}</span>
                    <h3>{project.title}</h3>
                    <p>{project.desc}</p>
                    <div className="portfolio-stats">
                      {project.stats.map((stat, sIndex) => (
                        <span key={sIndex}>{stat}</span>
                      ))}
                    </div>
                    <a href={project.link} className="portfolio-link" onClick={(e) => e.preventDefault()}>
                      <i className="fas fa-external-link-alt"></i> View Project
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
