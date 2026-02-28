(() => {
    const body = document.body;
    const themeToggles = document.querySelectorAll("#theme-toggle, #mobile-theme-toggle");
    const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
    const mobileDrawer = document.getElementById("mobile-drawer");
    const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
    const mobileDrawerClose = document.getElementById("mobile-drawer-close");
    const mobileDrawerOverlay = document.getElementById("mobile-drawer-overlay");
    const sections = document.querySelectorAll("section[id]");
    const revealItems = document.querySelectorAll(".reveal");
    const eduItems = document.querySelectorAll(".edu-animate");
    const typeTargets = Array.from(document.querySelectorAll(".type-target")).filter((el) => {
        const textTags = ["P", "H1", "H2", "H3", "LI", "SPAN"];
        return textTags.includes(el.tagName) &&
            !el.closest(".exp-item, .project-showcase, .contact-shell, .edu-item") &&
            !["about-p1", "about-p2"].includes(el.id);
    });
    const aboutP1 = document.getElementById("about-p1");
    const aboutP2 = document.getElementById("about-p2");
    const aboutReadMoreBtn = document.getElementById("about-read-more");
    const aboutP1Full = (aboutP1?.textContent || "").trim();
    const aboutP2Full = (aboutP2?.textContent || "").trim();
    const aboutMobileLead = "I design and build scalable backend systems, REST APIs, and database-driven applications using Golang and modern development tools. I have contributed to production applications used by real users...";
    const heroVideo = document.querySelector(".background-video");
    const canvas = document.getElementById("bg-canvas");
    const track = document.getElementById("project-track");
    const viewport = document.getElementById("project-viewport");
    const slides = document.querySelectorAll(".project-card");
    const prevBtn = document.getElementById("prev-project");
    const nextBtn = document.getElementById("next-project");
    const sendBtn = document.getElementById("send-btn");
    const yearEl = document.getElementById("year");
    const toTopBtn = document.getElementById("to-top");
    const skillsTrack = document.getElementById("skills-track");

    let currentSlide = 0;
    let autoSlideTimer = null;
    let aboutSequenceStarted = false;
    let aboutExpanded = false;
    const isMobileProjectLayout = () => window.matchMedia("(max-width: 980px)").matches;
    const isSmallAboutScreen = () => window.matchMedia("(max-width: 640px)").matches;

    const closeMobileMenu = () => {
        body.classList.remove("mobile-menu-open");
        if (mobileMenuToggle) {
            mobileMenuToggle.setAttribute("aria-expanded", "false");
        }
    };

    const openMobileMenu = () => {
        body.classList.add("mobile-menu-open");
        if (mobileMenuToggle) {
            mobileMenuToggle.setAttribute("aria-expanded", "true");
        }
    };

    const setTheme = (theme) => {
        body.setAttribute("data-theme", theme);
        themeToggles.forEach((toggle) => {
            toggle.checked = theme === "light";
        });
    };

    const savedTheme = localStorage.getItem("portfolio-theme");
    setTheme(savedTheme || "dark");

    themeToggles.forEach((toggle) => {
        toggle.addEventListener("change", () => {
            const nextTheme = toggle.checked ? "light" : "dark";
            setTheme(nextTheme);
            localStorage.setItem("portfolio-theme", nextTheme);
        });
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const target = document.querySelector(link.getAttribute("href"));
            if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
            if (mobileDrawer?.contains(link)) {
                closeMobileMenu();
            }
        });
    });

    mobileMenuToggle?.addEventListener("click", () => {
        const isOpen = body.classList.contains("mobile-menu-open");
        if (isOpen) {
            closeMobileMenu();
            return;
        }
        openMobileMenu();
    });

    mobileDrawerClose?.addEventListener("click", closeMobileMenu);
    mobileDrawerOverlay?.addEventListener("click", closeMobileMenu);

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMobileMenu();
        }
    });

    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }
                const id = entry.target.getAttribute("id");
                navLinks.forEach((link) => {
                    link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
                });
            });
        },
        { rootMargin: "-42% 0px -46% 0px", threshold: 0.01 }
    );

    sections.forEach((section) => sectionObserver.observe(section));

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12 }
    );

    revealItems.forEach((el) => revealObserver.observe(el));

    const eduObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    eduItems.forEach((item, idx) => {
                        setTimeout(() => item.classList.add("show"), idx * 170);
                    });
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.3 }
    );

    const education = document.getElementById("education");
    if (education) {
        eduObserver.observe(education);
    }

    if (skillsTrack && !skillsTrack.dataset.loopReady) {
        const original = Array.from(skillsTrack.children);
        original.forEach((node) => {
            skillsTrack.appendChild(node.cloneNode(true));
        });
        skillsTrack.dataset.loopReady = "true";
    }

    const typeElement = (el, onDone) => {
        if (!el || el.dataset.typed === "true") {
            onDone?.();
            return;
        }
        const fullText = (el.dataset.fullText || el.textContent || "").trim();
        if (!fullText) {
            el.dataset.typed = "true";
            onDone?.();
            return;
        }
        el.dataset.fullText = fullText;
        el.textContent = "";
        el.classList.remove("seq-pending");
        el.classList.add("typing-active");
        let i = 0;
        const charDelay = Math.max(10, Math.min(26, 550 / fullText.length));
        const timer = setInterval(() => {
            el.textContent = fullText.slice(0, i + 1);
            i += 1;
            if (i >= fullText.length) {
                clearInterval(timer);
                el.classList.remove("typing-active");
                el.classList.add("typing-done");
                el.dataset.typed = "true";
                onDone?.();
            }
        }, charDelay);
    };

    const setAboutCopyForViewport = () => {
        if (!aboutP1 || !aboutP2) {
            return;
        }
        if (isSmallAboutScreen()) {
            aboutP1.dataset.fullText = aboutMobileLead;
            aboutP2.dataset.fullText = aboutP2Full;
            return;
        }
        aboutP1.dataset.fullText = aboutP1Full;
        aboutP2.dataset.fullText = aboutP2Full;
    };

    setAboutCopyForViewport();

    const runAboutSequence = () => {
        if (aboutSequenceStarted || !aboutP1 || !aboutP2) {
            return;
        }
        aboutSequenceStarted = true;
        if (aboutReadMoreBtn) {
            aboutReadMoreBtn.hidden = true;
        }
        if (isSmallAboutScreen()) {
            typeElement(aboutP1, () => {
                if (!aboutExpanded && aboutReadMoreBtn) {
                    aboutReadMoreBtn.hidden = false;
                }
            });
            return;
        }
        typeElement(aboutP1, () => typeElement(aboutP2));
    };

    const typeObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    typeElement(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    typeTargets.forEach((el) => typeObserver.observe(el));

    const aboutObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    runAboutSequence();
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.2 }
    );

    const aboutSection = document.getElementById("about-me");
    if (aboutSection) {
        aboutObserver.observe(aboutSection);
    }

    aboutReadMoreBtn?.addEventListener("click", () => {
        if (!aboutExpanded) {
            aboutExpanded = true;
            if (aboutP1) {
                aboutP1.textContent = aboutP1Full;
                aboutP1.dataset.fullText = aboutP1Full;
                aboutP1.dataset.typed = "true";
                aboutP1.classList.remove("typing-active", "seq-pending");
                aboutP1.classList.add("typing-done");
            }
            aboutP2?.classList.add("show");
            aboutReadMoreBtn.textContent = "Read less";
            typeElement(aboutP2);
            return;
        }

        aboutExpanded = false;
        aboutP2?.classList.remove("show");
        if (aboutP2) {
            aboutP2.textContent = "";
            aboutP2.dataset.typed = "false";
            aboutP2.classList.add("seq-pending");
            aboutP2.classList.remove("typing-active", "typing-done");
        }
        aboutReadMoreBtn.textContent = "Read more";
    });

    const getSlideStepPx = () => {
        if (!slides.length) {
            return 0;
        }
        const style = window.getComputedStyle(track);
        const gap = parseFloat(style.columnGap || style.gap || "0");
        return slides[0].getBoundingClientRect().width + gap;
    };

    const normalizeSlideIndex = (nextIndex) => {
        if (nextIndex < 0) {
            return slides.length - 1;
        }
        if (nextIndex >= slides.length) {
            return 0;
        }
        return nextIndex;
    };

    const showSlide = (nextIndex) => {
        if (!track || !slides.length || !viewport) {
            return;
        }
        currentSlide = normalizeSlideIndex(nextIndex);
        if (isMobileProjectLayout()) {
            track.style.transform = "translateX(0)";
            slides.forEach((slide, idx) => {
                slide.classList.toggle("active", idx === currentSlide);
            });
            return;
        }
        const step = getSlideStepPx();
        const cardWidth = slides[0].getBoundingClientRect().width;
        const viewportWidth = viewport.getBoundingClientRect().width;
        const contentWidth = step * (slides.length - 1) + cardWidth;
        const maxShift = Math.max(0, contentWidth - viewportWidth);
        const rawShift = currentSlide * step;
        const shift = Math.min(maxShift, Math.max(0, rawShift));
        track.style.transform = `translateX(${-shift}px)`;

        slides.forEach((slide, idx) => {
            slide.classList.toggle("active", idx === currentSlide);
        });
    };

    const startAutoSlide = () => {
        if (!slides.length) {
            return;
        }
        clearInterval(autoSlideTimer);
        if (isMobileProjectLayout()) {
            return;
        }
        autoSlideTimer = setInterval(() => showSlide(currentSlide + 1), 5000);
    };

    nextBtn?.addEventListener("click", () => {
        showSlide(currentSlide + 1);
        startAutoSlide();
    });

    prevBtn?.addEventListener("click", () => {
        showSlide(currentSlide - 1);
        startAutoSlide();
    });

    startAutoSlide();

    slides.forEach((slide) => {
        slide.addEventListener("click", () => {
            const link = slide.getAttribute("data-link");
            if (link) {
                window.open(link, "_blank", "noopener");
            }
        });
    });

    document.querySelectorAll(".project-open").forEach((btn) => {
        btn.addEventListener("click", (event) => {
            event.stopPropagation();
        });
    });

    window.addEventListener("resize", () => {
        setAboutCopyForViewport();
        showSlide(currentSlide);
        startAutoSlide();
        if (!isSmallAboutScreen()) {
            aboutP2?.classList.add("show");
            if (aboutReadMoreBtn) {
                aboutReadMoreBtn.hidden = true;
                aboutReadMoreBtn.textContent = "Read more";
            }
            if (aboutSequenceStarted) {
                aboutP1.textContent = aboutP1Full;
                aboutP2.textContent = aboutP2Full;
                aboutP1.dataset.typed = "true";
                aboutP2.dataset.typed = "true";
                aboutP1.classList.remove("typing-active", "seq-pending");
                aboutP2.classList.remove("typing-active", "seq-pending");
                aboutP1.classList.add("typing-done");
                aboutP2.classList.add("typing-done");
            }
        } else if (aboutP1?.dataset.typed === "true") {
            aboutP1.textContent = aboutMobileLead;
            aboutP1.dataset.typed = "true";
            aboutP1.classList.remove("typing-active", "seq-pending");
            aboutP1.classList.add("typing-done");
            if (!aboutExpanded) {
                aboutP2?.classList.remove("show");
                if (aboutP2) {
                    aboutP2.textContent = "";
                    aboutP2.dataset.typed = "false";
                    aboutP2.classList.add("seq-pending");
                }
            } else {
                aboutP2?.classList.add("show");
            }
            if (aboutReadMoreBtn) {
                aboutReadMoreBtn.hidden = false;
                aboutReadMoreBtn.textContent = aboutExpanded ? "Read less" : "Read more";
            }
        }
        if (window.innerWidth > 980) {
            closeMobileMenu();
        }
    });
    showSlide(0);

    window.addEventListener("scroll", () => {
        const y = window.scrollY;
        if (heroVideo) {
            const value = Math.min(y * 0.07, 24);
            heroVideo.style.transform = `scale(1.07) translateY(${value}px)`;
        }

        if (toTopBtn) {
            const show = y > window.innerHeight * 0.5;
            toTopBtn.classList.toggle("show", show);
        }
    });

    toTopBtn?.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    sendBtn?.addEventListener("click", () => {
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();
        const toEmail = "vasant.24konar@gmail.com";

        if (!name || !email || !message) {
            alert("Please fill in all fields.");
            return;
        }

        emailjs
            .send(
                "service_krk1nkk",
                "template_9nb0kjq",
                {
                    to_email: toEmail,
                    from_name: name,
                    from_email: email,
                    reply_to: email,
                    subject: `Portfolio contact from ${name}`,
                    message: message,
                }
            )
            .then(() => {
                alert("Message sent successfully.");
                document.getElementById("contact-form").reset();
            })
            .catch((error) => {
                console.error("EmailJS error:", error);
                const reason = error?.text || error?.message || "Unknown error";
                alert(`Failed to send notification: ${reason}`);
            });
    });

    if (yearEl) {
        yearEl.textContent = String(new Date().getFullYear());
    }

    const initCanvas = () => {
        if (!canvas) {
            return;
        }
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            return;
        }

        const dpr = window.devicePixelRatio || 1;
        const pointer = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5, active: false, t: 0 };
        let width = 0;
        let height = 0;
        let points = [];

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            const gap = Math.max(34, Math.round(width / 18));
            points = [];
            for (let y = -gap; y < height + gap; y += gap) {
                for (let x = -gap; x < width + gap; x += gap) {
                    points.push({ x, y, ox: x, oy: y, r: Math.random() * Math.PI });
                }
            }
        };

        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", (e) => {
            pointer.x = e.clientX;
            pointer.y = e.clientY;
            pointer.active = true;
            pointer.t = Date.now();
        });

        const draw = (time) => {
            ctx.clearRect(0, 0, width, height);
            const dark = body.getAttribute("data-theme") === "dark";
            const idle = Date.now() - pointer.t > 180;
            const hoverPower = idle ? 0 : 1;

            for (let i = 0; i < points.length; i += 1) {
                const p = points[i];
                const dx = pointer.x - p.x;
                const dy = pointer.y - p.y;
                const dist = Math.hypot(dx, dy) || 1;
                const force = Math.max(0, 1 - dist / 240) * hoverPower;
                const angle = Math.atan2(dy, dx);

                p.x += (p.ox + Math.cos(time * 0.0006 + p.r) * 1.8 - p.x) * 0.05;
                p.y += (p.oy + Math.sin(time * 0.0006 + p.r) * 1.8 - p.y) * 0.05;

                const tx = p.x - Math.cos(angle) * force * 9;
                const ty = p.y - Math.sin(angle) * force * 9;

                const hue = 220 + (p.y / Math.max(1, height)) * 85;
                const baseAlpha = dark ? 0.18 : 0.12;
                const alpha = Math.min(0.95, baseAlpha + force * (dark ? 0.8 : 0.62));
                const sat = dark ? 92 : 90;
                const light = dark ? 67 : 53;

                ctx.strokeStyle = `hsla(${hue}, ${sat}%, ${light}%, ${alpha})`;
                ctx.lineWidth = dark ? 2.2 : 1.9;
                ctx.beginPath();
                ctx.moveTo(tx - 1.7, ty - 1.7);
                ctx.lineTo(tx + 1.7, ty + 1.7);
                ctx.stroke();
            }
            requestAnimationFrame(draw);
        };

        resize();
        requestAnimationFrame(draw);
    };

    initCanvas();
})();
