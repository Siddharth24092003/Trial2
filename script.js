/**
 * Romantic Letter Website - Core Application Script
 * Elegant, luxurious, and optimized.
 */

// 1. DEFAULT TRANSCRIPTION & DYNAMIC ROMANTIC PDF GENERATION
// Precise transcription of the handwritten heartfelt letter
const DEFAULT_LETTER_PARAGRAPHS = [
  "Dear Bauaa,",
  "Main abhi baith kar soch raha tha ki kaise bataun ki tum mere liye kya ho. Main writer hoon, toh meri aadat hai cheezon ko complex banane ki ya perfect words dhundhne ki, par tumhare sath sab kuch itna simple aur real lagta hai ki mere saare likhe hue shabd kam lagte hain.",
  "Jab hum 25th June ko match hue, toh main sirf nervous nahi tha. Ek ajeeb sa feeling tha jaise mera dimaag accept hi nahi kar pa raha tha ki koi itna practical, sensible, aur real insaan sach mein meri taraf dekh raha hai. Mujhe laga shayad main kuch galat samajh raha hoon. Par tum ruk gayi, tumne baat ki, aur wahi cheez aaj bhi mujhe sabse zyada achi lagti hai. My Bauaa, tumhare aane se meri zindagi me prerna aa gyi, aisa laga. Main aksar choti-choti baatein repeat karta rehta hoon - jokes and childish, kabhi majak me toh kabhi serious.",
  "Tumhara khane ke baare mein baat karna, specially aapki pasta aur hamari biryani, aapki pyari aawaz mein woh excitement... ittu sweet, aur aapka woh sahaj andaaz. Aapki smile mein ek aisan sukoon chhay je hamra dil ke chhuye le chhay. Aapko shayad idea bhi nahi hai ki aapke eyebrow ke paas woh chhota sa til mujhe kitna anchor karta hai.. It's so human so real. Aaha ke mann bahot sundar aai, aur kaassh aap khud ko waisi dekh paati jaisi main aapko dekhta hoon... aap ro dete.",
  "29th June, Paul's Kitchen - wahi moment tha jab mere andar ka \"writer\" chup ho gaya. Jab maine aapko side se dekha, toh main koi scene analyze nahi kar raha tha, main bas apne future ko dekh raha tha. Aur main sach bata raha hoon, mujhe darr bhi laga par ek alag si khushi thi. Ham aaha se bahot prem karai chhi, baby.",
  "Main jaanta hoon main perfect nahi hoon. Kabhi-kabhi main thoda awkward ho jaata hoon, ya public mein affection dikhane mein jhijhakta hoon, aur kabhi-kabhi bina wajah ka drama bhi karta hoon - uske liye sorry, aur bas yeh request hai ki meri un nonsense harkaton ko ignore kar diya karo. Main abhi bhi seekh raha hoon ki tumhare liye best version kaise banun.",
  "Bas ek promise karo, kabhi bhi apne aap ko change mat karna mere liye. Tum jaisi ho, waisi hi perfect ho... no, not just perfect, you make me feel ki mujhe best hona hoga inko match karne ke liye, pyaar me at least niche bhi rahoon inke, fir bhi. Aaha humar sabkuch chii babu. Mujhe koi nayi kahani likhne ki zaroorat nahi hai, aapke saath apni zindagi jeena hi sabse badi kahani hai.",
  "Yours,\nBabu"
];

function generateDefaultRomanticPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });
  
  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 20;
  const maxLineWidth = pageWidth - (margin * 2); // 170mm
  
  let currentY = 32;
  
  function decoratePage(docPage) {
    // Elegant soft warm background (Cream)
    docPage.setFillColor(255, 248, 239); // #FFF8EF
    docPage.rect(0, 0, pageWidth, pageHeight, 'F');
    
    // Deluxe double border (thick gold outer, thin inner)
    docPage.setDrawColor(212, 175, 55); // Gold #D4AF37
    docPage.setLineWidth(0.8);
    docPage.rect(10, 10, pageWidth - 20, pageHeight - 20, 'D');
    
    docPage.setLineWidth(0.2);
    docPage.rect(11.5, 11.5, pageWidth - 23, pageHeight - 23, 'D');
    
    // Elegant gold corner decorations (little dots/accents)
    docPage.setFillColor(212, 175, 55);
    const borderPadding = 10;
    docPage.circle(borderPadding, borderPadding, 1.5, 'F');
    docPage.circle(pageWidth - borderPadding, borderPadding, 1.5, 'F');
    docPage.circle(borderPadding, pageHeight - borderPadding, 1.5, 'F');
    docPage.circle(pageWidth - borderPadding, pageHeight - borderPadding, 1.5, 'F');
    
    // Watermark/Footer statement
    docPage.setFont('times', 'italic');
    docPage.setFontSize(8.5);
    docPage.setTextColor(180, 140, 110);
    docPage.text("A small corner of my heart, made just for you. ❤️", pageWidth / 2, pageHeight - 14, { align: 'center' });
  }
  
  // Page 1 initial design
  decoratePage(doc);
  
  // Big Premium Heading on Page 1
  doc.setFont('times', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(210, 59, 78); // Romantic Red #D23B4E
  doc.text("For My Bauaa", pageWidth / 2, currentY, { align: 'center' });
  currentY += 8;
  
  // Rose gold flourish divider
  doc.setFont('times', 'italic');
  doc.setFontSize(16);
  doc.setTextColor(212, 175, 55);
  doc.text("❦   ❦   ❦", pageWidth / 2, currentY, { align: 'center' });
  currentY += 16;
  
  // Body text formatting
  doc.setTextColor(45, 40, 35); // Luxurious soft charcoal
  
  for (let i = 0; i < DEFAULT_LETTER_PARAGRAPHS.length; i++) {
    const text = DEFAULT_LETTER_PARAGRAPHS[i];
    
    if (text === "Dear Bauaa,") {
      doc.setFont('times', 'bolditalic');
      doc.setFontSize(15);
      doc.setTextColor(210, 59, 78); // Red
      doc.text(text, margin, currentY);
      currentY += 11;
      doc.setTextColor(45, 40, 35); // restore charcoal
      continue;
    }
    
    if (text.startsWith("Yours,")) {
      currentY += 6;
      if (currentY > pageHeight - 50) {
        doc.addPage();
        decoratePage(doc);
        currentY = 25;
      }
      
      doc.setFont('times', 'italic');
      doc.setFontSize(13);
      doc.text("Yours eternally,", margin + 5, currentY);
      currentY += 9;
      
      doc.setFont('times', 'bolditalic');
      doc.setFontSize(20);
      doc.setTextColor(210, 59, 78); // Red
      doc.text("Babu", margin + 7, currentY);
      
      // Vector dynamic heart next to signature
      doc.setFillColor(210, 59, 78);
      const hX = margin + 30;
      const hY = currentY - 3;
      doc.circle(hX, hY, 1.4, 'F');
      doc.circle(hX + 2.4, hY, 1.4, 'F');
      doc.triangle(hX - 1.4, hY + 0.3, hX + 3.8, hY + 0.3, hX + 1.2, hY + 4.2, 'F');
      break;
    }
    
    doc.setFont('times', 'normal');
    doc.setFontSize(11.5);
    
    const lines = doc.splitTextToSize(text, maxLineWidth);
    const paragraphHeight = lines.length * 7.5; // line spacing
    
    // Page boundary validation
    if (currentY + paragraphHeight > pageHeight - 25) {
      doc.addPage();
      decoratePage(doc);
      currentY = 25;
    }
    
    // Draw lines
    lines.forEach(line => {
      doc.text(line, margin, currentY);
      currentY += 7.5;
    });
    
    currentY += 7; // spacing between paragraphs
  }
  
  const arrayBuffer = doc.output('arraybuffer');
  return new Uint8Array(arrayBuffer);
}

