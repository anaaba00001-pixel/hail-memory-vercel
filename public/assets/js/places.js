const hailPlaces = [
  { name: 'مقهى سُيوف', category: 'coffee', type: 'قهوة مختصة', area: 'المنتزه الغربي — مدينة حائل', description: 'خيار لجلسة قهوة مختصة هادئة ضمن جولتك في مدينة حائل.', icon: '☕' },
  { name: 'محمصة ومقهى أندلس', category: 'coffee', type: 'قهوة ومحمصة', area: 'مدينة حائل', description: 'تجربة محلية لمحبي القهوة المختصة والمحاصيل المتنوعة.', icon: '☕' },
  { name: 'خطوة جمل', category: 'coffee', type: 'قهوة مختصة', area: 'مدينة حائل', description: 'محطة قهوة بطابع مميز تناسب استراحة خفيفة أثناء الجولة.', icon: '☕' },
  { name: 'متحف حائل الإقليمي', category: 'museum', type: 'متحف', area: 'مدينة حائل', description: 'ابدأ منه للتعرّف على تاريخ المنطقة وآثارها قبل زيارة معالم حائل.', icon: '🏛️' },
  { name: 'متحف النايف الأثري', category: 'museum', type: 'متحف تراثي', area: 'منطقة حائل', description: 'متحف خاص يجمع مقتنيات تراثية تحكي تفاصيل الحياة القديمة في حائل.', icon: '🏺' },
  { name: 'متحف مدينة فيد الأثرية', category: 'museum', type: 'متحف وموقع أثري', area: 'فيد — منطقة حائل', description: 'وجهة تجمع المتحف والآثار المرتبطة بمحطة تاريخية على درب زبيدة.', icon: '🏛️' },
  { name: 'سوق برزان الشعبي', category: 'market', type: 'سوق شعبي', area: 'حي برزان — مدينة حائل', description: 'تجوّل بين الملابس التراثية والمنتجات المحلية في قلب حائل.', icon: '🧺' },
  { name: 'سوق حائل الشعبي', category: 'market', type: 'سوق شعبي', area: 'حي برزان — مدينة حائل', description: 'سوق للمنتجات المحلية والحبوب والنباتات المجففة والسلع اليومية.', icon: '🛍️' },
  { name: 'سوق النساء الجديد', category: 'market', type: 'سوق شعبي', area: 'شمال سوق برزان — مدينة حائل', description: 'مساحة للمصنوعات اليدوية والمنتجات الغذائية والملابس من الأسر المنتجة.', icon: '🧵' },
];

const stylesheet = document.createElement('link');
stylesheet.rel = 'stylesheet';
stylesheet.href = new URL('../css/places.css', import.meta.url).href;
document.head.append(stylesheet);

const community = document.querySelector('.community');

if (community) {
  const guide = document.createElement('section');
  guide.className = 'hail-guide';
  guide.setAttribute('aria-labelledby', 'hail-guide-title');
  guide.innerHTML = `
    <div class="guide-intro">
      <p class="eyebrow">وين نروح اليوم؟</p>
      <h2 id="hail-guide-title">اقتراحات من حائل وبس</h2>
      <p>اختر مزاجك، ونقترح لك مكانًا داخل حائل لقهوة هادئة، أو جولة متحفية، أو زيارة سوق شعبي.</p>
      <div class="guide-filters" role="group" aria-label="نوع المكان">
        <button type="button" data-category="all" aria-pressed="true">كل الأماكن</button>
        <button type="button" data-category="coffee" aria-pressed="false">قهوة</button>
        <button type="button" data-category="museum" aria-pressed="false">متحف</button>
        <button type="button" data-category="market" aria-pressed="false">سوق شعبي</button>
      </div>
    </div>
    <article class="place-suggestion" id="place-suggestion" aria-live="polite">
      <div class="place-icon" id="place-icon" aria-hidden="true">☕</div>
      <div class="place-copy">
        <span class="place-type" id="place-type"></span>
        <h3 id="place-name"></h3>
        <p id="place-description"></p>
        <p class="place-area" id="place-area"></p>
        <div class="place-actions">
          <button class="primary" id="suggest-place" type="button">اقترح مكانًا آخر</button>
          <a id="place-map" class="map-link" target="_blank" rel="noopener">افتح في الخريطة ↗</a>
        </div>
      </div>
    </article>
    <p class="guide-note">جميع الاقتراحات داخل منطقة حائل. تحقق من أوقات العمل قبل الزيارة.</p>`;

  community.before(guide);

  const get = (id) => guide.querySelector(`#${id}`);
  const card = get('place-suggestion');
  const filters = [...guide.querySelectorAll('[data-category]')];
  let category = 'all';
  let currentName = '';

  function showSuggestion() {
    const available = hailPlaces.filter((place) => category === 'all' || place.category === category);
    const choices = available.filter((place) => place.name !== currentName);
    const pool = choices.length ? choices : available;
    const place = pool[Math.floor(Math.random() * pool.length)];
    currentName = place.name;

    get('place-icon').textContent = place.icon;
    get('place-type').textContent = `${place.type} في حائل`;
    get('place-name').textContent = place.name;
    get('place-description').textContent = place.description;
    get('place-area').textContent = `الموقع: ${place.area}`;
    get('place-map').href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${place.name} ${place.area}`)}`;

    card.classList.remove('is-changing');
    requestAnimationFrame(() => card.classList.add('is-changing'));
    const announcement = document.getElementById('announcement');
    if (announcement) announcement.textContent = `اقتراحك: ${place.name}، ${place.area}`;
  }

  filters.forEach((button) => {
    button.addEventListener('click', () => {
      category = button.dataset.category;
      filters.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
      currentName = '';
      showSuggestion();
    });
  });

  get('suggest-place').addEventListener('click', showSuggestion);
  showSuggestion();
}
