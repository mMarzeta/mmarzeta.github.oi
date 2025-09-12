function loadPartialInto(selector, url) {
  var host = document.querySelector(selector);
  if (!host) return Promise.resolve();
  return fetch(url, { cache: 'no-cache' })
    .then(function(response) { return response.text(); })
    .then(function(html) { host.innerHTML = html; })
    .catch(function() { /* ignore */ });
}

function initializeNavbarCollapse() {
  var navLinks = document.querySelectorAll('.navbar-collapse .nav-link');
  var navbarCollapse = document.querySelector('.navbar-collapse');
  if (!navLinks.length || !navbarCollapse) return;
  navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      if (navbarCollapse.classList.contains('show')) {
        var bsCollapse = bootstrap.Collapse.getOrCreateInstance(navbarCollapse);
        bsCollapse.hide();
      }
    });
  });
}

function updateYearRange() {
  var yearEl = document.getElementById('year-range');
  if (!yearEl) return;
  var currentYear = new Date().getFullYear();
  var startYear = yearEl.getAttribute('data-start') || String(currentYear);
  yearEl.textContent = String(startYear) === String(currentYear) ? String(startYear) : String(startYear) + '–' + String(currentYear);
}

function adjustLinksForNonIndex() {
  var path = window.location.pathname || '';
  var isIndex = path === '/' || path.endsWith('/index.html') || path.endsWith('index.html');
  if (isIndex) return;
  var anchors = document.querySelectorAll('header a, footer a');
  anchors.forEach(function(a) {
    var href = a.getAttribute('href');
    if (!href) return;
    if (href === '#') {
      a.setAttribute('href', 'index.html');
      return;
    }
    if (href.charAt(0) === '#') {
      a.setAttribute('href', 'index.html' + href);
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  Promise.all([
    loadPartialInto('header', 'partials/header.html'),
    loadPartialInto('footer.footer', 'partials/footer.html')
  ]).then(function() {
    adjustLinksForNonIndex();
    initializeNavbarCollapse();
    updateYearRange();
  });
});


