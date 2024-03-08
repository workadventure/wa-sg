import { DialogueBoxComponent } from './components/DialogueBoxComponent';

console.info('"Dialogue Box" script started successfully')

const DIALOGUES: { NAME: string, MESSAGE: { EN: string, FR: string } }[] = [
  {
    NAME: 'Camille',
    MESSAGE: {
      EN: `Hello! I'm Camille, an expert in GCA (Credit and Activity Management) at Société Générale. My role involves overseeing the management of credits and financial activities within the company. I ensure that credit decisions are made judiciously and that financial activities contribute to the overall financial health of the company.
      Head to the GCA room to learn more!`,
      FR: `Bonjour ! Je suis Camille, experte en GCA (Gestion des Crédits et des Activités)  à la Société Générale. Mon rôle consiste à superviser la gestion des crédits et des activités financières au sein de l'entreprise. Je m'assure que les décisions de crédit sont prises de manière judicieuse et que les activités financières contribuent à la santé financière globale de l'entreprise.
      Rendez-vous dans la salle GCA pour en apprendre plus !`,
    },
  },
  {
    NAME: 'Victor',
    MESSAGE: {
      EN: `Hi, I'm Victor, a specialist in SCF (Supply Chain Finance) here at Société Générale. My expertise lies in innovative financial solutions to optimize commercial transactions and supply chains. I work with our clients to develop effective financial strategies that improve cash flow management and strengthen commercial relationships.
      Head to the SCF room to learn more!`,
      FR: `Salut, je suis Victor, spécialiste en SCF (Supply Chain Finance) ici à la Société Générale. Mon domaine d'expertise concerne les solutions financières innovantes pour optimiser les transactions commerciales et les chaînes d'approvisionnement. Je travaille avec nos clients pour développer des stratégies financières efficaces qui améliorent la gestion des flux de trésorerie et renforcent les relations commerciales.
      Rendez-vous dans la salle SCF pour en apprendre plus !`,
    },
  },
  {
    NAME: 'Lukas',
    MESSAGE: {
      EN: `Good day! Lukas at your service, an HSE (Health, Safety, Environment) specialist at Société Générale. My crucial role involves ensuring that our operations adhere to the highest standards of health, safety, and environmental impact. Whether it's compliance issues, safety training, or discussing our environmental initiatives, I'm here to ensure a safe and sustainable work environment.
      Head to the HSE room to learn more!`,
      FR: `Bien le bonjour, Lukas à votre service, spécialiste en HSE (Hygiène, Sécurité, Environnement) à la Société Générale. Mon rôle crucial consiste à veiller à ce que nos opérations respectent les normes les plus élevées en matière de santé, sécurité et impact environnemental. Que ce soit pour des questions de conformité, de formation en sécurité ou pour discuter de nos initiatives environnementales, je suis là pour garantir un environnement de travail sûr et durable.
      Rendez-vous dans la salle HSE pour en apprendre plus !`,
    },
  },
  {
    NAME: 'Sara',
    MESSAGE: {
      EN: `Hi there! I'm Sara, the expert in OCO (Order with Conditions Operations) at Société Générale. My expertise lies in managing conditional orders on financial operations. Whether you want to automate transactions based on market conditions or simply understand how to optimize your orders, I'm here to share my knowledge and guide you through the world of conditional operations.
      Head to the OCO room to learn more!`,
      FR: `Salut ! Je m'appelle Sara et je suis l'experte en OCO (Ordre à Conditions d'Opérations)  à la Société Générale. Mon domaine d'expertise réside dans la gestion des ordres conditionnels sur les opérations financières. Que vous souhaitiez automatiser des transactions en fonction de certaines conditions de marché ou simplement comprendre comment optimiser vos ordres, je suis là pour partager mes connaissances.
      Rendez-vous dans la salle OCO pour en apprendre plus !`,
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