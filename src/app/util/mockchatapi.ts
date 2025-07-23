import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios, { delayResponse: 500 }); 

mock.onPost("/mock-gpt-endpoint").reply((config) => {
  const data = JSON.parse(config.data);
  const lastMessage = data.messages[data.messages.length - 1]?.content || "";
  return [200, { message: `Echo: ${lastMessage}` }];
});
