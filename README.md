# Agent-in-Body (A:iB) — Architecture & Implementation Plan (v1.2.0-draft)

> **Status:** Draft Implementation Plan & Architecture Document  
> **Repository:** [`https://github.com/jdieselny/agent-in-body`](https://github.com/jdieselny/agent-in-body)  
> **Core Concepts:** Asynchronous Intent Proposal, Independent Admission Boundaries, DNS Transport Key Discovery (Planned Feature)

---

## 1. Executive Summary

**Agent-in-Body (A:iB)** is a vendor-agnostic, local-first operating model that decouples AI agent identity, state, and execution from proprietary cloud platforms. 

Rather than treating an AI agent as a hosted cloud API endpoint, **A:iB defines an agent by its locally generated cryptographic key pair and domain enrollment**.

```text
 ┌─────────────────────────────────────────────────────────────────────────────┐
 │                         HUMAN OPERATOR / PRINCIPAL                          │
 └─────────────────────────────────────────────────────────────────────────────┘
                                       │
                                       ▼
 ┌─────────────────────────────────────────────────────────────────────────────┐
 │                      NOMADIC AGENT-IN-BODY (A:iB CORE)                      │
 │    - Private Key Vault (~/.emilia/private-key.pem)                          │
 │    - 4-Layer Context Substrate (Substrate -> Instance -> Persona -> Session)│
 └─────────────────────────────────────────────────────────────────────────────┘
                                       │
            ┌──────────────────────────┼──────────────────────────┐
            ▼                          ▼                          ▼
┌───────────────────────┐  ┌───────────────────────┐  ┌───────────────────────┐
│ DISCOVERY (DNS-AID)   │  │ TRANSPORT (MAILBOX)   │  │ ADMISSION (GATE)      │
│ `_agent.<domain>` TXT │  │ Asynchronous Intent   │  │ Purpose-Bound         │
│ (Planned Feature)     │  │ Signed Envelopes      │  │ Independent Admission │
└───────────────────────┘  └───────────────────────┘  └───────────────────────┘
```

---

## 2. Separation of Identities (Strict Boundary)

To ensure cryptographic integrity and prevent privilege escalation, A:iB strictly separates three distinct identities:

| Identity Role | Definition | Key / Credential | Scope & Limits |
| :--- | :--- | :--- | :--- |
| **1. Agent Persona (A:iB)** | Nomadic companion & PromptOps synthesizer | Local Ed25519 Key (`~/.emilia/`) | Proposes actions, formats envelopes, coordinates tasks |
| **2. Mailbox Transport Signer** | Asynchronous transport envelope carrier | Ephemeral / Transport Key | Proves transport origin and message integrity |
| **3. Authorized Principal** | Human Operator / Institutional Authority | Air-Gapped Authority Key | Holds sole authority to authorize physical Gate admission |

*Rule:* One key MUST NOT silently become all three roles.

---

## 3. The 4-Layer Cascading Context Boot Routine

Upon initialization on any host (desktop, smartphone, or AiPi micro-controller), the A:iB executes a cascading 4-layer context boot sequence:

```
[Layer 1: Substrate]   ➔   [Layer 2: Instance]   ➔   [Layer 3: Persona]   ➔   [Layer 4: Session]
(Global Rules & TLP)      (Host Somatic State)      (Role & Capabilities)     (Active Task Logs)
```

1. **Layer 1: Substrate (`layer_1_substrate.md`)**: Global non-negotiable rules, TLP 2.0 confidentiality boundaries, and cryptographic identity references.
2. **Layer 2: Instance / Somatics (`layer_2_instance.md`)**: Host resource awareness (CPU, RAM, power battery level, Wi-Fi RSSI, latency).
3. **Layer 3: Persona (`layer_3_persona.md`)**: Agent Smith core behavior, domain expertise, and published capability declarations.
4. **Layer 4: Session (`layer_4_session.md`)**: Active task objectives, immediate prompt scratchpad, and day-to-day session logs.

---

## 4. Cryptographic Agent Enrollment & Discovery (Planned Specs)

### Domain Enrollment (Active Directory Model)

Capabilities and public keys are declared during **Domain Enrollment** rather than negotiated live during active transactions:

```json
{
  "@version": "AIB-ENROLLMENT-CARD-v1",
  "claims": {
    "agent_id": "smith-local-01",
    "domain": "jdieselny.com",
    "public_key_b64": "bBASBc4TI+ROrnlwqur1QMjEQCrOjkpX0YgKNMWbzPo=",
    "capabilities": [
      "project_mailbox_routing",
      "somatic_aipi_actuation_proposal",
      "promptops_sprint_planning"
    ],
    "created_at": "2026-08-16T17:45:00Z"
  },
  "signature_b64": "..."
}
```

### DNS-Anchored Key Publication (DNS-AID — Planned Feature):

DNS offers a vendor-neutral location to publish and rotate transport public keys:

```dns
_agent.jdieselny.com.  3600  IN  TXT  "v=AIB1; alg=ed25519; pub=bBASBc4TI+ROrnlwqur1QMjEQCrOjkpX0YgKNMWbzPo=; transport=emilia-mailbox; status=active"
```

*Note on DNS Revocation:* Updating a DNS TXT record serves as a **revocation signal** bound by TTL caching. The Gate requires a fresh, authenticated record and fails closed if stale, missing, or conflicting.

---

## 5. End-to-End Execution Sequence: Proposal to Actuation

```text
  1. USER Intent ──> 2. A:iB Formats ──> 3. Transport Verification ──> 4. EMILIA Gate ──> 5. Actuator Ack
  ("Turn off lamp")   Proposed Envelope     (Verify PubKey)          (Admit / Refuse)   (Executed/Refused)
```

1. **A:iB Proposes Action**: A:iB parses human intent and formats a **Proposed Action Envelope**. *(A:iB NEVER directly mutates physical hardware without Gate admission).*
2. **Mailbox Transport**: The envelope is signed by the transport signer and delivered via `emilia-mailbox`.
3. **Transport Verification**: The receiving router verifies transport signatures and sender domain key assertions.
4. **EMILIA Gate Admission**: The independent EMILIA Gate evaluates whether the exact action is authorized by the Principal, unexpired, and within purpose bounds.
5. **Actuator Execution**: The physical actuator (AiPi BL602/ESP32) executes the command ONLY if Gate admission is present, returning an attested status (`executed`, `refused`, or `indeterminate`).

---

## 6. Implementation & Verification Roadmap

| Feature / Boundary | Specification Status | Implementation Status | Test Evidence |
| :--- | :--- | :--- | :--- |
| **Strict 3-Identity Separation** | Specified (`v1.2.0-draft`) | Active in Architecture | Enforced in `verify_truth_root.py` |
| **Class-B Guest Fallback** | Specified (`v1.2.0-draft`) | Active in `emilia-mailbox` | Verified in unit tests (`7d3c35b`) |
| **Action Proposal Flow** | Specified (`v1.2.0-draft`) | Active in Web Console | Demonstrated in `agent-in-body-web` |
| **DNS-AID TXT Resolution** | Specified (`v1.2.0-draft`) | Prototyped (`dns_agent_resolver.py`)| Planned for full DNSSEC test suite |
| **TTL Freshness & Stale Cache** | Specified (`v1.2.0-draft`) | Planned | Planned Hostile Test Suite |

---

*Draft Implementation Plan & Architecture Document — Agent-in-Body (A:iB) v1.2.0-draft*
