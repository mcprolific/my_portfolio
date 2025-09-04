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
            <p><span className="tm-info-label">Name</span> Saka Idris Ajayi</p>
            <p><span className="tm-info-label">Birthday</span> January 05, 1991</p>
            <p><span className="tm-info-label">Address</span> 18, Quarry Agbeloba, Abeokuta, Ogun State, Nigeria</p>
            <p><span className="tm-info-label">Phone</span> +234-813-3274-250</p>
            <p><span className="tm-info-label">Email</span> indexprolific@gmail.com</p>
            <p>
              <span className="tm-info-label">Website</span>{' '}
              <a href="#" className="tm-red-text">www.mcprolific.com</a>
            </p>
          </div>

          {/* Skills Section */}
          <div className="col-md-6 col-sm-6">
            <h2 className="title"><strong>Some</strong> Skills</h2>
            <p>Expert Coding Services*

Get high-quality, efficient, and reliable coding solutions for your projects!

*Services Offered:*

1. *Web Development:* Build fast, scalable, and secure web applications using HTML, CSS, JavaScript, React, Angular, Vue.js, and more.
2. *Mobile App Development:* Create native and cross-platform mobile apps for Android and iOS using Java, Swift, Kotlin, React Native, and Flutter.
3. *Desktop Applications:* Develop desktop applications for Windows, macOS, and Linux using C++, Java, Python, and more.
4. *Machine Learning and AI:* Build intelligent systems using TensorFlow, PyTorch, Keras, and scikit-learn.
5. *Database Management:* Design, develop, and optimize databases using MySQL, MongoDB, PostgreSQL, and more.

*Programming Languages:*

1. Python
2. Java
3. JavaScript
4. C++
5. C#
6. PHP
7. Ruby
8. Swift
9. Kotlin
10. Go
</p>

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
