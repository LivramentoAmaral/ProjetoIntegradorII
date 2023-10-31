import React, { useState, useEffect } from 'react';
import api from './index';

function TestApiConnection() {
  const [apiStatus, setApiStatus] = useState(''); // Estado para armazenar o status da API

  useEffect(() => {
    // Função para testar a conexão com a API
    const testApiConnection = async () => {
      try {
        // Faz uma solicitação GET de teste para a API
        const response = await api.get('/users');
        console.log(response.status)// Substitua '/test' pela rota de teste real da sua API

        if (response.status === 201) {
          setApiStatus('Conexão com a API bem-sucedida!');
        } else {
          setApiStatus('Erro ao conectar à API');
        }
      } catch (error) {
        setApiStatus('Erro ao conectar à API');
      }
    };

    testApiConnection();
  }, []);

  return (
    <div>
      <h1>Teste de Conexão com a API</h1>
      <p>Status da API: {apiStatus}</p>
    </div>
  );
}

export default TestApiConnection;
