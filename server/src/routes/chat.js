import { Router } from 'express';
import { getFullAnalytics } from '../services/calculatorService.js';
import { buildSystemPrompt, streamChat } from '../services/claudeService.js';

const router = Router();

router.post('/', async (req, res, next) => {
  try {
    const { messages, dateRange } = req.body;

    // Fetch current analytics for context
    const analytics = await getFullAnalytics(dateRange?.startDate, dateRange?.endDate);
    const systemPrompt = buildSystemPrompt(analytics);

    // Set up SSE
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Stream response
    for await (const text of streamChat(messages, systemPrompt)) {
      res.write(`data: ${JSON.stringify({ text })}\n\n`);
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (err) {
    if (!res.headersSent) {
      next(err);
    } else {
      res.write(`data: ${JSON.stringify({ error: err.message })}\n\n`);
      res.end();
    }
  }
});

export default router;
