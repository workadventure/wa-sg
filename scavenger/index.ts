/// <reference types="@workadventure/iframe-api-typings" />

console.info('"Scavenger" script started successfully')

// Waiting for the API to be ready
WA.onInit().then(() => {
    const OBJECTS: { AREA: string, TITLE: string, BODY: { EN: string, FR: string} }[] = [
        {
            AREA: "scavenger-object1",
            TITLE: "Emilie GAUCHET",
            BODY: {
                EN:"Emilie has been playing soccer for over 20 years.",
                FR:"Emilie pratique le football depuis plus de 20 ans."
            },
        },
        {
            AREA: "scavenger-object2",
            TITLE: "Karine BAUDE",
            BODY: {
                EN:"Karine practices piloxing. What is it? It's an activity that reveals an iron personality in a velvet glove. In 3 words: dance, pilates and boxing.",
                FR:"Karine pratique le piloxing. Késako ? C’est une activité qui révèle une personnalité de fer dans un gant de velours. En 3 mots : danse, pilate et boxe"
            },
        },
        {
            AREA: "scavenger-object3",
            TITLE: "Thierry LOPEZ",
            BODY: {
                EN:"Since his earliest childhood, Thierry has been rocked by titles such as Life on Mars? and Starman... in short, he's a true David Bowie fan.",
                FR:"Depuis sa plus tendre enfance, Thierry a été bercé par les titres : Life on Mars?, Starman… en bref c’est un véritable fan de David Bowie."
            },
        },
        {
            AREA: "scavenger-object4",
            TITLE: "Delphine LEGAIT DUPRAT",
            BODY: {
                EN:"I wish you were here! Our Exco certainly has a musical ear. Delphine is a Pink Floyd fan!",
                FR:"I wish you were here ! Décidément notre Exco a l’oreille musicale. Delphine est fan de Pink Floyd !"
            },
        },
        {
            AREA: "scavenger-object5",
            TITLE: "Cédrick TATIN",
            BODY: {
                EN:"If you'd like to test your foosball skills, head to the break room to take on Cédrick, our local foosball champion.",
                FR:"Si vous voulez tester votre niveau au baby foot RDV en salle de pause pour affronter  Cédrick notre champion local de baby-foot."
            },
        },
        {
            AREA: "scavenger-object6",
            TITLE: "Ruddy SENECHAL",
            BODY: {
                EN:"Did you know that our Exco has an incredible talent? Ruddy is Exco's musician.",
                FR:"Notre Exco a un incroyable talent, le saviez-vous ? Ruddy est le musicien de l’Exco."
            },
        },
        {
            AREA: "scavenger-object7",
            TITLE: "Georgiana MIHAI",
            BODY: {
                EN:"In the sporty category, we have Georgiana, who has already run a half-marathon.",
                FR:"Dans la série des sportifs, nous avons Georgiana qui a déjà couru un semi-marathon."
            },
        },
        {
            AREA: "scavenger-object8",
            TITLE: "Nathamuni BASHYAM",
            BODY: {
                EN:"Nathamuni has been playing cricket from an early age.",
                FR:"Nathamuni joue au Cricket depuis son plus jeune âge."
            },
        },
        {
            AREA: "scavenger-object9",
            TITLE: "Amit ARJUN OJHA",
            BODY: {
                EN:"Amit is a passionate photographer with many inspirations.",
                FR:"Amit est un passionné de la photographie aux multiples inspirations."
            },
        },
        {
            AREA: "scavenger-object10",
            TITLE: "Emmanuel T JAMPENS",
            BODY: {
                EN:"Emmanuel is a choir singer.",
                FR:"Emmanuel chante dans une chorale."
            },
        },
        {
            AREA: "scavenger-object11",
            TITLE: "Yves BAUDRY",
            BODY: {
                EN:"Yves loves horse-riding.",
                FR:"Yves aime les balades à cheval."
            },
        },
        {
            AREA: "scavenger-object12",
            TITLE: "Fabienne POUSSOU",
            BODY: {
                EN:"'Let her dance'. Fabienne is the biggest Dalida fan GFL has ever known.",
                FR:'"Laissez-la danser". Fabienne est la plus grande fan de Dalida que GFL ai connu.'
            },
        },
        {
            AREA: "scavenger-object13",
            TITLE: "Yann EGA",
            BODY: {
                EN:"Yann strengthens the Exco GFL sports team and has been playing basketball for over 35 years.",
                FR:"Yann renforce l’équipe sportive de l’Exco GFL et pratique le basket depuis plus de 35 ans."
            },
        },
        {
            AREA: "scavenger-object14",
            TITLE: "Catherine CAISSON",
            BODY: {
                EN:"Catherine chose lobster as a symbol of her attachment to Brittany.",
                FR:"Catherine a choisi le homard en symbole à son attachement à la Bretagne."
            },
        },
        {
            AREA: "scavenger-object15",
            TITLE: "Isabelle PETIT",
            BODY: {
                EN:"TODO",
                FR:"À FAIRE"
            },
        },
    ]

    const mapUrl = WA.room.mapURL
    const root = mapUrl.substring(0, mapUrl.lastIndexOf("/"))

    const url = new URL(window.location.toString())
    const lang = url.searchParams.get("lang")
    const area = url.searchParams.get("area")
    const object = OBJECTS.find(item => item.AREA === area)

    const title = document.getElementById("scavenger-title") as HTMLElement
    const body = document.getElementById("scavenger-body") as HTMLElement
    const image = document.getElementById("scavenger-image") as HTMLImageElement


    // show the object found by the user
    if (object && lang && title && body && image) {
        title.innerHTML = object.TITLE
        body.innerHTML = object.BODY[lang]
        image.src = `./images/${object.AREA}.jpg`
    } else {
        // show a 404 error page
        window.location.href = root + "/scavenger/404.html"
    }
})

export {}