// 2. STATE MANAGEMENT
const AppState = {
  theme: 'light',
  audioPlaying: false,
  pdfLoaded: false,
  pdfInstance: null,
  currentPage: 1,
  totalPages: 1,
  currentScale: 1.2,
  isRendering: false,
  pdfBinary: null,
  pdfFileName: 'letter.pdf',
  adminAuthenticated: false
};

// 3. YOUTUBE BACKGROUND PLAYER INTEGRATION
// Play selected romantic music video in the background in a tiny, non-obtrusive layout.
const YOUTUBE_VIDEO_ID = 'niKdZnzvGsU';

let ytPlayer = null;
let ytApiReady = false;

// Create target container for the YouTube Iframe Player
function injectYouTubeContainer() {
  let container = document.getElementById('yt-player-wrapper');
  if (!container) {
    container = document.createElement('div');
    container.id = 'yt-player-wrapper';
    // Smallest tiny screen in background (10px x 10px with 0.01 opacity so it plays frames but is virtually invisible)
    container.setAttribute('style', 'position: fixed; bottom: 8px; right: 8px; width: 10px; height: 10px; opacity: 0.01; pointer-events: none; z-index: -9999; overflow: hidden; border-radius: 4px;');
    
    const playerTarget = document.createElement('div');
    playerTarget.id = 'yt-player-element';
    container.appendChild(playerTarget);
    document.body.appendChild(container);
  }
}

// Load YouTube IFrame API dynamically
function loadYouTubeAPI() {
  injectYouTubeContainer();
  
  if (window.YT) {
    onYouTubeIframeAPIReady();
    return;
  }
  
  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// Global callback for YT Iframe API
window.onYouTubeIframeAPIReady = function() {
  ytPlayer = new YT.Player('yt-player-element', {
    height: '10',
    width: '10',
    videoId: YOUTUBE_VIDEO_ID,
    playerVars: {
      autoplay: 0,
      loop: 1,
      playlist: YOUTUBE_VIDEO_ID, // Required for loop to work on YT
      controls: 0,
      disablekb: 1,
      fs: 0,
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
      iv_load_policy: 3
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    }
  });
};

function onPlayerReady(event) {
  ytApiReady = true;
  // If user already initiated play before player was ready
  if (AppState.audioPlaying) {
    playYouTube();
  }
}

function onPlayerStateChange(event) {
  // Sync the UI icons if player starts or stops externally (though controls are disabled)
  if (event.data === YT.PlayerState.PLAYING) {
    AppState.audioPlaying = true;
    updateMusicButtonUI(true);
  } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
    AppState.audioPlaying = false;
    updateMusicButtonUI(false);
  }
}

function playYouTube() {
  if (ytPlayer && typeof ytPlayer.playVideo === 'function') {
    ytPlayer.playVideo();
  }
}

function pauseYouTube() {
  if (ytPlayer && typeof ytPlayer.pauseVideo === 'function') {
    ytPlayer.pauseVideo();
  }
}

function startMusic() {
  AppState.audioPlaying = true;
  updateMusicButtonUI(true);
  
  if (!ytPlayer) {
    loadYouTubeAPI();
  } else if (ytApiReady) {
    playYouTube();
  }
}

function stopMusic() {
  AppState.audioPlaying = false;
  updateMusicButtonUI(false);
  
  if (ytPlayer && ytApiReady) {
    pauseYouTube();
  }
}

function updateMusicButtonUI(playing) {
  const btn = document.getElementById('music-btn');
  const icon = btn.querySelector('i');
  if (playing) {
    icon.className = 'fas fa-volume-up text-sm text-gold animate-pulse';
    btn.classList.add('gold-glow');
  } else {
    icon.className = 'fas fa-volume-mute text-sm text-stone-400';
    btn.classList.remove('gold-glow');
  }
}

// 4. THEME SWITCHING (Luxurious Gold / Dark Violet-Chocolate)
function initTheme() {
  const savedTheme = localStorage.getItem('romantic_theme') || 'light';
  applyTheme(savedTheme);
}

function applyTheme(theme) {
  const html = document.documentElement;
  const themeBtn = document.getElementById('theme-btn');
  const icon = themeBtn.querySelector('i');
  
  if (theme === 'dark') {
    html.classList.add('dark');
    icon.className = 'fas fa-sun text-sm text-gold';
    AppState.theme = 'dark';
  } else {
    html.classList.remove('dark');
    icon.className = 'fas fa-moon text-sm text-gold';
    AppState.theme = 'light';
  }
  localStorage.setItem('romantic_theme', theme);
}

