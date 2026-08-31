const fs = require('fs');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const dotenv = require('dotenv');
dotenv.config();

const callGeminiAPI = async (prompt) => {
  const apiKey = process.env.AG_TOKEN;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`;
  
  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.2,
      responseMimeType: "application/json"
    }
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Gemini API Error: ${errorText}`);
  }

  const data = await res.json();
  const text = data.candidates[0].content.parts[0].text;
  
  const jsonString = text.replace(/```json/gi, '').replace(/```html/gi, '').replace(/```/g, '').trim();
  return JSON.parse(jsonString);
};

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

  return await callGeminiAPI(prompt);
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
    challenges: [{ title: "Data Silos", desc: "Data was isolated across 5 different legacy systems." }],
    solutionPoints: ["Unified data lake architecture", "Real-time AI dashboards"],
    radialNodes: ["DATA", "AI", "CLOUD", "MIGRATION", "ANALYTICS"],
    keyFeatures: [{ title: "Real-time Processing", desc: "Sub-second data processing" }],
    techStack: [{ name: "Python" }, { name: "AWS" }, { name: "React" }],
    results: [{ val: "300%", title: "Faster Reporting" }],
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

// --- BLOG AI PARSING LOGIC ---

const generateBlogAIResponse = async (text) => {
  text = text.substring(0, 20000); // Token limit protection
  const prompt = `
You are an expert IT blog writer and technical content structuring engine. I will provide you with a raw technical document or draft.
Your task is to extract, expand, and structure the information into a strict JSON object that will directly populate a rich React blog editor state.
Do not include any markdown formatting, backticks, or other text outside the JSON.

JSON Schema Requirements:
{
  "title": "A catchy, SEO-friendly title for the blog",
  "category": "Main category (e.g., 'Technology', 'AI', 'IoT')",
  "sub_category": "Sub category (e.g., 'Machine Learning', 'Smart Factory')",
  "excerpt": "A compelling 1-2 sentence short description of the blog",
  "body": "The main article content in semantic HTML format (use <p>, <h3>, <ul>, <li>, <blockquote>, <strong>). Ensure it is well structured, engaging, and detailed.",
  "ai_summary": "A 2-3 sentence TL;DR summary suitable for AI search engines",
  "key_takeaways": [
    "A concise, actionable insight from the text",
    "Another key point"
  ],
  "faqs": [
    { "question": "A relevant question?", "answer": "A detailed answer based on the text." }
  ],
  "content_blocks": [
    {
      "id": "1",
      "type": "workflow",
      "title": "Optional title for the workflow",
      "items": [
        { "icon": "Server", "title": "Step 1", "subtitle": "Description" },
        { "icon": "Cloud", "title": "Step 2", "subtitle": "Description" }
      ]
    },
    {
      "id": "2",
      "type": "feature_grid",
      "title": "Optional title for a grid of features/benefits",
      "items": [
        { "icon": "CheckCircle", "title": "Benefit 1", "description": "Details" }
      ]
    }
  ],
  "seo_title": "Optimized SEO title (max 60 chars)",
  "seo_description": "Optimized meta description (max 160 chars)",
  "slug": "url-friendly-slug-based-on-title",
  "focus_keyword": "Primary SEO keyword",
  "secondary_keywords": "Comma, separated, keywords",
  "social_title": "Catchy title for social media sharing",
  "social_description": "Engaging description for social media",
  "tags": "Comma, separated, tags, for, the, blog"
}

Instructions for content_blocks:
If the text contains a logical process, pipeline, or sequence, map it to a 'workflow' block. Use generic Lucide icon names like Server, Cloud, Cpu, Activity, Database.
If the text contains a list of benefits, features, or metrics, map it to a 'feature_grid' block. Use icons like CheckCircle, Zap, Shield, TrendingUp.
If no such structures exist, leave content_blocks empty [].

Raw Document Content:
"""
${text}
"""
`;

  return await callGeminiAPI(prompt);
};

const getBlogFallbackData = () => ({
  title: "AI-Generated Tech Blog",
  category: "Technology",
  sub_category: "Innovation",
  excerpt: "An automatically generated placeholder blog post due to a parsing error.",
  body: "<p>This is a fallback content block. The AI parsing failed.</p>",
  ai_summary: "Fallback AI Summary.",
  key_takeaways: ["Parsing failed", "Fallback data used"],
  faqs: [{ question: "Why is this here?", answer: "Because the AI service failed." }],
  content_blocks: []
});

exports.analyzeBlogDocument = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No document uploaded' });

    const filePath = req.file.path;
    let text = '';

    if (req.file.mimetype === 'application/pdf') {
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdfParse(dataBuffer);
      text = data.text;
    } else if (req.file.originalname.endsWith('.docx')) {
      const result = await mammoth.extractRawText({ path: filePath });
      text = result.value;
    } else {
      text = fs.readFileSync(filePath, 'utf8');
    }

    fs.unlinkSync(filePath); // Cleanup

    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: 'Could not extract text from document.' });
    }

    try {
      const resultObj = await generateBlogAIResponse(text);

      // Ensure content blocks have unique IDs if generated by AI
      if (resultObj.content_blocks) {
        resultObj.content_blocks = resultObj.content_blocks.map((block, idx) => ({
          ...block,
          id: Date.now().toString() + idx
        }));
      }

      return res.json(resultObj);
    } catch (parseError) {
      console.error("Failed Blog AI parsing:", parseError);
      return res.json(getBlogFallbackData());
    }

  } catch (error) {
    console.error('Blog Document Upload Error:', error.message);
    return res.json(getBlogFallbackData());
  }
};

exports.analyzeBlogText = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: 'No text provided' });
    }

    try {
      const resultObj = await generateBlogAIResponse(text);

      if (resultObj.content_blocks) {
        resultObj.content_blocks = resultObj.content_blocks.map((block, idx) => ({
          ...block,
          id: Date.now().toString() + idx
        }));
      }

      return res.json(resultObj);
    } catch (parseError) {
      console.error("Failed Blog AI parsing:", parseError);
      return res.json(getBlogFallbackData());
    }
  } catch (error) {
    console.error('Blog Text Analysis Error:', error.message);
    return res.json(getBlogFallbackData());
  }
};
