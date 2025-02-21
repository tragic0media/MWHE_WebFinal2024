document.addEventListener("DOMContentLoaded", function () {

    // Lenis
    let lenisHeader;

    const initLenisHeader = () => {

    const text = document.querySelector(".artist-list-text");
    const content = document.querySelector(".content");

    lenisHeader = new Lenis({
        lerp: 0.1,
        wheelMultiplier: 0.9,
        touchMultiplier: 0.9
    });

    lenisHeader.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenisHeader.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    lenisHeader.on("scroll", ({ scroll }) => {
        text.style.transform = `translate3D(${-scroll}px, 0, 0)`;
    });

    addEventListener()
    };

    const goToTop = document.querySelector(".back");

    const addEventListener = () => {
        goToTop.addEventListener("click", () => lenisHeader.scrollTo(1, {
            lerp: 0.05
        }));
    };

    initLenisHeader();


    // GSAP
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(".light", {
        y: "1000%",
        duration: 6,
        repeat: -1,
        ease: "power1.inOut"
    });

    gsap.to(".light", {
        scaleY: 0.5,
        duration: 0.7,
        opacity: 1,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
    });



    const section = document.querySelector(".artist-gallery-info-wrapper");
    const img = document.querySelector(".peel");
    const tlOne = gsap.timeline({ paused: true });

    tlOne.fromTo(img, { y: 0 },
        { y: "48vh",
        duration: 1.5,
        ease: "none" }, 0);

    ScrollTrigger.create({
        animation: tlOne,
        trigger: section,
        start: "top 20%",
        end: "bottom center",
        scrub: true,
    });

    let tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: ".cards",
          start: "top top",
          end: "+=1000",
          scrub: 1.5,
          pin: true,
          pinSpacing: true,
          ease: "power2.out",
        }
      });
      
      tl2.from(".card1", {
        yPercent: 50,
        scale: 0.8,
        opacity: 0.5,
      });

      tl2.from(".card2", {
        yPercent: 100,
        scale: 0.8,
        opacity: 0.5,
      });

});
