// Project-context specific content (e.g. relocation, new installation, rehabilitation).
// Adds a section to the result page when the user picked one of these in the guided flow.

export const CONTEXT_CONTENT = {
  relocation:{
    label:"Relocation",
    title:"Additional steps for a utility relocation",
    items:[
      {h:"Utility Relocation Package (URP)",b:"For transit corridor relocations (Metrolinx, TTC, TransLink, OC Transpo, Calgary Transit), prepare a formal URP including design drawings, specifications, cost estimate, and schedule. Submit to both the utility authority and the transit authority."},
      {h:"Cost responsibility agreement",b:"Establish who pays for the relocation before design. On transit projects, a utility relocation cost-sharing agreement is usually negotiated under the applicable transit legislation or a master agreement."},
      {h:"Existing utility verification",b:"Order a utility locate (Ontario One Call: 1-800-400-2255) and obtain as-built drawings. Field-verify the existing pipe's material, diameter, depth, and condition before designing the replacement alignment."},
      {h:"Review timeline",b:"Allow 6–12 weeks for authority review of a relocation package. Major transit corridor relocations can take longer. Build this into the project schedule early."},
    ],
  },
  new:{
    label:"New installation",
    title:"Additional steps for a new installation",
    items:[
      {h:"Servicing approval",b:"New municipal services typically require a Servicing Agreement or Development Agreement with the municipality, and engineering drawings approved before construction."},
      {h:"Capacity confirmation",b:"Confirm the receiving system (existing main, treatment plant, or outfall) has capacity for the new connection. The municipality may require a capacity analysis."},
      {h:"Easements",b:"If the new utility crosses private land, register the required easements before construction. This is a legal survey task — engage an Ontario Land Surveyor (or provincial equivalent)."},
      {h:"Security deposit",b:"Municipalities usually require a financial security (letter of credit) covering the cost of the works until assumption."},
    ],
  },
  rehab:{
    label:"Rehabilitation",
    title:"Additional steps for rehabilitation",
    items:[
      {h:"Condition assessment first",b:"A CCTV inspection (scored using NASSCO PACP) is required before rehabilitation design. The condition rating determines whether structural or non-structural lining is appropriate."},
      {h:"Method selection",b:"Cured-in-place pipe (CIPP), slip lining, or pipe bursting — the choice depends on the host pipe's remaining structural capacity, diameter change tolerance, and site access."},
      {h:"Flow management",b:"Plan for bypass pumping or temporary service during rehabilitation. For watermains, a temporary water supply and disinfection plan is required."},
      {h:"Reduced capacity check",b:"Lining reduces the internal diameter. Confirm the rehabilitated pipe still meets hydraulic capacity requirements for the design flow."},
    ],
  },
};
