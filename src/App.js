import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import "./styles.css";

import api from "./services/api";

function App() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});

  async function handleSearch() {
    if (input === "") {
      alert("Preencha algum cep!");
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
    } catch {
      alert("Erro ao buscar cep!");
      setInput("");
    }
  }
  return (
    <div className="container">
      <h1 className="title">Consultar CEP</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite seu cep..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#fff" />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>
          <span>{cep.logradouro}</span>
          {cep.complemento ? (
            <span>Complemento: {cep.complemento}</span>
          ) : (
            <span>Complemento não informado</span>
          )}
          {cep.bairro ? (
            <span>Bairro: {cep.bairro}</span>
          ) : (
            <span>Bairro não informado</span>
          )}
          <span>
            {cep.localidade} - {cep.uf}
          </span>
          <span>IBGE: {cep.ibge}</span>
          <span>DDD: +{cep.ddd}</span>
        </main>
      )}
    </div>
  );
}

export default App;