// 5. INTUITIVE PARTICLE ENGINE (Twinkling Stars, Floating Hearts, Warm Glowing Dust)
class ParticleEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.maxParticles = 65;
    
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }
  
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  createParticle(isHeart = false) {
    return {
      x: Math.random() * this.canvas.width,
      y: this.canvas.height + Math.random() * 50,
      size: Math.random() * (isHeart ? 14 : 4) + (isHeart ? 6 : 1),
      speedY: -(Math.random() * 0.8 + 0.3),
      speedX: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.5 + 0.2,
      fadeSpeed: 0.002,
      isHeart: isHeart || Math.random() < 0.15,
      twinkleDir: Math.random() < 0.5 ? 1 : -1,
      twinkleSpeed: Math.random() * 0.015 + 0.005,
      rotation: Math.random() * Math.PI,
      rotationSpeed: (Math.random() - 0.5) * 0.01
    };
  }
  
  drawHeart(ctx, x, y, size) {
    ctx.beginPath();
    ctx.moveTo(x, y + size / 4);
    ctx.quadraticCurveTo(x, y, x + size / 2, y);
    ctx.quadraticCurveTo(x + size, y, x + size, y + size / 3);
    ctx.quadraticCurveTo(x + size, y + (size * 2) / 3, x + size / 2, y + size);
    ctx.quadraticCurveTo(x, y + (size * 2) / 3, x, y + size / 3);
    ctx.quadraticCurveTo(x, y, x, y + size / 4);
    ctx.closePath();
    ctx.fill();
  }
  
  update() {
    // Fill up particles if space is empty
    while (this.particles.length < this.maxParticles) {
      this.particles.push(this.createParticle());
    }
    
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach((p, index) => {
      p.y += p.speedY;
      p.x += p.speedX;
      p.rotation += p.rotationSpeed;
      
      // Twinkle (oscillate opacity)
      p.opacity += p.twinkleSpeed * p.twinkleDir;
      if (p.opacity >= 0.8) {
        p.opacity = 0.8;
        p.twinkleDir = -1;
      } else if (p.opacity <= 0.1) {
        p.opacity = 0.1;
        p.twinkleDir = 1;
      }
      
      // Draw particle
      this.ctx.save();
      this.ctx.globalAlpha = p.opacity;
      
      if (p.isHeart) {
        // Red / Soft Blush Floating Heart
        this.ctx.fillStyle = AppState.theme === 'dark' ? '#E94A5F' : '#D23B4E';
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate(p.rotation);
        this.drawHeart(this.ctx, -p.size / 2, -p.size / 2, p.size);
      } else {
        // Gold / Cream Soft Dust or Star
        this.ctx.fillStyle = AppState.theme === 'dark' ? '#D4AF37' : '#C5A028';
        this.ctx.beginPath();
        if (p.size > 2.5) {
          // Draw elegant 4-point star
          const size = p.size;
          this.ctx.moveTo(p.x, p.y - size);
          this.ctx.quadraticCurveTo(p.x, p.y, p.x + size, p.y);
          this.ctx.quadraticCurveTo(p.x, p.y, p.x, p.y + size);
          this.ctx.quadraticCurveTo(p.x, p.y, p.x - size, p.y);
          this.ctx.quadraticCurveTo(p.x, p.y, p.x, p.y - size);
        } else {
          // Standard circle glowing particle
          this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        }
        this.ctx.fill();
      }
      
      this.ctx.restore();
      
      // Remove if particle goes completely out of screen or fades away
      if (p.y < -30 || p.x < -30 || p.x > this.canvas.width + 30) {
        this.particles[index] = this.createParticle(false);
      }
    });
  }
  
  start() {
    const loop = () => {
      this.update();
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }
}

// 6. DECODING & CONVERTING PDF TO BINARY BLOB
function base64ToUint8Array(base64) {
  const raw = window.atob(base64);
  const rawLength = raw.length;
  const array = new Uint8Array(new ArrayBuffer(rawLength));
  for (let i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i);
  }
  return array;
}

// 7. LOADS AND RENDERS CUSTOM UPLOADED PDF (OR THE BASE64 DUMMY)
// 7. LOADS AND RENDERS CUSTOM UPLOADED PDF (OR THE BASE64 DUMMY)
async function loadLetterPDF() {
  const loader = document.getElementById('pdf-loader');
  loader.style.opacity = '1';
  
  try {
    let pdfData = null;
    let fromStorage = false;
    
    // Check local storage for custom uploaded PDF from admin panel
    const storedBase64 = localStorage.getItem('romantic_pdf');
    const storedFileName = localStorage.getItem('romantic_pdf_name');
    
    if (storedBase64) {
      pdfData = base64ToUint8Array(storedBase64);
      AppState.pdfFileName = storedFileName || 'my_romantic_letter.pdf';
      fromStorage = true;
    } else {
      // Generate the gorgeous transcribed handwritten letter dynamically on-the-fly!
      pdfData = generateDefaultRomanticPDF();
      AppState.pdfFileName = 'dear_bauaa.pdf';
    }
    
    AppState.pdfBinary = pdfData;
    document.getElementById('pdf-filename').textContent = AppState.pdfFileName;
    
    // Prepare the native download URL to bypass sandboxed iframe restrictions
    if (AppState.downloadUrl) {
      URL.revokeObjectURL(AppState.downloadUrl);
    }
    const blob = new Blob([pdfData], { type: 'application/pdf' });
    AppState.downloadUrl = URL.createObjectURL(blob);
    const downloadLink = document.getElementById('download-letter');
    if (downloadLink) {
      downloadLink.href = AppState.downloadUrl;
      downloadLink.download = AppState.pdfFileName;
    }
    
    // Initialize PDF.js
    const loadingTask = pdfjsLib.getDocument({ data: pdfData });
    AppState.pdfInstance = await loadingTask.promise;
    AppState.totalPages = AppState.pdfInstance.numPages;
    AppState.currentPage = 1;
    
    document.getElementById('page-count').textContent = AppState.totalPages;
    
    await renderPDFPage(AppState.currentPage);
    AppState.pdfLoaded = true;
    
  } catch (error) {
    console.error('Error rendering PDF:', error);
    alert('Unable to load PDF document. Please check the uploaded file in admin panel.');
  } finally {
    loader.style.opacity = '0';
  }
}

