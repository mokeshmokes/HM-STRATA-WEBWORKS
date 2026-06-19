'use client';

import Image from 'next/image';

export default function About() {
  const values = [
    {
      icon: 'fa-lightbulb',
      title: 'Innovation',
      desc: 'We stay ahead of trends and use cutting-edge technologies'
    },
    {
      icon: 'fa-handshake',
      title: 'Partnership',
      desc: 'We work closely with clients as true partners in their success'
    },
    {
      icon: 'fa-award',
      title: 'Excellence',
      desc: 'We deliver exceptional quality in every project we undertake'
    }
  ];

  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-content">
          <div className="about-text" data-aos="fade-right">
            <h2>About HMW WebWorks</h2>
            <p className="about-intro">
              We are a passionate team of designers and developers dedicated to creating digital experiences that drive business growth.
            </p>
            <p>
              Founded in 2020, HMW WebWorks has quickly become a trusted partner for businesses looking to establish a strong online presence. Our mission is to bridge the gap between beautiful design and powerful functionality.
            </p>
            <div className="about-values">
              {values.map((val, index) => (
                <div key={index} className="value-item">
                  <i className={`fas ${val.icon}`}></i>
                  <div>
                    <h4>{val.title}</h4>
                    <p>{val.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="about-image" data-aos="fade-left">
            <Image
              src="/HM WEBWORKS.png"
              alt="HMW WebWorks Team"
              width={500}
              height={350}
              style={{ objectFit: 'contain', width: '100%', height: 'auto' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
