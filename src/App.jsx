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
  RefreshCw
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [lampState, setLampState] = useState('OFF');
  const [sprintLogs, setSprintLogs] = useState([
    { id: 1, title: 'Upgrade Mobile Voice Interface (PWA)', status: 'Completed' },
    { id: 2, title: 'AiPi Somatic Heartbeat Validator', status: 'In Progress' },
    { id: 3, title: 'Poka-Yoke Subject Tag Router', status: 'Completed' }
  ]);
  const [outboxCount, setOutboxCount] = useState(4);
  const [commandInput, setCommandInput] = useState('');
  const [consoleOutput, setConsoleOutput] = useState([
    '[SYSTEM] Agent Smith Nomadic Core Initialized.',
    '[SOMATIC] AiPi Node connected: aipi-livingroom-01 (RSSI: -58dBm)',
    '[ROUTER] Poka-Yoke Email Ingestion Active [GRACE:AMBER]'
  ]);

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    if (!commandInput.trim()) return;

    const cmd = commandInput;
    setCommandInput('');
    setConsoleOutput(prev => [...prev, `> ${cmd}`]);

    if (cmd.toLowerCase().includes('turn off lamp')) {
      setLampState('OFF');
      setConsoleOutput(prev => [...prev, '[AiPi] Living Room Lamp set to OFF (Ack: 0x9921)']);
    } else if (cmd.toLowerCase().includes('turn on lamp')) {
      setLampState('ON');
      setConsoleOutput(prev => [...prev, '[AiPi] Living Room Lamp set to ON (Ack: 0x9922)']);
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
        background: 'rgba(7, 9, 14, 0.8)'
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
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Nomadic 1:1 Personal Agent Protocol</p>
          </div>
        </div>

        {/* Nav Tabs */}
        <nav style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={() => setActiveTab('overview')}
            className={`btn-secondary ${activeTab === 'overview' ? 'gradient-text' : ''}`}
            style={{ fontSize: '0.9rem', padding: '8px 16px' }}
          >
            <Sparkles size={16} /> Vision & Pillars
          </button>
          <button 
            onClick={() => setActiveTab('demo')}
            className={`btn-secondary ${activeTab === 'demo' ? 'gradient-text' : ''}`}
            style={{ fontSize: '0.9rem', padding: '8px 16px' }}
          >
            <Terminal size={16} /> Live Agent Console
          </button>
          <button 
            onClick={() => setActiveTab('aipi')}
            className={`btn-secondary ${activeTab === 'aipi' ? 'gradient-text' : ''}`}
            style={{ fontSize: '0.9rem', padding: '8px 16px' }}
          >
            <Radio size={16} /> AiPi Hardware Portal
          </button>
        </nav>

        <a 
          href="https://github.com/jdieselny/emilia-protocol" 
          target="_blank" 
          rel="noreferrer"
          className="btn-primary"
          style={{ fontSize: '0.9rem', padding: '8px 16px' }}
        >
          <GitBranch size={16} /> GitHub Workspace
        </a>
      </header>

      {/* Main Container */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        
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
                  <Play size={18} /> Launch Agent Smith Console <ArrowRight size={18} />
                </button>
                <button onClick={() => setActiveTab('aipi')} className="btn-secondary" style={{ padding: '14px 28px', fontSize: '1rem' }}>
                  <Download size={18} /> Download AiPi Firmware (BL602)
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
                  Verifiable proof-of-curtailment circuit for AI compute load shedding. Bounded commands, attested meters, and lost-ack reconciliation.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* DEMO CONSOLE TAB */}
        {activeTab === 'demo' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
              
              {/* Interactive Console Left */}
              <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '600px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Terminal size={20} color="#38bdf8" />
                    <h3 style={{ fontSize: '1.1rem' }}>Agent Smith Intent Dispatcher</h3>
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
                      color: line.startsWith('>') ? '#38bdf8' : line.includes('AiPi') ? '#34d399' : line.includes('Poka-Yoke') ? '#fbbf24' : '#94a3b8' 
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
                    placeholder="Try: 'Agent Smith, turn off living room lamp' or 'Send Iman an email'..."
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
                
                {/* Smart Home Relay Widget */}
                <div className="glass-panel" style={{ padding: '24px' }}>
                  <h4 style={{ fontSize: '1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Radio size={16} color="#34d399" /> AiPi Hardware State
                  </h4>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', background: 'rgba(255, 255, 255, 0.03)', padding: '12px', borderRadius: '8px' }}>
                    <span>Living Room Lamp</span>
                    <span className={`badge-tlp ${lampState === 'ON' ? 'badge-emerald' : 'badge-amber'}`}>{lampState}</span>
                  </div>
                  <button 
                    onClick={() => setLampState(prev => prev === 'ON' ? 'OFF' : 'ON')}
                    className="btn-secondary" 
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    Toggle Lamp Relay Pin
                  </button>
                </div>

                {/* Mailbox Outbox Status */}
                <div className="glass-panel" style={{ padding: '24px' }}>
                  <h4 style={{ fontSize: '1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Mail size={16} color="#fbbf24" /> Poka-Yoke Mailbox
                  </h4>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                    Queued Envelopes: <strong style={{ color: '#fff' }}>{outboxCount}</strong>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#fbbf24', background: 'rgba(245, 158, 11, 0.1)', padding: '8px', borderRadius: '6px' }}>
                    Tag: [GRACE:AMBER:pr595] Active
                  </div>
                </div>

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
                  <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>AiPi Somatic Node Portal</h2>
                  <p style={{ color: 'var(--text-muted)' }}>Micro-Daemon for BL602 / ESP32-S3 RISC-V Hardware Endpoints</p>
                </div>
              </div>

              <hr style={{ borderColor: 'var(--border-color)', margin: '24px 0' }} />

              <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Available Firmware Downloads & Tools</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                
                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>aipi_somatic_node.py</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                    Python/MicroPython somatic daemon with Ed25519 signed heartbeats and GPIO pin controls.
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

      {/* Footer */}
      <footer style={{ textAlign: 'center', padding: '40px', borderTop: '1px solid var(--border-color)', color: 'var(--text-dim)', fontSize: '0.85rem' }}>
        Agent-in-Body (A:iB) • Nomadic 1:1 Personal Agent Protocol • Built with Vite & React
      </footer>
    </div>
  );
}
