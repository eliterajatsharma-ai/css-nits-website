/* =========================================================
   CSS NITS DIGITAL REALM
   FINAL CLEAN SCRIPT
   ========================================================= */


/* =========================================================
   LOADER
   ========================================================= */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if (!loader) return;

    setTimeout(() => {

        loader.style.opacity = "0";

        setTimeout(() => {
            loader.style.display = "none";
        }, 800);

    }, 1000);

});


/* =========================================================
   HERO
   ========================================================= */

const heroBg =
    document.querySelector(".hero-bg");

const heroContent =
    document.querySelector(".hero-content");

const sword =
    document.querySelector(".sword-container");

const heroParticles =
    document.querySelector(".particles");


document.addEventListener("mousemove", (e) => {

    if (window.innerWidth <= 800) return;

    const x =
        e.clientX / window.innerWidth - 0.5;

    const y =
        e.clientY / window.innerHeight - 0.5;


    /* HERO BACKGROUND */

    if (heroBg) {

        heroBg.style.transform =
            `scale(1.05)
             translate(${x * -12}px, ${y * -8}px)`;

    }


    /* HERO CONTENT */

    if (heroContent) {

        heroContent.style.transform =
            `translate(${x * 8}px, ${y * 5}px)`;

    }


    /* SWORD */

    if (sword) {

        const rotation =
            18 + x * 8;

        const moveX =
            x * 18;

        const moveY =
            y * 18;

        sword.style.transform =
            `translate(${moveX}px,
             calc(-50% + ${moveY}px))
             rotate(${rotation}deg)`;

    }


    /* HERO PARTICLES */

    if (heroParticles) {

        heroParticles.style.setProperty(
            "--mouse-x",
            `${x * 35}px`
        );

        heroParticles.style.setProperty(
            "--mouse-y",
            `${y * 35}px`
        );

    }

});


/* =========================================================
   HERO SCROLL
   ========================================================= */

window.addEventListener("scroll", () => {

    const scroll =
        window.scrollY;


    if (heroBg) {

        heroBg.style.backgroundPosition =
            `center ${scroll * 0.15}px`;

    }


    if (heroContent) {

        heroContent.style.opacity =
            Math.max(
                0,
                1 - scroll / 500
            );

    }


    if (
        sword &&
        window.innerWidth > 800
    ) {

        const rotation =
            18 + scroll * 0.12;

        const moveX =
            scroll * 0.08;

        sword.style.transform =
            `translate(${moveX}px, -50%)
             rotate(${rotation}deg)`;

    }

});


/* =========================================================
   SECTION REVEAL
   ========================================================= */

const sections =
    document.querySelectorAll(".section");


if ("IntersectionObserver" in window) {

    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.style.opacity =
                            "1";

                        entry.target.style.transform =
                            "translateY(0)";

                    }

                });

            }, {
                threshold: 0.15
            }
        );


    sections.forEach((section) => {

        section.style.opacity =
            "0";

        section.style.transform =
            "translateY(40px)";

        section.style.transition =
            "opacity 1s ease, transform 1s ease";

        observer.observe(section);

    });

}


/* =========================================================
   MOBILE MENU
   ========================================================= */

const menuBtn =
    document.querySelector(".menu-btn");

const navLinks =
    document.querySelector(".nav-links");


if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

        if (
            navLinks.style.display ===
            "flex"
        ) {

            navLinks.style.display =
                "none";

        } else {

            navLinks.style.display =
                "flex";

            navLinks.style.flexDirection =
                "column";

            navLinks.style.position =
                "absolute";

            navLinks.style.top =
                "70px";

            navLinks.style.right =
                "20px";

            navLinks.style.padding =
                "20px";

            navLinks.style.gap =
                "20px";

            navLinks.style.background =
                "rgba(5,8,20,0.95)";

            navLinks.style.backdropFilter =
                "blur(15px)";

        }

    });

}


/* =========================================================
   HERO PARTICLES GENERATOR
   ========================================================= */

