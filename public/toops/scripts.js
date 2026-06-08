// scroll-reveal: tag candidates + observe
(() => {
  const targets = document.querySelectorAll(
    '.card, .trip-card, .article-card, .option, .brew-card, ' +
    '.zig, .story-section, .builder-step, .hero .lede, .hero .cta-row, ' +
    '.spec-grid, .farm-block, .map-stub, .cart-row, .summary, .lost, ' +
    '.cafe-card, .mh-card, .mr-card, .reg-card, .ev-row, .review, ' +
    '.no-card, .polaroid, .punch-card, .press-pull, .ig-tile, .yt-tile'
  );
  let i = 0;
  targets.forEach(el => {
    if (!el.hasAttribute('data-reveal')) {
      el.setAttribute('data-reveal', '');
      el.setAttribute('data-delay', String(i % 4));
      i++;
    }
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));
})();

// duplicate ticker children so the loop seams invisibly (clone nodes — no innerHTML)
(() => {
  document.querySelectorAll('.ticker .track, .bottom-rail .track, .script-band .track').forEach(track => {
    Array.from(track.children).forEach(child => {
      track.appendChild(child.cloneNode(true));
    });
  });
})();

// wrap hero h1 words for staggered fade-in (DOM walk — no innerHTML)
(() => {
  const h = document.querySelector('.hero h1');
  if (!h) return;
  const wrapTextNode = (node) => {
    const parent = node.parentNode;
    const parts = node.nodeValue.split(/(\s+)/);
    parts.forEach(part => {
      if (/^\s+$/.test(part)) {
        parent.insertBefore(document.createTextNode(part), node);
      } else if (part.length) {
        const span = document.createElement('span');
        span.className = 'w';
        span.textContent = part;
        parent.insertBefore(span, node);
      }
    });
    parent.removeChild(node);
  };
  // walk descendants, wrap leaf text nodes (preserves <em> structure)
  const walk = (el) => {
    Array.from(el.childNodes).forEach(n => {
      if (n.nodeType === Node.TEXT_NODE) wrapTextNode(n);
      else if (n.nodeType === Node.ELEMENT_NODE) walk(n);
    });
  };
  walk(h);
})();

// staggered photo shimmer (so they don't all flash at once)
(() => {
  document.querySelectorAll('.photo').forEach((p, i) => {
    p.style.setProperty('--shim-delay', `${(i * 0.45) % 4.2}s`);
  });
})();

// ─────────────────────────────────────────────────────────────
// now-open widget
// Compute open/closed for each branch using IST regardless of viewer's
// timezone. Refreshes every 60s.
//
// Hours (24h, IST):
//   Jubilee Hills (jh) — Mon–Sun · 8–21
//   Filmnagar (fn)     — Wed–Sun · 9–19
// ─────────────────────────────────────────────────────────────
(() => {
  const HOURS = {
    jh: { name: 'Jubilee Hills', days: [0,1,2,3,4,5,6], open: 8,  close: 21 },
    // Sun=0, Mon=1, Tue=2, Wed=3, Thu=4, Fri=5, Sat=6
    fn: { name: 'Filmnagar',     days: [3,4,5,6,0],     open: 9,  close: 19 }
  };

  // get IST { dayOfWeek 0..6 (Sun..Sat), hour 0..23, minute 0..59 }
  const istNow = () => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Kolkata',
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    const parts = fmt.formatToParts(new Date()).reduce((a, p) => {
      a[p.type] = p.value; return a;
    }, {});
    const dayMap = { Sun:0, Mon:1, Tue:2, Wed:3, Thu:4, Fri:5, Sat:6 };
    const day = dayMap[parts.weekday];
    const hour = parseInt(parts.hour, 10) % 24;
    const minute = parseInt(parts.minute, 10);
    return { day, hour, minute };
  };

  const fmt12 = (h, m) => {
    const period = h >= 12 ? 'pm' : 'am';
    const hh = ((h + 11) % 12) + 1;
    return m === 0 ? `${hh}:00 ${period}` : `${hh}:${String(m).padStart(2,'0')} ${period}`;
  };

  const computeStatus = (cfg, now) => {
    const openToday = cfg.days.includes(now.day);
    const minutesNow = now.hour * 60 + now.minute;
    const openMin = cfg.open * 60;
    const closeMin = cfg.close * 60;

    if (openToday && minutesNow >= openMin && minutesNow < closeMin) {
      const minsToClose = closeMin - minutesNow;
      const closingSoon = minsToClose <= 60;
      return {
        state: closingSoon ? 'closing' : 'open',
        text: closingSoon
          ? `Closing soon · ${fmt12(cfg.close, 0)}`
          : `Open now · closes ${fmt12(cfg.close, 0)}`
      };
    }
    // closed — figure out next open
    let nextDayOffset = 0;
    let nextOpenDay = now.day;
    for (let i = 0; i < 8; i++) {
      const candidate = (now.day + i) % 7;
      const isToday = i === 0;
      if (cfg.days.includes(candidate)) {
        if (isToday && minutesNow < openMin) {
          nextDayOffset = 0; nextOpenDay = candidate; break;
        }
        if (!isToday) {
          nextDayOffset = i; nextOpenDay = candidate; break;
        }
      }
    }
    const dayLabel = nextDayOffset === 0
      ? 'today'
      : nextDayOffset === 1
        ? 'tomorrow'
        : ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][nextOpenDay];
    return {
      state: 'closed',
      text: `Closed · opens ${dayLabel} ${fmt12(cfg.open, 0)}`
    };
  };

  const render = () => {
    const now = istNow();
    Object.entries(HOURS).forEach(([key, cfg]) => {
      const dot = document.querySelector(`[data-dot="${key}"]`);
      const status = document.querySelector(`[data-status="${key}"]`);
      if (!dot || !status) return;
      const { state, text } = computeStatus(cfg, now);
      dot.classList.toggle('is-open',    state === 'open');
      dot.classList.toggle('is-closing', state === 'closing');
      // closed = base styling (grey via default --dot-off)
      status.textContent = text;
      const card = dot.closest('.no-card');
      if (card) {
        card.setAttribute('aria-label',
          `${cfg.name} — ${text}. Get directions.`);
      }
    });
  };

  render();
  // refresh every minute
  setInterval(render, 60 * 1000);
})();
