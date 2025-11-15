document.addEventListener('DOMContentLoaded', () => {
    
    // --- Variabel Dashboard ---
    const header = document.querySelector('.header');
    const dashboardContent = document.querySelector('.dashboard-content');
    const logoutBtn = document.getElementById('logoutBtn');

    const navPortfolio = document.getElementById('navPortfolio');
    const navAbout = document.getElementById('navAbout');
    const portfolioSection = document.getElementById('portfolio-section');
    const aboutSection = document.getElementById('about-section');

    // ------------------------------------
    // LOGIKA UNTUK HALAMAN LOGIN (index.html)
    // ------------------------------------
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const usernameInput = document.getElementById('username').value;
            const passwordInput = document.getElementById('password').value;
            const loginMessage = document.getElementById('loginMessage');

            // Kredensial Demo:
            const validUsername = 'muliani';
            const validPassword = 'lia123';

            if (usernameInput === validUsername && passwordInput === validPassword) {
                localStorage.setItem('isLoggedIn', 'true');
                loginMessage.textContent = 'Login berhasil! Mengalihkan...';
                loginMessage.style.color = '#4CAF50';
                window.location.href = 'Dashboard.html';
            } else {
                loginMessage.textContent = 'Nama pengguna atau kata sandi salah.';
                loginMessage.style.color = '#ee6c4d';
            }
        });
    }

    // ------------------------------------
    // LOGIKA UNTUK HALAMAN DASHBOARD (dashboard.html)
    // ------------------------------------
    if (dashboardContent) {
        // 1. Cek Status Login
        if (localStorage.getItem('isLoggedIn') !== 'true') {
            window.location.href = 'index.html';
            return; // Hentikan eksekusi jika belum login
        }

        // 2. Logika Logout
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('isLoggedIn');
                window.location.href = 'index.html';
            });
        }
        
        // 3. FUNGSI SCROLL HEADER
        const handleScroll = () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', handleScroll);
        
        // 4. FUNGSI SWITCH KONTEN (Portofolio/Tentang)
        const switchContent = (targetSection) => {
            // Sembunyikan semua konten utama
            portfolioSection.classList.add('hidden-section');
            aboutSection.classList.add('hidden-section');
            
            // Tampilkan section yang dituju
            if (targetSection === 'portfolio') {
                portfolioSection.classList.remove('hidden-section');
            } else if (targetSection === 'about') {
                aboutSection.classList.remove('hidden-section');
            }
        };

        // Event Listeners untuk Navbar
        if (navPortfolio && navAbout) {
            navPortfolio.addEventListener('click', (e) => {
                e.preventDefault();
                switchContent('portfolio');
            });
            
            navAbout.addEventListener('click', (e) => {
                e.preventDefault();
                switchContent('about');
            });
            
            // Tampilkan Portofolio sebagai default saat dimuat
            switchContent('portfolio');
        }
    }

});
