// src/components/Portfolio.jsx
import React, { useEffect, useRef } from 'react';
import Isotope from 'isotope-layout';
import imagesLoaded from 'imagesloaded';

const Portfolio = () => {
  const isoContainer = useRef(null);
  const isoInstance = useRef(null);

  useEffect(() => {
    const imgLoad = imagesLoaded(isoContainer.current, () => {
      isoInstance.current = new Isotope(isoContainer.current, {
        itemSelector: '.iso-box',
        layoutMode: 'fitRows'
      });
    });

    const handleFilterClick = (e) => {
      e.preventDefault();
      const filterValue = e.target.getAttribute('data-filter');
      if (isoInstance.current) {
        isoInstance.current.arrange({ filter: filterValue });
      }

      // Manage active class
      document
        .querySelectorAll('.filter-wrapper a')
        .forEach(a => a.classList.remove('selected'));
      e.target.classList.add('selected');
    };

    const filterLinks = document.querySelectorAll('.filter-wrapper a');
    filterLinks.forEach(link => {
      link.addEventListener('click', handleFilterClick);
    });

    return () => {
      if (isoInstance.current) isoInstance.current.destroy();
      filterLinks.forEach(link => {
        link.removeEventListener('click', handleFilterClick);
      });
    };
  }, []);

  return (
    <section id="portfolio" className="tm-portfolio">
      <div className="container">
        <div className="title">
          <h2 className="tm-portfolio-title">My <strong>Portfolio</strong></h2>
        </div>

        <ul className="filter-wrapper clearfix">
          <li><a href="#" className="opc-main-bg selected" data-filter="*">All</a></li>
          <li><a href="#" className="opc-main-bg" data-filter=".html">HTML</a></li>
          <li><a href="#" className="opc-main-bg" data-filter=".photoshop">Photoshop</a></li>
          <li><a href="#" className="opc-main-bg" data-filter=".wordpress">Wordpress</a></li>
          <li><a href="#" className="opc-main-bg" data-filter=".mobile">Mobile</a></li>
        </ul>

        <div className="iso-box-section">
          <div className="iso-box-wrapper col4-iso-box" ref={isoContainer}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
              <div key={num} className="iso-box html wordpress mobile col-md-3 col-sm-3 col-xs-12">
                <div className="portfolio-thumb">
                  <img
                    src={`images/portfolio-img${num}.jpg`}
                    className="fluid-img"
                    alt={`portfolio ${num}`}
                  />
                  <div className="portfolio-overlay">
                    <h3 className="portfolio-item-title">UX Design</h3>
                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonumm.</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
