/* ================================================================
   SUPER CARS INTERNATIONAL — main.js
   ================================================================ */

/* ── CUSTOM CURSOR ── */
(function initCursor() {
  const dot  = document.getElementById('curDot');
  const ring = document.getElementById('curRing');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;
  let rafId;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  document.addEventListener('mousedown', () => {
    dot.classList.add('click');
    ring.classList.add('click');
  });
  document.addEventListener('mouseup', () => {
    dot.classList.remove('click');
    ring.classList.remove('click');
  });

  function animRing() {
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    rafId = requestAnimationFrame(animRing);
  }
  animRing();

  // Hover effect on interactive elements
  const hoverTargets = 'a, button, [data-hover], input, select, textarea, label';
  document.querySelectorAll(hoverTargets).forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.classList.add('hover');
      ring.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      dot.classList.remove('hover');
      ring.classList.remove('hover');
    });
  });
})();


/* ── NAVBAR SCROLL ── */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
})();


/* ── MOBILE HAMBURGER ── */
(function initHamburger() {
  const btn    = document.getElementById('navHamburger');
  const drawer = document.getElementById('navDrawer');
  if (!btn || !drawer) return;

  btn.addEventListener('click', () => {
    const open = btn.classList.toggle('open');
    drawer.classList.toggle('open', open);
    drawer.style.display = open ? 'flex' : 'none';
  });

  // Close on link click
  drawer.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      btn.classList.remove('open');
      drawer.classList.remove('open');
      drawer.style.display = 'none';
    });
  });
})();


/* ── REVEAL ON SCROLL ── */
(function initReveal() {
  function check() {
    document.querySelectorAll('.rev:not(.vis)').forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight - 40) {
        el.classList.add('vis');
      }
    });
  }
  window.addEventListener('scroll', check, { passive: true });
  window.addEventListener('resize', check, { passive: true });
  // Initial check after brief delay (let layout settle)
  setTimeout(check, 120);
})();


