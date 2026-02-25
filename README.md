# Слава (Slava) — Ukrainian & Japanese Language Tutor

AI-powered language learning app combining Pimsleur-style conversation with Rosetta Stone visual association and structured grammar drilling.

## What It Does

- **Conversational AI Tutor** — Chat with Claude in Ukrainian/Japanese with real-time grammar feedback, proficiency tracking, and personalized learning goals
- **Structured Phrase Lessons** — 10+ predefined micro-lessons that teach a core phrase, then morph it through cases, genders, and formality levels
- **AI-Generated Lessons** — When you finish predefined lessons, Claude generates new ones targeting your gaps
- **Visual Vocabulary** — Emoji-based Rosetta Stone method (image → target language, no English intermediary)
- **Alphabet Training** — Full Cyrillic/Hiragana reference with phonetic English approximations and quiz mode
- **Soft Sign (Ь) Deep Dive** — Dedicated palatalization trainer with hard/soft consonant pairs (Ukrainian)
- **Case & Gender System** — Interactive reference for Ukrainian's 7 cases with example sentences
- **Daily Ukrainian Idiom** — Rotating proverb with literal translation and usage context
- **Voice I/O** — Speech recognition input + text-to-speech output (browser native)

## Cost vs Duolingo

| Component | Monthly Cost |
|---|---|
| Claude Sonnet API (conversation) | ~$2-5 |
| Azure TTS free tier (500K chars) | $0 |
| **Total** | **~$2-5/mo** |
| Duolingo Super | $7/mo |

With actual conversation practice, case drilling, and personalized feedback.

## Files

```
slava/
├── src/
│   └── language-tutor.jsx    # Main app component
├── .gitignore
├── README.md
└── TODO.md
```

## Running

Currently a Claude artifact (React JSX). To run standalone:

1. `npm create vite@latest . -- --template react`
2. Copy `src/language-tutor.jsx` → `src/App.jsx`
3. `npm install && npm run dev`

> You'll need a backend proxy for the Claude API key — the artifact renderer handles auth automatically.

## TTS Upgrade Path

Browser TTS is bad for Ukrainian. Upgrade options:
- **Azure Cognitive Services** — Free tier (500K chars/mo)
- **Google Cloud WaveNet** — $16/1M chars
- **ElevenLabs** — $5-22/mo, most natural

All `speakFn` calls route through `useSpeech()` — single swap point.
