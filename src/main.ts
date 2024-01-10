/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import { ActionMessage, CoWebsite, Popup } from "@workadventure/iframe-api-typings";
import { getLayersMap, Properties } from "@workadventure/scripting-api-extra/dist";

console.log('Script started successfully');

let popupStand: Popup|null;
let popupBucarest: Popup|null;
let popupBangalore: Popup|null;
let popupStade: Popup|null;
let popupLille: Popup|null;
let popupParis: Popup|null;
let popupSakura: Popup|null;
let link: any;

const MESSAGE = {
    EN: {
        TRIGGER: "Press SPACE or touch here to ",
        DOC: "read the document.",
        VIDEO: "watch the video.",
        SITE: "open the website.",
    },
    FR: {
        TRIGGER: "Appuyez sur ESPACE ou touchez ici pour ",
        DOC: "lire le document.",
        VIDEO: "regarder la vidéo.",
        SITE: "ouvrir le site web.",
    }
}

const CONTENT: { AREA: string, URL?: { EN: string, FR: string }|null, MESSAGE?: { EN: string, FR: string }|null }[] = [
     // Websites
    {
        AREA: "gfl-step1-1",
        URL: {
            EN:"https://workadventu.re/",
            FR:"https://workadventu.re/"
        },
    },
    {
        AREA: "gfl-step1-2",
        URL: {
            EN:"https://workadventu.re/",
            FR:"https://workadventu.re/"
        },
    },

    // Popups
    {
        AREA: "replayInformation",
        MESSAGE: {
            EN: "Welcome to the GFL cinema.\nYou can watch the replays in one of the 4 rooms upstairs.",
            FR: "Bienvenue dans le cinéma GFL.\nVous pouvez aller visionner les retransmissions dans une des 4 salles à l'étage."
        },
    }
]

type ContentType = 'SITE' | 'DOC' | 'VIDEO'
type Lang = 'EN' | 'FR'
type Interaction = 'POPUP' | 'WEBSITE'
type ContentArea = {
    area: string,
    interaction: Interaction,
    message: string,
    url?: string|null
}

