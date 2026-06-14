import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// ════════════════════════════════════════════════════════════════════════════
//  CivilRef.ca — Admin & Contributor Dashboard
//
//  This is the back-office tool. Engineers use it to SUBMIT data; verifiers and
//  admins use it to REVIEW and APPROVE. It talks to the Supabase database you
//  set up with the SQL files.
//
//  ⚙️  SETUP (only thing you must edit): paste your two Supabase values below.
//      Find them in Supabase → Project Settings → API.
// ════════════════════════════════════════════════════════════════════════════
const SUPABASE_URL = "PASTE_YOUR_PROJECT_URL_HERE";       // e.g. https://abcd1234.supabase.co
const SUPABASE_ANON_KEY = "PASTE_YOUR_ANON_PUBLIC_KEY_HERE";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ─── DESIGN TOKENS (matches the main app) ─────────────────────────────────────
const T = {
  bg:"#09101e", surface:"#101828", surfaceHi:"#162032", border:"#1e3050", borderHi:"#2a4570",
  text:"#e8f0fe", textSub:"#7a95bc", textMuted:"#3d5070",
  blue:"#4a90d9", blueDim:"#1a3a6a", green:"#3dbe8a", greenDim:"#0d3525",
  amber:"#c9983a", amberDim:"#3a2810", red:"#e05a5a", redDim:"#3a1010",
  mono:"'IBM Plex Mono',monospace", sans:"'Inter',system-ui,sans-serif",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;600&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  body{background:${T.bg};color:${T.text};font-family:${T.sans};}
  input,select,textarea,button{font-family:${T.sans};}
  ::-webkit-scrollbar{width:5px;}::-webkit-scrollbar-thumb{background:${T.border};border-radius:3px;}
`;

const input = {width:"100%",background:T.surfaceHi,color:T.text,border:`1px solid ${T.border}`,borderRadius:7,padding:"9px 12px",fontSize:13,outline:"none",marginBottom:10};
const btn = (c=T.blue)=>({background:c,border:"none",color:"#fff",padding:"9px 18px",borderRadius:7,fontSize:13,fontWeight:500,cursor:"pointer"});
const btnGhost = {background:"none",border:`1px solid ${T.border}`,color:T.textSub,padding:"8px 14px",borderRadius:7,fontSize:13,cursor:"pointer"};

const NOT_CONFIGURED = SUPABASE_URL.includes("PASTE_YOUR");

// ════════════════════════════════════════════════════════════════════════════
//  AUTH
// ════════════════════════════════════════════════════════════════════════════
function Auth({ onSignedIn }) {
  const [mode,setMode] = useState("signin");
  const [email,setEmail] = useState("");
  const [pw,setPw] = useState("");
  const [name,setName] = useState("");
  const [msg,setMsg] = useState("");
  const [busy,setBusy] = useState(false);

  async function submit() {
    setBusy(true); setMsg("");
    try {
      if (mode==="signup") {
        const { error } = await supabase.auth.signUp({ email, password:pw, options:{ data:{ full_name:name } } });
        if (error) throw error;
        setMsg("Account created. You can sign in now.");
        setMode("signin");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password:pw });
        if (error) throw error;
        onSignedIn();
      }
    } catch(e){ setMsg(e.message); }
    setBusy(false);
  }

  return (
    <div style={{maxWidth:380,margin:"80px auto",padding:"0 20px"}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:24,justifyContent:"center"}}>
        <div style={{width:28,height:28,borderRadius:6,background:T.blueDim,border:`1px solid ${T.blue}50`,display:"flex",alignItems:"center",justifyContent:"center",color:T.blue}}>◈</div>
        <span style={{fontWeight:600,fontSize:16}}>CivilRef<span style={{color:T.blue}}>.ca</span> · Admin</span>
      </div>
      <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:12,padding:"24px"}}>
        <div style={{fontSize:15,fontWeight:600,marginBottom:4}}>{mode==="signin"?"Sign in":"Create contributor account"}</div>
        <div style={{fontSize:12,color:T.textMuted,marginBottom:18}}>{mode==="signin"?"Contributors and admins sign in here.":"New engineers register, then an admin verifies your credential."}</div>
        {mode==="signup" && <input style={input} placeholder="Full name (e.g. Jane Doe, P.Eng.)" value={name} onChange={e=>setName(e.target.value)}/>}
        <input style={input} placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
        <input style={input} type="password" placeholder="Password" value={pw} onChange={e=>setPw(e.target.value)}/>
        <button style={{...btn(),width:"100%",marginTop:4}} onClick={submit} disabled={busy}>{busy?"…":mode==="signin"?"Sign in":"Create account"}</button>
        {msg && <div style={{fontSize:12,color:msg.includes("created")?T.green:T.amber,marginTop:12}}>{msg}</div>}
        <div style={{fontSize:12,color:T.textMuted,marginTop:16,textAlign:"center",cursor:"pointer"}} onClick={()=>{setMode(mode==="signin"?"signup":"signin");setMsg("");}}>
          {mode==="signin"?"Need an account? Register →":"← Back to sign in"}
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  SUBMIT NEW DATA (engineers)
// ════════════════════════════════════════════════════════════════════════════
function SubmitPanel({ profile }) {
  const [kind,setKind] = useState("requirement");
  const [topics,setTopics] = useState([]);
  const [munis,setMunis] = useState([]);
  const [form,setForm] = useState({});
  const [msg,setMsg] = useState("");
  const [busy,setBusy] = useState(false);

  useEffect(()=>{
    supabase.from("topics").select("id,title,discipline_id").order("sort_order").then(({data})=>setTopics(data||[]));
    supabase.from("municipalities").select("id,name").order("name").then(({data})=>setMunis(data||[]));
  },[]);

  function set(k,v){ setForm(f=>({...f,[k]:v})); }

  async function submit() {
    setBusy(true); setMsg("");
    try {
      let row, table;
      if (kind==="requirement") {
        table="requirements";
        row={ topic_id:form.topic_id, label:form.label, value:form.value, note:form.note||null,
              confidence:"unverified", status:"pending", submitted_by:profile.id };
      } else if (kind==="code") {
        table="codes";
        row={ topic_id:form.topic_id, code:form.code, full_name:form.full_name, issuing_body:form.issuing_body,
              scope:form.scope||null, edition:form.edition||null, source_url:form.source_url||null,
              source_label:form.source_label||null, is_canadian:form.is_canadian!=="no",
              confidence:"unverified", status:"pending", submitted_by:profile.id };
      } else {
        table="municipal_overrides";
        row={ municipality_id:form.municipality_id, topic_id:form.topic_id||null, field_key:form.field_key,
              field_label:form.field_label, field_value:form.field_value, source_url:form.source_url||null,
              confidence:"unverified", status:"pending", submitted_by:profile.id };
      }
      const { error } = await supabase.from(table).insert(row);
      if (error) throw error;
      await supabase.from("audit_log").insert({ actor_id:profile.id, action:"submit", target_type:kind, detail:row });
      setMsg("Submitted for review. A verifier will approve it before it goes live.");
      setForm({});
    } catch(e){ setMsg("Error: "+e.message); }
    setBusy(false);
  }

  const Field = ({k,ph,area}) => area
    ? <textarea style={{...input,minHeight:64,resize:"vertical"}} placeholder={ph} value={form[k]||""} onChange={e=>set(k,e.target.value)}/>
    : <input style={input} placeholder={ph} value={form[k]||""} onChange={e=>set(k,e.target.value)}/>;

  const TopicSelect = () => (
    <select style={input} value={form.topic_id||""} onChange={e=>set("topic_id",e.target.value)}>
      <option value="">Select topic…</option>
      {topics.map(t=><option key={t.id} value={t.id}>{t.discipline_id} → {t.title}</option>)}
    </select>
  );

  return (
    <div style={{maxWidth:560}}>
      <div style={{fontSize:16,fontWeight:600,marginBottom:4}}>Submit data</div>
      <div style={{fontSize:13,color:T.textMuted,marginBottom:18}}>Everything you submit starts as <b style={{color:T.amber}}>pending</b> and is reviewed by a verifier before going live. Always include a source.</div>

      <div style={{display:"flex",gap:8,marginBottom:18}}>
        {[["requirement","Design value"],["code","Code / standard"],["override","City-specific value"]].map(([k,l])=>(
          <button key={k} onClick={()=>{setKind(k);setForm({});}} style={{flex:1,padding:"10px",borderRadius:8,border:`1px solid ${kind===k?T.blue:T.border}`,background:kind===k?`${T.blue}18`:T.surface,color:kind===k?T.blue:T.textSub,fontSize:12,fontWeight:500,cursor:"pointer"}}>{l}</button>
        ))}
      </div>

      <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:10,padding:"18px"}}>
        {kind==="requirement" && <>
          <TopicSelect/>
          <Field k="label" ph="Label (e.g. Minimum diameter — municipal main)"/>
          <Field k="value" ph="Value (e.g. 250 mm)"/>
          <Field k="note" ph="Note / explanation (optional)" area/>
        </>}
        {kind==="code" && <>
          <TopicSelect/>
          <Field k="code" ph="Code (e.g. CSA B182.2)"/>
          <Field k="full_name" ph="Full name (e.g. PVC Sewer Pipe and Fittings)"/>
          <Field k="issuing_body" ph="Issuing body (e.g. Canadian Standards Association)"/>
          <Field k="scope" ph="Scope / what it governs" area/>
          <Field k="edition" ph="Edition (e.g. CSA B182.2-19)"/>
          <Field k="source_url" ph="Source URL"/>
          <Field k="source_label" ph="Source label (e.g. CSA Group — B182.2)"/>
          <select style={input} value={form.is_canadian||"yes"} onChange={e=>set("is_canadian",e.target.value)}>
            <option value="yes">Canadian standard</option>
            <option value="no">International (adopted by reference)</option>
          </select>
        </>}
        {kind==="override" && <>
          <select style={input} value={form.municipality_id||""} onChange={e=>set("municipality_id",e.target.value)}>
            <option value="">Select municipality…</option>
            {munis.map(m=><option key={m.id} value={m.id}>{m.name}</option>)}
          </select>
          <TopicSelect/>
          <Field k="field_key" ph="Field key (e.g. authority, cover, idf_source)"/>
          <Field k="field_label" ph="Field label (e.g. Reviewing authority)"/>
          <Field k="field_value" ph="Value (e.g. Toronto Water — Engineering Services)" area/>
          <Field k="source_url" ph="Source URL"/>
        </>}
        <button style={{...btn(),width:"100%",marginTop:6}} onClick={submit} disabled={busy}>{busy?"Submitting…":"Submit for review"}</button>
        {msg && <div style={{fontSize:12,color:msg.startsWith("Error")?T.red:T.green,marginTop:12,lineHeight:1.5}}>{msg}</div>}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  REVIEW QUEUE (verifiers / admins)
// ════════════════════════════════════════════════════════════════════════════
function ReviewQueue({ profile }) {
  const [items,setItems] = useState([]);
  const [loading,setLoading] = useState(true);
  const [tab,setTab] = useState("requirements");

  async function load() {
    setLoading(true);
    const { data } = await supabase.from(tab).select("*").eq("status","pending").order("created_at");
    setItems(data||[]);
    setLoading(false);
  }
  useEffect(()=>{ load(); },[tab]);

  async function decide(row, decision) {
    const patch = decision==="approve"
      ? { status:"published", confidence:"high", verified_by:profile.id, verified_at:new Date().toISOString() }
      : { status:"rejected", verified_by:profile.id, verified_at:new Date().toISOString() };
    await supabase.from(tab).update(patch).eq("id",row.id);
    await supabase.from("audit_log").insert({ actor_id:profile.id, action:decision, target_type:tab, target_id:row.id, detail:patch });
    load();
  }

  return (
    <div style={{maxWidth:680}}>
      <div style={{fontSize:16,fontWeight:600,marginBottom:4}}>Review queue</div>
      <div style={{fontSize:13,color:T.textMuted,marginBottom:18}}>Pending submissions. Approving stamps the item with your name and credential and publishes it live.</div>
      <div style={{display:"flex",gap:8,marginBottom:18}}>
        {[["requirements","Design values"],["codes","Codes"],["municipal_overrides","City data"]].map(([k,l])=>(
          <button key={k} onClick={()=>setTab(k)} style={{padding:"8px 14px",borderRadius:7,border:`1px solid ${tab===k?T.blue:T.border}`,background:tab===k?`${T.blue}18`:T.surface,color:tab===k?T.blue:T.textSub,fontSize:12,fontWeight:500,cursor:"pointer"}}>{l}</button>
        ))}
      </div>
      {loading ? <div style={{color:T.textMuted,fontSize:13}}>Loading…</div>
        : items.length===0 ? <div style={{color:T.textMuted,fontSize:13,padding:"30px 0",textAlign:"center"}}>Nothing pending. Queue is clear. ✓</div>
        : items.map(row=>(
          <div key={row.id} style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:10,padding:"16px 18px",marginBottom:10}}>
            <pre style={{fontFamily:T.mono,fontSize:12,color:T.textSub,whiteSpace:"pre-wrap",lineHeight:1.6,marginBottom:12}}>
              {Object.entries(row).filter(([k])=>!["id","created_at","updated_at","submitted_by","verified_by","verified_at","sort_order","status"].includes(k) && row[k]!=null).map(([k,v])=>`${k}: ${v}`).join("\n")}
            </pre>
            <div style={{display:"flex",gap:8}}>
              <button style={btn(T.green)} onClick={()=>decide(row,"approve")}>✓ Approve & publish</button>
              <button style={btn(T.red)} onClick={()=>decide(row,"reject")}>✗ Reject</button>
            </div>
          </div>
        ))}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  FLAG QUEUE (verifiers / admins)
// ════════════════════════════════════════════════════════════════════════════
function FlagQueue({ profile }) {
  const [flags,setFlags] = useState([]);
  useEffect(()=>{ supabase.from("flags").select("*").eq("status","open").order("created_at").then(({data})=>setFlags(data||[])); },[]);
  async function resolve(f, status){
    await supabase.from("flags").update({status,resolved_by:profile.id}).eq("id",f.id);
    setFlags(flags.filter(x=>x.id!==f.id));
  }
  return (
    <div style={{maxWidth:680}}>
      <div style={{fontSize:16,fontWeight:600,marginBottom:4}}>Flagged issues</div>
      <div style={{fontSize:13,color:T.textMuted,marginBottom:18}}>Reports from users that something is incorrect or outdated.</div>
      {flags.length===0 ? <div style={{color:T.textMuted,fontSize:13,padding:"30px 0",textAlign:"center"}}>No open flags. ✓</div>
        : flags.map(f=>(
          <div key={f.id} style={{background:T.surface,border:`1px solid ${T.amber}40`,borderRadius:10,padding:"16px 18px",marginBottom:10}}>
            <div style={{fontSize:12,color:T.amber,marginBottom:4}}>{f.target_type} · {f.reason}</div>
            <div style={{fontSize:13,color:T.text,marginBottom:12,lineHeight:1.5}}>{f.detail||"(no detail provided)"}</div>
            <div style={{display:"flex",gap:8}}>
              <button style={btn(T.green)} onClick={()=>resolve(f,"resolved")}>Mark resolved</button>
              <button style={btnGhost} onClick={()=>resolve(f,"dismissed")}>Dismiss</button>
            </div>
          </div>
        ))}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  PEOPLE (admins) — verify credentials, set roles
// ════════════════════════════════════════════════════════════════════════════
function People({ profile }) {
  const [people,setPeople] = useState([]);
  async function load(){ const {data}=await supabase.from("profiles").select("*").order("created_at"); setPeople(data||[]); }
  useEffect(()=>{ load(); },[]);
  async function update(p, patch){
    await supabase.from("profiles").update(patch).eq("id",p.id);
    await supabase.from("audit_log").insert({ actor_id:profile.id, action:"edit", target_type:"profile", target_id:p.id, detail:patch });
    load();
  }
  return (
    <div style={{maxWidth:760}}>
      <div style={{fontSize:16,fontWeight:600,marginBottom:4}}>People</div>
      <div style={{fontSize:13,color:T.textMuted,marginBottom:18}}>Confirm credentials and assign roles. Only verified P.Engs should be made verifiers.</div>
      {people.map(p=>(
        <div key={p.id} style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:10,padding:"14px 16px",marginBottom:8,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
          <div>
            <div style={{fontSize:13,fontWeight:500}}>{p.full_name||"(no name)"} {p.credential_verified && <span style={{color:T.green,fontSize:11}}>✓ credential verified</span>}</div>
            <div style={{fontSize:11,color:T.textMuted}}>{p.email} · {p.credential_body||"—"} {p.credential_no||""} · {p.province||""}</div>
          </div>
          <div style={{display:"flex",gap:6,alignItems:"center"}}>
            <select style={{...input,width:"auto",marginBottom:0,padding:"6px 10px"}} value={p.role} onChange={e=>update(p,{role:e.target.value})}>
              <option value="engineer">engineer</option>
              <option value="verifier">verifier</option>
              <option value="admin">admin</option>
            </select>
            {!p.credential_verified && <button style={btn(T.green)} onClick={()=>update(p,{credential_verified:true})}>Verify credential</button>}
          </div>
        </div>
      ))}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  CONTENT EDITOR (admins) — edit About pages and other editable platform content
//  Reads/writes the editable_content table. Every save is logged in audit_log.
//  Changes are immediate (no review queue) because admins are trusted by definition;
//  if you want a review step, change status to 'pending' below.
// ════════════════════════════════════════════════════════════════════════════
const ABOUT_DISCIPLINES = [
  { id:"utilities", label:"Utilities" },
  { id:"traffic", label:"Traffic" },
  { id:"structural", label:"Structural" },
  { id:"civil", label:"Civil" },
  { id:"construction", label:"Construction" },
];
const ABOUT_SECTION_KEYS = [
  { key:"headline", label:"Headline (one sentence)" },
  { key:"overview", label:"Overview" },
  { key:"scope", label:"Scope of work" },
  { key:"projects", label:"Common project types" },
  { key:"standards", label:"Key standards bodies" },
  { key:"careers", label:"Career paths" },
  { key:"further", label:"Further reading" },
];

function ContentEditor({ profile }) {
  const [disc, setDisc] = useState("utilities");
  const [values, setValues] = useState({});      // { sectionKey: text }
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  async function load() {
    setLoading(true);
    const { data } = await supabase
      .from("editable_content")
      .select("section_key, body")
      .eq("content_type", "about")
      .eq("discipline_id", disc)
      .eq("status", "published");
    const v = {};
    (data || []).forEach(r => { v[r.section_key] = r.body; });
    setValues(v);
    setLoading(false);
  }
  useEffect(() => { load(); }, [disc]);

  function set(k, v) { setValues(prev => ({ ...prev, [k]: v })); }

  async function save(sectionKey) {
    setSaving(true); setMsg("");
    try {
      const body = values[sectionKey] || "";
      const row = {
        content_type: "about",
        discipline_id: disc,
        section_key: sectionKey,
        body,
        status: "published",
        updated_by: profile.id,
      };
      // Upsert (insert or update on conflict). Composite key handles uniqueness.
      const { error } = await supabase
        .from("editable_content")
        .upsert(row, { onConflict: "content_type,discipline_id,section_key" });
      if (error) throw error;
      await supabase.from("audit_log").insert({
        actor_id: profile.id,
        action: "edit",
        target_type: "editable_content",
        detail: { content_type:"about", discipline_id:disc, section_key:sectionKey, length:body.length },
      });
      setMsg(`Saved: ${sectionKey}`);
      setTimeout(() => setMsg(""), 2500);
    } catch (e) {
      setMsg("Error: " + e.message);
    }
    setSaving(false);
  }

  return (
    <div style={{maxWidth:760}}>
      <div style={{fontSize:16,fontWeight:600,marginBottom:4}}>Edit content</div>
      <div style={{fontSize:13,color:T.textMuted,marginBottom:18}}>
        Edit the About pages users see in the main app. Changes are saved immediately and logged in the audit trail.
        Every save records who edited what and when.
      </div>

      <div style={{display:"flex",gap:6,marginBottom:18,flexWrap:"wrap"}}>
        {ABOUT_DISCIPLINES.map(d => (
          <button key={d.id} onClick={()=>setDisc(d.id)}
            style={{padding:"7px 14px",borderRadius:7,border:`1px solid ${disc===d.id?T.blue:T.border}`,
                    background:disc===d.id?`${T.blue}18`:T.surface,color:disc===d.id?T.blue:T.textSub,
                    fontSize:12,fontWeight:500,cursor:"pointer"}}>
            {d.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{color:T.textMuted,fontSize:13}}>Loading…</div>
      ) : (
        <>
          {ABOUT_SECTION_KEYS.map(({ key, label }) => {
            const v = values[key] || "";
            const empty = !v.trim();
            return (
              <div key={key} style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:10,padding:"16px 18px",marginBottom:12}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8,flexWrap:"wrap",gap:8}}>
                  <div style={{fontSize:13,fontWeight:600,color:T.text}}>{label}</div>
                  {empty && <span style={{fontSize:10,background:T.surfaceHi,color:T.textMuted,padding:"2px 8px",borderRadius:10}}>empty</span>}
                </div>
                <textarea
                  value={v}
                  onChange={e=>set(key, e.target.value)}
                  placeholder={`Write the ${label.toLowerCase()} for ${ABOUT_DISCIPLINES.find(d=>d.id===disc)?.label}…`}
                  style={{...input, minHeight: key==="headline" ? 50 : 110, resize:"vertical", marginBottom:8}}
                />
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:8}}>
                  <span style={{fontSize:11,color:T.textMuted}}>{v.length.toLocaleString()} chars</span>
                  <button onClick={()=>save(key)} disabled={saving}
                    style={{...btn(T.green), padding:"7px 16px", fontSize:12}}>
                    {saving ? "…" : "Save section"}
                  </button>
                </div>
              </div>
            );
          })}
          {msg && (
            <div style={{fontSize:13,color:msg.startsWith("Error")?T.red:T.green,marginTop:10}}>
              {msg}
            </div>
          )}
        </>
      )}
    </div>
  );
}


// ════════════════════════════════════════════════════════════════════════════
//  ROOT
// ════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [session,setSession] = useState(null);
  const [profile,setProfile] = useState(null);
  const [view,setView] = useState("submit");
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    if (NOT_CONFIGURED) { setLoading(false); return; }
    supabase.auth.getSession().then(({data})=>{ setSession(data.session); });
    const { data:sub } = supabase.auth.onAuthStateChange((_e,s)=>setSession(s));
    return ()=>sub.subscription.unsubscribe();
  },[]);

  useEffect(()=>{
    if (!session) { setProfile(null); setLoading(false); return; }
    supabase.from("profiles").select("*").eq("id",session.user.id).single().then(({data})=>{ setProfile(data); setLoading(false); });
  },[session]);

  if (NOT_CONFIGURED) return (
    <><style>{css}</style>
    <div style={{maxWidth:560,margin:"80px auto",padding:"0 20px"}}>
      <div style={{background:T.surface,border:`1px solid ${T.amber}50`,borderRadius:12,padding:"28px"}}>
        <div style={{fontSize:17,fontWeight:600,marginBottom:10,color:T.amber}}>⚙️ One step before this works</div>
        <div style={{fontSize:14,color:T.textSub,lineHeight:1.8}}>
          Open this file and paste your Supabase values at the top:<br/><br/>
          <code style={{background:T.bg,padding:"2px 6px",borderRadius:4,fontFamily:T.mono,fontSize:12}}>SUPABASE_URL</code> and <code style={{background:T.bg,padding:"2px 6px",borderRadius:4,fontFamily:T.mono,fontSize:12}}>SUPABASE_ANON_KEY</code><br/><br/>
          You'll find both in Supabase → <b>Project Settings → API</b>. The setup guide walks you through every step.
        </div>
      </div>
    </div></>
  );

  if (loading) return <><style>{css}</style><div style={{padding:40,color:T.textMuted}}>Loading…</div></>;
  if (!session || !profile) return <><style>{css}</style><Auth onSignedIn={()=>{}}/></>;

  const isReviewer = profile.role==="verifier" || profile.role==="admin";
  const isAdmin = profile.role==="admin";
  const nav = [
    {id:"submit",label:"Submit data",show:true},
    {id:"review",label:"Review queue",show:isReviewer},
    {id:"flags",label:"Flags",show:isReviewer},
    {id:"content",label:"Edit content",show:isAdmin},
    {id:"people",label:"People",show:isAdmin},
  ].filter(n=>n.show);

  return (
    <><style>{css}</style>
    <div style={{minHeight:"100vh",background:T.bg}}>
      <nav style={{borderBottom:`1px solid ${T.border}`,padding:"0 24px",height:54,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:26,height:26,borderRadius:6,background:T.blueDim,border:`1px solid ${T.blue}50`,display:"flex",alignItems:"center",justifyContent:"center",color:T.blue}}>◈</div>
          <span style={{fontWeight:600,fontSize:15}}>CivilRef<span style={{color:T.blue}}>.ca</span> · Admin</span>
        </div>
        <div style={{display:"flex",gap:4,alignItems:"center"}}>
          {nav.map(n=>(
            <button key={n.id} onClick={()=>setView(n.id)} style={{padding:"7px 14px",borderRadius:7,border:"none",background:view===n.id?`${T.blue}18`:"none",color:view===n.id?T.blue:T.textMuted,fontSize:13,fontWeight:view===n.id?600:400,cursor:"pointer"}}>{n.label}</button>
          ))}
          <span style={{fontSize:11,color:T.textMuted,marginLeft:10}}>{profile.full_name||profile.email} · <span style={{color:T.blue}}>{profile.role}</span></span>
          <button style={{...btnGhost,marginLeft:8,padding:"6px 12px"}} onClick={()=>supabase.auth.signOut()}>Sign out</button>
        </div>
      </nav>
      <div style={{padding:"32px 24px"}}>
        {view==="submit" && <SubmitPanel profile={profile}/>}
        {view==="review" && isReviewer && <ReviewQueue profile={profile}/>}
        {view==="flags" && isReviewer && <FlagQueue profile={profile}/>}
        {view==="content" && isAdmin && <ContentEditor profile={profile}/>}
        {view==="people" && isAdmin && <People profile={profile}/>}
      </div>
    </div></>
  );
}
