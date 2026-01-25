(() => {
  const data = [
    {
      id: 1,
      dayLabel: "اليوم الأول",
      title: "سيتم تخصيصه لمسار السيرة النبوية",
      route: "السيرة",
      badges: ["السيرة"],
      stops: [
        "زيارة المسجد النبوي الشريف",
        "بقيع الغرقد",
        "مسجد قباء",
        "زيارة عدد من مواقع التاريخ الإسلامي في المدينة المنورة",
        "مسجد الجُمعة",
        "غزوة الخندق",
        "مسجد القبلتين",
        "منطقة شهداء أحد",
        "مسجد الإجابة"
      ]
    },
    {
      id: 2,
      dayLabel: "اليوم الثاني",
      title: "تكملة مسار السيرة النبوية",
      route: "السيرة",
      badges: ["السيرة"],
      stops: [
        "سقيفة بني ساعدة",
        "مسجد الغمامة",
        "مسجد أبوبكر الصديق",
        "مسجد عمر بن الخطاب",
        "مسجد علي بن أبي طالب",
        "منطقة السوق (سوق المناخة)"
      ]
    },
    {
      id: 3,
      dayLabel: "اليوم الثالث",
      title: "سيتم تخصيصه لمسار التراث الثقافي والطبيعي",
      route: "التراث",
      badges: ["التراث"],
      stops: [
        "متحف المدينة المنورة (سكة الحديد)",
        "متحف دار القلم",
        "قصر عروة"
      ]
    },
    {
      id: 4,
      dayLabel: "اليوم الرابع",
      title: "تكملة مسار التراث الثقافي والطبيعي",
      route: "التراث",
      badges: ["التراث"],
      stops: [
        "متحف دار المدينة",
        "مُجمع الملك فهد لطباعة المصحف الشريف",
        "متحف الدينار والدرهم",
        "الحي التراثي"
      ]
    },
    {
      id: 5,
      dayLabel: "اليوم الخامس",
      title: "سيتم تخصيصه لمسار التسوق",
      route: "التسوق",
      badges: ["التسوق"],
      stops: [
        "أسواق المنطقة المركزية المجاورة للمسجد النبوي الشريف",
        "مجمع النور مول",
        "مجمع العالية مول",
        "مجمع الراشد مول",
        "السوق المركزي للتمور"
      ]
    },
    {
      id: 6,
      dayLabel: "اليوم السادس",
      title: "سيتم تخصيصه لتجربة الحافلة السياحية @CSMadinah والذي ستعيش معه لحظات ممتعة بين معالم #المدينه بالحافلات المكشوفة.",
      route: "الحافلة",
      badges: ["الحافلة"],
      stops: [
        "12 معلم سياحي",
        "ارشاد سياحي بـ 8 لغات عالمية",
        "واي فاي مجانا",
        "خدمة ذوي الاحتياجات الخاصة"
      ]
    },
    {
      id: 7,
      dayLabel: "اليوم السابع",
      title: "سيتم تخصيصه لمسار مدائن صالح #العلا",
      route: "العلا",
      badges: ["العلا"],
      stops: [
        "الخريبة",
        "مقابر الأسود",
        "محطة السكة بالعذيب",
        "مزارع العذيب",
        "الواجهات والقصور",
        "القلعة الإسلامية في الحجر",
        "محطة سكة حديد الحجر",
        "جبل الحوارة",
        "جبل الفيل"
      ]
    },
    {
      id: 8,
      dayLabel: "اليوم الثامن",
      title: "تكملة لمسار مدائن صالح #العلا",
      route: "العلا",
      badges: ["العلا"],
      stops: [
        "مطل شفا حرة عويرض",
        "قلعة أم ناصر",
        "القرية التراثية (الديرة)",
        "الطنطورة",
        "متحف العلا",
        "قلعة مغيرة",
        "موقع المابيات الأثري"
      ]
    },
    {
      id: 9,
      dayLabel: "اليوم التاسع",
      title: "سيتم تخصيصه لمسار #ينبع البحر",
      route: "ينبع البحر",
      badges: ["ينبع البحر"],
      stops: [
        "الكورنيش الجنوبي (الأقيفة)",
        "حي الصور التاريخي",
        "سوق الليل الشعبي",
        "سوق السمك",
        "شاطئ الهوارة والجكر (مرسى السفن)",
        "متحف الأحياء البحرية",
        "الكورنيش الشمالي",
        "الخور الشمالي"
      ]
    },
    {
      id: 10,
      dayLabel: "اليوم العاشر والأخير",
      title: "سيتم تخصيصه لمسار #ينبع الصناعية",
      route: "ينبع الصناعية",
      badges: ["ينبع الصناعية"],
      stops: [
        "مركز المعلومات السياحية",
        "البحيرة الإصطناعية",
        "نادي الفروسية",
        "حدائق الصبح الشاطئية",
        "جزيرة المحار",
        "مرسى البثنة",
        "مجمع الدانة مول التجاري"
      ]
    }
  ];

  const listEl = document.querySelector('[data-day-list]');
  const detailEl = document.querySelector('[data-day-detail]');
  const accordionEl = document.querySelector('[data-accordion]');
  const tableBodyEl = document.querySelector('[data-table-body]');
  const tableCardsEl = document.querySelector('[data-table-cards]');
  const searchEl = document.querySelector('[data-search]');
  const chips = Array.from(document.querySelectorAll('[data-filter-chip]'));
  const viewToggle = document.querySelector('[data-view-toggle]');
  const tableView = document.querySelector('[data-view="table"]');
  const detailsView = document.querySelector('[data-view="details"]');
  const pdfBtn = document.querySelector('[data-pdf-btn]');
  const toastEl = document.querySelector('[data-toast]');

  const state = {
    activeId: data[0]?.id || 1,
    query: '',
    filter: 'الكل',
    view: 'details'
  };

  const normalize = (text) => (text || '').toString().toLowerCase();

  const matchesQuery = (day) => {
    if (!state.query) return true;
    const haystack = [day.dayLabel, day.title, day.route, ...(day.stops || [])].join(' ');
    return normalize(haystack).includes(normalize(state.query));
  };

  const matchesFilter = (day) => {
    if (state.filter === 'الكل') return true;
    return day.route === state.filter;
  };

  const getFiltered = () => data.filter(d => matchesQuery(d) && matchesFilter(d));

  const setActiveChip = () => {
    chips.forEach(chip => {
      chip.classList.toggle('active', chip.dataset.filter === state.filter);
    });
  };

  const badgeHtml = (badges = []) => badges.map(b => `<span class="badge-lite">${b}</span>`).join('');

  const renderList = (days) => {
    if (!days.length) {
      listEl.innerHTML = `<div class="empty-state">لا توجد نتائج مطابقة للبحث.</div>`;
      return;
    }
    listEl.innerHTML = days.map(day => `
      <div class="day-card ${day.id === state.activeId ? 'active' : ''}" data-day-id="${day.id}">
        <h4>${day.dayLabel}</h4>
        <div class="muted">${day.title}</div>
        <div class="badge-row">${badgeHtml(day.badges)}</div>
      </div>
    `).join('');
  };

  const renderDetail = (day) => {
    if (!day) {
      detailEl.innerHTML = `<div class="card"><div class="empty-state">اختر يوماً من القائمة لعرض التفاصيل.</div></div>`;
      return;
    }
    detailEl.classList.add('fade');
    setTimeout(() => {
      detailEl.innerHTML = `
        <div class="card day-detail-inner">
          <div class="detail-header">
            <div>
              <div class="kicker">${day.dayLabel}</div>
              <h2>${day.title}</h2>
              <div class="muted">المسار: ${day.route} • عدد المحطات: ${day.stops.length}</div>
            </div>
            <div class="badge-row">${badgeHtml(day.badges)}</div>
          </div>
          <div class="timeline-vertical">
            ${day.stops.map(stop => `
              <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div>${stop}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
      detailEl.classList.remove('fade');
    }, 120);
  };

  const renderAccordion = (days) => {
    if (!days.length) {
      accordionEl.innerHTML = `<div class="empty-state">لا توجد نتائج مطابقة للبحث.</div>`;
      return;
    }
    accordionEl.innerHTML = days.map(day => {
      const openAttr = day.id === state.activeId ? 'open' : '';
      return `
        <details ${openAttr} data-day-id="${day.id}">
          <summary>
            <div class="summary-row">
              <div>
                <div>${day.dayLabel}</div>
                <div class="muted">${day.title}</div>
              </div>
              <div class="badge-row">${badgeHtml(day.badges)}</div>
            </div>
          </summary>
          <div class="mt-2">
            <div class="muted">المسار: ${day.route} • عدد المحطات: ${day.stops.length}</div>
            <div class="timeline-vertical mt-2">
              ${day.stops.map(stop => `
                <div class="timeline-item">
                  <div class="timeline-dot"></div>
                  <div>${stop}</div>
                </div>
              `).join('')}
            </div>
          </div>
        </details>
      `;
    }).join('');
  };

  const renderTable = (days) => {
    if (!days.length) {
      tableBodyEl.innerHTML = `<tr><td colspan="5"><div class="empty-state">لا توجد نتائج مطابقة للبحث.</div></td></tr>`;
      tableCardsEl.innerHTML = `<div class="empty-state">لا توجد نتائج مطابقة للبحث.</div>`;
      return;
    }
    tableBodyEl.innerHTML = days.map(day => `
      <tr>
        <td>${day.dayLabel}</td>
        <td>${day.route}</td>
        <td>${day.stops.length}</td>
        <td class="table-muted">${day.stops[0]}</td>
        <td>${badgeHtml(day.badges).replaceAll('badge-lite', 'badge-inline')}</td>
      </tr>
    `).join('');

    tableCardsEl.innerHTML = days.map(day => `
      <div class="table-card-item">
        <div class="row"><span class="table-muted">اليوم</span><span>${day.dayLabel}</span></div>
        <div class="row"><span class="table-muted">المسار</span><span>${day.route}</span></div>
        <div class="row"><span class="table-muted">عدد المحطات</span><span>${day.stops.length}</span></div>
        <div class="row"><span class="table-muted">أبرز محطة</span><span>${day.stops[0]}</span></div>
        <div class="row"><span class="table-muted">الشارات</span><span>${badgeHtml(day.badges).replaceAll('badge-lite', 'badge-inline')}</span></div>
      </div>
    `).join('');
  };

  const renderAll = () => {
    const days = getFiltered();
    if (days.length && !days.some(d => d.id === state.activeId)) {
      state.activeId = days[0].id;
    }
    const activeDay = days.find(d => d.id === state.activeId);
    renderList(days);
    renderDetail(activeDay);
    renderAccordion(days);
    renderTable(days);
    setActiveChip();
  };

  listEl.addEventListener('click', (e) => {
    const card = e.target.closest('[data-day-id]');
    if (!card) return;
    state.activeId = Number(card.getAttribute('data-day-id'));
    renderAll();
  });

  accordionEl.addEventListener('toggle', (e) => {
    const details = e.target.closest('details');
    if (!details || !details.open) return;
    state.activeId = Number(details.getAttribute('data-day-id'));
    renderAll();
  }, true);

  searchEl.addEventListener('input', (e) => {
    state.query = e.target.value.trim();
    renderAll();
  });

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      state.filter = chip.dataset.filter;
      renderAll();
    });
  });

  viewToggle.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    state.view = btn.dataset.view;
    viewToggle.querySelectorAll('button').forEach(b => b.classList.toggle('active', b.dataset.view === state.view));
    tableView.hidden = state.view !== 'table';
    detailsView.hidden = state.view !== 'details';
  });

  const showToast = (msg) => {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    setTimeout(() => toastEl.classList.remove('show'), 1800);
  };

  pdfBtn.addEventListener('click', () => showToast('قريباً'));

  renderAll();
})();
