// Service worker: só mostra as notificações do sistema que o painel pede.
chrome.runtime.onMessage.addListener((msg, sender) => {
  if (!msg || msg.op !== 'notify') return;
  if (!sender.tab || !/^https:\/\/pokeidle\.io\//.test(sender.tab.url || '')) return;
  chrome.notifications.create('', {
    type: 'basic',
    iconUrl: chrome.runtime.getURL('icons/icon128.png'),
    title: String(msg.title || 'PokeXDD').slice(0, 120),
    message: String(msg.body || '').slice(0, 300),
    priority: 2,
  });
});

// Clicar no ícone da extensão abre o jogo (ou foca a aba dele).
chrome.action.onClicked.addListener(async () => {
  const tabs = await chrome.tabs.query({ url: 'https://pokeidle.io/*' });
  if (tabs.length) {
    await chrome.tabs.update(tabs[0].id, { active: true });
    await chrome.windows.update(tabs[0].windowId, { focused: true });
  } else {
    await chrome.tabs.create({ url: 'https://pokeidle.io/app' });
  }
});
