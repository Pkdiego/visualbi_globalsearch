# Smart Search Visual – Power BI

Campo de busca universal com sugestões categorizadas por campo.

---

## Como funciona

1. O usuário arrasta qualquer campo para o visual
2. Ao digitar no input, aparecem sugestões agrupadas por campo:
   ```
   N° ORDEM
     → 1102
     → 11025
   
   N° TRANSAÇÃO
     → 1102-A
     → 11022
   ```
3. Ao clicar em uma sugestão, o relatório inteiro é filtrado

---

## Instalação (Pré-requisitos)

```bash
node -v   # precisa ser >= 14
npm -v    # precisa ser >= 6
```

### 1. Instalar o Power BI Visuals Tools

```bash
npm install -g powerbi-visuals-tools
pbiviz --version   # deve retornar 5.x
```

### 2. Instalar dependências do projeto

```bash
cd smart-search-visual
npm install
```

### 3. Modo desenvolvimento (hot reload)

```bash
pbiviz start
```

Acesse o Power BI Desktop ou Service, vá em **Formato → Visuais → Desenvolver um visual** e ative o visual de desenvolvedor.

### 4. Gerar o arquivo .pbiviz para produção

```bash
pbiviz package
```

O arquivo `SmartSearchVisual.1.0.0.pbiviz` será gerado na pasta `dist/`.

### 5. Importar no Power BI

- No Power BI Desktop, clique em `...` no painel de Visualizações
- **Importar um visual do arquivo**
- Selecione o `.pbiviz` gerado

---

## Como usar no relatório

1. Adicione o visual Smart Search ao relatório
2. **Arraste os campos desejados** para o bucket **"Campos de Busca"**
   - Exemplo: N° Ordem, N° Transação, Nome Cliente, N° Título, Navio
3. O placeholder do input mostra quais campos estão ativos
4. Digite qualquer valor → sugestões aparecem agrupadas por campo
5. Clique na sugestão para filtrar o relatório inteiro

---

## Campos recomendados para arrastar (SICOF 2026)

| Campo | Tabela |
|---|---|
| N° Ordem | ALOCAÇÕES DE RECEITAS |
| N° Transação | ALOCAÇÕES DE RECEITAS |
| Nome Cliente | ALOCAÇÕES DE RECEITAS |
| N° Título | ALOCAÇÕES DE RECEITAS |
| Navio | ALOCAÇÕES DE RECEITAS |
| Invoice | ALOCAÇÕES DE RECEITAS |
| N° Trabalho | ALOCAÇÕES DE RECEITAS |

---

## Personalização (Painel de Formatação)

- **Cor Primária**: cor do header e labels (padrão: vermelho escuro `#8a0000`)
- **Cor de Fundo**: fundo do input
- **Cor do Texto**: texto do input
- **Placeholder**: texto de ajuda customizado
- **Máx. Sugestões por Campo**: limite de itens por grupo (padrão: 5)

---

## Estrutura do Projeto

```
smart-search-visual/
├── src/
│   └── visual.ts        ← Lógica principal
├── style/
│   └── visual.less      ← Estilos
├── capabilities.json    ← Data roles e filtros
├── pbiviz.json          ← Metadados do visual
├── package.json
├── tsconfig.json
└── README.md
```
