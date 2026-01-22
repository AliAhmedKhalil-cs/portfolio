(() => {
  const modal = document.querySelector('.dynasty-video-modal');
  const openBtn = document.querySelector('[data-open-dynasty-video]');
  const closeBtn = document.querySelector('[data-close-dynasty-video]');
  const video = document.querySelector('.dynasty-video-modal__video');

  if (!modal || !openBtn) return;

  const open = () => {
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    if (video && typeof video.play === 'function') {
      const playAttempt = video.play();
      if (playAttempt && typeof playAttempt.catch === 'function') {
        playAttempt.catch(() => {});
      }
    }
    document.body.classList.add('modal-open');
  };

  const close = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    if (video && typeof video.pause === 'function') {
      try { video.pause(); } catch (_) {}
    }
    document.body.classList.remove('modal-open');
  };

  openBtn.addEventListener('click', (e) => {
    e.preventDefault();
    open();
  });

  closeBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    close();
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) close();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      close();
    }
  });
})();
