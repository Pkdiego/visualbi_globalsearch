"use strict";

import powerbi from "powerbi-visuals-api";
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import IVisualHost = powerbi.extensibility.visual.IVisualHost;
import DataView = powerbi.DataView;
import FilterAction = powerbi.FilterAction;
import DataViewObjects = powerbi.DataViewObjects;
import FormattingModel = powerbi.visuals.FormattingModel;
import FormattingCard = powerbi.visuals.FormattingCard;
import FormattingComponent = powerbi.visuals.FormattingComponent;
import ValidatorType = powerbi.visuals.ValidatorType;

import "./../style/visual.less";

// ─────────────────────────────────────────────
// i18n — supported languages
// ─────────────────────────────────────────────
interface I18nStrings {
  // UI runtime strings
  placeholder: string;
  searchIn: string;
  suggestions: string;
  noResults: string;
  landingTitle: string;
  landingText: string;
  hint1: string;
  hint2: string;
  hint3: string;
  landingFree: string;
  clearTitle: string;
  removeFilter: string;
  // Format Pane card / group / slice labels
  fp_appearance: string;
  fp_theme: string;
  fp_language: string;
  fp_languageAuto: string;
  fp_searchBox: string;
  fp_text: string;
  fp_placeholderLabel: string;
  fp_fontSize: string;
  fp_fontFamily: string;
  fp_style: string;
  fp_borderColor: string;
  fp_focusBorderColor: string;
  fp_backgroundColor: string;
  fp_textColor: string;
  fp_borderRadius: string;
  fp_height: string;
  fp_searchIcon: string;
  fp_icon: string;
  fp_showIcon: string;
  fp_iconColor: string;
  fp_iconSize: string;
  fp_clearBtnSize: string;
  fp_dropdown: string;
  fp_colors: string;
  fp_headerBg: string;
  fp_headerTextColor: string;
  fp_groupLabelColor: string;
  fp_itemHoverBg: string;
  fp_matchHighlight: string;
  fp_options: string;
  fp_maxResults: string;
  fp_dropdownMaxHeight: string;
  fp_itemFontSize: string;
  fp_itemFontFamily: string;
  fp_groupLabelFontSize: string;
  fp_headerFontSize: string;
  fp_headerHeight: string;
  fp_filterTags: string;
  fp_tags: string;
  fp_tagBg: string;
  fp_tagTextColor: string;
  fp_tagFontSize: string;
  fp_showFieldName: string;
  // Configuration card
  fp_searchConfig: string;
  fp_searchBehavior: string;
  fp_searchMode: string;
  fp_ignoreAccents: string;
  fp_caseSensitive: string;
  fp_diagnostics: string;
  fp_showDiagnostics: string;
  // ARIA / accessibility
  filterApplied: string;
  allFiltersCleared: string;
}

const I18N: Record<string, I18nStrings> = {
  "pt": {
    placeholder:  "Pesquisar em todos os campos...",
    searchIn:     "Pesquisar por:",
    suggestions:  "Sugestões",
    noResults:    "Nenhum resultado encontrado para",
    landingTitle: "Global Search",
    landingText:  "Adicione campos ao visual para começar a pesquisar",
    hint1:        "Pesquise em vários campos simultaneamente",
    hint2:        "Filtragem em cascata inteligente",
    hint3:        "Clique em qualquer sugestão para filtrar",
    landingFree:  "Este visual é completamente gratuito · Avalie se foi útil 😊",
    clearTitle:   "Limpar todos os filtros",
    removeFilter: "Remover filtro",
    fp_appearance:       "Aparência",
    fp_theme:            "Tema",
    fp_language:         "Idioma",
    fp_languageAuto:     "Automático (sistema)",
    fp_searchBox:        "Caixa de Pesquisa",
    fp_text:             "Texto",
    fp_placeholderLabel: "Texto Placeholder",
    fp_fontSize:         "Tamanho da Fonte",
    fp_fontFamily:       "Família da Fonte",
    fp_style:            "Estilo",
    fp_borderColor:      "Cor da Borda",
    fp_focusBorderColor: "Cor da Borda (Foco)",
    fp_backgroundColor:  "Cor de Fundo",
    fp_textColor:        "Cor do Texto",
    fp_borderRadius:     "Raio da Borda",
    fp_height:           "Altura (px)",
    fp_searchIcon:       "Ícone de Pesquisa",
    fp_icon:             "Ícone",
    fp_showIcon:         "Mostrar Ícone",
    fp_iconColor:        "Cor do Ícone",
    fp_iconSize:         "Tamanho do Ícone (px)",
    fp_clearBtnSize:     "Tamanho do Botão Limpar (px)",
    fp_dropdown:         "Sugestões",
    fp_colors:           "Cores",
    fp_headerBg:         "Fundo do Cabeçalho",
    fp_headerTextColor:  "Cor do Texto do Cabeçalho",
    fp_groupLabelColor:  "Cor do Rótulo do Grupo",
    fp_itemHoverBg:      "Fundo ao Passar o Mouse",
    fp_matchHighlight:   "Cor do Destaque",
    fp_options:          "Opções",
    fp_maxResults:       "Máx. Resultados por Campo",
    fp_dropdownMaxHeight:"Altura Máxima do Dropdown (px)",
    fp_itemFontSize:     "Tamanho da Fonte dos Itens (px)",
    fp_itemFontFamily:   "Família da Fonte dos Itens",
    fp_groupLabelFontSize:"Tamanho da Fonte do Grupo (px)",
    fp_headerFontSize:   "Tamanho da Fonte do Cabeçalho (px)",
    fp_headerHeight:     "Altura do Cabeçalho (px)",
    fp_filterTags:       "Tags de Filtro",
    fp_tags:             "Tags",
    fp_tagBg:            "Fundo da Tag",
    fp_tagTextColor:     "Cor do Texto da Tag",
    fp_tagFontSize:      "Tamanho da Fonte da Tag",
    fp_showFieldName:    "Mostrar Nome do Campo na Tag",
    fp_searchConfig:     "Configuração",
    fp_searchBehavior:   "Comportamento da Busca",
    fp_searchMode:       "Modo de Busca",
    fp_ignoreAccents:    "Ignorar Acentos",
    fp_caseSensitive:    "Diferenciar Maiúsculas/Minúsculas",
    fp_diagnostics:      "Diagnóstico",
    fp_showDiagnostics:  "Mostrar Métricas",
    filterApplied:       "Filtro aplicado",
    allFiltersCleared:   "Todos os filtros removidos",
  },
  "es": {
    placeholder:  "Buscar en todos los campos...",
    searchIn:     "Buscar por:",
    suggestions:  "Sugerencias",
    noResults:    "Sin resultados para",
    landingTitle: "Global Search",
    landingText:  "Agregue campos al visual para comenzar a buscar",
    hint1:        "Busque en varios campos simultáneamente",
    hint2:        "Filtrado en cascada inteligente",
    hint3:        "Haga clic en cualquier sugerencia para filtrar",
    landingFree:  "Este visual es completamente gratuito · Valóralo si fue útil 😊",
    clearTitle:   "Limpiar todos los filtros",
    removeFilter: "Eliminar filtro",
    fp_appearance:       "Apariencia",
    fp_theme:            "Tema",
    fp_language:         "Idioma",
    fp_languageAuto:     "Automático (sistema)",
    fp_searchBox:        "Caja de Búsqueda",
    fp_text:             "Texto",
    fp_placeholderLabel: "Texto Placeholder",
    fp_fontSize:         "Tamaño de Fuente",
    fp_fontFamily:       "Familia de Fuente",
    fp_style:            "Estilo",
    fp_borderColor:      "Color de Borde",
    fp_focusBorderColor: "Color de Borde (Foco)",
    fp_backgroundColor:  "Color de Fondo",
    fp_textColor:        "Color de Texto",
    fp_borderRadius:     "Radio de Borde",
    fp_height:           "Alto (px)",
    fp_searchIcon:       "Ícono de Búsqueda",
    fp_icon:             "Ícono",
    fp_showIcon:         "Mostrar Ícono",
    fp_iconColor:        "Color del Ícono",
    fp_iconSize:         "Tamaño del Ícono (px)",
    fp_clearBtnSize:     "Tamaño del Botón Limpiar (px)",
    fp_dropdown:         "Sugerencias",
    fp_colors:           "Colores",
    fp_headerBg:         "Fondo del Encabezado",
    fp_headerTextColor:  "Color de Texto del Encabezado",
    fp_groupLabelColor:  "Color de Etiqueta de Grupo",
    fp_itemHoverBg:      "Fondo al Pasar el Ratón",
    fp_matchHighlight:   "Color de Coincidencia",
    fp_options:          "Opciones",
    fp_maxResults:       "Máx. Resultados por Campo",
    fp_dropdownMaxHeight:"Alto Máximo del Dropdown (px)",
    fp_itemFontSize:     "Tamaño de Fuente de Ítems (px)",
    fp_itemFontFamily:   "Familia de Fuente de Ítems",
    fp_groupLabelFontSize:"Tamaño de Fuente del Grupo (px)",
    fp_headerFontSize:   "Tamaño de Fuente del Encabezado (px)",
    fp_headerHeight:     "Alto del Encabezado (px)",
    fp_filterTags:       "Etiquetas de Filtro",
    fp_tags:             "Etiquetas",
    fp_tagBg:            "Fondo de Etiqueta",
    fp_tagTextColor:     "Color de Texto de Etiqueta",
    fp_tagFontSize:      "Tamaño de Fuente de Etiqueta",
    fp_showFieldName:    "Mostrar Nombre de Campo en Etiqueta",
    fp_searchConfig:     "Configuración",
    fp_searchBehavior:   "Comportamiento de Búsqueda",
    fp_searchMode:       "Modo de Búsqueda",
    fp_ignoreAccents:    "Ignorar Acentos",
    fp_caseSensitive:    "Distinguir Mayúsculas/Minúsculas",
    fp_diagnostics:      "Diagnóstico",
    fp_showDiagnostics:  "Mostrar Métricas",
    filterApplied:       "Filtro aplicado",
    allFiltersCleared:   "Todos los filtros eliminados",
  },
  "en": {
    placeholder:  "Search in all fields...",
    searchIn:     "Search by:",
    suggestions:  "Suggestions",
    noResults:    "No results found for",
    landingTitle: "Global Search",
    landingText:  "Add fields to the visual to start searching",
    hint1:        "Search across multiple fields simultaneously",
    hint2:        "Smart cascade filtering",
    hint3:        "Click any suggestion to filter instantly",
    landingFree:  "This visual is completely free · Rate it if it was useful 😊",
    clearTitle:   "Clear all filters",
    removeFilter: "Remove filter",
    fp_appearance:       "Appearance",
    fp_theme:            "Theme",
    fp_language:         "Language",
    fp_languageAuto:     "Auto (system)",
    fp_searchBox:        "Search Box",
    fp_text:             "Text",
    fp_placeholderLabel: "Placeholder Text",
    fp_fontSize:         "Font Size",
    fp_fontFamily:       "Font Family",
    fp_style:            "Style",
    fp_borderColor:      "Border Color",
    fp_focusBorderColor: "Focus Border Color",
    fp_backgroundColor:  "Background Color",
    fp_textColor:        "Text Color",
    fp_borderRadius:     "Border Radius",
    fp_height:           "Height (px)",
    fp_searchIcon:       "Search Icon",
    fp_icon:             "Icon",
    fp_showIcon:         "Show Icon",
    fp_iconColor:        "Icon Color",
    fp_iconSize:         "Icon Size (px)",
    fp_clearBtnSize:     "Clear Button Size (px)",
    fp_dropdown:         "Suggestions Dropdown",
    fp_colors:           "Colors",
    fp_headerBg:         "Header Background",
    fp_headerTextColor:  "Header Text Color",
    fp_groupLabelColor:  "Group Label Color",
    fp_itemHoverBg:      "Item Hover Background",
    fp_matchHighlight:   "Match Highlight Color",
    fp_options:          "Options",
    fp_maxResults:       "Max Results per Field",
    fp_dropdownMaxHeight:"Dropdown Max Height (px)",
    fp_itemFontSize:     "Item Font Size (px)",
    fp_itemFontFamily:   "Item Font Family",
    fp_groupLabelFontSize:"Group Label Font Size (px)",
    fp_headerFontSize:   "Header Font Size (px)",
    fp_headerHeight:     "Header Height (px)",
    fp_filterTags:       "Filter Tags",
    fp_tags:             "Tags",
    fp_tagBg:            "Tag Background",
    fp_tagTextColor:     "Tag Text Color",
    fp_tagFontSize:      "Tag Font Size",
    fp_showFieldName:    "Show Field Name in Tag",
    fp_searchConfig:     "Configuration",
    fp_searchBehavior:   "Search Behavior",
    fp_searchMode:       "Search Mode",
    fp_ignoreAccents:    "Ignore Accents",
    fp_caseSensitive:    "Case Sensitive",
    fp_diagnostics:      "Diagnostics",
    fp_showDiagnostics:  "Show Metrics",
    filterApplied:       "Filter applied",
    allFiltersCleared:   "All filters cleared",
  }
};

