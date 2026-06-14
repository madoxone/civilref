import { createContext, useContext, useState } from 'react';

const ProjectContext = createContext({ projects: [], current: null, actions: {} });

/**
 * Hook consumers use to read and mutate projects.
 * Wrap your tree in <ProjectProvider> for this to work.
 */
export function useProjects() {
  return useContext(ProjectContext);
}

/**
 * Holds the list of user-saved projects in memory.
 * When Supabase is wired in, swap these handlers for fetch calls;
 * the public API (projects, current, actions) stays the same.
 */
export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [currentId, setCurrentId] = useState(null);

  function createProject(name) {
    const id = `p_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    const proj = { id, name, created: Date.now(), lookups: [] };
    setProjects((p) => [...p, proj]);
    setCurrentId(id);
    return id;
  }

  function deleteProject(id) {
    setProjects((p) => p.filter((x) => x.id !== id));
    if (currentId === id) setCurrentId(null);
  }

  function renameProject(id, name) {
    setProjects((p) => p.map((x) => (x.id === id ? { ...x, name } : x)));
  }

  function selectProject(id) {
    setCurrentId(id);
  }

  function addLookup(projectId, lookup) {
    setProjects((p) =>
      p.map((x) =>
        x.id === projectId
          ? { ...x, lookups: [...x.lookups, { id: `l_${Date.now()}`, ts: Date.now(), ...lookup }] }
          : x,
      ),
    );
  }

  function removeLookup(projectId, lookupId) {
    setProjects((p) =>
      p.map((x) => (x.id === projectId ? { ...x, lookups: x.lookups.filter((l) => l.id !== lookupId) } : x)),
    );
  }

  const current = projects.find((p) => p.id === currentId) || null;
  const actions = { createProject, deleteProject, renameProject, selectProject, addLookup, removeLookup };

  return <ProjectContext.Provider value={{ projects, current, actions }}>{children}</ProjectContext.Provider>;
}
