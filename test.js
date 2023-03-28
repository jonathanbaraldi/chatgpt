

// export OPENAI_SECRET_KEY='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'

const got = require('got');

// This is just an example, but could be something you keep track of
// in your application to provide OpenAI as prompt text.
const chatLog = 'Human: Hello, who are you?\nAI: I am doing great. How can I help you today?\n';

// The new question asked by the user.
const question = 'Could you tell me what your favorite German thrash metal album is?';

(async () => {
  const url = 'https://api.openai.com/v1/engines/davinci/completions';
  const prompt = `${chatLog}Human: ${question}`;
  const params = {
    'prompt': prompt,
    'max_tokens': 150,
    'temperature': 0.9,
    'frequency_penalty': 0,
    'presence_penalty': 0.6,
    'stop': '\nHuman'
  };
  const headers = {
    'Authorization': `Bearer ${process.env.OPENAI_SECRET_KEY}`,
  };

  try {
    const response = await got.post(url, { json: params, headers: headers }).json();
    output = `${prompt}${response.choices[0].text}`;
    console.log(output);
  } catch (err) {
    console.log(err);
  }
})();