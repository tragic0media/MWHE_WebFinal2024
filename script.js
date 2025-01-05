document.addEventListener("DOMContentLoaded", function () {
    
    // Lenis
    let lenisHeader;

    const initLenisHeader = () => {

    const text = document.querySelector(".artist-list-text");
    const content = document.querySelector(".content");

    lenisHeader = new Lenis({
        lerp: 0.08,
        autoRaf: true,
        wheelMultiplier: 0.7,
    });
    
    lenisHeader.scrollTo(1, { lerp: 0.05, duration: 1.5 });

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

    galleryFigures.forEach((figure) => {
        gsap.to(figure, {
            scale: 0.7,
            paused: true,
            scrollTrigger: {
                trigger: figure,
                start: "top 55%",
                end: "bottom 40%",
                // markers: true,
                onEnter: () => {
                    gsap.to(figure, { scale: 0.9, duration: 1, opacity: 1 });
                },
                onLeave: () => {
                    gsap.to(figure, { scale: 0.7, duration: 1, opacity: 0 });
                },
                onEnterBack: () => {
                    gsap.to(figure, { scale: 0.9, duration: 1, opacity: 1 });
                },
                onLeaveBack: () => {
                    gsap.to(figure, { scale: 0.7, duration: 1, opacity: 0 });
                }
            },
        });
    });

    const galleryFigcaption = gsap.utils.toArray(".figcaption-2");

    galleryFigcaption.forEach((figcaption) => {
        gsap.to(figcaption, {
            y: -20,
            duration: 3,
            scrollTrigger: {
                trigger: figcaption,
                start: "top bottom",
                end: "bottom 55%",
                scrub: true,
                // markers: true,
                onEnter: () => {
                    gsap.to(figcaption, { opacity: 1 });
                },
                onLeave: () => {
                    gsap.to(figcaption, { opacity: 0 });
                },
                onEnterBack: () => {
                    gsap.to(figcaption, { opacity: 1 });
                },
                onLeaveBack: () => {
                    gsap.to(figcaption, { opacity: 0 });
                }
            }
        });
    });

});