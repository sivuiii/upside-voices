const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

/* =========================
   WARNING KEYWORDS (BACKEND)
   ========================= */
const WARNING_KEYWORDS = [
  "suicide",
  "self harm",
  "kill",
  "abuse",
  "rape",
  "violence",
  "threat",
  "murder",
];

function containsWarningKeywords(text) {
  if (!text) return false;
  const lowerText = text.toLowerCase();
  return WARNING_KEYWORDS.some((word) => lowerText.includes(word));
}

/* =========================
   INTENSITY SCORING (1–10)
   ========================= */
function calculateIntensity(text) {
  let score = 1;

  if (!text) return score;

  const lowerText = text.toLowerCase();

  if (containsWarningKeywords(lowerText)) score += 4;
  if (lowerText.length > 300) score += 2;
  if (lowerText.includes("help")) score += 1;
  if (lowerText.includes("scared")) score += 1;
  if (lowerText.includes("alone")) score += 1;

  return Math.min(score, 10);
}

/* =========================
   SUBMIT STORY FUNCTION
   ========================= */
exports.submitStory = functions.https.onCall(async (data, context) => {
  // 🔒 Ensure anonymous auth exists
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "User must be authenticated anonymously."
    );
  }

  const userId = context.auth.uid;
  const { content, location, informAuthorities, openToConference } = data;

  if (!content || typeof content !== "string") {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Story content is required."
    );
  }

  const hasWarning = containsWarningKeywords(content);
  const intensityScore = calculateIntensity(content);

  const storyId = admin.firestore().collection("stories_public").doc().id;

  /* =========================
     WRITE PUBLIC STORY
     ========================= */
  await admin.firestore().collection("stories_public").doc(storyId).set({
    storyText: content,
    fictionalLocation: location,
    content, // legacy compatibility
    location, // legacy compatibility
    intensityScore, // NEVER exposed meaningfully
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  /* =========================
     WRITE PRIVATE STORY
     ========================= */
  await admin.firestore().collection("stories_private").doc(storyId).set({
    rawText: content,
    userId,
    hasWarning,
    informAuthorities,
    openToConference,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  return {
    success: true,
    storyId,
  };
});
