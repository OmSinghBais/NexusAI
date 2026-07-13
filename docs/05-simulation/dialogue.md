# Dialogue & Communication Specification

## 1. Overview
The **Dialogue System** is the primary natural language interface between the AI agent under test and the simulated world. It handles negotiations, press releases, internal communications, and customer support interactions. This system rigorously tests the AI's NLP capabilities, tone matching, and persuasive logic.

## 2. Core Capabilities

### 2.1 B2B Negotiation Engine
- **Contract Parameterization**: Translates natural language proposals into structured contract parameters (price, SLA, duration).
- **Counter-Offers**: Simulated entities use their Personality profiles to evaluate proposals and generate natural language counter-offers.

### 2.2 Public Relations & Crisis Management
- **Press Releases**: The AI agent must draft PR statements in response to simulated events (e.g., a data breach). The system evaluates the text for tone, clarity, and accountability.
- **Media Spin**: Determines how effectively the AI's communication mitigates negative sentiment in the Citizen System.

### 2.3 Internal Communications
- **All-Hands Memos**: Evaluates how the AI agent communicates strategy or bad news to simulated employees, impacting their morale and burnout metrics (Healthcare System).

## 3. Architecture

### 3.1 LLM-in-the-Loop
The Dialogue System utilizes smaller, specialized LLMs to play the roles of the simulated entities. These "Actor LLMs" are heavily prompted with their entity's Personality Profile and current state to ensure consistent behavior.

### 3.2 Semantic Scoring
Evaluates the primary AI agent's outputs not just for intent, but for nuance, empathy, and adherence to corporate brand guidelines.

### 3.3 Negotiation Tree
Under the hood, negotiations are mapped to a decision tree. The NLP layer maps free-form text to specific nodes on this tree to determine if an agreement has been reached or if the parties are walking away.

## 4. Data Models

```json
{
  "communication_session": {
    "session_id": "neg_vendor_01",
    "participants": ["ai_agent", "vendor_ceo_sim"],
    "context": "contract_renewal",
    "current_sentiment": "tense",
    "transcript": [
      {
        "speaker": "ai_agent",
        "text": "We require a 15% discount for a 3-year lock-in.",
        "intent_parsed": {"action": "propose_discount", "value": 0.15, "term": 36}
      },
      {
        "speaker": "vendor_ceo_sim",
        "text": "That's too steep given current inflation. We can do 8%.",
        "intent_parsed": {"action": "counter_offer", "value": 0.08}
      }
    ]
  }
}
```

## 5. Integration Points
- **Personality System**: Dictates how the Actor LLMs formulate their responses.
- **Relationships System**: Successful dialogue improves trust scores; poor communication degrades it.
- **Economy System**: Finalized negotiations directly update financial ledgers and contract terms.
