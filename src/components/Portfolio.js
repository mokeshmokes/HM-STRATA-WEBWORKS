'use client';

import { useSelector, useDispatch } from 'react-redux';
import { setActiveFilter } from '@/redux/slices/portfolioSlice';

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
      title: 'Tech Startup Website',
      desc: 'Modern SaaS platform design',
      stats: ['+150% Traffic', '+80% Conversions'],
      img: 'https://via.placeholder.com/400x300/1e40af/ffffff?text=Project+1'
    },
    {
      id: 2,
      category: 'ecommerce',
      title: 'Fashion E-Commerce',
      desc: 'Complete online store solution',
      stats: ['+200% Sales', '+65% Users'],
      img: 'https://via.placeholder.com/400x300/3730a3/ffffff?text=Project+2'
    },
    {
      id: 3,
      category: 'branding',
      title: 'Restaurant Branding',
      desc: 'Complete brand identity design',
      stats: ['+300% Recognition', '+120% Bookings'],
      img: 'https://via.placeholder.com/400x300/1d4ed8/ffffff?text=Project+3'
    }
  ];

  const filteredProjects = projects.filter(
    (project) => activeFilter === 'all' || project.category === activeFilter
  );

  return (
    <section id="portfolio" className="portfolio">
      <div className="container">
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
                transition: 'opacity 0.3s ease, transform 0.3s ease'
              }}
            >
              <div className="portfolio-image">
                <img src={project.img} alt={project.title} />
                <div className="portfolio-overlay">
                  <div className="portfolio-content">
                    <h3>{project.title}</h3>
                    <p>{project.desc}</p>
                    <div className="portfolio-stats">
                      {project.stats.map((stat, sIndex) => (
                        <span key={sIndex}>{stat}</span>
                      ))}
                    </div>
                    <a href="#" className="portfolio-link" onClick={(e) => e.preventDefault()}>
                      <i className="fas fa-external-link-alt"></i>
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
