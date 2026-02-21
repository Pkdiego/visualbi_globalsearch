# Global Search — Documentação para Usuários

## O que é

Visual de busca universal para Power BI. Permite pesquisar em múltiplos campos/colunas simultaneamente e aplicar filtros interativos no relatório.

---

## Limite de dados

- O visual carrega até **50.000 linhas** por padrão.
- Se o seu dataset tiver mais registros, um banner aparecerá automaticamente:
  > *"1.288 registros carregados — [Carregar mais]"*
- Clique em **"Carregar mais"** para acumular o próximo bloco de dados.
- **Recomendação:** para datasets grandes, mapeie uma tabela de dimensão com valores únicos em vez da tabela fato. O Power BI propaga o filtro automaticamente via relacionamentos.

---

## Modos de busca

| Modo | Comportamento |
|---|---|
| **Contém** (padrão) | Encontra o termo em qualquer posição do valor |
| **Começa com** | Filtra apenas valores que iniciam com o termo |
| **Igual a** | Correspondência exata |

Configurável no painel **Formatar → Configuração → Modo de busca**.

---

## Normalização

- **Ignorar acentos** — "cafe" encontra "café" *(ativado por padrão)*
- **Diferenciar maiúsculas** — "NF" não encontra "nf" *(desativado por padrão)*

---

## Métricas de diagnóstico

Visíveis por padrão no cabeçalho do dropdown. Podem ser ocultadas em **Formatar → Configuração → Mostrar Métricas**.

```
0.7ms · 1288L · 17R
```

| Indicador | Significado | Tooltip ao passar o mouse |
|---|---|---|
| `Xms` | Tempo de execução da última busca | "Tempo de execução da última busca" |
| `XL` | Total de linhas nos campos mapeados | "Total de linhas nos campos mapeados para busca" |
| `XR` | Resultados encontrados para o termo atual | "Resultados encontrados para o termo atual" |

Útil para diagnosticar performance em datasets grandes.

---

## Filtros em cascata

Ao selecionar um valor em um campo, as sugestões dos demais campos são automaticamente filtradas para mostrar apenas os valores compatíveis com os filtros já ativos.

---

## Atualização automática

Quando outros slicers ou filtros do relatório são alterados, o dropdown atualiza os resultados imediatamente — sem precisar redigitar o termo.

---

## Idiomas suportados

Português, Espanhol e Inglês. Detectado automaticamente pelo locale do Power BI, ou configurável manualmente em **Formatar → Aparência → Idioma**.

---

## Acessibilidade (ARIA)

- Navegação por teclado completa (↑ ↓ Enter Esc)
- `role=combobox`, `role=listbox`, `role=option`
- Região live para leitores de tela
- Tags de filtro com botão de remoção acessível

---

## Identificação

- **Nome:** Global Search
- **GUID:** GlobalSearch1A2B3C4D5E6F
- **Versão:** 1.0.0.0
- **Autor:** Diego Dias

---

## Créditos

Desenvolvido por **Diego Dias** · [LinkedIn](https://www.linkedin.com/in/diegodias93/) · Gratuito para sempre.
