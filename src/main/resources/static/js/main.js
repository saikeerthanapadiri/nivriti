/* ===========================================
   NIVRITI - MAIN SCRIPT
=========================================== */

/* ---------- Panic Journey ---------- */

const journey = [
    {
        title: "🌬 Take a Slow Breath",
        description: "Stay with me. Breathe slowly. You are safe."
    },
    {
        title: "🌿 Keep Going",
        description: "You're doing well. Let's take another breath together."
    },
    {
        title: "💚 Almost There",
        description: "Your body is beginning to relax."
    }
];

let cycle = 0;
let stageIndex = 0;

let countdownTimer = null;
let breathingPaused = false;
let currentSeconds = 0;
let nextStepFunction = null;

const breathingCircle = document.getElementById("breathingCircle");
const breathText = document.getElementById("breathText");
const breathingHint = document.getElementById("breathingHint");
const progress = document.getElementById("progressFill");

const stageTitle = document.getElementById("stageTitle");
const stepIndicator = document.getElementById("stepIndicator");

const steps = [

    document.getElementById("step1"),

    document.getElementById("step2"),

    document.getElementById("step3"),

    document.getElementById("step4")

];
/* ---------- Grounding ---------- */

const groundingSteps = [

    {
        title: "👀 Look Around",
        text: "Name 5 things you can SEE."
    },

    {
        title: "✋ Feel",
        text: "Touch 4 things around you."
    },

    {
        title: "👂 Listen",
        text: "Notice 3 different sounds."
    },

    {
        title: "👃 Smell",
        text: "Notice 2 different smells."
    },

    {
        title: "👅 Taste",
        text: "Notice 1 thing you can taste."
    }

];

let groundingIndex = 0;

/* ---------- Comfort Messages ---------- */

const comfortMessages = [

    "This feeling will pass.",

    "You are safe right now.",

    "Your body is trying to protect you.",

    "Every breath helps.",

    "You are stronger than this moment.",

    "Keep breathing. You're doing wonderfully.",

    "Nothing dangerous is happening.",

    "Your heart will slow down.",

    "You are not alone.",

    "You've survived every difficult day before today."

];

/* ===========================================
   START
=========================================== */

window.onload = function () {

    if (breathingCircle) {

        startBreathing();

    }

    initializeCalmMode();
    initializeSkipButton();
    initializeStartPauseButton();

};

/* ===========================================
   BREATHING
=========================================== */

function startBreathing() {

    cycle = 0;

    stageIndex = 0;

    breathingCycle();

}

function breathingCycle() {

    if (cycle >= 3) {

        setTimeout(showGrounding, 1000);

        return;

    }

    stageTitle.innerHTML = journey[stageIndex].title;

    stageDescription.innerHTML = journey[stageIndex].description;

    inhale();

}

function inhale() {

    breathText.innerHTML = "🌬 Inhale";

    breathingHint.innerHTML = "Through your nose...";

    breathingCircle.classList.remove("breathing-shrink");

    breathingCircle.classList.add("breathing-grow");

    animateProgress();

    startCountdown(4, hold);

}

function hold() {

    breathText.innerHTML = "🫁 Hold";

    breathingHint.innerHTML = "Just for a moment...";

    startCountdown(4, exhale);

}

function exhale() {

    breathText.innerHTML = "🍃 Exhale";

    breathingHint.innerHTML = "Slowly through your mouth...";

    breathingCircle.classList.remove("breathing-grow");

    breathingCircle.classList.add("breathing-shrink");

    startCountdown(6, nextCycle);

}

function nextCycle() {

    cycle++;

    stageIndex++;

    progress.style.width = "0%";

    if (stageIndex >= journey.length) {

        stageIndex = 0;

    }

    breathingCycle();

}

/* ===========================================
   COUNTDOWN
=========================================== */

function startCountdown(seconds, nextFunction) {

    currentSeconds = seconds;
    nextStepFunction = nextFunction;

    countdown.innerHTML = currentSeconds;

    clearInterval(countdownTimer);

    countdownTimer = setInterval(function () {

        if (breathingPaused) return;

        currentSeconds--;

        countdown.innerHTML = currentSeconds;

        if (currentSeconds <= 0) {

            clearInterval(countdownTimer);

            nextStepFunction();

        }

    }, 1000);

}

/* ===========================================
   PROGRESS
=========================================== */

function animateProgress() {

    const progress = document.getElementById("progressFill");
    const progressText = document.getElementById("progressText");

    progress.style.width = "0%";
    progressText.textContent = "0%";

    let value = 0;

    const interval = setInterval(() => {

        value++;

        progress.style.width = value + "%";
        progressText.textContent = value + "%";

        if(value >= 100){
            clearInterval(interval);
        }

    }, 80);

}

/* ===========================================
   SHOW GROUNDING
=========================================== */

function showGrounding() {

    updateJourneyTracker(2);

    stepIndicator.innerHTML = "Step 2 of 4";

    document.querySelector(".panic-container").style.display = "none";

    const section = document.getElementById("groundingSection");

    section.classList.remove("hidden");

    groundingIndex = 0;

    loadGroundingStep();

}

function loadGroundingStep() {

    document.getElementById("groundingStep").innerHTML =
        groundingSteps[groundingIndex].title;

    document.getElementById("groundingInstruction").innerHTML =
        groundingSteps[groundingIndex].text;

}

function nextGroundingStep() {

    groundingIndex++;

    if (groundingIndex >= groundingSteps.length) {

        showComfortSection();

        return;

    }

    loadGroundingStep();

}

