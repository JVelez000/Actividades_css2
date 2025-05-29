let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;

  // Evitar crear múltiples botones
  if (!document.getElementById('btn-install-pwa')) {
    const installBtn = document.createElement('button');
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

    document.body.appendChild(installBtn);

    installBtn.addEventListener('click', () => {
      installBtn.disabled = true; // evitar doble click
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
  }
});

window.addEventListener('appinstalled', () => {
  console.log('🎉 PWA instalada con éxito');
  const btn = document.getElementById('btn-install-pwa');
  if (btn) btn.remove();
});