function getI18n(locale: string): I18nStrings {
  const lang = locale ? locale.split("-")[0].toLowerCase() : "en";
  return I18N[lang] || I18N["en"];
}

// ─────────────────────────────────────────────
// Internal types
// ─────────────────────────────────────────────
interface FieldData {
  fieldName: string;   // display name (pode ser renomeado pelo usuário)
  columnName: string;  // nome real da coluna no modelo (do queryName)
  tableName: string;
  values: string[];
  columnIndex: number;
  fieldType: 'text' | 'numeric' | 'date';
}

type RawRow = Map<number, string>;

interface Suggestion {
  value: string;
  fieldName: string;   // nome de exibição
  columnName: string;  // nome real da coluna no modelo
  tableName: string;
  fieldType: 'text' | 'numeric' | 'date';
}

interface ActiveFilter {
  fieldName: string;   // nome de exibição
  columnName: string;  // nome real da coluna no modelo
  tableName: string;
  value: string;
  id: string;
}

interface FormatSettings {
  // Search Box
  placeholder: string;
  borderColor: string;
  focusBorderColor: string;
  backgroundColor: string;
  textColor: string;
  fontSize: number;
  fontFamily: string;
  borderRadius: number;
  height: number;
  // Icon
  iconColor: string;
  showIcon: boolean;
  iconSize: number;
  clearBtnSize: number;
  // Dropdown
  headerColor: string;
  headerTextColor: string;
  headerFontSize: number;
  headerHeight: number;
  groupLabelColor: string;
  itemHoverColor: string;
  matchTextColor: string;
  maxResults: number;
  dropdownMaxHeight: number;
  itemFontSize: number;
  itemFontFamily: string;
  groupLabelFontSize: number;
  // Tags
  tagColor: string;
  tagTextColor: string;
  tagFontSize: number;
  showFieldName: boolean;
  // Appearance
  theme: string;
  language: string;
  // Search Configuration
  searchMode: string;
  ignoreAccents: boolean;
  caseSensitive: boolean;
  showDiagnostics: boolean;
}

// ─────────────────────────────────────────────
// Defaults
// ─────────────────────────────────────────────
// ─────────────────────────────────────────────
// Themes
// ─────────────────────────────────────────────
const THEMES: Record<string, Partial<FormatSettings>> = {
  blackwhite: {
    borderColor: "#333333", focusBorderColor: "#111111",
    iconColor: "#333333", headerColor: "#333333", headerTextColor: "#ffffff",
    groupLabelColor: "#333333", matchTextColor: "#555555",
    tagColor: "#333333", tagTextColor: "#ffffff", itemHoverColor: "#f5f5f5"
  },
  red: {
    borderColor: "#c0392b", focusBorderColor: "#8a0000",
    iconColor: "#8a0000", headerColor: "#8a0000", headerTextColor: "#ffffff",
    groupLabelColor: "#8a0000", matchTextColor: "#c0392b",
    tagColor: "#8a0000", tagTextColor: "#ffffff", itemHoverColor: "#fef0f0"
  },
  blue: {
    borderColor: "#1a6fba", focusBorderColor: "#0d4a8a",
    iconColor: "#0d4a8a", headerColor: "#0d4a8a", headerTextColor: "#ffffff",
    groupLabelColor: "#0d4a8a", matchTextColor: "#1a6fba",
    tagColor: "#0d4a8a", tagTextColor: "#ffffff", itemHoverColor: "#eef4fc"
  },
  mustard: {
    borderColor: "#c49a00", focusBorderColor: "#8a6c00",
    iconColor: "#8a6c00", headerColor: "#8a6c00", headerTextColor: "#ffffff",
    groupLabelColor: "#8a6c00", matchTextColor: "#c49a00",
    tagColor: "#8a6c00", tagTextColor: "#ffffff", itemHoverColor: "#fdf8e8"
  },
  green: {
    borderColor: "#2e7d32", focusBorderColor: "#1b5e20",
    iconColor: "#1b5e20", headerColor: "#1b5e20", headerTextColor: "#ffffff",
    groupLabelColor: "#1b5e20", matchTextColor: "#2e7d32",
    tagColor: "#1b5e20", tagTextColor: "#ffffff", itemHoverColor: "#edf7ee"
  }
};

const DEFAULT_FORMAT: FormatSettings = {
  placeholder: "Search in all fields...",
  borderColor: "#333333",
  focusBorderColor: "#111111",
  backgroundColor: "#ffffff",
  textColor: "#1a1a1a",
  fontSize: 18,
  fontFamily: "Segoe UI",
  borderRadius: 4,
  height: 40,
  iconColor: "#333333",
  showIcon: true,
  iconSize: 16,
  clearBtnSize: 16,
  headerColor: "#333333",
  headerTextColor: "#ffffff",
  headerFontSize: 12,
  headerHeight: 30,
  groupLabelColor: "#333333",
  itemHoverColor: "#f5f5f5",
  matchTextColor: "#118DFF",
  maxResults: 5,
  dropdownMaxHeight: 1000,
  itemFontSize: 16,
  itemFontFamily: "Segoe UI",
  groupLabelFontSize: 14,
  tagColor: "#333333",
  tagTextColor: "#ffffff",
  tagFontSize: 12,
  showFieldName: true,
  theme: "blackwhite",
  language: "auto",
  searchMode: "contains",
  ignoreAccents: true,
  caseSensitive: false,
  showDiagnostics: false,
};

// ─────────────────────────────────────────────
// Helper: check if user explicitly saved a property in the dataView
function hasValue(objects: DataViewObjects, objectName: string, propertyName: string): boolean {
  return !!(objects && objects[objectName] && objects[objectName][propertyName] !== undefined);
}

// ─────────────────────────────────────────────
// Helper: read object property with fallback
// ─────────────────────────────────────────────
function getValue<T>(objects: DataViewObjects, objectName: string, propertyName: string, defaultValue: T): T {
  if (!objects || !objects[objectName] || objects[objectName][propertyName] === undefined) {
    return defaultValue;
  }
  const val = objects[objectName][propertyName];
  // Color fill
  if (val && typeof val === "object" && (val as any).solid) {
    return (val as any).solid.color as unknown as T;
  }
  return val as unknown as T;
}

