import { DialogueBoxComponent } from './components/DialogueBoxComponent';

console.info('"Dialogue Box" script started successfully')

const DIALOGUES: { NAME: string, MESSAGE: { EN: string, FR: string } }[] = [
  {
    // OCO : ONBOARDING CONTRATS
    NAME: 'Simone',
    MESSAGE: {
      EN: `Hello! My name is Simone, and I work for Onboarding Contracts. My role is to record contracts and amendments received from sales representatives in Cash Management.
      I implement GLOBALCASH - SWIFTNET - FTP - SDTP - SIAM contracts and amendments signed up by Corporate customers in the SG Group, as well as EBICS contracts and amendments.
      I am based in India and work daily with teams in France and Romania.`,
      FR: `Bonjour ! Je m’appelle Simone, je travaille au sein du service Onboarding Contracts. Mon rôle consiste à enregistrer les contrats et avenants reçu de la part des commerciaux en Cash management.
      J’implémente des contrats et avenants GLOBALCASH – SWIFTNET – FTP – SDTP - SIAM souscrits par les clients Corporate du groupe SG mais aussi les contrats et avenants EBICS.
      Je suis basée en Inde et travaille quotidiennement avec les équipes en France et en Roumanie.`,
    },
  },
  {
    // SCF : SERVICE CLIENT FLUX
    NAME: 'Lukas',
    MESSAGE: {
      EN: `Hello! My name is Lukas, and I work for Flow Customer Service. In this service we provide end-to-end flow routing, customer interaction and flow accounting.
      We respond to issues within GTPS payment information system, analysis of anomalies and communication.
      We also manage major incidents. The team is based in France and works in resilience with Romania and India.`,
      FR: `Bonjour ! Je m’appelle Lukas, je travaille au sein du Service Client Flux. Dans ce service nous assurons l’acheminement des flux de bout en bout, l’interaction client et la comptabilité associée aux flux.
      Nous répondons aux problématiques de flux rencontrées par les clients, analyse des anomalies et communication. Nous pilotons également les incidents majeurs.
      L’équipe est basée en France et travaille en résilience avec la Roumanie et l’Inde.`,
    },
  },
  {
    // GCA : SERVICE GRANDS CLIENTS & ACCES PORTAIL
    NAME: 'Victor',
    MESSAGE: {
      EN: `Hello! My name is Victor, and I work in the Major Customers & Portal Access service. Here, we mainly provide customer support for international cash management and remote banking offers for corporate & bank customers.
      However, the GCA service includes various activities: user and customer support for the GLOBALCASH, SOGECASHNET and WEBCLEAR cash management offerings; customer support for the SWIFTNet / FTP / SFTP and SIAM offerings; steering and supporting the SG Group’s Client testing offering; user support, contract management and implementation of the Cash pooling domestic and international offers; project coordination.
      We are based in Romania and France.`,
      FR: `Bonjour ! Je m’appelle Victor, je travaille au sein du service Grands Clients & Accès Portail. Ici, nous assurons principalement le support client pour les offres de cash management international et de banque à distance pour les clients entreprises & banques.
      Toutefois, le service GCA comporte différentes activités : support utilisateur et client pour les offres de cash management GLOBALCASH, SOGECASHNET et WEBCLEAR ; support client pour les offres SWIFTNet / FTP / SFTP et SIAM ; pilotage et support de l’offre de TEST client du groupe SG ; support aux utilisateurs, gestion et implémentation des contrats des solutions de Centralisation de trésorerie ; coordination de projets.
      Nous sommes basés en Roumanie et en France.`,
    },
  },
  {
    // HSE : HUB SYSTEMES D’ÉCHANGES
    NAME: 'Sarah',
    MESSAGE: {
      EN: `Hello! My name is Sarah, and I work in the Hub & Exchange Systems. We provide projects and supervision of the SWIFT, Mass payment (ALISE), Instant Payment (STET) and High value (PFP-ELAPS) perimeters.
      We are also responsible for banking management in the ALISE, IP and PFP-ELAPS perimeters. The team is based in France, in Romania and in India.`,
      FR: `Bonjour ! Je m’appelle Sarah, je travaille dans le service Hub Systèmes d’échanges. Nous assurons les projets et la supervision autour des plates-formes d’échanges SWIFT, ALISE, IP STET et PFP-ELAPS.
      Nous avons également pour mission d’assurer la gestion bancaire sur les périmètres ALISE, IP et PFP-ELAPS. L’équipe est basée en France, en Roumanie et en Inde`,
    },
  },
]

async function process() {
  const url = new URL(window.location.toString())
  const lang = url.searchParams.get("lang")
  const name = url.searchParams.get("name")

  const dialogue = DIALOGUES.find(item => item.NAME === name)

  if (dialogue && lang) {
    const avatarProps = {
      name: dialogue.NAME,
      image: `${dialogue.NAME}.png`
    }
    const messageProps = {
      message: dialogue.MESSAGE[lang]
    }

    const dialogueBoxComponent = new DialogueBoxComponent(avatarProps, messageProps);

    if (appElement) {
      appElement.appendChild(dialogueBoxComponent.render());
    } else {
      console.error("Element with ID 'app' not found.");
    }
  }
}

const appElement = document.getElementById('app');

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", process)
} else {
  process()
}