/* ===========================================
   COMFORT SECTION
=========================================== */

function showComfortSection() {

    updateJourneyTracker(3);

    stepIndicator.innerHTML = "Step 3 of 4";

    document.getElementById("groundingSection").classList.add("hidden");

    document.getElementById("comfortSection").classList.remove("hidden");

    newComfortMessage();

}

function newComfortMessage() {

    const randomIndex = Math.floor(Math.random() * comfortMessages.length);

    document.getElementById("comfortMessage").innerHTML =
        comfortMessages[randomIndex];

}

/* ===========================================
   EMERGENCY SECTION
=========================================== */

function showEmergencySection() {

    updateJourneyTracker(4);

    stepIndicator.innerHTML = "Step 4 of 4";

    document.getElementById("comfortSection").classList.add("hidden");

    document.getElementById("emergencySection").classList.remove("hidden");

}

/* ===========================================
   CALM MODE
=========================================== */

function initializeCalmMode() {

    const button = document.getElementById("calmModeButton");

    if (!button) return;

    button.addEventListener("click", function () {

        document.body.classList.toggle("calm");

    });

}

/* ===========================================
   FLOATING HELP
=========================================== */

const helpButton = document.getElementById("helpButton");

if (helpButton) {

    helpButton.addEventListener("click", function () {

        alert(
            "🫶 You're safe.\n\n" +
            "• Slow your breathing.\n" +
            "• Sit somewhere comfortable.\n" +
            "• Try the grounding exercise.\n\n" +
            "If you're in immediate danger, contact local emergency services."
        );

    });

}

/* ===========================================
   FADE UTILITIES
=========================================== */

function fadeOut(element) {

    element.style.opacity = 1;

    let opacity = 1;

    const timer = setInterval(function () {

        opacity -= 0.05;

        element.style.opacity = opacity;

        if (opacity <= 0) {

            clearInterval(timer);

        }

    }, 20);

}

function fadeIn(element) {

    element.style.opacity = 0;

    let opacity = 0;

    const timer = setInterval(function () {

        opacity += 0.05;

        element.style.opacity = opacity;

        if (opacity >= 1) {

            clearInterval(timer);

        }

    }, 20);

}

/* ===========================================
   SKIP BUTTON
=========================================== */

function initializeSkipButton(){

    const skipButton = document.getElementById("skipButton");

    if(!skipButton) return;

    skipButton.addEventListener("click", function(){

        showGrounding();

    });

}

/* ===========================================
   START / PAUSE BUTTON
=========================================== */

function initializeStartPauseButton() {

    const button = document.getElementById("startPauseBtn");

    if (!button) return;

    button.addEventListener("click", function () {

        if (!breathingPaused) {

            breathingPaused = true;

            button.innerHTML = "▶ Resume";

            breathText.innerHTML = "Paused";

        } else {

            breathingPaused = false;

            button.innerHTML = "⏸ Pause";

        }

    });

}

/* ===========================================
   EMERGENCY CONTACTS
=========================================== */

window.addEventListener("load", function () {

    if (document.getElementById("contactsList")) {

        loadContacts();

    }

});

function saveContact() {

    alert("Button clicked!");

    const name = document.getElementById("contactName").value.trim();
    const phone = document.getElementById("contactPhone").value.trim();

    if (name === "" || phone === "") {
        alert("Please enter both name and phone number.");
        return;
    }

    let contacts = JSON.parse(localStorage.getItem("emergencyContacts"));

    if (contacts == null) {
        contacts = [];
    }

    if (contacts.length >= 3) {
        alert("Maximum 3 contacts allowed.");
        return;
    }

    contacts.push({
        name: name,
        phone: phone
    });

    localStorage.setItem("emergencyContacts", JSON.stringify(contacts));

    alert("Saved Successfully");

    loadContacts();

    document.getElementById("contactName").value = "";
    document.getElementById("contactPhone").value = "";

}

function loadContacts() {

    const container = document.getElementById("contactsList");

    if (!container) return;

    let contacts = JSON.parse(localStorage.getItem("emergencyContacts")) || [];

    container.innerHTML = "";

    if (contacts.length === 0) {

        container.innerHTML = "<p>No emergency contacts saved yet.</p>";

        return;

    }

    contacts.forEach(function(contact, index){

        container.innerHTML += `

            <div class="contact-card">

                <h3>👤 ${contact.name}</h3>

                <p>📞 ${contact.phone}</p>

                <div class="contact-buttons">

                    <a class="primary-btn" href="tel:${contact.phone}">
                        Call
                    </a>

                    <button class="secondary-btn"
                        onclick="deleteContact(${index})">

                        Delete

                    </button>

                </div>

            </div>

        `;

    });

}

function deleteContact(index){

    let contacts = JSON.parse(localStorage.getItem("emergencyContacts")) || [];

    contacts.splice(index,1);

    localStorage.setItem("emergencyContacts", JSON.stringify(contacts));

    loadContacts();

}

function clearContacts() {

    localStorage.removeItem("emergencyContacts");

    loadContacts();

    alert("All contacts cleared.");

}

/* ===========================================
   FUTURE PLACEHOLDERS
=========================================== */

// Nature Sounds
function playRain() {

    console.log("Rain sound started.");

}

// Forest Journey Progress
function updateJourney(step) {

    console.log("Journey Step:", step);

}

// Emergency Contacts
function loadContacts() {

    console.log("Contacts Loaded");

}

function updateJourneyTracker(step){

    steps.forEach(function(item){

        item.classList.remove("active");

    });

    if(steps[step-1]){

        steps[step-1].classList.add("active");

    }

}