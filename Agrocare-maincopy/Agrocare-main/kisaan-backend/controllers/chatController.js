const client = require("../config/openrouter");

exports.chat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const completion = await client.chat.completions.create({
      model: "openrouter/free",

      messages: [
        {
          role: "system",
          content: `You are Krishi Sahayak AI of Kisaan AgroCare.

You are an agriculture expert.

Answer only agriculture-related questions.

Give simple, practical, farmer-friendly advice.

If user asks unrelated questions politely refuse.`,
        },

        {
          role: "user",
          content: message,
        },
      ],
    });

    res.json({
      success: true,
      reply: completion.choices[0].message.content,
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};