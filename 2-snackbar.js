import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{i as r}from"./assets/vendor-A92OCY9B.js";const o=document.querySelector(".form"),m=document.querySelector('input[value="fulfilled"]'),n=document.querySelector('input[value="rejected"]'),a=()=>{o.reset()},c=i=>{i.preventDefault();const t=new FormData(o).get("delay");new Promise((e,s)=>{m.checked?e(`✅ Fulfilled promise in ${t}ms`):n.checked&&s(`❌ Rejected promise in ${t}ms`)}).then(e=>{r.show({message:e,messageColor:"white",position:"topRight",backgroundColor:"#59a10d"})}).catch(e=>{r.show({message:e,messageColor:"white",position:"topRight",backgroundColor:"#ef4040"})}).finally(()=>{a()})};o.addEventListener("submit",c);
//# sourceMappingURL=2-snackbar.js.map
