const hailPlaces = [
  { name: 'قلعة أعيرف', category: 'heritage', type: 'قلعة تاريخية', area: 'حائل — لبدة', description: 'قلعة طينية مرتفعة تطل على المدينة، مناسبة للتاريخ والتصوير قبل الغروب.', icon: '🏰', rating: 4.0 },
  { name: 'قصر القشلة', category: 'heritage', type: 'قصر تاريخي', area: 'وسط حائل — المحطة', description: 'معلم من عام 1941م يتميز بساحاته وأبراجه والعمارة النجدية.', icon: '🏯', rating: 4.0 },
  { name: 'جبل أم سنمان ونقوش جبة', category: 'heritage', type: 'تراث عالمي', area: 'جُبّة — شمال غرب حائل', description: 'فنون صخرية قديمة ضمن قائمة التراث العالمي لليونسكو.', icon: '🪨', rating: 4.0 },
  { name: 'مدينة فيد الأثرية', category: 'museum', type: 'مدينة أثرية', area: 'فيد — جنوب شرق حائل', description: 'مدينة ارتبطت بطريق الحج القديم وتضم آثاراً ومعالم معمارية.', icon: '🏛️', rating: 4.0 },
  { name: 'متحف حائل الإقليمي', category: 'museum', type: 'متحف', area: 'مدينة حائل', description: 'زيارة تعليمية للتعرّف على تاريخ المنطقة وآثارها.', icon: '🏺', rating: 4.4 },
  { name: 'سوق برزان الشعبي', category: 'market', type: 'سوق شعبي', area: 'حي برزان — حائل', description: 'سوق تراثي للملابس الشعبية والتوابل والعطارة والمنتجات الحرفية.', icon: '🧺', rating: 4.0 },
  { name: 'أبراج برزان', category: 'market', type: 'تراث وتسوق', area: 'منطقة برزان القديمة — حائل', description: 'جولة تجمع بقايا المعلم التاريخي بالمنطقة التجارية القديمة.', icon: '🛍️', rating: 4.0 },
  { name: 'HAO | هاو', category: 'coffee', type: 'مقهى', area: 'طريق عقدة — حي صبابة', description: 'جلسة هادئة أو لقاء خفيف مع الأصدقاء.', icon: '☕', rating: 4.4 },
  { name: 'مقهى بنشاي', category: 'coffee', type: 'قهوة وشاي', area: 'حي البحيرة — حائل', description: 'وجهة للقهوة والشاي والجلسات.', icon: '☕', rating: 4.4 },
  { name: 'سوردز كافيه', category: 'coffee', type: 'مقهى', area: 'المنتزه الغربي — حائل', description: 'خيار للمشروبات والقهوة ضمن المدينة.', icon: '☕', rating: 4.2 },
  { name: 'هاف مليون', category: 'coffee', type: 'مقهى', area: 'حي المطار — حائل', description: 'قهوة ومشروبات سريعة بتكلفة اقتصادية نسبياً.', icon: '☕', rating: 4.1 },
  { name: 'جبال أجا', category: 'nature', type: 'جبال وطبيعة', area: 'غرب مدينة حائل', description: 'تضاريس صخرية مميزة للتنزه والتأمل والتصوير الطبيعي.', icon: '⛰️', rating: 4.0 },
  { name: 'منتزه مشار الوطني', category: 'nature', type: 'منتزه طبيعي', area: 'شمال غرب مدينة حائل', description: 'أجواء جبلية للنزهات والتصوير والاستمتاع بالهواء الطلق.', icon: '🌳', rating: 4.0 },
  { name: 'مطل جبل السمراء', category: 'nature', type: 'مطل وإطلالة', area: 'شرق مدينة حائل', description: 'إطلالة بانورامية مميزة لمشاهدة الغروب وتصوير المدينة.', icon: '🌄', rating: 4.0 },
  { name: 'أجا بارك', category: 'family', type: 'ترفيه عائلي', area: 'مدينة حائل', description: 'وجهة عائلية للألعاب والمطاعم والمقاهي.', icon: '🎡', rating: 4.2 },
  { name: 'حديقة السلام', category: 'family', type: 'حديقة عامة', area: 'مدينة حائل', description: 'حديقة للمشي والجلوس مع العائلة.', icon: '🌿', rating: 4.4 },
  { name: 'حديقة الزيتون', category: 'family', type: 'حديقة عامة', area: 'مدينة حائل', description: 'مساحات خضراء مناسبة للنزهات العائلية.', icon: '🌳', rating: 4.3 },
  { name: 'مطعم التراثي', category: 'food', type: 'مطعم عربي', area: 'طريق الملك عبدالعزيز — حائل', description: 'تجربة طعام عربية بطابع تراثي.', icon: '🍽️', rating: 4.2 },
  { name: 'مطعم القلعة القديمة', category: 'food', type: 'مطعم عائلي', area: 'حي المنتزه الغربي — حائل', description: 'مطعم عائلي مناسب لإكمال جولة المدينة.', icon: '🍲', rating: 4.1 },
];