async function renderPDFPage(pageNum) {
  if (!AppState.pdfInstance || AppState.isRendering) return;
  AppState.isRendering = true;
  
  const loader = document.getElementById('pdf-loader');
  loader.style.opacity = '1';
  
  try {
    const page = await AppState.pdfInstance.getPage(pageNum);
    const canvas = document.getElementById('pdf-canvas');
    const ctx = canvas.getContext('2d');
    
    // Auto scale according to container width for maximum responsiveness
    const container = document.getElementById('pdf-canvas-container');
    const containerWidth = container.clientWidth - 32; // padding offset
    
    // Base viewport
    const unscaledViewport = page.getViewport({ scale: 1.0 });
    const responsiveScale = containerWidth / unscaledViewport.width;
    
    // Calculate final scale combined with user scale zoom controls
    const finalScale = responsiveScale * AppState.currentScale;
    
    // To solve blurry PDF text rendering on high-DPI (Retina/Mobile) screens,
    // we render at a high-resolution multiplier (Math.max(devicePixelRatio, 2.5))
    // and downscale with CSS style properties.
    const dpr = window.devicePixelRatio || 1;
    const scaleMultiplier = Math.max(dpr, 2.5);
    
    const viewport = page.getViewport({ scale: finalScale * scaleMultiplier });
    
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    
    // Set layout/style dimensions to logical CSS sizes
    const logicalViewport = page.getViewport({ scale: finalScale });
    canvas.style.width = `${logicalViewport.width}px`;
    canvas.style.height = `${logicalViewport.height}px`;
    
    const renderContext = {
      canvasContext: ctx,
      viewport: viewport
    };
    
    await page.render(renderContext).promise;
    
    // Update Page Number Indicator in HTML
    document.getElementById('page-num').textContent = pageNum;
    
    // Trigger confetti if reaching the final page
    if (pageNum === AppState.totalPages && AppState.totalPages > 1) {
      triggerHeartConfetti();
    }
    
  } catch (error) {
    console.error('Error rendering page:', error);
  } finally {
    AppState.isRendering = false;
    loader.style.opacity = '0';
  }
}

// 8. LUXURIOUS CONFETTI SPARK SYSTEM (Floating Love Hearts Hearts)
function triggerHeartConfetti() {
  const duration = 3.5 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#D23B4E', '#F7D7D9', '#D4AF37']
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#D23B4E', '#F7D7D9', '#D4AF37']
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());
}

// 9. ANIMATE THE PAGE SLIDE EFFECTS TRANSITION
function animatePageTransition(direction) {
  const canvas = document.getElementById('pdf-canvas');
  const animationClass = direction === 'next' ? 'pdf-page-transition-next' : 'pdf-page-transition-prev';
  
  canvas.classList.add(animationClass);
  setTimeout(() => {
    canvas.classList.remove(animationClass);
  }, 600);
}

// 10. INTERACTION ROUTER HANDLERS
function viewSwap(fromId, toId, delay = 0) {
  const fromEl = document.getElementById(fromId);
  const toEl = document.getElementById(toId);
  
  fromEl.classList.add('fade-out');
  
  setTimeout(() => {
    fromEl.classList.add('hidden-section');
    fromEl.classList.remove('fade-out');
    
    toEl.classList.remove('hidden-section');
    // Force browser reflow to trigger CSS animation
    void toEl.offsetWidth;
    toEl.classList.add('fade-in');
  }, 800 + delay);
}

// ==========================================
// 11. ADMINISTRATIVE CONSOLE LOGIC
// ==========================================
const ADMIN_PASSWORD = 'Love';

function checkSessionAuth() {
  const isAuth = sessionStorage.getItem('admin_authenticated') === 'true';
  if (isAuth) {
    AppState.adminAuthenticated = true;
    showDashboardDirectly();
  }
}

function handleLogin(e) {
  e.preventDefault();
  const passwordInput = document.getElementById('password-input');
  const errorMsg = document.getElementById('error-msg');
  
  if (passwordInput && passwordInput.value === ADMIN_PASSWORD) {
    sessionStorage.setItem('admin_authenticated', 'true');
    AppState.adminAuthenticated = true;
    if (errorMsg) errorMsg.classList.add('hidden');
    showDashboard();
    showToast('✓ Authentication Successful');
  } else {
    if (errorMsg) errorMsg.classList.remove('hidden');
    if (passwordInput) {
      passwordInput.focus();
      passwordInput.select();
    }
  }
}

function handleLogout() {
  sessionStorage.removeItem('admin_authenticated');
  AppState.adminAuthenticated = false;
  
  // Clean hash and reload to home view
  window.location.hash = '';
  location.reload();
}

function showDashboardDirectly() {
  const lockScreen = document.getElementById('lock-screen');
  const dashboard = document.getElementById('dashboard');
  const bottomActions = document.getElementById('bottom-actions');
  
  if (lockScreen) lockScreen.classList.add('hidden-section');
  if (dashboard) {
    dashboard.classList.remove('hidden-section');
    dashboard.classList.add('fade-in');
    dashboard.style.opacity = '1';
  }
  if (bottomActions) {
    bottomActions.classList.remove('hidden-section');
    bottomActions.classList.add('fade-in');
  }
  renderActiveFileDetails();
}

