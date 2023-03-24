let msg="";
let results = []
async function generateResponse(prompt) {
  // const apiKey = 'OPEN-AI-KEY'; in chatgpt_config.js
  const url = 'https://api.openai.com/v1/completions';
  var contextQuery = document.getElementById("context").checked;
  	if (contextQuery) {
		if (msg) {
			msg = "Here are our previous conversation between me and you, try your best " + 
					"to respond in this same context and you don't need to respond to this statement, " + 
					"but the last apostrophe enclosed statement like `this`. Your response should not include any prefix signifying you are speaking or else like 'CHATGPT : ' etc.\n\nPrevious Conversations\n";
			//  + msg + "\n\n\n`"+prompt+"`";
			for (let index = 0; index < results.length; index++) {
				const element = results[index];
				if (index % 2 === 0) {
					msg += "Me : "+ element.trim() + "\n\n";
				}
				else{
					msg += "ChatGPT : " + element.trim() + "\n";
				}
			}

			msg += "\n\n\nNew Conversations: `" + prompt.trim() + "`\n";
		}
		else{
			msg = prompt;
		}
	}
	else{
		msg = prompt;
		results = [];
	}
  results.push(prompt);
  

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'text-davinci-003', // or any other model that you want to use
      prompt: msg,
      max_tokens: 1024, // You can set various options like temperature, frequency_penalty, presence_penalty
        temperature: 0.7,
    }),
  };


  const response = await fetch(url, options);
  const data = await response.json();
  results.push(data.choices[0].text);
  if (contextQuery) {
  	var displayOut = "";
  	for (let index = 0; index < results.length; index++) {
  		const element = results[index];
  		if (index % 2 === 0) {
  			displayOut = "Me : "+ element.trim() + "\n\n" + displayOut;
  		}
  		else{
  			displayOut = "ChatGPT : " + element.trim() + "\n" + displayOut;
  		}
  	}
  	return "\n" + displayOut.trim();
  }
  else{
	 return "\n" + data.choices[0].text;
  }
  
}

function toggleLayout() {
	var box = document.querySelector("#response pre");
	if (box.style.whiteSpace === "pre"){
		box.style.whiteSpace = "break-spaces";
	}
	else{
		box.style.whiteSpace = "pre";
	}
}
