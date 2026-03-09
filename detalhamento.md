# Global Search para Power BI - Detalhamento Tecnico

> Artigo para blog tecnico. Publico: desenvolvedores, analistas e arquitetos de dados que trabalham com Power BI.

---

## Resumo executivo

O Global Search resolve uma lacuna objetiva do Power BI: a ausencia de busca transversal no canvas entre colunas de tabelas diferentes.
Em vez de forcar o usuario a adivinhar em qual slicer esta o valor desejado, o visual oferece um unico ponto de entrada para pesquisa, selecao e aplicacao de filtros no modelo.

---

## O problema real: busca transversal em modelos dimensionais

Relatorios Power BI crescem em complexidade proporcional ao amadurecimento do modelo de dados. Um modelo estrela bem projetado pode facilmente ter 15, 20 ou mais dimensoes relevantes para o usuario final: clientes, produtos, regioes, categorias, status, representantes, centros de custo, referencias internas e SKUs.

O problema nao e o modelo. O problema e que o Power BI nao oferece, nativamente, um mecanismo de busca transversal entre colunas de tabelas distintas no canvas do relatorio. O usuario precisa conhecer a estrutura do modelo para saber onde procurar um dado especifico.

### O que existe nativamente

O Power BI oferece o campo de busca interno do painel de filtros, mas ele opera dentro de um unico campo por vez e nao e exposto como elemento de UI no canvas. O slicer nativo tem busca textual, mas continua restrito a uma unica coluna.

### As gambiarras mais comuns e seus custos reais

**1. Pilha de slicers com busca individual**
Um slicer por coluna relevante, todos com busca habilitada. Funciona para poucos campos. Depois disso, ocupa espaco excessivo no canvas, exige conhecimento da estrutura e nao entrega experiencia unificada.

**2. Field Parameters + DAX + Bookmarks**
Fluxo comum:
- Criar Field Parameter com colunas pesquisaveis
- Criar medidas DAX de filtragem dinamica
- Adicionar slicer para escolher o campo
- Adicionar segundo slicer para o valor
- Amarrar tudo com bookmarks e botoes

Resultado tipico: implementacao fragil, manutencao cara e UX limitada, porque o usuario ainda precisa escolher o campo antes de digitar.

**3. Unpivot no Power Query**
Unificar colunas em estrutura atributo-valor para pesquisar em uma coluna unica.

Custo estrutural: desnormalizacao, explosao de linhas (N colunas x M linhas), impacto em relacionamentos e risco de quebrar medidas dependentes da granularidade original.

**4. Q&A Visual**
A abordagem de linguagem natural depende de sinonimos, treinamento e qualidade semantica. Em cenarios corporativos com governanca forte, o comportamento pode nao ser suficientemente previsivel para busca operacional de alto volume.

---

## O que o Global Search faz de diferente

O Global Search resolve busca transversal sem alterar o modelo de dados e sem exigir DAX adicional para o fluxo principal.

### Arquitetura de filtros

O visual recebe ate 25 colunas por meio de um unico data role (`searchFields`, tipo `Grouping`). Em cada ciclo de `update()`, ele le `dataView.table.rows` e indexa valores unicos por coluna.

A aplicacao de filtro usa `IVisualHost.applyJsonFilter` com `BasicFilter` e operador `In`, um filtro por coluna ativa. Na pratica, os filtros se propagam como filtros nativos do Power BI, respeitando relacionamentos e RLS.

### Resiliencia a renomeacao de tabela

Quando o binding acontece, `queryName` pode ficar congelado. Se a tabela for renomeada no modelo, o filtro pode deixar de funcionar.

A estrategia adotada usa `col.expr` como fonte primaria para montar o target de filtro:

```ts
const expr = (col as any).expr;
const tableName = expr?.source?.entity || col.queryName?.split('.')[0];
const columnName = expr?.ref || col.queryName?.split('.')[1];
```

A cada `update()`, o visual reconcilia os campos ativos com os filtros aplicados e reaplica targets quando identifica renomeacao.

### Modos de busca

| Modo | Comportamento |
| --- | --- |
| Contains | Correspondencia em qualquer posicao do texto (padrao) |
| Starts With | Correspondencia no inicio do valor |
| Equals | Correspondencia exata |

Configuracoes adicionais:
- **Ignore Accents**: normaliza caracteres Unicode (`e` ~= `e` com acento)
- **Case Sensitive**: diferencia maiusculas e minusculas

### Sugestoes agrupadas por campo

O dropdown apresenta resultados por coluna de origem, com cabecalho de grupo e contador `X de Y`. Cada grupo pode aplicar `Selecionar todos`, acelerando filtros em massa por dominio.

### Filtros ativos como tags

Filtros aplicados aparecem como tags removiveis abaixo do campo de busca. Opcionalmente, cada tag mostra o campo de origem (`showFieldName`) para dar contexto ao usuario.

---

## Usabilidade e experiencia do usuario

### Fluxo de uso recomendado

1. Usuario digita um termo no campo unico de busca.
2. Visual retorna sugestoes agrupadas por campo.
3. Usuario seleciona um ou mais valores.
4. Tags de filtros aparecem imediatamente.
5. Todos os visuais da pagina reagem ao filtro aplicado.

### Beneficios de UX

- Reduz curva de aprendizado para usuarios nao tecnicos
- Diminui o tempo para localizar registros especificos
- Evita erro operacional de procurar no slicer errado
- Mantem consistencia visual com um padrao unico de busca

### Acessibilidade