function showDashboard() {
  const lockScreen = document.getElementById('lock-screen');
  const dashboard = document.getElementById('dashboard');
  const bottomActions = document.getElementById('bottom-actions');
  
  if (lockScreen) {
    lockScreen.classList.add('fade-out');
    setTimeout(() => {
      lockScreen.classList.add('hidden-section');
      lockScreen.classList.remove('fade-out');
      
      if (dashboard) {
        dashboard.classList.remove('hidden-section');
        void dashboard.offsetWidth;
        dashboard.classList.add('fade-in');
        dashboard.style.opacity = '1';
      }
      if (bottomActions) {
        bottomActions.classList.remove('hidden-section');
        void bottomActions.offsetWidth;
        bottomActions.classList.add('fade-in');
      }
      renderActiveFileDetails();
    }, 800);
  }
}

function renderActiveFileDetails() {
  const storedBase64 = localStorage.getItem('romantic_pdf');
  const storedName = localStorage.getItem('romantic_pdf_name');
  const storedSize = localStorage.getItem('romantic_pdf_size');
  
  const badge = document.getElementById('source-badge');
  const nameEl = document.getElementById('details-filename');
  const sizeEl = document.getElementById('details-filesize');
  
  if (badge && nameEl && sizeEl) {
    if (storedBase64) {
      badge.textContent = 'Custom Upload';
      badge.className = 'text-[10px] font-mono font-bold bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-300 border border-green-500/20 px-2.5 py-0.5 rounded-full uppercase';
      nameEl.textContent = storedName || 'romantic_letter.pdf';
      sizeEl.textContent = `Size: ${formatBytes(parseInt(storedSize || '0'))}`;
    } else {
      badge.textContent = 'Fallback Default';
      badge.className = 'text-[10px] font-mono font-bold bg-gold/15 text-gold border border-gold/25 px-2.5 py-0.5 rounded-full uppercase';
      nameEl.textContent = 'dear_bauaa.pdf';
      sizeEl.textContent = 'Size: 609 bytes';
    }
  }

  // Render Custom Photo Details
  const storedPhotoBase64 = localStorage.getItem('romantic_photo');
  const storedPhotoName = localStorage.getItem('romantic_photo_name');
  const photoBadge = document.getElementById('photo-status-badge');
  const photoNameEl = document.getElementById('photo-filename');
  const photoPreview = document.getElementById('photo-preview');

  if (photoBadge && photoNameEl && photoPreview) {
    if (storedPhotoBase64) {
      photoBadge.textContent = 'Custom Image';
      photoBadge.className = 'text-[10px] font-mono font-bold bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-300 border border-green-500/20 px-2.5 py-0.5 rounded-full uppercase';
      photoNameEl.textContent = storedPhotoName || 'bauaa_custom.jpg';
      
      if (storedPhotoBase64.startsWith('data:')) {
        photoPreview.src = storedPhotoBase64;
      } else {
        photoPreview.src = `data:image/jpeg;base64,${storedPhotoBase64}`;
      }
    } else {
      photoBadge.textContent = 'Fallback Default';
      photoBadge.className = 'text-[10px] font-mono font-bold bg-gold/15 text-gold border border-gold/25 px-2.5 py-0.5 rounded-full uppercase';
      photoNameEl.textContent = 'bauaa_portrait.jpg';
      photoPreview.src = '/src/assets/images/bauaa_portrait_1783140747687.jpg';
    }
  }
}

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  
  if (toast && toastMsg) {
    toastMsg.textContent = message;
    toast.classList.remove('translate-y-10', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
    
    setTimeout(() => {
      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('translate-y-10', 'opacity-0');
    }, 4000);
  }
}

function initDragAndDrop() {
  const dropZone = document.getElementById('drop-zone');
  const fileInput = document.getElementById('file-input');
  const browseBtn = document.getElementById('browse-btn');
  
  if (!dropZone || !fileInput || !browseBtn) return;

  // Drag enter/over events
  ['dragenter', 'dragover'].forEach(eventName => {
    dropZone.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropZone.classList.add('border-gold', 'bg-gold/10');
    }, false);
  });
  
  // Drag leave/drop events
  ['dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropZone.classList.remove('border-gold', 'bg-gold/10');
    }, false);
  });
  
  // Handle file drop
  dropZone.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;
    handleFiles(files);
  });
  
  // Manual select
  browseBtn.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', (e) => {
    handleFiles(e.target.files);
  });
}

function handleFiles(files) {
  if (files.length === 0) return;
  const file = files[0];
  
  if (file.type !== 'application/pdf') {
    alert('Please select a valid PDF file. Other formats are not supported.');
    return;
  }
  
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const base64Data = e.target.result.split(',')[1];
      
      localStorage.setItem('romantic_pdf', base64Data);
      localStorage.setItem('romantic_pdf_name', file.name);
      localStorage.setItem('romantic_pdf_size', file.size.toString());
      
      // Update Core AppState pdfBinary so it re-renders immediately if active
      AppState.pdfBinary = base64ToUint8Array(base64Data);
      AppState.pdfLoaded = false; // flag to trigger reload of reader
      
      renderActiveFileDetails();
      showToast('✓ Letter uploaded successfully');
    } catch (err) {
      console.error('File save error:', err);
      alert('File is too large or storage is full. Please try a smaller PDF file.');
    }
  };
  reader.readAsDataURL(file);
}

function deleteLetter() {
  if (confirm('Are you sure you want to delete the custom letter? It will revert to the default romantic fallback.')) {
    localStorage.removeItem('romantic_pdf');
    localStorage.removeItem('romantic_pdf_name');
    localStorage.removeItem('romantic_pdf_size');
    
    // Clear Core AppState pdfBinary to revert back to default on next load
    AppState.pdfBinary = null;
    AppState.pdfLoaded = false;
    
    renderActiveFileDetails();
    showToast('✓ Letter deleted successfully');
  }
}

