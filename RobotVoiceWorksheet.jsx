import { useState } from "react";

// ✏️ CHANGE THIS to your email address
const TEACHER_EMAIL = "Colton.Sharp@alaschools.org";

const initialForm = {
  name: "", nickname: "", grade: "",
  role: [],
  selfIntro: "", robotIntro: "",
  line1: "", line2: "", line3: "", line4: "",
  talkStyle: [], presentVibe: [],
  phrase1: "", phrase2: "", phrase3: "",
  catchphrase: "", avoid: "", lastThoughts: "",
};

const roles = ["Builder / Fabricator", "Programmer / Coder", "Designer / Planner", "Team Captain", "Presenter / Speaker", "Problem Solver", "A Little of Everything"];
const talkStyles = ["Loud & hyped", "Calm & chill", "Funny & sarcastic", "Serious & focused", "Fast talker", "Slow & deliberate", "Somewhere in the middle"];
const vibes = ["Super confident", "Nervous but push through", "Go with the flow", "Prefer the background"];

export default function App() {
  const [form, setForm] = useState(initialForm);
  const [copied, setCopied] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const toggleArr = (key, val) => {
    setForm(f => {
      const arr = f[key];
      return { ...f, [key]: arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val] };
    });
  };

  const buildSummary = () => `
🤖 ROBOT VOICE WORKSHEET — SkillsUSA
=====================================

👤 SECTION 1: WHO ARE YOU?
Name: ${form.name || "(blank)"}
Nickname: ${form.nickname || "(blank)"}
Grade: ${form.grade || "(blank)"}
Role on Project: ${form.role.join(", ") || "(none selected)"}

🎤 SECTION 2: YOUR INTRO LINES
Self-Introduction:
${form.selfIntro || "(blank)"}

Robot Introduction:
${form.robotIntro || "(blank)"}

🔊 SECTION 3: THE ROBOT'S SCRIPT LINES
Line 1 — Robot Self-Introduction:
${form.line1 || "(blank)"}

Line 2 — What the Robot Does:
${form.line2 || "(blank)"}

Line 3 — Something Cool/Surprising:
${form.line3 || "(blank)"}

Line 4 — Shoutout / Closing Line:
${form.line4 || "(blank)"}

✨ SECTION 4: PERSONALITY & STYLE
Talk Style: ${form.talkStyle.join(", ") || "(none selected)"}
Presenting Vibe: ${form.presentVibe.join(", ") || "(none selected)"}
Go-To Phrases: "${form.phrase1 || "(blank)"}" | "${form.phrase2 || "(blank)"}" | "${form.phrase3 || "(blank)"}"

🎉 SECTION 5: THE FUN STUFF
Robot Catchphrase:
${form.catchphrase || "(blank)"}

Things to Avoid:
${form.avoid || "(blank)"}

Last Thoughts:
${form.lastThoughts || "(blank)"}
`.trim();

  const handleCopy = () => {
    navigator.clipboard.writeText(buildSummary()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(`SkillsUSA Robot Voice Worksheet — ${form.name || "Student"}`);
    const body = encodeURIComponent(buildSummary());
    window.open(`mailto:${TEACHER_EMAIL}?subject=${subject}&body=${body}`);
    setEmailSent(true);
    setTimeout(() => setEmailSent(false), 3000);
  };

  const progress = (() => {
    const fields = [form.name, form.selfIntro, form.robotIntro, form.line1, form.line2, form.line3, form.line4, form.catchphrase];
    return Math.round((fields.filter(f => f.trim()).length / fields.length) * 100);
  })();

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0e1a",
      backgroundImage: `
        linear-gradient(rgba(0,200,255,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,200,255,0.03) 1px, transparent 1px)
      `,
      backgroundSize: "40px 40px",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      padding: "0 0 80px 0",
      color: "#e0eaff",
    }}>

      {/* HEADER */}
      <div style={{
        background: "linear-gradient(135deg, #0d1b3e 0%, #112244 50%, #0a1628 100%)",
        borderBottom: "2px solid #00c8ff33",
        padding: "36px 24px 28px",
        textAlign: "center",
        position: "sticky", top: 0, zIndex: 100,
        boxShadow: "0 4px 40px #00c8ff22",
      }}>
        <div style={{ fontSize: 13, letterSpacing: 4, color: "#00c8ff", textTransform: "uppercase", marginBottom: 6, fontWeight: 700 }}>
          SkillsUSA Robot Project
        </div>
        <div style={{ fontSize: 28, fontWeight: 900, color: "#ffffff", letterSpacing: -0.5, marginBottom: 4 }}>
          🤖 Robot Voice Worksheet
        </div>
        <div style={{ fontSize: 14, color: "#7090b0", marginBottom: 20 }}>
          Your words. Your voice. Your robot.
        </div>

        {/* Progress bar */}
        <div style={{ maxWidth: 400, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#5080a0", marginBottom: 6 }}>
            <span>Completion</span><span style={{ color: progress === 100 ? "#00ff88" : "#00c8ff" }}>{progress}%</span>
          </div>
          <div style={{ height: 6, background: "#ffffff10", borderRadius: 99, overflow: "hidden" }}>
            <div style={{
              height: "100%", borderRadius: 99, transition: "width 0.4s ease",
              background: progress === 100 ? "linear-gradient(90deg, #00ff88, #00c8ff)" : "linear-gradient(90deg, #0080ff, #00c8ff)",
              width: `${progress}%`,
              boxShadow: "0 0 12px #00c8ff88",
            }} />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "32px 20px 0" }}>

        {/* Intro */}
        <div style={{
          background: "#ffffff08",
          border: "1px solid #00c8ff22",
          borderRadius: 12,
          padding: "16px 20px",
          marginBottom: 32,
          fontSize: 14,
          color: "#8aabcc",
          lineHeight: 1.7,
        }}>
          <strong style={{ color: "#00c8ff" }}>Hey! 👋</strong> Fill this out and your robot will literally speak in your voice. Be real, be you — no wrong answers. When you're done, hit the <strong style={{ color: "#00ff88" }}>Email to Teacher</strong> button to submit it.
        </div>

        {/* SECTION 1 */}
        <Section icon="👤" label="Section 1" title="Who Are You?" color="#00c8ff">
          <Row>
            <Field label="Your Name *" value={form.name} onChange={v => set("name", v)} placeholder="First & Last" />
            <Field label="Nickname (if any)" value={form.nickname} onChange={v => set("nickname", v)} placeholder="What do friends call you?" />
          </Row>
          <Field label="Grade" value={form.grade} onChange={v => set("grade", v)} placeholder="9th, 10th, 11th, 12th..." small />
          <CheckGroup label="Your Role on This Project (check all that apply)" options={roles} selected={form.role} onToggle={v => toggleArr("role", v)} color="#00c8ff" />
        </Section>

        {/* SECTION 2 */}
        <Section icon="🎤" label="Section 2" title="Your Intro Lines" color="#a78bfa">
          <TextArea
            label="If you had 10 seconds to introduce yourself to the judges, what would you say?"
            hint={"Write it exactly how you'd actually say it — slang, filler words, all of it. Example: \"Hey, I'm Marcus, I handle all the wiring on this thing and honestly it was a nightmare but we made it work.\""}
            value={form.selfIntro} onChange={v => set("selfIntro", v)}
            rows={4} color="#a78bfa"
          />
          <TextArea
            label="How would you introduce YOUR robot to someone who's never seen it?"
            hint="Pretend you're hyping it up to a friend. What's the very first thing you'd say?"
            value={form.robotIntro} onChange={v => set("robotIntro", v)}
            rows={4} color="#a78bfa"
          />
        </Section>

        {/* SECTION 3 */}
        <Section icon="🔊" label="Section 3" title="The Robot's Script Lines" color="#fb923c" subtitle="These will be recorded as actual audio — write them in YOUR natural voice.">
          <TextArea label="Line 1 — The Robot's Self-Introduction"
            hint={'What does the robot say when it "wakes up" or greets the crowd? Write it FOR the robot, but in your style.'}
            value={form.line1} onChange={v => set("line1", v)} rows={3} color="#fb923c" />
          <TextArea label="Line 2 — Describing What the Robot Does"
            hint="Explain the main function. Conversational — how would you describe it to your little cousin?"
            value={form.line2} onChange={v => set("line2", v)} rows={3} color="#fb923c" />
          <TextArea label="Line 3 — Something Cool or Surprising About It"
            hint={'What makes people go "wait, really?!" Write it like the robot is low-key bragging.'}
            value={form.line3} onChange={v => set("line3", v)} rows={3} color="#fb923c" />
          <TextArea label="Line 4 — A Shoutout or Closing Line"
            hint="Team thanks, a hype line, a joke, a mic-drop moment — make it memorable."
            value={form.line4} onChange={v => set("line4", v)} rows={3} color="#fb923c" />
        </Section>

        {/* SECTION 4 */}
        <Section icon="✨" label="Section 4" title="Your Personality & Style" color="#34d399">
          <CheckGroup label="How would your friends describe the way you talk?" options={talkStyles} selected={form.talkStyle} onToggle={v => toggleArr("talkStyle", v)} color="#34d399" />
          <CheckGroup label="Your vibe when presenting:" options={vibes} selected={form.presentVibe} onToggle={v => toggleArr("presentVibe", v)} color="#34d399" />
          <div style={{ marginTop: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#34d399", marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}>
              Your 3 Go-To Expressions
            </div>
            <div style={{ fontSize: 12, color: "#5080a0", marginBottom: 12 }}>
              Words or phrases you say ALL the time. E.g. "no cap", "for real though", "honestly", "lowkey"
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {[["phrase1","Phrase 1..."],["phrase2","Phrase 2..."],["phrase3","Phrase 3..."]].map(([k, p]) => (
                <input key={k} value={form[k]} onChange={e => set(k, e.target.value)} placeholder={p}
                  style={{ flex: "1 1 160px", ...inputStyle("#34d399") }} />
              ))}
            </div>
          </div>
        </Section>

        {/* SECTION 5 */}
        <Section icon="🎉" label="Section 5" title="The Fun Stuff" color="#f472b6">
          <TextArea label="If your robot had a catchphrase, what would it be?"
            hint="Funny, dramatic, nerdy — whatever fits. Could even be a team motto!"
            value={form.catchphrase} onChange={v => set("catchphrase", v)} rows={2} color="#f472b6" />
          <TextArea label="Anything you DON'T want the robot to say?"
            hint="Inside jokes to avoid, anything embarrassing, topics to skip."
            value={form.avoid} onChange={v => set("avoid", v)} rows={2} color="#f472b6" />
          <TextArea label="Any last thoughts or requests?"
            hint="Anything else we should know before recording your audio?"
            value={form.lastThoughts} onChange={v => set("lastThoughts", v)} rows={2} color="#f472b6" />
        </Section>

        {/* SUBMIT BUTTONS */}
        <div style={{
          marginTop: 40,
          background: "linear-gradient(135deg, #0d1b3e, #112244)",
          border: "1px solid #00c8ff33",
          borderRadius: 16,
          padding: "28px 24px",
          textAlign: "center",
        }}>
          <div style={{ fontSize: 15, color: "#8aabcc", marginBottom: 6 }}>
            {progress < 100 ? `Almost there — ${100 - progress}% left to complete!` : "✅ Looking good! Ready to submit?"}
          </div>
          <div style={{ fontSize: 13, color: "#4a6080", marginBottom: 24 }}>
            Submitting to: <span style={{ color: "#00c8ff" }}>{TEACHER_EMAIL}</span>
          </div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={handleCopy} style={btnStyle(copied ? "#00ff88" : "#334466", copied ? "#001a0d" : "#e0eaff")}>
              {copied ? "✅ Copied!" : "📋 Copy to Clipboard"}
            </button>
            <button onClick={handleEmail} style={btnStyle("#00c8ff", "#001428")}>
              {emailSent ? "📨 Opening Email..." : "📧 Email to Teacher"}
            </button>
          </div>
          <div style={{ fontSize: 12, color: "#3a5060", marginTop: 16 }}>
            Email opens your mail app with everything filled in — just hit send!
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ icon, label, title, subtitle, color, children }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 12,
        marginBottom: 4,
      }}>
        <div style={{
          background: color + "22",
          border: `1px solid ${color}44`,
          borderRadius: 8,
          padding: "6px 12px",
          fontSize: 12,
          fontWeight: 800,
          color,
          letterSpacing: 2,
          textTransform: "uppercase",
        }}>{icon} {label}</div>
        <div style={{ flex: 1, height: 1, background: `${color}22` }} />
      </div>
      <div style={{ fontSize: 20, fontWeight: 800, color: "#ffffff", marginBottom: subtitle ? 4 : 20, letterSpacing: -0.3 }}>
        {title}
      </div>
      {subtitle && <div style={{ fontSize: 13, color: "#5080a0", marginBottom: 20 }}>{subtitle}</div>}
      <div style={{
        background: "#ffffff05",
        border: `1px solid ${color}22`,
        borderRadius: 12,
        padding: "20px 20px",
        display: "flex", flexDirection: "column", gap: 16,
      }}>
        {children}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, small }) {
  return (
    <div style={{ flex: small ? "0 0 auto" : 1 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#7090b0", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>{label}</label>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={{ width: "100%", boxSizing: "border-box", ...inputStyle("#00c8ff") }} />
    </div>
  );
}

function Row({ children }) {
  return <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>{children}</div>;
}

function TextArea({ label, hint, value, onChange, rows = 3, color }) {
  return (
    <div>
      <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#c0d0e8", marginBottom: 4 }}>{label}</label>
      {hint && <div style={{ fontSize: 12, color: "#4a6a80", marginBottom: 8, fontStyle: "italic", lineHeight: 1.5 }}>{hint}</div>}
      <textarea value={value} onChange={e => onChange(e.target.value)} rows={rows}
        style={{ width: "100%", boxSizing: "border-box", resize: "vertical", ...inputStyle(color) }} />
    </div>
  );
}

function CheckGroup({ label, options, selected, onToggle, color }) {
  return (
    <div>
      <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#c0d0e8", marginBottom: 10 }}>{label}</label>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {options.map(opt => {
          const on = selected.includes(opt);
          return (
            <button key={opt} onClick={() => onToggle(opt)} style={{
              padding: "7px 14px", borderRadius: 99, fontSize: 13, cursor: "pointer",
              border: `1.5px solid ${on ? color : "#ffffff18"}`,
              background: on ? color + "22" : "transparent",
              color: on ? color : "#607080",
              fontWeight: on ? 700 : 400,
              transition: "all 0.15s",
              boxShadow: on ? `0 0 10px ${color}44` : "none",
            }}>
              {on ? "✓ " : ""}{opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

const inputStyle = (color) => ({
  background: "#ffffff08",
  border: `1.5px solid #ffffff15`,
  borderRadius: 8,
  padding: "10px 14px",
  fontSize: 14,
  color: "#e0eaff",
  fontFamily: "inherit",
  outline: "none",
  transition: "border-color 0.2s",
  lineHeight: 1.6,
  display: "block",
});

const btnStyle = (bg, color) => ({
  padding: "13px 28px",
  borderRadius: 10,
  fontSize: 14,
  fontWeight: 700,
  cursor: "pointer",
  border: "none",
  background: bg,
  color,
  letterSpacing: 0.5,
  transition: "opacity 0.15s",
});
