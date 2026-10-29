// PokeXDD — roda no mundo da página (MAIN) do pokeidle.io.
// Só ESCUTA as mensagens que o servidor já manda para o jogo. A única coisa que envia são
// consultas de leitura do mercado (as mesmas do botão Refresh), e só se você ligar o vigia.
(() => {
  'use strict';
  if (window.__picCarregado) return;
  window.__picCarregado = true;

  const TAG = '__pic';
  const VERSAO = '1.3.0';
  const ICONE = 'data:image/png;base64,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';

  /* ============================================================
   * TIPOS
   * ============================================================ */
  const TIPOS = ['NORMAL', 'FIRE', 'WATER', 'ELECTRIC', 'GRASS', 'ICE', 'FIGHTING', 'POISON', 'GROUND',
    'FLYING', 'PSYCHIC', 'BUG', 'ROCK', 'GHOST', 'DRAGON', 'DARK', 'STEEL', 'FAIRY'];
  const NOME_TIPO = {
    NORMAL: 'Normal', FIRE: 'Fogo', WATER: 'Água', ELECTRIC: 'Elétrico', GRASS: 'Planta', ICE: 'Gelo',
    FIGHTING: 'Lutador', POISON: 'Veneno', GROUND: 'Terra', FLYING: 'Voador', PSYCHIC: 'Psíquico', BUG: 'Inseto',
    ROCK: 'Pedra', GHOST: 'Fantasma', DRAGON: 'Dragão', DARK: 'Sombrio', STEEL: 'Aço', FAIRY: 'Fada',
  };
  const COR_TIPO = {
    NORMAL: '#9fa19f', FIRE: '#e62829', WATER: '#2980ef', ELECTRIC: '#fac000', GRASS: '#3fa129', ICE: '#3dcef3',
    FIGHTING: '#ff8000', POISON: '#9141cb', GROUND: '#915121', FLYING: '#81b9ef', PSYCHIC: '#ef4179', BUG: '#91a119',
    ROCK: '#afa981', GHOST: '#704170', DRAGON: '#5060e1', DARK: '#624d4e', STEEL: '#60a1b8', FAIRY: '#ef70ef',
  };
  const PT_PARA_TIPO = Object.fromEntries(Object.entries(NOME_TIPO).map(([k, v]) => [semAcento(v).toUpperCase(), k]));
  function semAcento(s) { return String(s).normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  function normTipo(x) {
    if (!x) return null;
    const s = semAcento(typeof x === 'object' ? (x.tipo ?? x.type ?? x.nome ?? '') : x).trim().toUpperCase();
    if (TIPOS.includes(s)) return s;
    return PT_PARA_TIPO[s] ?? null;
  }
  // A diagonal do jogo (shared/tipo-efetividade.mjs).
  const DIAGONAL = { FIRE: 0.5, WATER: 0.5, ELECTRIC: 0.5, GRASS: 0.5, ICE: 0.5, POISON: 0.5, PSYCHIC: 0.5, DARK: 0.5, STEEL: 0.5, GHOST: 2, DRAGON: 2 };
  // Tabela padrão, usada só até o jogo mandar a dele no welcome.
  const TABELA_PADRAO = {
    NORMAL: { ROCK: 0.5, GHOST: 0, STEEL: 0.5 },
    FIRE: { WATER: 0.5, GRASS: 2, ICE: 2, BUG: 2, ROCK: 0.5, DRAGON: 0.5, STEEL: 2 },
    WATER: { FIRE: 2, GRASS: 0.5, GROUND: 2, ROCK: 2, DRAGON: 0.5 },
    ELECTRIC: { WATER: 2, GRASS: 0.5, GROUND: 0, FLYING: 2, DRAGON: 0.5 },
    GRASS: { FIRE: 0.5, WATER: 2, POISON: 0.5, GROUND: 2, FLYING: 0.5, BUG: 0.5, ROCK: 2, DRAGON: 0.5, STEEL: 0.5 },
    ICE: { FIRE: 0.5, WATER: 0.5, GRASS: 2, GROUND: 2, FLYING: 2, DRAGON: 2, STEEL: 0.5 },
    FIGHTING: { NORMAL: 2, ICE: 2, POISON: 0.5, FLYING: 0.5, PSYCHIC: 0.5, BUG: 0.5, ROCK: 2, GHOST: 0, DARK: 2, STEEL: 2, FAIRY: 0.5 },
    POISON: { GRASS: 2, GROUND: 0.5, ROCK: 0.5, GHOST: 0.5, STEEL: 0, FAIRY: 2 },
    GROUND: { FIRE: 2, ELECTRIC: 2, GRASS: 0.5, POISON: 2, FLYING: 0, BUG: 0.5, ROCK: 2, STEEL: 2 },
    FLYING: { ELECTRIC: 0.5, GRASS: 2, FIGHTING: 2, BUG: 2, ROCK: 0.5, STEEL: 0.5 },
    PSYCHIC: { FIGHTING: 2, POISON: 2, DARK: 0, STEEL: 0.5 },
    BUG: { FIRE: 0.5, GRASS: 2, FIGHTING: 0.5, POISON: 0.5, FLYING: 0.5, PSYCHIC: 2, GHOST: 0.5, DARK: 2, STEEL: 0.5, FAIRY: 0.5 },
    ROCK: { FIRE: 2, ICE: 2, FIGHTING: 0.5, GROUND: 0.5, FLYING: 2, BUG: 2, STEEL: 0.5 },
    GHOST: { NORMAL: 0, PSYCHIC: 2, DARK: 0.5 },
    DRAGON: { STEEL: 0.5, FAIRY: 0 },
    DARK: { FIGHTING: 0.5, PSYCHIC: 2, GHOST: 2, FAIRY: 0.5 },
    STEEL: { FIRE: 0.5, WATER: 0.5, ELECTRIC: 0.5, ICE: 2, ROCK: 2, FAIRY: 2 },
    FAIRY: { FIRE: 0.5, FIGHTING: 2, POISON: 0.5, DRAGON: 2, DARK: 2, STEEL: 0.5 },
  };
  function multTipo(atq, def) {
    if (!atq || !def) return 1;
    if (atq === def) return DIAGONAL[atq] ?? 1;
    // A linha do jogo quando ele mandou; a padrão para qualquer tipo que não veio.
    const linha = S.tabelaTipos?.[atq] ?? TABELA_PADRAO[atq] ?? {};
    const v = linha[def] ?? linha[def.toLowerCase()];
    return v == null ? 1 : Number(v);
  }
  function efetividade(atq, d1, d2) {
    let v = multTipo(atq, d1);
    if (d2 && d2 !== d1) v *= multTipo(atq, d2);
    return v;
  }

  /* ============================================================
   * ESTADO
   * ============================================================ */
  const S = {
    ws: null,
    eu: null,
    mesclar: null,
    tabelaTipos: null,
    catalogoBolas: [],
    especies: new Map(),
    especiePorNome: new Map(),
    itens: new Map(),
    chanceShiny: 0,
    shinyLooks: {},
    shinyLooksOutland: {},
    contagemMsgs: {},
    ultimaAbaMercado: null,
    pendenteItens: false,
    pendenteEspecie: null,
    resolverEspecie: null,
    carregado: false,
    store: {
      config: {
        alertaShiny: true,
        alertaEspecies: true,
        som: true,
        notificacao: true,
        vigiaAuto: false,
        vigiaMin: 5,
      },
      vigiaCaptura: [], // legado (v1.2): migrado para regrasAlerta
      regrasAlerta: [], // [{id, speciesId|null, nome, minP, minIV, minQ, minN, soShiny, ativo, disparos}]
      vigiaMercado: [], // [{chave, tipo:'pokemon'|'item', id, nome, alvoGold, alvoOrb}]
      mercado: {}, // chave -> {ultimo:{t, anuncios, minGold, minOrb}, menorGold, menorOrb, hist:[[t, minGold, minOrb, anuncios]]}
      progresso: [], // [{t, level, xp, gold, orbs, diamonds, dex, pks}]
      sessao: null,
      sessoesAntigas: [],
      ritmo: [], // [[t, xp, gold]] a cada 30 s, últimas 6 h
      alertas: [], // [{t, titulo, corpo}]
      ultimaVigia: 0,
    },
    ui: { aberto: false, aba: 'hunt', host: null, root: null, corpo: null, toasts: null, filtros: {} },
  };

  /* ============================================================
   * PONTE COM A EXTENSÃO
   * ============================================================ */
  const paraExt = (payload) => window.postMessage({ [TAG]: 'toExt', ...payload }, location.origin);
  const salvar = (chave) => paraExt({ op: 'save', key: chave, value: S.store[chave] });
  const salvarDepois = (() => {
    const timers = {};
    return (chave, ms = 1500) => {
      clearTimeout(timers[chave]);
      timers[chave] = setTimeout(() => salvar(chave), ms);
    };
  })();

  window.addEventListener('message', (ev) => {
    if (ev.source !== window || ev.origin !== location.origin) return;
    const m = ev.data;
    if (!m || m[TAG] !== 'toPage') return;
    if (m.op === 'load' && !S.carregado) {
      const d = m.data || {};
      for (const k of Object.keys(S.store)) {
        if (d[k] == null) continue;
        if (k === 'config') Object.assign(S.store.config, d.config);
        else S.store[k] = d[k];
      }
      S.carregado = true;
      // Migração da v1.2: as espécies marcadas viram regras sem filtro.
      if (S.store.vigiaCaptura?.length && !S.store.regrasAlerta.length) {
        S.store.regrasAlerta = S.store.vigiaCaptura.map((v) => novaRegra({ speciesId: v.speciesId, nome: v.nome }));
        S.store.vigiaCaptura = [];
        salvar('regrasAlerta');
        salvar('vigiaCaptura');
      }
      renderizar();
    }
  });
  paraExt({ op: 'hello' });

  /* ============================================================
   * ESCUTA DO WEBSOCKET
   * ============================================================ */
  const WSNativo = window.WebSocket;
  class WSEspiao extends WSNativo {
    constructor(url, protocolos) {
      super(url, protocolos);
      try {
        const u = new URL(String(url), location.href);
        if (u.host === location.host) {
          S.ws = this;
          S.mesclar = criarMesclador();
          this.addEventListener('message', (ev) => {
            if (typeof ev.data !== 'string') return;
            let m;
            try { m = JSON.parse(ev.data); } catch { return; }
            try { aoReceber(m); } catch (err) { console.warn('[PokeXDD]', err); }
          });
        }
      } catch (_) { /* nunca quebra o jogo */ }
    }
  }
  window.WebSocket = WSEspiao;

  // Cópia da remontagem de estado do jogo (shared/estado-delta.mjs).
  function criarMesclador() {
    let campos = null;
    let pokemons = new Map();
    const montar = () => ({ ...campos, pokemons: [...pokemons.values()] });
    return (parcial) => {
      if (!parcial) return campos ? montar() : null;
      const { cheio, pokemons: lista, pkMud, pkFora, dexMud, dexFora, ...resto } = parcial;
      if (cheio || !campos) {
        campos = resto;
        pokemons = new Map((lista ?? []).map((k) => [k.id, k]));
        return montar();
      }
      Object.assign(campos, resto);
      if (lista) pokemons = new Map(lista.map((k) => [k.id, k]));
      for (const k of pkMud ?? []) pokemons.set(k.id, k);
      for (const id of pkFora ?? []) pokemons.delete(id);
      if (dexMud || dexFora) {
        campos.pokedex = { ...(campos.pokedex ?? {}), ...(dexMud ?? {}) };
        for (const ch of dexFora ?? []) delete campos.pokedex[ch];
      }
      return montar();
    };
  }

  function enviarAoJogo(obj) {
    if (!S.ws || S.ws.readyState !== 1) return false;
    try {
      WSNativo.prototype.send.call(S.ws, JSON.stringify(obj));
      return true;
    } catch { return false; }
  }

  function aoReceber(m) {
    if (!m || typeof m.t !== 'string') return;
    S.contagemMsgs[m.t] = (S.contagemMsgs[m.t] || 0) + 1;
    switch (m.t) {
      case 'welcome':
        if (m.tabelaTipos && typeof m.tabelaTipos === 'object') S.tabelaTipos = normalizarTabela(m.tabelaTipos);
        if (Array.isArray(m.catalogoBolas)) S.catalogoBolas = m.catalogoBolas;
        if (m.chanceShiny) S.chanceShiny = Number(m.chanceShiny) || 0;
        if (m.shinyLooks && typeof m.shinyLooks === 'object') S.shinyLooks = m.shinyLooks;
        if (m.shinyLooksOutland && typeof m.shinyLooksOutland === 'object') S.shinyLooksOutland = m.shinyLooksOutland;
        for (const i of m.itensNossos ?? []) if (i && i.id != null) S.itens.set(Number(i.id), i);
        S.mesclar = criarMesclador();
        if (m.estado) aoEstado(S.mesclar(m.estado));
        break;
      case 'estado':
        if (m.estado && S.mesclar) aoEstado(S.mesclar(m.estado));
        break;
      case 'orbs':
        if (S.eu && m.saldo != null) S.eu.orbs = m.saldo;
        break;
      case 'batalha':
        for (const e of m.ev ?? []) aoEvento(e);
        break;
      case 'market':
        aoMercado(m);
        break;
      default:
        break;
    }
  }

  function normalizarTabela(tab) {
    const out = {};
    for (const [a, linha] of Object.entries(tab)) {
      const ka = normTipo(a);
      if (!ka || !linha || typeof linha !== 'object') continue;
      out[ka] = {};
      for (const [d, v] of Object.entries(linha)) {
        const kd = normTipo(d);
        if (kd) out[ka][kd] = Number(v);
      }
    }
    return out;
  }

  /* ============================================================
   * CATÁLOGOS (espécies e itens) — os mesmos JSONs que o jogo lê
   * ============================================================ */
  async function carregarCatalogos() {
    const arquivos = ['creatures.json', 'creatures-novos.json', 'creatures-outland-novos.json'];
    for (const arq of arquivos) {
      try {
        const j = await fetch('/assets/' + arq).then((r) => r.json());
        const lista = Array.isArray(j) ? j : j.creatures ?? [];
        for (const c of lista) {
          if (!c || c.pokeId == null) continue;
          S.especies.set(Number(c.pokeId), c);
          S.especiePorNome.set(String(c.name).toLowerCase(), c);
        }
      } catch (_) { /* segue sem */ }
    }
    try {
      const j = await fetch('/assets/items.json').then((r) => r.json());
      for (const i of j.items ?? (Array.isArray(j) ? j : [])) {
        if (i && i.id != null && !S.itens.has(Number(i.id))) S.itens.set(Number(i.id), i);
      }
    } catch (_) { /* segue sem */ }
    NOTA.resetar();
    renderizar();
  }

  const PREFIXOS_FORMA = /^(mega|brave|furious|ancient|hard|magma|shiny|gigantamax|alolan|galarian)\s+/i;
  function especieDe(p) {
    if (!p) return null;
    const id = Number(p.speciesId ?? p.pokeId ?? p.especieId);
    if (id && S.especies.has(id)) return S.especies.get(id);
    let nome = String(p.nome ?? p.name ?? '').toLowerCase();
    if (S.especiePorNome.has(nome)) return S.especiePorNome.get(nome);
    while (PREFIXOS_FORMA.test(nome)) {
      nome = nome.replace(PREFIXOS_FORMA, '');
      if (S.especiePorNome.has(nome)) return S.especiePorNome.get(nome);
    }
    return null;
  }
  function tiposDe(p) {
    const proprios = Array.isArray(p?.tipos) ? p.tipos.map(normTipo).filter(Boolean) : [];
    if (proprios.length) return [...new Set(proprios)].slice(0, 2);
    const esp = especieDe(p) ?? p;
    return [normTipo(esp?.type1), normTipo(esp?.type2)].filter(Boolean);
  }
  /* ---------------- SPRITES (os mesmos atlas do jogo) ---------------- */
  const PACK = '/assets/asset-packs';
  const VAZIO = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
  const SPR = { indice: null, url: new Map(), pend: new Map() };
  const localizar = (c) => String(c).replace(/^\/assets-packs/, PACK);
  function lookDe(p) {
    if (!p) return null;
    const esp = especieDe(p);
    const base = esp?.looktype ?? p.looktype ?? null;
    if (!p.shiny) return base;
    const id = esp?.pokeId ?? p.speciesId;
    return S.shinyLooksOutland?.[id] ?? S.shinyLooks?.[id] ?? p.lookShiny ?? p.looktype ?? base;
  }
  function urlDoSprite(lt) {
    if (lt == null) return Promise.resolve(null);
    const k = String(lt);
    if (SPR.url.has(k)) return Promise.resolve(SPR.url.get(k));
    if (SPR.pend.has(k)) return SPR.pend.get(k);
    const pr = (async () => {
      SPR.indice ??= fetch(`${PACK}/outfits-index.json`).then((r) => r.json()).then((j) => j.outfits ?? {});
      const entrada = (await SPR.indice)[k];
      if (!entrada) return null;
      const man = await fetch(localizar(entrada.manifest)).then((r) => r.json());
      const cat = Object.values(man.categories ?? {})[0];
      if (!cat) return null;
      // Primeiro quadro, olhando para a frente (direção 3 = sul).
      let melhor = null;
      for (const [chave, a] of Object.entries(man.assets ?? {})) {
        const stem = chave.split('/').pop().replace(/\.png$/, '');
        if (stem.endsWith('_template') || !a.frames?.[0]) continue;
        const n = stem.split('_').map(Number);
        if (n[0] !== 1) continue;
        const nota = (n[3] === 3 ? 0 : 10) + (n[1] || 0) + (n[2] || 0);
        if (!melhor || nota < melhor.nota) melhor = { nota, f: a.frames[0] };
      }
      if (!melhor) return null;
      const pg = cat.pages[melhor.f.page ?? 0];
      const img = await new Promise((ok, erro) => { const i = new Image(); i.onload = () => ok(i); i.onerror = erro; i.src = localizar(pg.image); });
      const { x, y, w, h } = melhor.f;
      const cv = document.createElement('canvas');
      cv.width = w; cv.height = h;
      const g = cv.getContext('2d', { willReadFrequently: true });
      g.drawImage(img, x, y, w, h, 0, 0, w, h);
      // Recorta o que é transparente para o bicho ocupar a caixa inteira.
      const d = g.getImageData(0, 0, w, h).data;
      let x0 = w, y0 = h, x1 = -1, y1 = -1;
      for (let yy = 0; yy < h; yy++) for (let xx = 0; xx < w; xx++) {
        if (d[(yy * w + xx) * 4 + 3] > 24) { if (xx < x0) x0 = xx; if (xx > x1) x1 = xx; if (yy < y0) y0 = yy; if (yy > y1) y1 = yy; }
      }
      if (x1 < 0) return null;
      const lado = Math.max(x1 - x0 + 1, y1 - y0 + 1) + 2;
      const out = document.createElement('canvas');
      out.width = lado; out.height = lado;
      out.getContext('2d').drawImage(cv, x0, y0, x1 - x0 + 1, y1 - y0 + 1,
        Math.floor((lado - (x1 - x0 + 1)) / 2), lado - (y1 - y0 + 1) - 1, x1 - x0 + 1, y1 - y0 + 1);
      return out.toDataURL();
    })().catch(() => null).then((u) => { SPR.url.set(k, u); SPR.pend.delete(k); return u; });
    SPR.pend.set(k, pr);
    return pr;
  }
  const imgSprite = (lt, px, cls = '') =>
    `<img class="spr ${cls}" data-look="${esc(lt ?? '')}" src="${esc(SPR.url.get(String(lt)) || VAZIO)}" width="${px}" height="${px}" alt="">`;
  function hidratarSprites(raiz) {
    raiz.querySelectorAll('img[data-look]').forEach((img) => {
      const lt = img.dataset.look;
      if (!lt) { img.classList.add('sem'); return; }
      const pronto = SPR.url.get(lt);
      if (pronto) { img.src = pronto; return; }
      if (SPR.url.has(lt)) { img.classList.add('sem'); return; }
      urlDoSprite(lt).then((u) => { if (u) img.src = u; else img.classList.add('sem'); });
    });
  }

  const nomeEspecie = (id) => S.especies.get(Number(id))?.name ?? `#${id}`;
  const nomeItem = (id) => S.itens.get(Number(id))?.name ?? `Item #${id}`;
  const nomeBola = (id) => S.catalogoBolas.find((b) => b.id === id)?.nome ?? S.itens.get(Number(id))?.name ?? `Ball #${id}`;
  const precoBola = (id) => Number(S.catalogoBolas.find((b) => b.id === id)?.priceGold) || 0;
  /* ---------------- NOTA (N) — cópia de shared/nota-pokemon.mjs + linhagem-nota.mjs do jogo ---------------- */
  const NOTA = (() => {
    const IV_MIN = 6, IV_MAX = 192, Q_MIN = 0.8, Q_MAX = 1.8, P_MIN = 1, P_MAX = 5;
    const CHAVES = ['hp', 'atk', 'def', 'spAtk', 'spDef', 'speed'];
    const EXPO = { hp: 0.95, atk: 0.8, def: 0.8, spAtk: 0.8, spDef: 0.8, speed: 0.95 };
    const BONUS_P = [0, 0.05, 0.1, 0.25, 1];
    const REF = { hp: 80, atk: 80, def: 80, spAtk: 80, spDef: 80, speed: 80 };
    const lim = (v, a, b) => Math.min(b, Math.max(a, v));
    const multNasc = (p, shiny) => (1 + (BONUS_P[(Math.round(p) || 1) - 1] ?? 0)) * (shiny ? 3 : 1);
    function ivsDeSoma(soma) {
      const s = lim(Math.round(Number(soma) || IV_MIN), IV_MIN, IV_MAX);
      const med = Math.floor(s / 6);
      const ivs = Object.fromEntries(CHAVES.map((k) => [k, med]));
      for (let i = 0; i < s - med * 6; i++) ivs[CHAVES[i % 6]]++;
      return ivs;
    }
    const basesDe = (b) => (b ? {
      hp: b.hp ?? b.baseHp ?? 80, atk: b.atk ?? b.baseAtk ?? 80, def: b.def ?? b.baseDef ?? 80,
      spAtk: b.spAtk ?? b.baseSpAtk ?? 80, spDef: b.spDef ?? b.baseSpDef ?? 80, speed: b.speed ?? b.baseSpeed ?? 80,
    } : REF);
    function soma({ iv, ivs, qualidade, potencia, shiny = false, bases }) {
      const b = basesDe(bases);
      const v = ivs ?? ivsDeSoma(iv);
      const q = lim(Number(qualidade) || 1, Q_MIN, Q_MAX);
      const p = lim(Math.round(Number(potencia) || P_MIN), P_MIN, P_MAX);
      const m = multNasc(p, shiny);
      let s = 0;
      for (const k of CHAVES) s += Math.round((b[k] + 2 * (Number(v[k]) || 1)) * (q ** EXPO[k]) * m);
      return s;
    }
    function limitesForca(bases) {
      const min = soma({ iv: IV_MIN, qualidade: Q_MIN, potencia: P_MIN, bases });
      const max = soma({ iv: IV_MAX, qualidade: Q_MAX, potencia: P_MAX, shiny: true, bases });
      return { min: Math.max(1, min), max: Math.max(min + 1, max) };
    }
    const LIM_REF = limitesForca(null);
    function notaDeForca(s, l) {
      const v = lim(Number(s) || l.min, l.min, l.max);
      if (l.max <= l.min) return 0;
      const bruta = (10 * (Math.log(Math.max(1, v)) - Math.log(l.min))) / (Math.log(l.max) - Math.log(l.min));
      return Math.round(lim(bruta, 0, 10) * 1000) / 1000;
    }
    const score = (args) => lim(notaDeForca(soma({ iv: IV_MIN, qualidade: Q_MIN, potencia: P_MIN, ...args }), LIM_REF) / 10, 0, 1);
    function limitesScore(bases) {
      const min = score({ iv: IV_MIN, qualidade: Q_MIN, potencia: P_MIN, bases });
      const max = score({ iv: IV_MAX, qualidade: Q_MAX, potencia: P_MAX, shiny: true, bases });
      return { min, max: Math.max(min, max) };
    }
    function notaDeScore(s, { min, max }) {
      const v = lim(Number(s) || min, min, max);
      if (max <= min) return 0;
      return Math.round(((10 * (v - min)) / (max - min)) * 1000) / 1000;
    }
    // Ancestrais pela cadeia `evolvesToId` (a do jogo também segue ramificações; aqui é a cadeia simples).
    let paisDe = null;
    function ancestrais(esp) {
      if (!paisDe) {
        paisDe = new Map();
        for (const e of S.especies.values()) {
          if (e.evolvesToId && e.evolvesToId !== e.pokeId) {
            if (!paisDe.has(e.evolvesToId)) paisDe.set(e.evolvesToId, new Set());
            paisDe.get(e.evolvesToId).add(e.pokeId);
          }
        }
      }
      const out = [];
      const vistos = new Set([esp.pokeId]);
      let camada = [...(paisDe.get(esp.pokeId) ?? [])];
      for (let passos = 1; passos <= 12 && camada.length; passos++) {
        const prox = [];
        for (const id of camada) {
          if (vistos.has(id)) continue;
          vistos.add(id);
          const e = S.especies.get(id);
          if (e && ['baseHp', 'baseAtk', 'baseDef', 'baseSpAtk', 'baseSpDef', 'baseSpeed'].every((k) => Number(e[k]) > 0)) out.push({ bases: e, passos });
          for (const pai of paisDe.get(id) ?? []) prox.push(pai);
        }
        camada = prox;
      }
      return out;
    }
    function notaDePokemon(pk) {
      if (!pk) return null;
      if (Number.isFinite(Number(pk.nota)) && pk.nota !== null) return Number(pk.nota);
      const iv = pk.iv ?? pk.ivTotal ?? (pk.ivs ? Object.values(pk.ivs).reduce((s, v) => s + (Number(v) || 0), 0) : null);
      if (iv == null || !Number.isFinite(Number(iv))) return null;
      const esp = especieDe(pk);
      const r = pk.refino || {};
      const bases = esp ? {
        hp: (esp.baseHp ?? 0) + (Number(r.hp) || 0), atk: (esp.baseAtk ?? 0) + (Number(r.atk) || 0),
        def: (esp.baseDef ?? 0) + (Number(r.def) || 0), spAtk: (esp.baseSpAtk ?? 0) + (Number(r.spAtk) || 0),
        spDef: (esp.baseSpDef ?? 0) + (Number(r.spDef) || 0), speed: esp.baseSpeed ?? 0,
      } : null;
      const args = {
        iv: Math.round(Number(iv)), ivs: pk.ivs, qualidade: Number(pk.quality ?? pk.qualidade) || 1,
        potencia: lim(Number(pk.potencia) || 1, P_MIN, P_MAX), shiny: !!pk.shiny,
      };
      let n = notaDeScore(score({ ...args, bases }), limitesScore(esp ?? null));
      for (const { bases: b, passos } of esp ? ancestrais(esp) : []) {
        const na = notaDeScore(score({ ...args, bases: b }), limitesScore(b));
        const piso = Math.min(10, na + (Number(passos) || 1) * 0.1);
        if (piso > n) n = piso;
      }
      return Math.round(n * 1000) / 1000;
    }
    return { notaDePokemon, resetar: () => { paisDe = null; } };
  })();
  const notaDe = (p) => NOTA.notaDePokemon(p);

  function ivTotal(p) {
    if (!p) return null;
    const direto = p.ivTotal ?? p.iv;
    if (Number.isFinite(Number(direto)) && direto !== null && typeof direto !== 'object') return Math.round(Number(direto));
    if (p.ivs && typeof p.ivs === 'object') return Object.values(p.ivs).reduce((s, v) => s + (Number(v) || 0), 0);
    return null;
  }

  /* ============================================================
   * ESTADO DO JOGADOR + PROGRESSO
   * ============================================================ */
  let ultimoSnapshotProgresso = 0;
  function aoEstado(eu) {
    if (!eu) return;
    S.eu = eu;
    const s = S.store.sessao;
    if (s && s.goldInicio == null && Number.isFinite(Number(eu.gold))) {
      s.goldInicio = Number(eu.gold);
      s.xpInicio = Number(eu.xp) || null;
    }
    const agora = Date.now();
    const r = S.store.ritmo;
    const ult = r[r.length - 1];
    if (Number.isFinite(Number(eu.xp)) && (!ult || agora - ult[0] >= 30_000)) {
      r.push([agora, Number(eu.xp), Number(eu.gold) || 0]);
      const corte = agora - 6 * 3600_000;
      while (r.length && r[0][0] < corte) r.shift();
      salvarDepois('ritmo', 30_000);
    }
    if (agora - ultimoSnapshotProgresso > 10 * 60_000) {
      ultimoSnapshotProgresso = agora;
      registrarProgresso();
    }
  }
  function registrarProgresso() {
    const e = S.eu;
    if (!e || e.level == null) return;
    const ponto = {
      t: Date.now(),
      level: Number(e.level) || 0,
      xp: Number(e.xp) || 0,
      gold: Number(e.gold) || 0,
      orbs: Number(e.orbs) || 0,
      diamonds: Number(e.diamonds) || 0,
      dex: e.pokedex ? Object.keys(e.pokedex).length : 0,
      pks: Array.isArray(e.pokemons) ? e.pokemons.length : 0,
    };
    const lista = S.store.progresso;
    lista.push(ponto);
    // Guarda tudo das últimas 48 h e um ponto por hora antes disso (até ~1 ano).
    const corte = Date.now() - 48 * 3600_000;
    const vistos = new Set();
    S.store.progresso = lista.filter((p) => {
      if (p.t >= corte) return true;
      const hora = Math.floor(p.t / 3600_000);
      if (vistos.has(hora)) return false;
      vistos.add(hora);
      return true;
    }).slice(-9000);
    salvarDepois('progresso');
  }

  /* ============================================================
   * SESSÃO DE HUNT
   * ============================================================ */
  function sessaoNova() {
    return {
      inicio: Date.now(), ultimoEvento: 0, ativoMs: 0,
      abates: 0, xpT: 0, xpP: 0, ouro: 0, ouroLoot: 0,
      capturas: 0, shinies: 0, bolas: {}, curas: 0, revives: 0, desmaios: 0,
      drops: {}, ultimasCapturas: [],
      goldInicio: S.eu?.gold != null ? Number(S.eu.gold) : null,
      xpInicio: S.eu?.xp != null ? Number(S.eu.xp) : null,
    };
  }
  function sessao() {
    if (!S.store.sessao) S.store.sessao = sessaoNova();
    return S.store.sessao;
  }
  function encerrarSessao() {
    const s = S.store.sessao;
    if (s && (s.abates || s.capturas)) {
      S.store.sessoesAntigas.unshift(resumoSessao(s));
      S.store.sessoesAntigas = S.store.sessoesAntigas.slice(0, 40);
      salvar('sessoesAntigas');
    }
    S.store.sessao = sessaoNova();
    salvar('sessao');
  }
  function resumoSessao(s) {
    const lucro = lucroReal(s);
    return {
      inicio: s.inicio, fim: s.ultimoEvento || Date.now(), ativoMs: s.ativoMs,
      abates: s.abates, xpT: s.xpT, xpP: s.xpP, ouro: s.ouro, lucro,
      capturas: s.capturas, shinies: s.shinies, bolasGastas: totalBolas(s),
    };
  }
  const totalBolas = (s) => Object.values(s.bolas).reduce((a, b) => a + b, 0);
  const custoBolas = (s) => Object.entries(s.bolas).reduce((a, [id, n]) => a + precoBola(Number(id)) * n, 0);
  function lucroReal(s) {
    if (s.goldInicio == null || S.eu?.gold == null) return null;
    return Number(S.eu.gold) - s.goldInicio;
  }

  function aoEvento(e) {
    if (!e || !e.k) return;
    const s = sessao();
    const agora = Date.now();
    if (s.ultimoEvento && agora - s.ultimoEvento < 60_000) s.ativoMs += agora - s.ultimoEvento;
    s.ultimoEvento = agora;
    switch (e.k) {
      case 'morte':
        if (e.quem === 'selvagem') {
          if (e.safari) break;
          s.abates++;
          s.xpT += Number(e.xpTreinador ?? e.xp) || 0;
          s.xpP += Number(e.xpPokemon ?? e.xp) || 0;
          s.ouro += Number(e.ouro) || 0;
          s.ouroLoot += Number(e.ouroLoot) || 0;
          for (const d of e.drops ?? []) {
            const nome = d.nome ?? nomeItem(d.itemId);
            s.drops[nome] = (s.drops[nome] || 0) + (Number(d.qtd) || 1);
          }
        } else {
          s.desmaios++;
        }
        break;
      case 'bossMorto':
        for (const d of e.drops ?? []) {
          const nome = d.nome ?? nomeItem(d.itemId);
          s.drops[nome] = (s.drops[nome] || 0) + (Number(d.qtd) || 1);
        }
        break;
      case 'bola': {
        const id = Number(e.ballId) || 0;
        s.bolas[id] = (s.bolas[id] || 0) + 1;
        break;
      }
      case 'cura':
        s.curas++;
        break;
      case 'revive':
        s.revives++;
        break;
      case 'capturado':
        aoCapturar(s, e);
        break;
      default:
        break;
    }
    salvarDepois('sessao', 5000);
  }

  function novaRegra(r = {}) {
    return {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      speciesId: r.speciesId ?? null, nome: r.nome ?? 'Qualquer Pokémon',
      minP: Number(r.minP) || 0, minIV: Number(r.minIV) || 0, minQ: Number(r.minQ) || 0, minN: Number(r.minN) || 0,
      soShiny: !!r.soShiny, ativo: r.ativo ?? true, disparos: 0,
    };
  }
  function medidas(p) {
    return {
      p: Number(p.potencia) || 1,
      iv: ivTotal(p),
      q: Number(p.quality ?? p.qualidade) || null,
      n: notaDe(p),
      shiny: !!p.shiny,
    };
  }
  function regraBate(r, p, m) {
    if (!r.ativo) return false;
    if (r.speciesId != null && Number(r.speciesId) !== Number(p.speciesId)) return false;
    if (r.soShiny && !m.shiny) return false;
    if (r.minP && m.p < r.minP) return false;
    if (r.minIV && (m.iv == null || m.iv < r.minIV)) return false;
    if (r.minQ && (m.q == null || m.q < r.minQ)) return false;
    if (r.minN && (m.n == null || m.n < r.minN)) return false;
    return true;
  }
  const textoMedidas = (p, m) => [`Nv ${fmt(p.level)}`, `P${m.p}`, m.iv != null ? `IV ${fmt(m.iv)}` : '',
    m.q ? `Q ${m.q.toFixed(3).replace('.', ',')}` : '', m.n != null ? `N ${m.n.toFixed(3).replace('.', ',')}` : ''].filter(Boolean).join(' · ');

  function aoCapturar(s, e) {
    const p = e.pokemon ?? {};
    const m = medidas(p);
    s.capturas++;
    if (p.shiny) s.shinies++;
    s.ultimasCapturas.unshift({
      t: Date.now(), nome: p.nome ?? nomeEspecie(p.speciesId), speciesId: p.speciesId, level: p.level, look: lookDe(p),
      shiny: !!p.shiny, quality: m.q, iv: m.iv, potencia: m.p, nota: m.n, depot: !!e.paraDepot,
    });
    s.ultimasCapturas = s.ultimasCapturas.slice(0, 30);
    const cfg = S.store.config;
    const nome = p.nome ?? nomeEspecie(p.speciesId);
    const extra = { look: lookDe(p), medidas: m, nome, speciesId: p.speciesId, level: p.level, shiny: !!p.shiny };
    const corpo = `${textoMedidas(p, m)}${e.paraDepot ? ' · foi para o Depot' : ''}`;
    if (p.shiny && cfg.alertaShiny) {
      alertar(`✨ SHINY capturado: ${nome}!`, corpo, 'shiny', extra);
      return;
    }
    if (!cfg.alertaEspecies) return;
    const bateu = S.store.regrasAlerta.filter((r) => regraBate(r, p, m));
    if (!bateu.length) return;
    for (const r of bateu) r.disparos = (r.disparos || 0) + 1;
    salvarDepois('regrasAlerta');
    const destaque = m.n != null && bateu.some((r) => r.minN) ? ` · N ${m.n.toFixed(2).replace('.', ',')}` : '';
    alertar(`🎯 ${nome}${destaque} — bateu sua regra`, corpo, 'captura', { ...extra, regra: bateu[0].id });
  }

  /* ============================================================
   * ALERTAS
   * ============================================================ */
  let audioCtx = null;
  function bipe(tipo) {
    if (!S.store.config.som) return;
    try {
      audioCtx = audioCtx || new AudioContext();
      const notas = tipo === 'shiny' ? [880, 1175, 1568, 2093] : tipo === 'mercado' ? [660, 990] : [740, 988];
      notas.forEach((f, i) => {
        const o = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        o.type = 'triangle';
        o.frequency.value = f;
        const t0 = audioCtx.currentTime + i * 0.13;
        g.gain.setValueAtTime(0.0001, t0);
        g.gain.exponentialRampToValueAtTime(0.25, t0 + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.25);
        o.connect(g).connect(audioCtx.destination);
        o.start(t0);
        o.stop(t0 + 0.3);
      });
    } catch (_) { /* sem som */ }
  }
  function alertar(titulo, corpo, tipo = 'info', extra = null) {
    S.store.alertas.unshift({ t: Date.now(), titulo, corpo, tipo, ...(extra ? { x: extra } : {}) });
    S.store.alertas = S.store.alertas.slice(0, 80);
    salvarDepois('alertas');
    bipe(tipo);
    toast(titulo, corpo, tipo);
    if (S.store.config.notificacao) paraExt({ op: 'notify', title: titulo, body: corpo });
    if (S.ui.aberto && S.ui.aba === 'alertas') renderizar();
  }

  /* ============================================================
   * MERCADO
   * ============================================================ */
  function aoMercado(m) {
    S.ultimaAbaMercado = m.aba ?? null;
    const vigia = S.store.vigiaMercado;
    if (m.aba === 'itens' && m.resumo && typeof m.resumo === 'object') {
      const nosso = S.pendenteItens;
      S.pendenteItens = false;
      for (const w of vigia.filter((x) => x.tipo === 'item')) {
        const r = m.resumo[w.id] ?? m.resumo[String(w.id)];
        if (r) atualizarPreco(w, { anuncios: Number(r.anuncios) || 0, minGold: r.minGold ?? null, minOrb: r.minOrb ?? null });
        else if (nosso) atualizarPreco(w, { anuncios: 0, minGold: null, minOrb: null });
      }
    } else if ((m.aba === 'especies' || m.aba === 'especiesFav') && Array.isArray(m.linhas)) {
      const pend = S.pendenteEspecie;
      for (const w of vigia.filter((x) => x.tipo === 'pokemon')) {
        const l = m.linhas.find((x) => Number(x.speciesId) === Number(w.id));
        if (l) atualizarPreco(w, { anuncios: Number(l.anuncios) || 0, minGold: l.minGold ?? null, minOrb: l.minOrb ?? null, shinys: l.shinys });
        else if (pend != null && Number(pend) === Number(w.id) && m.aba === 'especies') atualizarPreco(w, { anuncios: 0, minGold: null, minOrb: null });
      }
      if (pend != null && m.aba === 'especies' && S.resolverEspecie) S.resolverEspecie();
    } else if (m.aba === 'item' && m.itemId != null && Array.isArray(m.linhas)) {
      const w = vigia.find((x) => x.tipo === 'item' && Number(x.id) === Number(m.itemId));
      if (w) {
        const precos = m.linhas.map((l) => Number(l.preco)).filter((v) => v > 0);
        const min = precos.length ? Math.min(...precos) : null;
        const atual = S.store.mercado[w.chave]?.ultimo ?? {};
        atualizarPreco(w, {
          anuncios: atual.anuncios ?? m.linhas.length,
          minGold: m.moeda === 'orb' ? atual.minGold ?? null : min,
          minOrb: m.moeda === 'orb' ? min : atual.minOrb ?? null,
        });
      }
    }
  }

  function atualizarPreco(w, snap) {
    const reg = (S.store.mercado[w.chave] ??= { ultimo: null, menorGold: null, menorOrb: null, hist: [] });
    const ant = reg.ultimo;
    const agora = Date.now();
    snap.t = agora;
    // Avisos — só a partir da segunda leitura (a primeira é a base), menos o do alvo.
    const nome = w.nome;
    const fmtG = (v) => `${fmt(v)} coins`;
    const fmtO = (v) => `${fmt(v)} gemas`;
    if (ant) {
      if ((ant.anuncios || 0) === 0 && snap.anuncios > 0) {
        alertar(`🛒 ${nome} apareceu no mercado`, precoTexto(snap), 'mercado');
      } else {
        if (ant.minGold != null && snap.minGold != null && snap.minGold < ant.minGold) {
          alertar(`📉 ${nome} baixou`, `${fmtG(ant.minGold)} → ${fmtG(snap.minGold)}`, 'mercado');
        }
        if (ant.minOrb != null && snap.minOrb != null && snap.minOrb < ant.minOrb) {
          alertar(`📉 ${nome} baixou`, `${fmtO(ant.minOrb)} → ${fmtO(snap.minOrb)}`, 'mercado');
        }
      }
    }
    const bateuAlvo = (alvo, novo, velho) => alvo > 0 && novo != null && novo <= alvo && !(velho != null && velho <= alvo);
    if (bateuAlvo(Number(w.alvoGold), snap.minGold, ant?.minGold)) alertar(`🎯 ${nome} no seu preço!`, `${fmtG(snap.minGold)} (alvo ${fmtG(w.alvoGold)})`, 'mercado');
    if (bateuAlvo(Number(w.alvoOrb), snap.minOrb, ant?.minOrb)) alertar(`🎯 ${nome} no seu preço!`, `${fmtO(snap.minOrb)} (alvo ${fmtO(w.alvoOrb)})`, 'mercado');

    reg.ultimo = snap;
    if (snap.minGold != null) reg.menorGold = reg.menorGold == null ? snap.minGold : Math.min(reg.menorGold, snap.minGold);
    if (snap.minOrb != null) reg.menorOrb = reg.menorOrb == null ? snap.minOrb : Math.min(reg.menorOrb, snap.minOrb);
    const ultimoHist = reg.hist[reg.hist.length - 1];
    const mudou = !ultimoHist || ultimoHist[1] !== snap.minGold || ultimoHist[2] !== snap.minOrb || ultimoHist[3] !== snap.anuncios;
    if (mudou || agora - ultimoHist[0] > 30 * 60_000) reg.hist.push([agora, snap.minGold, snap.minOrb, snap.anuncios]);
    reg.hist = reg.hist.slice(-400);
    salvarDepois('mercado');
    if (S.ui.aberto && S.ui.aba === 'mercado') renderizar();
  }
  function precoTexto(snap) {
    const p = [];
    if (snap.minGold != null) p.push(`a partir de ${fmt(snap.minGold)} coins`);
    if (snap.minOrb != null) p.push(`${fmt(snap.minOrb)} gemas`);
    p.push(`${fmt(snap.anuncios)} anúncio(s)`);
    return p.join(' · ');
  }

  const mercadoAbertoNoJogo = () => {
    const el = document.querySelector('#cm-lista');
    return !!(el && el.offsetParent !== null);
  };
  const esperar = (ms) => new Promise((r) => setTimeout(r, ms));
  let vigiando = false;
  let statusVigia = '';
  async function vigiarMercado(manual = false) {
    if (vigiando) return;
    const lista = S.store.vigiaMercado;
    if (!lista.length) { statusVigia = 'Nada na lista.'; return; }
    if (!S.ws || S.ws.readyState !== 1) { statusVigia = 'Jogo desconectado.'; return; }
    if (mercadoAbertoNoJogo()) { statusVigia = 'Mercado aberto no jogo — ele mesmo atualiza a lista.'; return; }
    vigiando = true;
    try {
      if (lista.some((w) => w.tipo === 'item')) {
        S.pendenteItens = true;
        enviarAoJogo({ t: 'market.itens' });
        await esperar(4000);
        S.pendenteItens = false;
      }
      for (const w of lista.filter((x) => x.tipo === 'pokemon')) {
        if (mercadoAbertoNoJogo() || !S.ws || S.ws.readyState !== 1) break;
        statusVigia = `Consultando ${w.nome}…`;
        renderizarSe('mercado');
        S.pendenteEspecie = w.id;
        const resposta = new Promise((r) => { S.resolverEspecie = r; });
        enviarAoJogo({
          t: 'market.especies', tipo: 'pokemon', moeda: '', busca: w.nome, ordem: 'recentes', criterios: [],
          elementos: [], categoria: '', soShiny: false, soP5: false, soMega: false, soLendario: false,
          soTmElemental: false, soTmAoe: false, semOutland: false, pagina: 0,
        });
        await Promise.race([resposta, esperar(8000)]);
        S.pendenteEspecie = null;
        S.resolverEspecie = null;
        await esperar(5500); // o jogo limita o Refresh a 1 a cada 5 s
      }
      S.store.ultimaVigia = Date.now();
      salvarDepois('ultimaVigia');
      statusVigia = `Última checagem ${hora(S.store.ultimaVigia)}${manual ? ' (manual)' : ''}.`;
    } finally {
      vigiando = false;
      renderizarSe('mercado');
    }
  }
  setInterval(() => {
    const cfg = S.store.config;
    if (!cfg.vigiaAuto || !S.carregado) return;
    const intervalo = Math.max(3, Number(cfg.vigiaMin) || 5) * 60_000;
    if (Date.now() - (S.store.ultimaVigia || 0) >= intervalo) vigiarMercado(false);
  }, 20_000);

  /* ============================================================
   * UTILIDADES
   * ============================================================ */
  const NF = new Intl.NumberFormat('pt-BR');
  function fmt(v) {
    if (v == null || v === '' || !Number.isFinite(Number(v))) return '—';
    return NF.format(Math.round(Number(v)));
  }
  function curto(v) {
    if (v == null || !Number.isFinite(Number(v))) return '—';
    const n = Number(v);
    const a = Math.abs(n);
    if (a >= 1e9) return (n / 1e9).toFixed(2).replace('.', ',') + 'B';
    if (a >= 1e6) return (n / 1e6).toFixed(2).replace('.', ',') + 'M';
    if (a >= 1e4) return (n / 1e3).toFixed(1).replace('.', ',') + 'k';
    return fmt(n);
  }
  const porHora = (v, ms) => (ms > 60_000 ? (v / ms) * 3600_000 : null);
  function duracao(ms) {
    if (!ms || ms < 0) return '0min';
    const min = Math.floor(ms / 60_000);
    const h = Math.floor(min / 60);
    const d = Math.floor(h / 24);
    if (d) return `${d}d ${h % 24}h`;
    if (h) return `${h}h ${min % 60}min`;
    return `${min}min ${Math.floor((ms % 60_000) / 1000)}s`;
  }
  const hora = (t) => new Date(t).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  const dataHora = (t) => new Date(t).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const chipTipo = (k) => (k ? `<span class="chip" style="background:${COR_TIPO[k]}">${NOME_TIPO[k]}</span>` : '');
  const chipsTipos = (lista) => lista.map(chipTipo).join('');

  function sparkline(valores, w = 220, h = 40, cor = '#b78cff') {
    const v = valores.filter((x) => x != null && Number.isFinite(x));
    if (v.length < 2) return '<span class="dim">sem histórico ainda</span>';
    const min = Math.min(...v);
    const max = Math.max(...v);
    const amp = max - min || 1;
    const pts = v.map((x, i) => `${((i / (v.length - 1)) * w).toFixed(1)},${(h - 3 - ((x - min) / amp) * (h - 6)).toFixed(1)}`).join(' ');
    return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" class="spark"><polyline fill="none" stroke="${cor}" stroke-width="2" points="${pts}"/></svg>`;
  }
  function graficoArea(pts, cor, rotulo) {
    // pts: [[t, valor]]
    if (pts.length < 2) return '<div class="vazio peq">Ainda juntando dados — volte em alguns minutos.</div>';
    const W = 460, H = 170, ml = 52, mr = 10, mt = 10, mb = 24;
    const ts = pts.map((p) => p[0]); const vs = pts.map((p) => p[1]);
    let min = Math.min(...vs), max = Math.max(...vs);
    if (min === max) { min -= 1; max += 1; }
    const pad = (max - min) * 0.08; min -= pad; max += pad;
    const t0 = ts[0], t1 = ts[ts.length - 1] || t0 + 1;
    const X = (t) => ml + ((t - t0) / Math.max(1, t1 - t0)) * (W - ml - mr);
    const Y = (v) => mt + (1 - (v - min) / (max - min)) * (H - mt - mb);
    const linha = pts.map((p) => `${X(p[0]).toFixed(1)},${Y(p[1]).toFixed(1)}`).join(' ');
    const area = `${ml},${H - mb} ${linha} ${X(t1).toFixed(1)},${H - mb}`;
    const id = 'g' + Math.random().toString(36).slice(2, 7);
    const vistos = new Set();
    const grade = [0, 0.25, 0.5, 0.75, 1].map((f) => {
      const v = min + (max - min) * f; const y = Y(v);
      const txt = curto(v);
      const rotuloY = vistos.has(txt) ? '' : `<text x="${ml - 6}" y="${y + 3}" text-anchor="end" class="gt">${txt}</text>`;
      vistos.add(txt);
      return `<line x1="${ml}" x2="${W - mr}" y1="${y}" y2="${y}" class="gl"/>${rotuloY}`;
    }).join('');
    const marcasX = [0, 0.5, 1].map((f) => {
      const t = t0 + (t1 - t0) * f;
      const mesmoDia = new Date(t0).toDateString() === new Date(t1).toDateString();
      const txt = mesmoDia ? hora(t) : dataHora(t);
      return `<text x="${X(t)}" y="${H - 6}" text-anchor="${f === 0 ? 'start' : f === 1 ? 'end' : 'middle'}" class="gt">${txt}</text>`;
    }).join('');
    const passo = Math.max(1, Math.floor(pts.length / 60));
    const alvos = pts.filter((_, i) => i % passo === 0 || i === pts.length - 1).map((p) =>
      `<circle cx="${X(p[0]).toFixed(1)}" cy="${Y(p[1]).toFixed(1)}" r="7" class="alvo"><title>${dataHora(p[0])} — ${rotulo}: ${fmt(p[1])}</title></circle>`).join('');
    const ultimo = pts[pts.length - 1];
    return `<svg viewBox="0 0 ${W} ${H}" class="graf2">
      <defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${cor}" stop-opacity=".45"/><stop offset="1" stop-color="${cor}" stop-opacity="0"/></linearGradient></defs>
      ${grade}${marcasX}
      <polygon points="${area}" fill="url(#${id})"/>
      <polyline points="${linha}" fill="none" stroke="${cor}" stroke-width="2.2" stroke-linejoin="round"/>
      <circle cx="${X(ultimo[0])}" cy="${Y(ultimo[1])}" r="4" fill="${cor}" stroke="#241820" stroke-width="2"/>
      ${alvos}
    </svg>`;
  }
  function graficoBarras(barras, cor, rotulo) {
    // barras: [{rot, v, dica}]
    if (!barras.length) return '<div class="vazio peq">Sem dados ainda.</div>';
    const W = 460, H = 150, ml = 52, mr = 6, mt = 8, mb = 22;
    const max = Math.max(0, ...barras.map((b) => b.v)); const min = Math.min(0, ...barras.map((b) => b.v));
    const amp = max - min || 1;
    const Y = (v) => mt + (1 - (v - min) / amp) * (H - mt - mb);
    const larg = (W - ml - mr) / Math.max(barras.length, 12);
    const zero = Y(0);
    const grade = [min, min + amp / 2, max].map((v) => `<line x1="${ml}" x2="${W - mr}" y1="${Y(v)}" y2="${Y(v)}" class="gl"/><text x="${ml - 6}" y="${Y(v) + 3}" text-anchor="end" class="gt">${curto(v)}</text>`).join('');
    const cada = Math.ceil(barras.length / 8);
    return `<svg viewBox="0 0 ${W} ${H}" class="graf2">${grade}
      ${barras.map((b, i) => { const x = ml + i * larg + larg * 0.15; const y = Math.min(Y(b.v), zero); const h = Math.max(1, Math.abs(Y(b.v) - zero));
        return `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${(larg * 0.7).toFixed(1)}" height="${h.toFixed(1)}" rx="2" fill="${b.v < 0 ? '#ff6b6b' : cor}"><title>${esc(b.dica)} — ${rotulo}: ${b.v >= 0 ? '+' : ''}${fmt(b.v)}</title></rect>
          ${i % cada === 0 ? `<text x="${(x + larg * 0.35).toFixed(1)}" y="${H - 6}" text-anchor="middle" class="gt">${esc(b.rot)}</text>` : ''}`; }).join('')}
    </svg>`;
  }
  function grafico(pontos, campo, cor) {
    const v = pontos.map((p) => p[campo]);
    if (v.length < 2) return '<div class="dim">Ainda juntando dados (um ponto a cada 10 min de jogo).</div>';
    const min = Math.min(...v);
    const max = Math.max(...v);
    return `<div class="graf">${sparkline(v, 400, 90, cor)}<div class="graf-eixo"><span>${dataHora(pontos[0].t)}</span><span>min ${curto(min)} · máx ${curto(max)}</span><span>${dataHora(pontos[pontos.length - 1].t)}</span></div></div>`;
  }

  /* ============================================================
   * INTERFACE
   * ============================================================ */
  const CSS = `
  :host { all: initial; }
  * { box-sizing: border-box; }
  .btn-abrir { position: fixed; right: 0; top: 42%; z-index: 2147483000; display: flex; flex-direction: column; align-items: center; gap: 6px;
    background: linear-gradient(180deg,#7c4dff,#d63384); color: #fff; border: 2px solid #2a1840; border-right: none; border-radius: 12px 0 0 12px;
    padding: 8px 6px 10px; cursor: pointer; font: 800 11px/1 system-ui, sans-serif; letter-spacing: 1px; box-shadow: -2px 3px 10px #0009; }
  .btn-abrir img { width: 30px; height: 30px; border-radius: 8px; box-shadow: 0 2px 4px #0006; }
  .btn-abrir span { writing-mode: vertical-rl; transform: rotate(180deg); }
  .btn-abrir:hover { filter: brightness(1.15); }
  .painel { position: fixed; right: 14px; top: 6vh; width: min(500px, calc(100vw - 28px)); height: 86vh; z-index: 2147483001;
    background: #241820; color: #eadff0; border: 2px solid #4a2c44; border-radius: 12px; box-shadow: 0 10px 40px #000a;
    display: flex; flex-direction: column; font: 13px/1.4 system-ui, -apple-system, Segoe UI, sans-serif; overflow: hidden; }
  .painel[hidden] { display: none; }
  .topo { display: flex; align-items: center; gap: 8px; padding: 10px 12px; background: #2e1d29; border-bottom: 1px solid #4a2c44; cursor: move; user-select: none; }
  .topo b { font-size: 15px; letter-spacing: .5px; }
  .topo .logo { width: 24px; height: 24px; border-radius: 6px; }
  .topo .sp { flex: 1; }
  .status { font-size: 11px; padding: 2px 8px; border-radius: 99px; background: #3b2636; }
  .status.on { background: #1e5b34; color: #b8ffcf; }
  .x { background: none; border: none; color: #eadff0; font-size: 18px; cursor: pointer; padding: 0 4px; }
  .abas { display: flex; flex-wrap: wrap; gap: 4px; padding: 8px 10px; background: #2a1b26; border-bottom: 1px solid #4a2c44; }
  .aba { background: #3a2535; color: #d9c8e4; border: 1px solid #553750; border-radius: 7px; padding: 5px 9px; cursor: pointer; font: 600 12px system-ui, sans-serif; }
  .aba.sel { background: #6a3fd8; border-color: #8b65ff; color: #fff; }
  .corpo { flex: 1; overflow-y: auto; padding: 12px; }
  .corpo::-webkit-scrollbar { width: 8px; } .corpo::-webkit-scrollbar-thumb { background: #553750; border-radius: 4px; }
  h3 { margin: 14px 0 8px; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #c9a8ff; }
  h3:first-child { margin-top: 0; }
  .grade { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 8px; }
  .card { background: #2e1f2a; border: 1px solid #4a2c44; border-radius: 9px; padding: 9px 10px; }
  .card .rot { font-size: 10px; text-transform: uppercase; letter-spacing: .8px; color: #b89cb0; }
  .card .val { font-size: 20px; font-weight: 800; color: #fff; margin: 2px 0; }
  .card .sub { font-size: 11px; color: #c7b3c2; }
  .pos { color: #6be38f !important; } .neg { color: #ff6b6b !important; } .dim { color: #9b8597; font-size: 12px; }
  .linha { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
  .sp { flex: 1; }
  button.b { background: #5a2fd1; color: #fff; border: 1px solid #8b65ff; border-radius: 7px; padding: 6px 11px; cursor: pointer; font: 600 12px system-ui, sans-serif; }
  button.b.sec { background: #3a2535; border-color: #6b4766; }
  button.b.perigo { background: #7a2234; border-color: #b23a52; }
  button.b:disabled { opacity: .5; cursor: default; }
  input, select { background: #1b1218; color: #f3e9f7; border: 1px solid #5a3a55; border-radius: 7px; padding: 6px 8px; font: 13px system-ui, sans-serif; }
  input[type=number] { width: 110px; }
  input:focus, select:focus { outline: 2px solid #7b4dff; }
  label.tg { display: flex; align-items: center; gap: 8px; padding: 6px 0; cursor: pointer; }
  table { width: 100%; border-collapse: collapse; font-size: 12px; }
  th { text-align: left; color: #b89cb0; font-weight: 600; font-size: 11px; padding: 5px 4px; border-bottom: 1px solid #4a2c44; position: sticky; top: -12px; background: #241820; }
  td { padding: 5px 4px; border-bottom: 1px solid #36222f; vertical-align: middle; }
  tr.clic { cursor: pointer; } tr.clic:hover td { background: #2f1f2b; }
  .chip { display: inline-block; color: #fff; font-size: 10px; font-weight: 700; padding: 1px 6px; border-radius: 4px; margin: 1px 2px 1px 0; text-shadow: 0 1px 1px #0007; }
  .chip.x2 { outline: 2px solid #ffd166; }
  .pill { display: inline-block; font-size: 10px; padding: 1px 6px; border-radius: 99px; background: #3b2636; color: #e3d2ec; margin-right: 3px; }
  .pill.shiny { background: #6b5200; color: #ffe27a; }
  .pill.golpe.fis { background: #4a2a22; color: #ffc2a8; }
  .pill.golpe.esp { background: #2c2a52; color: #c9c2ff; }
  .pill.golpe.sta { background: #26403a; color: #b5f0dc; }
  .pill.golpe.bloq { opacity: .4; }
  .upar { margin-top: 8px; }
  .upar-barra { display: flex; height: 8px; border-radius: 99px; overflow: hidden; background: #3b2636; margin: 4px 0; }
  .upar-barra i.fis { background: #ff8a5c; } .upar-barra i.esp { background: #8c7bff; }
  .item-vigia { background: #2e1f2a; border: 1px solid #4a2c44; border-radius: 9px; padding: 10px; margin-bottom: 8px; }
  .item-vigia .nome { font-weight: 800; font-size: 14px; }
  .barra { height: 6px; background: #3b2636; border-radius: 3px; overflow: hidden; margin-top: 4px; }
  .barra i { display: block; height: 100%; background: linear-gradient(90deg,#7b4dff,#c18bff); }
  .graf { margin: 4px 0 10px; } .graf-eixo { display: flex; justify-content: space-between; font-size: 10px; color: #9b8597; }
  .spark { display: block; }
  .tipos-grade { border-collapse: collapse; font-size: 10px; }
  .tipos-grade td, .tipos-grade th { padding: 0; width: 24px; height: 22px; text-align: center; border: 1px solid #1b1218; position: static; }
  .tipos-grade th.lat { width: 62px; text-align: right; padding-right: 4px; }
  .tipos-grade th.cab { writing-mode: vertical-rl; transform: rotate(180deg); height: 58px; }
  .m2 { background: #2f7d3e; color: #fff; font-weight: 800; } .m4 { background: #1aa34a; color: #fff; font-weight: 800; }
  .m05 { background: #8a2a2a; color: #fff; } .m025 { background: #5c1b1b; color: #fff; } .m0 { background: #111; color: #888; }
  .det { background: #2a1b26; border: 1px solid #4a2c44; border-radius: 8px; padding: 8px 10px; margin: 4px 0 8px; }
  .det .lin { margin: 3px 0; }
  .toasts { position: fixed; top: 16px; left: 50%; transform: translateX(-50%); z-index: 2147483002; display: flex; flex-direction: column; gap: 8px; pointer-events: none; }
  .toast { pointer-events: auto; min-width: 280px; max-width: 420px; background: #2e1d29; color: #fff; border: 2px solid #7b4dff; border-radius: 10px;
    padding: 10px 14px; box-shadow: 0 8px 24px #000b; font: 13px/1.35 system-ui, sans-serif; animation: entra .25s ease-out; cursor: pointer; }
  .toast.shiny { border-color: #ffd166; background: linear-gradient(135deg,#3d2b00,#2e1d29); }
  .toast.mercado { border-color: #3ecf8e; }
  .toast b { display: block; font-size: 14px; margin-bottom: 2px; }
  @keyframes entra { from { transform: translateY(-12px); opacity: 0; } }
  .aviso { background: #3a2a10; border: 1px solid #7a5a1a; color: #ffe2a8; border-radius: 8px; padding: 8px 10px; font-size: 12px; margin-bottom: 10px; }
  .vazio { text-align: center; color: #9b8597; padding: 24px 8px; }
  img.spr { image-rendering: pixelated; object-fit: contain; flex: none; }
  img.spr.sem { visibility: hidden; }
  .com-spr { display: flex; align-items: center; gap: 6px; }
  .resumo-pk { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; margin-bottom: 10px; }
  .resumo-pk div { background: linear-gradient(135deg,#3a2140,#2a1b26); border: 1px solid #4a2c44; border-radius: 10px; padding: 8px; text-align: center; }
  .resumo-pk b { display: block; font-size: 18px; color: #fff; }
  .resumo-pk span { font-size: 10px; text-transform: uppercase; letter-spacing: .8px; color: #b89cb0; }
  .pk-grade { display: grid; grid-template-columns: repeat(auto-fill, minmax(205px, 1fr)); gap: 8px; }
  .pk { position: relative; border-radius: 12px; padding: 8px; cursor: pointer; overflow: hidden;
    background: linear-gradient(135deg, color-mix(in srgb, var(--c1) 26%, #261922) 0%, #261922 55%, color-mix(in srgb, var(--c2) 20%, #261922) 100%);
    border: 1px solid color-mix(in srgb, var(--c1) 45%, #4a2c44); transition: transform .12s, box-shadow .12s; }
  .pk:hover { transform: translateY(-2px); box-shadow: 0 6px 16px #0008, 0 0 0 1px color-mix(in srgb, var(--c1) 60%, transparent); }
  .pk.ativo { box-shadow: 0 0 0 2px #ffd166; }
  .pk.shiny::after { content: ''; position: absolute; inset: 0; pointer-events: none; border-radius: 12px;
    background: linear-gradient(120deg, transparent 30%, #fff3 45%, transparent 60%); background-size: 250% 100%; animation: brilho 3.5s linear infinite; }
  @keyframes brilho { from { background-position: 150% 0; } to { background-position: -100% 0; } }
  .pk.aberto { grid-column: 1 / -1; cursor: default; }
  .pk-topo { display: flex; gap: 10px; align-items: center; }
  .pk-arte { position: relative; flex: none; width: 72px; height: 72px; border-radius: 50%; display: grid; place-items: center;
    background: radial-gradient(circle at 50% 60%, color-mix(in srgb, var(--c1) 55%, transparent) 0%, transparent 70%); }
  .pk.aberto .pk-arte { width: 110px; height: 110px; }
  .pk-arte .brilho { position: absolute; top: -2px; right: -2px; font-size: 16px; filter: drop-shadow(0 0 4px #ffd166); }
  .pk-info { min-width: 0; flex: 1; }
  .pk-nome { font-weight: 800; font-size: 14px; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .pk.shiny .pk-nome { color: #ffe27a; }
  .pk-nv { font-size: 12px; color: #d9c8e4; margin: 1px 0 3px; display: flex; align-items: center; gap: 6px; }
  .pk-nv b { color: #fff; }
  .tag { font-size: 9px; font-weight: 800; letter-spacing: .6px; padding: 1px 6px; border-radius: 99px; background: #ffffff1f; color: #f1e6f7; }
  .tag.campo { background: #ffd166; color: #3a2a00; }
  .selos { display: flex; flex-wrap: wrap; gap: 3px; margin-top: 4px; }
  .selo { font-size: 10px; font-weight: 800; padding: 1px 5px; border-radius: 4px; color: #fff; background: #5d5562; }
  .selo.t1 { background: #3f8f3f; } .selo.t2 { background: #2f6fd0; } .selo.t3 { background: #8a3fd8; } .selo.t4 { background: #e08a00; }
  .pk .barra { margin-top: 6px; height: 4px; }
  .pk-det { margin-top: 8px; cursor: auto; }
  .stats { display: grid; gap: 4px; }
  .st { display: grid; grid-template-columns: 34px 1fr 34px; align-items: center; gap: 6px; font-size: 11px; color: #d9c8e4; }
  .st i { height: 7px; background: #1b1218; border-radius: 4px; overflow: hidden; }
  .st i b { display: block; height: 100%; border-radius: 4px; }
  .st em { font-style: normal; text-align: right; color: #fff; font-weight: 700; }
  .sw-grade { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .sw-card { display: flex; align-items: center; gap: 10px; padding: 10px; border-radius: 12px; cursor: pointer;
    background: #2e1f2a; border: 1px solid #4a2c44; transition: background .15s, border-color .15s; }
  .sw-card.on { background: linear-gradient(135deg,#3b2468,#2e1f2a); border-color: #7b4dff; }
  .sw-card input { display: none; }
  .sw-ico { font-size: 22px; width: 34px; height: 34px; display: grid; place-items: center; background: #ffffff12; border-radius: 10px; }
  .sw-txt { flex: 1; min-width: 0; } .sw-txt b { display: block; font-size: 13px; color: #fff; } .sw-txt small { color: #b89cb0; font-size: 11px; }
  .sw { position: relative; flex: none; width: 34px; height: 20px; border-radius: 99px; background: #4a3a48; transition: background .15s; display: inline-block; cursor: pointer; }
  .sw i { position: absolute; top: 3px; left: 3px; width: 14px; height: 14px; border-radius: 50%; background: #fff; transition: left .15s; }
  .sw-card.on .sw, .sw.mini:has(input:checked) { background: #6be38f; }
  .sw-card.on .sw i, .sw.mini:has(input:checked) i { left: 17px; }
  .sw.mini input { display: none; }
  .form-regra { background: linear-gradient(135deg,#2f1d36,#261922); border: 1px solid #5a3a6b; border-radius: 14px; padding: 12px; }
  .fr-topo { display: flex; gap: 12px; align-items: center; }
  .fr-arte { width: 64px; height: 64px; flex: none; border-radius: 50%; display: grid; place-items: center; background: radial-gradient(circle,#7b4dff55,transparent 70%); }
  .fr-qualquer { font-size: 30px; color: #ffd166; filter: drop-shadow(0 0 6px #ffd16699); } .fr-qualquer.peq { font-size: 22px; }
  .fr-campos { flex: 1; display: flex; flex-direction: column; gap: 4px; } .fr-campos input { width: 100%; }
  .rot-c { font-size: 10px; text-transform: uppercase; letter-spacing: .8px; color: #c9a8ff; font-weight: 700; } .rot-c small { text-transform: none; letter-spacing: 0; color: #9b8597; font-weight: 400; }
  .fr-grade { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-top: 10px; }
  .fr-grade label { display: flex; flex-direction: column; gap: 4px; } .fr-grade input, .fr-grade select { width: 100%; }
  .regras { display: grid; gap: 8px; }
  .regra { display: flex; align-items: center; gap: 10px; padding: 8px 10px; border-radius: 12px; background: #2e1f2a; border: 1px solid #4a2c44; }
  .regra.off { opacity: .5; }
  .rg-arte { width: 48px; height: 48px; flex: none; border-radius: 50%; display: grid; place-items: center; background: radial-gradient(circle,#ffffff14,transparent 70%); }
  .rg-info { flex: 1; min-width: 0; } .rg-nome { font-weight: 800; color: #fff; }
  .rg-crit { display: flex; flex-wrap: wrap; gap: 4px; margin: 3px 0; }
  .crit { font-size: 11px; font-weight: 700; padding: 2px 7px; border-radius: 99px; background: #4b2f7a; color: #eadcff; }
  .crit.nota { background: #1f6b4a; color: #c9ffe3; } .crit.shiny { background: #6b5200; color: #ffe27a; } .crit.livre { background: #3b2636; color: #c7b3c2; }
  .x-peq { background: none; border: none; color: #ff8a8a; cursor: pointer; font-size: 14px; padding: 4px; }
  .avisos { display: grid; gap: 6px; margin-top: 8px; }
  .aviso-it { display: flex; align-items: center; gap: 10px; padding: 7px 10px; border-radius: 10px; background: #2b1d28; border-left: 3px solid #7b4dff; }
  .aviso-it.shiny { border-left-color: #ffd166; background: linear-gradient(90deg,#3a2c08,#2b1d28 60%); }
  .aviso-it.mercado { border-left-color: #3ecf8e; } .aviso-it.captura { border-left-color: #8b65ff; }
  .av-arte { width: 42px; height: 42px; flex: none; display: grid; place-items: center; } .av-ico { font-size: 22px; }
  .av-info { flex: 1; min-width: 0; } .av-info b { color: #fff; font-size: 13px; }
  .av-hora { text-align: right; font-size: 11px; color: #d9c8e4; white-space: nowrap; }
  .ritmo { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 8px; }
  .rt { border-radius: 12px; padding: 10px 12px; background: #2e1f2a; border: 1px solid #4a2c44; }
  .rt .rot { font-size: 10px; text-transform: uppercase; letter-spacing: .8px; color: #b89cb0; }
  .rt .val { font-size: 24px; font-weight: 900; color: #fff; margin: 2px 0; } .rt .sub { font-size: 11px; color: #c7b3c2; }
  .rt.xp { background: linear-gradient(135deg,#3a2468,#2e1f2a); border-color: #6b4fc4; }
  .rt.gold { background: linear-gradient(135deg,#4a3a10,#2e1f2a); border-color: #8a6d1d; }
  .rt.nivel { background: linear-gradient(135deg,#17483a,#2e1f2a); border-color: #2c7a5e; }
  .seg { margin-top: 6px; }
  .graf-card { background: #2a1b26; border: 1px solid #4a2c44; border-radius: 12px; padding: 8px 8px 4px; margin: 8px 0; }
  .graf-tit { font-size: 12px; font-weight: 700; color: #eadff0; margin: 0 0 4px 4px; }
  svg.graf2 { width: 100%; height: auto; display: block; overflow: visible; }
  svg.graf2 .gl { stroke: #ffffff14; stroke-width: 1; } svg.graf2 .gt { fill: #9b8597; font-size: 10px; font-family: system-ui, sans-serif; }
  svg.graf2 .alvo { fill: transparent; cursor: crosshair; } svg.graf2 .alvo:hover { fill: #ffffff55; }
  svg.graf2 rect:hover { filter: brightness(1.25); }
  .vazio.peq { padding: 14px 8px; font-size: 12px; }
  details.diag { margin-top: 16px; } details.diag summary { cursor: pointer; color: #9b8597; font-size: 12px; }
  `;

  function montarUI() {
    if (S.ui.host || !document.body) return;
    const host = document.createElement('div');
    host.id = 'pokexdd';
    document.documentElement.appendChild(host);
    const root = host.attachShadow({ mode: 'open' });
    root.innerHTML = `<style>${CSS}</style>
      <button class="btn-abrir" title="Abrir o PokeXDD"><img src="${ICONE}" alt=""><span>PokeXDD</span></button>
      <div class="toasts"></div>
      <div class="painel" hidden>
        <div class="topo"><img class="logo" src="${ICONE}" alt=""><b>PokeXDD</b><span class="status">conectando…</span><span class="sp"></span><button class="x" title="Fechar">✕</button></div>
        <div class="abas"></div>
        <div class="corpo"></div>
      </div>`;
    S.ui.host = host;
    S.ui.root = root;
    S.ui.corpo = root.querySelector('.corpo');
    S.ui.toasts = root.querySelector('.toasts');
    const painel = root.querySelector('.painel');
    root.querySelector('.btn-abrir').onclick = () => {
      S.ui.aberto = !S.ui.aberto;
      painel.hidden = !S.ui.aberto;
      renderizar();
    };
    root.querySelector('.x').onclick = () => { S.ui.aberto = false; painel.hidden = true; };
    // Arrastar pelo topo.
    const topo = root.querySelector('.topo');
    topo.addEventListener('mousedown', (ev) => {
      if (ev.target.closest('button')) return;
      const r = painel.getBoundingClientRect();
      const dx = ev.clientX - r.left;
      const dy = ev.clientY - r.top;
      const mover = (e) => {
        painel.style.left = Math.max(0, Math.min(innerWidth - 120, e.clientX - dx)) + 'px';
        painel.style.top = Math.max(0, Math.min(innerHeight - 60, e.clientY - dy)) + 'px';
        painel.style.right = 'auto';
      };
      const soltar = () => { removeEventListener('mousemove', mover); removeEventListener('mouseup', soltar); };
      addEventListener('mousemove', mover);
      addEventListener('mouseup', soltar);
    });
    // Teclas dentro do painel não vão para o jogo (atalhos).
    for (const tipo of ['keydown', 'keyup', 'keypress']) painel.addEventListener(tipo, (e) => e.stopPropagation());
    const ABAS = [['hunt', '⚔ Hunt'], ['alertas', '🔔 Alertas'], ['mercado', '🛒 Mercado'], ['progresso', '📈 Progresso'],
      ['meus', '🎒 Meus Pokémon'], ['dex', '📖 Pokédex'], ['tipos', '🧪 Tipos']];
    const abas = root.querySelector('.abas');
    abas.innerHTML = ABAS.map(([id, nome]) => `<button class="aba" data-aba="${id}">${nome}</button>`).join('');
    abas.onclick = (e) => {
      const b = e.target.closest('.aba');
      if (!b) return;
      S.ui.aba = b.dataset.aba;
      S.ui.corpo.scrollTop = 0;
      renderizar();
    };
  }

  function toast(titulo, corpo, tipo) {
    if (!S.ui.toasts) return;
    const el = document.createElement('div');
    el.className = 'toast ' + (tipo || '');
    el.innerHTML = `<b>${esc(titulo)}</b>${esc(corpo)}`;
    el.onclick = () => el.remove();
    S.ui.toasts.appendChild(el);
    setTimeout(() => el.remove(), tipo === 'shiny' ? 15000 : 9000);
  }

  function renderizarSe(aba) { if (S.ui.aberto && S.ui.aba === aba) renderizar(); }
  function renderizar() {
    if (!S.ui.root) return;
    const st = S.ui.root.querySelector('.status');
    const on = S.ws && S.ws.readyState === 1 && S.eu;
    st.textContent = on ? `${S.eu.nick ?? 'conectado'} · Nv ${fmt(S.eu.level)}` : 'aguardando o jogo…';
    st.classList.toggle('on', !!on);
    if (!S.ui.aberto) return;
    for (const b of S.ui.root.querySelectorAll('.aba')) b.classList.toggle('sel', b.dataset.aba === S.ui.aba);
    const corpo = S.ui.corpo;
    const rolagem = corpo.scrollTop;
    const foco = S.ui.root.activeElement;
    // Não repinta por cima de quem está digitando.
    if (foco && foco.tagName === 'INPUT' && corpo.contains(foco)) return;
    const telas = { hunt: telaHunt, alertas: telaAlertas, mercado: telaMercado, progresso: telaProgresso, meus: telaMeus, dex: telaDex, tipos: telaTipos };
    corpo.innerHTML = (telas[S.ui.aba] ?? telaHunt)();
    ligarEventos(S.ui.aba);
    hidratarSprites(corpo);
    corpo.scrollTop = rolagem;
  }
  // A aba Hunt se atualiza a cada segundo; com o painel fechado só o selo de status muda.
  setInterval(() => {
    if (!S.ui.aberto || S.ui.aba === 'hunt') renderizar();
    else if (S.ui.aba === 'progresso' && Date.now() % 15000 < 1000) renderizar();
  }, 1000);

  /* ---------------- HUNT ---------------- */
  function telaHunt() {
    const s = sessao();
    const agora = Date.now();
    const total = agora - s.inicio;
    const ativo = s.ativoMs;
    const caçando = s.ultimoEvento && agora - s.ultimoEvento < 30_000;
    const base = ativo > 60_000 ? ativo : total;
    const lucro = lucroReal(s);
    const eu = S.eu;
    let etaTreinador = '';
    const xpH = porHora(s.xpT, base);
    if (eu && eu.xpProximo && xpH) {
      const falta = Number(eu.xpProximo) - Number(eu.xp);
      if (falta > 0) etaTreinador = `Nv ${fmt(Number(eu.level) + 1)} em ~${duracao((falta / xpH) * 3600_000)}`;
    }
    let etaPk = '';
    const ativoPk = eu?.pokemons?.find((p) => p.id === eu.activeId);
    const xpPH = porHora(s.xpP, base);
    if (ativoPk && ativoPk.xpProximo && xpPH) {
      const falta = Number(ativoPk.xpProximo) - Number(ativoPk.xp);
      if (falta > 0) etaPk = `${esc(ativoPk.nome ?? nomeEspecie(ativoPk.speciesId))} Nv ${fmt(Number(ativoPk.level) + 1)} em ~${duracao((falta / xpPH) * 3600_000)}`;
    }
    const taxaCaptura = totalBolas(s) ? (s.capturas / totalBolas(s)) * 100 : null;
    const cards = [
      ['XP Treinador', curto(s.xpT), `${curto(xpH)}/h`, etaTreinador],
      ['XP Pokémon', curto(s.xpP), `${curto(xpPH)}/h`, etaPk],
      ['Coins dos abates', curto(s.ouro), `${curto(porHora(s.ouro, base))}/h`, s.ouroLoot ? `${curto(s.ouroLoot)} de bônus de loot` : ''],
      ['Lucro real', lucro == null ? '—' : (lucro >= 0 ? '+' : '') + curto(lucro), lucro == null ? 'esperando o saldo' : `${curto(porHora(lucro, base))}/h`, 'variação do seu saldo de coins', lucro == null ? '' : lucro >= 0 ? 'pos' : 'neg'],
      ['Abates', fmt(s.abates), `${curto(porHora(s.abates, base))}/h`, s.abates ? `um a cada ${(base / 1000 / s.abates).toFixed(1).replace('.', ',')}s` : ''],
      ['Capturas', fmt(s.capturas), `${curto(porHora(s.capturas, base))}/h`, taxaCaptura == null ? '' : `${taxaCaptura.toFixed(1).replace('.', ',')}% das bolas`],
      ['Shinies', fmt(s.shinies), s.shinies ? '✨' : '', ''],
      ['Desmaios', fmt(s.desmaios), `${fmt(s.curas)} poções · ${fmt(s.revives)} revives`, ''],
    ];
    const bolas = Object.entries(s.bolas).sort((a, b) => b[1] - a[1]);
    const drops = Object.entries(s.drops).sort((a, b) => b[1] - a[1]);
    const antigas = S.store.sessoesAntigas;
    return `
      <div class="linha"><span class="pill ${caçando ? 'shiny' : ''}">${caçando ? '● caçando' : '○ parado'}</span>
        <span class="dim">Sessão: ${duracao(total)} · ativo ${duracao(ativo)}</span><span class="sp"></span>
        <button class="b sec" data-acao="copiar-sessao">Copiar resumo</button>
        <button class="b perigo" data-acao="nova-sessao">Nova sessão</button></div>
      <h3>Resultado</h3>
      <div class="grade">${cards.map(([r, v, sub, ext, cls]) => `<div class="card"><div class="rot">${r}</div><div class="val ${cls || ''}">${v}</div><div class="sub">${sub}</div>${ext ? `<div class="sub">${ext}</div>` : ''}</div>`).join('')}</div>
      <h3>Gastos</h3>
      ${bolas.length ? `<table><tr><th>Bola</th><th>Usadas</th><th>Custo estimado</th></tr>
        ${bolas.map(([id, n]) => `<tr><td>${esc(nomeBola(Number(id)))}</td><td>${fmt(n)}</td><td>${precoBola(Number(id)) ? curto(precoBola(Number(id)) * n) : '—'}</td></tr>`).join('')}
        <tr><td><b>Total</b></td><td><b>${fmt(totalBolas(s))}</b></td><td><b>${curto(custoBolas(s))}</b></td></tr></table>` : '<div class="dim">Nenhuma bola usada nesta sessão.</div>'}
      <h3>Drops</h3>
      ${drops.length ? drops.map(([n, q]) => `<span class="pill">${esc(n)} ×${fmt(q)}</span>`).join(' ') : '<div class="dim">Nenhum drop ainda.</div>'}
      <h3>Últimas capturas</h3>
      ${s.ultimasCapturas.length ? `<table><tr><th>Hora</th><th>Pokémon</th><th>Nv</th><th>IV</th><th>Q</th><th>N</th></tr>
        ${s.ultimasCapturas.map((c) => `<tr><td>${hora(c.t)}</td><td class="com-spr">${imgSprite(c.look ?? lookDe({ speciesId: c.speciesId, shiny: c.shiny }), 28)}${c.shiny ? '<span class="pill shiny">✨ shiny</span>' : ''}${esc(c.nome)}${c.depot ? ' <span class="dim">(depot)</span>' : ''}</td><td>${fmt(c.level)}</td><td>${fmt(c.iv)}</td><td>${c.quality ? Number(c.quality).toFixed(3) : '—'}</td><td>${c.nota != null ? Number(c.nota).toFixed(2) : '—'}</td></tr>`).join('')}</table>`
        : '<div class="dim">Nenhuma captura nesta sessão.</div>'}
      <h3>Sessões anteriores</h3>
      ${antigas.length ? `<table><tr><th>Início</th><th>Ativo</th><th>XP/h</th><th>Lucro</th><th>Capt.</th><th>✨</th></tr>
        ${antigas.map((a) => `<tr><td>${dataHora(a.inicio)}</td><td>${duracao(a.ativoMs)}</td><td>${curto(porHora(a.xpT, a.ativoMs || a.fim - a.inicio))}</td><td class="${(a.lucro ?? 0) >= 0 ? 'pos' : 'neg'}">${a.lucro == null ? '—' : curto(a.lucro)}</td><td>${fmt(a.capturas)}</td><td>${fmt(a.shinies)}</td></tr>`).join('')}</table>`
        : '<div class="dim">Quando você clicar em "Nova sessão", a atual fica guardada aqui.</div>'}
    `;
  }
  function textoSessao() {
    const s = sessao();
    const base = s.ativoMs > 60_000 ? s.ativoMs : Date.now() - s.inicio;
    const l = lucroReal(s);
    return [
      `PokeXDD — sessão de ${duracao(base)}`,
      `XP treinador: ${fmt(s.xpT)} (${curto(porHora(s.xpT, base))}/h)`,
      `XP pokémon: ${fmt(s.xpP)} (${curto(porHora(s.xpP, base))}/h)`,
      `Coins dos abates: ${fmt(s.ouro)} (${curto(porHora(s.ouro, base))}/h)`,
      `Lucro real: ${l == null ? '—' : fmt(l)}`,
      `Abates: ${fmt(s.abates)} · Capturas: ${fmt(s.capturas)} · Shinies: ${fmt(s.shinies)}`,
      `Bolas: ${fmt(totalBolas(s))} (~${curto(custoBolas(s))} coins)`,
    ].join('\n');
  }

  /* ---------------- ALERTAS ---------------- */
  function opcoesEspecies() {
    return [...S.especies.values()].sort((a, b) => a.name.localeCompare(b.name)).map((c) => `<option value="${esc(c.name)}">`).join('');
  }
  const decimal = (v, casas = 3) => Number(v).toFixed(casas).replace('.', ',');
  function chipsRegra(r) {
    const c = [];
    if (r.soShiny) c.push('<span class="crit shiny">✨ Só shiny</span>');
    if (r.minP) c.push(`<span class="crit">P${r.minP}${r.minP < 5 ? '+' : ''}</span>`);
    if (r.minIV) c.push(`<span class="crit">IV ≥ ${fmt(r.minIV)}</span>`);
    if (r.minQ) c.push(`<span class="crit">Q ≥ ${decimal(r.minQ, 2)}</span>`);
    if (r.minN) c.push(`<span class="crit nota">N ≥ ${decimal(r.minN, 2)}</span>`);
    return c.length ? c.join('') : '<span class="crit livre">qualquer captura</span>';
  }
  function selosMedidas(m) {
    if (!m) return '';
    const out = [];
    if (m.p) out.push(`<span class="selo t${Math.min(4, Math.max(0, m.p - 1))}">P${m.p}</span>`);
    if (m.iv != null) out.push(`<span class="selo t${nivelSelo(m.iv, [60, 100, 130, 150])}">IV ${fmt(m.iv)}</span>`);
    if (m.q) out.push(`<span class="selo t${nivelSelo(m.q, [1.0, 1.3, 1.5, 1.7])}">Q ${decimal(m.q)}</span>`);
    if (m.n != null) out.push(`<span class="selo t${nivelSelo(m.n, [2, 3, 3.5, 4.5])}">N ${decimal(m.n)}</span>`);
    return out.join('');
  }
  function telaAlertas() {
    const c = S.store.config;
    const sw = (k, ico, titulo, sub) => `<label class="sw-card ${c[k] ? 'on' : ''}"><input type="checkbox" data-cfg="${k}" ${c[k] ? 'checked' : ''}>
      <span class="sw-ico">${ico}</span><span class="sw-txt"><b>${titulo}</b><small>${sub}</small></span><span class="sw"><i></i></span></label>`;
    const regras = S.store.regrasAlerta;
    const log = S.store.alertas;
    const f = S.ui.filtros;
    const espForm = f.regraNome ? S.especiePorNome.get(String(f.regraNome).toLowerCase()) : null;
    const vazio = (v) => (v ? esc(v) : '');
    return `
      <div class="sw-grade">
        ${sw('alertaShiny', '✨', 'Shiny capturado', 'Sempre avisa, sem filtro')}
        ${sw('alertaEspecies', '🎯', 'Minhas regras', 'Avisa quando uma regra bater')}
        ${sw('som', '🔊', 'Som', 'Toca um aviso sonoro')}
        ${sw('notificacao', '🖥', 'Notificação', 'Do Windows, mesmo minimizado')}
      </div>

      <h3>Nova regra</h3>
      <div class="form-regra">
        <div class="fr-topo">
          <div class="fr-arte">${espForm ? imgSprite(espForm.looktype, 56) : '<span class="fr-qualquer">★</span>'}</div>
          <div class="fr-campos">
            <label class="rot-c">Pokémon <small>(deixe vazio para qualquer um)</small></label>
            <input list="pic-especies" placeholder="Ex.: Dragonite" data-campo="regra-nome" value="${vazio(f.regraNome)}">
            <datalist id="pic-especies">${opcoesEspecies()}</datalist>
          </div>
        </div>
        <div class="fr-grade">
          <label><span class="rot-c">Potência mín.</span>
            <select data-campo="regra-p">${[[0, 'Qualquer'], [2, 'P2+'], [3, 'P3+'], [4, 'P4+'], [5, 'P5']].map(([v, n]) => `<option value="${v}" ${Number(f.regraP || 0) === v ? 'selected' : ''}>${n}</option>`).join('')}</select></label>
          <label><span class="rot-c">IV mín.</span><input type="text" inputmode="numeric" placeholder="ex.: 120" data-campo="regra-iv" value="${vazio(f.regraIV)}"></label>
          <label><span class="rot-c">Qualidade mín.</span><input type="text" inputmode="decimal" placeholder="ex.: 1,5" data-campo="regra-q" value="${vazio(f.regraQ)}"></label>
          <label><span class="rot-c">Nota (N) mín.</span><input type="text" inputmode="decimal" placeholder="ex.: 3,5" data-campo="regra-n" value="${vazio(f.regraN)}"></label>
        </div>
        <div class="linha" style="margin-top:8px">
          <label class="tg" style="padding:0"><input type="checkbox" data-campo="regra-shiny" ${f.regraShiny ? 'checked' : ''}> Só shiny</label>
          <span class="sp"></span>
          <button class="b" data-acao="add-regra">＋ Criar regra</button>
        </div>
        <div class="dim" style="margin-top:6px">Todos os filtros preenchidos precisam bater. A nota é calculada com a mesma conta do jogo.</div>
      </div>

      <h3>Minhas regras (${regras.length})</h3>
      ${regras.length ? `<div class="regras">${regras.map((r, i) => {
        const esp = r.speciesId != null ? S.especies.get(Number(r.speciesId)) : null;
        return `<div class="regra ${r.ativo ? '' : 'off'}">
          <div class="rg-arte">${esp ? imgSprite(esp.looktype, 44) : '<span class="fr-qualquer peq">★</span>'}</div>
          <div class="rg-info"><div class="rg-nome">${esc(r.nome)}</div><div class="rg-crit">${chipsRegra(r)}</div>
            <div class="dim">${r.disparos ? `disparou ${fmt(r.disparos)}×` : 'ainda não disparou'}</div></div>
          <label class="sw mini" title="Ligar/desligar"><input type="checkbox" data-regra-on="${i}" ${r.ativo ? 'checked' : ''}><i></i></label>
          <button class="x-peq" data-acao="rm-regra" data-i="${i}" title="Apagar">✕</button>
        </div>`;
      }).join('')}</div>` : '<div class="vazio">Nenhuma regra ainda. Crie uma acima. Ex.: <b>Qualquer Pokémon · N ≥ 3,5</b>.</div>'}

      <div class="linha" style="margin-top:14px"><h3 style="margin:0">Últimos avisos</h3><span class="sp"></span>
        <button class="b sec" data-acao="testar-alerta">Testar</button>${log.length ? '<button class="b sec" data-acao="limpar-alertas">Limpar</button>' : ''}</div>
      ${log.length ? `<div class="avisos">${log.slice(0, 40).map((a) => `<div class="aviso-it ${a.tipo || ''}">
          <div class="av-arte">${a.x?.look != null ? imgSprite(a.x.look, 40) : `<span class="av-ico">${a.tipo === 'mercado' ? '🛒' : a.tipo === 'shiny' ? '✨' : '🔔'}</span>`}</div>
          <div class="av-info"><b>${esc(a.titulo)}</b>${a.x?.medidas ? `<div class="selos">${selosMedidas(a.x.medidas)}</div>` : `<div class="dim">${esc(a.corpo)}</div>`}</div>
          <div class="av-hora">${hora(a.t)}<br><span class="dim">${new Date(a.t).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}</span></div>
        </div>`).join('')}</div>` : '<div class="vazio">Nenhum aviso ainda.</div>'}

      <details class="diag"><summary>Diagnóstico</summary>
        <div class="dim">Versão ${VERSAO} · conexão: ${S.ws ? ['conectando', 'aberta', 'fechando', 'fechada'][S.ws.readyState] : 'nenhuma'} ·
          espécies: ${fmt(S.especies.size)} · itens: ${fmt(S.itens.size)} · tabela de tipos: ${S.tabelaTipos ? 'do jogo' : 'padrão'}</div>
        <div class="linha" style="margin-top:6px"><button class="b sec" data-acao="copiar-diag">Copiar diagnóstico</button>
          <span class="dim">Não tem senha nem token.</span></div>
      </details>
    `;
  }
  function diagnostico() {
    const eu = S.eu;
    const pk = eu?.pokemons?.[0];
    return JSON.stringify({
      versao: VERSAO,
      msgs: S.contagemMsgs,
      euCampos: eu ? Object.keys(eu).filter((k) => !/token|email|senha|sessao/i.test(k)) : null,
      pkCampos: pk ? Object.keys(pk) : null,
      pkTipos: pk?.tipos ?? null,
      dexExemplo: eu?.pokedex ? Object.entries(eu.pokedex).slice(0, 2) : null,
      ultimaAbaMercado: S.ultimaAbaMercado,
      tabelaTipos: !!S.tabelaTipos,
      bolas: S.catalogoBolas.slice(0, 3),
    }, null, 1);
  }

  /* ---------------- MERCADO ---------------- */
  function opcoesMercado() {
    const esp = [...S.especies.values()].map((c) => c.name);
    const it = [...S.itens.values()].map((i) => i.name).filter(Boolean);
    return [...new Set([...esp, ...it])].sort((a, b) => a.localeCompare(b)).map((n) => `<option value="${esc(n)}">`).join('');
  }
  function telaMercado() {
    const c = S.store.config;
    const lista = S.store.vigiaMercado;
    const ult = S.store.ultimaVigia;
    return `
      <div class="aviso">O vigia faz as mesmas consultas do botão <b>Refresh</b> do mercado, uma a cada 5 s, e só quando o mercado não está aberto no jogo.
        Ele também aproveita tudo o que você olha no mercado. Ele nunca compra nada.</div>
      <h3>Adicionar à lista</h3>
      <div class="linha"><input list="pic-mercado" placeholder="Pokémon ou item…" data-campo="mk-nome" style="flex:1">
        <datalist id="pic-mercado">${opcoesMercado()}</datalist></div>
      <div class="linha" style="margin-top:6px">
        <input type="number" min="0" placeholder="Alvo coins" data-campo="mk-gold">
        <input type="number" min="0" placeholder="Alvo gemas" data-campo="mk-orb">
        <button class="b" data-acao="add-mk">Adicionar</button></div>
      <div class="dim" style="margin-top:4px">Alvo é opcional: avisa quando o menor preço ficar igual ou abaixo dele.</div>
      <h3>Vigia automático</h3>
      <label class="tg"><input type="checkbox" data-cfg="vigiaAuto" ${c.vigiaAuto ? 'checked' : ''}> Checar sozinho a cada
        <select data-cfg-sel="vigiaMin">${[3, 5, 10, 15, 30].map((m) => `<option value="${m}" ${Number(c.vigiaMin) === m ? 'selected' : ''}>${m} min</option>`).join('')}</select></label>
      <div class="linha"><button class="b sec" data-acao="checar-mk" ${vigiando ? 'disabled' : ''}>${vigiando ? 'Checando…' : 'Checar agora'}</button>
        <span class="dim">${esc(statusVigia || (ult ? `Última checagem ${dataHora(ult)}` : 'Ainda não checou.'))}</span></div>
      <h3>Sua lista (${lista.length})</h3>
      ${lista.length ? lista.map((w, i) => cardVigia(w, i)).join('') : '<div class="vazio">Adicione um Pokémon ou item para acompanhar o preço.</div>'}
    `;
  }
  function cardVigia(w, i) {
    const reg = S.store.mercado[w.chave];
    const u = reg?.ultimo;
    const hist = reg?.hist ?? [];
    const anteriorGold = [...hist].reverse().find((h) => h[1] != null && h[1] !== u?.minGold)?.[1];
    const variacao = (atual, ant) => {
      if (atual == null || ant == null || atual === ant) return '';
      const pct = ((atual - ant) / ant) * 100;
      return `<span class="${pct < 0 ? 'pos' : 'neg'}">${pct < 0 ? '▼' : '▲'} ${Math.abs(pct).toFixed(1).replace('.', ',')}%</span>`;
    };
    const tipos = w.tipo === 'pokemon' ? chipsTipos(tiposDe(S.especies.get(Number(w.id)) ?? {})) : '<span class="pill">item</span>';
    return `<div class="item-vigia">
      <div class="linha">${w.tipo === 'pokemon' ? imgSprite(S.especies.get(Number(w.id))?.looktype, 40) : ''}<span class="nome">${esc(w.nome)}</span>${tipos}<span class="sp"></span>
        <button class="b sec" data-acao="editar-mk" data-i="${i}">Alvo</button><button class="b perigo" data-acao="rm-mk" data-i="${i}">✕</button></div>
      ${u ? `<div class="grade" style="margin-top:8px">
          <div class="card"><div class="rot">Menor (coins)</div><div class="val">${curto(u.minGold)}</div><div class="sub">${variacao(u.minGold, anteriorGold) ? variacao(u.minGold, anteriorGold) + ' desde a última leitura' : 'sem mudança'}</div><div class="sub">menor já visto: ${curto(reg.menorGold)}</div></div>
          <div class="card"><div class="rot">Menor (gemas)</div><div class="val">${curto(u.minOrb)}</div><div class="sub">menor já visto: ${curto(reg.menorOrb)}</div></div>
          <div class="card"><div class="rot">Anúncios</div><div class="val">${fmt(u.anuncios)}</div><div class="sub">${u.shinys ? `${fmt(u.shinys)} shiny · ` : ''}atualizado ${dataHora(u.t)}</div></div>
        </div>
        <div style="margin-top:6px">${sparkline(hist.map((h) => h[1]), 440, 36)}</div>`
        : '<div class="dim" style="margin-top:6px">Ainda sem leitura. Clique em "Checar agora" ou abra no mercado do jogo.</div>'}
      ${w.alvoGold || w.alvoOrb ? `<div class="dim">Alvo: ${w.alvoGold ? curto(w.alvoGold) + ' coins' : ''} ${w.alvoOrb ? curto(w.alvoOrb) + ' gemas' : ''}</div>` : ''}
    </div>`;
  }

  /* ---------------- PROGRESSO ---------------- */
  function ritmoNaJanela(min) {
    const agora = Date.now();
    const pts = S.store.ritmo.filter((p) => agora - p[0] <= min * 60_000);
    if (S.eu && Number.isFinite(Number(S.eu.xp))) pts.push([agora, Number(S.eu.xp), Number(S.eu.gold) || 0]);
    if (pts.length < 2) return null;
    const a = pts[0]; const b = pts[pts.length - 1];
    const ms = b[0] - a[0];
    if (ms < 60_000) return null;
    return { ms, xpH: ((b[1] - a[1]) / ms) * 3600_000, goldH: ((b[2] - a[2]) / ms) * 3600_000, xp: b[1] - a[1], gold: b[2] - a[2] };
  }
  function telaProgresso() {
    const eu = S.eu;
    const f = S.ui.filtros;
    const faixa = f.progFaixa ?? '24h';
    const janela = Number(f.progJanela ?? 30);
    const ms = { '24h': 864e5, '7d': 7 * 864e5, '30d': 30 * 864e5, tudo: Infinity }[faixa];
    const pts = S.store.progresso.filter((p) => Date.now() - p.t <= ms);
    const ini = pts[0];
    const fim = eu ? { t: Date.now(), level: Number(eu.level), xp: Number(eu.xp), gold: Number(eu.gold), orbs: Number(eu.orbs) || 0, diamonds: Number(eu.diamonds) || 0,
      dex: eu.pokedex ? Object.keys(eu.pokedex).length : 0, pks: eu.pokemons?.length ?? 0 } : pts[pts.length - 1];
    if (!fim) return '<div class="vazio">Abra o jogo e entre na conta: o progresso começa a ser registrado na hora.</div>';
    const serie = [...pts, ...(eu ? [fim] : [])];
    const delta = (k) => (ini ? fim[k] - ini[k] : null);
    const d = (k) => { const v = delta(k); return v == null ? '<span class="dim">—</span>' : `<span class="${v >= 0 ? 'pos' : 'neg'}">${v >= 0 ? '+' : ''}${curto(v)}</span> no período`; };
    const faixaNv = eu && eu.xpProximo ? Math.max(1, eu.xpProximo - eu.xpNivel) : null;
    const pctNivel = faixaNv ? Math.min(100, ((eu.xp - eu.xpNivel) / faixaNv) * 100) : null;
    // Ritmo
    const r = ritmoNaJanela(janela);
    const faltaXp = eu && eu.xpProximo ? Number(eu.xpProximo) - Number(eu.xp) : null;
    const eta = r && r.xpH > 0 && faltaXp > 0 ? (faltaXp / r.xpH) * 3600_000 : null;
    const porNivel = r && r.xpH > 0 && faixaNv ? (faixaNv / r.xpH) * 3600_000 : null;
    const chegada = eta ? new Date(Date.now() + eta) : null;
    const quando = chegada ? (chegada.toDateString() === new Date().toDateString() ? `hoje às ${hora(chegada)}` : dataHora(chegada)) : '';
    // Barras de ganho: por hora (24h) ou por dia.
    const porHoraB = faixa === '24h';
    const baldes = new Map();
    for (const p of serie) {
      const dt = new Date(p.t);
      const chave = porHoraB ? `${dt.toDateString()} ${dt.getHours()}` : dt.toDateString();
      const b = baldes.get(chave) ?? { ini: p, fim: p, t: p.t };
      b.fim = p;
      baldes.set(chave, b);
    }
    const lista = [...baldes.values()];
    // O ganho de cada balde conta a partir do fim do anterior, para não perder o que caiu entre eles.
    const barras = (campo) => lista.map((b, i) => {
      const base = i > 0 ? lista[i - 1].fim[campo] : b.ini[campo];
      const dt = new Date(b.t);
      return { v: b.fim[campo] - base, rot: porHoraB ? `${dt.getHours()}h` : dt.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
        dica: porHoraB ? `${dt.toLocaleDateString('pt-BR')} ${dt.getHours()}h` : dt.toLocaleDateString('pt-BR') };
    }).slice(porHoraB ? -24 : -30);
    const grafTipo = f.progGraf ?? 'barras';
    return `
      <h3>Ritmo agora</h3>
      <div class="linha seg">${[10, 30, 60, 180].map((m) => `<button class="aba ${m === janela ? 'sel' : ''}" data-janela="${m}">${m < 60 ? m + ' min' : m / 60 + ' h'}</button>`).join('')}
        <span class="dim">${r ? `base: últimos ${duracao(r.ms)}` : ''}</span></div>
      ${r ? `<div class="ritmo">
          <div class="rt xp"><div class="rot">XP por hora</div><div class="val">${curto(r.xpH)}</div><div class="sub">+${curto(r.xp)} nos últimos ${duracao(r.ms)}</div></div>
          <div class="rt gold"><div class="rot">Coins por hora</div><div class="val ${r.goldH < 0 ? 'neg' : ''}">${r.goldH >= 0 ? '' : '−'}${curto(Math.abs(r.goldH))}</div><div class="sub">${r.gold >= 0 ? '+' : ''}${curto(r.gold)} no saldo</div></div>
          <div class="rt nivel"><div class="rot">Próximo nível (${fmt(Number(eu?.level) + 1)})</div><div class="val">${eta ? '~' + duracao(eta) : '—'}</div><div class="sub">${eta ? quando : 'sem XP nessa janela'}</div>
            ${pctNivel != null ? `<div class="barra"><i style="width:${pctNivel}%"></i></div><div class="sub">${pctNivel.toFixed(1).replace('.', ',')}% · faltam ${curto(faltaXp)} XP</div>` : ''}</div>
          <div class="rt"><div class="rot">Um nível inteiro leva</div><div class="val">${porNivel ? '~' + duracao(porNivel) : '—'}</div><div class="sub">${porNivel ? `≈ ${(24 * 3600_000 / porNivel).toFixed(1).replace('.', ',')} níveis por dia` : ''}</div></div>
        </div>
        <div class="dim" style="margin-top:4px">Coins por hora é a variação do saldo: compras no mercado entram como gasto.</div>`
        : '<div class="vazio peq">Precisa de pelo menos 1 minuto de jogo com a extensão aberta. As medições são a cada 30 s.</div>'}

      <div class="linha" style="margin-top:14px"><h3 style="margin:0">Período</h3><span class="sp"></span>
        ${['24h', '7d', '30d', 'tudo'].map((x) => `<button class="aba ${x === faixa ? 'sel' : ''}" data-faixa="${x}">${x}</button>`).join('')}</div>
      <div class="grade" style="margin-top:8px">
        <div class="card"><div class="rot">Nível</div><div class="val">${fmt(fim.level)}</div><div class="sub">${d('level')}</div></div>
        <div class="card"><div class="rot">XP total</div><div class="val">${curto(fim.xp)}</div><div class="sub">${d('xp')}</div></div>
        <div class="card"><div class="rot">Coins</div><div class="val">${curto(fim.gold)}</div><div class="sub">${d('gold')}</div></div>
        <div class="card"><div class="rot">Gemas</div><div class="val">${curto(fim.orbs)}</div><div class="sub">${d('orbs')}</div></div>
        <div class="card"><div class="rot">Pokédex</div><div class="val">${fmt(fim.dex)}</div><div class="sub">${d('dex')}</div></div>
        <div class="card"><div class="rot">Pokémon</div><div class="val">${fmt(fim.pks)}</div><div class="sub">${d('pks')}</div></div>
      </div>

      <div class="linha" style="margin-top:14px"><h3 style="margin:0">Gráficos</h3><span class="sp"></span>
        <button class="aba ${grafTipo === 'barras' ? 'sel' : ''}" data-graf="barras">Ganho por ${porHoraB ? 'hora' : 'dia'}</button>
        <button class="aba ${grafTipo === 'linha' ? 'sel' : ''}" data-graf="linha">Acumulado</button></div>
      <div class="graf-card"><div class="graf-tit"><span style="color:#b78cff">●</span> XP ${grafTipo === 'barras' ? `ganho por ${porHoraB ? 'hora' : 'dia'}` : 'total'}</div>
        ${grafTipo === 'barras' ? graficoBarras(barras('xp'), '#9b6bff', 'XP') : graficoArea(serie.map((p) => [p.t, p.xp]), '#b78cff', 'XP')}</div>
      <div class="graf-card"><div class="graf-tit"><span style="color:#ffd166">●</span> Coins ${grafTipo === 'barras' ? `por ${porHoraB ? 'hora' : 'dia'} (variação do saldo)` : '(saldo)'}</div>
        ${grafTipo === 'barras' ? graficoBarras(barras('gold'), '#ffc940', 'Coins') : graficoArea(serie.map((p) => [p.t, p.gold]), '#ffd166', 'Coins')}</div>
      <div class="graf-card"><div class="graf-tit"><span style="color:#3ecf8e">●</span> Nível</div>
        ${graficoArea(serie.map((p) => [p.t, p.level]), '#3ecf8e', 'Nível')}</div>
      <div class="dim">Passe o mouse nos pontos e nas barras para ver o valor.</div>
    `;
  }

  /* ---------------- MEUS POKÉMON ---------------- */
  function analiseTipos(tipos) {
    const fraco = [];
    const resiste = [];
    const imune = [];
    for (const a of TIPOS) {
      const m = efetividade(a, tipos[0], tipos[1]);
      if (m === 0) imune.push([a, m]);
      else if (m >= 2) fraco.push([a, m]);
      else if (m <= 0.5) resiste.push([a, m]);
    }
    const forte = new Map();
    for (const t of tipos) for (const d of TIPOS) if (multTipo(t, d) >= 2) forte.set(d, Math.max(forte.get(d) ?? 0, multTipo(t, d)));
    const ruim = new Map();
    for (const d of TIPOS) {
      const melhor = Math.max(...tipos.map((t) => multTipo(t, d)));
      if (melhor <= 0.5) ruim.set(d, melhor);
    }
    return { fraco, resiste, imune, forte: [...forte.entries()], ruim: [...ruim.entries()] };
  }
  const chipsMult = (lista) => (lista.length ? lista.map(([t, m]) => `<span class="chip ${m >= 4 || (m > 0 && m <= 0.25) ? 'x2' : ''}" style="background:${COR_TIPO[t]}" title="×${String(m).replace('.', ',')}">${NOME_TIPO[t]}${m >= 4 ? ' ×4' : m > 0 && m <= 0.25 ? ' ×¼' : ''}</span>`).join('') : '<span class="dim">nenhum</span>');
  function blocoTipos(tipos) {
    if (!tipos.length) return '<div class="dim">Tipos desconhecidos.</div>';
    const a = analiseTipos(tipos);
    return `<div class="lin"><b>⚔ Forte contra:</b> ${chipsMult(a.forte)}</div>
      <div class="lin"><b>🪨 Ataque fraco contra:</b> ${chipsMult(a.ruim)}</div>
      <div class="lin"><b>💥 Leva muito dano de:</b> ${chipsMult(a.fraco)}</div>
      <div class="lin"><b>🛡 Resiste a:</b> ${chipsMult(a.resiste)}</div>
      ${a.imune.length ? `<div class="lin"><b>🚫 Imune a:</b> ${chipsMult(a.imune)}</div>` : ''}`;
  }
  const nivelSelo = (v, cortes) => cortes.findIndex((c) => v < c) === -1 ? cortes.length : cortes.findIndex((c) => v < c);
  function selosPk(p) {
    const out = [];
    if (p.potencia) out.push(`<span class="selo t${Math.min(4, Math.max(0, Number(p.potencia) - 1))}">P${p.potencia}</span>`);
    const iv = ivTotal(p);
    if (iv != null) out.push(`<span class="selo t${nivelSelo(iv, [60, 100, 130, 150])}">IV ${fmt(iv)}</span>`);
    const q = Number(p.quality ?? p.qualidade);
    if (q > 0) out.push(`<span class="selo t${nivelSelo(q, [1.0, 1.3, 1.5, 1.7])}">Q ${q.toFixed(3).replace('.', ',')}</span>`);
    const n = notaDe(p) ?? 0;
    if (n > 0) out.push(`<span class="selo t${nivelSelo(n, [2, 3, 3.5, 4.5])}">N ${n.toFixed(3).replace('.', ',')}</span>`);
    return out.join('');
  }
  const STATS = [['baseHp', 'HP'], ['baseAtk', 'Atk'], ['baseDef', 'Def'], ['baseSpAtk', 'SpA'], ['baseSpDef', 'SpD'], ['baseSpeed', 'Vel']];
  function barrasStats(esp) {
    if (!esp) return '';
    return `<div class="stats">${STATS.map(([k, r]) => { const v = Number(esp[k]) || 0; return `<div class="st"><span>${r}</span><i><b style="width:${Math.min(100, (v / 180) * 100)}%;background:${v >= 120 ? '#3ecf8e' : v >= 90 ? '#8bd450' : v >= 60 ? '#ffd166' : '#ff8a5c'}"></b></i><em>${v}</em></div>`; }).join('')}</div>`;
  }
  /* ---------------- O QUE UPAR (categoria dos golpes, vinda do jogo) ---------------- */
  const CAT_GOLPE = {
    PHYSICAL: { ic: '⚔️', nome: 'Físico', cls: 'fis' },
    SPECIAL: { ic: '✨', nome: 'Especial', cls: 'esp' },
    STATUS: { ic: '🛡️', nome: 'Status', cls: 'sta' },
  };
  const catGolpe = (a) => CAT_GOLPE[String(a?.category ?? '').toUpperCase()] ?? null;
  function pillGolpe(a, liberado = true) {
    const c = catGolpe(a);
    const tp = normTipo(a.type);
    const cor = tp ? COR_TIPO[tp] : null;
    return `<span class="pill golpe ${c ? c.cls : ''} ${liberado ? '' : 'bloq'}" title="${c ? c.nome : 'Categoria desconhecida'}${tp ? ' · ' + NOME_TIPO[tp] : ''}"${cor ? ` style="border-left:3px solid ${cor}"` : ''}>${c ? c.ic + ' ' : ''}${esc(a.name)}${a.power ? ' · ' + a.power : ''}${a.learnLevel > 1 ? ' · Nv ' + a.learnLevel : ''}</span>`;
  }
  // nivel = nível do seu Pokémon (só conta golpes já liberados); sem nível = todos os golpes da espécie.
  function blocoUpar(esp, nivel) {
    const golpes = Array.isArray(esp?.attacks) ? esp.attacks : [];
    if (!golpes.length) return '';
    const nv = Number(nivel) || 0;
    const liberados = nv ? golpes.filter((a) => (Number(a.learnLevel) || 0) <= nv) : golpes;
    let fis = 0, espc = 0, nFis = 0, nEsp = 0, nSta = 0;
    for (const a of liberados) {
      const k = String(a.category ?? '').toUpperCase();
      const pw = Number(a.power) || 0;
      if (k === 'PHYSICAL') { fis += pw; nFis++; } else if (k === 'SPECIAL') { espc += pw; nEsp++; } else if (k === 'STATUS') nSta++;
    }
    const tot = fis + espc;
    let rec;
    if (!tot) rec = '<b>Sem golpes de dano liberados</b> — os golpes de Status dependem do efeito.';
    else {
      const pf = Math.round((fis / tot) * 100);
      if (pf >= 65) rec = `<b>Upe ATK</b> (${pf}% do poder dos golpes é Físico). Para aguentar golpes físicos, DEF.`;
      else if (pf <= 35) rec = `<b>Upe SP.ATK</b> (${100 - pf}% do poder dos golpes é Especial). Para aguentar golpes especiais, SP.DEF.`;
      else rec = `<b>Misto</b> — ${pf}% Físico / ${100 - pf}% Especial. Divida entre ATK e SP.ATK, ou foque no lado dos golpes que você mais usa.`;
    }
    const pf2 = tot ? (fis / tot) * 100 : 0;
    return `<div class="upar">
      <h3>📊 O que upar${nv ? ` <span class="dim">(golpes liberados até o Nv ${fmt(nv)})</span>` : ''}</h3>
      <div class="lin">${rec}</div>
      ${tot ? `<div class="upar-barra" title="Poder Físico ${fmt(fis)} · Especial ${fmt(espc)}"><i class="fis" style="width:${pf2}%"></i><i class="esp" style="width:${100 - pf2}%"></i></div>` : ''}
      <div class="dim">⚔️ ${nFis} Físico · ✨ ${nEsp} Especial · 🛡️ ${nSta} Status</div>
      <div class="lin" style="margin-top:4px">${golpes.map((a) => pillGolpe(a, !nv || (Number(a.learnLevel) || 0) <= nv)).join(' ')}</div>
    </div>`;
  }
  function telaMeus() {
    const eu = S.eu;
    if (!eu?.pokemons) return '<div class="vazio">Entre no jogo para ver seus Pokémon.</div>';
    const f = S.ui.filtros;
    const busca = (f.meusBusca ?? '').toLowerCase();
    const equipe = new Set((eu.equipeIds ?? eu.equipe ?? []).map((x) => (typeof x === 'object' ? x.id : x)));
    const todos = eu.pokemons;
    let lista = todos.slice();
    if (f.meusSo === 'equipe') lista = lista.filter((p) => equipe.has(p.id) || p.id === eu.activeId);
    if (f.meusSo === 'shiny') lista = lista.filter((p) => p.shiny);
    if (f.meusTipo) lista = lista.filter((p) => tiposDe(p).includes(f.meusTipo));
    if (busca) lista = lista.filter((p) => String(p.nome ?? nomeEspecie(p.speciesId)).toLowerCase().includes(busca));
    const ord = f.meusOrdem ?? 'nivel';
    const chave = { nivel: (p) => -(Number(p.level) || 0), iv: (p) => -(ivTotal(p) || 0), q: (p) => -(Number(p.quality) || 0), n: (p) => -(notaDe(p) || 0), nome: (p) => String(p.nome ?? nomeEspecie(p.speciesId)) };
    lista.sort((a, b) => {
      if (a.id === eu.activeId) return -1;
      if (b.id === eu.activeId) return 1;
      const ea = equipe.has(a.id); const eb = equipe.has(b.id);
      if (ea !== eb) return ea ? -1 : 1;
      const ka = chave[ord](a); const kb = chave[ord](b);
      return typeof ka === 'string' ? ka.localeCompare(kb) : ka - kb;
    });
    const aberto = f.meusAberto;
    const mostrar = lista.slice(0, f.meusLimite ?? 60);
    const shinies = todos.filter((p) => p.shiny).length;
    const media = todos.length ? todos.reduce((a, p) => a + (Number(p.level) || 0), 0) / todos.length : 0;
    const cartao = (p) => {
      const tipos = tiposDe(p);
      const nome = p.nome ?? nomeEspecie(p.speciesId);
      const c1 = COR_TIPO[tipos[0]] ?? '#7b4dff';
      const c2 = COR_TIPO[tipos[1] ?? tipos[0]] ?? c1;
      const ativo = p.id === eu.activeId;
      const naEquipe = equipe.has(p.id);
      const pct = p.xpProximo ? Math.max(0, Math.min(100, ((p.xp - p.xpNivel) / Math.max(1, p.xpProximo - p.xpNivel)) * 100)) : null;
      const ab = aberto === p.id;
      const esp = especieDe(p);
      return `<div class="pk ${ab ? 'aberto' : ''} ${p.shiny ? 'shiny' : ''} ${ativo ? 'ativo' : ''}" data-pk="${esc(p.id)}" style="--c1:${c1};--c2:${c2}">
        <div class="pk-topo">
          <div class="pk-arte">${imgSprite(lookDe(p), ab ? 96 : 64)}${p.shiny ? '<span class="brilho">✨</span>' : ''}</div>
          <div class="pk-info">
            <div class="pk-nome">${esc(nome)}</div>
            <div class="pk-nv">Nv <b>${fmt(p.level)}</b>${ativo ? '<span class="tag campo">EM CAMPO</span>' : naEquipe ? '<span class="tag">EQUIPE</span>' : ''}</div>
            <div>${chipsTipos(tipos)}</div>
            <div class="selos">${selosPk(p)}</div>
            ${pct != null ? `<div class="barra" title="${fmt(p.xp - p.xpNivel)} / ${fmt(p.xpProximo - p.xpNivel)} XP"><i style="width:${pct}%"></i></div>` : ''}
          </div>
        </div>
        ${ab ? `<div class="pk-det">
          <div class="det">${blocoTipos(tipos)}</div>
          ${esp ? `<h3>Status base da espécie</h3>${barrasStats(esp)}` : ''}
          ${esp ? blocoUpar(esp, p.level) : ''}
          ${pct != null ? `<div class="dim">XP no nível: ${fmt(p.xp - p.xpNivel)} / ${fmt(p.xpProximo - p.xpNivel)} (${pct.toFixed(1).replace('.', ',')}%)</div>` : ''}
        </div>` : ''}
      </div>`;
    };
    return `
      <div class="resumo-pk">
        <div><b>${fmt(todos.length)}</b><span>Pokémon</span></div>
        <div><b>${fmt(shinies)}</b><span>Shinies</span></div>
        <div><b>${fmt(media)}</b><span>Nível médio</span></div>
        <div><b>${fmt(equipe.size || 0)}</b><span>Na equipe</span></div>
      </div>
      <div class="linha"><input placeholder="Buscar Pokémon…" data-campo="meus-busca" value="${esc(f.meusBusca ?? '')}" style="flex:1"></div>
      <div class="linha" style="margin-top:6px">
        <select data-filtro="meusSo"><option value="">Todos</option><option value="equipe" ${f.meusSo === 'equipe' ? 'selected' : ''}>Equipe</option><option value="shiny" ${f.meusSo === 'shiny' ? 'selected' : ''}>Shiny</option></select>
        <select data-filtro="meusTipo"><option value="">Todos os tipos</option>${TIPOS.map((t) => `<option value="${t}" ${f.meusTipo === t ? 'selected' : ''}>${NOME_TIPO[t]}</option>`).join('')}</select>
        <select data-filtro="meusOrdem">${[['nivel', 'Nível'], ['iv', 'IV'], ['q', 'Qualidade'], ['n', 'Nota'], ['nome', 'Nome']].map(([v, n]) => `<option value="${v}" ${ord === v ? 'selected' : ''}>Ordem: ${n}</option>`).join('')}</select>
      </div>
      <div class="dim" style="margin:8px 0">${fmt(lista.length)} Pokémon · toque num card para ver forças, fraquezas e status.</div>
      <div class="pk-grade">${mostrar.map(cartao).join('')}</div>
      ${lista.length > mostrar.length ? `<div class="linha" style="margin-top:10px"><button class="b sec" data-acao="meus-mais">Mostrar mais (${fmt(lista.length - mostrar.length)})</button></div>` : ''}
    `;
  }

  /* ---------------- POKÉDEX ---------------- */
  const RARIDADE_PT = { COMMON: 'Comum', UNCOMMON: 'Incomum', RARE: 'Raro', EPIC: 'Épico', LEGENDARY: 'Lendário', MYTHIC: 'Mítico' };
  function telaDex() {
    if (!S.especies.size) return '<div class="vazio">Carregando a lista de espécies…</div>';
    const f = S.ui.filtros;
    const busca = (f.dexBusca ?? '').toLowerCase();
    const dex = S.eu?.pokedex ?? null;
    const registrado = (c) => !!(dex && (dex[c.pokeId] != null || dex[String(c.pokeId)] != null));
    let lista = [...S.especies.values()];
    if (busca) lista = lista.filter((c) => c.name.toLowerCase().includes(busca) || String(c.pokeId) === busca);
    if (f.dexTipo) lista = lista.filter((c) => tiposDe(c).includes(f.dexTipo));
    if (f.dexRar) lista = lista.filter((c) => c.rarity === f.dexRar);
    if (f.dexSo === 'falta' && dex) lista = lista.filter((c) => !registrado(c));
    if (f.dexSo === 'tem' && dex) lista = lista.filter((c) => registrado(c));
    const ord = f.dexOrdem ?? 'id';
    const total = (c) => ['baseHp', 'baseAtk', 'baseDef', 'baseSpAtk', 'baseSpDef', 'baseSpeed'].reduce((s, k) => s + (Number(c[k]) || 0), 0);
    const ordens = { id: (a, b) => a.pokeId - b.pokeId, nome: (a, b) => a.name.localeCompare(b.name), hunt: (a, b) => (a.huntLevel || 0) - (b.huntLevel || 0), total: (a, b) => total(b) - total(a), preco: (a, b) => (b.priceNpc || 0) - (a.priceNpc || 0) };
    lista.sort(ordens[ord] ?? ordens.id);
    const raridades = [...new Set([...S.especies.values()].map((c) => c.rarity).filter(Boolean))];
    const qtdReg = dex ? [...S.especies.values()].filter(registrado).length : null;
    const mostrar = lista.slice(0, f.dexLimite ?? 150);
    return `
      <div class="linha"><input placeholder="Nome ou número…" data-campo="dex-busca" value="${esc(f.dexBusca ?? '')}" style="flex:1"></div>
      <div class="linha" style="margin-top:6px">
        <select data-filtro="dexTipo"><option value="">Todos os tipos</option>${TIPOS.map((t) => `<option value="${t}" ${f.dexTipo === t ? 'selected' : ''}>${NOME_TIPO[t]}</option>`).join('')}</select>
        <select data-filtro="dexRar"><option value="">Toda raridade</option>${raridades.map((r) => `<option value="${r}" ${f.dexRar === r ? 'selected' : ''}>${RARIDADE_PT[r] ?? r}</option>`).join('')}</select>
        ${dex ? `<select data-filtro="dexSo"><option value="">Todas</option><option value="falta" ${f.dexSo === 'falta' ? 'selected' : ''}>Faltando</option><option value="tem" ${f.dexSo === 'tem' ? 'selected' : ''}>Registradas</option></select>` : ''}
        <select data-filtro="dexOrdem">${[['id', 'Nº'], ['nome', 'Nome'], ['hunt', 'Nível de hunt'], ['total', 'Status total'], ['preco', 'Preço NPC']].map(([v, n]) => `<option value="${v}" ${ord === v ? 'selected' : ''}>${n}</option>`).join('')}</select>
      </div>
      <div class="dim" style="margin:6px 0">${fmt(lista.length)} espécies${qtdReg != null ? ` · você registrou ${fmt(qtdReg)} de ${fmt(S.especies.size)}` : ''}. Clique numa linha para ver detalhes.</div>
      <table><tr><th>Nº</th><th>Nome</th><th>Tipos</th><th>Hunt</th><th>Total</th><th>NPC</th>${dex ? '<th>✓</th>' : ''}</tr>
      ${mostrar.map((c) => {
        const ab = f.dexAberto === c.pokeId;
        const evo = c.evolvesToId ? `${esc(nomeEspecie(c.evolvesToId))} (Nv ${fmt(c.evolveLevel)})` : '—';
        return `<tr class="clic" data-dex="${c.pokeId}"><td>${c.pokeId}</td><td class="com-spr">${imgSprite(c.looktype, 30)}${esc(c.name)}</td><td>${chipsTipos(tiposDe(c))}</td><td>${fmt(c.huntLevel)}</td><td>${fmt(total(c))}</td><td>${curto(c.priceNpc)}</td>${dex ? `<td>${registrado(c) ? '✅' : ''}</td>` : ''}</tr>
        ${ab ? `<tr><td colspan="7"><div class="det">
          <div class="lin">${esc(c.description ?? '')}</div>
          <div class="lin"><b>Raridade:</b> ${RARIDADE_PT[c.rarity] ?? esc(c.rarity ?? '—')} · <b>Evolui para:</b> ${evo} · <b>Venda:</b> ${curto(c.sellValue)} · <b>XP base:</b> ${fmt(c.experience)}</div>
          <div class="lin"><b>Status:</b> HP ${fmt(c.baseHp)} · Atk ${fmt(c.baseAtk)} · Def ${fmt(c.baseDef)} · SpA ${fmt(c.baseSpAtk)} · SpD ${fmt(c.baseSpDef)} · Vel ${fmt(c.baseSpeed)}</div>
          ${blocoTipos(tiposDe(c))}
          ${blocoUpar(c)}
          ${Array.isArray(c.loot) && c.loot.length ? `<div class="lin"><b>Loot:</b> ${c.loot.map((l) => `<span class="pill">${esc(l.name ?? nomeItem(l.itemId ?? l.id))}</span>`).join(' ')}</div>` : ''}
        </div></td></tr>` : ''}`;
      }).join('')}</table>
      ${lista.length > mostrar.length ? `<div class="linha" style="margin-top:8px"><button class="b sec" data-acao="dex-mais">Mostrar mais (${fmt(lista.length - mostrar.length)})</button></div>` : ''}
    `;
  }

  /* ---------------- TIPOS ---------------- */
  function telaTipos() {
    const cls = (m) => (m === 0 ? 'm0' : m >= 4 ? 'm4' : m >= 2 ? 'm2' : m <= 0.25 ? 'm025' : m <= 0.5 ? 'm05' : '');
    const txt = (m) => (m === 1 ? '' : m === 0.5 ? '½' : m === 0.25 ? '¼' : String(m));
    const sel = S.ui.filtros.tiposCombo ?? ['', ''];
    const combo = sel.filter(Boolean);
    return `
      <div class="dim" style="margin-bottom:8px">Linhas = tipo do ataque, colunas = tipo de quem leva o golpe. ${S.tabelaTipos ? 'Tabela recebida do jogo.' : 'Tabela padrão (a do jogo chega quando você entra).'}</div>
      <div style="overflow-x:auto"><table class="tipos-grade"><tr><th class="lat"></th>${TIPOS.map((t) => `<th class="cab" style="color:${COR_TIPO[t]}">${NOME_TIPO[t]}</th>`).join('')}</tr>
      ${TIPOS.map((a) => `<tr><th class="lat" style="color:${COR_TIPO[a]}">${NOME_TIPO[a]}</th>${TIPOS.map((d) => { const m = multTipo(a, d); return `<td class="${cls(m)}" title="${NOME_TIPO[a]} → ${NOME_TIPO[d]}: ×${m}">${txt(m)}</td>`; }).join('')}</tr>`).join('')}
      </table></div>
      <h3>Testar uma combinação</h3>
      <div class="linha">${[0, 1].map((i) => `<select data-combo="${i}"><option value="">${i ? '(sem 2º tipo)' : 'Tipo 1'}</option>${TIPOS.map((t) => `<option value="${t}" ${sel[i] === t ? 'selected' : ''}>${NOME_TIPO[t]}</option>`).join('')}</select>`).join('')}</div>
      ${combo.length ? `<div class="det" style="margin-top:8px">${blocoTipos(combo)}</div>` : ''}
    `;
  }

  /* ---------------- EVENTOS DA UI ---------------- */
  function ligarEventos(aba) {
    const corpo = S.ui.corpo;
    const campo = (nome) => corpo.querySelector(`[data-campo="${nome}"]`);
    corpo.querySelectorAll('[data-cfg]').forEach((el) => {
      el.onchange = () => { S.store.config[el.dataset.cfg] = el.checked; salvar('config'); if (el.dataset.cfg === 'vigiaAuto' && el.checked) vigiarMercado(false); el.closest('.sw-card')?.classList.toggle('on', el.checked); };
    });
    corpo.querySelectorAll('[data-cfg-sel]').forEach((el) => {
      el.onchange = () => { S.store.config[el.dataset.cfgSel] = Number(el.value); salvar('config'); };
    });
    corpo.querySelectorAll('[data-regra-on]').forEach((el) => {
      el.onchange = () => { const r = S.store.regrasAlerta[Number(el.dataset.regraOn)]; if (r) { r.ativo = el.checked; salvar('regrasAlerta'); renderizar(); } };
    });
    const formRegra = { 'regra-nome': 'regraNome', 'regra-p': 'regraP', 'regra-iv': 'regraIV', 'regra-q': 'regraQ', 'regra-n': 'regraN' };
    for (const [c, k] of Object.entries(formRegra)) {
      const el = campo(c);
      if (!el) continue;
      el.addEventListener('input', () => { S.ui.filtros[k] = el.value; });
      el.addEventListener('change', () => { S.ui.filtros[k] = el.value; });
    }
    const nomeRegra = campo('regra-nome');
    if (nomeRegra) {
      nomeRegra.addEventListener('change', () => {
        const esp = S.especiePorNome.get(nomeRegra.value.trim().toLowerCase());
        const arte = corpo.querySelector('.fr-arte');
        if (arte) { arte.innerHTML = esp ? imgSprite(esp.looktype, 56) : '<span class="fr-qualquer">★</span>'; hidratarSprites(arte); }
      });
    }
    const shinyRegra = campo('regra-shiny');
    if (shinyRegra) shinyRegra.onchange = () => { S.ui.filtros.regraShiny = shinyRegra.checked; };
    corpo.querySelectorAll('[data-filtro]').forEach((el) => {
      el.onchange = () => { S.ui.filtros[el.dataset.filtro] = el.value; renderizar(); };
    });
    corpo.querySelectorAll('[data-faixa]').forEach((el) => { el.onclick = () => { S.ui.filtros.progFaixa = el.dataset.faixa; renderizar(); }; });
    corpo.querySelectorAll('[data-janela]').forEach((el) => { el.onclick = () => { S.ui.filtros.progJanela = Number(el.dataset.janela); renderizar(); }; });
    corpo.querySelectorAll('[data-graf]').forEach((el) => { el.onclick = () => { S.ui.filtros.progGraf = el.dataset.graf; renderizar(); }; });
    corpo.querySelectorAll('[data-combo]').forEach((el) => {
      el.onchange = () => { const c = S.ui.filtros.tiposCombo ?? ['', '']; c[Number(el.dataset.combo)] = el.value; S.ui.filtros.tiposCombo = c; renderizar(); };
    });
    corpo.querySelectorAll('[data-pk]').forEach((tr) => {
      tr.onclick = () => { const id = isNaN(Number(tr.dataset.pk)) ? tr.dataset.pk : Number(tr.dataset.pk); S.ui.filtros.meusAberto = S.ui.filtros.meusAberto === id ? null : id; renderizar(); };
    });
    corpo.querySelectorAll('tr[data-dex]').forEach((tr) => {
      tr.onclick = () => { const id = Number(tr.dataset.dex); S.ui.filtros.dexAberto = S.ui.filtros.dexAberto === id ? null : id; renderizar(); };
    });
    const buscaComDebounce = (nomeCampo, filtro) => {
      const el = campo(nomeCampo);
      if (!el) return;
      let t;
      el.oninput = () => { clearTimeout(t); t = setTimeout(() => { S.ui.filtros[filtro] = el.value; el.blur(); renderizar(); const n = campo(nomeCampo); if (n) { n.focus(); n.setSelectionRange(n.value.length, n.value.length); } }, 350); };
    };
    buscaComDebounce('meus-busca', 'meusBusca');
    buscaComDebounce('dex-busca', 'dexBusca');

    corpo.querySelectorAll('[data-acao]').forEach((el) => {
      el.onclick = (ev) => {
        ev.stopPropagation();
        const i = Number(el.dataset.i);
        switch (el.dataset.acao) {
          case 'nova-sessao':
            if (confirmar('Guardar a sessão atual e começar uma nova?')) { encerrarSessao(); renderizar(); }
            break;
          case 'copiar-sessao':
            navigator.clipboard?.writeText(textoSessao()).then(() => toast('Resumo copiado', 'Cole onde quiser.', ''));
            break;
          case 'testar-alerta':
            alertar('✨ Teste de alerta', 'É assim que o aviso vai aparecer.', 'shiny');
            break;
          case 'add-regra': {
            const nomeTxt = (campo('regra-nome')?.value ?? '').trim();
            let esp = null;
            if (nomeTxt) {
              esp = S.especiePorNome.get(nomeTxt.toLowerCase());
              if (!esp) { toast('Não achei essa espécie', 'Escolha um nome da lista ou deixe vazio.', ''); break; }
            }
            const num = (nome) => Math.max(0, Number(String(campo(nome)?.value ?? '').trim().replace(/\./g, (m, i, t) => (/,/.test(t) ? '' : m)).replace(',', '.')) || 0);
            const r = novaRegra({
              speciesId: esp?.pokeId ?? null, nome: esp?.name ?? 'Qualquer Pokémon',
              minP: num('regra-p'), minIV: num('regra-iv'), minQ: num('regra-q'), minN: num('regra-n'),
              soShiny: !!campo('regra-shiny')?.checked,
            });
            S.store.regrasAlerta.unshift(r);
            salvar('regrasAlerta');
            if (!S.store.config.alertaEspecies) { S.store.config.alertaEspecies = true; salvar('config'); }
            for (const k of ['regraNome', 'regraP', 'regraIV', 'regraQ', 'regraN', 'regraShiny']) delete S.ui.filtros[k];
            toast('Regra criada', `${r.nome} · ${chipsRegra(r).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()}`, '');
            renderizar();
            break;
          }
          case 'rm-regra': {
            const r = S.store.regrasAlerta[i];
            if (r && confirmar(`Apagar a regra de ${r.nome}?`)) {
              S.store.regrasAlerta.splice(i, 1);
              salvar('regrasAlerta');
              renderizar();
            }
            break;
          }
          case 'limpar-alertas':
            S.store.alertas = [];
            salvar('alertas');
            renderizar();
            break;
          case 'copiar-diag':
            navigator.clipboard?.writeText(diagnostico()).then(() => toast('Diagnóstico copiado', 'Pode colar na conversa.', ''));
            break;
          case 'add-mk': {
            const nome = campo('mk-nome')?.value.trim();
            if (!nome) break;
            const low = nome.toLowerCase();
            const esp = S.especiePorNome.get(low);
            const item = [...S.itens.values()].find((x) => String(x.name).toLowerCase() === low);
            const alvoGold = Number(campo('mk-gold')?.value) || 0;
            const alvoOrb = Number(campo('mk-orb')?.value) || 0;
            let w = null;
            if (esp) w = { chave: 'p:' + esp.pokeId, tipo: 'pokemon', id: esp.pokeId, nome: esp.name, alvoGold, alvoOrb };
            else if (item) w = { chave: 'i:' + item.id, tipo: 'item', id: item.id, nome: item.name, alvoGold, alvoOrb };
            if (!w) { toast('Não achei esse nome', 'Escolha um Pokémon ou item da lista.', ''); break; }
            if (S.store.vigiaMercado.some((x) => x.chave === w.chave)) { toast('Já está na lista', w.nome, ''); break; }
            S.store.vigiaMercado.push(w);
            salvar('vigiaMercado');
            renderizar();
            break;
          }
          case 'rm-mk': {
            const w = S.store.vigiaMercado[i];
            if (w && confirmar(`Tirar ${w.nome} da lista?`)) {
              S.store.vigiaMercado.splice(i, 1);
              delete S.store.mercado[w.chave];
              salvar('vigiaMercado');
              salvar('mercado');
              renderizar();
            }
            break;
          }
          case 'editar-mk': {
            const w = S.store.vigiaMercado[i];
            if (!w) break;
            const g = prompt(`Alvo em coins para ${w.nome} (0 = sem alvo):`, w.alvoGold || 0);
            if (g === null) break;
            const o = prompt(`Alvo em gemas para ${w.nome} (0 = sem alvo):`, w.alvoOrb || 0);
            if (o === null) break;
            w.alvoGold = Number(String(g).replace(/\D/g, '')) || 0;
            w.alvoOrb = Number(String(o).replace(/\D/g, '')) || 0;
            salvar('vigiaMercado');
            renderizar();
            break;
          }
          case 'checar-mk':
            vigiarMercado(true);
            renderizar();
            break;
          case 'meus-mais':
            S.ui.filtros.meusLimite = (S.ui.filtros.meusLimite ?? 60) + 90;
            renderizar();
            break;
          case 'dex-mais':
            S.ui.filtros.dexLimite = (S.ui.filtros.dexLimite ?? 150) + 200;
            renderizar();
            break;
          default:
            break;
        }
      };
    });
  }
  function confirmar(msg) { return window.confirm(msg); }

  /* ============================================================
   * INÍCIO
   * ============================================================ */
  function iniciar() {
    montarUI();
    renderizar();
    carregarCatalogos();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar, { once: true });
  else iniciar();
  // Ao sair, guarda a sessão.
  addEventListener('beforeunload', () => salvar('sessao'));
  setInterval(() => salvar('sessao'), 60_000);
})();
