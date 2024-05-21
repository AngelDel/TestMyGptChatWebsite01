const headers = {
    'Authorization': `Bearer ${OPENAI_API_KEY}`
};

const form = document.getElementById('chat-form');
const mytextInput = document.getElementById('mytext');
const responseTextarea = document.getElementById('response');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const mytext = mytextInput.value.trim();

    if (mytext) {
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                },
                body: JSON.stringify({
                    model: 'gpt-4',
                    messages: [{ role: 'user', content: mytext }],
                    temperature: 1.0,
                    top_p: 0.7,
                    n: 1,
                    stream: false,
                    presence_penalty: 0,
                    frequency_penalty: 0,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                responseTextarea.value = data.choices[0].message.content;
            } else {
                responseTextarea.value = 'Error: Unable to process your request 1.';
            }
        } catch (error) {
            responseTextarea.value = '';

            console.error(error);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);

                responseTextarea.value = 'Response data:' + error.response.data;
                responseTextarea.value += 'Response status:' + error.response.status;
                responseTextarea.value += 'Response headers:' + error.response.headers;
            } else {
                console.error('Error:', error.message);
            }
            responseTextarea.value += 'Error: Unable to process your request.';
        }
    }
});
