(() => {
  const preview = document.getElementById('preview');
  const genBtn = document.getElementById('genBtn');
  const copyBtn = document.getElementById('copyBtn');
  const info = document.getElementById('info');
  const manual = document.getElementById('manual');

  function randomHex(){
    const hex = Math.floor(Math.random()*16777215).toString(16).padStart(6,'0');
    return `#${hex.toUpperCase()}`;
  }

  function applyColor(hex){
    preview.textContent = hex;
    preview.style.background = hex;
    document.body.style.background = `linear-gradient(180deg, ${hex}33, #041018)`;
    info.textContent = `Current color: ${hex}`;
  }

  genBtn.addEventListener('click', () => {
    const hex = randomHex();
    applyColor(hex);
  });

  copyBtn.addEventListener('click', async () => {
    const txt = preview.textContent.trim();
    try {
      await navigator.clipboard.writeText(txt);
      info.textContent = `${txt} copied to clipboard`;
    } catch (e) {
      info.textContent = `Copy failed — select and copy manually`;
    }
  });

  manual.addEventListener('keydown', (e) => {
    if(e.key === 'Enter'){
      const val = manual.value.trim();
      const ok = /^#?[0-9A-Fa-f]{6}$/.test(val);
      if(ok){
        const hex = val.startsWith('#') ? val.toUpperCase() : `#${val.toUpperCase()}`;
        applyColor(hex);
        manual.value = '';
      } else {
        info.textContent = 'Invalid hex. Use 6-digit hex like #1A2B3C';
      }
    }
  });

  // init with a random color
  applyColor(randomHex());
})();
