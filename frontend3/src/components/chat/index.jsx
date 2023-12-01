import React, { useEffect } from 'react';

const FlowiseChatbot = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js';
    script.async = true;

    document.body.appendChild(script);

    script.onload = () => {
      window.Chatbot.init({
        chatflowid: 'c910918d-daa3-46d2-9c60-df0906a7f18c',
        apiHost: 'https://marcosamaral-chatbot.hf.space',
        chatflowConfig: {
          // topK: 2
        },
        theme: {
          button: {
            backgroundColor: '#3B81F6',
            right: 20,
            bottom: 20,
            size: 'medium',
            iconColor: 'white',
            customIconSrc:
              'https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/google-messages.svg',
          },
          chatWindow: {
            welcomeMessage: 'Hello! This is a custom welcome message',
            backgroundColor: '#ffffff',
            height: 700,
            width: 400,
            fontSize: 16,
            poweredByTextColor: '#303235',
            botMessage: {
              backgroundColor: '#f7f8ff',
              textColor: '#303235',
              showAvatar: true,
              avatarSrc:
                'https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/parroticon.png',
            },
            userMessage: {
              backgroundColor: '#3B81F6',
              textColor: '#ffffff',
              showAvatar: true,
              avatarSrc:
                'https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/usericon.png',
            },
            textInput: {
              placeholder: 'Type your question',
              backgroundColor: '#ffffff',
              textColor: '#303235',
              sendButtonColor: '#3B81F6',
            },
          },
        },
      });
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default FlowiseChatbot;
