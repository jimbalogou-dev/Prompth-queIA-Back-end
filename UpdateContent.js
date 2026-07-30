

require('dotenv').config();
const mongoose = require('mongoose');
const Prompt = require('./Model/Prompt');

const contentData = [
  { title: "Rédacteur d'articles SEO", content: "Tu es un rédacteur SEO expert. Rédige un article de blog optimisé pour le référencement naturel sur le sujet suivant.\n\nContraintes : 800-1200 mots, inclure le mot-clé principal dans le titre et au moins 2 sous-titres (H2), structure avec introduction accrocheuse, 3-4 parties développées, conclusion avec appel à l'action.\n\nFormat de sortie : titre SEO, meta description (155 caractères max), puis l'article complet avec sous-titres.\n\nSujet : {input}" },
  { title: 'Explain Code', content: "Tu es un développeur expert. Explique le code suivant étape par étape, dans un langage clair et accessible. Précise sa logique, son objectif, et signale les points d'attention ou améliorations possibles.\n\nCode :\n{input}" },
  { title: 'Stratégie marketing', content: "Tu es consultant en stratégie marketing. Élabore une stratégie marketing complète pour le projet ou la marque suivante.\n\nInclus : positionnement, cibles prioritaires, canaux recommandés, message clé, et 3 actions concrètes à lancer en priorité.\n\nProjet : {input}" },
  { title: 'Prompt Midjourney', content: "Tu es expert en génération d'images IA. Transforme la description suivante en un prompt Midjourney détaillé et optimisé (style, éclairage, composition, ratio, paramètres --ar et --v).\n\nDescription : {input}" },
  { title: 'Résumé de texte', content: "Résume le texte suivant de façon claire et fidèle, en conservant les idées essentielles. Limite le résumé à environ 20% de la longueur originale, sous forme de paragraphe structuré.\n\nTexte :\n{input}" },
  { title: 'Email professionnel', content: "Rédige un email professionnel clair et convaincant à partir du contexte suivant. Adopte un ton adapté au destinataire, structure le message (objet, corps, formule de politesse).\n\nContexte : {input}" },
  { title: 'Plan de contenu vidéo', content: "Élabore un calendrier de contenu vidéo sur 4 semaines pour le thème suivant, avec pour chaque vidéo : titre, angle, objectif, et plateforme recommandée.\n\nThème : {input}" },
  { title: 'JavaScript', content: "Tu es développeur JavaScript senior. Optimise, corrige ou complète le code suivant selon les meilleures pratiques actuelles (lisibilité, performance, sécurité). Explique brièvement les changements apportés.\n\nCode :\n{input}" },
  { title: 'Analyse de données', content: "Analyse le jeu de données ou les indicateurs suivants. Identifie les tendances principales, les anomalies éventuelles, et propose 3 insights exploitables pour la prise de décision.\n\nDonnées : {input}" },
  { title: 'UI Design Ideas', content: "Propose 3 concepts d'interface modernes pour l'écran ou le produit suivant, avec pour chacun : le style visuel, la palette de couleurs suggérée, et l'organisation des éléments clés.\n\nProduit/écran : {input}" },
  { title: 'CV Professionnel', content: "Rédige un CV professionnel structuré à partir du profil suivant, adapté au secteur visé. Mets en avant les compétences et réalisations les plus pertinentes.\n\nProfil : {input}" },
  { title: 'JavaScript Helper', content: "Explique ou débogue le code JavaScript suivant. Identifie la cause du problème s'il y en a un, propose une correction, et explique la solution simplement.\n\nCode :\n{input}" },
  { title: 'Pitch de vente', content: "Rédige un pitch de vente percutant pour le produit ou service suivant, en 60 secondes maximum à l'oral. Structure : accroche, problème, solution, bénéfice clé, appel à l'action.\n\nProduit/service : {input}" },
  { title: 'Post Instagram', content: "Rédige 3 propositions de légendes Instagram engageantes pour le sujet suivant, avec emojis et hashtags pertinents adaptés à l'audience visée.\n\nSujet : {input}" },
  { title: 'Brainstorming IA', content: "Génère 10 idées créatives et variées sur le sujet suivant, en variant les angles d'approche (pratique, original, ambitieux). Classe-les par pertinence.\n\nSujet : {input}" },
  { title: 'React Component', content: "Tu es développeur React expert. Génère un composant React réutilisable et propre à partir de la description suivante, avec des props claires et un style cohérent.\n\nDescription : {input}" },
  { title: 'Résumé de livre', content: "Synthétise les idées essentielles du livre suivant en un résumé structuré : thème principal, points clés, et enseignement à retenir.\n\nLivre : {input}" },
  { title: 'Script YouTube', content: "Rédige un script YouTube structuré et engageant pour la vidéo suivante : accroche (10 premières secondes), développement, appel à l'action final.\n\nSujet de la vidéo : {input}" },
  { title: 'Audit SEO', content: "Réalise un audit SEO à partir des informations suivantes sur le site. Identifie les points faibles principaux et propose 5 recommandations concrètes d'amélioration.\n\nInformations sur le site : {input}" },
  { title: 'Business Plan', content: "Rédige la structure d'un business plan pour le projet suivant : résumé exécutif, marché cible, modèle économique, avantage concurrentiel, besoins de financement.\n\nProjet : {input}" },
  { title: 'Docker Helper', content: "Aide à configurer ou optimiser la conteneurisation Docker suivante. Propose un Dockerfile ou docker-compose adapté, avec explication des choix.\n\nContexte technique : {input}" },
  { title: 'Newsletter', content: "Rédige une newsletter engageante sur le sujet suivant, avec un objet accrocheur, un contenu structuré en sections courtes, et un appel à l'action clair.\n\nSujet : {input}" },
  { title: 'Discours public', content: "Rédige un discours clair et convaincant pour l'occasion suivante. Structure : accroche, développement en 2-3 points, conclusion mémorable.\n\nOccasion et message : {input}" },
  { title: 'Cybersécurité', content: "Explique les bonnes pratiques de cybersécurité applicables au contexte suivant, avec des recommandations concrètes et priorisées.\n\nContexte : {input}" },
  { title: 'Traducteur Pro', content: "Traduis le texte suivant avec précision, en conservant le ton, le contexte et les nuances. Indique la langue cible si elle n'est pas précisée.\n\nTexte : {input}" },
  { title: 'Rapport financier', content: "Analyse les données financières suivantes et rédige un rapport clair : chiffres clés, tendances, points d'attention, recommandations.\n\nDonnées financières : {input}" },
  { title: 'Plan de cours', content: "Conçois un plan de cours structuré sur le sujet suivant : objectifs pédagogiques, plan de séances, méthodes d'évaluation.\n\nSujet et niveau : {input}" },
  { title: 'Prompt ChatGPT', content: "Reformule la demande suivante en un prompt optimisé pour ChatGPT, en précisant le rôle attendu, le contexte, les contraintes et le format de réponse souhaité.\n\nDemande initiale : {input}" },
  { title: 'Fiche produit', content: "Rédige une fiche produit professionnelle et persuasive pour l'article suivant, avec titre accrocheur, description des bénéfices, et caractéristiques techniques.\n\nProduit : {input}" },
  { title: 'Data Science', content: "Analyse le problème de data science suivant. Propose une approche méthodologique (nettoyage, exploration, modélisation) et le code Python/Pandas correspondant si pertinent.\n\nProblème : {input}" },
  { title: 'Chatbot Script', content: "Crée un script de conversation pour un chatbot répondant au scénario suivant, avec les réponses types et la gestion des cas d'erreur.\n\nScénario : {input}" },
  { title: 'Publicité Google Ads', content: "Rédige 3 versions d'annonces Google Ads (titre + description) pour le produit ou service suivant, optimisées pour le taux de clic et la conversion.\n\nProduit/service : {input}" },
  { title: 'Code Generator', content: "Génère du code propre et performant répondant au besoin suivant, avec commentaires explicatifs et respect des bonnes pratiques du langage utilisé.\n\nBesoin : {input}" },
  { title: 'SQL & NoSQL Architect', content: "Conçois un schéma de base de données (SQL ou NoSQL selon le contexte) adapté au besoin suivant, avec justification des choix structurels.\n\nBesoin fonctionnel : {input}" },
  { title: 'DevOps Deployer', content: "Propose une configuration de pipeline CI/CD adaptée au projet suivant, avec les étapes clés (build, test, déploiement) et les outils recommandés.\n\nContexte projet : {input}" },
  { title: 'Cybersecurity Auditor', content: "Audite le système ou processus suivant du point de vue sécurité. Identifie les vulnérabilités potentielles et propose des mesures correctives priorisées.\n\nSystème/processus : {input}" },
  { title: 'API Crafting', content: "Conçois une API RESTful pour le besoin suivant : liste des endpoints, méthodes HTTP, structure des réponses JSON.\n\nBesoin fonctionnel : {input}" },
  { title: 'Bug Hunter', content: "Analyse le code ou le comportement suivant pour identifier la cause probable du bug. Propose une correction et explique le raisonnement.\n\nCode/comportement observé : {input}" },
  { title: 'Regex Master', content: "Génère une expression régulière précise répondant au besoin suivant, avec explication de chaque partie de la regex.\n\nBesoin : {input}" },
  { title: 'Architecture Design', content: "Propose une architecture logicielle adaptée au projet suivant, en précisant les composants principaux, leurs interactions, et les choix technologiques justifiés.\n\nProjet : {input}" },
  { title: 'Component Styler', content: "Propose un style cohérent (CSS ou design tokens) pour le composant d'interface suivant, conforme aux bonnes pratiques UI actuelles.\n\nComposant : {input}" },
  { title: 'User Persona Builder', content: "Construis un persona utilisateur détaillé (profil, objectifs, frustrations, comportements) à partir des informations suivantes sur ta cible.\n\nInformations sur la cible : {input}" },
  { title: 'Microcopy Specialist', content: "Rédige la microcopie (boutons, messages, labels) pour l'interface suivante, dans un style clair, engageant et centré sur l'utilisateur.\n\nContexte de l'interface : {input}" },
  { title: 'AI Image Engineering', content: "Transforme la description suivante en un prompt optimisé pour un générateur d'images IA (style, composition, éclairage, détails techniques).\n\nDescription : {input}" },
  { title: 'Product Roadmapper', content: "Élabore une roadmap produit sur les 2 prochains trimestres pour le projet suivant, avec priorisation des fonctionnalités selon impact et effort.\n\nProjet : {input}" },
  { title: 'Landing Page Structure', content: "Propose la structure complète d'une landing page pour l'offre suivante : sections, contenu de chaque bloc, et appels à l'action.\n\nOffre : {input}" },
  { title: 'Design System Guide', content: "Définis les bases d'un design system pour le produit suivant : couleurs, typographie, espacements, composants principaux.\n\nProduit : {input}" },
  { title: 'SEO Keyword Strategy', content: "Identifie une liste de mots-clés pertinents pour le sujet suivant, classés par intention de recherche et priorité (volume/concurrence estimée).\n\nSujet/secteur : {input}" },
  { title: 'SEO Blog Post', content: "Rédige un article de blog optimisé SEO sur le sujet suivant, avec structure Hn, mots-clés intégrés naturellement, et longueur adaptée au sujet.\n\nSujet et mot-clé principal : {input}" },
  { title: 'Funnel Optimizer', content: "Analyse le tunnel de conversion suivant et identifie les points de friction. Propose des optimisations concrètes pour chaque étape.\n\nDescription du tunnel actuel : {input}" },
  { title: 'Social Media Viral Hook', content: "Génère 5 accroches percutantes pour un post sur les réseaux sociaux à propos du sujet suivant, pensées pour maximiser l'engagement.\n\nSujet : {input}" },
  { title: 'Community Manager AI', content: "Propose un plan d'animation de communauté sur 2 semaines pour le sujet suivant, avec types de contenus et fréquence de publication.\n\nCommunauté/sujet : {input}" },
  { title: 'Ads Copywriter', content: "Rédige un texte publicitaire persuasif pour le produit ou service suivant, structuré selon la méthode AIDA (Attention, Intérêt, Désir, Action).\n\nProduit/service : {input}" },
  { title: 'Newsletter Architect', content: "Conçois la structure complète d'une newsletter récurrente pour le sujet suivant : sections fixes, ton, fréquence recommandée.\n\nSujet/audience : {input}" },
  { title: 'Video Scriptwriter', content: "Rédige un script vidéo captivant et bien structuré pour la plateforme suivante, avec accroche, développement, et conclusion.\n\nSujet et plateforme : {input}" },
  { title: 'Make & Zapier Logic', content: "Propose un workflow d'automatisation (Make ou Zapier) pour le processus suivant, avec les étapes déclencheur/actions détaillées.\n\nProcessus à automatiser : {input}" },
  { title: 'Data Cleaner', content: "Propose une méthode de nettoyage pour le jeu de données suivant : gestion des valeurs manquantes, doublons, incohérences.\n\nDescription des données : {input}" },
  { title: 'Predictive Analysis', content: "Analyse les données suivantes et identifie les tendances permettant d'anticiper une évolution future. Formule 2-3 hypothèses exploitables.\n\nDonnées : {input}" },
  { title: 'Data Analyst', description: "" , content: "Analyse les données suivantes et présente les indicateurs clés (KPI) les plus pertinents, avec une interprétation claire pour la prise de décision.\n\nDonnées : {input}" },
  { title: 'Job Description Crafter', content: "Rédige une offre d'emploi attractive et professionnelle pour le poste suivant : missions, profil recherché, avantages.\n\nPoste : {input}" },
  { title: 'Interview Simulator', content: "Simule un entretien d'embauche réaliste pour le poste suivant. Pose des questions pertinentes une par une et donne un retour constructif sur les réponses.\n\nPoste visé : {input}" },
  { title: 'Contract Reviewer', content: "Analyse la clause ou le contrat suivant et explique en langage clair les points essentiels, les risques potentiels et les éléments à vérifier.\n\nContrat/clause : {input}" },
  { title: 'Team Conflict Resolver', content: "Propose une approche pour résoudre le conflit d'équipe suivant, avec des étapes concrètes et une communication adaptée aux parties concernées.\n\nSituation : {input}" },
  { title: 'Meeting Summarizer', content: "Résume le compte rendu de réunion suivant en identifiant clairement les décisions prises et les actions à suivre, avec responsables si mentionnés.\n\nCompte rendu brut : {input}" },
  { title: 'Cold Outreach Master', content: "Rédige un message de prospection personnalisé et court pour le contexte suivant, pensé pour maximiser le taux de réponse.\n\nContexte et cible : {input}" },
  { title: 'Financial Forecaster', content: "Élabore une prévision financière simplifiée à partir des données suivantes, en identifiant les hypothèses principales et les risques associés.\n\nDonnées de départ : {input}" },
  { title: 'Executive Summary', content: "Rédige une synthèse exécutive concise du document suivant, en mettant en avant l'essentiel et les recommandations clés.\n\nDocument : {input}" },
  { title: 'Brainstorming Partner', content: "Génère rapidement des idées variées et originales pour résoudre la problématique suivante, en explorant plusieurs angles.\n\nProblématique : {input}" },
  { title: 'Syllabus Designer', content: "Conçois un programme de formation structuré sur le sujet suivant, avec modules, objectifs par module et durée estimée.\n\nSujet et public : {input}" },
  { title: 'Quiz & Assessment Maker', content: "Crée un quiz de 10 questions sur le sujet suivant, avec réponses correctes et brève explication pour chacune.\n\nSujet : {input}" },
  { title: 'Life/Business Coach', content: "Propose un accompagnement structuré pour la situation suivante : diagnostic rapide, objectifs à court terme, premières actions concrètes.\n\nSituation : {input}" },
  { title: 'Tone Shifter', content: "Réécris le texte suivant en adaptant son ton selon le contexte demandé (plus formel, plus décontracté, plus persuasif, etc.), sans changer le fond.\n\nTexte et ton souhaité : {input}" },
  { title: 'Grammar Polisher', content: "Corrige l'orthographe, la grammaire et le style du texte suivant, sans en changer le sens. Indique brièvement les principales corrections apportées.\n\nTexte : {input}" },
  { title: 'Angry Customer Reply', content: "Rédige une réponse professionnelle et apaisante à la réclamation client suivante, reconnaissant le problème et proposant une solution concrète.\n\nRéclamation : {input}" },
  { title: 'FAQ Architect', content: "Génère une FAQ complète et bien structurée à partir des informations suivantes sur le produit/service, en anticipant les questions les plus fréquentes.\n\nInformations : {input}" },
  { title: 'Ticketing Responder', content: "Rédige une réponse rapide et professionnelle au ticket de support suivant, claire et orientée solution.\n\nTicket : {input}" },
  { title: 'Global Localizer', content: "Adapte le contenu suivant pour le marché et la culture cibles, en ajustant le ton, les références et les formulations si nécessaire.\n\nContenu et marché cible : {input}" },
];

async function update() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('MongoDB connected');

    let count = 0;
    for (const item of contentData) {
      const result = await Prompt.updateOne(
        { title: item.title },
        { $set: { content: item.content } }
      );
      if (result.matchedCount > 0) count++;
    }

    console.log(`${count} contenus de prompts mis à jour.`);
    process.exit(0);
  } catch (error) {
    console.error('Erreur lors de la mise à jour :', error.message);
    process.exit(1);
  }
}

update();