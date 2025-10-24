document.addEventListener('DOMContentLoaded',()=>{
  const f=document.getElementById('enquiryForm');
  if(f){
    f.addEventListener('submit',async(e)=>{
      e.preventDefault();
      const action=e.submitter.dataset.action||'email';
      const ep=f.dataset.endpoint||'';
      const mail=f.dataset.mailto||'';
      const whatsapp=f.dataset.whatsapp||'';
      const data=new FormData(f);
      const obj=Object.fromEntries(data.entries());
      if(action==='whatsapp' && whatsapp){
        const msg=encodeURIComponent(`Hello!%0A%0AName: ${obj.name}%0AEmail: ${obj.email}%0APhone: ${obj.phone}%0A%0AMessage:%0A${obj.message}`);
        window.open(`https://wa.me/${whatsapp}text=${msg}`,'_blank');
        alert(' Redirecting to WhatsApp...');
        f.reset();
      }else if(action==='email' && mail){
        const subj=encodeURIComponent('New Enquiry from '+obj.name);
        const body=encodeURIComponent('Name: '+obj.name+'\nEmail: '+obj.email+'\nPhone: '+obj.phone+'\n\nMessage:\n'+obj.message);
        window.location.href=`mailto:${mail}subject=${subj}&body=${body}`;
        f.reset();
      }else if(ep){
        try{
          const res=await fetch(ep,{method:'POST',headers:{'Accept':'application/json'},body:data});
          if(res.ok){alert(' Thank you! We received your enquiry.'); f.reset();}
          else{alert(' Could not submit to server. Please try later.');}
        }catch(err){alert(' Network error. Please try later.');}
      }else{
        alert('No communication method configured.');
      }
    });
  }
});
function toggleFAQ(index){
  const answer=document.getElementById('faq-'+index);
  const toggle=answer.previousElementSibling.querySelector('.faq-toggle');
  if(answer.style.display==='block'){
    answer.style.display='none';toggle.textContent='+';
  }else{
    answer.style.display='block';toggle.textContent='-';
  }
}
