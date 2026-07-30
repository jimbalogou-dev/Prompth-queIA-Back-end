require('dotenv').config();
const mongoose = require('mongoose');
const Prompt = require('./Model/Prompt');

const aiData = [
  { title: "Rédacteur d'articles SEO", iamodel: "ChatGPT, Claude, Gemini" },
  { title: 'Explain Code', iamodel: "ChatGPT, Claude" },
  { title: 'Stratégie marketing', iamodel: "ChatGPT, Claude, Gemini" },
  { title: 'Prompt Midjourney', iamodel: "Midjourney" },
  { title: 'Résumé de texte', iamodel: "ChatGPT, Claude, Gemini" },
  { title: 'Email professionnel', iamodel: "ChatGPT, Claude, Gemini" },
  { title: 'Plan de contenu vidéo', iamodel: "ChatGPT, Claude" },
  { title: 'JavaScript', iamodel: "ChatGPT, Claude" },
  { title: 'Analyse de données', iamodel: "ChatGPT, Claude, Gemini" },
  { title: 'UI Design Ideas', iamodel: "ChatGPT, Claude" },
  { title: 'CV Professionnel', iamodel: "ChatGPT, Claude, Gemini" },
  { title: 'JavaScript Helper', iamodel: "ChatGPT, Claude" },
  { title: 'Pitch de vente', iamodel: "ChatGPT, Claude, Gemini" },
  { title: 'Post Instagram', iamodel: "ChatGPT, Claude, Gemini" },
  { title: 'Brainstorming IA', iamodel: "ChatGPT, Claude, Gemini" },
  { title: 'React Component', iamodel: "ChatGPT, Claude" },
  { title: 'Résumé de livre', iamodel: "ChatGPT, Claude, Gemini" },
  { title: 'Script YouTube', iamodel: "ChatGPT, Claude, Gemini" },
  { title: 'Audit SEO', iamodel: "ChatGPT, Claude, Perplexity" },
  { title: 'Business Plan', iamodel: "ChatGPT, Claude, Gemini" },
  { title: 'Docker Helper', iamodel: "ChatGPT, Claude" },
  { title: 'Newsletter', iamodel: "ChatGPT, Claude, Gemini" },
  { title: 'Discours public', iamodel: "ChatGPT, Claude, Gemini" },
  { title: 'Cybersécurité', iamodel: "ChatGPT, Claude" },
  { title: 'Traducteur Pro', iamodel: "ChatGPT, Claude, Gemini" },
  { title: 'Rapport financier', iamodel: "ChatGPT, Claude, Gemini" },
  { title: 'Plan de cours', iamodel: "ChatGPT, Claude, Gemini" },
  { title: 'Prompt ChatGPT', iamodel: "ChatGPT" },
  { title: 'Fiche produit', iamodel: "ChatGPT, Claude, Gemini" },
  { title: 'Data Science', iamodel: "ChatGPT, Claude" },
  { title: 'Chatbot Script', iamodel: "ChatGPT, Claude" },
  { title: 'Publicité Google Ads', iamodel: "ChatGPT, Claude, Gemini" },
  { title: 'Code Generator', iamodel: "ChatGPT, Claude" },
  { title: 'SQL & NoSQL Architect', iamodel: "ChatGPT, Claude" },
  { title: 'DevOps Deployer', iamodel: "ChatGPT, Claude" },
  { title: 'Cybersecurity Auditor', iamodel: "ChatGPT, Claude" },
  { title: 'API Crafting', iamodel: "ChatGPT, Claude" },
  { title: 'Bug Hunter', iamodel: "ChatGPT, Claude" },
  { title: 'Regex Master', iamodel: "ChatGPT, Claude" },
  { title: 'Architecture Design', iamodel: "ChatGPT, Claude" },
  { title: 'Component Styler', iamodel: "ChatGPT, Claude" },
  { title: 'User Persona Builder', iamodel: "ChatGPT, Claude, Gemini" },
  { title: 'Microcopy Specialist', iamodel: "ChatGPT, Claude, Gemini" },
  { title: 'AI Image Engineering', iamodel: "Midjourney, Canva AI" },
  { title: 'Product Roadmapper', iamodel: "ChatGPT, Claude, Gemini" },
  { title: 'Landing Page Structure', iamodel: "ChatGPT, Claude" },
  { title: 'Design System Guide', iamodel: "ChatGPT, Claude" },
  { title: 'SEO Keyword Strategy', iamodel: "ChatGPT, Claude, Perplexity" },
  { title: 'SEO Blog Post', iamodel: "ChatGPT, Claude, Gemini" },
  { title: 'Funnel Optimizer', iamodel: "ChatGPT, Claude, Gemini" },
  { title: 'Social Media Viral Hook', iamodel: "ChatGPT, Claude, Gemini" },
  { title: 'Community Manager AI', iamodel: "ChatGPT, Claude, Gemini" },
  { title: 'Ads Copywriter', iamodel: "ChatGPT, Claude, Gemini" },
  { title: 'Newsletter Architect', iamodel: "ChatGPT, Claude, Gemini" },
  { title: 'Video Scriptwriter', iamodel: "ChatGPT, Claude, Gemini" },
  { title: 'Make & Zapier Logic', iamodel: "ChatGPT, Claude" },
  { title: 'Data Cleaner', iamodel: "ChatGPT, Claude" },
  { title: 'Predictive Analysis', iamodel: "ChatGPT, Claude, Gemini" },
  { title: 'Data Analyst', iamodel: "ChatGPT, Claude, Gemini" },
  { title: 'Job Description Crafter', iamodel: "ChatGPT, Claude, Gemini" },
  { title: 'Interview Simulator', iamodel: "ChatGPT, Claude, Gemini" },
  { title: 'Contract Reviewer', iamodel: "ChatGPT, Claude" },
  { title: 'Team Conflict Resolver', iamodel: "ChatGPT, Claude, Gemini" },
  { title: 'Meeting Summarizer', iamodel: "ChatGPT, Claude, Gemini" },
  { title: 'Cold Outreach Master', iamodel: "ChatGPT, Claude, Gemini" },
  { title: 'Financial Forecaster', iamodel: "ChatGPT, Claude, Gemini" },
  { title: 'Executive Summary', iamodel: "ChatGPT, Claude, Gemini" },
  { title: 'Brainstorming Partner', iamodel: "ChatGPT, Claude, Gemini" },
  { title: 'Syllabus Designer', iamodel: "ChatGPT, Claude, Gemini" },
  { title: 'Quiz & Assessment Maker', iamodel: "ChatGPT, Claude, Gemini" },
  { title: 'Life/Business Coach', iamodel: "ChatGPT, Claude, Gemini" },
  { title: 'Tone Shifter', iamodel: "ChatGPT, Claude, Gemini" },
  { title: 'Grammar Polisher', iamodel: "ChatGPT, Claude, Gemini" },
  { title: 'Angry Customer Reply', iamodel: "ChatGPT, Claude, Gemini" },
  { title: 'FAQ Architect', iamodel: "ChatGPT, Claude, Gemini" },
  { title: 'Ticketing Responder', iamodel: "ChatGPT, Claude, Gemini" },
  { title: 'Global Localizer', iamodel: "ChatGPT, Claude, Gemini" },
];

async function update() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('MongoDB connected');

    let count = 0;
    for (const item of aiData) {
      const result = await Prompt.updateOne(
        { title: item.title },
        { $set: { iamodel: item.iamodel } }
      );
      if (result.matchedCount > 0) count++;
    }

    console.log(`${count} prompts mis à jour avec leurs IA compatibles.`);
    process.exit(0);
  } catch (error) {
    console.error('Erreur :', error.message);
    process.exit(1);
  }
}

update();