const stylesheet = document.createElement('link');
stylesheet.rel = 'stylesheet';
stylesheet.href = new URL('../css/places.css', import.meta.url).href;
document.head.append(stylesheet);

const root = document.querySelector('#hail-guide-root');

if (root) {
  const guide = document.createElement('section');
  guide.className = 'hail-guide';
  guide.setAttribute('aria-labelledby', 'hail-guide-title');
  guide.innerHTML = `
    <div class="guide-intro">
      <p class="eyebrow">ما ودّك تحتار؟</p>
      <h2 id="hail-guide-title">اقتراح سريع</h2>
      <p>اختر نوع الطلعة، ونقترح لك فورًا وجهة مفيدة من حائل بتقييم ٤ فأعلى.</p>
      <div class="guide-filters" role="group" aria-label="نوع المكان">
        <button type="button" data-category="all" aria-pressed="true">كل الأماكن</button>
        <button type="button" data-category="coffee" aria-pressed="false">قهوة</button>
        <button type="button" data-category="museum" aria-pressed="false">متحف</button>
        <button type="button" data-category="market" aria-pressed="false">سوق شعبي</button>
        <button type="button" data-category="heritage" aria-pressed="false">معلم تاريخي</button>
        <button type="button" data-category="nature" aria-pressed="false">طبيعة</button>
        <button type="button" data-category="family" aria-pressed="false">عائلي وممتع</button>
        <button type="button" data-category="food" aria-pressed="false">أكل محلي</button>
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

  root.append(guide);

  const get = (id) => guide.querySelector(`#${id}`);
  const card = get('place-suggestion');
  const filters = [...guide.querySelectorAll('[data-category]')];
  let category = 'all';
  let currentName = '';

  function showSuggestion() {
    const available = hailPlaces.filter((place) => place.rating >= 4 && (category === 'all' || place.category === category));
    const choices = available.filter((place) => place.name !== currentName);
    const pool = choices.length ? choices : available;
    const place = pool[Math.floor(Math.random() * pool.length)];
    currentName = place.name;

    get('place-icon').textContent = place.icon;
    get('place-type').textContent = `★ ${place.rating.toFixed(1)} · ${place.type} في حائل`;
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

const tripForm = document.querySelector('#trip-form');
if (tripForm) {
  const status = document.querySelector('#planner-status');
  const result = document.querySelector('#trip-result');
  const submit = tripForm.querySelector('button[type="submit"]');
  const money = new Intl.NumberFormat('ar-SA', { style: 'currency', currency: 'SAR', maximumFractionDigits: 0 });

  tripForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(tripForm);
    const interests = data.getAll('interests');
    if (!interests.length) { status.textContent = 'اختر نوعاً واحداً من التجارب على الأقل.'; return; }
    submit.disabled = true;
    submit.textContent = 'جاري ترتيب طلعتك…';
    status.textContent = 'نجهّز برنامجاً يناسب ميزانيتك ورغباتك…';
    result.hidden = true;
    try {
      const response = await fetch('/api/plan', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ budget: Number(data.get('budget')), duration: Number(data.get('duration')), people: Number(data.get('people')), interests, notes: data.get('notes') }) });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.error || 'تعذّر إنشاء الاقتراح. حاول مرة أخرى.');
      const plan = payload.plan;
      document.querySelector('#trip-title').textContent = plan.title;
      document.querySelector('#trip-intro').textContent = plan.intro;
      document.querySelector('#trip-total').textContent = `التكلفة التقديرية: ${money.format(plan.estimated_total)}`;
      document.querySelector('#trip-tip').textContent = plan.tip;
      const stops = document.querySelector('#trip-stops');
      stops.replaceChildren();
      plan.stops.forEach((stop, index) => {
        const article = document.createElement('article'); article.className = 'trip-stop';
        const number = document.createElement('span'); number.className = 'stop-number'; number.textContent = new Intl.NumberFormat('ar-SA').format(index + 1);
        const copy = document.createElement('div');
        const type = document.createElement('span'); type.className = 'place-type'; type.textContent = stop.type;
        const title = document.createElement('h3'); title.textContent = stop.name;
        const reason = document.createElement('p'); reason.textContent = stop.reason;
        const meta = document.createElement('p'); meta.className = 'stop-meta'; meta.textContent = `★ ${stop.minimum_rating || 4}+ · ${stop.area} · ${stop.duration_minutes} دقيقة · نحو ${money.format(stop.estimated_cost)} · أفضل وقت: ${stop.best_time || 'تحقق قبل الزيارة'}`;
        const map = document.createElement('a'); map.className = 'map-link'; map.target = '_blank'; map.rel = 'noopener'; map.textContent = 'افتح في Google Maps ↗'; const query = Number.isFinite(stop.lat) && Number.isFinite(stop.lon) ? `${stop.lat},${stop.lon}` : `${stop.name} ${stop.area}`; map.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
        copy.append(type, title, reason, meta, map); article.append(number, copy); stops.append(article);
      });
      status.textContent = '';
      result.hidden = false;
      result.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    } catch (error) { status.textContent = error.message; }
    finally { submit.disabled = false; submit.textContent = 'اقترح لي برنامجاً'; }
  });
}
