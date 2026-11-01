(function(){
const P=window.PROBLEM, app=document.getElementById("app"), N=P.steps.length;
let i=0, results=[];
function tracker(){return `<div class="tracker">${P.tracker.map((t,k)=>{let c=k<N&&results[k]!=null?(results[k]?"done":"miss"):"";if(k===i)c="on";if(i>=N&&k===N)c="on";return `<div class="${c}">${k+1}. ${t}</div>`}).join("")}</div>`}
function head(){return `<div class="kicker">${P.chapter} · ${P.lesson} · ${P.number}</div><h1>${P.title}</h1><div class="prob">${P.text}</div>`}
function render(){
  if(i>=N) return finish();
  const s=P.steps[i];
  app.innerHTML=head()+tracker()+`<div class="kicker">Step ${i+1} of ${N} · ${s.label}</div><div class="q">${s.q}</div><div id="chs">${s.choices.map((c,k)=>`<button class="ch" data-k="${k}"><span class="L">${"ABCD"[k]}</span><span class="body">${c.html}</span></button>`).join("")}</div><div id="fb"></div>`;
  app.querySelectorAll(".ch").forEach(b=>b.onclick=()=>pick(+b.dataset.k));
  window.scrollTo(0,0);
}
function pick(k){
  const s=P.steps[i], ok=k===s.correct; results[i]=ok;
  app.querySelectorAll(".ch").forEach(b=>{const j=+b.dataset.k;b.disabled=true;if(j===s.correct)b.classList.add("right");else if(j===k)b.classList.add("wrong");else b.classList.add("dim")});
  const L="ABCD";
  const fb=ok?`<div class="fb ok"><h3>✔ Yes, ${L[k]} is right!</h3><p>${s.right}</p></div>`
    :`<div class="fb no"><h3>Not quite. You picked ${L[k]}.</h3><p>${s.choices[k].why}</p><p><b>The right choice is ${L[s.correct]}:</b> ${s.right}</p></div>`;
  document.getElementById("fb").innerHTML=fb+`<button class="btn" id="next">${i===N-1?"Check & see full solution ›":"Next step ›"}</button>`;
  app.querySelector(".tracker").outerHTML=tracker();
  document.getElementById("next").onclick=()=>{i++;render()};
  document.getElementById("fb").scrollIntoView({behavior:"smooth",block:"start"});
}
function finish(){
  const sc=results.filter(Boolean).length;
  app.innerHTML=head()+tracker()+`<div class="kicker">${P.tracker[N]||"Check"}</div><div class="score">${sc} of ${N} steps right on the first try${sc===N?" 🎉":""}</div><h2>Full worked solution</h2><ol class="sol">${P.solution.map(x=>`<li>${x}</li>`).join("")}</ol><button class="btn" id="again">Try again</button><a href="index.html"><button class="btn alt">Back to all problems</button></a>`;
  document.getElementById("again").onclick=()=>{i=0;results=[];render()};
  window.scrollTo(0,0);
}
render();
})();
