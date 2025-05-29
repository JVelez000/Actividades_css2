let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;

  let installBtn = document.getElementById('btn-install-pwa');
  if (!installBtn) {
    installBtn = document.createElement('button');
    installBtn.id = 'btn-install-pwa';
    installBtn.textContent = '⬇️ Instalar App';
    installBtn.style.position = 'fixed';
    installBtn.style.bottom = '20px';
    installBtn.style.right = '20px';
    installBtn.style.padding = '10px 15px';
    installBtn.style.backgroundColor = '#111';
    installBtn.style.color = '#fff';
    installBtn.style.border = 'none';
    installBtn.style.borderRadius = '10px';
    installBtn.style.zIndex = '1000';
    installBtn.style.cursor = 'pointer';
    installBtn.style.fontSize = '16px';
    installBtn.style.boxShadow = '0 4px 6px rgba(0,0,0,0.3)';

    document.body.appendChild(installBtn);
  }

  installBtn.addEventListener('click', () => {
    installBtn.disabled = true;
    deferredPrompt.prompt();

    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('✅ Usuario aceptó instalar la app');
      } else {
        console.log('❌ Usuario canceló la instalación');
      }
      deferredPrompt = null;
      installBtn.remove();
    });
  });
});

window.addEventListener('appinstalled', () => {
  console.log('🎉 PWA instalada con éxito');
  const btn = document.getElementById('btn-install-pwa');
  if (btn) btn.remove();
});
