# Ideias para features futuras

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
