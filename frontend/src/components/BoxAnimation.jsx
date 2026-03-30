import React, { useEffect } from "react";
import { gsap } from "gsap";
import "./BoxAnimation.scss";
import img1 from "../assets/portfolios/s1.jpg";
import img2 from "../assets/portfolios/s2.jpg";
import img3 from "../assets/portfolios/s3.jpg";
import img4 from "../assets/portfolios/s4.jpg";
import img5 from "../assets/portfolios/s5.jpg";

const BoxAnimation = () => {
  useEffect(() => {
    const boxIn = () => {
      const tl = gsap
        .timeline()
        .set(".scene", { autoAlpha: 1 })
        .fromTo(".box", { rotationY: -540, y: "100vh" }, { duration: 2, rotationY: 0, y: "16vh", ease: "power2" });
      tl.to(".box__lid", { rotateX: -225, duration: 0.5, ease: "sine.inOut" }, "-=1.4")
        .to(".box__lid-flap", { rotateX: 60, duration: 0.5, ease: "sine.inOut" }, "-=1.2")
        .to(
          ".box__flap--left",
          { rotateX: "-=135", duration: 0.5, ease: "sine.inOut", transformOrigin: "50% 100%" },
          "-=1"
        )
        .to(
          ".box__flap--right",
          { rotateX: "-=135", duration: 0.5, ease: "sine.inOut", transformOrigin: "50% 100%" },
          "-=1"
        );
      return tl;
    };

    const rotationAnim = () => {
      const tl = gsap.timeline({ repeat: -1 });
      tl.to(".box", { rotateY: 180, ease: "power2.inOut", duration: 0.8 })
        .fromTo(
          ".box__back",
          { webkitFilter: "brightness(1)", filter: "brightness(1)" },
          { duration: 0.8, webkitFilter: "brightness(0.2)", filter: "brightness(0.2)", ease: "power4.inOut" },
          0
        )
        .fromTo(
          ".box__left",
          { webkitFilter: "brightness(1)", filter: "brightness(1)" },
          { duration: 0.8, webkitFilter: "brightness(0.8)", filter: "brightness(0.8)", ease: "power4.inOut" },
          0
        )
        .fromTo(
          ".box__lid-top-logo",
          { webkitFilter: "brightness(1)", filter: "brightness(1)" },
          { duration: 0.8, webkitFilter: "brightness(0.85)", filter: "brightness(0.85)", ease: "power2.inOut" },
          0.2
        )
        .to(
          ".card--1",
          {
            keyframes: [
              { duration: 0.4, y: "-155%", transformOrigin: "center bottom", ease: "sine" },
              { duration: 0.6, rotation: 50, x: "40%", ease: "power2", delay: -0.25 },
            ],
          },
          0.2
        )
        .to(
          ".card--2",
          {
            keyframes: [
              { duration: 0.4, y: "-160%", transformOrigin: "center bottom", ease: "sine" },
              { duration: 0.6, rotation: 25, x: "20%", ease: "power2", delay: -0.25 },
            ],
          },
          0.2
        )
        .to(
          ".card--3",
          {
            keyframes: [
              { duration: 0.4, y: "-160%", transformOrigin: "center bottom", ease: "sine" },
              { duration: 0.6, rotation: 0, x: "0%", ease: "power2", delay: -0.25 },
            ],
          },
          0.2
        )
        .to(
          ".card--4",
          {
            keyframes: [
              { duration: 0.4, y: "-160%", transformOrigin: "center bottom", ease: "sine" },
              { duration: 0.6, rotation: -25, x: "-20%", ease: "power2", delay: -0.25 },
            ],
          },
          0.2
        )
        .to(
          ".card--5",
          {
            keyframes: [
              { duration: 0.4, y: "-155%", transformOrigin: "center bottom", ease: "sine" },
              { duration: 0.6, rotation: -50, x: "-40%", ease: "power2", delay: -0.25 },
            ],
          },
          0.2
        )
        .to(".card--1", { keyframes: [{ duration: 0.6, rotation: 0, x: "0%", ease: "power2.in" }, { duration: 0.4, y: "0%", transformOrigin: "center bottom", ease: "sine.in", delay: -0.25 }] }, 1.4)
        .to(".card--2", { keyframes: [{ duration: 0.6, rotation: 0, x: "0%", ease: "power2.in" }, { duration: 0.4, y: "0%", transformOrigin: "center bottom", ease: "sine.in", delay: -0.25 }] }, 1.4)
        .to(".card--3", { keyframes: [{ duration: 0.6, rotation: 0, x: "0%", ease: "power2.in" }, { duration: 0.4, y: "0%", transformOrigin: "center bottom", ease: "sine.in", delay: -0.25 }] }, 1.4)
        .to(".card--4", { keyframes: [{ duration: 0.6, rotation: 0, x: "0%", ease: "power2.in" }, { duration: 0.4, y: "0%", transformOrigin: "center bottom", ease: "sine.in", delay: -0.25 }] }, 1.4)
        .to(".card--5", { keyframes: [{ duration: 0.6, rotation: 0, x: "0%", ease: "power2.in" }, { duration: 0.4, y: "0%", transformOrigin: "center bottom", ease: "sine.in", delay: -0.25 }] }, 1.4)
        .to(".box", { rotateY: 360, ease: "power2.inOut", duration: 0.8 }, 1.6)
        .fromTo(
          ".box__front-face",
          { webkitFilter: "brightness(1)", filter: "brightness(1)" },
          { duration: 0.8, webkitFilter: "brightness(0.2)", filter: "brightness(0.2)", ease: "power4.inOut" },
          1.6
        )
        .fromTo(
          ".box__right",
          { webkitFilter: "brightness(1)", filter: "brightness(1)" },
          { duration: 0.8, webkitFilter: "brightness(0.8)", filter: "brightness(0.8)", ease: "power4.inOut" },
          1.6
        )
        .fromTo(
          ".box__lid-flap-shape-outer",
          { webkitFilter: "brightness(1)", filter: "brightness(1)" },
          { duration: 0.4, webkitFilter: "brightness(0.6)", filter: "brightness(0.6)", ease: "power2.in" },
          1.6
        )
        .to(".box__lid-top-logo", { duration: 0.4, webkitFilter: "brightness(0.6)", filter: "brightness(0.6)", ease: "power2.inOut" }, 1.6)
        .to(".box__lid-flap-shape-outer", { duration: 0.4, webkitFilter: "brightness(1)", filter: "brightness(1)", ease: "power2.inOut" }, 2)
        .set(".box__back", { webkitFilter: "brightness(1)", filter: "brightness(1)", immediateRender: false }, "-=0.8");
      return tl;
    };

    const masterTL = gsap.timeline();
    masterTL.add(boxIn()).add(rotationAnim());
  }, []);

  return (
    <div className="scene fixed inset-0 pointer-events-none z-0 flex items-center justify-center">
      <div className="box">
        <div className="box__flap box__flap--left" />
        <div className="box__flap box__flap--right" />
        <div className="box__back">
          <div className="box__back-face" />
        </div>
        <div className="card card--1"><img src={img1} alt="card 1" className="card__img" /></div>
        <div className="card card--2"><img src={img2} alt="card 2" className="card__img" /></div>
        <div className="card card--3"><img src={img3} alt="card 3" className="card__img" /></div>
        <div className="card card--4"><img src={img4} alt="card 4" className="card__img" /></div>
        <div className="card card--5"><img src={img5} alt="card 5" className="card__img" /></div>
        <div className="box__front">
          <div className="box__front-face" />
        </div>
        <div className="box__left" />
        <div className="box__right" />
        <div className="box__bottom" />
        <div className="box__lid">
          <div className="box__lid-inner">
            <div className="box__lid-top">
              <div className="box__lid-top-logo" />
              <div className="box__lid-top-back" />
            </div>
            <div className="box__lid-flap">
              <div className="box__lid-flap-shape">
                <div className="box__lid-flap-shape-inner" />
                <div className="box__lid-flap-shape-outer" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="collection">
        <a className="collection__link" href="https://codepen.io/collection/02388423440b98155f8e4002bde094f2" target="_blank" rel="noreferrer">
          View the collection<span />
        </a>
      </div>
      <div className="collection collection--1">
        <a className="collection__link" href="https://fwa.thecoolclub.co/" target="_blank" rel="noreferrer">
          Visit The Cool Club<span />
        </a>
      </div>
      <a href="https://greensock.com" target="_blank" rel="noreferrer">
        <img className="gsap-3-logo" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/16327/gsap-3-logo.svg" width="150" alt="GSAP Logo" />
      </a>
    </div>
  );
};

export default BoxAnimation;
