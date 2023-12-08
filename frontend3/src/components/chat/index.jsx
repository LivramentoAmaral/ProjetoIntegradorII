import React, { useEffect } from 'react';
import api from '../../api'; // Importe o axios ou a biblioteca que você usa para fazer requisições HTTP

const FlowiseChatbot = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/products'); // Substitua pela rota correta da sua API de produtos
        const productsFromAPI = response.data;

        // Mapeando os dados da API para o formato esperado pelo chatbot
        const products = productsFromAPI.map((product) => ({
          id: product._id,
          productName: product.productName,
          productDescription: product.productDescription,
          // Adicione outros campos necessários para o chatbot conforme necessário
        }));

        console.log('Produtos:', products);

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
              products: products,
            },
            theme: {
              // Configurações de tema do chatbot
              button: {
                backgroundColor: '#3B81F6',
                right: 20,
                bottom: 20,
                size: 'medium',
                iconColor: 'white',
                customIconSrc: 'https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/google-messages.svg',
              },
              chatWindow: {
                welcomeMessage: 'Olá seija bem-vindo chatbot aq vc pode pedir informações sobre a plataforma e de desrições simples ?',
                backgroundColor: '#ffffff',
                height: 600,
                width: 400,
                fontSize: 16,
                poweredByTextColor: '#303235',
                botMessage: {
                  backgroundColor: '#f7f8ff',
                  textColor: '#303235',
                  showAvatar: true,
                  avatarSrc: 'https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/parroticon.png',
                },
                userMessage: {
                  backgroundColor: '#3B81F6',
                  textColor: '#ffffff',
                  showAvatar: true,
                  avatarSrc: 'https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/usericon.png',
                },
                textInput: {
                  placeholder: 'Deixe seu questionamento aqui...',
                  backgroundColor: '#ffffff',
                  textColor: '#303235',
                  sendButtonColor: '#3B81F6',
                },
              },
            },
            // Outras configurações do chatbot
            // ...
          });
        };
      } catch (error) {
        console.error('Erro ao buscar informações dos produtos:', error);
      }
    };

    fetchData();
  }, []);

  return null;
};

export default FlowiseChatbot;
