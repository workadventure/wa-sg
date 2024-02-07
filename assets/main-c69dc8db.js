import{b as m,g as d,P as b}from"./init-5da4ed0e.js";console.info("Script started successfully");let o,A,R;const g={EN:{TRIGGER:"Press SPACE or touch here to ",DOC:"read the document.",VIDEO:"watch the video.",WEBSITE:"open the website.",OBJECT:"discover the hidden object.",UNDEFINED:"The URL is not defined."},FR:{TRIGGER:"Appuyez sur ESPACE ou touchez ici pour ",DOC:"lire le document.",VIDEO:"regarder la vidéo.",WEBSITE:"ouvrir le site web.",OBJECT:"découvrir l'objet caché.",UNDEFINED:"L'URL n'est pas définie."}},W=[{AREA:"gfl-step1-1",URL:"to-config"},{AREA:"gfl-step1-2",URL:"to-config"},{AREA:"gfl-step2-1",URL:"to-config"},{AREA:"gfl-step2-2",URL:"to-config"},{AREA:"gfl-step3-1",URL:"to-config"},{AREA:"gfl-step3-2",URL:"to-config"},{AREA:"gfl-step3-3",URL:"to-config"},{AREA:"gfl-feedback",URL:"to-config"},{AREA:"gfl-quiz",URL:"to-config"},{AREA:"gfl-basics-step1-1",URL:"to-config"},{AREA:"gfl-basics-step1-2",URL:"to-config"},{AREA:"gfl-basics-step2-1",URL:"to-config"},{AREA:"gfl-basics-step2-2",URL:"to-config"},{AREA:"gfl-basics-step3-1",URL:"to-config"},{AREA:"gfl-basics-step3-2",URL:"to-config"},{AREA:"gfl-basics-step4-1",URL:"to-config"},{AREA:"gfl-basics-step4-2",URL:"to-config"},{AREA:"gfl-basics-step5-1",URL:"to-config"},{AREA:"gfl-basics-step5-2",URL:"to-config"},{AREA:"gfl-basics-step5-3",URL:"to-config"},{AREA:"gfl-basics-feedback",URL:"to-config"},{AREA:"gfl-basics-quiz",URL:"to-config"},{AREA:"replayInformation",MESSAGE:{EN:`Welcome to the GFL cinema.
You can watch the replays in one of the 4 rooms upstairs.`,FR:`Bienvenue dans le cinéma GFL.
Vous pouvez aller visionner les retransmissions dans une des 4 salles à l'étage.`}}];let t;WA.onInit().then(()=>{console.log("Player tags: ",WA.player.tags),t=(WA.player.language?WA.player.language:navigator.language).startsWith("fr")?"FR":"EN",WA.ui.actionBar.addButton({id:"help-btn",type:"action",imageSrc:"https://svgur.com/i/10Sh.svg",toolTip:"Help",callback:()=>{A=WA.state.lnk_stand_en,WA.nav.openCoWebSite(A)}}),WA.ui.actionBar.addButton({id:"mapoverview-btn",type:"action",imageSrc:"https://hugoaverty.github.io/map-overview/img/map.svg",toolTip:"Map overview",callback:()=>{WA.nav.openCoWebSite("https://workadventure.github.io/mapView-sg/")}}),WA.room.area.onEnter("standZone").subscribe(()=>{o||(WA.player.language=="fr-FR"?o=WA.ui.openPopup("popupStand",WA.state.txt_popup_stand_fr,[{label:WA.state.cta_popup_stand_fr,className:"primary",callback:()=>{A=WA.state.lnk_stand_fr,WA.nav.openCoWebSite(A),o==null||o.close(),o=null}}]):o=WA.ui.openPopup("popupStand",WA.state.txt_popup_stand_en,[{label:WA.state.cta_popup_stand_en,className:"primary",callback:()=>{A=WA.state.lnk_stand_en,WA.nav.openCoWebSite(A),o==null||o.close(),o=null}}]))}),WA.room.area.onLeave("standZone").subscribe(()=>{o==null||o.close(),o=null}),E("Room1"),E("Room2"),E("Room3"),E("Room4"),m().then(async()=>{console.log("Scripting API Extra ready");const a=WA.room.mapURL;R=a.substring(0,a.lastIndexOf("/"));const r=await n();for(const[l,c]of r.entries()){let u,f="WEBSITE",s="",i=W.find(p=>p.AREA===l);i&&i.URL?(s=g[t].TRIGGER,s+=g[t][c]):i&&i.MESSAGE?(f="POPUP",s=i.MESSAGE[t]):(f="SCAVENGER",s=g[t].TRIGGER,s+=g[t][c]),u={area:l,interaction:f,message:s},L(u)}async function n(){return new Promise(async l=>{const c=new Map,u=[],f=await d();for(const s of f.values())if(s.type==="objectgroup"){for(const i of s.objects)if(i.type==="area"||i.class==="area"){const p=new b(i.properties);p.getBoolean("translate")===!0&&c.set(i.name,p.getString("contentType"))}}else s.type==="tilelayer"&&s.name.startsWith("lang/")&&u.push(s.name);h(u),l(c)})}}).catch(a=>console.error(a))}).catch(e=>console.error(e));function E(e){WA.room.area.onEnter(e).subscribe(()=>{WA.room.showLayer(`doorOpen${e}`),WA.room.hideLayer(`doorClosed${e}`)}),WA.room.area.onLeave(e).subscribe(()=>{WA.room.showLayer(`doorClosed${e}`),WA.room.hideLayer(`doorOpen${e}`)})}function h(e){e.forEach(a=>WA.room.hideLayer(a)),e.filter(a=>a.includes(t+"/")).forEach(a=>WA.room.showLayer(a))}function L(e){let a,r,n,l;WA.room.area.onEnter(e.area).subscribe(()=>{if(e.interaction==="WEBSITE"){const c=WA.state.loadVariable(`${e.area}-${t}-config`);WA.player.tags.includes("admin")&&WA.ui.actionBar.addButton({id:"configure-btn",label:t==="FR"?"Configurer":"Configure",callback:()=>{l=WA.ui.modal.openModal({title:t==="FR"?"Page d'administration":"Administration page",src:R+`/administration/index.html?area=${e.area}`,allowApi:!0,allow:"microphone; camera",position:"center"},()=>WA.ui.modal.closeModal())}}),r=WA.ui.displayActionMessage({message:c?e.message:t==="FR"?g.FR.UNDEFINED:g.EN.UNDEFINED,callback:()=>WA.nav.openTab(c)})}else e.interaction==="SCAVENGER"?r=WA.ui.displayActionMessage({message:e.message,callback:async()=>{l=WA.ui.modal.openModal({title:t==="FR"?"Vous avez trouvé un nouvel objet caché !":"You found a new hidden object!",src:R+`/scavenger/index.html?lang=${t}&area=${e.area}`,allowApi:!0,allow:"microphone; camera",position:"center"},()=>WA.ui.modal.closeModal())}}):e.interaction==="POPUP"&&(n=WA.ui.openPopup(e.area+"Popup",e.message,[{label:t==="FR"?"Fermer":"Close",className:"normal",callback:()=>{n==null||n.close(),n=null}}]))}),WA.room.area.onLeave(e.area).subscribe(()=>{WA.player.tags.includes("admin")&&WA.ui.actionBar.removeButton("configure-btn"),r==null||r.remove(),r=null,a==null||a.close(),a=null,l&&(WA.ui.modal.closeModal(),l=null),n==null||n.close(),n=null})}