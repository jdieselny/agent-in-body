# Agent-in-Body (A:iB) — Protocol Specification & Architecture (v1.2.0)

> **Status:** Standard Reference Specification  
> **Repository:** [`https://github.com/jdieselny/agent-in-body`](https://github.com/jdieselny/agent-in-body)  
> **Key Standards:** DNS-AID (DNSSEC Public Key Discovery), EMILIA-Mailbox (Asynchronous Intent Transport), EMILIA Gate (Purpose-Bound Admission Boundary)

---

## 1. Executive Summary

**Agent-in-Body (A:iB)** is a vendor-agnostic, local-first operating specification that decouples AI agent identity, state, and execution from proprietary cloud platforms. 

Rather than treating an AI agent as a hosted cloud API endpoint or forcing real-time coordination into fragile, synchronous TCP/TLS sessions (`draft-feng-00`), **A:iB defines an agent by its locally generated cryptographic key pair and domain enrollment**.

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
│ DNSSEC Public Key     │  │ Signed Envelopes      │  │ Independent Admission │
└───────────────────────┘  └───────────────────────┘  └───────────────────────┘
```

---

## 2. Separation of Identities (Iman's Strict Boundary)

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

## 4. Cryptographic Agent Enrollment Protocol

### Domain Enrollment (The Active Directory Model)

Agents do not negotiate capabilities during live TCP sessions. Capability declarations, public keys, and group memberships are established during **Domain Enrollment**:

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

### DNS-Anchored Discovery (DNS-AID):

To allow any relying party to discover and verify an agent out-of-band without centralized OAuth servers:

```dns
_agent.jdieselny.com.  3600  IN  TXT  "v=AIB1; alg=ed25519; pub=bBASBc4TI+ROrnlwqur1QMjEQCrOjkpX0YgKNMWbzPo=; transport=emilia-mailbox; status=active"
```

---

## 5. End-to-End Execution Sequence: Proposal to Actuation

```text
  1. USER Intent ──> 2. A:iB Formats ──> 3. DNS-AID Check ──> 4. EMILIA Gate ──> 5. Actuator Ack
  ("Turn off lamp")   Proposed Envelope   (Verify PubKey)     (Admit / Refuse)   (Executed/Refused)
```

1. **A:iB Proposes Action**: A:iB parses human intent and formats a **Proposed Action Envelope**. *(A:iB NEVER directly mutates physical hardware without Gate admission).*
2. **Mailbox Transport**: The envelope is signed and delivered via `emilia-mailbox`.
3. **DNS-AID Verification**: The receiving router verifies `sender_domain` via `_agent.<domain>` DNSSEC lookup.
4. **EMILIA Gate Admission**: The independent EMILIA Gate evaluates whether the exact action is authorized, unexpired, and within purpose bounds.
5. **Actuator Execution**: The physical actuator (AiPi BL602/ESP32) executes the command ONLY if Gate admission is present, returning an attested status (`executed`, `refused`, or `indeterminate`).

---

## 6. Hostile Case Matrix & Security Fail-Closed Boundaries

| Hostile Condition | Protocol Behavior | Result |
| :--- | :--- | :--- |
| **Stale / Missing DNS Record** | Resolver fails to fetch `_agent.<domain>` or DNSSEC fails. | **Fails Closed**. Gate refuses physical admission. Envelope marked Class-B Guest. |
| **Replayed Envelope ID** | Envelope contains a previously observed `message_id`. | **Fails Closed**. Rejected as replay attack. |
| **Key Misuse (Persona $\neq$ Authority)** | Transport key attempts to self-authorize Gate admission. | **Fails Closed**. Transport signature cannot authorize actuation. |
| **Un-enrolled Unknown Sender** | Sender has no entry in domain enrollment or DNS. | **Class-B Guest Fallback**. Allowed for read/comment, blocked from actuation. |

---

*Master Reference Specification — Agent-in-Body (A:iB) v1.2.0*