function createFloatingParticles(
    container,
    className,
    count = 60
) {

    if (!container) return;


    for (let i = 0; i < count; i++) {

        const particle =
            document.createElement("span");


        particle.classList.add(
            className
        );


        particle.style.left =
            Math.random() * 100 + "%";


        particle.style.top =
            Math.random() * 100 + "%";


        particle.style.setProperty(
            "--drift",
            `${-80 + Math.random() * 160}px`
        );


        particle.style.setProperty(
            "--duration",
            `${8 + Math.random() * 15}s`
        );


        particle.style.animationDelay =
            `${Math.random() * 15}s`;


        const size =
            1 + Math.random() * 3;


        particle.style.width =
            `${size}px`;


        particle.style.height =
            `${size}px`;


        container.appendChild(
            particle
        );

    }

}


createFloatingParticles(
    heroParticles,
    "particle",
    70
);


/* =========================================================
   COMMON PARALLAX SYSTEM
   ========================================================= */

function setupParallaxSection(
    sectionSelector,
    backgroundSelector,
    particlesSelector,
    particleCount = 60,
    bgMoveX = 12,
    bgMoveY = 12,
    particleMove = 45
) {

    const section =
        document.querySelector(
            sectionSelector
        );


    const background =
        document.querySelector(
            backgroundSelector
        );


    const particleLayer =
        document.querySelector(
            particlesSelector
        );


    if (!section) return;


    /* -------------------------
       PARTICLES
       ------------------------- */

    createFloatingParticles(
        particleLayer,
        "section-particle",
        particleCount
    );


    /* -------------------------
       MOUSE PARALLAX
       ------------------------- */

    section.addEventListener(
        "mousemove",
        (e) => {

            if (
                window.innerWidth <= 800
            ) return;


            const rect =
                section.getBoundingClientRect();


            const x =
                (e.clientX - rect.left) /
                rect.width - 0.5;


            const y =
                (e.clientY - rect.top) /
                rect.height - 0.5;


            /* BACKGROUND */

            if (background) {

                background.style.transform =
                    `translate(
                        ${-x * bgMoveX}px,
                        ${-y * bgMoveY}px
                    )
                    scale(1.06)`;

            }


            /* PARTICLES */

            if (particleLayer) {

                particleLayer.style.setProperty(
                    "--mouse-x",
                    `${x * particleMove}px`
                );


                particleLayer.style.setProperty(
                    "--mouse-y",
                    `${y * particleMove}px`
                );

            }

        }
    );


    /* -------------------------
       RESET
       ------------------------- */

    section.addEventListener(
        "mouseleave",
        () => {

            if (background) {

                background.style.transform =
                    "translate(0, 0) scale(1.04)";

            }


            if (particleLayer) {

                particleLayer.style.setProperty(
                    "--mouse-x",
                    "0px"
                );


                particleLayer.style.setProperty(
                    "--mouse-y",
                    "0px"
                );

            }

        }
    );

}


/* =========================================================
   ABOUT
   HERO STYLE PARALLAX
   ========================================================= */

setupParallaxSection(
    ".about",
    ".about-world-image",
    ".about-particles",
    60,
    18,
    18,
    45
);


/* ABOUT CONTENT */

const aboutSection =
    document.querySelector(".about");

const aboutContent =
    document.querySelector(
        ".about-main"
    );

const crystal =
    document.querySelector(
        ".realm-crystal"
    );


if (aboutSection) {

    aboutSection.addEventListener(
        "mousemove",
        (e) => {

            if (
                window.innerWidth <= 800
            ) return;


            const rect =
                aboutSection.getBoundingClientRect();


            const x =
                (e.clientX - rect.left) /
                rect.width - 0.5;


            const y =
                (e.clientY - rect.top) /
                rect.height - 0.5;


            if (aboutContent) {

                aboutContent.style.transform =
                    `translate(
                        ${x * 8}px,
                        ${y * 8}px
                    )`;

            }


            if (crystal) {

                crystal.style.setProperty(
                    "--mx",
                    `${-x * 18}px`
                );


                crystal.style.setProperty(
                    "--my",
                    `${-y * 18}px`
                );

            }

        }
    );


    aboutSection.addEventListener(
        "mouseleave",
        () => {

            if (aboutContent) {

                aboutContent.style.transform =
                    "translate(0,0)";

            }


            if (crystal) {

                crystal.style.setProperty(
                    "--mx",
                    "0px"
                );

                crystal.style.setProperty(
                    "--my",
                    "0px"
                );

            }

        }
    );

}


