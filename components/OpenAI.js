const { Configuration, OpenAIApi } = require("openai");


const configuration = new Configuration({
  apiKey: process.env.OPEN_API_KEY,
});
const openai = new OpenAIApi(configuration);

const apiCall = async () => {

    const response = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: "Create a list of 8 questions for my interview with a science fiction author:",
    temperature: 0.5,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    });

    console.log(SOME_KEY)
    console.log(response.data.choices[0].text)
}

apiCall()