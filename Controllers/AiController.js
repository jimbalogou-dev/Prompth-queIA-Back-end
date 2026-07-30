const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const testPrompt = async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ message: 'Contenu du prompt manquant' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content }],
      max_tokens: 500
    });

    const response = completion.choices[0].message.content;
    res.json({ response });
  } catch (error) {
    console.log('Erreur OpenAI', error.message);
    res.status(500).json({ message: 'Erreur lors du test du prompt' });
  }
};

module.exports = { testPrompt };