/* =========================================================
   PILLARS
   BACKGROUND + PARTICLES
   ========================================================= */

setupParallaxSection(
    ".pillars",
    ".pillars-bg",
    ".pillars-particles",
    70,
    35,
    25,
    55
);


/* =========================================================
   PILLARS CARD TILT
   ========================================================= */

const pillarsSection =
    document.querySelector(
        ".pillars"
    );

const pillarCards =
    document.querySelectorAll(
        ".pillar"
    );


if (pillarsSection) {

    pillarsSection.addEventListener(
        "mousemove",
        (e) => {

            if (
                window.innerWidth <= 800
            ) return;


            pillarCards.forEach(
                (card) => {

                    const rect =
                        card.getBoundingClientRect();


                    const cardX =
                        e.clientX -
                        rect.left;


                    const cardY =
                        e.clientY -
                        rect.top;


                    const rotateY =
                        ((cardX / rect.width) -
                            0.5) * 7;


                    const rotateX =
                        ((cardY / rect.height) -
                            0.5) * -7;


                    if (
                        card.matches(
                            ":hover"
                        )
                    ) {

                        card.style.transform =
                            `translateY(-14px)
                             scale(1.025)
                             rotateX(${rotateX}deg)
                             rotateY(${rotateY}deg)`;

                    }

                }
            );

        }
    );


    pillarsSection.addEventListener(
        "mouseleave",
        () => {

            pillarCards.forEach(
                (card) => {

                    card.style.transform =
                        "";

                }
            );

        }
    );

}


/* =========================================================
   DEVELOPERS
   HERO STYLE PARALLAX + PARTICLES
   ========================================================= */

setupParallaxSection(
    ".developers",
    ".developers-bg",
    ".developers-particles",
    65,
    30,
    22,
    55
);


/* =========================================================
   DEVELOPERS CARDS
   SAME INTERACTION AS PILLARS
   ========================================================= */

const developersSection =
    document.querySelector(
        ".developers"
    );


const developerCards =
    document.querySelectorAll(
        ".developer-card"
    );


if (developersSection) {

    developersSection.addEventListener(
        "mousemove",
        (e) => {

            if (
                window.innerWidth <= 800
            ) return;


            developerCards.forEach(
                (card) => {

                    const rect =
                        card.getBoundingClientRect();


                    const cardX =
                        e.clientX -
                        rect.left;


                    const cardY =
                        e.clientY -
                        rect.top;


                    const rotateY =
                        ((cardX / rect.width) -
                            0.5) * 7;


                    const rotateX =
                        ((cardY / rect.height) -
                            0.5) * -7;


                    if (
                        card.matches(
                            ":hover"
                        )
                    ) {

                        card.style.transform =
                            `translateY(-14px)
                             scale(1.025)
                             rotateX(${rotateX}deg)
                             rotateY(${rotateY}deg)`;

                    }

                }
            );

        }
    );


    developersSection.addEventListener(
        "mouseleave",
        () => {

            developerCards.forEach(
                (card) => {

                    card.style.transform =
                        "";

                }
            );

        }
    );

}


/* =========================================================
   EVENTS
   ========================================================= */

setupParallaxSection(
    ".events",
    ".events-bg",
    ".events-particles",
    55,
    30,
    22,
    45
);


/* =========================================================
   ANNOUNCEMENTS
   ========================================================= */

setupParallaxSection(
    ".announcements",
    ".announcements-bg",
    ".announcements-particles",
    60,
    25,
    20,
    45
);


/* =========================================================
   SPONSORS
   ========================================================= */

setupParallaxSection(
    ".sponsors",
    ".sponsors-bg",
    ".sponsors-particles",
    70,
    25,
    20,
    45
);


/* =========================================================
   COMMUNITY
   ========================================================= */

setupParallaxSection(
    ".community",
    ".community-bg",
    ".community-particles",
    70,
    25,
    20,
    45
);


/* =========================================================
   GALLERY
   ========================================================= */

setupParallaxSection(
    ".gallery",
    ".gallery-bg",
    ".gallery-particles",
    60,
    25,
    20,
    45
);


/* =========================================================
   END
   ========================================================= */