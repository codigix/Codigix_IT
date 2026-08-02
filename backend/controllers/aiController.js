const fs = require('fs');
const pdfParse = require('pdf-parse');
const { HfInference } = require('@huggingface/inference');
const dotenv = require('dotenv');
dotenv.config();

const hf = new HfInference(process.env.HF_TOKEN);

const generateAIResponse = async (text) => {
  // Limit text to roughly 20000 characters (about 5000 tokens)
  text = text.substring(0, 20000);

  const prompt = `
You are an expert IT case study writer. I will provide you with a raw project document.
Your task is to extract the key information and format it strictly as a valid JSON object matching the exact schema provided below. Do not include any markdown formatting, backticks, or other text outside the JSON.

JSON Schema:
{
  "title": "A short, catchy title for the case study (e.g., 'Smart ERP Migration')",
  "slug": "url-friendly-slug-of-the-title",
  "client": "Name of the client or company",
  "catName": "A short category badge (e.g., 'ERP Solutions')",
  "category": "Main category for filtering (e.g., 'ERP', 'AI', 'IoT')",
  "subtitle": "A 1-2 sentence short description of the project",
  "objective": "A 2-3 sentence description of the primary objective",
  "businessChallengeDesc": "A paragraph explaining the core business problem",
  "challenges": [{"title": "Challenge Name", "desc": "Brief description"}],
  "solutionPoints": ["Bullet point 1", "Bullet point 2"],
  "radialNodes": ["Keyword1", "Keyword2", "Keyword3"],
  "keyFeatures": [{"title": "Feature Name", "desc": "Brief description"}],
  "techStack": [{"name": "Technology Name (e.g., React, Python)"}],
  "results": [{"val": "Metric value (e.g., 50%)", "title": "Metric description"}],
  "solutionHighlights": ["Highlight 1", "Highlight 2"],
  "sidebarSpecs": {
    "duration": "e.g., 6 Months",
    "technologies": "e.g., React, Node.js",
    "liveUrl": ""
  },
  "testimonial": {
    "quote": "A positive quote about the project",
    "author": "Person name",
    "title": "Designation",
    "company": "Client company"
  }
}

Raw Document Content:
"""
${text}
"""
`;

  // Generate completion using Qwen2.5 which is officially supported for text generation and chat
  const response = await hf.chatCompletion({
    model: 'Qwen/Qwen2.5-72B-Instruct',
    messages: [
      { role: 'user', content: prompt }
    ],
    max_tokens: 1500,
    temperature: 0.1,
  });

  const generatedText = response.choices[0].message.content.trim();
  
  // Clean up potential markdown blocks if the model outputs them anyway
  const jsonString = generatedText.replace(/```json/gi, '').replace(/```/g, '').trim();

  const resultObj = JSON.parse(jsonString);
  return resultObj;
};

const getFallbackData = () => {
  return {
    title: "AI-Powered Analytics Migration",
    slug: "ai-analytics-migration",
    client: "Acme Corp",
    catName: "DATA & AI",
    category: "Data",
    subtitle: "Migrating legacy data systems to a modern AI-driven analytics platform.",
    objective: "To enhance decision making by providing real-time AI analytics over vast amounts of historical data.",
    businessChallengeDesc: "The client was struggling with slow reporting times and disjointed data silos across multiple departments, making it impossible to gain real-time insights.",
    challenges: [{title: "Data Silos", desc: "Data was isolated across 5 different legacy systems."}],
    solutionPoints: ["Unified data lake architecture", "Real-time AI dashboards"],
    radialNodes: ["DATA", "AI", "CLOUD", "MIGRATION", "ANALYTICS"],
    keyFeatures: [{title: "Real-time Processing", desc: "Sub-second data processing"}],
    techStack: [{name: "Python"}, {name: "AWS"}, {name: "React"}],
    results: [{val: "300%", title: "Faster Reporting"}],
    solutionHighlights: ["Cloud Native", "Scalable"],
    sidebarSpecs: {
      duration: "4 Months",
      technologies: "Python, AWS, React",
      liveUrl: "https://example.com"
    },
    testimonial: {
      quote: "This transformed how we view our data completely.",
      author: "John Doe",
      title: "CTO",
      company: "Acme Corp"
    }
  };
};

exports.analyzeText = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: 'No text provided' });
    }

    try {
      const resultObj = await generateAIResponse(text);
      return res.json(resultObj);
    } catch (parseError) {
      console.error("Failed AI parsing:", parseError);
      throw new Error('AI did not return valid JSON. Generating Fallback data...');
    }
  } catch (error) {
    console.error('Hugging Face AI failed. Using Fallback Data. Error:', error.message);
    return res.json(getFallbackData());
  }
};

exports.analyzeDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No document uploaded' });
    }

    const filePath = req.file.path;
    let text = '';

    // Extract text depending on file type
    if (req.file.mimetype === 'application/pdf') {
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdfParse(dataBuffer);
      text = data.text;
    } else {
      text = fs.readFileSync(filePath, 'utf8');
    }

    // Clean up uploaded file since it's just for parsing
    fs.unlinkSync(filePath);

    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: 'Could not extract text from document.' });
    }

    try {
      const resultObj = await generateAIResponse(text);
      return res.json(resultObj);
    } catch (parseError) {
      console.error("Failed AI parsing:", parseError);
      throw new Error('AI did not return valid JSON. Generating Fallback data...');
    }

  } catch (error) {
    console.error('Hugging Face AI failed. Using Fallback Data. Error:', error.message);
    return res.json(getFallbackData());
  }
};
