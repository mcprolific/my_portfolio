// src/components/About.jsx
import React from 'react';

const About = () => {
  return (
    <section id="about" className="tm-about">
      <div className="container">
        <div className="row">
          <div className="col-md-offset-6 col-md-6 col-sm-offset-6 col-sm-7">
            <div className="title">
              <h2>This is <strong>me</strong></h2>
              <h1 className="tm-red-text">Creative <strong>Director</strong></h1>
            </div>
            <p>
              This is free Bootstrap v3.3.4 mobile friendly layout from{' '}
              <a rel="nofollow" href="https://templatemo.com">templatemo</a>. Feel free to use it for your website.
              Credit goes to <a rel="nofollow" href="https://pixabay.com">Pixabay</a> for photos used in this template.
              Dolore magna aliquam erat volutpat. Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
              sed diam nonummy nibh euismod tincidunt ut laoreet.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
              laoreet. Dolore magna aliquam erat volutpat.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
