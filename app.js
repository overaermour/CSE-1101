'use strict';
const KEY = 'ug-cse1101-study-v1';
const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];
const E = value => String(value).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let state = {done:[],history:[],theme:'light'};
try { const saved=JSON.parse(localStorage.getItem(KEY)||'{}'); state={...state,...saved,done:Array.isArray(saved.done)?saved.done:[],history:Array.isArray(saved.history)?saved.history:[]}; }catch(e) { /* private mode or blocked storage */ }
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(state));}catch(e){ /* site remains usable */ }};
let quizSession=null, quizTimer=null, flashSession={week:'midterm',index:0,flipped:false,cards:[]};
let activeRoute='dashboard';
function setTheme(theme){state.theme=theme;document.documentElement.dataset.theme=theme==='dark'?'dark':'light';save();}
setTheme(state.theme);
function toast(message){const el=$('#toast');el.textContent=message;el.classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove('show'),2500);}
function stopTimer(){if(quizTimer){clearInterval(quizTimer);quizTimer=null;}}
function progress(){return state.done.filter(w=>Number.isInteger(w)&&w>=1&&w<=11).length;}
function accuracy(){const attempts=state.history;const total=attempts.reduce((s,x)=>s+x.total,0);return total?Math.round(100*attempts.reduce((s,x)=>s+x.correct,0)/total):null;}
function slugRoute(){const h=location.hash.replace(/^#/,'');return h || 'dashboard';}
function navigate(hash){location.hash=hash;}
function linkWeek(w){return `#lessons/${w}`;}
function updateChrome(view){
  $$('#main-nav a').forEach(a=>a.classList.toggle('active',a.dataset.nav===view));
  const wMatch=slugRoute().match(/^lessons\/(\d+)$/);
  $$('#week-nav a').forEach(a=>a.classList.toggle('active',wMatch && Number(a.dataset.week)===Number(wMatch[1])));
  const n=progress();$('#side-progress-text').textContent=`${n} / 11`;$('#side-progress-bar').style.width=`${n/11*100}%`;
  $$('#week-nav a').forEach(a=>{const w=Number(a.dataset.week),check=$('.week-check',a); if(check)check.textContent=state.done.includes(w)?'✓':'';});
  const names={dashboard:'Dashboard',lessons:'Study lessons',practice:'Practice questions',mocks:'Mock midterms',flashcards:'Flashcards',reference:'Formula sheet'};
  $('#breadcrumb').innerHTML=`University of Guyana <span>/</span> ${E(names[view]||'Study hub')}`;
}
function initNav(){
  $('#week-nav').innerHTML=LESSONS.map(l=>`<a data-week="${l.week}" href="${linkWeek(l.week)}"><span class="week-number">${String(l.week).padStart(2,'0')}</span><span class="week-label">${E(l.title)}</span><span class="week-check"></span></a>`).join('');
  const toggle=()=>setTheme(state.theme==='light'?'dark':'light');
  $('#theme-toggle').addEventListener('click',toggle);$('#top-theme-toggle').addEventListener('click',toggle);
  $('#menu-button').addEventListener('click',()=>openMenu(!$('#sidebar').classList.contains('open')));
  $('#menu-overlay').addEventListener('click',()=>openMenu(false));
  $$('#sidebar a').forEach(a=>a.addEventListener('click',()=>openMenu(false)));
  window.addEventListener('hashchange',render);
  document.addEventListener('keydown',event=>{if(event.key==='Escape')openMenu(false);if(activeRoute==='flashcards'&&event.target.tagName!=='SELECT'){if(event.key==='ArrowRight')nextFlash(1);if(event.key==='ArrowLeft')nextFlash(-1);}});
  render();
}
function openMenu(isOpen){$('#sidebar').classList.toggle('open',isOpen);$('#menu-overlay').hidden=!isOpen;$('#menu-button').setAttribute('aria-expanded',String(isOpen));}
function render(){
  stopTimer();quizSession=null;
  const route=slugRoute(), parts=route.split('/');activeRoute=parts[0];
  const valid=['dashboard','lessons','practice','mocks','flashcards','reference'];if(!valid.includes(activeRoute))activeRoute='dashboard';
  updateChrome(activeRoute);
  if(activeRoute==='dashboard')renderDashboard();
  if(activeRoute==='lessons')renderLessons(Number(parts[1])||1);
  if(activeRoute==='practice')renderPracticeSetup();
  if(activeRoute==='mocks')renderMocks();
  if(activeRoute==='flashcards')renderFlashcards();
  if(activeRoute==='reference')renderReference();
  window.scrollTo({top:0,behavior:'instant'});
}
function pageHeading(kicker,heading,sub,action=''){return `<div class="page-heading"><div><div class="eyebrow">${E(kicker)}</div><h1>${E(heading)}</h1><p>${E(sub)}</p></div>${action}</div>`;}
function topicCard(l){return `<a class="topic-card card" href="${linkWeek(l.week)}"><div class="topic-card-top"><span class="week-tag ${l.focus?'':'future'}">WEEK ${String(l.week).padStart(2,'0')} ${l.focus?'· CORE':''}</span>${state.done.includes(l.week)?'<span class="done-tag">✓ Complete</span>':''}</div><h3>${E(l.title)}</h3><p>${E(l.short)}</p><span class="bottom-link">Open lesson ↗</span></a>`;}
function renderDashboard(){
  const next=LESSONS.find(l=>!state.done.includes(l.week))||LESSONS[0];
  const attempts=state.history, last=attempts[attempts.length-1];
  $('#main').innerHTML=`<section class="hero"><div><div class="eyebrow">UNIVERSITY OF GUYANA · CSE1101</div><h1>Master the logic.<br>Own the midterm.</h1><p>Clear notes, worked examples, over 100 practice questions and eight mock papers — all in one offline-ready study space.</p><div class="actions"><a class="btn primary" href="${linkWeek(next.week)}">Continue studying <span>↗</span></a><a class="btn ghost" href="#mocks">Try a mock exam</a></div></div><div class="hero-art"><span>∀x ∃y</span><small>p → q</small><small>∴ q</small></div></section>
  <section class="stats-grid" aria-label="Study statistics"><div class="stat card"><span class="overline">TOPICS COMPLETED</span><strong>${progress()}<span style="font-size:19px;color:var(--muted)">/11</span></strong><div class="progress-track"><span style="width:${progress()/11*100}%"></span></div></div><div class="stat card"><span class="overline">PRACTICE ACCURACY</span><strong>${accuracy()===null?'—':accuracy()+'%'}</strong><small>${attempts.length?`${attempts.length} completed sessions`:'Take a quiz to get started'}</small></div><div class="stat card"><span class="overline">PRACTICE QUESTIONS</span><strong>${QUESTIONS.length}</strong><small>With explained answers</small></div></section>
  <div class="section-head"><div><h2>Midterm priority · Weeks 1–6</h2><p>Logic, quantified arguments, inference and validity</p></div><a class="inline-link" href="#practice">Practice now ↗</a></div><section class="topic-grid">${LESSONS.filter(l=>l.focus).map(topicCard).join('')}</section>
  <div class="callout"><span class="callout-symbol">!</span><div><strong>Check your actual midterm coverage.</strong><p>This site prioritizes Weeks 1–6 as a suggested midterm study set, not a confirmed exam boundary. Your image also includes Weeks 7–11, which are covered below. Your lecturer's instructions take priority.</p></div></div>
  <div class="section-head"><div><h2>More from the syllabus · Weeks 7–11</h2><p>Set theory, proof methods, combinatorics, relations and functions</p></div><a class="inline-link" href="#reference">See formula sheet ↗</a></div><section class="topic-grid">${LESSONS.filter(l=>!l.focus).map(topicCard).join('')}</section>
  ${last?`<div class="callout"><span class="callout-symbol">↗</span><div><strong>Latest result: ${last.correct}/${last.total} (${Math.round(100*last.correct/last.total)}%)</strong><p>${E(last.label)} · ${new Date(last.date).toLocaleDateString()}. Keep revisiting explanations after missed questions.</p></div></div>`:''}`;
}
function renderLessons(week){
  if(week<1||week>11)week=1;
  const l=LESSONS[week-1];
  const para=s=>E(s),sectionBody=l.sections.map((s,i)=>`<section class="lesson-block" id="section-${i}"><h3>${E(s.title)}</h3><p>${para(s.body)}</p>${s.formula?`<div class="formula-box"><div class="formula">${para(s.formula)}</div>${s.note?`<p>${para(s.note)}</p>`:''}</div>`:''}</section>`).join('');
  const examples=l.examples.map((ex,i)=>`<div class="worked"><div class="example-title">WORKED EXAMPLE ${i+1}</div><h4>${E(ex.title)}</h4><p>${E(ex.question)}</p><div class="steps">${ex.steps.map(x=>`<div class="step">${E(x)}</div>`).join('')}</div></div>`).join('');
  const checkIndex=QUESTIONS.findIndex(q=>q[0]===week);
  const quick=QUESTIONS[checkIndex];
  $('#main').innerHTML=`${pageHeading(`WEEK ${week} / 11 · ${l.focus?'MIDTERM CORE':'EXTENDED SYLLABUS'}`,l.title,l.intro,`<span class="pill">${l.focus?'Core revision':'Additional revision'}</span>`)}<div class="study-layout"><div class="lesson-content"><article class="card lesson-panel"><h2>What you'll learn</h2><ul>${l.goals.map(g=>`<li>${E(g)}</li>`).join('')}</ul>${sectionBody}<section class="lesson-block" id="worked-examples"><h3>Worked examples</h3><p>Follow the reasoning, not just the final answer.</p>${examples}</section><div class="hint"><strong>EXAM TRAP:</strong> ${E(l.trap)}</div><section class="check-area" id="quick-check"><h4>Quick knowledge check</h4><p style="font-size:13px;color:var(--muted)">${E(quick[1])}</p><div class="answer-options" id="quick-answers">${quick[2].map((opt,i)=>`<button type="button" class="option" data-quick="${i}"><span class="option-letter">${'ABCD'[i]}</span><span>${E(opt)}</span></button>`).join('')}</div><div id="quick-feedback"></div></section><div class="lesson-actions"><button type="button" id="mark-complete" class="btn ${state.done.includes(week)?'secondary':''}">${state.done.includes(week)?'✓ Marked complete (undo)':'✓ Mark lesson complete'}</button><div class="lesson-nav"><a class="btn secondary small" href="${linkWeek(Math.max(1,week-1))}" ${week===1?'aria-disabled="true"':''}>← Previous</a><a class="btn secondary small" href="${linkWeek(Math.min(11,week+1))}">Next →</a></div></div></article></div><aside class="card lesson-toc"><h3>ON THIS PAGE</h3><div class="toc-links">${l.sections.map((s,i)=>`<a href="#section-${i}" data-scroll="section-${i}">${E(s.title)}</a>`).join('')}<a href="#worked-examples" data-scroll="worked-examples">Worked examples</a><a href="#quick-check" data-scroll="quick-check">Knowledge check</a></div><p style="font-size:12px;color:var(--muted)">Test yourself when you're done.</p><button type="button" class="btn full" id="practice-this-week">Practice Week ${week} ↗</button></aside></div>`;
  $('#mark-complete').addEventListener('click',()=>{state.done=state.done.includes(week)?state.done.filter(w=>w!==week):[...state.done,week].sort((a,b)=>a-b);save();renderLessons(week);updateChrome('lessons');toast(state.done.includes(week)?'Lesson marked complete':'Lesson unmarked');});
  $('#practice-this-week').addEventListener('click',()=>{navigate('#practice');setTimeout(()=>{const s=$('#scope-select');if(s)s.value=String(week);},0);});
  $$('#quick-answers button').forEach(b=>b.addEventListener('click',()=>{const val=Number(b.dataset.quick),correct=quick[3];$$('#quick-answers button').forEach(x=>{x.disabled=true;x.classList.toggle('correct',Number(x.dataset.quick)===correct);x.classList.toggle('incorrect',Number(x.dataset.quick)===val&&val!==correct);});$('#quick-feedback').innerHTML=`<div class="feedback"><strong>${val===correct?'Correct!':'Not quite.'}</strong>${E(quick[4])}</div>`;}));
  $$('[data-scroll]').forEach(a=>a.addEventListener('click',ev=>{ev.preventDefault();document.getElementById(a.dataset.scroll)?.scrollIntoView({behavior:'smooth',block:'start'});}));
}
function scopeSelect(defaultValue='midterm'){
  return `<select class="input" id="scope-select" aria-label="Select study topics"><option value="midterm" ${defaultValue==='midterm'?'selected':''}>Midterm focus: Weeks 1–6</option><option value="all" ${defaultValue==='all'?'selected':''}>All 11 weeks</option>${LESSONS.map(l=>`<option value="${l.week}" ${String(defaultValue)===String(l.week)?'selected':''}>Week ${l.week}: ${E(l.title)}</option>`).join('')}</select>`;
}
function renderPracticeSetup(){
  $('#main').innerHTML=`${pageHeading('PRACTICE MODE','Build your practice quiz','Choose a topic range and answer questions with instant feedback and clear explanations.')}<div class="assessment-layout"><section class="card setup-card"><h2>Customize your session</h2><p>Every attempt draws a fresh mix from the question bank. You can retry as often as you like.</p><label class="form-label" for="scope-select">TOPICS TO PRACTICE</label>${scopeSelect()}<label class="form-label" for="count-select">NUMBER OF QUESTIONS</label><select class="input" id="count-select"><option value="5">5 questions · Quick warm-up</option><option value="10" selected>10 questions · Focused review</option><option value="20">20 questions · Longer practice</option></select><div class="callout" style="margin:25px 0"><span class="callout-symbol">✓</span><div><strong>Learn as you go</strong><p>After selecting an option, you'll see whether it was correct and why. Your score is saved when you finish.</p></div></div><button type="button" class="btn primary full" id="start-practice">Start practice →</button></section><aside class="card mini-list"><h3>How to use practice mode</h3><ul><li>Study a lesson and its worked examples first.</li><li>Pick one week to target a weak area.</li><li>Read explanations for every missed question.</li><li>Use the mock papers when you want an exam-like experience.</li></ul><p>You can also practice the entire 11-week course, not just the suggested midterm range.</p></aside></div>`;
  $('#start-practice').addEventListener('click',()=>{
    const scope=$('#scope-select').value,count=Number($('#count-select').value);
    const pool=QUESTIONS.map((q,i)=>({q,i})).filter(({q})=>scope==='all'||(scope==='midterm'?q[0]<=6:q[0]===Number(scope))).map(x=>x.i);
    const indices=shuffle(pool).slice(0,Math.min(count,pool.length));
    beginQuiz(indices,false,`Practice · ${scope==='midterm'?'Weeks 1–6':scope==='all'?'All weeks':`Week ${scope}`}`);
  });
}
function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return ((t^t>>>14)>>>0)/4294967296;};}
function shuffle(items,rng=Math.random){const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function mockQuestions(paper){const rng=mulberry32(1101+paper*4243);let chosen=[];for(let w=1;w<=6;w++){const pool=QUESTIONS.map((q,i)=>q[0]===w?i:-1).filter(i=>i>=0);chosen.push(...shuffle(pool,rng).slice(0,3));}return shuffle(chosen,rng);}
function renderMocks(){
  $('#main').innerHTML=`${pageHeading('EXAM SIMULATOR','Eight mock midterm papers','Each paper contains 18 questions — three from each of Weeks 1–6 — and a 35-minute timer. Answers are revealed at the end.')}
  <div class="callout" style="margin-top:0;margin-bottom:25px"><span class="callout-symbol">i</span><div><strong>Practice exams, not official UG papers.</strong><p>The papers are original revision questions based on the visible course outline. Their Week 1–6 scope is a study assumption; confirm your midterm topics with your lecturer.</p></div></div>
  <div class="mock-grid">${Array.from({length:8},(_,i)=>{const paper=i+1;const attempts=state.history.filter(h=>h.paper===paper),last=attempts.at(-1);return `<div class="card mock-card"><span class="number">PAPER ${String(paper).padStart(2,'0')}</span><h3>Mock midterm ${paper}</h3><p>18 questions · 35 minutes<br>Weeks 1–6 · Mixed topics</p>${last?`<div style="font-size:11px;color:var(--green);margin-bottom:10px;font-weight:800">Previous: ${last.correct}/18 (${Math.round(100*last.correct/18)}%)</div>`:''}<button class="btn ${last?'secondary':'primary'} full" data-paper="${paper}" type="button">${last?'Retake paper':'Start paper'} →</button></div>`;}).join('')}</div>`;
  $$('[data-paper]').forEach(b=>b.addEventListener('click',()=>{const p=Number(b.dataset.paper);beginQuiz(mockQuestions(p),true,`Mock midterm ${p}`,p);}));
}
function beginQuiz(indices,mock,label,paper=null){stopTimer();quizSession={indices,answers:Array(indices.length).fill(null),index:0,mock,label,paper,time:mock?35*60:null,finished:false};renderQuestion();if(mock)startTimer();}
function startTimer(){stopTimer();quizTimer=setInterval(()=>{if(!quizSession||quizSession.finished){stopTimer();return;}quizSession.time--;const el=$('#quiz-time');if(el){el.textContent=formatTime(quizSession.time);el.classList.toggle('low',quizSession.time<=300);}if(quizSession.time<=0){stopTimer();finishQuiz(true);}},1000);}
function formatTime(seconds){return `${Math.floor(Math.max(0,seconds)/60).toString().padStart(2,'0')}:${Math.max(0,seconds%60).toString().padStart(2,'0')}`;}
function renderQuestion(){
  const s=quizSession;if(!s)return;
  const i=s.index, q=QUESTIONS[s.indices[i]],answer=s.answers[i],done=answer!==null;
  const letters='ABCD';
  const options=q[2].map((opt,k)=>{const classes=['option'];if(done){if(s.mock){if(answer===k)classes.push('selected');}else{if(k===q[3])classes.push('correct');if(k===answer&&k!==q[3])classes.push('incorrect');}}return `<button type="button" class="${classes.join(' ')}" data-answer="${k}" ${(!s.mock&&done)?'disabled':''} aria-pressed="${answer===k}"><span class="option-letter">${letters[k]}</span><span>${E(opt)}</span></button>`;}).join('');
  $('#main').innerHTML=`<section class="quiz-container"><div class="quiz-header"><div><div class="eyebrow">${s.mock?'EXAM SIMULATOR':'PRACTICE SESSION'}</div><h2>${E(s.label)}</h2></div><div style="display:flex;gap:10px;align-items:center">${s.mock?`<div id="quiz-time" class="quiz-timer ${s.time<=300?'low':''}">${formatTime(s.time)}</div>`:''}<button type="button" class="btn secondary small" id="exit-quiz">Exit ×</button></div></div><div class="card quiz-card"><div class="quiz-meta"><span>QUESTION ${i+1} OF ${s.indices.length}</span><span>WEEK ${q[0]} · ${E(LESSONS[q[0]-1].title)}</span></div><div class="quiz-bar"><span style="width:${(i+1)/s.indices.length*100}%"></span></div><h3 class="question-prompt">${E(q[1])}</h3><div class="answer-options">${options}</div>${done&&!s.mock?`<div class="feedback"><strong>${answer===q[3]?'Correct answer.':'Not quite — review this.'}</strong>${E(q[4])}</div>`:''}<div class="quiz-footer"><button type="button" class="btn secondary" id="prev-question" ${i===0?'disabled':''}>← Previous</button><button type="button" class="btn ${i===s.indices.length-1?'primary':'secondary'}" id="next-question">${i===s.indices.length-1?'Finish and review →':'Next question →'}</button></div></div><div class="question-dots" aria-label="Question navigation">${s.answers.map((a,j)=>`<button type="button" aria-label="Go to question ${j+1}" class="q-dot ${i===j?'current':''} ${a!==null?'answered':''}" data-question="${j}">${j+1}</button>`).join('')}</div><p style="font-size:12px;color:var(--muted)">${s.mock?'Your choices are hidden until submission. You can revise answers before you submit.':'An explanation appears after each answer. Use the question squares to revisit a question.'}</p></section>`;
  $$('[data-answer]').forEach(b=>b.addEventListener('click',()=>{if(!s.mock&&s.answers[s.index]!==null)return;s.answers[s.index]=Number(b.dataset.answer);renderQuestion();}));
  $('#prev-question').addEventListener('click',()=>{s.index--;renderQuestion();});
  $('#next-question').addEventListener('click',()=>{if(s.index===s.indices.length-1){if(s.mock){const missing=s.answers.filter(x=>x===null).length;if(missing&&!confirm(`You have ${missing} unanswered question${missing>1?'s':''}. Submit anyway?`))return;}finishQuiz(false);}else{s.index++;renderQuestion();}});
  $$('[data-question]').forEach(b=>b.addEventListener('click',()=>{s.index=Number(b.dataset.question);renderQuestion();}));
  $('#exit-quiz').addEventListener('click',()=>{if(confirm('Exit this session? Unsubmitted answers will be lost.')){stopTimer();quizSession=null;activeRoute=s.mock?'mocks':'practice';if(s.mock)renderMocks();else renderPracticeSetup();}});
}
function finishQuiz(timedOut){
  const s=quizSession;if(!s||s.finished)return;s.finished=true;stopTimer();
  const correct=s.indices.reduce((sum,qi,i)=>sum+(s.answers[i]===QUESTIONS[qi][3]?1:0),0);
  state.history.push({label:s.label,total:s.indices.length,correct,paper:s.paper,date:new Date().toISOString()});
  if(state.history.length>100)state.history=state.history.slice(-100);save();updateChrome(s.mock?'mocks':'practice');
  const percent=Math.round(correct/s.indices.length*100);
  $('#main').innerHTML=`<div class="card result-panel"><div class="eyebrow">SESSION COMPLETE${timedOut?' · TIME EXPIRED':''}</div><h1 style="margin:0 0 8px;letter-spacing:-1px">${percent>=80?'Strong result!':percent>=55?'Good progress. Keep going.':'A useful starting point.'}</h1><div class="score-badge">${percent}% <small>${correct} / ${s.indices.length} correct</small></div><p style="color:var(--muted);font-size:13px;max-width:590px">${E(s.label)}. Review the questions below — every explanation is a chance to improve your next attempt.</p><div class="controls-row" style="margin:23px 0"><button type="button" class="btn primary" id="retry-quiz">Try this ${s.mock?'paper':'quiz'} again ↗</button><a href="${s.mock?'#mocks':'#practice'}" class="btn secondary">Choose another session</a></div><div class="section-head"><h2>Answer review</h2><span class="pill">${s.answers.filter(x=>x!==null).length} answered</span></div>${s.indices.map((qi,i)=>{const q=QUESTIONS[qi],a=s.answers[i],ok=a===q[3];return `<article class="review-item"><h4>${i+1}. ${E(q[1])}</h4><p class="${ok?'good':'bad'}">${ok?'✓ Correct':a===null?'○ Not answered':'✕ Incorrect'}${a!==null?' · Your answer: '+E(q[2][a]):''}</p><p><strong>Correct answer:</strong> ${E(q[2][q[3]])}</p><p>${E(q[4])}</p></article>`;}).join('')}</div>`;
  $('#retry-quiz').addEventListener('click',()=>beginQuiz(s.indices,s.mock,s.label,s.paper));
  window.scrollTo({top:0,behavior:'instant'});
}
function cardsFor(scope){return FLASHCARDS.filter(c=>scope==='all'||(scope==='midterm'?c[0]<=6:c[0]===Number(scope)));}
function renderFlashcards(){
  flashSession={week:'midterm',index:0,flipped:false,cards:cardsFor('midterm')};
  $('#main').innerHTML=`${pageHeading('ACTIVE RECALL','Flashcards','Recall the answer before flipping the card. Use the arrow buttons — or left and right arrow keys — to navigate.')}
  <div class="flash-wrap"><div class="controls-row"><label class="form-label" for="flash-scope" style="margin:0">CARD DECK</label><select class="input flash-filter" id="flash-scope"><option value="midterm">Midterm deck · Weeks 1–6</option><option value="all">Entire course</option>${LESSONS.map(l=>`<option value="${l.week}">Week ${l.week}: ${E(l.title)}</option>`).join('')}</select><button class="btn secondary small" id="shuffle-flash">Shuffle deck ↝</button></div><div class="flash-meta" id="flash-count"></div><button type="button" class="flashcard" id="flash-card" aria-label="Flip flashcard" aria-pressed="false"><small id="flash-side">QUESTION</small><span class="face" id="flash-face"></span><span class="tap">Click or tap to reveal the other side ↻</span></button><div class="flash-controls"><button class="btn secondary" id="flash-prev">← Previous</button><span class="pill" id="flash-week"></span><button class="btn secondary" id="flash-next">Next →</button></div><div class="callout"><span class="callout-symbol">◈</span><div><strong>Study method: active recall</strong><p>Say your answer out loud before revealing it. Repeat difficult cards until you can explain them without looking.</p></div></div></div>`;
  $('#flash-scope').addEventListener('change',e=>{flashSession={week:e.target.value,index:0,flipped:false,cards:cardsFor(e.target.value)};drawFlash();});
  $('#shuffle-flash').addEventListener('click',()=>{flashSession.cards=shuffle(flashSession.cards);flashSession.index=0;flashSession.flipped=false;drawFlash();toast('Cards shuffled');});
  $('#flash-card').addEventListener('click',()=>{flashSession.flipped=!flashSession.flipped;drawFlash();});
  $('#flash-prev').addEventListener('click',()=>nextFlash(-1));$('#flash-next').addEventListener('click',()=>nextFlash(1));drawFlash();
}
function drawFlash(){if(activeRoute!=='flashcards'||!$('#flash-card'))return;const s=flashSession,c=s.cards[s.index];if(!c)return;$('#flash-count').textContent=`CARD ${s.index+1} OF ${s.cards.length}`;$('#flash-side').textContent=s.flipped?'ANSWER':'QUESTION';$('#flash-face').textContent=s.flipped?c[2]:c[1];$('#flash-card').setAttribute('aria-pressed',String(s.flipped));$('#flash-week').textContent=`Week ${c[0]}`;}
function nextFlash(step){if(activeRoute!=='flashcards'||!flashSession.cards.length)return;flashSession.index=(flashSession.index+step+flashSession.cards.length)%flashSession.cards.length;flashSession.flipped=false;drawFlash();}
function renderReference(){
  $('#main').innerHTML=`${pageHeading('QUICK REFERENCE','Formula & rules sheet','The key logical laws, inference rules and formulae in one printable study guide.',`<button type="button" class="btn secondary" id="print-sheet">Print / save as PDF ↗</button>`)}<div class="reference-layout">${REFERENCES.map(r=>`<article class="card reference-card"><h3>${E(r.title)}</h3>${r.items.map(x=>`<div class="ref-item"><strong>${E(x[0])}</strong><span>${E(x[1])}</span></div>`).join('')}</article>`).join('')}</div><div class="callout"><span class="callout-symbol">✓</span><div><strong>Exam strategy</strong><p>Memorize rules of inference and equivalences first, then practise translating English to symbols and constructing counterexamples. For proofs, state assumptions and justify every step.</p></div></div>`;
  $('#print-sheet').addEventListener('click',()=>window.print());
}
initNav();
