// Wellness app data  
const wellnessData = {
  quotes: [
    "The greatest wealth is health. - Virgil",
    "Take care of your body. It's the only place you have to live. - Jim Rohn",
    "Wellness is the complete integration of body, mind, and spirit. - Greg Anderson",
    "A healthy outside starts from the inside. - Robert Urich",
    "Your body hears everything your mind says. - Naomi Judd",
    "Self-care is how you take your power back. - Lalah Delia"
  ],
  
  prompts: [
    "How do I want to feel when I go to bed tonight?",
    "What are three things I am grateful for today?",
    "What is one thing I can do today that will make me feel accomplished?",
    "How can I show kindness to myself today?",
    "What activities make me feel most alive?",
    "What am I excited to experience today?",
    "How can I make today 1% better than yesterday?",
    "What does my soul need today?",
    "What are three small things that brought me joy recently?",
    "How can I practice self-compassion today?",
    "What intention do I want to set for this day?",
    "What am I looking forward to today?"
  ],
  
  inspiration: [
    "Today is a new day, so rise up and move forward. Each morning brings new potential, but it's up to you to bring it to life.",
    "Every morning is a beautiful morning. - Terri Guillemets",
    "Today is your day to start fresh, to eat right, to train hard, to live healthy, to be proud. - Bonnie Pfiester",
    "The morning sun is calling for you to wake up and chase your dreams.",
    "Make each day your masterpiece. - John Wooden",
    "There is a morning inside you waiting to burst open into light. - Rumi"
  ]
};

// App state
let currentTab = 'wellness';
let timerInterval = null;
let timerMinutes = 0;
let timerSeconds = 0;
let timerRunning = false;
let completedSteps = 0;
const totalSteps = 6;

