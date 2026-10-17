import { en as gsap } from './assets/index-Dywa6qru.js';
(() => {
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const I = {
 dots:'<circle cx="5.5" cy="12" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="18.5" cy="12" r="1.3"/>',
 plus:'<path d="M12 5v14M5 12h14"/>', expand:'<path d="M7 17 17 7M8.5 7H17v8.5"/>',
 archive:'<path d="M4 13.5 6.3 6a2 2 0 0 1 1.9-1.5h7.6A2 2 0 0 1 17.7 6l2.3 7.5V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/><path d="M4 13.5h4.5l1.5 2.5h4l1.5-2.5H20"/>',
 bell:'<path d="M6 16v-5a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>',
 search:'<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/>',
 star:'<path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8L3.5 9.7l5.9-.9z"/>',
 cal:'<rect x="3.5" y="5" width="17" height="15.5" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
 device:'<rect x="6.5" y="2.5" width="11" height="19" rx="2.5"/><path d="M11 18.5h2"/>',
 send:'<path d="M20.5 3.5 3.5 10.6l6.6 2.8 2.8 6.6z"/><path d="m10.1 13.4 4.2-4.2"/>',
 share:'<circle cx="6" cy="12" r="2.5"/><circle cx="17.5" cy="6" r="2.5"/><circle cx="17.5" cy="18" r="2.5"/><path d="m8.2 10.8 7.1-3.6M8.2 13.2l7.1 3.6"/>',
 upload:'<path d="M12 15.5V4M7 8.5l5-5 5 5M5 14.5v3.5A2 2 0 0 0 7 20h10a2 2 0 0 0 2-2v-3.5"/>',
 gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2.8l2 2.1 2.9-.4.7 2.8 2.6 1.4-1 2.8 1 2.8-2.6 1.4-.7 2.8-2.9-.4-2 2.1-2-2.1-2.9.4-.7-2.8-2.6-1.4 1-2.8-1-2.8 2.6-1.4.7-2.8 2.9.4Z"/>',
 moon:'<path d="M19.5 14.5A8 8 0 0 1 9.5 4.5a8 8 0 1 0 10 10Z"/>',
 trophy:'<path d="M8 4.5h8v5a4 4 0 0 1-8 0zM8 6.5H4.5a3 3 0 0 0 3.5 4M16 6.5h3.5a3 3 0 0 1-3.5 4M12 13.5v3.5M8.5 20h7l-.5-3h-6z"/>',
 bars:'<path d="M4.5 19.5h15"/><path d="M7.5 16v-4.5M12 16V7.5M16.5 16v-6.5"/>',
 pie:'<path d="M12 3.5a8.5 8.5 0 1 0 8.5 8.5H12z"/><path d="M15 3.8A8.5 8.5 0 0 1 20.2 9H15z"/>',
 check:'<path d="m5 12.5 4.5 4.5L19 7.5"/>',
 call:'<path d="M6.5 3.5h3l1.5 4-2 1.5a11 11 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2 2A16 16 0 0 1 4.5 5.5a2 2 0 0 1 2-2z"/>',
 meeting:'<circle cx="9" cy="8.5" r="3.5"/><path d="M3 19.5c.6-3.2 3-5 6-5s5.4 1.8 6 5"/><path d="M15.5 5.2a3.5 3.5 0 0 1 0 6.6M17.5 14.8c1.8.6 3 2.2 3.5 4.7"/>',
 mail:'<rect x="3.5" y="5.5" width="17" height="13" rx="2.5"/><path d="m4 7 8 6 8-6"/>',
 receipt:'<path d="M6 3.5h12v17l-2-1.4-2 1.4-2-1.4-2 1.4-2-1.4-2 1.4Z"/><path d="M9 8h6M9 11.5h6M9 15h3.5"/>',
 folder:'<path d="M3.5 7.5a2 2 0 0 1 2-2h4l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z"/>'
};
const ico = n => `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true">${I[n]}</svg>`;
const money = n => '$' + Math.round(n).toLocaleString('en-US');
const short = n => n >= 1e6 ? '$' + +(n / 1e6).toFixed(1) + 'M' : n >= 1e3 ? '$' + +(n / 1e3).toFixed(1) + 'K' : '$' + n;
const toast = m => {
  const t = $('#toast') || $('.toast');
  if (!t) return;
  const msg = $('.toast__msg', t);
  if (msg) msg.textContent = m; else t.textContent = m;
  t.classList.add('show'); clearTimeout(toast.t);
  toast.t = setTimeout(() => t.classList.remove('show'), 2200);
};

$$('[data-ico]').forEach(b => {
  b.innerHTML = ico(b.dataset.ico);
  b.addEventListener('click', () => toast(b.getAttribute('aria-label')));
});
const addTask = $('#addTask');
if (addTask) {
  addTask.innerHTML = ico('plus') + 'Add';
  addTask.onclick = () => toast('Add task — not wired up yet');
}

/* ---- mock data (taken from the rendered page) ---- */
const P = { sofia:['Sofia Reyes','#c0623f'], amara:['Amara Okafor','#8a6bb8'], theo:['Theo Adeyemi','#3f8f84'], rohan:['Rohan Mehta','#b58a3a'], hanna:['Hanna Lindqvist','#4f7fc0'] };
const av = k => { const [n, c] = P[k]; return `<span class="avatar" style="background:${c}" title="${n}">${n.split(' ').map(w => w[0]).join('')}</span>`; };
const MONTHS = ['Nov','Dec','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct'];
const REV = [99.5,52,86,111,62,102,58,40,115,68,107,114.14].map(v => v * 1000);
const TARGET = 156700;
const HOT = [
 ['ink','Closes Oct 23','Fleet licence expansion','Kumo Retail',56180,'Closing · 90%',['hanna','sofia','rohan']],
 ['ink','Closes Nov 11','Integration build','Aldercrest Hotels',54940,'Closing · 90%',['sofia','hanna','amara']],
 ['ink','Closes Nov 17','Premium SLA','Aldercrest Hotels',54450,'Closing · 90%',['sofia','amara','rohan']],
 ['ink','Closes Nov 17','Annual renewal','Sable Freight',47100,'Closing · 90%',['rohan','sofia','amara']],
 ['tomato','Closes Oct 23','Seat true-up','Aldercrest Hotels',55430,'Negotiation · 70%',['sofia','amara','theo']],
 ['tomato','Closes Oct 27','Regional expansion','Sable Freight',49040,'Negotiation · 70%',['rohan','hanna','amara']]];
const MIX = [['Qualification','butter',10,277580],['Proposal','pine',9,117030],['Negotiation','tomato',12,325320],['Closing','ink',16,419170]];
const TEAM = [['sofia',94410,'270% of monthly quota · 3 deals'],['amara',18150,'73% of monthly quota · 1 deal'],['theo',0,'0% of monthly quota · 0 deals'],['rohan',0,'0% of monthly quota · 0 deals'],['hanna',0,'0% of monthly quota · 0 deals']];
const TASKS = [['Draft contract redlines','10:00 AM · Tidewater Freight','check','hanna'],['Discovery call','10:30 AM · Tidewater Freight','call','sofia'],['Kick-off workshop','11:30 AM · Orchard Row Bank','meeting','rohan'],['Check in on pilot','4:30 PM · Fennick & Rowe','call','theo']];
const NEXT = [['Renewal conversation','9:30 AM · Brisa Travel'],['Security walkthrough','10:00 AM · Nimbus Health'],['Draft contract redlines','2:00 PM · Atlas Ceramics']];
const FEED = [['sofia','trophy','<b>Sofia</b> moved Pilot rollout, 3 sites to Closing · <a href="#/customers">Tidewater Freight</a>','6 min ago'],
 ['theo','mail','<b>Theo</b> sent the revised proposal · <a href="#/customers">Brightmoor Clinics</a>','53 min ago'],
 ['sofia','call','<b>Sofia</b> logged a 24 min call · <a href="#/customers">Lumio Solar</a>','2 h ago'],
 ['rohan','receipt','<b>Rohan</b> marked invoice RP-2403 as paid · <a href="#/customers">Fennick &amp; Rowe</a>','2 h ago'],
 ['hanna','folder','<b>Hanna</b> finished Data import · <a href="#/customers">Aldercrest Hotels</a>','3 h ago'],
 ['amara','trophy','<b>Amara</b> won Annual renewal · <a href="#/customers">Orchard Row Bank</a>','4 h ago']];


/* ---- header stats ---- */
$('#stats').innerHTML = [
 ['trophy','$112,560','Won this month','<span class="badge">+5% vs last month</span>'],
 ['bars','$1,139,100','Open pipeline',''],
 ['pie','75%','Win rate, closed deals','']
].map(([i, v, l, b]) => `<div class="stat"><span class="stat__ico">${ico(i)}</span><div class="stat__body"><dd class="stat__value"><b>${v}</b>${b}</dd><dt class="stat__label">${l}</dt></div></div>`).join('');

/* ---- revenue chart ---- */
const chartEl = $('#chart');
function drawChart(n) {
  const d = REV.slice(-n), mo = MONTHS.slice(-n), W = 947, H = 236, L = 44, R = 935, T = 12, B = 210;
  const X = i => L + (R - L) * i / (d.length - 1), Y = v => B - (B - T) * v / 200000;
  let path = `M${X(0)},${Y(d[0])}`;
  for (let i = 1; i < d.length; i++) { const mx = (X(i - 1) + X(i)) / 2; path += ` C${mx},${Y(d[i - 1])} ${mx},${Y(d[i])} ${X(i)},${Y(d[i])}`; }
  const grid = [0, 100000, 200000].map(v => `<line x1="${L}" x2="${R}" y1="${Y(v)}" y2="${Y(v)}"/><text x="${L - 8}" y="${Y(v) + 4}" text-anchor="end">${v ? '$' + v / 1000 + 'K' : '$0'}</text>`).join('');
  chartEl.innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Revenue won per month against the monthly team target">
   <defs><linearGradient id="ga" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#d9532c" stop-opacity=".4"/><stop offset="1" stop-color="#d9532c" stop-opacity="0"/></linearGradient></defs>
   <g class="c-grid">${grid}</g>
   <path class="c-area" d="${path} L${R},${B} L${L},${B}Z"/><path class="c-line" d="${path}"/>
   <line class="c-target" x1="${L}" x2="${R}" y1="${Y(TARGET)}" y2="${Y(TARGET)}"/>
   <g>${mo.map((m, i) => `<text x="${X(i)}" y="230" text-anchor="middle">${m}</text>`).join('')}</g>
   <line class="c-cross" y1="${T}" y2="${B}" style="opacity:0"/><circle class="c-dot" r="4.5" style="opacity:0"/></svg><div class="chart__tip"></div>`;
  const svg = $('svg', chartEl), cross = $('.c-cross', chartEl), dot = $('.c-dot', chartEl), tip = $('.chart__tip', chartEl);
  svg.onmousemove = e => {
    const r = svg.getBoundingClientRect(), sx = (e.clientX - r.left) * W / r.width;
    const i = Math.max(0, Math.min(d.length - 1, Math.round((sx - L) / (R - L) * (d.length - 1))));
    cross.setAttribute('x1', X(i)); cross.setAttribute('x2', X(i)); dot.setAttribute('cx', X(i)); dot.setAttribute('cy', Y(d[i]));
    cross.style.opacity = dot.style.opacity = 1;
    tip.textContent = `${mo[i]} · ${money(d[i])}`; tip.style.opacity = 1;
    tip.style.left = X(i) / W * 100 + '%'; tip.style.top = Y(d[i]) / H * r.height + 'px';
  };
  svg.onmouseleave = () => { cross.style.opacity = dot.style.opacity = tip.style.opacity = 0; };
  const total = d.reduce((a, b) => a + b, 0), hit = d.filter(v => v >= TARGET).length;
  $('#revTotal').textContent = money(total);
  $('#revSub').innerHTML = `won in ${n} months · <b>${hit}</b> of ${n} at target`;
  $('#revTarget').textContent = short(TARGET);
}
drawChart(12);
$$('#seg button').forEach(b => b.onclick = () => { $$('#seg button').forEach(x => x.classList.toggle('on', x === b)); drawChart(+b.dataset.v); });

/* ---- hot deals ---- */
$('#hot').innerHTML = HOT.map(([t, date, title, co, amt, st, ppl], i) => `<article class="ov-tile ov-tile--${t}">
 <div class="ov-tile__top"><span>${date}</span><button class="ibtn" data-deal="${title}" aria-label="Actions for ${title}">${ico('dots')}</button></div>
 <h3 class="ov-tile__title"><a href="#/pipeline">${title}</a></h3><p class="ov-tile__co">${co}</p>
 <div class="ov-tile__foot"><div><b class="ov-tile__amt num">${money(amt)}</b><small>${st}</small></div><span class="av-stack">${ppl.map(av).join('')}</span></div></article>`).join('');
$$('[data-deal]').forEach(b => b.onclick = () => toast('Actions for ' + b.dataset.deal));

/* ---- quota ring ---- */
requestAnimationFrame(() => setTimeout(() => $('#arc').style.strokeDashoffset = 527.79 * (1 - 0.24), 150));

/* ---- stage mix ---- */
const tot = MIX.reduce((a, m) => a + m[3], 0);
$('#mixBar').innerHTML = MIX.map(m => `<a class="ov-mix__seg tone--${m[1]}" href="#/pipeline" style="flex-grow:${m[3]}" title="${m[0]} · ${money(m[3])}"></a>`).join('');
$('#mixLegend').innerHTML = MIX.map(m => `<li><i class="tone--${m[1]}"></i><span>${m[0]}</span><b class="num">${m[2]}</b><span class="num">${short(m[3])}</span><span class="num ov-mix__share">${Math.round(m[3] / tot * 100)}%</span></li>`).join('');

/* ---- leaderboard ---- */
$('#team').innerHTML = TEAM.map(([k, v, s], i) => `<li class="ov-rank__row${i ? '' : ' is-lead'}"><span class="ov-rank__n num">${i + 1}</span>${av(k)}
 <div class="ov-rank__body"><div class="ov-rank__line"><b>${P[k][0]}</b><span class="num">${money(v)}</span></div>
 <span class="meter"><span class="meter__fill" style="transform:scaleX(0)" data-s="${Math.min(1, v / 35000)}"></span></span><small>${s}</small></div></li>`).join('');
setTimeout(() => $$('.ov-rank .meter__fill').forEach(f => f.style.transform = `scaleX(${f.dataset.s})`), 200);

/* ---- today ---- */
$('#tasks').innerHTML = TASKS.map(([t, s, k, p], i) => `<li class="ov-task"><input type="checkbox" class="check" id="t${i}"><label class="ov-task__body" for="t${i}"><b>${t}</b><small>${s}</small></label><span class="ov-task__kind">${ico(k)}</span>${av(p).replace('class="avatar"', 'class="avatar"')}</li>`).join('');
function prog() { const done = $$('.check').filter(c => c.checked).length; $('#prog').innerHTML = `<b>${done}</b> of ${TASKS.length} done`; $('#progBar').style.transform = `scaleX(${done / TASKS.length})`; }
$$('.check').forEach(c => c.onchange = prog); prog();
$('#next').innerHTML = NEXT.map(([t, s]) => `<li><span class="ov-next__when">Sun<br>18</span><span class="ov-next__what"><b>${t}</b><small>${s}</small></span></li>`).join('');

/* ---- feed ---- */
$('#feed').innerHTML = FEED.map(([p, i, h, t]) => `<li class="ov-feed__item">${av(p)}<p>${h}<small>${t}</small></p><span class="ov-feed__ico">${ico(i)}</span></li>`).join('');



// Use the shell's bundled GSAP engine for the Claude overview entrance.
gsap.from('#claude-overview .ov-grid > .card', { y:18, opacity:0, duration:.48, stagger:.045, delay:.08, ease:'power3.out' });
gsap.from('#claude-overview .ov-tile', { y:12, opacity:0, duration:.38, stagger:.06, delay:.22, ease:'power2.out' });

/* Use Rapport's real shell routes and animated navigation pill. */
function route() {
  const r = (location.hash.split('/')[1] || 'overview').split('?')[0];
  if (r !== 'overview') return;
  document.title = 'Overview · Rapport';
  const pill = $('.tabs__pill');
  $$('.tab').forEach(t => {
    const on = (t.dataset.route || t.dataset.r) === 'overview';
    t.toggleAttribute('aria-current', false);
    if (on) {
      t.setAttribute('aria-current', 'page');
      pill.style.left = t.offsetLeft + 'px';
      pill.style.width = t.offsetWidth + 'px';
      pill.style.opacity = 1;
    }
  });
  drawChart(+($('#seg .on')?.dataset.v || 12));
}
addEventListener('hashchange', route);
addEventListener('resize', route);
document.fonts ? document.fonts.ready.then(route) : route();
route();
})();