- Navegacao por teclado (`Tab`, `Enter`, `Escape`)
- Uso de ARIA (`role`, `aria-label`, `aria-expanded`, `aria-selected`, `aria-live`)
- Contraste configuravel via Format Pane
- Labels localizados por idioma

---

## Internacionalizacao

Idiomas suportados: Portugues (BR), Ingles e Espanhol. A deteccao pode ser automatica via `navigator.language` com override manual no Format Pane. Strings de interface ficam externalizadas, evitando texto hardcoded no render.

---

## Performance e escala

- Processamento no cliente, sem chamadas externas
- Indexacao no `update()` e filtragem sincronica para resposta rapida
- Opcao `Show Metrics` para diagnostico de tempo e volume indexado
- `dataReductionAlgorithm` configurado para ate 50.000 linhas por query

### Limites praticos recomendados

- Priorizar colunas de alta relevancia de negocio
- Evitar colunas com cardinalidade extrema quando nao agregam valor de busca
- Ajustar `maxResults` para equilibrar UX e legibilidade

---

## Personalizacao via Format Pane

### Search Box

Cor de fundo, cor de texto, borda (padrao e foco), tamanho/familia de fonte, border radius, altura, icone de busca (cor/tamanho/visibilidade) e botao de limpar.

### Suggestions Dropdown

Cor e tamanho da fonte dos itens, cor do cabecalho, cor de hover, cor de highlight, altura maxima do dropdown, maximo de resultados por campo e fonte dos labels de grupo.

### Filter Tags

Cor de fundo, cor de texto, tamanho de fonte e exibicao do nome do campo.

### Temas pre-definidos

Black & White, Red, Blue, Mustard e Green. Cada tema aplica conjunto coerente de tokens e pode ser refinado depois.

---

## Comparativo com alternativas

| Recurso | Global Search | Slicer Nativo | Smart Filter Pro (OKViz) | Advanced Slicer (xViz) | Q&A Visual |
| --- | :---: | :---: | :---: | :---: | :---: |
| Busca em multiplos campos simultaneos | Sim (ate 25) | Nao | Nao (1 por instancia) | Nao (1 por instancia) | Parcial |
| Sugestoes agrupadas por campo | Sim | Nao | Nao | Nao | Nao |
| Selecionar todos por grupo | Sim | Nao | Nao | Nao | Nao |
| Filtros ativos visiveis como tags | Sim | Nao | Sim | Sim | Nao |
| Modos de busca configuraveis | Sim (3 modos) | Nao | Parcial | Parcial | Nao |
| Normalizacao de acentos | Sim | Nao | Nao | Nao | Nao |
| Acessibilidade ARIA + teclado | Completa | Parcial | Parcial | Parcial | Parcial |
| Internacionalizacao (PT/EN/ES) | Sim | Nao | Nao | Nao | Nao |
| Personalizacao granular via Format Pane | Alta | Baixa | Media | Media | Baixa |
| Temas pre-definidos | Sim (5) | Nao | Nao | Nao | Nao |
| Metricas de performance (diagnostico) | Sim | Nao | Nao | Nao | Nao |
| Sem coleta de dados | Sim | N/A | Nao confirmado | Nao confirmado | N/A |
| Gratuito sem restricoes | Sim | Sim | Nao (pago) | Nao (pago) | N/A |

> Informacoes sobre visuais de terceiros baseadas em documentacao publica (AppSource e fornecedores). Sujeitas a mudancas conforme novas versoes.

---

## Governanca e seguranca

- Sem dependencia de API externa para o fluxo de busca
- Sem telemetria obrigatoria no fluxo principal
- Filtros aplicados por mecanismo nativo do host Power BI
- Comportamento aderente a politicas de acesso do modelo (incluindo RLS)

Para ambientes regulados, recomenda-se validar a versao publicada no AppSource e o respectivo pacote de privacidade do visual antes da distribuicao em producao.

---

## Boas praticas de implementacao

1. Selecione campos de negocio com alta probabilidade de consulta.
2. Evite incluir campos tecnicos pouco usados pelo usuario final.
3. Defina tema e contraste alinhados ao design system do relatorio.
4. Ajuste `maxResults` para nao poluir o dropdown.
5. Teste com usuarios reais (analista e executivo) antes de promover para producao.

---

## Roadmap tecnico

**Busca multi-token com `;`**
Permitir consultas como `produto;2026`, aplicando tokens em cascata no pipeline de filtragem.

**Dropdown ao focar sem digitar**
Exibir valores unicos agrupados mesmo com query vazia, com limite proprio.

**Icones de tipo de campo**
Renderizar indicadores de tipo (`Aa`, `123`, calendario), com ajuste adicional para deteccao robusta de datas.

**Ordenacao por frequencia**
Opcao para priorizar valores mais recorrentes em vez de ordem alfabetica.

---

## Conclusao

O Global Search nao substitui um modelo de dados bem projetado. Ele resolve uma lacuna especifica do Power BI: oferecer um ponto de entrada unico para localizar valores em diferentes campos sem exigir conhecimento estrutural do modelo.

Para times que buscam usabilidade, produtividade e menor custo de manutencao em experiencias de filtro, o ganho tende a ser imediato.

Disponivel no AppSource para uso imediato em relatorios Power BI.

---

## CTA sugerido para blog

Se este visual ajudou seu time a reduzir atrito de navegacao e busca no Power BI, deixe sua avaliacao no AppSource. Esse feedback orienta evolucao de produto e priorizacao de roadmap.
