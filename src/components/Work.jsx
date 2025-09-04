// src/components/Work.jsx
import React from 'react';
import workImage_1 from '../assets/s1.jpg'; 
import workImage_2 from '../assets/s2.jpg'; 
import workImage_3 from '../assets/s3.jpg'; 


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
              {/* <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                laoreet. Dolore magna.
              </p> */}
                <img src={workImage_1} alt="Logo" width="100%" height="100%" className="me-2" />
             
              
            </div>
          </div>

          <div className="col-md-4 col-sm-4">
            <div className="work-wrapper">
              <i className="fa fa-flash"></i>
              <h3 className="text-uppercase tm-work-h3">Web Design</h3>
              <hr />
              <img src={workImage_2} alt="Logo" width="100%" height="100%" className="me-2" />
            </div>
          </div>

          <div className="col-md-4 col-sm-4">
            <div className="work-wrapper">
              <i className="fa fa-dashboard"></i>
              <h3 className="text-uppercase tm-work-h3">Computer Engineering</h3>
              <hr />
              <img src={workImage_3} alt="Logo" width="100%" height="100%" className="me-2" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;
