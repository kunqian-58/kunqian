document.addEventListener('DOMContentLoaded', () => {
  // ── 1. Scroll Spy ──────────────────────────────────────────────────
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.sidebar-nav .nav-link, .overlay-nav .nav-link');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { threshold: 0.15, rootMargin: '-20% 0px -70% 0px' }
  );

  sections.forEach((section) => observer.observe(section));

  // ── 2. Smooth Scroll ───────────────────────────────────────────────
  document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
    });
  });

  // ── 3. Mobile Menu ─────────────────────────────────────────────────
  const overlayNav = document.querySelector('.overlay-nav');
  const hamburger = document.querySelector('.hamburger');
  const overlayClose = document.querySelector('.overlay-close');

  if (hamburger) {
    hamburger.addEventListener('click', () => overlayNav.classList.add('open'));
  }
  if (overlayClose) {
    overlayClose.addEventListener('click', () => overlayNav.classList.remove('open'));
  }
  document.querySelectorAll('.overlay-nav .nav-link').forEach((link) => {
    link.addEventListener('click', () => overlayNav.classList.remove('open'));
  });

  // ── 4. Papers Rendering ────────────────────────────────────────────
  fetch('papers.json')
    .then((res) => res.json())
    .then((papers) => {
      const container = document.getElementById('papers-container');
      if (!container) return;

      // Filter out patents and dissertations
      const filtered = papers.filter(
        (p) => p.type !== 'patent' && p.type !== 'dissertation'
      );

      // Sort by year descending, then title alphabetically
      filtered.sort((a, b) => {
        if (b.year !== a.year) return b.year - a.year;
        return a.title.localeCompare(b.title);
      });

      // Group by year
      const groups = new Map();
      filtered.forEach((p) => {
        if (!groups.has(p.year)) groups.set(p.year, []);
        groups.get(p.year).push(p);
      });

      // Render each year group
      groups.forEach((yearPapers, year) => {
        const heading = document.createElement('h3');
        heading.className = 'year-heading';
        heading.textContent = year;
        container.appendChild(heading);

        yearPapers.forEach((paper) => {
          const div = document.createElement('div');
          div.className = 'paper';

          let html = '';

          // Title
          html += `<div class="paper-title">${paper.title}</div>`;

          // Authors
          const authors = paper.authors
            .map((a) =>
              a === 'Kun Qian'
                ? '<span class="author-highlight">Kun Qian</span>'
                : a
            )
            .join(', ');
          html += `<div class="paper-authors">${authors}</div>`;

          // Venue
          let venue = paper.venue_short || '';
          if (paper.acceptance_rate) {
            venue += ` (Acceptance rate: ${paper.acceptance_rate})`;
          }
          html += `<div class="paper-venue">${venue}</div>`;

          // Badges
          const badges = [];
          if (paper.pdf_url && paper.pdf_url !== 'na' && paper.pdf_url !== '') {
            badges.push(
              `<a class="badge badge-pdf" href="${paper.pdf_url}" target="_blank">pdf</a>`
            );
          }
          if (paper.video_url && paper.video_url !== 'na' && paper.video_url !== undefined) {
            badges.push(
              `<a class="badge badge-video" href="${paper.video_url}" target="_blank">video</a>`
            );
          }
          if (paper.link && paper.link !== 'na' && paper.link !== undefined) {
            badges.push(
              `<a class="badge badge-link" href="${paper.link}" target="_blank">link</a>`
            );
          }
          if (paper.bibtex_file !== null && paper.bibtex_file !== undefined) {
            badges.push(
              `<button class="badge badge-bibtex" data-bibtex="${paper.bibtex_file}">bibtex</button>`
            );
          }
          if (paper.award !== null && paper.award !== undefined) {
            badges.push(`<span class="award-badge">\u{1F3C6} ${paper.award}</span>`);
          }
          if (badges.length) {
            html += `<div class="paper-badges">${badges.join('\n')}</div>`;
          }

          // Company
          if (paper.company) {
            html += `<div class="paper-company">Work done at ${paper.company}</div>`;
          }

          // Note
          if (paper.note) {
            html += `<div class="paper-note">(${paper.note})</div>`;
          }

          div.innerHTML = html;
          container.appendChild(div);
        });
      });
    })
    .catch((err) => console.error('Failed to load papers:', err));

  // ── 5. Bibtex Modal ────────────────────────────────────────────────
  const modal = document.getElementById('bibtex-modal');
  const bibtexContent = document.getElementById('bibtex-content');
  const copyBtn = document.getElementById('copy-bibtex');

  // Open modal on bibtex badge click (delegated)
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.badge-bibtex');
    if (btn) {
      const filename = btn.getAttribute('data-bibtex');
      fetch(`assets/bibtex/${filename}`)
        .then((res) => res.text())
        .then((text) => {
          bibtexContent.textContent = text;
          modal.classList.add('open');
        })
        .catch((err) => console.error('Failed to load bibtex:', err));
    }
  });

  // Close modal
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-close') || e.target.classList.contains('modal-backdrop')) {
        modal.classList.remove('open');
      }
    });
  }

  // Copy bibtex
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(bibtexContent.textContent).then(() => {
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
          copyBtn.textContent = 'Copy';
        }, 2000);
      });
    });
  }
});
