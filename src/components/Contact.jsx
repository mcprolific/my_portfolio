// src/components/Contact.jsx
import React from 'react';

const Contact = () => {
  return (
    <section
      id="contact"
      className="tm-contact"
      style={{ paddingTop: '100px', minHeight: '100vh' }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h2 className="title">Drop <strong>me a line</strong></h2>
            <hr />
          </div>

          <div className="col-md-1 col-sm-1"></div>

          <div className="col-md-10 col-sm-10">
            <form action="#" method="post">
              <div className="col-md-6 col-sm-6">
                <input className="form-control" type="text" placeholder="Your Name" />
              </div>
              <div className="col-md-6 col-sm-6">
                <input className="form-control" type="email" placeholder="Your Email" />
              </div>
              <div className="col-md-12 col-sm-12">
                <input className="form-control" type="text" placeholder="Your Subject" />
                <textarea className="form-control" placeholder="Your Message" rows="6"></textarea>
              </div>
              <div className="col-md-offset-2 col-md-8 col-sm-offset-2 col-sm-8">
                <input className="form-control" type="submit" value="SHOOT MESSAGE" />
              </div>
            </form>
          </div>

          <div className="col-md-1 col-sm-1"></div>

          <div className="col-md-12 col-sm-12 text-center mt-4">
            <p>
              Copyright &copy; 2018 Ultra Profile. Design:{' '}
              <a rel="nofollow noopener" href="https://templatemo.com">template mo</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