/* ── ACTIVE NAV LINK ── */
(function initActiveLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-drawer a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();


/* ── CATALOG FILTER + RENDER ── */
// Fuente: SUPERCARS_INTERNATIONAL_LISTA_VEHICULOS.xlsx
const CARS = [
  // ── RAV4 ─────────────────────────────────────────────────────
  {
    brand: 'Toyota', model: 'RAV4 2.0L CVT 4x4 — Adventure Plus',
    tags: 'suv rav4', year: 2026,
    spec: 'SUV · 2.0L CVT · 4x4 · Adventure Plus Edition',
    price: 'US$ 24.900',
    img: 'assets/vehicles/rav4-front-34.jpg',
    url: 'rav4-adventure-plus-2026.html'
  },
  {
    brand: 'Toyota', model: 'RAV4 2.0L 4WD — Luxury',
    tags: 'suv rav4', year: 2026,
    spec: 'SUV · 2.0L · 4WD · Luxury Version',
    price: 'US$ 25.500',
    img: 'assets/vehicles/rav4-front.jpg',
    url: 'rav4-luxury-2026.html'
  },
  {
    brand: 'Toyota', model: 'RAV4 2.0L CVT 4x4 — Adventure Plus',
    tags: 'suv rav4', year: 2025,
    spec: 'SUV · 2.0L CVT · 4x4 · Adventure Plus Edition',
    price: 'US$ 24.900',
    img: 'assets/vehicles/rav4-rear.jpg',
    url: 'rav4-adventure-plus-2025.html'
  },
  {
    brand: 'Toyota', model: 'RAV4 2.0L 4WD — Luxury',
    tags: 'suv rav4', year: 2025,
    spec: 'SUV · 2.0L · 4WD · Luxury Version',
    price: 'US$ 25.500',
    img: 'assets/vehicles/rav4-interior-dash.jpg',
    url: 'rav4-luxury-2025.html'
  },

  // ── FRONTLANDER ───────────────────────────────────────────────
  {
    brand: 'Toyota', model: 'Frontlander 2.0L — Comfort',
    tags: 'suv frontlander', year: 2026,
    spec: 'SUV · 2.0L · Comfort Edition',
    price: 'US$ 14.725',
    img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80',
    url: 'frontlander-comfort-2026.html'
  },
  {
    brand: 'Toyota', model: 'Frontlander 2.0L — Comfort Plus',
    tags: 'suv frontlander', year: 2026,
    spec: 'SUV · 2.0L · Comfort Plus Edition',
    price: 'US$ 15.413',
    img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80',
    url: 'frontlander-comfort-plus-2026.html'
  },
  {
    brand: 'Toyota', model: 'Frontlander 2.0L — Deluxe',
    tags: 'suv frontlander', year: 2026,
    spec: 'SUV · 2.0L · Deluxe Edition',
    price: 'US$ 17.063',
    img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80',
    url: 'frontlander-deluxe-2026.html'
  },
  {
    brand: 'Toyota', model: 'Frontlander 2.0L — Deluxe Plus',
    tags: 'suv frontlander', year: 2026,
    spec: 'SUV · 2.0L · Deluxe Plus Edition',
    price: 'US$ 17.888',
    img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80',
    url: 'frontlander-deluxe-plus-2026.html'
  },

  // ── HIGHLANDER ────────────────────────────────────────────────
  {
    brand: 'Toyota', model: 'Highlander 380T 4WD — Luxury 7 asientos',
    tags: 'suv highlander', year: 2026,
    spec: 'SUV 7 plazas · 380T · 4WD · Luxury Edition',
    price: 'US$ 36.834',
    img: 'https://images.unsplash.com/photo-1565684783-4e17e4d6e5c7?w=600&q=80',
    url: 'highlander-luxury-2026.html'
  },
  {
    brand: 'Toyota', model: 'Highlander 380T 4WD — Premium 7 asientos',
    tags: 'suv highlander', year: 2026,
    spec: 'SUV 7 plazas · 380T · 4WD · Premium Edition',
    price: 'US$ 38.363',
    img: 'https://images.unsplash.com/photo-1565684783-4e17e4d6e5c7?w=600&q=80',
    url: 'highlander-premium-2026.html'
  },

  // ── CAMRY ─────────────────────────────────────────────────────
  {
    brand: 'Toyota', model: 'Camry 2.0S — Sport',
    tags: 'sedan camry', year: 2026,
    spec: 'Sedán · 2.0L · Sport Edition',
    price: 'US$ 25.000',
    img: 'https://images.unsplash.com/photo-1621993202328-a04c7fa0be08?w=600&q=80',
    url: 'camry-sport-2026.html'
  },

  // ── COROLLA CROSS ─────────────────────────────────────────────
  {
    brand: 'Toyota', model: 'Corolla Cross — Pioneer',
    tags: 'suv crossover', year: 2026,
    spec: 'SUV Crossover · Pioneer Version',
    price: 'US$ 14.576',
    img: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0729?w=600&q=80',
    url: 'corolla-cross-pioneer-2026.html'
  },
  {
    brand: 'Toyota', model: 'Corolla Cross — Elite',
    tags: 'suv crossover', year: 2026,
    spec: 'SUV Crossover · Elite Version',
    price: 'US$ 15.950',
    img: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0729?w=600&q=80',
    url: 'corolla-cross-elite-2026.html'
  },
  {
    brand: 'Toyota', model: 'Corolla Cross — Luxury',
    tags: 'suv crossover', year: 2026,
    spec: 'SUV Crossover · Luxury Version',
    price: 'Consultar',
    img: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0729?w=600&q=80',
    url: 'corolla-cross-luxury-2026.html'
  },
  {
    brand: 'Toyota', model: 'Corolla Cross — Pioneer',
    tags: 'suv crossover', year: 2025,
    spec: 'SUV Crossover · Pioneer Version',
    price: 'Consultar',
    img: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0729?w=600&q=80',
    url: 'corolla-cross-pioneer-2025.html'
  },
  {
    brand: 'Toyota', model: 'Corolla Cross — Elite',
    tags: 'suv crossover', year: 2025,
    spec: 'SUV Crossover · Elite Version',
    price: 'Consultar',
    img: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0729?w=600&q=80',
    url: 'corolla-cross-elite-2025.html'
  },
  {
    brand: 'Toyota', model: 'Corolla Cross — Luxury',
    tags: 'suv crossover', year: 2025,
    spec: 'SUV Crossover · Luxury Version',
    price: 'Consultar',
    img: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0729?w=600&q=80',
    url: 'corolla-cross-luxury-2025.html'
  },

  // ── COROLLA LEVIN (USADO) ─────────────────────────────────────
  {
    brand: 'Toyota', model: 'Corolla Levin 1.5L — Usado',
    tags: 'sedan usado levin', year: 2023,
    spec: 'Sedán · 1.5L · Usado · Excelente estado',
    price: 'US$ 7.900',
    img: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80',
    url: 'corolla-levin-2023.html'
  },
  {
    brand: 'Toyota', model: 'Corolla Levin 1.5L — Usado',
    tags: 'sedan usado levin', year: 2022,
    spec: 'Sedán · 1.5L · Usado · Excelente estado',
    price: 'US$ 7.900',
    img: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80',
    url: 'corolla-levin-2022.html'
  },
];

function renderCatalog(filter) {
  const grid = document.getElementById('catGrid');
  if (!grid) return;

  const list = (!filter || filter === 'all')
    ? CARS
    : CARS.filter(c => c.tags.includes(filter));

  grid.innerHTML = list.map(c => `
    <div class="cat-card rev" onclick="window.location='${c.url || 'contacto.html'}'">
      <div class="cat-img-wrap">
        <div class="cat-img-in" style="background-image:url('${c.img}')"></div>
        <div class="cat-origin-badge">China 🇨🇳 · ${c.year}</div>
      </div>
      <div class="cat-body">
        <span class="cat-brand">${c.brand}</span>
        <div class="cat-name">${c.model}</div>
        <div class="cat-spec">${c.spec}</div>
      </div>
      <div class="cat-footer">
        <span class="cat-price" style="${c.price === 'Consultar' ? 'font-style:italic;color:var(--mid)' : ''}">${c.price}</span>
        <span class="cat-link">Ver Ficha →</span>
      </div>
    </div>
  `).join('');

  // Re-run reveal check for new cards
  setTimeout(() => {
    document.querySelectorAll('.rev:not(.vis)').forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight - 40) {
        el.classList.add('vis');
      }
    });
  }, 60);
}

