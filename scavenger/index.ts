/// <reference types="@workadventure/iframe-api-typings" />
import { levelUp } from "@workadventure/quests";

console.info('"Scavenger" script started successfully')

// Waiting for the API to be ready
WA.onInit().then(async () => {
    const OBJECTS: { ID: number, TITLE: string, BODY: { EN: string, FR: string} }[] = [
        {
            ID: 1,
            TITLE: "Emilie GAUCHET",
            BODY: {
                EN:"Emilie has been playing soccer for over 20 years.",
                FR:"Emilie pratique le football depuis plus de 20 ans."
            },
        },
        {
            ID: 2,
            TITLE: "Karine BAUDE",
            BODY: {
                EN:"Karine practices piloxing. What is it? It's an activity that reveals an iron personality in a velvet glove. In 3 words: dance, pilates and boxing.",
                FR:"Karine pratique le piloxing. Késako ? C’est une activité qui révèle une personnalité de fer dans un gant de velours. En 3 mots : danse, pilate et boxe"
            },
        },
        {
            ID: 3,
            TITLE: "Thierry LOPEZ",
            BODY: {
                EN:"Since his earliest childhood, Thierry has been rocked by titles such as Life on Mars? and Starman... in short, he's a true David Bowie fan.",
                FR:"Depuis sa plus tendre enfance, Thierry a été bercé par les titres : Life on Mars?, Starman… en bref c’est un véritable fan de David Bowie."
            },
        },
        {
            ID: 4,
            TITLE: "Delphine LEGAIT DUPRAT",
            BODY: {
                EN:"I wish you were here! Our Exco certainly has a musical ear. Delphine is a Pink Floyd fan!",
                FR:"I wish you were here ! Décidément notre Exco a l’oreille musicale. Delphine est fan de Pink Floyd !"
            },
        },
        {
            ID: 5,
            TITLE: "Cédrick TATIN",
            BODY: {
                EN:"If you'd like to test your foosball skills, head to the break room to take on Cédrick, our local foosball champion.",
                FR:"Si vous voulez tester votre niveau au baby foot RDV en salle de pause pour affronter  Cédrick notre champion local de baby-foot."
            },
        },
        {
            ID: 6,
            TITLE: "Ruddy SENECHAL",
            BODY: {
                EN:"Did you know that our Exco has an incredible talent? Ruddy is Exco's musician.",
                FR:"Notre Exco a un incroyable talent, le saviez-vous ? Ruddy est le musicien de l’Exco."
            },
        },
        {
            ID: 7,
            TITLE: "Georgiana MIHAI",
            BODY: {
                EN:"In the sporty category, we have Georgiana, who has already run a half-marathon.",
                FR:"Dans la série des sportifs, nous avons Georgiana qui a déjà couru un semi-marathon."
            },
        },
        {
            ID: 8,
            TITLE: "Nathamuni BASHYAM",
            BODY: {
                EN:"Nathamuni has been playing cricket from an early age.",
                FR:"Nathamuni joue au Cricket depuis son plus jeune âge."
            },
        },
        {
            ID: 9,
            TITLE: "Amit ARJUN OJHA",
            BODY: {
                EN:"Amit is a passionate photographer with many inspirations.",
                FR:"Amit est un passionné de la photographie aux multiples inspirations."
            },
        },
        {
            ID: 10,
            TITLE: "Emmanuel T JAMPENS",
            BODY: {
                EN:"Emmanuel is a choir singer.",
                FR:"Emmanuel chante dans une chorale."
            },
        },
        {
            ID: 11,
            TITLE: "Yves BAUDRY",
            BODY: {
                EN:"Yves loves horse-riding.",
                FR:"Yves aime les balades à cheval."
            },
        },
        {
            ID: 12,
            TITLE: "Fabienne POUSSOU",
            BODY: {
                EN:"'Let her dance'. Fabienne is the biggest Dalida fan GFL has ever known.",
                FR:'"Laissez-la danser". Fabienne est la plus grande fan de Dalida que GFL ai connu.'
            },
        },
        {
            ID: 13,
            TITLE: "Yann EGA",
            BODY: {
                EN:"Yann strengthens the Exco GFL sports team and has been playing basketball for over 35 years.",
                FR:"Yann renforce l’équipe sportive de l’Exco GFL et pratique le basket depuis plus de 35 ans."
            },
        },
        {
            ID: 14,
            TITLE: "Catherine CAISSON",
            BODY: {
                EN:"Catherine chose lobster as a symbol of her attachment to Brittany.",
                FR:"Catherine a choisi le homard en symbole à son attachement à la Bretagne."
            },
        },
        {
            ID: 15,
            TITLE: "Isabelle PETIT",
            BODY: {
                EN:"Isabelle loves all forms of visual art, especially contemporary art.",
                FR:"Isabelle adore toutes les formes d'art visuel et en particulier l’art contemporain."
            },
        },
    ]

    const mapUrl = WA.room.mapURL
    const root = mapUrl.substring(0, mapUrl.lastIndexOf("/"))

    const url = new URL(window.location.toString())
    const lang = url.searchParams.get("lang")
    const area = url.searchParams.get("area")
    const object = OBJECTS.find(item =>`scavenger-object${item.ID}` === area)

    window.addEventListener('DOMContentLoaded', async () => {
        console.log("DEBUG: DOMContentLoaded")

        const title = document.getElementById("scavenger-title") as HTMLElement
        const body = document.getElementById("scavenger-body") as HTMLElement
        const image = document.getElementById("scavenger-image") as HTMLImageElement
        let check = document.getElementById("check") as HTMLElement

        // QUEST
        
        // Bronze badge requires 30 XP
        // Easy to find items (5 items):
        // XP per easy item: 30 / 5 = 6 XP

        // Silver badge requires 72 XP
        // Moderate items (7 items):
        // XP per moderate item: (72 - 30) / 7 = 42 / 7 = 6 XP

        // Gold badge requires 90 XP
        // Hard to find items (3 items):
        // XP per hard item: (90 - 72) / 3 = 18 / 3 = 6 XP

        // Since they all give the same amount of XP we will just give 6 XP every time a new object is found, just to simplify the script.
        const QUEST_KEY = "sg-onboarding-scavenger-hunt"
        const xpPerItem = 6

        // show the object found by the user
        if (object && lang && title && body && image && check) {
            console.log("DEBUG: DOM objects defined")
            const itemKey = `scavenger-object${object.ID}`
            title.innerHTML = object.TITLE
            body.innerHTML = object.BODY[lang]
            image.src = `./images/${itemKey}.jpg`

            if (!WA.player.state.hasVariable(itemKey)) {
                console.log("DEBUG: player do not have variable", itemKey)

                // player found the item for the first time
                try {
                    await WA.player.state.saveVariable(itemKey, true, {
                        public: false,
                        persist: true,
                        ttl: 24 * 3600,
                        scope: "world"
                    })
                    console.log("DEBUG: variable saved to 'true'")
                } catch (error) {
                    console.error('Error saving variable:', error)
                    return
                }

                if (WA.player.state.loadVariable(itemKey) === true) {
                    console.log("DEBUG: variable value is actually 'true', granting XP...")

                    try {
                        await levelUp(QUEST_KEY, xpPerItem)
                        console.log(`"DEBUG": Discovered item ${object.ID}. ${xpPerItem} XP awarded!`)
                    } catch (error) {
                        console.error('Error granting XP:', error)
                    }
                } else {
                    console.error('"DEBUG": variable has been saved but its value was not loaded properly.')
                }
            } else {
                // player found the item but not for the first time
                check.innerHTML = "&check;"
                console.log(`"DEBUG": You've already discovered item ${object.ID}. No additional XP awarded.`);
            }
        } else {
            // show a 404 error page
            window.location.href = root + "/scavenger/404.html"
        }
    })
})

export {}