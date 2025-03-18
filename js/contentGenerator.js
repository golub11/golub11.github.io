document.addEventListener('DOMContentLoaded', function() {
    generateContent();
});

function generateContent() {
    const mainContent = document.createElement('main');
    
    // Blog Section
    const blogSection = document.createElement('section');
    blogSection.id = 'blog';
    blogSection.className = 'blog';
    blogSection.innerHTML = `
        <div class="container">
            <h2>Blog</h2>
            <div class="blog-grid">
                <div class="blog-card">
                    <div class="blog-info">
                        <span class="blog-date">18 Marzo, 2025</span>
                        <h3>Inteligencia Artificial en E-commerce</h3>
                        <p>Explorando cómo la IA está transformando el comercio electrónico y mejorando la experiencia del usuario.</p>
                        <div class="blog-footer">
                            <span class="blog-category">Inteligencia Artificial</span>
                            <a href="./blog.html?post=rag-agent" class="blog-link">Leer más</a>
                        </div>
                    </div>
                </div>
                <!--
                <div class="blog-card">
                    <div class="blog-info">
                        <span class="blog-date">15 Marzo, 2025</span>
                        <h3>Optimización de Modelos de Precios</h3>
                        <p>Estrategias efectivas para implementar modelos de precios dinámicos en tu negocio.</p>
                        <div class="blog-footer">
                            <span class="blog-category">Negocios</span>
                            <a href="/blog/modelos-precios" class="blog-link">Leer más </a>
                        </div>
                    </div>
                </div>
                -->
            </div>
        </div>
    `;

    // Contact Section
    const contactSection = document.createElement('section');
    contactSection.id = 'contacto';
    contactSection.className = 'contact';
    contactSection.innerHTML = `
        <div class="container">
            <div class="contact-container">
                <h2>Contáctame</h2>
                <p>Disponible para proyectos freelance y consultoría en toda España</p>
                <div class="contact-info">
                    <div class="contact-item">
                        <i class="fas fa-envelope contact-icon"></i>
                        <a href="mailto:nikola@goluxai.com" style="color: white; text-decoration: none;">
                            <span>nikola@goluxai.com</span>
                        </a>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-phone contact-icon"></i>
                        <a href="tel:+381600804050" style="color: white; text-decoration: none;">
                            <span>+381600804050</span>
                        </a>
                    </div>
                    <div class="contact-item">
                        <i class="fab fa-linkedin contact-icon"></i>
                        <a href="https://linkedin.com/in/nikola-golubovic" target="_blank" style="color: white; text-decoration: none;">
                            <span>linkedin.com/in/nikola-golubovic</span>
                        </a>
                    </div>
                    <div class="contact-item">
                        <i class="fab fa-github contact-icon"></i>
                        <a href="https://github.com/golub11" target="_blank" style="color: white; text-decoration: none;">
                            <span>github.com/golub11</span>
                        </a>
                    </div>
                </div>
                <a href="mailto:nikola@goluxai.com" class="btn">Envíame un Email</a>
            </div>
        </div>
    `;

    // Footer
    const footer = document.createElement('footer');
    footer.innerHTML = `
        <div class="container">
            <p>© 2025 Nikola Golubovic - Desarrollador de Software y Consultor IT</p>
        </div>
    `;

    // Append all sections to main content
    mainContent.appendChild(blogSection);
    mainContent.appendChild(contactSection);
    mainContent.appendChild(footer);

    // Append main content to body
    document.body.appendChild(mainContent);
}