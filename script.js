document.addEventListener("DOMContentLoaded", function () {

    // Lenis
    let lenisHeader;

    const initLenisHeader = () => {

    const text = document.querySelector(".artist-list-text");
    const content = document.querySelector(".content");

    lenisHeader = new Lenis({
        lerp: 0.08,
        wheelMultiplier: 1.2,
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

    const goToTop = document.querySelector(".artist-list-gallery-action");

    const addEventListener = () => {
        goToTop.addEventListener("click", () => lenisHeader.scrollTo(1, {
            lerp: 0.05
        }));
    };

    window.onload = () => {
        initLenisHeader();
    };

    // GSAP
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(".artist-list-gallery-image", {
        filter: "brightness(1) contrast(1.3)",
        duration: 1.5,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut"
    });

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
    
                    const scale = gsap.utils.interpolate(scaleStart, 0.7, progress);
                    const opacity = gsap.utils.interpolate(1, 0.5, progress);
    
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
            y: -15,
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

    gsap.from("#scene2-container", {
        y: -200,
        scrollTrigger: {
            trigger: "#scene2-container",
            start: "top bottom",
            end: "top top",
            scrub: 0.5,
        },
    });
});