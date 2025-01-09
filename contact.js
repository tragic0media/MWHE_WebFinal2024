

document.addEventListener("DOMContentLoaded", function () {
    
    // Inicializar Lenis.js para scroll suave
    const lenis = new Lenis({
        smooth: true,
        smoothWheel: true,
        wheelMultiplier: 0.8,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Registrar GSAP y ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    const setupScrollTrigger = () => {
        const isSmallScreen = window.matchMedia('(max-width: 768px)').matches;

        // Eliminar triggers existentes
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());

        if (isSmallScreen) {

            ScrollTrigger.create({
                trigger: ".scroll-container-mobile",
                start: "top top",
                end: "65%",
                scrub: true,
            });

            ScrollTrigger.create({
                trigger: ".scroll-container-mobile",
                start: "top top",
                end: "65%",
                pin: ".scroll-container-desktop",
            });

        } else {
            
            ScrollTrigger.create({
                trigger: ".scroll-container-desktop",
                start: "top top",
                end: "65%",
                pin: true,
                scrub: true,
            });
        }

        // Configurar animaciones de "We do"
        const weDoOptions = document.querySelectorAll("#weDoOptions p");
        weDoOptions.forEach((el) => {
            ScrollTrigger.create({
                trigger: el,
                start: "top 25%",
                end: "bottom 23%",
                toggleClass: { targets: el, className: "active" },
                scrub: true,
            });
        });

        // Configurar animaciones de "With"
        const withOptions = document.querySelectorAll("#withOptions p");
        withOptions.forEach((el) => {
            ScrollTrigger.create({
                trigger: el,
                start: "top 25%",
                end: "bottom 23%",
                toggleClass: { targets: el, className: "active" },
                scrub: true,
            });
        });
    };

    setupScrollTrigger();

    window.addEventListener('resize', setupScrollTrigger);

    // Animacion texto
    const texts = document.querySelectorAll(".animated-text");

    texts.forEach((text) => {

        const textContent = text.textContent;
        text.innerHTML = textContent
            .split("")
            .map((char) => `<span>${char}</span>`)
            .join("");

        const spans = text.querySelectorAll("span");

        // Aplica la animación a cada span
        gsap.fromTo(
            spans,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power2.out",
            }
        );
    });
});