// Utility functions
function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomItems(array, count) {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Tab switching function
function switchTab(tabName) {
  console.log('Switching to tab:', tabName);
  
  // Update active tab buttons
  const navTabs = document.querySelectorAll('.nav-tab');
  navTabs.forEach(tab => {
    if (tab.dataset.tab === tabName) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });
  
  // Hide all tab content
  const tabContents = document.querySelectorAll('.tab-content');
  tabContents.forEach(content => {
    content.classList.remove('active');
  });
  
  // Show the selected tab
  const selectedTab = document.getElementById(`${tabName}-tab`);
  if (selectedTab) {
    selectedTab.classList.add('active');
  }
  
  currentTab = tabName;
  console.log('Tab switched to:', tabName);
}

// Content refresh functions
function refreshQuote() {
  const quoteElement = document.getElementById('daily-quote');
  if (quoteElement) {
    const randomQuote = getRandomItem(wellnessData.quotes);
    quoteElement.style.opacity = '0';
    
    setTimeout(() => {
      quoteElement.textContent = randomQuote;
      quoteElement.style.opacity = '1';
    }, 200);
  }
}

function refreshPrompts() {
  const promptsContainer = document.getElementById('journal-prompts');
  const journalPromptsDisplay = document.getElementById('journal-prompts-display');
  
  const randomPrompts = getRandomItems(wellnessData.prompts, 2);
  
  if (promptsContainer) {
    promptsContainer.style.opacity = '0';
    setTimeout(() => {
      promptsContainer.innerHTML = randomPrompts.map(prompt => `
        <div class="prompt-item">
          <i class="fas fa-arrow-right"></i>
          <span>${prompt}</span>
        </div>
      `).join('');
      promptsContainer.style.opacity = '1';
    }, 200);
  }
  
  if (journalPromptsDisplay) {
    journalPromptsDisplay.style.opacity = '0';
    setTimeout(() => {
      journalPromptsDisplay.innerHTML = randomPrompts.map(prompt => `
        <p><i class="fas fa-arrow-right"></i> ${prompt}</p>
      `).join('');
      journalPromptsDisplay.style.opacity = '1';
    }, 200);
  }
}

function refreshInspiration() {
  const inspirationElement = document.getElementById('daily-inspiration');
  if (inspirationElement) {
    const randomInspiration = getRandomItem(wellnessData.inspiration);
    inspirationElement.style.opacity = '0';
    
    setTimeout(() => {
      inspirationElement.textContent = randomInspiration;
      inspirationElement.style.opacity = '1';
    }, 200);
  }
}

function refreshContent(type) {
  const button = document.querySelector(`[data-type="${type}"]`);
  if (button) {
    button.classList.add('loading');
  }
  
  setTimeout(() => {
    switch(type) {
      case 'quote':
        refreshQuote();
        break;
      case 'prompts':
        refreshPrompts();
        break;
      case 'inspiration':
        refreshInspiration();
        break;
    }
    if (button) {
      button.classList.remove('loading');
    }
  }, 800);
}

// Timer functions
function updateTimerDisplay() {
  const minutesEl = document.getElementById('timer-minutes');
  const secondsEl = document.getElementById('timer-seconds');
  
  if (minutesEl && secondsEl) {
    minutesEl.textContent = timerMinutes.toString().padStart(2, '0');
    secondsEl.textContent = timerSeconds.toString().padStart(2, '0');
  }
}

function updateTimerControls() {
  const startBtn = document.getElementById('start-timer');
  const pauseBtn = document.getElementById('pause-timer');
  const resetBtn = document.getElementById('reset-timer');
  
  if (startBtn) {
    if (timerRunning) {
      startBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
    } else if (timerMinutes > 0 || timerSeconds > 0) {
      startBtn.innerHTML = '<i class="fas fa-play"></i> Resume';
    } else {
      startBtn.innerHTML = '<i class="fas fa-play"></i> Start';
    }
  }
  
  if (pauseBtn) {
    pauseBtn.disabled = !timerRunning;
    pauseBtn.style.opacity = timerRunning ? '1' : '0.5';
  }
  
  if (resetBtn) {
    const hasTime = timerMinutes > 0 || timerSeconds > 0;
    resetBtn.disabled = !hasTime;
    resetBtn.style.opacity = hasTime ? '1' : '0.5';
  }
}

function startTimer() {
  console.log('Starting timer, current state:', timerRunning);
  
  if (!timerRunning) {
    timerRunning = true;
    timerInterval = setInterval(() => {
      timerSeconds++;
      if (timerSeconds >= 60) {
        timerMinutes++;
        timerSeconds = 0;
      }
      updateTimerDisplay();
    }, 1000);
    console.log('Timer started');
  } else {
    pauseTimer();
    return;
  }
  
  updateTimerControls();
}

function pauseTimer() {
  console.log('Pausing timer');
  if (timerRunning) {
    timerRunning = false;
    clearInterval(timerInterval);
    updateTimerControls();
  }
}

function resetTimer() {
  console.log('Resetting timer');
  timerRunning = false;
  clearInterval(timerInterval);
  timerMinutes = 0;
  timerSeconds = 0;
  updateTimerDisplay();
  updateTimerControls();
}

// Checkbox functions
function updateCompletedSteps() {
  const completedStepsDisplay = document.getElementById('completed-steps');
  const totalStepsDisplay = document.getElementById('total-steps');
  
  if (completedStepsDisplay) {
    completedStepsDisplay.textContent = completedSteps;
  }
  
  if (totalStepsDisplay) {
    totalStepsDisplay.textContent = totalSteps;
  }
  
  const progressIndicator = document.querySelector('.progress-indicator');
  if (progressIndicator) {
    if (completedSteps === totalSteps) {
      progressIndicator.style.color = 'var(--color-success)';
      progressIndicator.style.fontWeight = 'var(--font-weight-bold)';
    } else {
      progressIndicator.style.color = 'var(--color-text-secondary)';
      progressIndicator.style.fontWeight = 'var(--font-weight-medium)';
    }
  }
  
  console.log('Updated completed steps:', completedSteps, '/', totalSteps);
}

function handleRoutineStepChange(event) {
  const checkbox = event.target;
  console.log('Checkbox changed:', checkbox.id, 'checked:', checkbox.checked);
  
  if (checkbox.checked) {
    completedSteps++;
  } else {
    completedSteps--;
  }
  
  // Ensure completedSteps doesn't go negative
  completedSteps = Math.max(0, completedSteps);
  
  updateCompletedSteps();
  
  if (completedSteps === totalSteps) {
    showCelebration();
  }
}

function showCelebration() {
  const celebration = document.createElement('div');
  celebration.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--color-success);
    color: var(--color-btn-primary-text);
    padding: 20px 32px;
    border-radius: 12px;
    font-size: 18px;
    font-weight: 600;
    z-index: 1000;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    text-align: center;
  `;
  celebration.innerHTML = '<i class="fas fa-star"></i> Congratulations! You completed your morning routine! <i class="fas fa-star"></i>';
  
  document.body.appendChild(celebration);
  
  setTimeout(() => {
    if (document.body.contains(celebration)) {
      document.body.removeChild(celebration);
    }
  }, 3000);
}

// Journal functions
function clearJournal() {
  const journalTextarea = document.getElementById('journal-text');
  if (journalTextarea && journalTextarea.value.trim()) {
    if (confirm('Are you sure you want to clear your journal? This action cannot be undone.')) {
      journalTextarea.value = '';
      journalTextarea.focus();
    }
  }
}

function updateCurrentDate() {
  const dateElement = document.getElementById('current-date');
  if (dateElement) {
    const now = new Date();
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    };
    dateElement.textContent = now.toLocaleDateString('en-US', options);
  }
}

// Initialize the application
function initializeApp() {
  console.log('Initializing app...');
  
  // Set the wellness tab as active by default
  switchTab('wellness');
  
  // Initialize timer display
  updateTimerDisplay();
  updateTimerControls();
  
  // Initialize progress counter
  updateCompletedSteps();
  
  // Update date
  updateCurrentDate();
  
  console.log('App initialized');
}

// Event listener setup
function setupEventListeners() {
  console.log('Setting up event listeners...');
  
  // Tab navigation
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Tab clicked:', tab.dataset.tab);
      switchTab(tab.dataset.tab);
    });
  });
  
  // Refresh buttons
  document.querySelectorAll('.refresh-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Refresh clicked:', btn.dataset.type);
      refreshContent(btn.dataset.type);
    });
  });
  
  // Timer controls
  const startBtn = document.getElementById('start-timer');
  const pauseBtn = document.getElementById('pause-timer'); 
  const resetBtn = document.getElementById('reset-timer');
  
  if (startBtn) {
    startBtn.addEventListener('click', (e) => {
      e.preventDefault();
      startTimer();
    });
  }
  
  if (pauseBtn) {
    pauseBtn.addEventListener('click', (e) => {
      e.preventDefault();
      pauseTimer();
    });
  }
  
  if (resetBtn) {
    resetBtn.addEventListener('click', (e) => {
      e.preventDefault();
      resetTimer();
    });
  }
  
  // Routine checkboxes
  document.querySelectorAll('.routine-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', handleRoutineStepChange);
  });
  
  // Journal clear button
  const clearBtn = document.getElementById('clear-journal');
  if (clearBtn) {
    clearBtn.addEventListener('click', (e) => {
      e.preventDefault();
      clearJournal();
    });
  }
  
  console.log('Event listeners set up');
}

// Main initialization
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, starting initialization...');
  
  try {
    initializeApp();
    setupEventListeners();
    console.log('App fully initialized and ready');
  } catch (error) {
    console.error('Error initializing app:', error);
  }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(event) {
  if (event.altKey && !event.ctrlKey && !event.shiftKey) {
    switch(event.code) {
      case 'Digit1':
        event.preventDefault();
        switchTab('wellness');
        break;
      case 'Digit2':
        event.preventDefault();
        switchTab('routine');
        break;
      case 'Digit3':
        event.preventDefault();
        switchTab('journal');
        break;
    }
  }
});