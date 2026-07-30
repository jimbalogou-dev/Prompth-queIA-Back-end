require('dotenv').config();
const mongoose = require('mongoose');
const Prompt = require('./Model/Prompt');

const iconData = [
  { title: "Rédacteur d'articles SEO", icon: '🤖', color: '#4f46e5' },
  { title: 'Explain Code', icon: '💻', color: '#16a34a' },
  { title: 'Stratégie marketing', icon: '📣', color: '#ea580c' },
  { title: 'Prompt Midjourney', icon: '🖼️', color: '#db2777' },
  { title: 'Résumé de texte', icon: '📄', color: '#2563eb' },
  { title: 'Email professionnel', icon: '📧', color: '#0891b2' },
  { title: 'Plan de contenu vidéo', icon: '🎯', color: '#7c3aed' },
  { title: 'JavaScript', icon: '🟨', color: '#15803d' },
  { title: 'Analyse de données', icon: '📊', color: '#b45309' },
  { title: 'UI Design Ideas', icon: '🎨', color: '#be185d' },
  { title: 'CV Professionnel', icon: '📝', color: '#0369a1' },
  { title: 'JavaScript Helper', icon: '🟨', color: '#ca8a04' },
  { title: 'Pitch de vente', icon: '🤝', color: '#7c3aed' },
  { title: 'Post Instagram', icon: '📱', color: '#0891b2' },
  { title: 'Brainstorming IA', icon: '🧠', color: '#6d28d9' },
  { title: 'React Component', icon: '⚛️', color: '#0ea5e9' },
  { title: 'Résumé de livre', icon: '📖', color: '#b45309' },
  { title: 'Script YouTube', icon: '🎬', color: '#dc2626' },
  { title: 'Audit SEO', icon: '🔍', color: '#059669' },
  { title: 'Business Plan', icon: '💡', color: '#d97706' },
  { title: 'Docker Helper', icon: '🐳', color: '#0284c7' },
  { title: 'Newsletter', icon: '✍️', color: '#be185d' },
  { title: 'Discours public', icon: '🗣️', color: '#7c3aed' },
  { title: 'Cybersécurité', icon: '🛡️', color: '#1d4ed8' },
  { title: 'Traducteur Pro', icon: '🌍', color: '#059669' },
  { title: 'Rapport financier', icon: '📈', color: '#ea580c' },
  { title: 'Plan de cours', icon: '🎓', color: '#7c3aed' },
  { title: 'Prompt ChatGPT', icon: '🤖', color: '#0f172a' },
  { title: 'Fiche produit', icon: '🏪', color: '#b45309' },
  { title: 'Data Science', icon: '🐍', color: '#15803d' },
  { title: 'Chatbot Script', icon: '💬', color: '#0891b2' },
  { title: 'Publicité Google Ads', icon: '🎯', color: '#dc2626' },
  { title: 'Code Generator', icon: '⚙️', color: '#1d4ed8' },
  { title: 'SQL & NoSQL Architect', icon: '🗄️', color: '#0369a1' },
  { title: 'DevOps Deployer', icon: '🚀', color: '#7c3aed' },
  { title: 'Cybersecurity Auditor', icon: '🔐', color: '#dc2626' },
  { title: 'API Crafting', icon: '🔌', color: '#0891b2' },
  { title: 'Bug Hunter', icon: '🐛', color: '#b45309' },
  { title: 'Regex Master', icon: '🔍', color: '#6d28d9' },
  { title: 'Architecture Design', icon: '🏗️', color: '#374151' },
  { title: 'Component Styler', icon: '🎨', color: '#db2777' },
  { title: 'User Persona Builder', icon: '👤', color: '#7c3aed' },
  { title: 'Microcopy Specialist', icon: '✍️', color: '#0369a1' },
  { title: 'AI Image Engineering', icon: '🖼️', color: '#ea580c' },
  { title: 'Product Roadmapper', icon: '🗺️', color: '#059669' },
  { title: 'Landing Page Structure', icon: '📐', color: '#1d4ed8' },
  { title: 'Design System Guide', icon: '📏', color: '#374151' },
  { title: 'SEO Keyword Strategy', icon: '📈', color: '#16a34a' },
  { title: 'SEO Blog Post', icon: '📝', color: '#0369a1' },
  { title: 'Funnel Optimizer', icon: '🔄', color: '#7c3aed' },
  { title: 'Social Media Viral Hook', icon: '🔥', color: '#dc2626' },
  { title: 'Community Manager AI', icon: '👥', color: '#0891b2' },
  { title: 'Ads Copywriter', icon: '📢', color: '#ea580c' },
  { title: 'Newsletter Architect', icon: '📧', color: '#6d28d9' },
  { title: 'Video Scriptwriter', icon: '🎬', color: '#b45309' },
  { title: 'Make & Zapier Logic', icon: '⚡', color: '#059669' },
  { title: 'Data Cleaner', icon: '🧹', color: '#0369a1' },
  { title: 'Predictive Analysis', icon: '🔮', color: '#7c3aed' },
  { title: 'Data Analyst', icon: '📊', color: '#1d4ed8' },
  { title: 'Job Description Crafter', icon: '📋', color: '#374151' },
  { title: 'Interview Simulator', icon: '🎤', color: '#dc2626' },
  { title: 'Contract Reviewer', icon: '📜', color: '#b45309' },
  { title: 'Team Conflict Resolver', icon: '🤝', color: '#059669' },
  { title: 'Meeting Summarizer', icon: '📝', color: '#0891b2' },
  { title: 'Cold Outreach Master', icon: '💌', color: '#6d28d9' },
  { title: 'Financial Forecaster', icon: '💰', color: '#16a34a' },
  { title: 'Executive Summary', icon: '📄', color: '#374151' },
  { title: 'Brainstorming Partner', icon: '🧠', color: '#7c3aed' },
  { title: 'Syllabus Designer', icon: '📚', color: '#0369a1' },
  { title: 'Quiz & Assessment Maker', icon: '✅', color: '#16a34a' },
  { title: 'Life/Business Coach', icon: '🎯', color: '#ea580c' },
  { title: 'Tone Shifter', icon: '🔄', color: '#0891b2' },
  { title: 'Grammar Polisher', icon: '✒️', color: '#374151' },
  { title: 'Angry Customer Reply', icon: '😤', color: '#dc2626' },
  { title: 'FAQ Architect', icon: '❓', color: '#6d28d9' },
  { title: 'Ticketing Responder', icon: '🎫', color: '#0369a1' },
  { title: 'Global Localizer', icon: '🌍', color: '#059669' },
];

async function update() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('MongoDB connected');

    let count = 0;
    for (const item of iconData) {
      const result = await Prompt.updateOne(
        { title: item.title },
        { $set: { icon: item.icon, color: item.color } }
      );
      if (result.matchedCount > 0) count++;
    }

    console.log(`${count} prompts mis à jour avec leur icône et couleur.`);
    process.exit(0);
  } catch (error) {
    console.error('Erreur lors de la mise à jour :', error.message);
    process.exit(1);
  }
}

update();