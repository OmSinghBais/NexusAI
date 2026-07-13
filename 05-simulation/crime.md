# Crime & Adversarial System Specification

## 1. Overview
The **Crime System** introduces malicious actors and adversarial conditions into the simulation. In a business context, this is critical for testing an AI agent's security protocols, risk management, and crisis response capabilities. This system acts as the "Red Team" against the AI's operations.

## 2. Core Capabilities

### 2.1 Cybersecurity Threats
- **Simulated Attacks**: Generates DDoS attacks, phishing campaigns targeting simulated employees (Citizens), ransomware injections, and zero-day exploit attempts against the company's virtual infrastructure.
- **Data Breaches**: Attempts to exfiltrate simulated customer data or proprietary IP, testing the AI's encryption and access control models.

### 2.2 Corporate Fraud & Espionage
- **Internal Threats**: Simulates rogue employees attempting embezzlement, insider trading, or IP theft. Tests the AI's anomaly detection in financial ledgers and behavior logs.
- **Industrial Espionage**: Rival simulated corporations deploying tactics to steal R&D data (interfacing with the Crafting/Product system).

### 2.3 Market Manipulation
- **Short-and-Distort Campaigns**: Coordinated simulated PR attacks combined with market actions to artificially drive down the company's valuation.
- **Supply Chain Sabotage**: Targeted disruptions of key logistics nodes to test the AI's supply chain resilience.

## 3. Architecture

### 3.1 Threat Generator
A stochastic engine that calculates the probability of various attacks based on the enterprise's "Attack Surface Score" (determined by their security investments and operational footprint).

### 3.2 Adversarial Agents
Uses specialized, hostile AI sub-agents trained specifically to find vulnerabilities in the primary AI agent's strategies and operations. These are not script-based events, but active, intelligent adversaries.

### 3.3 Impact Calculator
Determines the financial, operational, and reputational damage if an attack is successful, interfacing with the Economy and Citizen (Sentiment) systems.

## 4. Data Models

```json
{
  "active_threats": [
    {
      "threat_id": "ransomware_campaign_04",
      "type": "cyber",
      "severity": 0.85,
      "target_node": "primary_database_cluster",
      "detection_difficulty": 0.9
    }
  ],
  "security_posture": {
    "attack_surface_score": 45.2,
    "resilience_rating": "B+"
  }
}
```

## 5. Integration Points
- **Healthcare System**: Successful cyber attacks degrade system health and require recovery protocols.
- **Government System**: Data breaches trigger mandatory reporting and potential fines.
- **Economy System**: Fraud and theft directly reduce cash reserves; PR crises impact valuation.
