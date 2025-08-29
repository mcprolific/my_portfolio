// src/components/Resume.jsx
import React from 'react';

const Resume = () => {
  return (
    <section id="resume" className="tm-padding-top-bottom-100">
      <div className="container">
        <div className="row">
          {/* Profile Information */}
          <div className="col-md-6 col-sm-6">
            <h2 className="title">My <strong>Profile</strong></h2>
            <p><span className="tm-info-label">Name</span> John White</p>
            <p><span className="tm-info-label">Birthday</span> December 24, 1996</p>
            <p><span className="tm-info-label">Address</span> Melbourne Victoria 3000 Australia</p>
            <p><span className="tm-info-label">Phone</span> +001 020 0340 | 009 080 0760</p>
            <p><span className="tm-info-label">Email</span> hello@company.com</p>
            <p>
              <span className="tm-info-label">Website</span>{' '}
              <a href="#" className="tm-red-text">www.company.com</a>
            </p>
          </div>

          {/* Skills Section */}
          <div className="col-md-6 col-sm-6">
            <h2 className="title"><strong>Some</strong> Skills</h2>
            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet. Dolore magna aliquam erat volutpat.</p>

            <h4 className="tm-progress-label">Bootstrap <small className="progress-percent-small">100%</small></h4>
            <div className="progress tm-progress">
              <div className="progress-bar progress-bar-danger" role="progressbar" style={{ width: '100%' }}></div>
            </div>

            <h4 className="tm-progress-label">HTML5 <small className="progress-percent-small">90%</small></h4>
            <div className="progress tm-progress">
              <div className="progress-bar progress-bar-danger" role="progressbar" style={{ width: '90%' }}></div>
            </div>

            <h4 className="tm-progress-label">SEO <small className="progress-percent-small">80%</small></h4>
            <div className="progress tm-progress">
              <div className="progress-bar progress-bar-danger" role="progressbar" style={{ width: '80%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
