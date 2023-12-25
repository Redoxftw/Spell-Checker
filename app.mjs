import express from "express"
import dotenv from 'dotenv'

const app = express()
app.use(express.json());
dotenv.config();

const port = 3000;
const OPENAPIKEY = process.env.OPENAPIKEY;


app.listen(port, (error) => {
    if (error) {
        console.log(error)
    }

    app.use(express.static("public"))
})

app.get("/health", (req, res) => {
    res.status(200).send("Server Health Ok")
})

const callToApi = async (data) => {
    try {
        console.log(`Breakpoint 26ln ${data}`)
        const response = await fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAPIKEY}`,
            },
            body: JSON.stringify({
                prompt: `Correct the spelling and grammar in the following text: ${data}. In output just give me the corrected text without changing the meaning of it`,
                max_tokens: 150,
            }),
        })

        if (response.ok) {
            const data = await response.json();
            const correctedText = data.choices[0].text.replace(/^\n\n/, '');
            // Display the corrected text in the textarea-output
            console.log(correctedText)
            return correctedText;
        } else {
            console.error('Error:', response.status, response.statusText);
        }
    } catch (error) {
        console.log(error);
    }
}
app.post('/checkforspell', async (req, res) => {
    try {
        const data = await req.body.text
        const gptResponse = await callToApi(data)
        res.status(200).json({ text: gptResponse }).end();
    }
    catch (e) {
        console.log(e)
    }
}
)