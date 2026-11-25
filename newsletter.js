/* Newsletter popup. Opens on every visit and every refresh, a moment after the page loads.
   Moving between pages inside the site does not reopen it. Add ?newsletter to any address to force it. */
(function(){
var me=document.currentScript,base=me.src.replace(/newsletter\.js.*$/,''),force=/[?&]newsletter\b/.test(location.search);
var d=document,done=false,nav=(performance.getEntriesByType&&performance.getEntriesByType('navigation')[0])||{};
var inside=d.referrer.indexOf(base)===0&&nav.type!=='reload';
if(inside&&!force)return;
window.dataLayer=window.dataLayer||[];
function open(){
  if(done||d.hidden||!window.HTMLDialogElement)return;
  var m=d.querySelector('#menu');if(d.querySelector('dialog[open]')||(m&&m.classList.contains('open'))){setTimeout(open,3000);return}
  var a=d.activeElement;if(a&&/^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName)){setTimeout(open,6000);return}
  done=true;
  var x=d.createElement('dialog');x.className='nlp';x.setAttribute('aria-labelledby','nlp-t');
  x.innerHTML='<div class="nlp-in"><div class="nlp-pic" aria-hidden="true"><img src="'+base+'img/women.webp" width="1500" height="1234" alt=""><b>The Asset Is You.<sup>TM</sup></b></div><div class="nlp-body"><button type="button" class="nlp-x" aria-label="Close">×</button><p class="nlp-l">Stay inside</p><h2 id="nlp-t" tabindex="-1" autofocus>The <span>ASSET-U</span> Newsletter<sup>TM</sup></h2><p class="nlp-c">The business of women’s wealth, wellness and sports, with first access to new classes, events and opportunities across the House.</p><form class="nlp-f" novalidate><label>First name<input name="First name" autocomplete="given-name" required><span class="nlp-e" aria-live="polite" id="nlp-e0"></span></label><label>Email<input name="Email" type="email" autocomplete="email" required><span class="nlp-e" aria-live="polite" id="nlp-e1"></span></label><button class="nlp-b" type="submit">Subscribe</button><p class="nlp-m">We use your answers to send you the right classes and updates. We never sell your information. Unsubscribe anytime.</p><p class="nlp-s" role="status" hidden>If your email app didn’t open, email <a href="mailto:info@asset-u.co">info@asset-u.co</a>.</p></form></div></div>';
  d.body.appendChild(x);
  var was=d.activeElement,f=x.querySelector('form'),ins=[].slice.call(x.querySelectorAll('input')),sub=false;
  x.querySelector('.nlp-x').addEventListener('click',function(){x.close()});
  x.addEventListener('click',function(e){if(e.target===x)x.close()});
  x.addEventListener('close',function(){d.body.classList.remove('locked');if(!sub)dataLayer.push({event:'newsletter_popup_close'});x.remove();if(was&&was.focus)was.focus({preventScroll:true})});
  function check(n,i){var m='';if(!n.value.trim())m='Please complete this field.';else if(n.type==='email'&&!n.validity.valid)m='Please enter a valid email address.';x.querySelector('#nlp-e'+i).textContent=m;n.setAttribute('aria-describedby','nlp-e'+i);if(m)n.setAttribute('aria-invalid','true');else n.removeAttribute('aria-invalid');return !m}
  ins.forEach(function(n,i){n.addEventListener('blur',function(){if(n.hasAttribute('aria-invalid'))check(n,i)})});
  f.addEventListener('submit',function(e){e.preventDefault();var bad=ins.filter(function(n,i){return !check(n,i)});if(bad.length){bad[0].focus();return}
    sub=true;dataLayer.push({event:'subscribe_submit',form:'newsletter_popup'});x.querySelector('.nlp-s').hidden=false;
    location.href='mailto:info@asset-u.co?subject='+encodeURIComponent('Subscribe me to ASSET-U')+'&body='+encodeURIComponent(ins.map(function(n){return n.name+': '+n.value}).join('\n'))});
  var im=x.querySelector('img'),go=function(){if(x.open)return;x.showModal();d.body.classList.add('locked');dataLayer.push({event:'newsletter_popup_view'})};
  if(im.complete)go();else{im.onload=im.onerror=go;setTimeout(go,2500)}
}
setTimeout(open,force?600:2500);
})();