let lang: Lang

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Player tags: ', WA.player.tags);

    const userLanguage = WA.player.language ? WA.player.language : navigator.language
    // Set the initial language based on the user's preference
    lang = userLanguage.startsWith('fr') ? 'FR' : 'EN'

    WA.ui.actionBar.addButton({
        id: 'help-btn',
        // @ts-ignore
        type: 'action',
        imageSrc: 'https://svgur.com/i/10Sh.svg',
        toolTip: 'Help',
        callback: () => {
            link = WA.state.lnk_stand_en;
            WA.nav.openCoWebSite(link);
        }
    });

    WA.ui.actionBar.addButton({
        id: 'mapoverview-btn',
        // @ts-ignore
        type: 'action',
        imageSrc: 'https://hugoaverty.github.io/map-overview/img/map.svg',
        toolTip: 'Map overview',
        callback: () => {
            WA.nav.openCoWebSite("Mapoverview.svg");
        }
    });


    WA.room.area.onEnter("standZone").subscribe(() => {
        if(popupStand) return;

        if(WA.player.language == "fr-FR") {
            popupStand = WA.ui.openPopup("popupStand", WA.state.txt_popup_stand_fr as string, [{
                label: WA.state.cta_popup_stand_fr as string,
                className: "primary",
                callback: () => {
                    link = WA.state.lnk_stand_fr;
                    WA.nav.openCoWebSite(link);
                    popupStand?.close();
                    popupStand = null;
                }
            }]);
        } else {
            popupStand = WA.ui.openPopup("popupStand", WA.state.txt_popup_stand_en as string, [{
                label: WA.state.cta_popup_stand_en as string,
                className: "primary",
                callback: () => {
                    link = WA.state.lnk_stand_en;
                    WA.nav.openCoWebSite(link);
                    popupStand?.close();
                    popupStand = null;
                }
            }]);
        }
    });
    WA.room.area.onLeave("standZone").subscribe(() => {
        popupStand?.close();
        popupStand = null;
    });

    WA.room.area.onEnter("zoneBucarest").subscribe(() => {
        popupBucarest = WA.ui.openPopup("popupBucarest", "TO COMPLETE" as string, [{
                label: "Fermer",
                className: "primary",
                callback: () => {
                    popupBucarest?.close();
                    popupBucarest = null;
                }
            }]);
    });
    WA.room.area.onLeave("zoneBucarest").subscribe(() => {
        popupBucarest?.close();
        popupBucarest = null;
    });

    WA.room.area.onEnter("zoneBangalore").subscribe(() => {
        popupBangalore = WA.ui.openPopup("popupBangalore", "TO COMPLETE" as string, [{
                label: "Fermer",
                className: "primary",
                callback: () => {
                    popupBangalore?.close();
                    popupBangalore = null;
                }
            }]);
    });
    WA.room.area.onLeave("zoneBangalore").subscribe(() => {
        popupBangalore?.close();
        popupBangalore = null;
    });

    WA.room.area.onEnter("zoneStade").subscribe(() => {
        popupStade = WA.ui.openPopup("popupStade", "TO COMPLETE" as string, [{
                label: "Fermer",
                className: "primary",
                callback: () => {
                    popupStade?.close();
                    popupStade = null;
                }
            }]);
    });
    WA.room.area.onLeave("zoneStade").subscribe(() => {
        popupStade?.close();
        popupStade = null;
    });

    WA.room.area.onEnter("zoneLille").subscribe(() => {
        popupLille = WA.ui.openPopup("popupLille", "TO COMPLETE" as string, [{
                label: "Fermer",
                className: "primary",
                callback: () => {
                    popupLille?.close();
                    popupLille = null;
                }
            }]);
    });
    WA.room.area.onLeave("zoneLille").subscribe(() => {
        popupLille?.close();
        popupLille = null;
    });

    WA.room.area.onEnter("zoneParis").subscribe(() => {
        popupParis = WA.ui.openPopup("popupParis", "TO COMPLETE" as string, [{
                label: "Fermer",
                className: "primary",
                callback: () => {
                    popupParis?.close();
                    popupParis = null;
                }
            }]);
    });
    WA.room.area.onLeave("zoneParis").subscribe(() => {
        popupParis?.close();
        popupParis = null;
    });

    WA.room.area.onEnter("zoneSakura").subscribe(() => {
        popupSakura = WA.ui.openPopup("popupSakura", "TO COMPLETE" as string, [{
                label: "Fermer",
                className: "primary",
                callback: () => {
                    popupSakura?.close();
                    popupSakura = null;
                }
            }]);
    });
    WA.room.area.onLeave("zoneSakura").subscribe(() => {
        popupSakura?.close();
        popupSakura = null;
    });

    // GFL Cinema doors
    listenDoor('Room1')
    listenDoor('Room2')
    listenDoor('Room3')
    listenDoor('Room4')

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(async () => {
        console.log('Scripting API Extra ready');

        const areasToTranslate = await setupTranslation()

        for (const [area, contentType] of areasToTranslate.entries()) {
            let contentArea: ContentArea
            let interaction: Interaction = "WEBSITE"
            let url = null
            let message = ""

            let c = CONTENT.find(item => item.AREA === area);
            if (c && c.URL) {
                url = c.URL[lang]
                message = MESSAGE[lang].TRIGGER
                message += MESSAGE[lang][contentType]
            } else if (c && c.MESSAGE) {
                interaction = "POPUP"
                message = c.MESSAGE[lang]
            }
            
            contentArea = { area, interaction, message, url }
            listenArea(contentArea)
        }

        async function setupTranslation(): Promise<Map<string, ContentType>> {
            return new Promise(async (resolve) => {
                // Key: the name of the area, description: the description of the area
                const areasToTranslate = new Map<string, ContentType>()
                const layersToTranslate = []

                // Get the flattened layers of the map
                const layers = await getLayersMap()
                for (const layer of layers.values()) {
                    // Filter on layers of type "objectgroup"
                    if (layer.type === 'objectgroup') {
                        // Scan all the objects of the layer
                        for (const object of layer.objects) {
                            // Filter on objects of type "area" that have the "translate" property set to true
                            if (object.type === 'area' || object.class === 'area') {
                                const properties = new Properties(object.properties)
                                if (properties.getBoolean('translate') === true) {
                                    areasToTranslate.set(object.name, properties.getString('contentType') as ContentType)
                                }
                            }
                        }
                    } else if (layer.type === 'tilelayer') {
                        // get all layers name inside lang/ folder
                        if (layer.name.startsWith('lang/'))
                            layersToTranslate.push(layer.name)
                    }
                }
                setLangLayers(layersToTranslate)
                resolve(areasToTranslate);
            });
        }
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

function listenDoor(door: string) {
    WA.room.area.onEnter(door).subscribe(() => {
        WA.room.showLayer(`doorOpen${door}`)
        WA.room.hideLayer(`doorClosed${door}`)
    })

    WA.room.area.onLeave(door).subscribe(() => {
        WA.room.showLayer(`doorClosed${door}`)
        WA.room.hideLayer(`doorOpen${door}`)
    })
}

function setLangLayers(layers: string[]) {
    // Hide all language-specific layers first
    layers.forEach(layer => WA.room.hideLayer(layer))

    // Show layers for a given language
    layers
        .filter(layer => layer.includes(lang + "/"))
        .forEach(layer => WA.room.showLayer(layer))
}

function listenArea(contentArea: ContentArea) {
    let website: CoWebsite
    let triggerMessage: ActionMessage
    let popup: Popup|null

    WA.room.area.onEnter(contentArea.area).subscribe(() => {
        if(contentArea.interaction === 'WEBSITE') {
            triggerMessage = WA.ui.displayActionMessage({
                message: contentArea.message,
                callback: async () => {
                    if (contentArea.url)
                        website = await WA.nav.openCoWebSite(contentArea.url)
                }
            })
        } else if (contentArea.interaction === 'POPUP') {
            console.log('ENTER contentArea.area',contentArea.area)
            popup = WA.ui.openPopup(
                contentArea.area + "Popup",
                contentArea.message,
                [{
                    label: lang === 'FR' ? "Fermer" : "Close",
                    className: "normal",
                    callback: () => {
                        popup?.close();
                        popup = null;
                    }
                }]
            )
        }
    })
    WA.room.area.onLeave(contentArea.area).subscribe(() => {
        if(contentArea.interaction === 'WEBSITE') {
            triggerMessage.remove()
            website.close()
        } else if (contentArea.interaction === 'POPUP') {
            popup?.close()
            popup = null
        }
    });
}

export {};
