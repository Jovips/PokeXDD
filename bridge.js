// Ponte entre a página (inject.js, mundo MAIN) e a extensão: guarda dados e pede notificações.
(() => {
  const TAG = '__pic';
  const CHAVE = 'pic-dados';

  const enviarParaPagina = (payload) => window.postMessage({ [TAG]: 'toPage', ...payload }, location.origin);

  const carregar = () =>
    chrome.storage.local.get(CHAVE).then((r) => enviarParaPagina({ op: 'load', data: r[CHAVE] || {} }));

  window.addEventListener('message', (ev) => {
    if (ev.source !== window || ev.origin !== location.origin) return;
    const m = ev.data;
    if (!m || m[TAG] !== 'toExt') return;
    if (m.op === 'hello') {
      carregar();
    } else if (m.op === 'save' && typeof m.key === 'string') {
      chrome.storage.local.get(CHAVE).then((r) => {
        const dados = r[CHAVE] || {};
        dados[m.key] = m.value;
        return chrome.storage.local.set({ [CHAVE]: dados });
      });
    } else if (m.op === 'notify') {
      try {
        chrome.runtime.sendMessage({ op: 'notify', title: m.title, body: m.body });
      } catch (_) { /* extensão recarregada: ignora */ }
    }
  });

  carregar();
})();
