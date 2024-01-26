import"./modulepreload-polyfill-3cfb730f.js";let E="https://admin.workadventu.re";function g(){const e=WA.player.userRoomToken;if(e===void 0)throw new Error("No userRoomToken found. The quests plugin can only work with WorkAdventure SAAS edition (at https://play.workadventu.re).");return e}async function y(e,o){if(!WA.player.isLogged)throw new Error("You must be logged to gain XP.");const n=new URL(`/api/quests/${e}/level-up`,E),a=await fetch(n,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:g()},body:JSON.stringify({xp:o})});if(!a.ok)throw new Error(`An error occurred. HTTP Code: ${a.status} ${a.statusText}.`);const t=await a.json();return t.awardedBadges.length>0&&(async()=>{for(const s of t.awardedBadges)await D(e,s)})().catch(s=>{console.error(s)}),t}async function D(e,o){const n=new URL(`/quests/${e}/badge/${o}/congratulations`,E);n.search=new URLSearchParams({token:g()}).toString(),await WA.ui.website.open({url:n.toString(),position:{vertical:"middle",horizontal:"middle"},allowApi:!0,visible:!0,size:{width:"100%",height:"100%"}})}console.info('"Scavenger" script started successfully');WA.onInit().then(()=>{console.log("DEBUG: onInit");const e=[{ID:1,TITLE:"Emilie GAUCHET",BODY:{EN:"Emilie has been playing soccer for over 20 years.",FR:"Emilie pratique le football depuis plus de 20 ans."}},{ID:2,TITLE:"Karine BAUDE",BODY:{EN:"Karine practices piloxing. What is it? It's an activity that reveals an iron personality in a velvet glove. In 3 words: dance, pilates and boxing.",FR:"Karine pratique le piloxing. Késako ? C’est une activité qui révèle une personnalité de fer dans un gant de velours. En 3 mots : danse, pilate et boxe"}},{ID:3,TITLE:"Thierry LOPEZ",BODY:{EN:"Since his earliest childhood, Thierry has been rocked by titles such as Life on Mars? and Starman... in short, he's a true David Bowie fan.",FR:"Depuis sa plus tendre enfance, Thierry a été bercé par les titres : Life on Mars?, Starman… en bref c’est un véritable fan de David Bowie."}},{ID:4,TITLE:"Delphine LEGAIT DUPRAT",BODY:{EN:"I wish you were here! Our Exco certainly has a musical ear. Delphine is a Pink Floyd fan!",FR:"I wish you were here ! Décidément notre Exco a l’oreille musicale. Delphine est fan de Pink Floyd !"}},{ID:5,TITLE:"Cédrick TATIN",BODY:{EN:"If you'd like to test your foosball skills, head to the break room to take on Cédrick, our local foosball champion.",FR:"Si vous voulez tester votre niveau au baby foot RDV en salle de pause pour affronter  Cédrick notre champion local de baby-foot."}},{ID:6,TITLE:"Ruddy SENECHAL",BODY:{EN:"Did you know that our Exco has an incredible talent? Ruddy is Exco's musician.",FR:"Notre Exco a un incroyable talent, le saviez-vous ? Ruddy est le musicien de l’Exco."}},{ID:7,TITLE:"Georgiana MIHAI",BODY:{EN:"In the sporty category, we have Georgiana, who has already run a half-marathon.",FR:"Dans la série des sportifs, nous avons Georgiana qui a déjà couru un semi-marathon."}},{ID:8,TITLE:"Nathamuni BASHYAM",BODY:{EN:"Nathamuni has been playing cricket from an early age.",FR:"Nathamuni joue au Cricket depuis son plus jeune âge."}},{ID:9,TITLE:"Amit ARJUN OJHA",BODY:{EN:"Amit is a passionate photographer with many inspirations.",FR:"Amit est un passionné de la photographie aux multiples inspirations."}},{ID:10,TITLE:"Emmanuel T JAMPENS",BODY:{EN:"Emmanuel is a choir singer.",FR:"Emmanuel chante dans une chorale."}},{ID:11,TITLE:"Yves BAUDRY",BODY:{EN:"Yves loves horse-riding.",FR:"Yves aime les balades à cheval."}},{ID:12,TITLE:"Fabienne POUSSOU",BODY:{EN:"'Let her dance'. Fabienne is the biggest Dalida fan GFL has ever known.",FR:'"Laissez-la danser". Fabienne est la plus grande fan de Dalida que GFL ai connu.'}},{ID:13,TITLE:"Yann EGA",BODY:{EN:"Yann strengthens the Exco GFL sports team and has been playing basketball for over 35 years.",FR:"Yann renforce l’équipe sportive de l’Exco GFL et pratique le basket depuis plus de 35 ans."}},{ID:14,TITLE:"Catherine CAISSON",BODY:{EN:"Catherine chose lobster as a symbol of her attachment to Brittany.",FR:"Catherine a choisi le homard en symbole à son attachement à la Bretagne."}},{ID:15,TITLE:"Isabelle PETIT",BODY:{EN:"Isabelle loves all forms of visual art, especially contemporary art.",FR:"Isabelle adore toutes les formes d'art visuel et en particulier l’art contemporain."}}],o=WA.room.mapURL,n=o.substring(0,o.lastIndexOf("/")),a=new URL(window.location.toString()),t=a.searchParams.get("lang"),s=a.searchParams.get("area"),r=e.find(l=>`scavenger-object${l.ID}`===s);window.addEventListener("DOMContentLoaded",async()=>{console.log("DEBUG: DOMContentLoaded");const l=document.getElementById("scavenger-title"),d=document.getElementById("scavenger-body"),u=document.getElementById("scavenger-image");let h=document.getElementById("check");const m="sg-onboarding-scavenger-hunt",p=6;if(r&&t&&l&&d&&u&&h){console.log("DEBUG: DOM objects defined");const i=`scavenger-object${r.ID}`;if(l.innerHTML=r.TITLE,d.innerHTML=r.BODY[t],u.src=`./images/${i}.jpg`,WA.player.state.hasVariable(i))h.innerHTML="&check;",console.log(`"DEBUG": You've already discovered item ${r.ID}. No additional XP awarded.`);else{console.log("DEBUG: player do not have variable",i);try{await WA.player.state.saveVariable(i,!0,{public:!1,persist:!0,ttl:24*3600,scope:"world"}),console.log("DEBUG: variable saved to 'true'")}catch(c){console.error("Error saving variable:",c);return}if(WA.player.state.loadVariable(i)===!0){console.log("DEBUG: variable value is actually 'true', granting XP...");try{await y(m,p),console.log(`"DEBUG": Discovered item ${r.ID}. ${p} XP awarded!`)}catch(c){console.error("Error granting XP:",c)}}else console.error('"DEBUG": variable has been saved but its value was not loaded properly.')}}else window.location.href=n+"/scavenger/404.html"})});