(() => {
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });
  mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }));

  const filters = document.querySelectorAll('.filter');
  const cards = document.querySelectorAll('.yacht-card');
  filters.forEach(button => button.addEventListener('click', () => {
    filters.forEach(item => item.classList.toggle('active', item === button));
    const filter = button.dataset.filter;
    cards.forEach(card => { card.hidden = filter !== 'all' && card.dataset.type !== filter; });
  }));

  document.querySelectorAll('.save-btn').forEach(button => button.addEventListener('click', () => {
    const saved = button.classList.toggle('saved');
    button.textContent = saved ? '♥' : '♡';
    button.setAttribute('aria-pressed', String(saved));
    button.setAttribute('aria-label', saved ? button.getAttribute('aria-label').replace('Save ', 'Saved ') : button.getAttribute('aria-label').replace('Saved ', 'Save '));
  }));

  const serviceSelect = document.getElementById('serviceSelect');
  document.querySelectorAll('[data-service]').forEach(link => link.addEventListener('click', () => {
    const requested = link.dataset.service;
    const match = [...serviceSelect.options].find(option => option.text.trim() === requested);
    if (match) serviceSelect.value = match.value;
  }));

  const dateInput = document.getElementById('dateInput');
  const today = new Date();
  const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  dateInput.min = localToday;

  const form = document.getElementById('bookingForm');
  const result = document.getElementById('formResult');
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const name = `${data.get('firstName').trim()} ${data.get('lastName').trim()}`;
    const service = data.get('service');
    const date = data.get('date') ? new Date(`${data.get('date')}T12:00:00`).toLocaleDateString(undefined, {year:'numeric',month:'long',day:'numeric'}) : 'Flexible';
    result.hidden = false;
    result.textContent = `Enquiry prepared for ${name}.\nExperience: ${service}\nPreferred date: ${date}\n\nThis is a front-end demo only. Nothing has been sent or booked. You may print this page or copy the details from the form for your project presentation.`;
    result.scrollIntoView({behavior:'smooth',block:'nearest'});
  });
})();
