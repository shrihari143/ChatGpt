const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const OpenAIApi = require('openai');

const openai = new OpenAIApi({
    organization: "org-2DIVwEbIxdnUQluCfVSnTEvi",
    apiKey: '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'
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post("/chat", async (req, res) => {
    const { prompt } = req.body;

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            prompt: prompt,
            max_tokens: 30,
            temperature: 0.7, 
        });

        if (completion.data.choices && completion.data.choices.length > 0) {
            const botResponse = completion.data.choices[0].text;
            res.send(botResponse);
        } else {
            throw new Error("Chatbot response is empty.");
        }
    } catch (error) {
        console.error("Chatbot request error:", error.message);
        res.status(500).send("Internal Server Error"); 
    }
});

const port = 7000;
app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
