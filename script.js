document.addEventListener("DOMContentLoaded", function () {

    // Lenis
    let lenisHeader;

    const initLenisHeader = () => {

    const text = document.querySelector(".artist-list-text");
    const content = document.querySelector(".content");

    lenisHeader = new Lenis({
        lerp: 0.08,
        wheelMultiplier: 0.95,
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

    const galleryFigures = gsap.utils.toArray(".artist-list-gallery-figure");
    const galleryFigcaption = gsap.utils.toArray(".descript");
    const galleryImages = gsap.utils.toArray(".parallax")

    galleryFigures.forEach((figure) => {
        const animation = gsap.to(figure, {
            scrollTrigger: {
                trigger: figure,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
                // markers: true,
                onUpdate: (self) => {
                    const progress = self.progress;

                    let scaleStart = 1;
                    let yPosition = 45;

                    ScrollTrigger.matchMedia({
                        "(max-width: 576px)": () => {
                            scaleStart = 0.5;
                            yPosition = 75;
                        },
                    });
    
                    const scale = gsap.utils.interpolate(scaleStart, 0.75, progress);
                    const opacity = gsap.utils.interpolate(1, 0.7, progress);
    
                    gsap.to(figure, {
                        scale: scale,
                        opacity: opacity,
                        y: yPosition,
                        duration: 0.2,
                        overwrite: "auto",
                    });

                    figure.addEventListener("mouseenter", () => {
                        gsap.to(figure, {
                            opacity: 1,
                            ease: "power1.out"
                        });
                    });
                
                    figure.addEventListener("mouseleave", () => {
                        gsap.to(figure, {
                            opacity: opacity,
                            ease: "power1.in"
                        });
                    });
                },
            },
        });
    
        figure.animation = animation;
    });
    
    window.addEventListener("resize", () => {
        galleryFigures.forEach((figure) => {
            if (figure.animation) {
                figure.animation.restart();
            }
        });
        ScrollTrigger.refresh();
    });

    galleryFigcaption.forEach((figcaption) => {
        gsap.to(figcaption, {
            y: 5,
            scrollTrigger: {
                trigger: figcaption,
                start: "top 80%",
                end: "bottom 30%",
                onUpdate: (self) => {
                    const progress = self.progress;
                    const scale = gsap.utils.interpolate(1, 0.9, progress);
                    gsap.to(figcaption, {
                        scale: scale,
                        duration: 0.2,
                        overwrite: "auto",
                    });
                },
            }
        });
    });

    galleryImages.forEach((image) => {
        gsap.to(image, {
            scale: 1.1,
            y: 20,
            duration: 1,
            scrollTrigger: {
                trigger: image,
                start: "top 80%",
                end: "bottom 30%",
                scrub: 1,
            }
        });
    });

    window.addEventListener("resize", () => {       
        galleryFigures.forEach((figure) => {
            gsap.set(figure, {
                opacity: 1,
            });
        });
        ScrollTrigger.refresh();
    });

    window.addEventListener("load", () => {
        ScrollTrigger.refresh();
    });

    gsap.from(".artist-list-gallery-info", {
        y: 80,
        scrollTrigger: {
            trigger: ".artist-list-gallery-info",
            start: "top bottom",
            end: "top top",
            scrub: 0.5,
        },
    });

    window.addEventListener("scroll", function() {
        const contenido = document.querySelector(".contenido-scroll");
        const koDiv = document.querySelector(".ko");
        
        const scrollTop = window.scrollY;
    
        if (scrollTop > 100) {
          contenido.style.opacity = 0;
          koDiv.style.visibility = "hidden";
        } else {
          contenido.style.opacity = 1;
          koDiv.style.visibility = "visible";
        }
    });

    const section = document.querySelector(".artist-gallery-info-wrapper");
    const img = document.querySelector(".peel");
    const tlOne = gsap.timeline({ paused: true });

    tlOne.fromTo(img, { y: 0 },
        { y: "100vh",
        duration: 1.5,
        ease: "none" }, 0);

    ScrollTrigger.create({
        animation: tlOne,
        trigger: section,
        start: "top 20%",
        end: "bottom center",
        scrub: true,
    });

    let tl3 = gsap.timeline({
        scrollTrigger: {
          trigger: ".cards",
          start: "top top",
          end: "+=1000",
          scrub: 2,
          pin: true,
          pinSpacing: true,
          ease: "power4.out"
        }
      });
      
      tl3.from(".card1", {
        yPercent: 100,
        scale: 0.8,
        opacity: 0.5,
      });

      tl3.from(".card2", {
        yPercent: 100,
        scale: 0.8,
        opacity: 0.5,
      });

});