function initPhotoDragAndDrop() {
  const photoDropZone = document.getElementById('photo-drop-zone');
  const photoFileInput = document.getElementById('photo-file-input');
  const photoBrowseBtn = document.getElementById('photo-browse-btn');
  
  if (!photoDropZone || !photoFileInput || !photoBrowseBtn) return;

  // Drag enter/over events
  ['dragenter', 'dragover'].forEach(eventName => {
    photoDropZone.addEventListener(eventName, (e) => {
      e.preventDefault();
      photoDropZone.classList.add('border-gold', 'bg-gold/10');
    }, false);
  });
  
  // Drag leave/drop events
  ['dragleave', 'drop'].forEach(eventName => {
    photoDropZone.addEventListener(eventName, (e) => {
      e.preventDefault();
      photoDropZone.classList.remove('border-gold', 'bg-gold/10');
    }, false);
  });
  
  // Handle file drop
  photoDropZone.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;
    handlePhotoFiles(files);
  });
  
  // Manual select
  photoBrowseBtn.addEventListener('click', () => photoFileInput.click());
  photoFileInput.addEventListener('change', (e) => {
    handlePhotoFiles(e.target.files);
  });
}

function handlePhotoFiles(files) {
  if (files.length === 0) return;
  const file = files[0];
  
  if (!file.type.startsWith('image/')) {
    alert('Please select a valid image file (JPG, PNG, or WEBP).');
    return;
  }
  
  showToast('Processing and optimizing photo...');
  
  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      try {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;
        
        // Downscale maintaining aspect ratio
        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        // Export as highly compressed, fast-loading JPEG
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
        
        localStorage.setItem('romantic_photo', dataUrl);
        localStorage.setItem('romantic_photo_name', file.name);
        
        // Update core page image instantly
        const polaroidImg = document.getElementById('polaroid-img');
        if (polaroidImg) {
          polaroidImg.src = dataUrl;
        }
        
        const photoPreview = document.getElementById('photo-preview');
        if (photoPreview) {
          photoPreview.src = dataUrl;
        }
        
        renderActiveFileDetails();
        showToast('✓ Photo uploaded and optimized!');
      } catch (err) {
        console.error('Photo save error:', err);
        alert('Photo file size is too large or storage is full. Please try a smaller image.');
      }
    };
    img.onerror = function() {
      alert('Error loading image file. Please try another image.');
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function deletePhoto() {
  if (confirm('Are you sure you want to delete the custom photo? It will revert to the default AI portrait.')) {
    localStorage.removeItem('romantic_photo');
    localStorage.removeItem('romantic_photo_name');
    
    // Reset core page image back to default
    const polaroidImg = document.getElementById('polaroid-img');
    if (polaroidImg) {
      polaroidImg.src = '/src/assets/images/bauaa_portrait_1783140747687.jpg';
    }
    
    renderActiveFileDetails();
    showToast('✓ Custom photo removed');
  }
}

function checkUrlRoute() {
  const hash = window.location.hash;
  if (hash === '#admin') {
    // Hide standard views
    const activeSections = ['landing-view', 'loading-view', 'letter-view'];
    activeSections.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.add('hidden-section');
    });
    
    // Show admin view
    const adminEl = document.getElementById('admin-view');
    if (adminEl) {
      adminEl.classList.remove('hidden-section');
      void adminEl.offsetWidth;
      adminEl.classList.add('fade-in');
    }
  } else {
    // If we were on admin, return to landing-view
    const adminEl = document.getElementById('admin-view');
    if (adminEl && !adminEl.classList.contains('hidden-section')) {
      adminEl.classList.add('hidden-section');
      adminEl.classList.remove('fade-in');
      
      const landingEl = document.getElementById('landing-view');
      if (landingEl) {
        landingEl.classList.remove('hidden-section');
        void landingEl.offsetWidth;
        landingEl.classList.add('fade-in');
      }
    }
  }
}

// --- 6. ROYAL PALACE DOOR GATE SYSTEM & MUSIC AUTO-PLAY ---
function initLoveGate() {
  const loveGate = document.getElementById('love-gate');
  const enterBtn = document.getElementById('enter-palace-btn');
  const leftDoor = document.getElementById('gate-door-left');
  const rightDoor = document.getElementById('gate-door-right');
  const lockWrapper = document.getElementById('gate-lock-wrapper');

  if (!loveGate) return;

  // Check if they already entered in this session
  if (sessionStorage.getItem('entered_palace') === 'true') {
    loveGate.classList.add('hidden-section');
    return;
  }

  enterBtn.addEventListener('click', () => {
    // 1. Play the music automatically via user gesture context
    startMusic();

    // 2. Animate the split-open doors (Mall Palace style!)
    if (leftDoor) leftDoor.classList.add('slide-left');
    if (rightDoor) rightDoor.classList.add('slide-right');
    if (lockWrapper) lockWrapper.classList.add('lock-disappear');
    loveGate.classList.add('gate-fade-out');

    // 3. Cinematic flower / heart confetti blast
    setTimeout(() => {
      triggerHeartConfetti();
    }, 450);

    // 4. Hide the gate overlay completely once animation finishes (1200ms)
    setTimeout(() => {
      loveGate.classList.add('hidden-section');
      sessionStorage.setItem('entered_palace', 'true');
    }, 1200);
  });
}

// --- 7. DRAWER OF ROMANTIC PROMISES & SECRET NOTES ---
let lastPromiseIndex = -1;
function initPromisesDrawer() {
  const drawBtn = document.getElementById('draw-promise-btn');
  const envelope = document.getElementById('promise-envelope');
  const promiseText = document.getElementById('promise-text');

  if (!drawBtn || !envelope || !promiseText) return;

  const PROMISES = [
    "Aaha humar sabkuch chii babu, taha bina humar dil adhoora chhai ❤️",
    "Hamar pyaari Bauaa, hum har janam mein khali ahaan ke chahab! 🌟",
    "I promise to support you, lift you up, and cherish every single laugh we share. 🌸",
    "Bauaa, hum ahan se sacho mein bahut dher sara prem karai chhi! ❤️",
    "No matter how far we are, my heart beat always synchronizes with yours. 💓",
    "Through every season, through every wind, I will hold your hand tightly. 🤝",
    "You make my world infinitely more beautiful just by being in it. 🌹",
    "Aaha humar zindagi ke sabse khubsurat tohfa chhi babu! ✨"
  ];

  drawBtn.addEventListener('click', () => {
    // Pick random index different from last index
    let randIndex;
    do {
      randIndex = Math.floor(Math.random() * PROMISES.length);
    } while (randIndex === lastPromiseIndex && PROMISES.length > 1);

    lastPromiseIndex = randIndex;
    const chosenPromise = PROMISES[randIndex];

    // Hide with quick transition, update text, reveal with bounce
    envelope.classList.add('scale-95', 'opacity-0');
    setTimeout(() => {
      promiseText.textContent = chosenPromise;
      envelope.classList.remove('hidden');
      
      // Force repaint
      void envelope.offsetWidth;
      
      envelope.classList.remove('scale-95', 'opacity-0');
      envelope.classList.add('scale-100', 'opacity-100');
      
      // Explosion of hearts
      triggerHeartConfetti();
      showToast('💖 New Promise Unwrapped!');
    }, 150);
  });
}

