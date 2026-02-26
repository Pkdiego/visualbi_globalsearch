# Ideias para features futuras

---

## Busca multi-token com `;`

**Ideia:** permitir que o usuário digite múltiplos termos separados por `;` para cruzar campos em cascata de uma vez.

**Exemplo:** digitar `produto;2024` buscaria `produto` em um campo e `2024` em outro, mostrando sugestões que satisfaçam ambos simultaneamente.

**Comportamento esperado:**
- Detectar `;` no input e dividir em tokens
- Cada token anterior vira um filtro cascata temporário
- As sugestões exibidas são do último token, já filtradas pelos anteriores
- Ao selecionar uma sugestão, aplica o filtro e avança para o próximo token (ou limpa o input)

**Viabilidade:** alta — a lógica de cascata já existe, seria adaptação da busca atual.

**Pendente definir:**
- UX de feedback visual quando está no modo multi-token
- O que acontece ao selecionar uma sugestão (limpa tudo? mantém tokens anteriores?)
- Caractere separador configurável ou fixo em `;`

---

## Mostrar valores ao focar (sem digitar)

**Ideia:** ao clicar no campo de busca sem digitar nada, exibir o dropdown com todos os valores únicos de todos os campos conectados, organizados por grupo — como um select nativo.

**Comportamento esperado:**
- Input recebe foco → dropdown abre imediatamente
- Exibe todos os valores agrupados por campo (respeitando `maxResults` por grupo)
- Ao digitar, comportamento atual é mantido (filtra sugestões pelo termo)

**Viabilidade:** alta — é uma extensão direta do `renderSuggestions()` com query vazia tratada como "mostrar tudo".

**Pendente definir:**
- Limite máximo de itens exibidos no modo "sem query" para não sobrecarregar a UI em datasets grandes
- Se deve respeitar o mesmo `maxResults` do Format Pane ou ter um limite separado

---

## Ícones de tipo de campo nas sugestões (Aa / 123 / 📅)

**Ideia:** exibir um ícone discreto antes de cada sugestão indicando o tipo da coluna de origem (texto, numérico ou data).

**Status:** o `fieldType` já é detectado e armazenado em `FieldData` e `Suggestion`, mas nunca é renderizado na UI.

**Comportamento esperado:**
- `text` → ícone `Aa`
- `numeric` → ícone `123`
- `date` → ícone de calendário (SVG inline)

**Viabilidade:** alta — dado já existe, só falta o HTML no `renderSuggestions()`.

**Pendente definir:**
- Datas são difíceis de identificar de forma confiável pelo tipo da coluna no Power BI (o campo `col.type.dateTime` nem sempre é preenchido corretamente); requer testes com diferentes tipos de fonte de dados antes de publicar

---

## Ordenação por frequência (mais comuns primeiro)

**Ideia:** em vez de ordenar sugestões alfabeticamente, ordenar pelos valores que aparecem com mais frequência nas `rawRows`.

**Comportamento esperado:**
- Contar ocorrências de cada valor na tabela achatada
- Exibir sugestões ordenadas do mais frequente para o menos frequente
- Opcional: manter ordenação alfabética como fallback configurável

**Viabilidade:** média — requer mudança na lógica de `renderSuggestions()` e potencial impacto em performance para datasets grandes.

**Pendente definir:**
- Toggle no Format Pane: "Ordenar por frequência / Alfabético"
- Como exibir a contagem de frequência ao lado da sugestão (ou não exibir)
