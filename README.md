# 🐂 BullsEye – News, Stocks & Sentiment Intelligence Platform

BullsEye is a smart, full-stack platform that combines real-time news, stock market data, sentiment analysis, and AI-powered chat into a single dashboard. Whether you're a trader, analyst, or enthusiast, BullsEye gives you a pulse on the market.

Built with [Next.js](https://nextjs.org), [FastAPI](https://fastapi.tiangolo.com/), [Gemini](https://gemini.google.com/), and [Finnhub](https://finnhub.io).

---

## 🚀 Features

- 🔍 Search and view the latest news headlines using [NewsAPI](https://newsapi.org)
- 🧠 Analyze **sentiment** of any news headline using `vaderSentiment` via FastAPI
- 📊 Real-time **stock market data** in tabular and marquee formats via [Finnhub Stock API](https://finnhub.io)
- 📰 Live **market news** using [Finnhub Market News API](https://finnhub.io)
- 💬 Real-time **chat assistant** powered by [Gemini](https://gemini.google.com/) + `@google/generative-ai` (model: `gemini-1.5-flash`)
- 🎨 Clean, responsive UI with Tailwind CSS

---

## 🧰 Tech Stack

### Frontend
| Tool / Library        | Purpose                                |
|-----------------------|-----------------------------------------|
| **Next.js**           | Full-stack React framework              |
| **React**             | Component-based UI                      |
| **Tailwind CSS**      | Utility-first CSS                       |
| **@google/generative-ai** | Chatbot using Gemini 1.5 Flash       |

### Backend (Local)
| Tool / Library        | Purpose                                |
|-----------------------|-----------------------------------------|
| **FastAPI (Python)**  | Sentiment analysis microservice         |
| **vaderSentiment**    | Analyzes positive/neutral/negative tone |

### External APIs
| API / Provider        | Used For                                |
|-----------------------|-----------------------------------------|
| [NewsAPI](https://newsapi.org)      | Global news search            |
| [Finnhub Stock API](https://finnhub.io) | Live stock prices + ticker   |
| [Finnhub Market News API](https://finnhub.io) | Financial news feed       |
| [Gemini API](https://gemini.google.com) | AI chatbot / Assistant      |

---

## 🛠 Getting Started

### 1. Start the Frontend

```bash
npm install
npm run dev