// ─────────────────────────────────────────────
// Main class
// ─────────────────────────────────────────────
interface PerfMetrics {
  lastQueryMs: number;
  rowCount: number;
  fieldCount: number;
  matchCount: number;
  renderCount: number;
}

// ─────────────────────────────────────────────
export class SmartSearchVisual implements IVisual {
  private host: IVisualHost;
  private container: HTMLElement;
  private fields: FieldData[] = [];
  private rawRows: RawRow[] = [];
  private activeFilters: ActiveFilter[] = [];
  private focusedIndex: number = -1;
  private debounceTimer: any = null;
  private placeholderTimer: any = null;
  private placeholderIndex: number = 0;
  private fmt: FormatSettings = { ...DEFAULT_FORMAT };
  private t: I18nStrings = I18N["en"];
  private perf: PerfMetrics = { lastQueryMs: 0, rowCount: 0, fieldCount: 0, matchCount: 0, renderCount: 0 };

  // DOM elements
  private inputEl: HTMLInputElement;
  private dropdownEl: HTMLElement;
  private clearBtn: HTMLElement;
  private searchIcon: HTMLElement;
  private liveRegion: HTMLElement;

  constructor(options: VisualConstructorOptions) {
    this.host = options.host;
    this.container = options.element;
    this.t = getI18n(options.host.locale);
    this.buildDOM();
  }

  // ── Build HTML ────────────────────────────────
  private buildDOM(): void {
    this.container.innerHTML = `
      <div class="smart-search-container" id="ssc">
        <div class="search-wrapper">
          <span class="search-icon" id="searchIcon" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="7"/><line x1="15.5" y1="15.5" x2="22" y2="22"/></svg></span>
          <input
            class="search-input"
            id="searchInput"
            type="text"
            autocomplete="off"
            spellcheck="false"
            role="combobox"
            aria-autocomplete="list"
            aria-haspopup="listbox"
            aria-expanded="false"
            aria-controls="suggestionsList"
            aria-activedescendant=""
          />
          <button class="clear-btn" id="clearBtn" title="${this.t.clearTitle}" aria-label="${this.t.clearTitle}">&#x2715;</button>
        </div>
        <div class="suggestions-dropdown" id="suggestionsDropdown" role="listbox" aria-label="${this.t.suggestions}">
          <div class="suggestions-header" id="suggestionsHeader" aria-hidden="true">${this.t.suggestions}<span class="searching-dots"><span>.</span><span>.</span><span>.</span></span></div>
          <div id="suggestionsList"></div>
        </div>
        <div class="active-filters" id="activeFilters" role="list" aria-label="Filtros ativos"></div>
        <div id="ssLiveRegion" role="status" aria-live="polite" aria-atomic="true" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap"></div>
        <div id="landingPage" class="landing-page">
        <div class="landing-icon">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGlmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4xLWMwMDMgNzkuOTY5MGE4NywgMjAyNS8wMy8wNi0xOToxMjowMyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI3LjEgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyNi0wMi0yMFQwMTowMjozNi0wMzowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyNi0wMi0yMFQxODo0MDo1MS0wMzowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjYtMDItMjBUMTg6NDA6NTEtMDM6MDAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDM4OThhMTQtN2FiMy04MzRiLTllMTMtMzE5MWUwYzQzM2IxIiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6NGIxMWRjZjAtNjQzNS1kMjRlLTg5YWEtMGI3MzhiNTI5YWY0IiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6OGExMTJhMWQtYTJlOS02MjRjLTg1MTYtYzdhMDcxNmE3YWYzIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6OGExMTJhMWQtYTJlOS02MjRjLTg1MTYtYzdhMDcxNmE3YWYzIiBzdEV2dDp3aGVuPSIyMDI2LTAyLTIwVDAxOjAyOjM2LTAzOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjcuMSAoV2luZG93cykiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjM3MTU2MDlhLTBmNjYtNDY0OC1hMmVlLWYwYjI0MTAxYWRjMiIgc3RFdnQ6d2hlbj0iMjAyNi0wMi0yMFQwMTowMjozNi0wMzowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDI3LjEgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDowMzg5OGExNC03YWIzLTgzNGItOWUxMy0zMTkxZTBjNDMzYjEiIHN0RXZ0OndoZW49IjIwMjYtMDItMjBUMTg6NDA6NTEtMDM6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyNy4xIChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7sjx3NAAAfP0lEQVR4nO18CZwU1bX+ubV3V3dP98z0TM+wiIiKCKIRBxnAFaJPBAQEnhBx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" width="60" height="60" alt="Global Search" />
        </div>
        <div class="landing-title">${this.t.landingTitle}</div>
        <div class="landing-footer">
          <span class="landing-free" id="landingFreeText">${this.t.landingFree}</span>
          <a class="landing-linkedin" href="https://www.linkedin.com/in/diegodias93/" title="Diego Dias — LinkedIn" target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            Diego Dias
          </a>
        </div>
        <hr class="landing-divider" />
        <div class="landing-text">${this.t.landingText}</div>
        <ul class="landing-hints">
          <li>${this.t.hint1}</li>
          <li>${this.t.hint2}</li>
          <li>${this.t.hint3}</li>
        </ul>
      </div>
      </div>
    `;

    this.inputEl    = this.container.querySelector('#searchInput') as HTMLInputElement;
    this.dropdownEl = this.container.querySelector('#suggestionsDropdown') as HTMLElement;
    this.clearBtn   = this.container.querySelector('#clearBtn') as HTMLElement;
    this.searchIcon = this.container.querySelector('#searchIcon') as HTMLElement;
    this.liveRegion = this.container.querySelector('#ssLiveRegion') as HTMLElement;

    this.bindEvents();
  }

  // ── Update DOM text strings when language changes ────────────
  private updateDOMStrings(): void {
    const clearBtn = this.container.querySelector('#clearBtn') as HTMLElement;
    if (clearBtn) {
      clearBtn.title = this.t.clearTitle;
      clearBtn.setAttribute('aria-label', this.t.clearTitle);
    }

    const header = this.container.querySelector('#suggestionsHeader') as HTMLElement;
    if (header) {
      // Find the text node explicitly (firstChild may be diag-label span)
      let textNode: ChildNode | null = null;
      header.childNodes.forEach(n => { if (n.nodeType === Node.TEXT_NODE) textNode = n; });
      if (textNode) {
        (textNode as Text).textContent = this.t.suggestions;
      } else {
        header.insertBefore(document.createTextNode(this.t.suggestions), header.firstChild);
      }
    }

    // Update dropdown aria-label
    const dropdown = this.container.querySelector('#suggestionsDropdown') as HTMLElement;
    if (dropdown) dropdown.setAttribute('aria-label', this.t.suggestions);

    const landingTitle = this.container.querySelector('.landing-title') as HTMLElement;
    if (landingTitle) landingTitle.textContent = this.t.landingTitle;

    const landingText = this.container.querySelector('.landing-text') as HTMLElement;
    if (landingText) landingText.textContent = this.t.landingText;

    const hints = this.container.querySelectorAll('.landing-hints li');
    const hintTexts = [this.t.hint1, this.t.hint2, this.t.hint3];
    hints.forEach((li, i) => { if (hintTexts[i]) li.textContent = hintTexts[i]; });

    const landingFreeEl = this.container.querySelector('#landingFreeText') as HTMLElement;
    if (landingFreeEl) landingFreeEl.textContent = this.t.landingFree;
  }

  // ── Apply format settings to DOM via CSS custom properties ──
  private applyFormat(): void {
    const f = this.fmt;
    const ssc = this.container.querySelector('#ssc') as HTMLElement;
    if (!ssc) return;

    ssc.style.setProperty('--ss-border-color', f.borderColor);
    ssc.style.setProperty('--ss-focus-border-color', f.focusBorderColor);
    ssc.style.setProperty('--ss-bg-color', f.backgroundColor);
    ssc.style.setProperty('--ss-text-color', f.textColor);
    ssc.style.setProperty('--ss-font-size', `${f.fontSize}px`);
    ssc.style.setProperty('--ss-font-family', f.fontFamily);
    ssc.style.setProperty('--ss-border-radius', `${f.borderRadius}px`);
    ssc.style.setProperty('--ss-height', `${f.height}px`);
    ssc.style.setProperty('--ss-icon-color', f.iconColor);
    ssc.style.setProperty('--ss-icon-size', `${f.iconSize}px`);
    ssc.style.setProperty('--ss-clear-btn-size', `${f.clearBtnSize}px`);
    ssc.style.setProperty('--ss-header-color', f.headerColor);
    ssc.style.setProperty('--ss-header-text-color', f.headerTextColor);
    ssc.style.setProperty('--ss-header-font-size', `${f.headerFontSize}px`);
    ssc.style.setProperty('--ss-header-height', `${f.headerHeight}px`);
    ssc.style.setProperty('--ss-dropdown-max-height', `${f.dropdownMaxHeight}px`);
    ssc.style.setProperty('--ss-group-label-color', f.groupLabelColor);
    ssc.style.setProperty('--ss-item-hover-color', f.itemHoverColor);
    ssc.style.setProperty('--ss-match-text-color', f.matchTextColor);
    ssc.style.setProperty('--ss-item-font-size', `${f.itemFontSize}px`);
    ssc.style.setProperty('--ss-item-font-family', f.itemFontFamily);
    ssc.style.setProperty('--ss-group-label-font-size', `${f.groupLabelFontSize}px`);
    ssc.style.setProperty('--ss-tag-color', f.tagColor);
    ssc.style.setProperty('--ss-tag-text-color', f.tagTextColor);
    ssc.style.setProperty('--ss-tag-font-size', `${f.tagFontSize}px`);

    // Placeholder text
    this.inputEl.placeholder = f.placeholder;

    // Show/hide search icon
    this.searchIcon.style.display = f.showIcon ? '' : 'none';
    // Adjust input padding based on icon visibility
    this.inputEl.style.paddingLeft = f.showIcon ? '32px' : '10px';
  }

