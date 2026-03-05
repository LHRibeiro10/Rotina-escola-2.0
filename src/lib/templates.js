
export const ES_TEMPLATES = {
  series: {
    '1': [
      { title: 'Ler 5–10 minutos', estimate: 10, icon: '📖' },
      { title: 'Copiar 3 palavras no caderno', estimate: 8, icon: '✍️' },
      { title: 'Números de 1 a 20', estimate: 10, icon: '🔢' },
      { title: 'Organizar mochila', estimate: 5, icon: '🎒' }
    ],
    '2': [
      { title: 'Leitura 10–15 minutos', estimate: 12, icon: '📖' },
      { title: 'Adição/Subtração', estimate: 15, icon: '➕' },
      { title: 'Frase curta', estimate: 8, icon: '📝' },
      { title: 'Calendário (dias da semana)', estimate: 6, icon: '📅' }
    ],
    '3': [
      { title: 'Ler um capítulo curto', estimate: 15, icon: '📘' },
      { title: 'Multiplicação simples', estimate: 15, icon: '✖️' },
      { title: 'Treino ortográfico', estimate: 10, icon: '🔤' },
      { title: 'Pesquisa na Biblioteca+', estimate: 12, icon: '🔎' }
    ],
    '4': [
      { title: 'Resumo (3–4 linhas)', estimate: 15, icon: '🧾' },
      { title: 'Exercícios de matemática', estimate: 20, icon: '📐' },
      { title: 'Leitura guiada', estimate: 15, icon: '📗' },
      { title: 'Projeto semanal', estimate: 25, icon: '🔬' }
    ],
    '5': [
      { title: 'Ler 15–20 minutos', estimate: 18, icon: '📖' },
      { title: 'Problemas de matemática', estimate: 20, icon: '➗' },
      { title: 'Atividade de português', estimate: 15, icon: '✍️' },
      { title: 'Revisão de prova (quando houver)', estimate: 15, icon: '📎' }
    ]
  },
  biblioteca: [
    { id: 'bib1', serie: '1-3', materia: 'Leitura', titulo: 'Livrinho — A Casa Sonolenta', tipo: 'pdf', url: '/pdfs/Livrinho-A-Casa-Sonolenta-1.pdf' },
    { id: 'bib2', serie: '1-3', materia: 'Leitura', titulo: 'Livrinho — A Borboleta Azul', tipo: 'pdf', url: '/pdfs/BORBOLETA-AZUL.pdf' },
    { id: 'bib3', serie: '1-3', materia: 'Leitura', titulo: 'Livrinho — O Ratinho Roí Roí', tipo: 'pdf', url: '/pdfs/O-RATINHO-ROI-ROI.pdf' }
  ],
  agenda: [
    { data: '2026-03-05', tipo: 'Prova', titulo: 'Prova de Matemática', cor: '#F59E0B' },
    { data: '2026-03-12', tipo: 'Evento', titulo: 'Feira de Ciências', cor: '#3B82F6' },
    { data: '2026-03-20', tipo: 'Comunicado', titulo: 'Reunião de Pais', cor: '#A855F7' }
  ]
}
