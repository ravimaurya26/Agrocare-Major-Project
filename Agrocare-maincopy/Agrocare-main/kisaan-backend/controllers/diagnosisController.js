const client = require("../config/openrouter");

exports.diagnose = async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const completion = await client.chat.completions.create({
      model: "thinkingmachines/inkling-small:free",

      messages: [
        {
          role: "system",
          content: `
You are an expert agricultural scientist.

Analyze the uploaded crop leaf.

Return ONLY valid JSON in this format:

{
  "diagnosis":"",
  "confidenceScore":"",
  "severity":"",
  "treatment":{
      "immediate":[],
      "preventive":[]
  }
}

Do not return markdown.
Do not return explanation outside JSON.
`
        },

        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyze this crop leaf."
            },
            {
              type: "image_url",
              image_url: {
                url: image
              }
            }
          ]
        }
      ]
    });

    const reply = completion.choices[0].message.content;

    // Some models wrap JSON in markdown fences or add stray text.
    // Strip fences and trim before parsing, and fail gracefully if it's still not valid JSON.
    let cleaned = reply.trim();
    cleaned = cleaned.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```$/i, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (parseErr) {
      console.log("Failed to parse model reply as JSON. Raw reply:", reply);
      return res.status(502).json({
        success: false,
        message: "AI did not return valid JSON. Please try again.",
      });
    }

    res.json({
      success: true,
      result: parsed
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message
    });

  }
};