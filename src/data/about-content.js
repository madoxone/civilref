// Editable About-page templates for each discipline.
// Sections containing only placeholder text (in [brackets]) render with a
// "not yet written" notice instead of as published content.

export const ABOUT_CONTENT = {
  utilities: {
    headline: "[One sentence. What is utilities engineering, in the way you'd explain it to your cousin at Thanksgiving.]",
    sections: [
      { h:"Overview", b:"[Two or three paragraphs. What this discipline actually is, why it matters, what a junior person stepping into it would need to know. Skip the textbook tone, write like you're talking to someone over coffee.]" },
      { h:"Scope of work", b:"[What does a utilities project actually look like, start to finish? Who designs it, who reviews it, how long does it take? Walk through the stages you'd actually live through on a real job.]" },
      { h:"Common project types", b:"[The five or six jobs you've actually worked on or watched. New subdivision servicing, watermain replacement, sanitary capacity, force main extensions, storm retrofits, whatever you've seen. A sentence each on what makes it distinct.]" },
      { h:"Key standards bodies", b:"[CSA, MECP or Alberta EPA or BC ENV, the city itself, one-call services. Who writes the rules, who enforces them, who you actually call when you need an answer.]" },
      { h:"Career paths", b:"[What does a career in this look like? Junior to senior, the P.Eng. licensing journey, where people work (consultants, municipalities, EPCOR), and if you're comfortable, what the pay actually looks like.]" },
      { h:"Further reading", b:"[Three to five things worth reading. Textbooks, design manuals, courses, professional associations. One line each on why it's useful, not just that it exists.]" },
    ],
  },
  traffic: {
    headline: "[One sentence. What is traffic and transportation engineering, in the way you'd explain it to someone who thinks you're a city planner.]",
    sections: [
      { h:"Overview", b:"[Two or three paragraphs about what transportation engineering actually is. Not just roads. Signals, pavement, the analytical work behind traffic studies, the difference between planning and engineering. Write the way you'd want a first-year to read it.]" },
      { h:"Scope of work", b:"[What's the actual scope of a typical traffic job? Geometric design, signal design, transportation impact studies, pavement, signage, complete streets. How the pieces fit together.]" },
      { h:"Common project types", b:"[Arterial widening, new signal installations, TIS reports, safety audits, pavement rehab. Pick the ones you've actually seen and tell us a sentence about each.]" },
      { h:"Key standards bodies", b:"[TAC and what it actually is. The provincial MTOs. The municipalities. The Highway Traffic Act and how it cuts across all of them.]" },
      { h:"Career paths", b:"[Where do transportation engineers work? Consultants, MTO, cities, private operators. What the path from junior to senior looks like.]" },
      { h:"Further reading", b:"[Three to five resources worth a working engineer's time.]" },
    ],
  },
  structural: {
    headline: "[One sentence. What is structural engineering, in the way you'd explain it to someone who's only ever heard 'civil'.]",
    sections: [
      { h:"Overview", b:"[Two or three paragraphs. What structural is, how it differs from the rest of civil, what kind of person ends up in it. The first-principles version of the field.]" },
      { h:"Scope of work", b:"[Buildings, bridges, retaining walls, industrial. The role of the structural engineer of record. The hand-off with architecture. The hand-off with the contractor.]" },
      { h:"Common project types", b:"[Residential additions through high-rise concrete and mass timber. Pick the ones you've worked on and say what makes each distinctive.]" },
      { h:"Key standards bodies", b:"[CSA A23.3, S16, O86, S6. The National Building Code and how provinces adopt it. The NRC. Who actually writes the words and who enforces them.]" },
      { h:"Career paths", b:"[Junior through senior. Consultant versus contractor versus owner. The licensing path.]" },
      { h:"Further reading", b:"[Three to five things that actually helped you become a better structural engineer.]" },
    ],
  },
  civil: {
    headline: "[One sentence. What civil/site engineering covers, written so a first-year actually understands what they'd be doing.]",
    sections: [
      { h:"Overview", b:"[Two or three paragraphs. Grading, geotech, environmental, surveying. The integrative role of the civil engineer on a project, the one who has to keep all the pieces talking.]" },
      { h:"Scope of work", b:"[Site grading and drainage, geotech investigations, Phase I and II environmentals, erosion and sediment control. The day-to-day reality of the work.]" },
      { h:"Common project types", b:"[Greenfield grading, brownfield remediation, foundation support, ESA for property transactions. What you'd actually be billing time to in a typical month.]" },
      { h:"Key standards bodies", b:"[CFEM and what it actually contains. Provincial environment ministries. The Ontario Excess Soil regulation. The qualified persons framework under provincial environmental law.]" },
      { h:"Career paths", b:"[Consulting, contractor, environmental specialist, geotech specialist. How people end up in each.]" },
      { h:"Further reading", b:"[Three to five resources worth the time.]" },
    ],
  },
  construction: {
    headline: "[One sentence. What construction engineering is, in the way you'd explain it to someone who thinks engineers stop working once the drawings are done.]",
    sections: [
      { h:"Overview", b:"[Two or three paragraphs. What happens once the drawings hit the field. Specs, contracts, CA, change management, claims, QC. The engineering side of construction.]" },
      { h:"Scope of work", b:"[Writing specs, administering CCDC contracts, materials testing programs, dispute support. The actual deliverables and the actual hours.]" },
      { h:"Common project types", b:"[The jobs you've actually been on. Spec writing, contract administration on a CCDC 2, materials testing, claims support. A sentence each.]" },
      { h:"Key standards bodies", b:"[CCDC and how the forms differ. OPSS in Ontario, provincial equivalents elsewhere. ISO 9001 if it's relevant. The provincial OHS regulators.]" },
      { h:"Career paths", b:"[Site engineer, contract administrator, claims specialist. Owner side versus consultant side versus contractor side.]" },
      { h:"Further reading", b:"[Three to five things that actually helped.]" },
    ],
  },
};