  // ── Read format settings from DataView ────────
  private parseFormat(dataView: DataView | undefined): void {
    const objects = dataView && dataView.metadata && dataView.metadata.objects
      ? dataView.metadata.objects
      : {} as DataViewObjects;

    // Resolve language FIRST so this.t is correct before reading placeholder default
    const rawLang = getValue(objects, 'appearance', 'language', DEFAULT_FORMAT.language) as string;
    const lang = rawLang === "auto"
      ? (this.host.locale ? this.host.locale.split("-")[0].toLowerCase() : "en")
      : rawLang;
    this.t = I18N[lang] || I18N["en"];

    this.fmt = {
      placeholder:      getValue(objects, 'searchBox', 'placeholder',      this.t.placeholder),
      borderColor:      getValue(objects, 'searchBox', 'borderColor',      DEFAULT_FORMAT.borderColor),
      focusBorderColor: getValue(objects, 'searchBox', 'focusBorderColor', DEFAULT_FORMAT.focusBorderColor),
      backgroundColor:  getValue(objects, 'searchBox', 'backgroundColor',  DEFAULT_FORMAT.backgroundColor),
      textColor:        getValue(objects, 'searchBox', 'textColor',        DEFAULT_FORMAT.textColor),
      fontSize:         getValue(objects, 'searchBox', 'fontSize',         DEFAULT_FORMAT.fontSize),
      fontFamily:       getValue(objects, 'searchBox', 'fontFamily',       DEFAULT_FORMAT.fontFamily),
      borderRadius:     getValue(objects, 'searchBox', 'borderRadius',     DEFAULT_FORMAT.borderRadius),
      height:           getValue(objects, 'searchBox', 'height',           DEFAULT_FORMAT.height),

      iconColor:        getValue(objects, 'iconSettings', 'iconColor',    DEFAULT_FORMAT.iconColor),
      showIcon:         getValue(objects, 'iconSettings', 'showIcon',     DEFAULT_FORMAT.showIcon),
      iconSize:         getValue(objects, 'iconSettings', 'iconSize',     DEFAULT_FORMAT.iconSize),
      clearBtnSize:     getValue(objects, 'iconSettings', 'clearBtnSize', DEFAULT_FORMAT.clearBtnSize),

      headerColor:        getValue(objects, 'dropdown', 'headerColor',        DEFAULT_FORMAT.headerColor),
      headerTextColor:    getValue(objects, 'dropdown', 'headerTextColor',    DEFAULT_FORMAT.headerTextColor),
      headerFontSize:     getValue(objects, 'dropdown', 'headerFontSize',     DEFAULT_FORMAT.headerFontSize),
      headerHeight:       getValue(objects, 'dropdown', 'headerHeight',       DEFAULT_FORMAT.headerHeight),
      groupLabelColor:    getValue(objects, 'dropdown', 'groupLabelColor',    DEFAULT_FORMAT.groupLabelColor),
      itemHoverColor:     getValue(objects, 'dropdown', 'itemHoverColor',     DEFAULT_FORMAT.itemHoverColor),
      matchTextColor:     getValue(objects, 'dropdown', 'matchTextColor',     DEFAULT_FORMAT.matchTextColor),
      maxResults:         getValue(objects, 'dropdown', 'maxResults',         DEFAULT_FORMAT.maxResults),
      dropdownMaxHeight:  getValue(objects, 'dropdown', 'dropdownMaxHeight',  DEFAULT_FORMAT.dropdownMaxHeight),
      itemFontSize:       getValue(objects, 'dropdown', 'itemFontSize',       DEFAULT_FORMAT.itemFontSize),
      itemFontFamily:     getValue(objects, 'dropdown', 'itemFontFamily',     DEFAULT_FORMAT.itemFontFamily),
      groupLabelFontSize: getValue(objects, 'dropdown', 'groupLabelFontSize', DEFAULT_FORMAT.groupLabelFontSize),

      tagColor:         getValue(objects, 'tags', 'tagColor',      DEFAULT_FORMAT.tagColor),
      tagTextColor:     getValue(objects, 'tags', 'tagTextColor',  DEFAULT_FORMAT.tagTextColor),
      tagFontSize:      getValue(objects, 'tags', 'tagFontSize',   DEFAULT_FORMAT.tagFontSize),
      showFieldName:    getValue(objects, 'tags', 'showFieldName', DEFAULT_FORMAT.showFieldName),

      theme:    getValue(objects, 'appearance', 'theme',    DEFAULT_FORMAT.theme),
      language: getValue(objects, 'appearance', 'language', DEFAULT_FORMAT.language),

      searchMode:      getValue(objects, 'searchConfig', 'searchMode',      DEFAULT_FORMAT.searchMode),
      ignoreAccents:   getValue(objects, 'searchConfig', 'ignoreAccents',   DEFAULT_FORMAT.ignoreAccents),
      caseSensitive:   getValue(objects, 'searchConfig', 'caseSensitive',   DEFAULT_FORMAT.caseSensitive),
      showDiagnostics: getValue(objects, 'searchConfig', 'showDiagnostics', DEFAULT_FORMAT.showDiagnostics),
    };

    // Apply theme colors only for properties the user has NOT explicitly customized
    const themeColors = THEMES[this.fmt.theme];
    if (themeColors) {
      const colorProps: Array<[keyof typeof themeColors, string, string]> = [
        ['borderColor',      'searchBox',    'borderColor'],
        ['focusBorderColor', 'searchBox',    'focusBorderColor'],
        ['iconColor',        'iconSettings', 'iconColor'],
        ['headerColor',      'dropdown',     'headerColor'],
        ['headerTextColor',  'dropdown',     'headerTextColor'],
        ['groupLabelColor',  'dropdown',     'groupLabelColor'],
        ['matchTextColor',   'dropdown',     'matchTextColor'],
        ['itemHoverColor',   'dropdown',     'itemHoverColor'],
        ['tagColor',         'tags',         'tagColor'],
        ['tagTextColor',     'tags',         'tagTextColor'],
      ];
      for (const [prop, obj, key] of colorProps) {
        if (!hasValue(objects, obj, key)) {
          (this.fmt as any)[prop] = themeColors[prop];
        }
      }
    }
  }

  // ── Bind events ───────────────────────────────
  private bindEvents(): void {
    this.inputEl.addEventListener('input', () => {
      const val = this.inputEl.value;
      clearTimeout(this.debounceTimer);
      if (val.trim().length >= 1) this.showSearchingState();
      this.debounceTimer = setTimeout(() => {
        this.renderSuggestions(val.trim());
      }, 150);
    });

    this.inputEl.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const dropdownVisible = this.dropdownEl.classList.contains('visible');
        if (dropdownVisible) {
          // 1º Esc: fecha o dropdown
          this.hideDropdown();
        } else if (this.activeFilters.length > 0) {
          // 2º Esc (dropdown já fechado): limpa todos os filtros
          this.clearAllFilters();
        }
        return;
      }

