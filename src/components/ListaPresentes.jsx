import { useState, useEffect } from 'react';

export default function Home() {
  const [presentes, setPresentes] = useState([]);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [editId, setEditId] = useState(null);

  // Carregar a lista de presentes do localStorage
  useEffect(() => {
    const storedPresentes = JSON.parse(localStorage.getItem('presentes'));
    if (storedPresentes) setPresentes(storedPresentes);
  }, []);

  // Atualizar o localStorage sempre que a lista de presentes mudar
  useEffect(() => {
    localStorage.setItem('presentes', JSON.stringify(presentes));
  }, [presentes]);

  // Adicionar um novo presente
  const handleAdd = () => {
    if (nome && descricao) {
      const novoPresente = { id: Date.now(), nome, descricao };
      setPresentes([...presentes, novoPresente]);
      setNome('');
      setDescricao('');
    }
  };

  // Editar um presente existente
  const handleEdit = (id) => {
    const presente = presentes.find((p) => p.id === id);
    setNome(presente.nome);
    setDescricao(presente.descricao);
    setEditId(id);
  };

  // Salvar edição
  const handleSave = () => {
    const updatedPresentes = presentes.map((p) =>
      p.id === editId ? { ...p, nome, descricao } : p
    );
    setPresentes(updatedPresentes);
    setNome('');
    setDescricao('');
    setEditId(null);
  };

  // Remover um presente
  const handleDelete = (id) => {
    setPresentes(presentes.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">Lista de Presentes</h1>
        
        <div className="mb-4">
          <input
            type="text"
            placeholder="Nome do Presente"
            className="w-full p-2 border rounded mb-2"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            type="text"
            placeholder="Descrição do Presente"
            className="w-full p-2 border rounded mb-2"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
          {editId ? (
            <button
              className="w-full bg-blue-500 text-white p-2 rounded"
              onClick={handleSave}
            >
              Salvar Alterações
            </button>
          ) : (
            <button
              className="w-full bg-green-500 text-white p-2 rounded"
              onClick={handleAdd}
            >
              Adicionar Presente
            </button>
          )}
        </div>

        <ul className="divide-y divide-gray-200">
          {presentes.map((presente) => (
            <li key={presente.id} className="p-4 flex justify-between items-center">
              <div>
                <p className="font-semibold">{presente.nome}</p>
                <p className="text-sm text-gray-600">{presente.descricao}</p>
              </div>
              <div>
                <button
                  className="text-blue-500 hover:text-blue-700 mr-2"
                  onClick={() => handleEdit(presente.id)}
                >
                  Editar
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(presente.id)}
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
