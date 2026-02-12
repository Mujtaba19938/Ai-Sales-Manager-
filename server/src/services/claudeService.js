import Anthropic from '@anthropic-ai/sdk';

let anthropic;
function getClient() {
  if (!anthropic) {
    anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }
  return anthropic;
}

export function buildSystemPrompt(analytics) {
  return `You are a business analytics AI assistant for a sales dashboard application.
You have access to the user's real business data shown below. Use this data to answer
questions, provide insights, and make actionable recommendations to boost their business.

CURRENT BUSINESS DATA (${analytics.dateRange}):

SUMMARY METRICS:
- Total Revenue: $${(analytics.totalRevenue || 0).toLocaleString()}
- Cost of Goods Sold (COGS): $${(analytics.totalCOGS || 0).toLocaleString()}
- Gross Profit: $${(analytics.grossProfit || 0).toLocaleString()}
- Total Operating Expenses: $${(analytics.totalExpenses || 0).toLocaleString()}
- Net Profit: $${(analytics.netProfit || 0).toLocaleString()}
- Gross Margin: ${analytics.grossMargin || 0}%
- Net Margin: ${analytics.netMargin || 0}%
- Operating Margin: ${analytics.operatingMargin || 0}%
- Total Units Sold: ${analytics.totalUnits || 0}
- Number of Sales Entries: ${analytics.entryCount || 0}
${analytics.growthRate !== null ? `- Sales Growth Rate (vs prior period): ${analytics.growthRate}%` : ''}
${analytics.breakEvenUnits ? `- Break-Even Point: ${analytics.breakEvenUnits} units ($${analytics.breakEvenRevenue?.toLocaleString()})` : ''}

TOP CATEGORIES BY REVENUE:
${(analytics.categoryBreakdown || []).map(c => `- ${c.name}: $${c.revenue.toLocaleString()} (${c.percentage}% of total)`).join('\n') || 'No data'}

EXPENSE BREAKDOWN:
${(analytics.expenseBreakdown || []).map(e => `- ${e.category}: $${e.amount.toLocaleString()} (${e.percentage}%)`).join('\n') || 'No data'}

MONTHLY TREND:
${(analytics.monthlyTrend || []).map(m => `- ${m.period}: Revenue $${m.revenue.toLocaleString()}, Expenses $${m.expenses.toLocaleString()}, Net Profit $${m.netProfit.toLocaleString()}`).join('\n') || 'No data'}

Guidelines:
- Be specific with numbers from the data above. Reference actual figures.
- Identify trends, anomalies, and opportunities.
- Suggest concrete actions to improve profitability.
- Keep responses concise but insightful. Use bullet points for recommendations.
- If the user asks about data you do not have, say so honestly.
- Format numbers as currency where appropriate.`;
}

export async function* streamChat(messages, systemPrompt) {
  const stream = await getClient().messages.stream({
    model: 'claude-sonnet-4-5-20250929',
    max_tokens: 1024,
    system: systemPrompt,
    messages,
  });

  for await (const event of stream) {
    if (event.type === 'content_block_delta' && event.delta?.text) {
      yield event.delta.text;
    }
  }
}
