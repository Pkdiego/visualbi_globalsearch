# Global Search — Issues & Changelog

---

## v0.26

### Issue 1 — Acessibilidade completa (ARIA + teclado)
- Input recebe `role="combobox"`, `aria-autocomplete`, `aria-haspopup`, `aria-expanded`, `aria-controls`, `aria-activedescendant`
- Dropdown recebe `role="listbox"`; cada sugestão recebe `role="option"` e `id` único (`ss-opt-N`)
- `aria-selected` atualizado por `updateFocus()` ao navegar com setas
- `aria-activedescendant` no input acompanha o item focado
- Botão clear recebe `aria-label`; ícone lupa recebe `aria-hidden="true"`
- Tags recebem `role="listitem"` e `aria-label`; botões × recebem `role="button"`, `aria-label` e `tabindex="0"` (navegáveis por Tab + acionáveis por Enter/Space)
- Live region (`role="status" aria-live="polite"`) anuncia "Filtro aplicado: {valor}" e "Todos os filtros removidos"
- `showDropdown()` / `hideDropdown()` sincronizam `aria-expanded`

### Issue 2 — Modos de busca configuráveis
- Novo método `matchesQuery()` substituindo o `.includes()` hardcoded
- Modos: `contains` (padrão), `startsWith`, `equals`
- Configurável via Format Pane → card "Configuração" → Modo de Busca
- Dropdown em `capabilities.json` com as 3 opções

### Issue 3 — Normalização configurável
- Novo método `applyNormalization()` substituindo o `normalize()` fixo
- Toggle "Ignorar Acentos" (padrão: ativado)
- Toggle "Diferenciar Maiúsculas/Minúsculas" (padrão: desativado)
- `highlightMatch()` respeita `caseSensitive` para flag `gi` vs `g` do regex

### Issue 4 — Observabilidade de performance (diagnóstico local)
- Interface `PerfMetrics` com `lastQueryMs`, `rowCount`, `fieldCount`, `matchCount`, `renderCount`
- `renderSuggestions()` mede tempo com `performance.now()` e atualiza `perf`
- `update()` registra `rowCount` e `fieldCount` após processar o DataView
- Toggle "Mostrar Métricas" no Format Pane → exibe `{ms}ms · {rows}r · {matches}m` no cabeçalho do dropdown
- Estilo `.diag-label` monoespacado, 10px, opacidade 55%

### Card "Configuração" no Format Pane
- Novo 6º card `searchConfig` com grupos "Comportamento da Busca" e "Diagnóstico"
- Totalmente traduzido em pt, es e en
- `capabilities.json` atualizado com o objeto `searchConfig`