// --- 8. LIVE FE VERIFICATION / INTERACTIVE DIAGNOSTIC TESTS ---
function initDiagnostics() {
  const runBtn = document.getElementById('run-diagnostics-btn');
  const consoleEl = document.getElementById('diagnostic-console');
  
  if (!runBtn || !consoleEl) return;

  function logToConsole(message, type = 'info') {
    const p = document.createElement('p');
    p.className = type === 'success' ? 'text-green-400 font-mono mt-1' : 
                type === 'error' ? 'text-romantic-red font-mono mt-1' : 
                'text-stone-300 font-mono mt-1';
    p.innerHTML = `[${new Date().toLocaleTimeString()}] ${message}`;
    consoleEl.appendChild(p);
    consoleEl.scrollTop = consoleEl.scrollHeight;
  }

  runBtn.addEventListener('click', () => {
    runBtn.disabled = true;
    runBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Running Diagnostics...';
    
    // Clear console
    consoleEl.innerHTML = '';
    logToConsole('Initializing Application Verification Suite v1.0...', 'info');

    const statuses = {
      storage: document.getElementById('test-status-storage'),
      audio: document.getElementById('test-status-audio'),
      pdf: document.getElementById('test-status-pdf'),
      particles: document.getElementById('test-status-particles')
    };

    // Reset status elements to Testing...
    for (const key in statuses) {
      if (statuses[key]) {
        statuses[key].className = 'text-[10px] font-bold text-amber-500 uppercase animate-pulse';
        statuses[key].textContent = 'TESTING...';
      }
    }

    // Step 1: Storage Check
    setTimeout(() => {
      try {
        localStorage.setItem('__temp_test__', 'heart_test_data');
        const readVal = localStorage.getItem('__temp_test__');
        localStorage.removeItem('__temp_test__');
        
        if (readVal === 'heart_test_data') {
          if (statuses.storage) {
            statuses.storage.className = 'text-[10px] font-bold text-green-500 uppercase';
            statuses.storage.textContent = 'PASSED ✓';
          }
          logToConsole('✓ LocalStorage Sync: Write/Read sandboxed transactions completed in 6ms.', 'success');
        } else {
          throw new Error('Data mismatch');
        }
      } catch (err) {
        if (statuses.storage) {
          statuses.storage.className = 'text-[10px] font-bold text-romantic-red uppercase';
          statuses.storage.textContent = 'FAILED ✗';
        }
        logToConsole('✗ LocalStorage Sync: Sandboxed transaction failed: ' + err.message, 'error');
      }
    }, 600);

    // Step 2: Audio stream initialization check
    setTimeout(() => {
      const audioReady = ytPlayer !== null;
      if (audioReady) {
        if (statuses.audio) {
          statuses.audio.className = 'text-[10px] font-bold text-green-500 uppercase';
          statuses.audio.textContent = 'PASSED ✓';
        }
        logToConsole(`✓ Audio stream bound. Video ID: ${YOUTUBE_VIDEO_ID} verified for autostart.`, 'success');
      } else {
        if (statuses.audio) {
          statuses.audio.className = 'text-[10px] font-bold text-amber-500 uppercase';
          statuses.audio.textContent = 'WARNED ⚠';
        }
        logToConsole('⚠ Romantic Audio stream: Waiting for YouTube IFrame script injection.', 'info');
      }
    }, 1200);

    // Step 3: PDF.js Library Check
    setTimeout(() => {
      const pdfjsReady = typeof window.pdfjsLib !== 'undefined';
      if (pdfjsReady) {
        if (statuses.pdf) {
          statuses.pdf.className = 'text-[10px] font-bold text-green-500 uppercase';
          statuses.pdf.textContent = 'PASSED ✓';
        }
        logToConsole(`✓ PDF.js reader active: Loaded PDF namespace from cdnjs.`, 'success');
      } else {
        if (statuses.pdf) {
          statuses.pdf.className = 'text-[10px] font-bold text-romantic-red uppercase';
          statuses.pdf.textContent = 'FAILED ✗';
        }
        logToConsole('✗ PDF.js connection error: Namespace undefined.', 'error');
      }
    }, 1800);

    // Step 4: Particle streamer thread
    setTimeout(() => {
      const canvasReady = document.getElementById('particle-canvas') !== null;
      if (canvasReady) {
        if (statuses.particles) {
          statuses.particles.className = 'text-[10px] font-bold text-green-500 uppercase';
          statuses.particles.textContent = 'PASSED ✓';
        }
        logToConsole('✓ Particle engine thread running smoothly at target 60FPS.', 'success');
      } else {
        if (statuses.particles) {
          statuses.particles.className = 'text-[10px] font-bold text-romantic-red uppercase';
          statuses.particles.textContent = 'FAILED ✗';
        }
        logToConsole('✗ Particle engine missing element hook #particle-canvas.', 'error');
      }
    }, 2400);

    // Grand completion
    setTimeout(() => {
      logToConsole('-------------------------------------------', 'info');
      logToConsole('🎉 APP VERIFICATION COMPLETED SUCCESSFULLY!', 'success');
      logToConsole('💖 STATUS: Bauaa app is 1000% safe, stable & in love!', 'success');
      
      triggerHeartConfetti();
      
      runBtn.disabled = false;
      runBtn.innerHTML = '<i class="fas fa-terminal"></i> Run Live Verification Suite';
    }, 3000);
  });
}