function filterCat(filter, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderCatalog(filter);
}

// Auto-init catalog if on catalog page
if (document.getElementById('catGrid')) {
  renderCatalog('all');
}


/* ── VEHICLE DETAIL — THUMBNAIL GALLERY ── */
(function initGallery() {
  const thumbs  = document.querySelectorAll('.vd-thumb');
  const mainBg  = document.querySelector('.vd-main-img-bg');
  if (!thumbs.length || !mainBg) return;

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      const img = thumb.style.backgroundImage;
      mainBg.style.backgroundImage = img.replace('w=400', 'w=1000');
    });
  });
})();


/* ── CONTACT FORM ── */
(function initForm() {
  const form = document.getElementById('contactForm');
  const btn  = document.getElementById('fsub');
  if (!form || !btn) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    btn.textContent = 'Enviando…';
    btn.disabled = true;

    // Simulate send (replace with real fetch/formspree/etc.)
    setTimeout(() => {
      btn.textContent = '✓ Consulta enviada — te contactamos pronto';
      btn.style.background = '#1a7a3e';
      btn.style.borderColor = '#1a7a3e';
      form.reset();
    }, 1200);
  });
})();


/* ── EXTRAS TOGGLE on detail page ── */
(function initExtras() {
  document.querySelectorAll('.extras-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('selected');
      const label = btn.querySelector('span:first-child');
      if (btn.classList.contains('selected')) {
        label.textContent = label.textContent.replace('➕', '✓');
        btn.style.background = 'var(--ink)';
        btn.style.color = '#fff';
        btn.style.borderColor = 'var(--ink)';
      } else {
        label.textContent = label.textContent.replace('✓', '➕');
        btn.style.background = '';
        btn.style.color = '';
        btn.style.borderColor = '';
      }
    });
  });
})();
