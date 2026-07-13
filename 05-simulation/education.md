# Education & Training Specification

## 1. Overview
In the context of the AIOS, the **Education System** is primarily concerned with the onboarding, knowledge acquisition, and skill upgrading of simulated human employees (Citizens) as well as the simulated training of specialized AI sub-agents. It tests the primary AI agent's ability to manage human capital development and continuous organizational learning.

## 2. Core Capabilities

### 2.1 Skill Trees & Competencies
- **Simulated Employee Skilling**: Citizens possess defined skill levels (e.g., Python: Beginner, Negotiation: Expert). The system simulates the time and cost required to upgrade these skills through training programs.
- **Knowledge Decay**: Skills degrade over time if not utilized or refreshed, forcing the AI agent to balance continuous education against active productivity.

### 2.2 Corporate Knowledge Base
- **Institutional Memory**: Simulates the company's internal documentation, wikis, and standard operating procedures (SOPs).
- **Knowledge Transfer**: Models the efficiency of onboarding new simulated employees. If institutional memory is poor, onboarding takes longer and produces higher error rates.

### 2.3 AI Sub-Agent Training (Meta-Training)
- Allows the primary AI agent to allocate compute resources to train specialized sub-agents (e.g., a customer service bot). This simulates the MLOps pipeline within the business environment.

## 3. Architecture

### 3.1 Learning Curves
Implements non-linear learning curves. Initial skill acquisition is fast, but mastering a skill requires exponentially more time and resources.

### 3.2 Training ROI Calculator
Evaluates the cost of taking an employee offline for training versus the projected productivity increase. The AI agent must optimize this equation.

### 3.3 Certification Engine
Grants simulated certifications that may be required by the Government System for compliance (e.g., requiring all financial officers to have a specific regulatory certification).

## 4. Data Models

```json
{
  "employee_id": "emp_4092",
  "current_skills": {
    "software_engineering": {
      "level": 4,
      "experience_points": 1250,
      "time_since_last_used_ticks": 10
    }
  },
  "active_training": {
    "course_id": "advanced_cloud_arch",
    "completion_percentage": 45.0,
    "cost_allocated": 5000
  },
  "certifications": ["aws_certified_pro", "soc2_compliance_basics"]
}
```

## 5. Integration Points
- **Citizen System**: Directly modifies the attributes and capabilities of simulated employees.
- **Jobs System**: Determines which roles an employee is qualified to fill.
- **Government System**: Audits certifications for regulatory compliance.
