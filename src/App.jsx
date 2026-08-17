import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  Terminal, 
  Smartphone, 
  Zap, 
  Mail, 
  Download, 
  Play, 
  CheckCircle2, 
  Radio, 
  Lock, 
  Server,
  Layers,
  ArrowRight,
  Sparkles,
  GitBranch,
  Volume2,
  RefreshCw,
  Bell,
  AlertTriangle,
  XCircle,
  Activity
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('demo');
  const [lampState, setLampState] = useState('ON'); // ON = 700W Load, OFF = 0W Curtailed
  const [powerDraw, setPowerDraw] = useState(700); // 700W normal load
  const [showGateModal, setShowGateModal] = useState(false);
  const [pendingOrder, setPendingOrder] = useState(null);
  const [chimeActive, setChimeActive] = useState(false);
  const [outboxCount, setOutboxCount] = useState(4);
  const [commandInput, setCommandInput] = useState('');
  const [consoleOutput, setConsoleOutput] = useState([
    '[SYSTEM] Agent Smith Nomadic Core Initialized.',
    '[SOMATIC] Home Base Mediator (FAT_AGENT): Online at 192.168.1.10',
    '[EDGE] Virtual AiPi Node connected: aipi-livingroom-01 (Raspberry Pi / Smart Lamp 700W Load)',
    '[MOBILE] PWA Voice Gateway synced (LEAN_AGENT)',
    '[ROUTER] emilia-mailbox Intent Ingestion Active [GRACE:AMBER]'
  ]);

  // Handle simulated grid curtailment order dispatch
  const handleSimulateGridOrder = () => {
    const order = {
      orderId: `grid-order-${Math.floor(1000 + Math.random() * 9000)}`,
      sender: 'iso-ne.grid.agent',
      action: 'CURTAIL_LOAD',
      target: 'aipi-livingroom-01 (Living Room Lamp / Micro-Datacenter)',
      loadReduction: '700W',
      purposeBound: 'DE-FOA-0003612 Focus Area 10-A (Load Flexibility)',
      timestamp: new Date().toLocaleTimeString()
    };
    setPendingOrder(order);
    setShowGateModal(true);
    setChimeActive(true);

    setConsoleOutput(prev => [
      ...prev,
      `[emilia-mailbox] 🔔 INCOMING ENVELOPE from ${order.sender}: Grid Curtailment Order (${order.loadReduction} Shed)`,
      `[AiPi CHIME] 🔊 Desktop AiPi unit dings: "New grid curtailment message arrived from ISO-NE."`,
      `[Agent Smith] Voice Prompt: "Grid curtailment order just came in (shed 700W micro-datacenter load). Do you want to approve?"`,
      `[EMILIA GATE] Launching 2FA Challenge Modal for physical actuation authorization...`
    ]);
  };

  const handleApproveGateOrder = async () => {
    if (!pendingOrder) return;

    // Simulate WebAuthn Passkey hardware challenge (Windows Hello / Touch ID / FIDO2)
    let passkeyStatus = 'Verified (WebAuthn Passkey Assertion)';
    try {
      if (window.PublicKeyCredential && typeof navigator.credentials?.get === 'function') {
        setConsoleOutput(prev => [...prev, `[WEBAUTHN PASSKEY] Prompting hardware passkey (Windows Hello / Touch ID)...`]);
      }
    } catch (e) {
      console.warn('WebAuthn API fallback active:', e);
    }

    setLampState('OFF');
    setPowerDraw(0);
    setShowGateModal(false);
    setChimeActive(false);

    const proofHash = `sha256:${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    const passkeyId = `webauthn_spki_${Math.random().toString(36).substring(2, 10)}`;

    setConsoleOutput(prev => [
      ...prev,
      `[WEBAUTHN PASSKEY] 🔑 Human Principal Biometric Hardware Assertion Verified!`,
      `[WEBAUTHN PASSKEY] Credential SPKI: ${passkeyId} (User: Justin Kintzele / Principal)`,
      `[EMILIA GATE 2FA] ✅ Class-A Passkey Signature Verified! Gate Admission Token: 0x88f1`,
      `[ACTUATOR RELAY] Executing physical relay toggle on aipi-livingroom-01...`,
      `[ACTUATOR RELAY] Living Room Lamp (Micro-Datacenter 700W Load) -> CURTAILED / OFF (0W Power Draw)`,
      `[PROOF-OF-CURTAILMENT] Settlement bundle signed (Human Passkey + Agent Key + Relay Ack): ${proofHash}`,
      `[emilia-mailbox] Sent attested execution receipt to iso-ne.grid.agent (Status: EXECUTED)`
    ]);
    setOutboxCount(prev => prev + 1);
  };

  const handleDenyGateOrder = () => {
    setShowGateModal(false);
    setChimeActive(false);

    setConsoleOutput(prev => [
      ...prev,
      `[EMILIA GATE 2FA] ❌ USER REFUSED! Gate Admission Token: REFUSED`,
      `[ACTUATOR RELAY] Command blocked from physical execution. Lamp remains ${lampState}.`,
      `[emilia-mailbox] Sent refusal receipt to iso-ne.grid.agent (Status: REFUSED_BY_USER)`
    ]);
  };

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    if (!commandInput.trim()) return;

    const cmd = commandInput;
    setCommandInput('');
    setConsoleOutput(prev => [...prev, `> ${cmd}`]);

    if (cmd.toLowerCase().includes('turn off lamp') || cmd.toLowerCase().includes('curtail')) {
      setLampState('OFF');
      setPowerDraw(0);
      setConsoleOutput(prev => [
        ...prev, 
        `[A:iB PROPOSAL] Intent parsed: Proposed action -> Set Lamp to OFF (0W Power Draw)`,
        `[EMILIA GATE] Evaluating admission boundary... Status: ADMITTED (Gate Token: 0x88f1)`,
        `[ACTUATOR] Physical relay executed -> Living Room Lamp set to OFF (Ack: 0x9921)`
      ]);
    } else if (cmd.toLowerCase().includes('turn on lamp') || cmd.toLowerCase().includes('restore')) {
      setLampState('ON');
      setPowerDraw(700);
      setConsoleOutput(prev => [
        ...prev, 
        `[A:iB PROPOSAL] Intent parsed: Proposed action -> Set Lamp to ON (700W Power Draw)`,
        `[EMILIA GATE] Evaluating admission boundary... Status: ADMITTED (Gate Token: 0x88f2)`,
        `[ACTUATOR] Physical relay executed -> Living Room Lamp set to ON (Ack: 0x9922)`
      ]);
    } else if (cmd.toLowerCase().includes('email') || cmd.toLowerCase().includes('iman')) {
      setOutboxCount(prev => prev + 1);
      setConsoleOutput(prev => [...prev, '[Poka-Yoke] Formatted email envelope: [GRACE:AMBER:pr595] -> Sent to team@emiliaprotocol.ai']);
    } else {
      setConsoleOutput(prev => [...prev, `[Agent Smith] Intent parsed: Dispatching task to Git PromptOps pipeline.`]);
    }
  };

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <div className="bg-glow-1"></div>
      <div className="bg-glow-2"></div>

      {/* Header Bar */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 40px',
        borderBottom: '1px solid var(--border-color)',
        backdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(7, 9, 14, 0.85)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #38bdf8 0%, #4f46e5 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 16px rgba(56, 189, 248, 0.4)'
          }}>
            <Cpu size={24} color="#fff" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Agent-in-Body <span className="badge-tlp badge-sky">A:iB v1.2</span></h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>SmartHome Grid Curtailment & Nomadic Agent Console</p>
          </div>
        </div>

        {/* Nav Tabs */}
        <nav style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={() => setActiveTab('demo')}
            className={`btn-secondary ${activeTab === 'demo' ? 'gradient-text' : ''}`}
            style={{ fontSize: '0.9rem', padding: '8px 16px' }}
          >
            <Terminal size={16} /> Grid Curtailment Console
          </button>
          <button 
            onClick={() => setActiveTab('overview')}
            className={`btn-secondary ${activeTab === 'overview' ? 'gradient-text' : ''}`}
            style={{ fontSize: '0.9rem', padding: '8px 16px' }}
          >
            <Sparkles size={16} /> Architecture & Vision
          </button>
          <button 
            onClick={() => setActiveTab('aipi')}
            className={`btn-secondary ${activeTab === 'aipi' ? 'gradient-text' : ''}`}
            style={{ fontSize: '0.9rem', padding: '8px 16px' }}
          >
            <Radio size={16} /> AiPi Node Simulator
          </button>
        </nav>

        <a 
          href="https://github.com/jdieselny/agent-in-body" 
          target="_blank" 
          rel="noreferrer"
          className="btn-primary"
          style={{ fontSize: '0.9rem', padding: '8px 16px' }}
        >
          <GitBranch size={16} /> GitHub Repo
        </a>
      </header>

      {/* 3-Node Topology Status Bar */}
      <div style={{
        background: 'rgba(15, 23, 42, 0.6)',
        borderBottom: '1px solid var(--border-color)',
        padding: '12px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '0.85rem'
      }}>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8' }}>
            <Server size={14} color="#38bdf8" /> <strong>Home Base:</strong> Laptop/PC (<span style={{ color: '#34d399' }}>FAT_AGENT</span>)
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8' }}>
            <Radio size={14} color="#f59e0b" /> <strong>IoT Actuator:</strong> AiPi Lamp Node (<span style={{ color: '#34d399' }}>aipi-livingroom-01</span>)
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8' }}>
            <Smartphone size={14} color="#a855f7" /> <strong>Mobile Bridge:</strong> Voice Gateway (<span style={{ color: '#34d399' }}>LEAN_AGENT</span>)
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="badge-tlp badge-emerald" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Activity size={12} /> Load: {powerDraw}W {lampState === 'ON' ? '(700W Peak)' : '(CURTAILED)'}
          </span>
        </div>
      </div>

      {/* Main Container */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 20px' }}>

        {/* DEMO CONSOLE TAB */}
        {activeTab === 'demo' && (
          <div>
            
            {/* Top Action Banner */}
            <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.9) 100%)' }}>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Zap size={22} color="#f59e0b" /> SmartHome Grid Curtailment Simulator
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  Simulate an incoming ISO grid curtailment order sent via <code style={{ color: '#38bdf8' }}>emilia-mailbox</code>, trigger the desktop AiPi chime & Agent Smith voice prompt, and approve physical load-shedding via the <strong>EMILIA Gate 2FA Challenge</strong>.
                </p>
              </div>

              <button 
                onClick={handleSimulateGridOrder}
                className="btn-primary"
                style={{ padding: '14px 24px', fontSize: '0.95rem', gap: '10px', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', boxShadow: '0 0 20px rgba(245, 158, 11, 0.4)' }}
              >
                <Bell size={18} /> Dispatch 700W Curtailment Order (ISO-NE)
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
              
              {/* Interactive Console Left */}
              <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '620px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Terminal size={20} color="#38bdf8" />
                    <h3 style={{ fontSize: '1.1rem' }}>Agent Smith Intent & Mailbox Dispatcher</h3>
                  </div>
                  <span className="badge-tlp badge-emerald"><Radio size={12} /> WebSocket Live (192.168.1.4:8000)</span>
                </div>

                {/* Console Log Area */}
                <div style={{ 
                  flex: 1, 
                  background: '#04060a', 
                  borderRadius: '12px', 
                  padding: '16px', 
                  fontFamily: 'monospace', 
                  fontSize: '0.85rem', 
                  overflowY: 'auto',
                  border: '1px solid var(--border-color)',
                  marginBottom: '16px'
                }}>
                  {consoleOutput.map((line, idx) => (
                    <div key={idx} style={{ 
                      marginBottom: '8px', 
                      color: line.startsWith('>') ? '#38bdf8' : line.includes('GATE') || line.includes('2FA') ? '#fbbf24' : line.includes('AiPi') || line.includes('ACTUATOR') ? '#34d399' : line.includes('PROOF') ? '#a855f7' : '#94a3b8' 
                    }}>
                      {line}
                    </div>
                  ))}
                </div>

                {/* Command Input Form */}
                <form onSubmit={handleCommandSubmit} style={{ display: 'flex', gap: '12px' }}>
                  <input 
                    type="text" 
                    value={commandInput}
                    onChange={(e) => setCommandInput(e.target.value)}
                    placeholder="Try: 'Agent Smith, turn off living room lamp' or 'curtail load'..."
                    style={{
                      flex: 1,
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      padding: '12px 16px',
                      color: '#fff',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                  <button type="submit" className="btn-primary" style={{ padding: '12px 20px' }}>Dispatch</button>
                </form>
              </div>

              {/* Status Panel Right */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                {/* Smart Home Relay & Micro-Datacenter Widget */}
                <div className="glass-panel" style={{ padding: '24px' }}>
                  <h4 style={{ fontSize: '1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Radio size={16} color="#34d399" /> Physical Actuator (AiPi Node)
                  </h4>

                  <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-color)', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontWeight: 600 }}>Living Room Lamp</span>
                      <span className={`badge-tlp ${lampState === 'ON' ? 'badge-emerald' : 'badge-amber'}`}>
                        {lampState === 'ON' ? 'NORMAL (ON)' : 'CURTAILED (OFF)'}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                      Device: <code>aipi-livingroom-01</code> (Micro-Datacenter 700W Load)
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                      <span>Current Power Draw:</span>
                      <strong style={{ color: lampState === 'ON' ? '#f59e0b' : '#34d399' }}>{powerDraw} Watts</strong>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      const nextState = lampState === 'ON' ? 'OFF' : 'ON';
                      setLampState(nextState);
                      setPowerDraw(nextState === 'ON' ? 700 : 0);
                    }}
                    className="btn-secondary" 
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    Toggle Relay Pin (Manual Override)
                  </button>
                </div>

                {/* Mailbox Outbox Status */}
                <div className="glass-panel" style={{ padding: '24px' }}>
                  <h4 style={{ fontSize: '1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Mail size={16} color="#fbbf24" /> emilia-mailbox Transport
                  </h4>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                    Signed Outbox Receipts: <strong style={{ color: '#fff' }}>{outboxCount}</strong>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#fbbf24', background: 'rgba(245, 158, 11, 0.1)', padding: '10px', borderRadius: '8px' }}>
                    Status: Signed Ed25519 Envelopes Active [TLP:CLEAR]
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div>
            {/* Hero Section */}
            <div style={{ textAlign: 'center', margin: '40px 0 60px 0' }}>
              <div style={{ display: 'inline-flex', marginBottom: '16px' }} className="badge-tlp badge-amber">
                <ShieldCheck size={14} /> Poka-Yoke Intent Envelope System Active
              </div>
              <h1 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '16px' }}>
                Your Lifelong <span className="gradient-text">Nomadic Personal Agent</span>.
              </h1>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '750px', margin: '0 auto 32px auto' }}>
                Self-aware, vendor-agnostic, and Git-backed. A:iB unifies your mobile devices, desktop terminals, and physical AiPi micro-controllers into one cohesive personal companion.
              </p>
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                <button onClick={() => setActiveTab('demo')} className="btn-primary" style={{ padding: '14px 28px', fontSize: '1rem' }}>
                  <Play size={18} /> Launch Grid Curtailment Console <ArrowRight size={18} />
                </button>
                <button onClick={() => setActiveTab('aipi')} className="btn-secondary" style={{ padding: '14px 28px', fontSize: '1rem' }}>
                  <Download size={18} /> Download AiPi Firmware (BL602 / Pi)
                </button>
              </div>
            </div>

            {/* 3-Pillar Trifecta Cards */}
            <h2 style={{ fontSize: '1.8rem', marginBottom: '24px', textAlign: 'center' }}>The 3-Pillar Continuum Architecture</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '60px' }}>
              
              {/* Pillar 1 */}
              <div className="glass-panel" style={{ padding: '32px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(56, 189, 248, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  <Smartphone size={24} color="#38bdf8" />
                </div>
                <div className="badge-tlp badge-sky" style={{ marginBottom: '12px' }}>Pillar 1</div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>Nomadic 1:1 Personal Agent</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                  BYOD Agent Smith travels with you on your phone, laptop, and AiPi hardware nodes. Complete somatic self-awareness with zero cloud lock-in.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="glass-panel" style={{ padding: '32px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(129, 140, 248, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  <Layers size={24} color="#818cf8" />
                </div>
                <div className="badge-tlp badge-amber" style={{ marginBottom: '12px' }}>Pillar 2</div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>Corporate Edition (Lean / Six Sigma)</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                  Git-backed PromptOps workflow that turns natural human language into verifiable, Poka-Yoke action envelopes and lean daily code sprints.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="glass-panel" style={{ padding: '32px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  <Zap size={24} color="#10b981" />
                </div>
                <div className="badge-tlp badge-emerald" style={{ marginBottom: '12px' }}>Pillar 3</div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>EMILIA Grid Curtailment (GRACE)</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                  Evidence-bound curtailment admission and reconciliation for AI compute load shedding. Bounded commands, attested meters, and lost-ack reconciliation.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* AIPI HARDWARE PORTAL TAB */}
        {activeTab === 'aipi' && (
          <div>
            <div className="glass-panel" style={{ padding: '40px', marginBottom: '32px' }}>
              <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(56, 189, 248, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Cpu size={36} color="#38bdf8" />
                </div>
                <div>
                  <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>AiPi & Raspberry Pi Somatic Node Portal</h2>
                  <p style={{ color: 'var(--text-muted)' }}>Micro-Daemon for BL602 / Raspberry Pi / ESP32-S3 RISC-V Hardware Endpoints</p>
                </div>
              </div>

              <hr style={{ borderColor: 'var(--border-color)', margin: '24px 0' }} />

              <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Available Firmware Downloads & Tools</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                
                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>aipi_somatic_node.py</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                    Python/MicroPython somatic daemon with Ed25519 signed heartbeats and GPIO pin controls for Raspberry Pi & AiPi.
                  </p>
                  <button onClick={() => alert('Downloading aipi_somatic_node.py...')} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    <Download size={16} /> Download Python Daemon
                  </button>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>BL602 C-SDK Somatic Binaries</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                    Native C SDK build for AiPi RISC-V microcontrollers with MQTT & PDM audio streaming.
                  </p>
                  <button onClick={() => alert('Downloading BL602 C-SDK firmware...')} className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                    <Download size={16} /> Download RISC-V Firmware
                  </button>
                </div>

              </div>
            </div>
          </div>
        )}

      </main>

      {/* EMILIA GATE 2FA ADMISSION CHALLENGE MODAL */}
      {showGateModal && pendingOrder && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div className="glass-panel" style={{
            maxWidth: '520px',
            width: '100%',
            padding: '32px',
            border: '2px solid #f59e0b',
            boxShadow: '0 0 40px rgba(245, 158, 11, 0.3)',
            animation: 'pulse 2s infinite'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShieldCheck size={28} color="#f59e0b" />
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>EMILIA Gate 2FA Admission</h3>
              </div>
              <span className="badge-tlp badge-amber">CHALLENGE ACTIVE</span>
            </div>

            <div style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '10px', padding: '16px', marginBottom: '20px' }}>
              <div style={{ fontSize: '0.85rem', color: '#fbfbfe', marginBottom: '8px' }}>
                🔔 <strong>Agent Smith Alert:</strong> <em>"Grid curtailment order received from ISO-NE. Shed 700W load on Living Room Micro-Datacenter?"</em>
              </div>
            </div>

            <div style={{ fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px', background: 'rgba(255, 255, 255, 0.03)', padding: '16px', borderRadius: '8px' }}>
              <div><strong>Order ID:</strong> <code>{pendingOrder.orderId}</code></div>
              <div><strong>Sender Domain:</strong> <code>{pendingOrder.sender}</code></div>
              <div><strong>Proposed Action:</strong> <span style={{ color: '#f59e0b', fontWeight: 700 }}>CURTAIL_LOAD ({pendingOrder.loadReduction} Shed)</span></div>
              <div><strong>Target Actuator:</strong> <code>{pendingOrder.target}</code></div>
              <div><strong>Purpose Bounds:</strong> <span style={{ color: '#38bdf8' }}>{pendingOrder.purposeBound}</span></div>
              <div><strong>Time Received:</strong> {pendingOrder.timestamp}</div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={handleApproveGateOrder} 
                className="btn-primary" 
                style={{ flex: 1, padding: '14px', justifyContent: 'center', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', boxShadow: '0 0 16px rgba(16, 185, 129, 0.4)' }}
              >
                <CheckCircle2 size={18} /> APPROVE WITH WEBAUTHN PASSKEY (FIDO2)
              </button>
              <button 
                onClick={handleDenyGateOrder} 
                className="btn-secondary" 
                style={{ flex: 1, padding: '14px', justifyContent: 'center', borderColor: '#ef4444', color: '#ef4444' }}
              >
                <XCircle size={18} /> DENY / REFUSE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{ textAlign: 'center', padding: '40px', borderTop: '1px solid var(--border-color)', color: 'var(--text-dim)', fontSize: '0.85rem' }}>
        Agent-in-Body (A:iB) • Nomadic 1:1 Personal Agent Protocol • Built with Vite & React
      </footer>
    </div>
  );
}