      const items = this.dropdownEl.querySelectorAll<HTMLElement>('.suggestion-item');
      if (!items.length) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        this.focusedIndex = Math.min(this.focusedIndex + 1, items.length - 1);
        this.updateFocus(items);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        this.focusedIndex = Math.max(this.focusedIndex - 1, 0);
        this.updateFocus(items);
      } else if (e.key === 'Enter' && this.focusedIndex >= 0) {
        e.preventDefault();
        items[this.focusedIndex].click();
      }
    });

    this.inputEl.addEventListener('focus', () => {
      if (this.inputEl.value.trim().length >= 1) this.showDropdown();
    });

    document.addEventListener('click', (e: MouseEvent) => {
      const ssc = this.container.querySelector('#ssc');
      if (ssc && !ssc.contains(e.target as Node)) this.hideDropdown();
    });

    this.clearBtn.addEventListener('click', () => {
      this.hideDropdown();
      this.clearAllFilters();
    });
  }

  // ── Update focus on suggestions ───────────────
  private updateFocus(items: NodeListOf<HTMLElement>): void {
    items.forEach((item, i) => {
      const focused = i === this.focusedIndex;
      item.classList.toggle('focused', focused);
      item.setAttribute('aria-selected', focused ? 'true' : 'false'); // Issue 1
    });
    if (this.focusedIndex >= 0) {
      const focusedItem = items[this.focusedIndex];
      focusedItem.scrollIntoView({ block: 'nearest' });
      this.inputEl.setAttribute('aria-activedescendant', focusedItem.id); // Issue 1
    }
  }

  // ── Update diagnostics label in dropdown header (Issue 4) ──
  private updateDiagLabel(): void {
    const header = this.dropdownEl.querySelector('#suggestionsHeader') as HTMLElement;
    if (!header) return;
    const existing = header.querySelector('.diag-label');
    if (existing) existing.remove();
    if (!this.fmt.showDiagnostics) return;
    const diag = document.createElement('span');
    diag.className = 'diag-label';
    diag.setAttribute('aria-hidden', 'true');
    diag.textContent = `${this.perf.lastQueryMs}ms · ${this.perf.rowCount}r · ${this.perf.matchCount}m`;
    header.appendChild(diag);
  }

  // ── Render suggestions dropdown ───────────────
  private renderSuggestions(query: string): void {
    const t0 = performance.now(); // Issue 4: perf timing start
    const listEl = this.dropdownEl.querySelector('#suggestionsList') as HTMLElement;
    listEl.innerHTML = '';
    this.focusedIndex = -1;

    if (query.length < 1) {
      this.hideDropdown();
      return;
    }

    const maxPerField = Math.max(1, Math.round(this.fmt.maxResults));
    const grouped: { [key: string]: Suggestion[] } = {};

    for (const field of this.fields) {
      const compatibleRows = this.getFilteredRows(field.fieldName);
      const compatibleValues = new Set<string>();
      for (const row of compatibleRows) {
        const val = row.get(field.columnIndex);
        if (val) compatibleValues.add(val);
      }

      const activeValuesForField = this.activeFilters
        .filter(af => af.fieldName === field.fieldName)
        .map(af => af.value);

      // Issue 2+3: use matchesQuery instead of hardcoded .includes()
      const matches = Array.from(compatibleValues)
        .filter(v => this.matchesQuery(v, query) && !activeValuesForField.includes(v))
        .sort();

      if (matches.length > 0) {
        const sliced = matches.slice(0, maxPerField).map(v => ({
          value: v,
          fieldName: field.fieldName,
          columnName: field.columnName,
          tableName: field.tableName,
          fieldType: field.fieldType
        }));
        (sliced as any)._totalCount = matches.length;
        grouped[field.fieldName] = sliced;
      }
    }

    const keys = Object.keys(grouped);

    // Issue 4: update perf metrics
    this.perf.lastQueryMs = Math.round((performance.now() - t0) * 10) / 10;
    this.perf.matchCount  = keys.reduce((s, k) => s + grouped[k].length, 0);
    this.perf.renderCount++;

    if (keys.length === 0) {
      listEl.innerHTML = `<div class="no-results">${this.t.noResults} "<strong>${this.escapeHtml(query)}</strong>"</div>`;
      this.showDropdown();
      this.updateDiagLabel();
      return;
    }

    let optionIndex = 0;
    for (const fieldName of keys) {
      const suggestions = grouped[fieldName];
      const totalCount = (suggestions as any)._totalCount as number;
      const countLabel = totalCount > suggestions.length
        ? `${suggestions.length} de ${totalCount}`
        : `${suggestions.length}`;
      const group = document.createElement('div');
      group.className = 'suggestion-group';
      group.innerHTML = `
        <div class="group-label" aria-hidden="true">
          ${this.escapeHtml(fieldName)}
          <span class="group-count">${countLabel}</span>
        </div>
      `;

      for (const sug of suggestions) {
        const itemId = `ss-opt-${optionIndex++}`;
        const item = document.createElement('div');
        item.className = 'suggestion-item';
        item.title = sug.value;
        // Issue 1: ARIA roles for options
        item.setAttribute('role', 'option');
        item.setAttribute('id', itemId);
        item.setAttribute('aria-selected', 'false');
        const highlighted = this.highlightMatch(sug.value, query);
        item.innerHTML = `
          <span class="field-type-icon" aria-hidden="true">${this.getFieldTypeIcon(sug.fieldType)}</span>
          <span class="full-value">${highlighted}</span>
          <span class="item-field-hint" aria-hidden="true">→ ${this.escapeHtml(sug.fieldName)}</span>
        `;
        item.addEventListener('mousedown', (e: MouseEvent) => {
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            e.stopPropagation();
            this.applyFilterMulti(sug);
          }
        });
        item.addEventListener('click', (e: MouseEvent) => {
          if (!e.ctrlKey && !e.metaKey) {
            this.applyFilter(sug);
          }
        });
        group.appendChild(item);
      }

      listEl.appendChild(group);
    }

    this.showDropdown();
    this.updateDiagLabel(); // Issue 4
  }

  // ── Apply filter ──────────────────────────────
  private applyFilter(sug: Suggestion): void {
    const alreadyExists = this.activeFilters.find(
      f => f.fieldName === sug.fieldName && f.value === sug.value
    );
    if (alreadyExists) { this.hideDropdown(); return; }

    this.activeFilters.push({
      fieldName: sug.fieldName,
      columnName: sug.columnName,
      tableName: sug.tableName,
      value: sug.value,
      id: `${sug.tableName}_${sug.columnName}_${Date.now()}`
    });

    this.inputEl.value = '';
    this.hideDropdown();
    this.renderTags();
    this.sendFilters();
    this.announce(`${this.t.filterApplied}: ${sug.value}`); // Issue 1
  }

  // ── Apply filter (Ctrl+Click — mantém dropdown aberto) ────
  private applyFilterMulti(sug: Suggestion): void {
    const alreadyExists = this.activeFilters.find(
      f => f.fieldName === sug.fieldName && f.value === sug.value
    );
    if (alreadyExists) return;

    this.activeFilters.push({
      fieldName: sug.fieldName,
      columnName: sug.columnName,
      tableName: sug.tableName,
      value: sug.value,
      id: `${sug.tableName}_${sug.columnName}_${Date.now()}`
    });

    this.renderTags();
    this.sendFilters();
    this.announce(`${this.t.filterApplied}: ${sug.value}`); // Issue 1
    // Re-renderiza sugestões para remover o item recém-adicionado
    this.renderSuggestions(this.inputEl.value.trim());
  }

  // ── Render filter tags ────────────────────────
  private renderTags(): void {
    const tagsEl = this.container.querySelector('#activeFilters') as HTMLElement;
    tagsEl.innerHTML = '';

    // Fechar qualquer popup aberto ao re-renderizar
    const existingPopup = this.container.querySelector('.tag-popup');
    if (existingPopup) existingPopup.remove();

    // Agrupar filtros por fieldName
    const grouped = new Map<string, ActiveFilter[]>();
    for (const af of this.activeFilters) {
      if (!grouped.has(af.fieldName)) grouped.set(af.fieldName, []);
      grouped.get(af.fieldName)!.push(af);
    }

    for (const [fieldName, filters] of grouped) {
      const tag = document.createElement('div');
      tag.className = 'filter-tag';

      if (filters.length === 1) {
        // Tag simples — comportamento original
        const af = filters[0];
        const tagText = this.fmt.showFieldName ? `${af.fieldName}: ${af.value}` : af.value;
        tag.title = tagText;
        tag.setAttribute('role', 'listitem'); // Issue 1
        tag.setAttribute('aria-label', tagText); // Issue 1

        const label = document.createElement('span');
        label.className = 'tag-label';
        label.textContent = tagText;

        const remove = document.createElement('span');
        remove.className = 'tag-remove';
        remove.innerHTML = '&#x2715;';
        remove.title = this.t.removeFilter;
        remove.setAttribute('role', 'button'); // Issue 1
        remove.setAttribute('aria-label', `${this.t.removeFilter}: ${af.value}`); // Issue 1
        remove.setAttribute('tabindex', '0'); // Issue 1
        remove.addEventListener('click', () => this.removeFilter(af.id));
        remove.addEventListener('keydown', (e: KeyboardEvent) => { // Issue 1
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.removeFilter(af.id); }
        });

        tag.appendChild(label);
        tag.appendChild(remove);
      } else {
        // Tag agrupada — mostra campo + contagem, popup ao clicar
        const tagText = `${fieldName}: ${filters.map(f => f.value).join(', ')}`;
        tag.title = tagText;
        tag.style.cursor = 'pointer';
        tag.setAttribute('role', 'listitem'); // Issue 1
        tag.setAttribute('aria-label', tagText); // Issue 1

        const label = document.createElement('span');
        label.className = 'tag-label';
        label.textContent = `${fieldName} (${filters.length})`;

        const remove = document.createElement('span');
        remove.className = 'tag-remove';
        remove.innerHTML = '&#x2715;';
        remove.title = this.t.removeFilter;
        remove.setAttribute('role', 'button'); // Issue 1
        remove.setAttribute('aria-label', `${this.t.removeFilter}: ${fieldName}`); // Issue 1
        remove.setAttribute('tabindex', '0'); // Issue 1
        remove.addEventListener('click', (e) => {
          e.stopPropagation();
          this.activeFilters = this.activeFilters.filter(f => f.fieldName !== fieldName);
          this.renderTags();
          if (this.activeFilters.length === 0) this.clearAllFilters();
          else this.sendFilters();
        });
        remove.addEventListener('keydown', (e: KeyboardEvent) => { // Issue 1
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault(); e.stopPropagation();
            this.activeFilters = this.activeFilters.filter(f => f.fieldName !== fieldName);
            this.renderTags();
            if (this.activeFilters.length === 0) this.clearAllFilters();
            else this.sendFilters();
          }
        });

        tag.addEventListener('click', () => this.toggleTagPopup(tag, filters, fieldName));

        tag.appendChild(label);
        tag.appendChild(remove);
      }

      tagsEl.appendChild(tag);
    }

    this.clearBtn.classList.toggle('visible', this.activeFilters.length > 0);

    // Reposicionar dropdown se estiver visível
    if (this.dropdownEl.classList.contains('visible')) {
      this.updateDropdownPosition();
    }
  }

  // ── Popup de valores individuais de uma tag agrupada ──
  private toggleTagPopup(tagEl: HTMLElement, filters: ActiveFilter[], fieldName: string): void {
    // Se já existe popup para este campo, fecha (toggle)
    const existing = this.container.querySelector('.tag-popup') as HTMLElement;
    if (existing) {
      existing.remove();
      if (existing.getAttribute('data-field') === fieldName) return;
    }

    const tagsEl = this.container.querySelector('#activeFilters') as HTMLElement;

    const popup = document.createElement('div');
    popup.className = 'tag-popup';
    popup.setAttribute('data-field', fieldName);

    for (const af of filters) {
      const item = document.createElement('div');
      item.className = 'tag-popup-item';

      const valueSpan = document.createElement('span');
      valueSpan.className = 'popup-value';
      valueSpan.textContent = af.value;

      const removeSpan = document.createElement('span');
      removeSpan.className = 'popup-remove';
      removeSpan.innerHTML = '&#x2715;';
      removeSpan.title = this.t.removeFilter;
      removeSpan.addEventListener('click', (e) => {
        e.stopPropagation();
        this.removeFilter(af.id);
        popup.remove();
      });

      item.appendChild(valueSpan);
      item.appendChild(removeSpan);
      popup.appendChild(item);
    }

    // Posicionar abaixo da tag, relativo ao tagsEl
    tagsEl.style.position = 'relative';
    tagsEl.appendChild(popup);
    const tagRect = tagEl.getBoundingClientRect();
    const containerRect = tagsEl.getBoundingClientRect();
    popup.style.left = `${tagRect.left - containerRect.left}px`;
    popup.style.top  = `${tagRect.bottom - containerRect.top + 4}px`;

    // Fechar ao clicar fora
    const closeHandler = (e: MouseEvent) => {
      if (!popup.contains(e.target as Node) && !tagEl.contains(e.target as Node)) {
        popup.remove();
        document.removeEventListener('click', closeHandler);
      }
    };
    setTimeout(() => document.addEventListener('click', closeHandler), 0);
  }

  // Slots declarados no capabilities.json para múltiplos filtros simultâneos
  private readonly FILTER_SLOTS = ["filter","filter1","filter2","filter3","filter4","filter5","filter6","filter7","filter8","filter9"];

  // ── Send filters to Power BI ──────────────────
  private sendFilters(): void {
    if (this.activeFilters.length === 0) { this.clearAllFilters(); return; }

    // Group active filters by real column name, collecting all values per column
    const grouped = new Map<string, { tableName: string; columnName: string; values: string[] }>();
    for (const af of this.activeFilters) {
      const key = `${af.tableName}|${af.columnName}`;
      if (!grouped.has(key)) {
        grouped.set(key, { tableName: af.tableName, columnName: af.columnName, values: [] });
      }
      grouped.get(key)!.values.push(af.value);
    }

    const groups = Array.from(grouped.values());

    // Assign one declared slot per column group, clear any unused slots
    for (let i = 0; i < this.FILTER_SLOTS.length; i++) {
      const slot = this.FILTER_SLOTS[i];
      const group = groups[i];
      if (group) {
        try {
          const basicFilter = {
            $schema: "https://powerbi.com/product/schema#basic",
            filterType: 1,
            target: { table: group.tableName, column: group.columnName },
            operator: "In",
            values: group.values,
            requireSingleSelection: false
          };
          this.host.applyJsonFilter(basicFilter as powerbi.IFilter, "general", slot, FilterAction.merge);
        } catch (e) {
          console.error("[SmartSearch] Filter error:", e);
        }
      } else {
        try {
          this.host.applyJsonFilter(null, "general", slot, FilterAction.remove);
        } catch (e) { /* slot already empty */ }
      }
    }
  }

  // ── Remove individual filter ──────────────────
  private removeFilter(id: string): void {
    this.activeFilters = this.activeFilters.filter(f => f.id !== id);
    this.renderTags();
    if (this.activeFilters.length === 0) {
      this.clearAllFilters();
    } else {
      this.sendFilters();
    }
  }

  // ── Clear all filters ─────────────────────────
  private clearAllFilters(): void {
    this.activeFilters = [];
    this.renderTags();
    this.inputEl.value = '';
    this.announce(this.t.allFiltersCleared); // Issue 1
    for (const slot of this.FILTER_SLOTS) {
      try {
        this.host.applyJsonFilter(null, "general", slot, FilterAction.remove);
      } catch (e) { /* slot already empty */ }
    }
  }

  // ── Placeholder rotation ──────────────────────
  private startPlaceholderRotation(): void {
    this.stopPlaceholderRotation();
    const fieldNames = this.fields.map(f => f.fieldName);
    if (fieldNames.length === 1) {
      this.inputEl.placeholder = `${this.t.searchIn} ${fieldNames[0]}...`;
      return;
    }
    const rotate = () => {
      if (!this.inputEl.value && document.activeElement !== this.inputEl) {
        this.inputEl.placeholder = `${this.t.searchIn} ${fieldNames[this.placeholderIndex]}...`;
        this.placeholderIndex = (this.placeholderIndex + 1) % fieldNames.length;
      }
    };
    rotate();
    this.placeholderTimer = setInterval(rotate, 2500);
  }

  private stopPlaceholderRotation(): void {
    if (this.placeholderTimer) {
      clearInterval(this.placeholderTimer);
      this.placeholderTimer = null;
    }
    this.placeholderIndex = 0;
  }

  // ── Show/hide dropdown ────────────────────────
  // ── Position dropdown below tags (if any) ────
  private updateDropdownPosition(): void {
    const searchWrapper = this.container.querySelector('.search-wrapper') as HTMLElement;
    const tagsEl = this.container.querySelector('#activeFilters') as HTMLElement;
    // Use offsetTop + offsetHeight to get the bottom edge relative to the container
    let top = searchWrapper
      ? (searchWrapper.offsetTop + searchWrapper.offsetHeight + 8)
      : 54;
    if (tagsEl && tagsEl.offsetHeight > 0) {
      top += tagsEl.offsetHeight + 6;
    }
    this.dropdownEl.style.top = `${top}px`;
  }

  private showSearchingState(): void {
    const header = this.dropdownEl.querySelector('#suggestionsHeader') as HTMLElement;
    if (header) header.classList.add('searching');
    this.updateDropdownPosition();
    this.dropdownEl.classList.add('visible');
    this.inputEl.setAttribute('aria-expanded', 'true');
  }

  private showDropdown(): void {
    const header = this.dropdownEl.querySelector('#suggestionsHeader') as HTMLElement;
    if (header) header.classList.remove('searching');
    this.updateDropdownPosition();
    this.dropdownEl.classList.add('visible');
    this.inputEl.setAttribute('aria-expanded', 'true');
  }

  private hideDropdown(): void {
    this.dropdownEl.classList.remove('visible');
    this.focusedIndex = -1;
    this.inputEl.setAttribute('aria-expanded', 'false');
    this.inputEl.setAttribute('aria-activedescendant', '');
  }

  // ── Announce to screen readers ────────────────
  private announce(message: string): void {
    if (!this.liveRegion) return;
    this.liveRegion.textContent = '';
    // Small timeout ensures screen readers pick up the change
    setTimeout(() => { this.liveRegion.textContent = message; }, 50);
  }

  // ── Configurable normalization (Issues 2 & 3) ─
  private applyNormalization(text: string): string {
    let t = text;
    if (!this.fmt.caseSensitive) t = t.toLowerCase();
    if (this.fmt.ignoreAccents) t = t.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return t;
  }

  // ── Configurable match (Issue 2) ──────────────
  private matchesQuery(value: string, query: string): boolean {
    const v = this.applyNormalization(value);
    const q = this.applyNormalization(query);
    switch (this.fmt.searchMode) {
      case 'startsWith': return v.startsWith(q);
      case 'equals':     return v === q;
      default:           return v.includes(q); // contains
    }
  }

  // ── Highlight matched text ────────────────────
  private highlightMatch(text: string, query: string): string {
    const escaped = this.escapeHtml(text);
    const escapedQuery = this.escapeHtml(query).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const flags = this.fmt.caseSensitive ? 'g' : 'gi';
    return escaped.replace(new RegExp(`(${escapedQuery})`, flags), '<span class="match-text">$1</span>');
  }

  // ── Field type icon ───────────────────────────
  private getFieldTypeIcon(type: 'text' | 'numeric' | 'date'): string {
    if (type === 'numeric') {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"><text x="0" y="13" font-size="11" font-family="Segoe UI,sans-serif" font-weight="600">123</text></svg>`;
    }
    if (type === 'date') {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="12" height="11" rx="1.5"/><line x1="2" y1="7" x2="14" y2="7"/><line x1="5" y1="1.5" x2="5" y2="4.5"/><line x1="11" y1="1.5" x2="11" y2="4.5"/></svg>`;
    }
    // text (default)
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"><text x="0" y="12" font-size="12" font-family="Segoe UI,sans-serif" font-weight="600">Aa</text></svg>`;
  }

  // ── Escape HTML ───────────────────────────────
  private escapeHtml(text: string): string {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // ── Get rows compatible with active filters (cascade) ──
  private getFilteredRows(excludeFieldName?: string): RawRow[] {
    const filtersToApply = this.activeFilters.filter(af => af.fieldName !== excludeFieldName);
    if (filtersToApply.length === 0) return this.rawRows;
    return this.rawRows.filter(row =>
      filtersToApply.every(af => {
        const field = this.fields.find(f => f.fieldName === af.fieldName);
        if (!field) return true;
        return row.get(field.columnIndex) === af.value;
      })
    );
  }

  // ── Update: process DataView from Power BI ────
  public update(options: VisualUpdateOptions): void {
    const dataViews = options.dataViews;

    // Always parse and apply format (even without data)
    this.parseFormat(dataViews && dataViews[0]);
    this.updateDOMStrings(); // update i18n text if language changed
    this.applyFormat();
    this.renderTags(); // re-render tags so showFieldName toggle takes effect immediately

    const landing = this.container.querySelector('#landingPage') as HTMLElement;
    const searchWrapper = this.container.querySelector('.search-wrapper') as HTMLElement;
    const activeFiltersEl = this.container.querySelector('#activeFilters') as HTMLElement;

    if (!dataViews || !dataViews[0] || !dataViews[0].table) {
      this.fields = [];
      this.rawRows = [];
      this.stopPlaceholderRotation();
      this.inputEl.placeholder = this.fmt.placeholder;
      if (landing) landing.style.display = 'flex';
      if (searchWrapper) searchWrapper.style.display = 'none';
      if (activeFiltersEl) activeFiltersEl.style.display = 'none';
      return;
    }

    if (landing) landing.style.display = 'none';
    if (searchWrapper) searchWrapper.style.display = '';
    if (activeFiltersEl) activeFiltersEl.style.display = '';

    const table = dataViews[0].table;
    const columns = table.columns;
    const rows = table.rows || [];

    this.fields = [];

    for (let colIdx = 0; colIdx < columns.length; colIdx++) {
      const col = columns[colIdx];
      const queryName = col.queryName || '';
      const parts = queryName.split('.');
      const tableName = parts[0] || col.displayName;
      const columnName = parts[1] || col.displayName; // nome real da coluna no modelo
      const fieldName = col.displayName;              // nome de exibição (pode ser renomeado)

      let fieldType: 'text' | 'numeric' | 'date' = 'text';
      if (col.type?.numeric) fieldType = 'numeric';
      else if ((col.type as any)?.dateTime || (col.type as any)?.date) fieldType = 'date';

      const uniqueValues = new Set<string>();
      for (const row of rows) {
        const cell = row[colIdx];
        if (cell !== null && cell !== undefined) {
          const str = String(cell).trim();
          if (str.length > 0) uniqueValues.add(str);
        }
      }

      this.fields.push({ fieldName, columnName, tableName, values: Array.from(uniqueValues).sort(), columnIndex: colIdx, fieldType });
    }

    this.rawRows = rows.map(row => {
      const map: RawRow = new Map();
      for (let colIdx = 0; colIdx < columns.length; colIdx++) {
        const cell = row[colIdx];
        if (cell !== null && cell !== undefined) {
          const str = String(cell).trim();
          if (str.length > 0) map.set(colIdx, str);
        }
      }
      return map;
    });

    // Issue 4: update perf row/field counts
    this.perf.rowCount   = this.rawRows.length;
    this.perf.fieldCount = this.fields.length;

    // Start dynamic placeholder rotation if no custom placeholder
    const hasCustomPlaceholder = this.fmt.placeholder !== this.t.placeholder;
    if (!hasCustomPlaceholder && this.fields.length > 0) {
      this.startPlaceholderRotation();
    } else {
      this.stopPlaceholderRotation();
      this.inputEl.placeholder = this.fmt.placeholder;
    }
  }

  // ── Format Pane Model ─────────────────────────
  public getFormattingModel(): FormattingModel {
    const f = this.fmt;

    const t = this.t;

    const appearanceCard: FormattingCard = {
      uid: "appearance_card",
      displayName: t.fp_appearance,
      revertToDefaultDescriptors: [
        { objectName: "appearance", propertyName: "theme" },
        { objectName: "appearance", propertyName: "language" }
      ],
      groups: [
        {
          uid: "appearance_group",
          displayName: t.fp_theme,
          slices: [
            {
              uid: "theme_slice",
              displayName: t.fp_theme,
              control: {
                type: FormattingComponent.Dropdown,
                properties: {
                  descriptor: { objectName: "appearance", propertyName: "theme" },
                  value: f.theme
                }
              }
            },
            {
              uid: "language_slice",
              displayName: t.fp_language,
              control: {
                type: FormattingComponent.Dropdown,
                properties: {
                  descriptor: { objectName: "appearance", propertyName: "language" },
                  value: f.language
                }
              }
            }
          ]
        }
      ]
    };

    const searchBoxCard: FormattingCard = {
      uid: "searchBox_card",
      displayName: t.fp_searchBox,
      revertToDefaultDescriptors: [
        { objectName: "searchBox", propertyName: "placeholder" },
        { objectName: "searchBox", propertyName: "borderColor" },
        { objectName: "searchBox", propertyName: "focusBorderColor" },
        { objectName: "searchBox", propertyName: "backgroundColor" },
        { objectName: "searchBox", propertyName: "textColor" },
        { objectName: "searchBox", propertyName: "fontSize" },
        { objectName: "searchBox", propertyName: "fontFamily" },
        { objectName: "searchBox", propertyName: "borderRadius" },
        { objectName: "searchBox", propertyName: "height" }
      ],
      groups: [
        {
          uid: "searchBox_text_group",
          displayName: t.fp_text,
          slices: [
            {
              uid: "placeholder_slice",
              displayName: t.fp_placeholderLabel,
              control: {
                type: FormattingComponent.TextInput,
                properties: {
                  descriptor: { objectName: "searchBox", propertyName: "placeholder" },
                  value: f.placeholder,
                  placeholder: t.placeholder
                }
              }
            },
            {
              uid: "fontSize_slice",
              displayName: t.fp_fontSize,
              control: {
                type: FormattingComponent.NumUpDown,
                properties: {
                  descriptor: { objectName: "searchBox", propertyName: "fontSize" },
                  value: f.fontSize,
                  options: {
                    minValue: { type: ValidatorType.Min, value: 8 },
                    maxValue: { type: ValidatorType.Max, value: 32 }
                  }
                }
              }
            },
            {
              uid: "fontFamily_slice",
              displayName: t.fp_fontFamily,
              control: {
                type: FormattingComponent.FontPicker,
                properties: {
                  descriptor: { objectName: "searchBox", propertyName: "fontFamily" },
                  value: f.fontFamily
                }
              }
            }
          ]
        },
        {
          uid: "searchBox_style_group",
          displayName: t.fp_style,
          slices: [
            {
              uid: "borderColor_slice",
              displayName: t.fp_borderColor,
              control: {
                type: FormattingComponent.ColorPicker,
                properties: {
                  descriptor: { objectName: "searchBox", propertyName: "borderColor" },
                  value: { value: f.borderColor }
                }
              }
            },
            {
              uid: "focusBorderColor_slice",
              displayName: t.fp_focusBorderColor,
              control: {
                type: FormattingComponent.ColorPicker,
                properties: {
                  descriptor: { objectName: "searchBox", propertyName: "focusBorderColor" },
                  value: { value: f.focusBorderColor }
                }
              }
            },
            {
              uid: "backgroundColor_slice",
              displayName: t.fp_backgroundColor,
              control: {
                type: FormattingComponent.ColorPicker,
                properties: {
                  descriptor: { objectName: "searchBox", propertyName: "backgroundColor" },
                  value: { value: f.backgroundColor }
                }
              }
            },
            {
              uid: "textColor_slice",
              displayName: t.fp_textColor,
              control: {
                type: FormattingComponent.ColorPicker,
                properties: {
                  descriptor: { objectName: "searchBox", propertyName: "textColor" },
                  value: { value: f.textColor }
                }
              }
            },
            {
              uid: "borderRadius_slice",
              displayName: t.fp_borderRadius,
              control: {
                type: FormattingComponent.NumUpDown,
                properties: {
                  descriptor: { objectName: "searchBox", propertyName: "borderRadius" },
                  value: f.borderRadius,
                  options: {
                    minValue: { type: ValidatorType.Min, value: 0 },
                    maxValue: { type: ValidatorType.Max, value: 20 }
                  }
                }
              }
            },
            {
              uid: "height_slice",
              displayName: t.fp_height,
              control: {
                type: FormattingComponent.NumUpDown,
                properties: {
                  descriptor: { objectName: "searchBox", propertyName: "height" },
                  value: f.height,
                  options: {
                    minValue: { type: ValidatorType.Min, value: 24 },
                    maxValue: { type: ValidatorType.Max, value: 60 }
                  }
                }
              }
            }
          ]
        }
      ]
    };

    const iconCard: FormattingCard = {
      uid: "icon_card",
      displayName: t.fp_searchIcon,
      revertToDefaultDescriptors: [
        { objectName: "iconSettings", propertyName: "showIcon" },
        { objectName: "iconSettings", propertyName: "iconColor" },
        { objectName: "iconSettings", propertyName: "iconSize" },
        { objectName: "iconSettings", propertyName: "clearBtnSize" }
      ],
      groups: [
        {
          uid: "icon_group",
          displayName: t.fp_icon,
          slices: [
            {
              uid: "showIcon_slice",
              displayName: t.fp_showIcon,
              control: {
                type: FormattingComponent.ToggleSwitch,
                properties: {
                  descriptor: { objectName: "iconSettings", propertyName: "showIcon" },
                  value: f.showIcon
                }
              }
            },
            {
              uid: "iconColor_slice",
              displayName: t.fp_iconColor,
              control: {
                type: FormattingComponent.ColorPicker,
                properties: {
                  descriptor: { objectName: "iconSettings", propertyName: "iconColor" },
                  value: { value: f.iconColor }
                }
              }
            },
            {
              uid: "iconSize_slice",
              displayName: t.fp_iconSize,
              control: {
                type: FormattingComponent.NumUpDown,
                properties: {
                  descriptor: { objectName: "iconSettings", propertyName: "iconSize" },
                  value: f.iconSize,
                  options: {
                    minValue: { type: ValidatorType.Min, value: 10 },
                    maxValue: { type: ValidatorType.Max, value: 28 }
                  }
                }
              }
            },
            {
              uid: "clearBtnSize_slice",
              displayName: t.fp_clearBtnSize,
              control: {
                type: FormattingComponent.NumUpDown,
                properties: {
                  descriptor: { objectName: "iconSettings", propertyName: "clearBtnSize" },
                  value: f.clearBtnSize,
                  options: {
                    minValue: { type: ValidatorType.Min, value: 10 },
                    maxValue: { type: ValidatorType.Max, value: 28 }
                  }
                }
              }
            }
          ]
        }
      ]
    };

    const dropdownCard: FormattingCard = {
      uid: "dropdown_card",
      displayName: t.fp_dropdown,
      revertToDefaultDescriptors: [
        { objectName: "dropdown", propertyName: "headerColor" },
        { objectName: "dropdown", propertyName: "headerTextColor" },
        { objectName: "dropdown", propertyName: "groupLabelColor" },
        { objectName: "dropdown", propertyName: "itemHoverColor" },
        { objectName: "dropdown", propertyName: "matchTextColor" },
        { objectName: "dropdown", propertyName: "maxResults" },
        { objectName: "dropdown", propertyName: "dropdownMaxHeight" },
        { objectName: "dropdown", propertyName: "itemFontSize" },
        { objectName: "dropdown", propertyName: "itemFontFamily" },
        { objectName: "dropdown", propertyName: "groupLabelFontSize" },
        { objectName: "dropdown", propertyName: "headerFontSize" },
        { objectName: "dropdown", propertyName: "headerHeight" }
      ],
      groups: [
        {
          uid: "dropdown_colors_group",
          displayName: t.fp_colors,
          slices: [
            {
              uid: "headerColor_slice",
              displayName: t.fp_headerBg,
              control: {
                type: FormattingComponent.ColorPicker,
                properties: {
                  descriptor: { objectName: "dropdown", propertyName: "headerColor" },
                  value: { value: f.headerColor }
                }
              }
            },
            {
              uid: "headerTextColor_slice",
              displayName: t.fp_headerTextColor,
              control: {
                type: FormattingComponent.ColorPicker,
                properties: {
                  descriptor: { objectName: "dropdown", propertyName: "headerTextColor" },
                  value: { value: f.headerTextColor }
                }
              }
            },
            {
              uid: "groupLabelColor_slice",
              displayName: t.fp_groupLabelColor,
              control: {
                type: FormattingComponent.ColorPicker,
                properties: {
                  descriptor: { objectName: "dropdown", propertyName: "groupLabelColor" },
                  value: { value: f.groupLabelColor }
                }
              }
            },
            {
              uid: "itemHoverColor_slice",
              displayName: t.fp_itemHoverBg,
              control: {
                type: FormattingComponent.ColorPicker,
                properties: {
                  descriptor: { objectName: "dropdown", propertyName: "itemHoverColor" },
                  value: { value: f.itemHoverColor }
                }
              }
            },
            {
              uid: "matchTextColor_slice",
              displayName: t.fp_matchHighlight,
              control: {
                type: FormattingComponent.ColorPicker,
                properties: {
                  descriptor: { objectName: "dropdown", propertyName: "matchTextColor" },
                  value: { value: f.matchTextColor }
                }
              }
            }
          ]
        },
        {
          uid: "dropdown_options_group",
          displayName: t.fp_options,
          slices: [
            {
              uid: "maxResults_slice",
              displayName: t.fp_maxResults,
              control: {
                type: FormattingComponent.NumUpDown,
                properties: {
                  descriptor: { objectName: "dropdown", propertyName: "maxResults" },
                  value: f.maxResults,
                  options: {
                    minValue: { type: ValidatorType.Min, value: 1 },
                    maxValue: { type: ValidatorType.Max, value: 50 }
                  }
                }
              }
            },
            {
              uid: "dropdownMaxHeight_slice",
              displayName: t.fp_dropdownMaxHeight,
              control: {
                type: FormattingComponent.NumUpDown,
                properties: {
                  descriptor: { objectName: "dropdown", propertyName: "dropdownMaxHeight" },
                  value: f.dropdownMaxHeight,
                  options: {
                    minValue: { type: ValidatorType.Min, value: 100 }
                  }
                }
              }
            },
            {
              uid: "itemFontSize_slice",
              displayName: t.fp_itemFontSize,
              control: {
                type: FormattingComponent.NumUpDown,
                properties: {
                  descriptor: { objectName: "dropdown", propertyName: "itemFontSize" },
                  value: f.itemFontSize,
                  options: {
                    minValue: { type: ValidatorType.Min, value: 8 },
                    maxValue: { type: ValidatorType.Max, value: 20 }
                  }
                }
              }
            },
            {
              uid: "itemFontFamily_slice",
              displayName: t.fp_itemFontFamily,
              control: {
                type: FormattingComponent.FontPicker,
                properties: {
                  descriptor: { objectName: "dropdown", propertyName: "itemFontFamily" },
                  value: f.itemFontFamily
                }
              }
            },
            {
              uid: "groupLabelFontSize_slice",
              displayName: t.fp_groupLabelFontSize,
              control: {
                type: FormattingComponent.NumUpDown,
                properties: {
                  descriptor: { objectName: "dropdown", propertyName: "groupLabelFontSize" },
                  value: f.groupLabelFontSize,
                  options: {
                    minValue: { type: ValidatorType.Min, value: 8 },
                    maxValue: { type: ValidatorType.Max, value: 16 }
                  }
                }
              }
            },
            {
              uid: "headerFontSize_slice",
              displayName: t.fp_headerFontSize,
              control: {
                type: FormattingComponent.NumUpDown,
                properties: {
                  descriptor: { objectName: "dropdown", propertyName: "headerFontSize" },
                  value: f.headerFontSize,
                  options: {
                    minValue: { type: ValidatorType.Min, value: 8 },
                    maxValue: { type: ValidatorType.Max, value: 18 }
                  }
                }
              }
            },
            {
              uid: "headerHeight_slice",
              displayName: t.fp_headerHeight,
              control: {
                type: FormattingComponent.NumUpDown,
                properties: {
                  descriptor: { objectName: "dropdown", propertyName: "headerHeight" },
                  value: f.headerHeight,
                  options: {
                    minValue: { type: ValidatorType.Min, value: 16 },
                    maxValue: { type: ValidatorType.Max, value: 60 }
                  }
                }
              }
            }
          ]
        }
      ]
    };

    const tagsCard: FormattingCard = {
      uid: "tags_card",
      displayName: t.fp_filterTags,
      revertToDefaultDescriptors: [
        { objectName: "tags", propertyName: "tagColor" },
        { objectName: "tags", propertyName: "tagTextColor" },
        { objectName: "tags", propertyName: "tagFontSize" },
        { objectName: "tags", propertyName: "showFieldName" }
      ],
      groups: [
        {
          uid: "tags_group",
          displayName: t.fp_tags,
          slices: [
            {
              uid: "tagColor_slice",
              displayName: t.fp_tagBg,
              control: {
                type: FormattingComponent.ColorPicker,
                properties: {
                  descriptor: { objectName: "tags", propertyName: "tagColor" },
                  value: { value: f.tagColor }
                }
              }
            },
            {
              uid: "tagTextColor_slice",
              displayName: t.fp_tagTextColor,
              control: {
                type: FormattingComponent.ColorPicker,
                properties: {
                  descriptor: { objectName: "tags", propertyName: "tagTextColor" },
                  value: { value: f.tagTextColor }
                }
              }
            },
            {
              uid: "tagFontSize_slice",
              displayName: t.fp_tagFontSize,
              control: {
                type: FormattingComponent.NumUpDown,
                properties: {
                  descriptor: { objectName: "tags", propertyName: "tagFontSize" },
                  value: f.tagFontSize,
                  options: {
                    minValue: { type: ValidatorType.Min, value: 8 },
                    maxValue: { type: ValidatorType.Max, value: 20 }
                  }
                }
              }
            },
            {
              uid: "showFieldName_slice",
              displayName: t.fp_showFieldName,
              control: {
                type: FormattingComponent.ToggleSwitch,
                properties: {
                  descriptor: { objectName: "tags", propertyName: "showFieldName" },
                  value: f.showFieldName
                }
              }
            }
          ]
        }
      ]
    };

    const configCard: FormattingCard = {
      uid: "config_card",
      displayName: t.fp_searchConfig,
      revertToDefaultDescriptors: [
        { objectName: "searchConfig", propertyName: "searchMode" },
        { objectName: "searchConfig", propertyName: "ignoreAccents" },
        { objectName: "searchConfig", propertyName: "caseSensitive" },
        { objectName: "searchConfig", propertyName: "showDiagnostics" }
      ],
      groups: [
        {
          uid: "config_search_group",
          displayName: t.fp_searchBehavior,
          slices: [
            {
              uid: "searchMode_slice",
              displayName: t.fp_searchMode,
              control: {
                type: FormattingComponent.Dropdown,
                properties: {
                  descriptor: { objectName: "searchConfig", propertyName: "searchMode" },
                  value: f.searchMode
                }
              }
            },
            {
              uid: "ignoreAccents_slice",
              displayName: t.fp_ignoreAccents,
              control: {
                type: FormattingComponent.ToggleSwitch,
                properties: {
                  descriptor: { objectName: "searchConfig", propertyName: "ignoreAccents" },
                  value: f.ignoreAccents
                }
              }
            },
            {
              uid: "caseSensitive_slice",
              displayName: t.fp_caseSensitive,
              control: {
                type: FormattingComponent.ToggleSwitch,
                properties: {
                  descriptor: { objectName: "searchConfig", propertyName: "caseSensitive" },
                  value: f.caseSensitive
                }
              }
            }
          ]
        },
        {
          uid: "config_diag_group",
          displayName: t.fp_diagnostics,
          slices: [
            {
              uid: "showDiagnostics_slice",
              displayName: t.fp_showDiagnostics,
              control: {
                type: FormattingComponent.ToggleSwitch,
                properties: {
                  descriptor: { objectName: "searchConfig", propertyName: "showDiagnostics" },
                  value: f.showDiagnostics
                }
              }
            }
          ]
        }
      ]
    };

    return { cards: [appearanceCard, searchBoxCard, iconCard, dropdownCard, tagsCard, configCard] };
  }

  // ── Destructor ────────────────────────────────
  public destroy(): void {
    this.stopPlaceholderRotation();
    this.container.innerHTML = '';
  }
}