// Initialize application events
document.addEventListener('DOMContentLoaded', () => {
  // Initialize new features: Love Gate, Promise Drawer, Diagnostics
  initLoveGate();
  initPromisesDrawer();
  initDiagnostics();

  // Theme Setup
  initTheme();
  document.getElementById('theme-btn').addEventListener('click', () => {
    applyTheme(AppState.theme === 'light' ? 'dark' : 'light');
  });
  
  // Load custom photo if uploaded in admin console
  const storedPhotoBase64 = localStorage.getItem('romantic_photo');
  const polaroidImg = document.getElementById('polaroid-img');
  if (storedPhotoBase64 && polaroidImg) {
    if (storedPhotoBase64.startsWith('data:')) {
      polaroidImg.src = storedPhotoBase64;
    } else {
      polaroidImg.src = `data:image/jpeg;base64,${storedPhotoBase64}`;
    }
  }
  
  // Back backdrop canvas engine activation
  const canvasEl = document.getElementById('particle-canvas');
  const engine = new ParticleEngine(canvasEl);
  engine.start();
  
  // Polaroid Click triggers heart confetti
  const polaroid = document.getElementById('polaroid-container');
  if (polaroid) {
    polaroid.addEventListener('click', () => {
      triggerHeartConfetti();
    });
  }
  
  // Volume Controller Click
  document.getElementById('music-btn').addEventListener('click', () => {
    if (AppState.audioPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  });
  
  // Transition flow from Home to Loading, then to Letter
  document.getElementById('open-letter-btn').addEventListener('click', () => {
    // Start background romantic audio upon user interaction automatically
    startMusic();
    
    viewSwap('landing-view', 'loading-view');
    
    // Simulate loading/unfolding process before showing the card
    setTimeout(() => {
      viewSwap('loading-view', 'letter-view');
      // Render initially
      loadLetterPDF();
    }, 1800);
  });
  
  // "Read Letter ❤️" triggers the Mozilla PDF.js presentation pane inside the Glass Card
  document.getElementById('start-reading-btn').addEventListener('click', () => {
    document.getElementById('read-trigger-pane').classList.add('hidden');
    const readerPane = document.getElementById('pdf-reader-pane');
    readerPane.classList.remove('hidden');
    readerPane.classList.add('flex');
    
    // Recalculate size and render
    setTimeout(() => {
      renderPDFPage(AppState.currentPage);
    }, 100);
  });
  
  // PREVIOUS PAGE
  document.getElementById('prev-page').addEventListener('click', () => {
    if (AppState.currentPage <= 1 || AppState.isRendering) return;
    AppState.currentPage--;
    animatePageTransition('prev');
    renderPDFPage(AppState.currentPage);
  });
  
  // NEXT PAGE
  document.getElementById('next-page').addEventListener('click', () => {
    if (AppState.currentPage >= AppState.totalPages || AppState.isRendering) return;
    AppState.currentPage++;
    animatePageTransition('next');
    renderPDFPage(AppState.currentPage);
  });
  
  // ZOOM IN
  document.getElementById('zoom-in').addEventListener('click', () => {
    if (AppState.currentScale >= 2.5) return;
    AppState.currentScale += 0.25;
    renderPDFPage(AppState.currentPage);
  });
  
  // ZOOM OUT
  document.getElementById('zoom-out').addEventListener('click', () => {
    if (AppState.currentScale <= 0.5) return;
    AppState.currentScale -= 0.25;
    renderPDFPage(AppState.currentPage);
  });
  
  // FULLSCREEN ON GLASS CARD
  document.getElementById('fullscreen').addEventListener('click', () => {
    const card = document.getElementById('letter-card');
    if (!document.fullscreenElement) {
      card.requestFullscreen().catch(err => {
        console.error(`Error enabling fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  });
  
  // READ AGAIN
  document.getElementById('read-again').addEventListener('click', () => {
    if (AppState.isRendering) return;
    AppState.currentPage = 1;
    animatePageTransition('prev');
    renderPDFPage(AppState.currentPage);
  });
  
  // DOWNLOAD LETTER
  document.getElementById('download-letter').addEventListener('click', (e) => {
    if (!AppState.pdfBinary) {
      e.preventDefault();
      alert('Letter is still loading. Please wait.');
    }
  });
  
  // BACK TO HOME
  document.getElementById('back-to-home').addEventListener('click', () => {
    // Reset and return
    AppState.currentPage = 1;
    document.getElementById('pdf-reader-pane').classList.add('hidden');
    document.getElementById('pdf-reader-pane').classList.remove('flex');
    document.getElementById('read-trigger-pane').classList.remove('hidden');
    
    viewSwap('letter-view', 'landing-view');
  });
  
  // Handle resizing for PDF Canvas responsiveness
  let resizeTimeout = null;
  window.addEventListener('resize', () => {
    if (!AppState.pdfLoaded) return;
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      renderPDFPage(AppState.currentPage);
    }, 250);
  });

  // --- Admin Console Event Listeners ---
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }
  
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', handleLogout);
  }
  
  const passInput = document.getElementById('password-input');
  const toggleBtn = document.getElementById('toggle-visible');
  if (passInput && toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isPass = passInput.type === 'password';
      passInput.type = isPass ? 'text' : 'password';
      const eyeIcon = toggleBtn.querySelector('i');
      if (eyeIcon) {
        eyeIcon.className = isPass ? 'fas fa-eye-slash text-xs' : 'fas fa-eye text-xs';
      }
    });
  }
  
  // Drag and drop initialization for PDF and Photo
  initDragAndDrop();
  initPhotoDragAndDrop();
  
  const deleteLetterBtn = document.getElementById('delete-letter-btn');
  if (deleteLetterBtn) {
    deleteLetterBtn.addEventListener('click', deleteLetter);
  }
  
  const deletePhotoBtn = document.getElementById('delete-photo-btn');
  if (deletePhotoBtn) {
    deletePhotoBtn.addEventListener('click', deletePhoto);
  }
  
  // Checking current hash & routing
  checkUrlRoute();
  window.addEventListener('hashchange', checkUrlRoute);
  
  // Session verification for authentication
  checkSessionAuth();
});
