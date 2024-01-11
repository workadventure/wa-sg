/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import { ActionMessage, CoWebsite, Popup } from "@workadventure/iframe-api-typings";
import { getLayersMap, Properties } from "@workadventure/scripting-api-extra/dist";

console.info('Script started successfully');

let popupStand: Popup|null;
let link: any;

let root: string

const MESSAGE = {
    EN: {
        TRIGGER: "Press SPACE or touch here to ",
        DOC: "read the document.",
        VIDEO: "watch the video.",
        WEBSITE: "open the website.",
        OBJECT: "discover the hidden object.",
        UNDEFINED: "The URL is not defined."
    },
    FR: {
        TRIGGER: "Appuyez sur ESPACE ou touchez ici pour ",
        DOC: "lire le document.",
        VIDEO: "regarder la vidéo.",
        WEBSITE: "ouvrir le site web.",
        OBJECT: "découvrir l'objet caché.",
        UNDEFINED: "L'URL n'est pas définie."
    }
}
const CONTENT: any[] = [
     // Websites
    {
        AREA: "gfl-step1-1",
        URL: "to-config"
    },
    {
        AREA: "gfl-step1-2",
        URL: "to-config"
    },
    {
        AREA: "gfl-step2-1",
        URL: "to-config"
    },
    {
        AREA: "gfl-step2-2",
        URL: "to-config"
    },
    {
        AREA: "gfl-step3-1",
        URL: "to-config"
    },
    {
        AREA: "gfl-step3-2",
        URL: "to-config"
    },
    {
        AREA: "gfl-step3-3",
        URL: "to-config"
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

type ContentType = 'DOC' | 'VIDEO' | 'WEBSITE' | 'OBJECT'
type Lang = 'EN' | 'FR'
type Interaction = 'POPUP' | 'WEBSITE' | 'SCAVENGER'
type ContentArea = {
    area: string,
    interaction: Interaction,
    message: string
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

    // GFL Cinema doors
    listenDoor('Room1')
    listenDoor('Room2')
    listenDoor('Room3')
    listenDoor('Room4')

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(async () => {
        console.log('Scripting API Extra ready')

        const mapUrl = WA.room.mapURL
        root = mapUrl.substring(0, mapUrl.lastIndexOf("/"))

        const areasToTranslate = await setupTranslation()

        for (const [area, contentType] of areasToTranslate.entries()) {
            let contentArea: ContentArea
            let interaction: Interaction = "WEBSITE"
            let message = ""

            let c = CONTENT.find(item => item.AREA === area)
            if (c && c.URL) {
                message = MESSAGE[lang].TRIGGER
                message += MESSAGE[lang][contentType]
            } else if (c && c.MESSAGE) {
                interaction = "POPUP"
                message = c.MESSAGE[lang]
            } else {
                interaction = "SCAVENGER"
                message = MESSAGE[lang].TRIGGER
                message += MESSAGE[lang][contentType]
            }
           
            contentArea = { area, interaction, message }
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
    let website: CoWebsite|null
    let triggerMessage: ActionMessage|null
    let popup: Popup|null
    let modal: any

    WA.room.area.onEnter(contentArea.area).subscribe(() => {
        if(contentArea.interaction === 'WEBSITE') {
            const url = WA.state.loadVariable(`${contentArea.area}-${lang}-config`) as string
            console.log("url to open is", url)

            if (WA.player.tags.includes('admin')) {
                WA.ui.actionBar.addButton({
                    id: 'configure-btn',
                    label: lang === 'FR' ? "Configurer" : "Configure",
                    callback: () => {
                        modal = WA.ui.modal.openModal({
                            title: lang === 'FR' ? "Page d'administration" : "Administration page",
                            src: root + `/administration/index.html?area=${contentArea.area}`,
                            allowApi: true,
                            allow: "microphone; camera",
                            position: "center",
                        }, () => WA.ui.modal.closeModal())
                    }
                })
            }
           
            triggerMessage = WA.ui.displayActionMessage({
                message: url ? contentArea.message : lang === 'FR' ? MESSAGE.FR.UNDEFINED : MESSAGE.EN.UNDEFINED,
                callback: () => WA.nav.openTab(url)
            })
        } else if(contentArea.interaction === 'SCAVENGER') {
            triggerMessage = WA.ui.displayActionMessage({
                message: contentArea.message,
                callback: async () => {
                    modal = WA.ui.modal.openModal({
                        title: lang === 'FR' ? "Vous avez trouvé un nouvel objet caché !" : "You found a new hidden object!",
                        src: root + `/scavenger/index.html?lang=${lang}&area=${contentArea.area}`,
                        allowApi: true,
                        allow: "microphone; camera",
                        position: "center",
                    }, () => WA.ui.modal.closeModal())
                }
            })
        } else if (contentArea.interaction === 'POPUP') {
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
        if (WA.player.tags.includes('admin')) {
            WA.ui.actionBar.removeButton('configure-btn')
        }

        triggerMessage?.remove()
        triggerMessage = null

        website?.close()
        website = null
        
        if (modal) {
            WA.ui.modal.closeModal()
            modal = null
        }

        popup?.close()
        popup = null
    });
}

export {};
