const form = document.querySelector("#poem-form");
const result = document.querySelector("#poem-result");

const poemLines = {
  romantic: [
    "Ton nom fleurit au bord de mes silences,",
    "la lune pose une lampe sur nos mains,",
    "et Paris respire en parfums d'absence,",
    "quand ton sourire invente le matin.",
  ],
  melancholic: [
    "La pluie descend sur les vitres fatiguees,",
    "un vieux refrain se perd dans le soir,",
    "mon coeur relit les heures effacees,",
    "et garde un peu de lumiere a revoir.",
  ],
  joyful: [
    "Le soleil danse au-dessus des fontaines,",
    "les rues fredonnent un air nouveau,",
    "chaque fenetre ouvre une semaine",
    "ou le bonheur voyage sans manteau.",
  ],
  mysterious: [
    "Dans l'ombre bleue des portes entrouvertes,",
    "un secret passe avec des pas legers,",
    "les etoiles, patientes et couvertes,",
    "gardent ton reve au fond des vergers.",
  ],
};

const translations = {
  romantic:
    "Your name blooms at the edge of my silences; the moon lights our hands, and your smile invents the morning.",
  melancholic:
    "Rain falls on tired windows; an old refrain fades into evening, while the heart keeps a little light.",
  joyful:
    "The sun dances above fountains; the streets hum a new tune, and happiness travels freely.",
  mysterious:
    "In the blue shadow of half-open doors, a secret passes softly while the stars keep your dream.",
};

function makeTitle(topic) {
  const cleanTopic = topic.trim();
  return cleanTopic
    ? `Poeme sur ${cleanTopic}`
    : "Poeme francais";
}

function makePoem(topic, mood, style, details) {
  const topicLine = topic
    ? `Pour ${topic}, j'allume ma voix,`
    : "J'allume doucement ma voix,";
  const detailLine = details
    ? `avec ${details.toLowerCase()} dans la memoire.`
    : "avec un reve clair dans la memoire.";
  const selectedLines = poemLines[mood] || poemLines.romantic;

  if (style === "haiku") {
    return `${topicLine}\n${selectedLines[1]}\n${detailLine}`;
  }

  if (style === "modern") {
    return `${topicLine}\n\n${selectedLines[0]}\n${selectedLines[2]}\n\n${detailLine}`;
  }

  if (style === "free verse") {
    return `${topicLine}\n${selectedLines.join("\n")}\n${detailLine}`;
  }

  return `${topicLine}\n${selectedLines.join("\n")}\n${detailLine}`;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const topic = formData.get("topic").trim();
  const mood = formData.get("mood");
  const style = formData.get("style");
  const details = formData.get("details").trim();
  const poem = makePoem(topic, mood, style, details);

  result.classList.remove("placeholder");
  result.replaceChildren();

  const title = document.createElement("h3");
  title.textContent = makeTitle(topic);

  const poemBody = document.createElement("div");
  poemBody.textContent = poem;

  const translation = document.createElement("p");
  translation.className = "translation";
  const translationLabel = document.createElement("strong");
  translationLabel.textContent = "English translation: ";
  translation.append(translationLabel, translations[mood]);

  result.append(title, poemBody, translation);
});
