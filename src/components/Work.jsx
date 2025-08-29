// src/components/Work.jsx
import React from 'react';

const Work = () => {
  return (
    <section id="work" className="tm-padding-top-bottom-100">
      <div className="container">
        <div className="row">
          <div className="col-md-offset-1 col-md-11">
            <h2 className="title">My <strong>Work</strong></h2>
          </div>

          <div className="col-md-4 col-sm-4">
            <div className="work-wrapper">
              <i className="fa fa-link"></i>
              <h3 className="text-uppercase tm-work-h3">Project Write-up</h3>
              <hr />
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                laoreet. Dolore magna.
              </p>
            </div>
          </div>

          <div className="col-md-4 col-sm-4">
            <div className="work-wrapper">
              <i className="fa fa-flash"></i>
              <h3 className="text-uppercase tm-work-h3">Web Design</h3>
              <hr />
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                laoreet. Dolore magna.
              </p>
            </div>
          </div>

          <div className="col-md-4 col-sm-4">
            <div className="work-wrapper">
              <i className="fa fa-dashboard"></i>
              <h3 className="text-uppercase tm-work-h3">Computer Engineering</h3>
              <hr />
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                laoreet. Dolore magna.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;
