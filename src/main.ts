/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import { ActionMessage, CoWebsite, UIWebsite } from "@workadventure/iframe-api-typings";
import { getLayersMap, Properties } from "@workadventure/scripting-api-extra/dist";

console.info('Script started successfully');

let root: string

const MESSAGE = {
    EN: {
        TRIGGER: "Press SPACE or touch here to ",
        DOC: "read the document.",
        VIDEO: "watch the video.",
        WEBSITE: "open the website.",
        OBJECT: "discover the hidden object.",
        DIALOGUE: "talk with ",
        UNDEFINED: "The URL is not defined.",
    },
    FR: {
        TRIGGER: "Appuyez sur ESPACE ou touchez ici pour ",
        DOC: "lire le document.",
        VIDEO: "regarder la vidéo.",
        WEBSITE: "ouvrir le site web.",
        OBJECT: "découvrir l'objet caché.",
        DIALOGUE: "parler avec ",
        UNDEFINED: "L'URL n'est pas définie.",
    }
}
const CONTENT: any[] = [
    // GFL content
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
    {
        AREA: "gfl-feedback",
        URL: "to-config"
    },
    {
        AREA: "gfl-quiz",
        URL: "to-config"
    },

    // GFL Basics content
    {
        AREA: "gfl-basics-step1-1",
        URL: "to-config"
    },
    {
        AREA: "gfl-basics-step1-2",
        URL: "to-config"
    },
    {
        AREA: "gfl-basics-step1-3",
        URL: "to-config"
    },
    {
        AREA: "gfl-basics-step2-1",
        URL: "to-config"
    },
    {
        AREA: "gfl-basics-step2-2",
        URL: "to-config"
    },
    {
        AREA: "gfl-basics-step3-1",
        URL: "to-config"
    },
    {
        AREA: "gfl-basics-step4-1",
        URL: "to-config"
    },
    {
        AREA: "gfl-basics-step5-1",
        URL: "to-config"
    },
    {
        AREA: "gfl-basics-step5-2",
        URL: "to-config"
    },
    {
        AREA: "gfl-basics-step5-3",
        URL: "to-config"
    },
    {
        AREA: "gfl-basics-feedback",
        URL: "to-config"
    },
    {
        AREA: "gfl-basics-quiz",
        URL: "to-config"
    },

    // Dialogue
    {
        AREA: "Simone",
        NPC: "config-in-dialogue-box-website",
    },
    {
        AREA: "Lukas",
        NPC: "config-in-dialogue-box-website",
    },
    {
        AREA: "Victor",
        NPC: "config-in-dialogue-box-website",
    },
    {
        AREA: "Sarah",
        NPC: "config-in-dialogue-box-website",
    },
]

type ContentType = 'DOC' | 'VIDEO' | 'WEBSITE' | 'OBJECT' | 'DIALOGUE'
type Lang = 'EN' | 'FR'
type Interaction = 'WEBSITE' | 'SCAVENGER' | 'NPC'
type ContentArea = {
    area: string,
    interaction: Interaction,
    message: string
}

let lang: Lang

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Player tags: ', WA.player.tags);

    const mapUrl = WA.room.mapURL
    root = mapUrl.substring(0, mapUrl.lastIndexOf("/"))

    const userLanguage = WA.player.language ? WA.player.language : navigator.language
    // Set the initial language based on the user's preference
    lang = userLanguage.startsWith('fr') ? 'FR' : 'EN'

    WA.ui.actionBar.addButton({
        id: 'help-btn',
        type: 'action',
        imageSrc: root + '/help.svg',
        toolTip: lang === 'FR' ? "Comment utiliser WorkAdventure" : "How to use WorkAdventure",
        callback: () => {
            WA.ui.modal.openModal({
                title: "Help",
                src: root + '/Notice_Utilisateurs.pdf',
                allowApi: false,
                allow: "microphone; camera",
                position: "center",
            }, () => WA.ui.modal.closeModal())
        }
    });

    WA.ui.actionBar.addButton({
        id: 'plan-btn',
        type: 'action',
        imageSrc: root + '/map-plan.svg',
        toolTip: lang === 'FR' ? "Ouvrir le plan" : "Open the plan",
        callback: () => {
            WA.ui.modal.openModal({
                title: "Plan",
                src: root + '/Repartition_GFL.pdf',
                allowApi: false,
                allow: "microphone; camera",
                position: "center",
            }, () => WA.ui.modal.closeModal())
        }
    });

    // GFL Cinema doors
    listenDoor('Room1')
    listenDoor('Room2')
    listenDoor('Room3')
    listenDoor('Room4')

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(async () => {
        console.log('Scripting API Extra ready')

        const areasToTranslate = await setupTranslation()

        for (const [area, contentType] of areasToTranslate.entries()) {
            let contentArea: ContentArea
            let interaction: Interaction = "WEBSITE"
            let message = ""

            let c = CONTENT.find(item => item.AREA === area)
            if (c && c.URL) {
                message = MESSAGE[lang].TRIGGER
                message += MESSAGE[lang][contentType]
            } else if (c && c.NPC) {
                interaction = "NPC"
                message = MESSAGE[lang].TRIGGER
                message += MESSAGE[lang][contentType]
                message += area + "."
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
    let modal: any
    let dialogueBox: UIWebsite|null

    WA.room.area.onEnter(contentArea.area).subscribe(() => {
        if(contentArea.interaction === 'WEBSITE') {
            const url = WA.state.loadVariable(`${contentArea.area}-${lang}-config`) as string

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
                callback: async () => {
                    website = await WA.nav.openCoWebSite(url)
                }
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
        } else if (contentArea.interaction === 'NPC') {
            triggerMessage = WA.ui.displayActionMessage({
                message: contentArea.message,
                callback: async () => {
                    dialogueBox = await WA.ui.website.open({
                        url:  root + `/dialogue-box/index.html?lang=${lang}&name=${contentArea.area}`,
                        visible: true,
                        allowApi: false,
                        allowPolicy: "",   // The list of feature policies allowed
                        position: {
                            vertical: "bottom",
                            horizontal: "middle",
                        },
                        size: {            // Size on the UI (available units: px|em|%|cm|in|pc|pt|mm|ex|vw|vh|rem and others values auto|inherit)
                            height: "120px",
                            width: "650px",
                        },
                        margin: {              // Website margin (available units: px|em|%|cm|in|pc|pt|mm|ex|vw|vh|rem and others values auto|inherit)
                            bottom: "70px",
                        },
                    })
                }
            })
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

        dialogueBox?.close()
        dialogueBox = null
    });
}

export {};
