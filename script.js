document.addEventListener('DOMContentLoaded', () => {
    // DOM Element References
    const pageLoader = document.getElementById('page-loader');
    const errorMessage = document.getElementById('error-message');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    // Mobile Menu Logic
    function initializeMobileMenu() {
        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                const isHidden = mobileMenu.classList.contains('hidden');
                mobileMenu.classList.toggle('hidden');
                mobileMenuButton.setAttribute('aria-expanded', !isHidden);
                
                // Change icon based on state
                const icon = mobileMenuButton.querySelector('.material-symbols-outlined');
                if (icon) {
                    icon.textContent = isHidden ? 'close' : 'menu';
                }
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (event) => {
                if (!mobileMenu.contains(event.target) && 
                    !mobileMenuButton.contains(event.target) && 
                    !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    mobileMenuButton.setAttribute('aria-expanded', 'false');
                    const icon = mobileMenuButton.querySelector('.material-symbols-outlined');
                    if (icon) icon.textContent = 'menu';
                }
            });
        }
    }

    // Initialize mobile menu immediately
    initializeMobileMenu();

    // Helper Functions
    const setText = (id, text, isHTML = false) => {
        const element = document.getElementById(id);
        if (element) {
            if (isHTML) {
                element.innerHTML = text;
            } else {
                element.textContent = text;
            }
        }
    };

    const createLink = (text, href, classes = [], icon = null, ariaLabel = null) => {
        const a = document.createElement('a');
        a.href = href;
        a.classList.add(...classes);
        
        if (ariaLabel) {
            a.setAttribute('aria-label', ariaLabel);
        }
        
        if (icon) {
            const spanIcon = document.createElement('span');
            spanIcon.classList.add('material-symbols-outlined');
            spanIcon.setAttribute('aria-hidden', 'true');
            spanIcon.textContent = icon;
            spanIcon.classList.add('text-base');
            a.appendChild(spanIcon);
            a.appendChild(document.createTextNode(` ${text}`));
        } else {
            a.textContent = text;
        }
        return a;
    };

    // Show error state
    function showError() {
        if (pageLoader) {
            pageLoader.style.opacity = '0';
            setTimeout(() => pageLoader.style.display = 'none', 300);
        }
        if (errorMessage) {
            errorMessage.classList.remove('hidden');
        }
    }

    // Hide loader with animation
    function hideLoader() {
        if (pageLoader) {
            pageLoader.style.opacity = '0';
            pageLoader.style.transform = 'scale(0.95)';
            setTimeout(() => {
                pageLoader.style.display = 'none';
                // Trigger scroll animations after page loads
                initScrollAnimations();
            }, 300);
        }
    }

    // Scroll Animations using Intersection Observer
    function initScrollAnimations() {
        const scrollElements = document.querySelectorAll('.scroll-animate');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        scrollElements.forEach(el => observer.observe(el));
    }

    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    const themeIcon = document.getElementById('theme-icon');
    const themeIconMobile = document.getElementById('theme-icon-mobile');

    function setTheme(theme) {
        const html = document.documentElement;
        if (theme === 'dark') {
            html.classList.add('dark');
            if (themeIcon) { themeIcon.textContent = 'light_mode'; themeIcon.classList.add('theme-toggle-animate'); }
            if (themeIconMobile) { themeIconMobile.textContent = 'light_mode'; themeIconMobile.classList.add('theme-toggle-animate'); }
        } else {
            html.classList.remove('dark');
            if (themeIcon) { themeIcon.textContent = 'dark_mode'; themeIcon.classList.add('theme-toggle-animate'); }
            if (themeIconMobile) { themeIconMobile.textContent = 'dark_mode'; themeIconMobile.classList.add('theme-toggle-animate'); }
        }
        localStorage.setItem('theme', theme);
        
        // Remove animation class after animation completes
        setTimeout(() => {
            if (themeIcon) themeIcon.classList.remove('theme-toggle-animate');
            if (themeIconMobile) themeIconMobile.classList.remove('theme-toggle-animate');
        }, 300);
    }

    function toggleTheme() {
        const isDark = document.documentElement.classList.contains('dark');
        setTheme(isDark ? 'light' : 'dark');
    }

    // Load saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);

    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
    if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);

    // 3D Tubes Background Initialization (Hero section only)
    let tubesInstance = null;

    function initTubesBackground() {
        const canvas = document.getElementById('tubes-canvas');
        const wrapper = document.getElementById('tubes-wrapper');
        if (!canvas || !wrapper) return;

        // Use dynamic import like the reference implementation
        const initTubes = async () => {
            try {
                const module = await import('https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js');
                const TubesCursor = module.default;

                tubesInstance = TubesCursor(canvas, {
                    tubes: {
                        colors: ["#f967fb", "#53bc28", "#6958d5"],
                        lights: {
                            intensity: 200,
                            colors: ["#83f36e", "#fe8a2e", "#ff008a", "#60aed5"]
                        }
                    }
                });

                // Click wrapper to randomize colors
                wrapper.addEventListener('click', () => {
                    if (!tubesInstance) return;
                    
                    const randomColors = (count) => {
                        return Array(count).fill(0).map(() => 
                            "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
                        );
                    };
                    
                    tubesInstance.tubes.setColors(randomColors(3));
                    tubesInstance.tubes.setLightsColors(randomColors(4));
                });

            } catch (error) {
                console.error('Failed to initialize tubes:', error);
            }
        };

        initTubes();
    }

    initTubesBackground();

    // Validate required data fields
    function validateData(data) {
        const requiredFields = ['personalInfo', 'navbar', 'about', 'skills', 'projects', 'philosophy', 'contact'];
        const missingFields = requiredFields.filter(field => !data[field]);
        
        if (missingFields.length > 0) {
            throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
        }
        
        // Validate personalInfo sub-fields
        const personalInfoFields = ['name', 'role', 'opportunityStatus', 'email', 'githubUrl', 'linkedinUrl'];
        const missingPersonalInfo = personalInfoFields.filter(field => !data.personalInfo[field]);
        
        if (missingPersonalInfo.length > 0) {
            console.warn(`Missing personalInfo fields: ${missingPersonalInfo.join(', ')}`);
        }
        
        return true;
    }

    // Fetch and render content
    fetch('content.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            try {
                // Validate data structure
                validateData(data);

                // Page Title
                if (data.personalInfo.name && data.personalInfo.role) {
                    setText('page-title', `${data.personalInfo.name} - ${data.personalInfo.role}`);
                }

                // Navbar
                if (data.navbar.logoText) {
                    setText('navbar-logo', data.navbar.logoText, true);
                }

                // Desktop Navbar Links
                const navbarLinksContainer = document.getElementById('navbar-links');
                if (navbarLinksContainer && data.navbar.links) {
                    data.navbar.links.forEach(link => {
                        if (link.text && link.href) {
                            const a = createLink(
                                link.text, 
                                link.href, 
                                ['text-sm', 'font-medium', 'text-text-muted', 'hover:text-white', 'transition-colors', 'focus:outline-none', 'focus:text-white'],
                                null,
                                `Navigate to ${link.text}`
                            );
                            navbarLinksContainer.appendChild(a);
                        }
                    });
                }

                // Mobile Navbar Links
                const mobileNavLinksContainer = mobileMenu?.querySelector('nav');
                if (mobileNavLinksContainer && data.navbar.links) {
                    mobileNavLinksContainer.innerHTML = '';
                    data.navbar.links.forEach(link => {
                        if (link.text && link.href) {
                            const a = createLink(
                                link.text,
                                link.href,
                                ['text-base', 'font-medium', 'text-text-muted', 'hover:text-white', 'transition-colors', 'w-full', 'text-center', 'py-2', 'focus:outline-none', 'focus:text-white'],
                                null,
                                `Navigate to ${link.text}`
                            );
                            a.addEventListener('click', () => {
                                mobileMenu.classList.add('hidden');
                                mobileMenuButton.setAttribute('aria-expanded', 'false');
                                const icon = mobileMenuButton.querySelector('.material-symbols-outlined');
                                if (icon) icon.textContent = 'menu';
                            });
                            mobileNavLinksContainer.appendChild(a);
                        }
                    });
                }

                // Hero Section
                if (data.personalInfo.opportunityStatus) {
                    setText('opportunity-status', data.personalInfo.opportunityStatus);
                }
                if (data.personalInfo.name) {
                    setText('hero-name', data.personalInfo.name);
                }
                if (data.personalInfo.role) {
                    setText('hero-role', data.personalInfo.role);
                }
                if (data.personalInfo.heroTagline) {
                    setText('hero-tagline', data.personalInfo.heroTagline);
                }

                // Hero CTAs
                const heroCtasContainer = document.getElementById('hero-ctas');
                if (heroCtasContainer) {
                    if (data.heroSection?.primaryCta) {
                        const primaryCta = createLink(
                            data.heroSection.primaryCta.text,
                            data.heroSection.primaryCta.href,
                            ['flex', 'items-center', 'justify-center', 'px-6', 'py-3', 'bg-primary', 'hover:bg-primary-hover', 'text-white', 'text-base', 'font-bold', 'rounded-lg', 'transition-all', 'shadow-lg', 'shadow-primary/20', 'focus:outline-none', 'focus:ring-2', 'focus:ring-primary/50'],
                            null,
                            data.heroSection.primaryCta.text
                        );
                        heroCtasContainer.appendChild(primaryCta);
                    }

                    if (data.personalInfo.githubUrl && data.heroSection?.secondaryCta) {
                        const secondaryCta = document.createElement('a');
                        secondaryCta.href = data.personalInfo.githubUrl;
                        secondaryCta.setAttribute('aria-label', 'View GitHub Profile');
                        secondaryCta.classList.add('flex', 'items-center', 'justify-center', 'px-6', 'py-3', 'bg-card', 'dark:bg-card-dark', 'border', 'border-border-color', 'dark:border-border-color-dark', 'hover:border-text-muted', 'dark:hover:border-text-muted-dark', 'text-text-main', 'dark:text-white', 'text-base', 'font-bold', 'rounded-lg', 'transition-all', 'group', 'focus:outline-none', 'focus:ring-2', 'focus:ring-border-color', 'dark:focus:ring-border-color-dark');
                        secondaryCta.innerHTML = `<span class="mr-2">${data.heroSection.secondaryCta.text}</span><span class="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform" aria-hidden="true">arrow_forward</span>`;
                        heroCtasContainer.appendChild(secondaryCta);
                    }
                }

                // About Section
                if (data.about.titlePrefix && data.about.title) {
                    setText('about-title', `${data.about.titlePrefix} ${data.about.title}`);
                }
                if (data.about.heading) {
                    setText('about-heading', data.about.heading);
                }
                
                const aboutParagraphsContainer = document.getElementById('about-paragraphs');
                if (aboutParagraphsContainer && data.about.paragraphs) {
                    data.about.paragraphs.forEach(pText => {
                        const p = document.createElement('p');
                        p.classList.add('mb-6');
                        p.innerHTML = pText;
                        aboutParagraphsContainer.appendChild(p);
                    });
                }

                // Skills Section
                if (data.skills.titlePrefix && data.skills.title) {
                    setText('skills-title', `${data.skills.titlePrefix} ${data.skills.title}`);
                }
                
                const skillsGridContainer = document.getElementById('skills-grid');
                if (skillsGridContainer && data.skills.categories) {
                    data.skills.categories.forEach(category => {
                        const skillBlock = document.createElement('div');
                        skillBlock.classList.add('bg-card', 'dark:bg-card-dark', 'border', 'border-border-color', 'dark:border-border-color-dark', 'rounded-xl', 'p-6', 'hover:border-primary/50', 'transition-colors');

                        const header = document.createElement('div');
                        header.classList.add('flex', 'items-center', 'gap-3', 'mb-4');
                        header.innerHTML = `<span class="material-symbols-outlined text-primary" aria-hidden="true">${category.icon || 'code'}</span><h4 class="text-lg font-bold font-display text-text-main dark:text-white">${category.name}</h4>`;
                        skillBlock.appendChild(header);

                        const itemsContainer = document.createElement('div');
                        itemsContainer.classList.add('flex', 'flex-wrap', 'gap-2');
                        
                        if (category.items) {
                            category.items.forEach(item => {
                                const span = document.createElement('span');
                                span.classList.add('px-3', 'py-1', 'bg-background', 'dark:bg-background-dark', 'border', 'border-border-color', 'dark:border-border-color-dark', 'rounded', 'text-xs', 'font-mono', 'text-text-muted', 'dark:text-text-muted-dark', 'hover:text-text-main', 'dark:hover:text-white', 'hover:border-accent', 'dark:hover:border-accent-dark', 'transition-colors');
                                span.textContent = item;
                                itemsContainer.appendChild(span);
                            });
                        }
                        
                        skillBlock.appendChild(itemsContainer);
                        skillsGridContainer.appendChild(skillBlock);
                    });
                }

                // Projects Section
                if (data.projects.titlePrefix && data.projects.title) {
                    setText('projects-title', `${data.projects.titlePrefix} ${data.projects.title}`);
                }
                
                const projectsListContainer = document.getElementById('projects-list');
                if (projectsListContainer && data.projects.list) {
                    if (data.projects.list.length === 0) {
                        // Empty state - Terminal aesthetic
                        const emptyStateDiv = document.createElement('div');
                        emptyStateDiv.classList.add('bg-card-dark', 'border', 'border-border-color', 'rounded-lg', 'p-8', 'font-mono', 'text-sm');
                        emptyStateDiv.innerHTML = `
                            <div class="flex gap-2 mb-4" aria-hidden="true">
                                <div class="w-3 h-3 rounded-full bg-red-500"></div>
                                <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div class="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <div class="text-text-muted">
                                <span class="text-accent">$</span> ls projects<br/>
                                <span class="text-text-muted italic">No projects found</span>
                            </div>
                        `;
                        projectsListContainer.appendChild(emptyStateDiv);
                    } else {
                        data.projects.list.forEach((project, index) => {
                        const projectDiv = document.createElement('article');
                        projectDiv.classList.add('group');

                        const titleDiv = document.createElement('div');
                        titleDiv.classList.add('flex', 'flex-col', 'md:flex-row', 'gap-2', 'items-baseline', 'mb-2');
                        titleDiv.innerHTML = `<h4 class="text-2xl font-bold font-display text-text-main dark:text-white group-hover:text-primary transition-colors">${project.title}</h4><span class="text-sm font-mono text-text-muted dark:text-text-muted-dark">${project.tagline}</span>`;
                        projectDiv.appendChild(titleDiv);

                        const techDiv = document.createElement('div');
                        techDiv.classList.add('flex', 'flex-wrap', 'gap-2', 'mb-4');
                        
                        if (project.technologies) {
                            project.technologies.forEach(tech => {
                                const span = document.createElement('span');
                                span.classList.add('text-xs', 'font-mono', 'text-accent', 'bg-accent/10', 'px-2', 'py-0.5', 'rounded');
                                span.textContent = tech;
                                techDiv.appendChild(span);
                            });
                        }
                        
                        projectDiv.appendChild(techDiv);

                        const descriptionP = document.createElement('p');
                        descriptionP.classList.add('text-text-muted', 'leading-relaxed', 'mb-4', 'border-l-2', 'border-border-color', 'pl-4');
                        descriptionP.textContent = project.description;
                        projectDiv.appendChild(descriptionP);

                        const linksDiv = document.createElement('div');
                        linksDiv.classList.add('flex', 'gap-4');
                        
                        if (project.links) {
                            project.links.forEach(link => {
                                const a = document.createElement('a');
                                a.classList.add('text-sm', 'font-bold', 'text-text-main', 'dark:text-white', 'hover:text-primary', 'flex', 'items-center', 'gap-1', 'focus:outline-none', 'focus:text-primary');
                                a.href = link.href;
                                a.setAttribute('aria-label', `${link.text} - ${project.title}`);
                                a.innerHTML = `<span class="material-symbols-outlined text-base" aria-hidden="true">${link.icon}</span> ${link.text}`;
                                linksDiv.appendChild(a);
                            });
                        }
                        
                        projectDiv.appendChild(linksDiv);
                        projectsListContainer.appendChild(projectDiv);
                    });
                    }
                }

                // Philosophy Section
                if (data.philosophy.titlePrefix && data.philosophy.title) {
                    setText('philosophy-title', `${data.philosophy.titlePrefix} ${data.philosophy.title}`);
                }
                
                const philosophyCodeBlockContainer = document.getElementById('philosophy-code-block');
                if (philosophyCodeBlockContainer && data.philosophy.codeBlock) {
                    philosophyCodeBlockContainer.innerHTML = `<div class="flex gap-2 mb-4" aria-hidden="true">
<div class="w-3 h-3 rounded-full bg-red-500"></div>
<div class="w-3 h-3 rounded-full bg-yellow-500"></div>
<div class="w-3 h-3 rounded-full bg-green-500"></div>
</div>`;
                    
                    // Add class definition line with mb-4
                    if (data.philosophy.codeBlock.classLine) {
                        const classLine = document.createElement('p');
                        classLine.classList.add('mb-4');
                        classLine.innerHTML = data.philosophy.codeBlock.classLine;
                        philosophyCodeBlockContainer.appendChild(classLine);
                    }
                    
                    // Add indented content wrapper
                    const indentedDiv = document.createElement('div');
                    indentedDiv.classList.add('pl-4', 'border-l', 'border-border-color', 'dark:border-border-color-dark', 'ml-1');
                    
                    // Add docstring - light mode uses text-gray-500, dark mode uses text-gray-400
                    if (data.philosophy.codeBlock.docstring) {
                        const docstringP = document.createElement('p');
                        docstringP.classList.add('mb-2', 'text-gray-500', 'dark:text-gray-400');
                        docstringP.innerHTML = data.philosophy.codeBlock.docstring;
                        indentedDiv.appendChild(docstringP);
                    }
                    
                    // Add <br/> after docstring
                    const br = document.createElement('br');
                    indentedDiv.appendChild(br);
                    
                    // Add function definition
                    if (data.philosophy.codeBlock.function) {
                        const functionP = document.createElement('p');
                        functionP.innerHTML = data.philosophy.codeBlock.function;
                        indentedDiv.appendChild(functionP);
                    }
                    
                    philosophyCodeBlockContainer.appendChild(indentedDiv);
                }

                // Footer
                if (data.contact?.callToAction) {
                    setText('footer-cta', data.contact.callToAction);
                }

                const footerSocialLinksContainer = document.getElementById('footer-social-links');
                if (footerSocialLinksContainer) {
                    if (data.personalInfo.email) {
                        const emailLink = createLink('Email', `mailto:${data.personalInfo.email}`, ['text-text-muted', 'dark:text-text-muted-dark', 'hover:text-text-main', 'dark:hover:text-white', 'transition-colors', 'flex', 'items-center', 'gap-2', 'focus:outline-none', 'focus:text-text-main', 'dark:focus:text-white'], 'mail', 'Send email');
                        footerSocialLinksContainer.appendChild(emailLink);
                    }
                    
                    if (data.personalInfo.githubUrl) {
                        const githubLink = createLink('GitHub', data.personalInfo.githubUrl, ['text-text-muted', 'dark:text-text-muted-dark', 'hover:text-text-main', 'dark:hover:text-white', 'transition-colors', 'flex', 'items-center', 'gap-2', 'focus:outline-none', 'focus:text-text-main', 'dark:focus:text-white'], 'code', 'View GitHub profile');
                        footerSocialLinksContainer.appendChild(githubLink);
                    }
                    
                    if (data.personalInfo.linkedinUrl) {
                        const linkedinLink = createLink('LinkedIn', data.personalInfo.linkedinUrl, ['text-text-muted', 'hover:text-white', 'transition-colors', 'flex', 'items-center', 'gap-2', 'focus:outline-none', 'focus:text-white'], 'work', 'View LinkedIn profile');
                        footerSocialLinksContainer.appendChild(linkedinLink);
                    }
                }

                if (data.personalInfo.copyright) {
                    setText('footer-copyright', data.personalInfo.copyright);
                }

                // Hide loader on success
                hideLoader();

            } catch (renderError) {
                console.error('Error rendering content:', renderError);
                showError();
            }
        })
        .catch(error => {
            console.error('Error fetching content:', error);
            showError();
        });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Keyboard accessibility - close mobile menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            mobileMenuButton.setAttribute('aria-expanded', 'false');
            const icon = mobileMenuButton.querySelector('.material-symbols-outlined');
            if (icon) icon.textContent = 'menu';
            mobileMenuButton.focus();
        }
    });
});