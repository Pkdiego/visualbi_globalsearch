# Global Search — Power BI Custom Visual

**Pesquisa universal em múltiplos campos com filtragem em cascata, tags agrupadas e sugestões inteligentes.**

---

## O que é

Global Search é um visual de campo de busca para Power BI que permite ao usuário pesquisar e filtrar dados em vários campos simultaneamente, com sugestões em tempo real, filtragem em cascata e tags visuais para cada filtro ativo.

---

## Funcionalidades

### Busca em múltiplos campos
Arraste quantos campos quiser para o visual. A busca varre todos de uma vez e retorna sugestões agrupadas por campo, indicando de qual coluna cada resultado vem.

### Sugestões em tempo real
Enquanto o usuário digita, sugestões aparecem imediatamente com o trecho digitado destacado em negrito/cor. Um indicador animado ("...") aparece durante o processamento.

### Ícone por tipo de dado
Cada sugestão exibe um ícone indicando o tipo de dado da coluna:
- **Aa** — Texto
- **123** — Numérico
- **Calendário** — Data

### Contador de resultados
O cabeçalho de cada grupo mostra quantos resultados estão sendo exibidos e o total disponível (ex: `3 de 47`), deixando claro quando há mais resultados do que o limite configurado.

### Filtragem em cascata
As sugestões são automaticamente filtradas com base nos filtros já aplicados. Se você filtra por "São Paulo", os campos de "Produto" e "Vendedor" passam a mostrar apenas os valores que existem dentro desse contexto.

### Seleção múltipla com Ctrl+Click
Mantenha o **Ctrl** pressionado ao clicar em uma sugestão para adicionar múltiplos valores ao mesmo tempo sem fechar o dropdown. O visual permanece aberto para seleção contínua.

### Tags de filtro agrupadas
Cada filtro ativo aparece como uma tag abaixo do campo de busca:
- **1 valor** → tag simples com o valor e um × para remover
- **2+ valores do mesmo campo** → tag agrupada `Campo (N)` com × para remover todos; clique na tag para abrir um popup listando cada valor individualmente com remoção unitária

### Remoção de filtros
- × em cada tag remove aquele filtro individualmente
- Botão × no canto do campo de busca limpa todos os filtros de uma vez
- **Esc** fecha o dropdown se estiver aberto; segundo **Esc** (com dropdown fechado) limpa todos os filtros

### Placeholder dinâmico
Com mais de um campo conectado, o placeholder rotaciona entre os nomes dos campos a cada 2,5 segundos, indicando o que pode ser pesquisado.

---

## Personalização via Format Pane

### Aparência
- **Tema**: Black & White, Red, Blue, Mustard, Green
- **Idioma**: Automático (sistema), Português (BR), Español, English

### Caixa de Pesquisa
- Placeholder personalizado
- Tamanho e família da fonte
- Cor de borda, borda em foco, fundo e texto
- Raio da borda e altura

### Ícone de Pesquisa
- Mostrar/ocultar ícone
- Cor, tamanho do ícone e do botão limpar

### Sugestões (Dropdown)
- Cores: cabeçalho, texto do cabeçalho, rótulo de grupo, hover, destaque de match
- Número máximo de resultados por campo (1–50)
- Altura máxima do dropdown
- Fonte dos itens (tamanho e família)
- Fonte do rótulo de grupo e do cabeçalho
- Altura do cabeçalho

### Tags de Filtro
- Cor de fundo e cor do texto das tags
- Tamanho da fonte
- Opção de mostrar ou ocultar o nome do campo na tag

---

## Idiomas suportados

| Código | Idioma |
|--------|--------|
| `auto` | Detecta automaticamente o idioma do Power BI |
| `pt`   | Português (BR) |
| `es`   | Español |
| `en`   | English |

Todos os textos do visual e do Format Pane são traduzidos de acordo com o idioma selecionado.

---

## Capacidade de dados

- Suporta até **30.000 linhas** por atualização
- Suporta até **10 filtros simultâneos** em colunas diferentes
- Campos podem ser de qualquer tipo: texto, número ou data

---

## Requisitos

- Power BI Desktop 2.150 ou superior
- API 5.9.0

---

*Global Search — desenvolvido por Diego Dias*

[🌐 www.newlevel.com.br](https://www.newlevel.com.br)
