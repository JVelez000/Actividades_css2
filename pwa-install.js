let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;

  let installBtn = document.getElementById('btn-install-pwa');
  if (!installBtn) {
    installBtn = document.createElement('button');
    installBtn.id = 'btn-install-pwa';
    installBtn.title = 'Instalar App';
    installBtn.textContent = '💾';
    installBtn.style.position = 'fixed';
    installBtn.style.bottom = '130px';
    installBtn.style.right = '7px';
    installBtn.style.width = '40px';
    installBtn.style.height = '40px';
    installBtn.style.borderRadius = '50%';
    installBtn.style.backgroundColor = '#111';
    installBtn.style.color = '#fff';
    installBtn.style.border = 'none';
    installBtn.style.fontSize = '24px';
    installBtn.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
    installBtn.style.zIndex = '9999';
    installBtn.style.cursor = 'pointer';

    installBtn.style.transition = 'transform 0.3s ease';
    installBtn.addEventListener('mouseover', () => {
      installBtn.style.transform = 'scale(1.1)';
    });
    installBtn.addEventListener('mouseout', () => {
      installBtn.style.transform = 'scale(1)';
    });

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
