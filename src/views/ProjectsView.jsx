import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects.js';
import { DISCS } from '../data/disciplines.js';

function slugify(muni) {
  return muni.toLowerCase().replace(/,\s*/g, '-').replace(/[^a-z0-9-]/g, '');
}

export function ProjectsView() {
  const { projects, actions } = useProjects();
  const navigate = useNavigate();
  const [newName, setNewName] = useState('');

  function openLookup(l) {
    navigate(`/${l.disc}/${slugify(l.muni)}/${l.subtype}`);
  }

  return (
    <div>
      <h2 className="text-[22px] font-semibold text-text mb-1.5 tracking-tight">Projects</h2>
      <p className="text-[13px] text-textSub leading-relaxed mb-6">
        Got a real project? Keep its lookups together here. Open a saved result later and pick up where you left off,
        with whatever calculations you ran still attached.
      </p>

      <div className="bg-amberDim border border-amber/30 rounded-lg px-4 py-3 text-xs text-amber leading-relaxed mb-6">
        <strong>Quick honesty:</strong> projects live in this browser tab right now. Close the tab, they're gone. Once
        the database is wired up they'll stick around across your devices.
      </div>

      <div className="flex gap-2 mb-7 flex-wrap">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="What's the project called?"
          className="flex-1 min-w-[200px] bg-surfaceHi text-text border border-border rounded-md px-3 py-2.5 text-[13px] font-sans outline-none min-h-[44px]"
        />
        <button
          disabled={!newName.trim()}
          onClick={() => {
            actions.createProject(newName.trim());
            setNewName('');
          }}
          className="px-5 py-2.5 rounded-lg text-[13px] font-medium font-sans min-h-[44px] border-none"
          style={{
            background: newName.trim() ? '#5aa0e8' : '#162032',
            color: newName.trim() ? '#fff' : '#6a83a8',
            cursor: newName.trim() ? 'pointer' : 'not-allowed',
          }}
        >
          Start it up
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12 text-textMuted text-[13px] bg-surface border border-dashed border-border rounded-xl">
          Nothing here yet. Spin one up above, or hit "Save for later" on any result page.
        </div>
      ) : (
        projects.map((p) => (
          <div key={p.id} className="bg-surface border border-border rounded-xl mb-3.5 overflow-hidden">
            <div className="flex justify-between items-center px-4 py-3.5 flex-wrap gap-2"
              style={{ borderBottom: p.lookups.length ? '1px solid #1e3050' : 'none' }}>
              <div>
                <div className="text-[15px] font-semibold text-text">{p.name}</div>
                <div className="text-[11px] text-textMuted mt-0.5">
                  Created {new Date(p.created).toLocaleDateString('en-CA')} · {p.lookups.length} item
                  {p.lookups.length !== 1 ? 's' : ''}
                </div>
              </div>
              <button
                onClick={() => {
                  if (confirm(`Delete project "${p.name}"?`)) actions.deleteProject(p.id);
                }}
                className="text-xs bg-transparent border border-border text-textMuted px-3 py-1.5 rounded-md cursor-pointer font-sans"
              >
                Delete
              </button>
            </div>
            {p.lookups.map((l) => (
              <div
                key={l.id}
                className="flex justify-between items-center px-4 py-2.5 border-b border-border gap-2.5 flex-wrap"
              >
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] text-text">{l.topicTitle}</div>
                  <div className="text-[11px] text-textMuted mt-0.5">
                    {DISCS[l.disc]?.label} · {l.muni}
                    {l.calcResult ? ' · calculation saved' : ''}
                  </div>
                </div>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => openLookup(l)}
                    className="text-xs bg-blueDim border border-blue/30 text-blue px-3 py-1.5 rounded-md cursor-pointer font-sans"
                  >
                    Open
                  </button>
                  <button
                    onClick={() => actions.removeLookup(p.id, l.id)}
                    className="text-xs bg-transparent border border-border text-textMuted px-2.5 py-1.5 rounded-md cursor-pointer font-sans"
                    aria-label="Remove"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}
