import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
console.log(process.env.OPENAI_API_KEY)
//console.log(openai)

export const generateBookingSummary = async (details: any) => {
  console.log(details)
  const prompt = `You’re traveling from ${details.from} to ${details.destination} on ${details.to}. Your booking includes ${details.highlights.join(', ')}, and your trip is scheduled to start on ${details.start_travel_date} and end on ${details.last_travel_date}.`;
  console.log(prompt);
  const res = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
  });
  console.log(res.choices[0].message.content);
  return res.choices[0].message.content;
};