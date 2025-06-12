// import express from 'express';
// import fetch from 'node-fetch';

// const router = express.Router();

// router.post('/chat', async (req, res) => {
//   const userMessage = req.body.message;

//   try {
//     const response = await fetch('https://api.deepseek.com/chat', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         model: 'deepseek-chat',
//         messages: [
//           { role: 'user', content: userMessage }
//         ]
//       })
//     });

//     const data = await response.json();
//     const reply = data?.choices?.[0]?.message?.content || "Sorry, I couldn't respond.";
//     res.json({ response: reply });

//   } catch (error) {
//     console.error('DeepSeek error:', error);
//     res.status(500).json({ error: 'AI service failed' });
//   }
// });

// export default router;



// backend/routes/chat.js
import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

router.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer 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',
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:5174', // Replace with your actual frontend domain
        'X-Title': 'AI Chat Testing'
      },
      body: JSON.stringify({
        model: 'mistralai/mistral-7b-instruct', // You can change to another model available on OpenRouter
        messages: [
          { role: 'user', content: userMessage }
        ]
      })
    });

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content || "Sorry, I couldn't respond.";
    res.json({ response: reply });

  } catch (error) {
    console.error('OpenRouter error:', error);
    res.status(500).json({ error: 'AI service failed' });
  }
});

export default router;
