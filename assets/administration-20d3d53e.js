import"./modulepreload-polyfill-3cfb730f.js";import{b as d}from"./init-5da4ed0e.js";console.info('"Administration" script started successfully');WA.onInit().then(()=>{console.log("DEBUG: onInit");async function a(){console.log("DEBUG: process");const e=new URL(window.location.toString()).searchParams.get("area");let t=document.getElementById("input-en"),n=document.getElementById("input-fr"),r=document.getElementById("check-en"),s=document.getElementById("check-fr"),i=document.getElementById("btn");d().then(async()=>{console.log("DEBUG: bootstrapExtra");let l=await WA.state.loadVariable(`${e}-EN-config`),c=await WA.state.loadVariable(`${e}-FR-config`);console.log("DEBUG: urlEN",l),console.log("DEBUG: urlFR",c),t&&n&&e&&(console.log("DEBUG: bootstrapExtra"),t.value=l,n.value=c,console.log("DEBUG: inputEN.value",t.value),console.log("DEBUG: inputFR.value",n.value),i.addEventListener("click",o=>{console.log("DEBUG: click event"),o.preventDefault(),g()}));async function g(){console.log("DEBUG: saving variables...");try{await WA.state.saveVariable(`${e}-EN-config`,t.value).catch(o=>console.error("Something went wrong while saving variable",o)),await WA.state.saveVariable(`${e}-FR-config`,n.value).catch(o=>console.error("Something went wrong while saving variable",o)),console.log("DEBUG: variables saved")}catch(o){console.error("Error saving variables:",o)}finally{console.log("DEBUG: input feedback"),r.innerHTML=t.value===WA.state.loadVariable(`${e}-EN-config`)?"&check;":"&cross;",s.innerHTML=n.value===WA.state.loadVariable(`${e}-FR-config`)?"&check;":"&cross;"}}}).catch(l=>console.error(l))}document.readyState==="loading"?(console.log("DEBUG: Loading hasn't finished yet..."),document.addEventListener("DOMContentLoaded",a)):(console.log("DEBUG: `DOMContentLoaded` has already fired"),a())}).catch(a=>console.error(a));
