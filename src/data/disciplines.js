// Disciplines, topics, codes, requirements, calculators, worked examples.
// This is the heart of the platform's content. ~1100 lines.
// When Supabase is wired in, this file's exports become async fetch functions
// with the same shape, and consumers don't change.

// Discipline colour mapping. These match the values in tailwind.config.js
// and src/index.css. Components use them to colour-code disciplines.
export const DISC_COLORS = {
  utilities:    '#5aa0e8', // blue
  traffic:      '#dba94d', // amber
  structural:   '#ad94f0', // purple
  civil:        '#52d09c', // green
  construction: '#45d0d0', // teal
};

export const DISCS = {
  utilities:{
    label:"Utilities", icon:"⬡", color:"#5aa0e8",
    desc:"The pipes under the road. Water, sanitary, storm, force mains.",
    questions:[
      { id:"util_type", title:"Which utility system are you working on?",
        why:{ h:"Why utility type governs everything", b:"Each utility is regulated by a different provincial act and reviewed by a different authority. Drinking water falls under health law — failure makes people sick. Sanitary falls under environmental law — failure means sewage in a watercourse. Storm sewer follows drainage engineering. Gas and electrical fall under safety authorities. The design codes, approval paths, and minimum requirements are completely separate for each type." },
        opts:[
          {id:"watermain",l:"Drinking water (Watermain)",d:"Carries treated potable water from the plant to homes and businesses",i:"ti-droplet"},
          {id:"sanitary",l:"Sanitary Sewer",d:"Carries wastewater from toilets and drains to the treatment plant",i:"ti-arrow-down-circle"},
          {id:"storm",l:"Storm Sewer",d:"Carries rainwater and snowmelt away from roads and properties",i:"ti-cloud-rain"},
          {id:"forcemain",l:"Force Main",d:"A pressurized sewer pipe connected to a pump station",i:"ti-engine"},
          {id:"idk",l:"I'm not sure which type",d:"Help me identify which system this pipe belongs to",i:"ti-help-circle",isIDK:true},
        ],
      },
      { id:"util_context", title:"What is happening to this pipe?",
        why:{ h:"Why context changes the approval process", b:"A pipe being moved for a transit project requires a Utility Relocation Package (URP) submitted to the transit authority on top of normal municipal approval — and typically 6–12 weeks of review time before construction. A new pipe for development follows the site plan approval process. Rehabilitation stays within a different approval path. Starting with the wrong process wastes months on large infrastructure projects." },
        opts:[
          {id:"relocation",l:"Relocating — the pipe must move",d:"It conflicts with a transit line, road widening, or other infrastructure",i:"ti-arrows-move"},
          {id:"new",l:"New installation",d:"New pipe for a development, network extension, or infill",i:"ti-plus"},
          {id:"rehab",l:"Rehabilitation",d:"Pipe stays in place — lining, point repair, or pipe bursting",i:"ti-tool"},
          {id:"idk",l:"I'm not sure",d:"Help me figure out which category applies",i:"ti-help-circle",isIDK:true},
        ],
      },
    ],
    results:{
      watermain:{
        title:"Watermain — Potable Water Design",
        confidence:"high", verified_by:"pe_001", last_verified:"2025-03-14",
        codes:[
          {code:"CSA B64 Series",full:"Backflow Prevention Devices",body:"Canadian Standards Association (CSA)",scope:"Required at every service connection in Canada. Device type depends on hazard classification of the connection.",conf:"high",ver:"pe_001",date:"2025-03-14",url:"https://www.csagroup.org/store/product/CSA-B64-Series/",label:"CSA Group — B64 Series",cdn:true,flags:[]},
          {code:"Ontario Reg. 170/03",full:"Drinking Water Systems Regulation",body:"MECP Ontario",scope:"Mandatory for any drinking water system serving more than 5 service connections. Covers design, operation, monitoring, and bacteriological testing requirements.",conf:"high",ver:"pe_001",date:"2025-03-14",url:"https://www.ontario.ca/laws/regulation/030170",label:"Ontario e-Laws — O.Reg 170/03",cdn:true,flags:[]},
          {code:"Health Canada GCDWQ",full:"Guidelines for Canadian Drinking Water Quality",body:"Health Canada (Federal)",scope:"Sets maximum contaminant concentrations for all Canadian drinking water. Provinces adopt these into law — they are the scientific foundation for all provincial drinking water regulation.",conf:"high",ver:"pe_001",date:"2025-03-14",url:"https://www.canada.ca/en/health-canada/services/environmental-workplace-health/reports-publications/water-quality/guidelines-canadian-drinking-water-quality-summary-table.html",label:"Health Canada — GCDWQ",cdn:true,flags:[]},
          {code:"CAN/CSA-B137.3",full:"Rigid PVC Pipe for Pressure Applications",body:"Canadian Standards Association (CSA)",scope:"Canadian specification for PVC watermain pipe. This is the correct Canadian standard. Do not specify the American ASTM D2241 on Canadian projects.",conf:"high",ver:"pe_003",date:"2024-11-05",url:"https://www.csagroup.org/store/product/CAN-CSA-B137.3-18/",label:"CSA Group — B137.3",cdn:true,flags:[]},
          {code:"OPSS 441",full:"Construction Specification for Watermains",body:"MTO Ontario",scope:"Ontario construction specification for watermain installation, pressure testing, and disinfection. Referenced by most Ontario municipalities in their contract documents.",conf:"high",ver:"pe_001",date:"2025-03-14",url:"https://www.ontario.ca/page/ontario-provincial-standard-specifications",label:"MTO — Ontario Provincial Standard Specifications",cdn:true,flags:[]},
          {code:"AWWA C600",full:"Installation of Ductile-Iron Water Mains",body:"American Water Works Association (AWWA) — adopted by reference in Canada",scope:"Installation procedures for ductile iron watermain. This is an American standard adopted by reference in most Canadian municipal design criteria. Confirm your municipality references this edition.",conf:"medium",ver:null,date:null,url:"https://www.awwa.org/Store/Product-Details/productId/36507",label:"AWWA — C600",cdn:false,flags:["American origin — confirm your municipality formally adopts this edition"]},
        ],
        reqs:[
          {l:"Min. cover — Ontario / Prairies",v:"1.8 m to crown of pipe",n:"Increases to 2.1 m under arterial roads. Frost penetrates deeper under roads than grass — pipe must stay below frost line."},
          {l:"Min. cover — Coastal BC",v:"1.2 m to crown",n:"Mild climate, ground rarely freezes deeply. Under roads: 1.5 m minimum."},
          {l:"Min. cover — Edmonton, AB",v:"2.4 m to crown",n:"Edmonton has one of the deepest frost depths among major Canadian cities."},
          {l:"Sewer separation (horizontal)",v:"3.0 m minimum",n:"Standard across Canada. Contamination protection requirement — not a guideline."},
          {l:"Watermain above sewer at crossings",v:"300 mm minimum clearance",n:"Watermain must be higher at every crossing. If unavoidable otherwise, full-length pipe encasement is required."},
          {l:"Minimum pipe diameter",v:"150 mm (residential dead-end only)",n:"200 mm minimum for all looped systems. Use 150 mm only with a fire flow analysis confirming adequacy."},
          {l:"Preferred pipe material",v:"DI Class 52 or PVC CAN/CSA-B137.3",n:"Confirm material preference with the specific municipality before finalizing design."},
          {l:"Pressure class",v:"350 kPa min. working pressure",n:"Transmission mains: 690 kPa. Verify system pressure zone before selecting."},
          {l:"Disinfection",v:"Chlorination (AWWA C651) + bacteriological clearance",n:"Two consecutive passing samples required before the main can be put into service."},
          {l:"Fire hydrant spacing — residential",v:"≤ 150 m",n:""},
          {l:"Fire hydrant spacing — commercial",v:"≤ 90 m",n:""},
          {l:"Thrust restraint",v:"Mechanical restraint (Megalug) at all fittings",n:"Concrete thrust blocks only with a separate P.Eng. design. Required at all bends, tees, reducers, and dead ends."},
        ],
        calculator:{
          id:"water_cover",
          title:"Cover Depth Checker — Crown Elevation",
          desc:"Calculate the maximum allowable crown elevation (top of pipe) given the road surface elevation and minimum cover requirement.",
          worked_example:{
            source:"City of Toronto Design Criteria for Sewers and Watermains, 2023 Edition — Section 4.3: Cover Requirements",
            problem:"A 200 mm watermain is being relocated along King Street West in Toronto (arterial road). The finished road surface is at elevation 85.300 m. What is the maximum allowable crown elevation of the pipe?",
            solution:"Step 1 — Identify cover requirement:\n  Toronto arterial road → minimum cover = 2.1 m\n  (Local road would be 1.8 m per Toronto criteria)\n\nStep 2 — Calculate crown elevation:\n  Crown elevation = Road surface − minimum cover\n  Crown elevation = 85.300 − 2.1 = 83.200 m\n\nStep 3 — Calculate invert elevation (for a 200 mm pipe):\n  Invert = Crown − Pipe diameter\n  Invert = 83.200 − 0.200 = 83.000 m\n\nAnswer: The top (crown) of the pipe must be at or below El. 83.200 m.\nThe bottom (invert) of the pipe must be at or below El. 83.000 m.",
            note:"Always check the road classification in the municipal design criteria. Toronto uses 1.8 m for local roads and 2.1 m for arterials. Other municipalities may differ.",
          },
          fields:[
            {id:"surface_elev",label:"Road surface elevation (m)",default:85.3,step:0.001},
            {id:"cover_req",label:"Minimum cover required",type:"select",opts:[{v:1.2,l:"1.2 m — Coastal BC local road"},{v:1.5,l:"1.5 m — Coastal BC arterial"},{v:1.8,l:"1.8 m — Ontario / Prairies local road"},{v:2.1,l:"2.1 m — Ontario arterial / Calgary"},{v:2.4,l:"2.4 m — Edmonton AB (all roads)"},{v:2.7,l:"2.7 m — Edmonton major arterial"}]},
            {id:"pipe_dia",label:"Pipe outside diameter",type:"select",opts:[{v:0.150,l:"150 mm"},{v:0.200,l:"200 mm"},{v:0.250,l:"250 mm"},{v:0.300,l:"300 mm"},{v:0.400,l:"400 mm"},{v:0.500,l:"500 mm"}]},
          ],
          compute:(vals)=>{
            const crown = +(vals.surface_elev - vals.cover_req).toFixed(3);
            const invert = +(crown - vals.pipe_dia).toFixed(3);
            return [
              {l:"Minimum cover required",v:`${vals.cover_req} m`},
              {l:"Maximum crown elevation",v:`${crown.toFixed(3)} m`,flag:"Top of pipe must be at or below this elevation"},
              {l:"Maximum invert elevation",v:`${invert.toFixed(3)} m`,flag:"Bottom of pipe must be at or below this elevation"},
              {l:"Total minimum depth to invert",v:`${(vals.cover_req + vals.pipe_dia).toFixed(3)} m`},
            ];
          },
        },
      },
      sanitary:{
        title:"Sanitary Sewer Design",
        confidence:"high", verified_by:"pe_001", last_verified:"2025-03-14",
        codes:[
          {code:"CSA B182.2",full:"PVC Sewer Pipe and Fittings",body:"Canadian Standards Association (CSA)",scope:"Canadian pipe material standard for PVC gravity sanitary sewers. SDR 35 is the most common wall rating for municipal sewers in Canada.",conf:"high",ver:"pe_001",date:"2025-03-14",url:"https://www.csagroup.org/store/product/CSA-B182.2-19/",label:"CSA Group — B182.2",cdn:true,flags:[]},
          {code:"OPSS 410",full:"Construction Specification for Pipe Sewers",body:"MTO Ontario",scope:"Ontario construction specification covering trench preparation, bedding class, pipe laying, backfill, and testing. Referenced by most Ontario municipalities.",conf:"high",ver:"pe_001",date:"2025-03-14",url:"https://www.ontario.ca/page/ontario-provincial-standard-specifications",label:"MTO — OPSS 410",cdn:true,flags:[]},
          {code:"OPSS 409",full:"Low-Pressure Air Testing of Pipe Sewers",body:"MTO Ontario",scope:"Standard acceptance test for new sanitary sewer in Ontario. Air pressure applied to completed pipe — rate of pressure loss must meet the allowable limit.",conf:"high",ver:"pe_001",date:"2025-03-14",url:"https://www.ontario.ca/page/ontario-provincial-standard-specifications",label:"MTO — OPSS 409",cdn:true,flags:[]},
          {code:"Ten States Standards",full:"Recommended Standards for Wastewater Facilities",body:"GLUMRB — Great Lakes and Upper Mississippi River Board (joint Canadian-American public health body)",scope:"Widely adopted baseline for sanitary sewer design across Ontario and other provinces. Note: joint Canadian-American origin — verify your AHJ accepts this as the governing document.",conf:"medium",ver:"pe_001",date:"2025-03-14",url:"https://10statesstandards.com/",label:"Ten States Standards — Official Site",cdn:false,flags:["Joint Canadian-American standard — confirm AHJ formally accepts this"]},
          {code:"Ontario Water Resources Act",full:"Ontario Water Resources Act, R.S.O. 1990, c. O.40",body:"Province of Ontario",scope:"Governs diversion, use, and discharge of water in Ontario. Any sewer overflow or discharge to a watercourse requires approval under this Act.",conf:"high",ver:"pe_001",date:"2025-03-14",url:"https://www.ontario.ca/laws/statute/90o40",label:"Ontario e-Laws — OWRA",cdn:true,flags:[]},
        ],
        reqs:[
          {l:"Minimum diameter (municipal main)",v:"250 mm",n:"200 mm for private building laterals only. Never use 200 mm for a municipal main."},
          {l:"Min. cover — Ontario / Prairies",v:"1.8 m to crown",n:"Under roadways: 2.4 m minimum. Frost and traffic load protection."},
          {l:"Self-cleansing velocity (minimum)",v:"0.75 m/s at full flow",n:"Critical — pipes designed below this will accumulate sediment and block over time."},
          {l:"Maximum velocity",v:"3.0 m/s",n:"Erosion of pipe and joints occurs above this. Outlet protection required at outfall."},
          {l:"Minimum slope — 250 mm pipe",v:"0.50%",n:"Steeper slope needed for smaller diameters to achieve self-cleansing velocity."},
          {l:"Peaking factor method",v:"Harmon formula",n:"For populations under 10,000. Typical peaking factor: 3.5–4.0× average daily flow."},
          {l:"Infiltration allowance",v:"0.5 L/s per hectare of drainage area",n:"Add to design flow. Accounts for groundwater leaking into pipe over its service life."},
          {l:"Acceptance test",v:"Air test (OPSS 409) + CCTV inspection",n:"Both required by most Ontario municipalities before assuming ownership of a new sewer."},
          {l:"Sewer-watermain separation",v:"3.0 m horizontal, watermain above sewer",n:"Same contamination protection rule as watermain design."},
        ],
        calculator:{
          id:"sewer_slope",
          title:"Manning's Equation — Pipe Velocity & Capacity",
          desc:"Calculate full-flow velocity and capacity for a circular pipe using Manning's equation. Used to verify self-cleansing velocity is achieved.",
          worked_example:{
            source:"Ten States Standards (2022 Ed.), Section 33 — Sewers; City of Toronto Design Criteria (2023), Section 5.2 — Gravity Sewers",
            problem:"A 300 mm PVC sanitary sewer is designed on a slope of 0.50%. Manning's n = 0.013. Does it achieve the minimum self-cleansing velocity of 0.75 m/s?",
            solution:"Manning's equation for full circular pipe:\n  V = (1/n) × R^(2/3) × S^(1/2)\n\nWhere:\n  D = 0.300 m\n  Hydraulic radius R = D/4 = 0.300/4 = 0.075 m\n  S = 0.50% = 0.0050\n  n = 0.013 (smooth PVC — OPSS 410)\n\nV = (1/0.013) × (0.075)^(2/3) × (0.0050)^(1/2)\nV = 76.92 × 0.1796 × 0.07071\nV = 0.98 m/s  ✓ (exceeds 0.75 m/s minimum)\n\nFull-flow capacity:\n  A = π × D²/4 = π × 0.300²/4 = 0.0707 m²\n  Q = V × A = 0.98 × 0.0707 = 0.069 m³/s = 69 L/s",
            note:"Manning's n = 0.013 for PVC per OPSS 410. Always check velocity at full flow AND partial flow conditions (morning low-flow) — partial flow may not achieve self-cleansing even if full-flow does.",
          },
          fields:[
            {id:"diam_mm",label:"Pipe internal diameter (mm)",default:300,step:25},
            {id:"slope_pct",label:"Pipe slope (%)",default:0.50,step:0.01},
            {id:"mann_n",label:"Manning's roughness coefficient n",type:"select",opts:[{v:0.013,l:"n = 0.013 — PVC (CSA B182.2)"},{v:0.011,l:"n = 0.011 — HDPE (CAN/CSA B137.4)"},{v:0.015,l:"n = 0.015 — Concrete (CSA A257)"},{v:0.024,l:"n = 0.024 — Corrugated metal"}]},
          ],
          compute:(vals)=>{
            const D = vals.diam_mm / 1000;
            const S = vals.slope_pct / 100;
            const n = vals.mann_n;
            const R = D / 4;
            const A = Math.PI * D * D / 4;
            const V = (1/n) * Math.pow(R, 2/3) * Math.pow(S, 0.5);
            const Q = V * A * 1000;
            const ok = V >= 0.75 && V <= 3.0;
            const flag = V < 0.75 ? "⚠ Below 0.75 m/s minimum — increase slope or reduce diameter" : V > 3.0 ? "⚠ Above 3.0 m/s — erosion risk, outlet protection required" : "✓ Velocity within acceptable range";
            return [
              {l:"Full-flow velocity",v:`${V.toFixed(2)} m/s`,flag},
              {l:"Full-flow capacity Q",v:`${Q.toFixed(1)} L/s`},
              {l:"Hydraulic radius R",v:`${(R*1000).toFixed(0)} mm`},
              {l:"Cross-sectional area A",v:`${(A*1000000).toFixed(0)} mm²`},
            ];
          },
        },
      },
      storm:{
        title:"Storm Sewer Design",
        confidence:"high", verified_by:"pe_001", last_verified:"2025-03-14",
        codes:[
          {code:"MECP SWM Manual",full:"Stormwater Management Planning and Design Manual",body:"Ministry of the Environment, Conservation and Parks (MECP) Ontario",scope:"Primary stormwater design reference for Ontario. Covers the two-system concept (minor and major), quantity control, quality control, and pond design. Note: base document is 2003 — check the MECP website for technical bulletins issued since.",conf:"high",ver:"pe_002",date:"2025-01-28",url:"https://www.ontario.ca/page/stormwater-management-planning-and-design-manual",label:"MECP — SWM Planning and Design Manual",cdn:true,flags:["Base manual is 2003 — verify MECP technical bulletins for updates"]},
          {code:"CSA B182.1",full:"Plastic Drain and Sewer Pipe and Pipe Fittings",body:"Canadian Standards Association (CSA)",scope:"Canadian material specification for plastic storm sewer pipe.",conf:"medium",ver:null,date:null,url:"https://www.csagroup.org/store/product/CSA-B182.1-19/",label:"CSA Group — B182.1",cdn:true,flags:[]},
          {code:"O.Reg 41/24",full:"Development, Interference with Wetlands and Alterations to Shorelines and Watercourses",body:"Local Conservation Authority (e.g. TRCA, CVC, GRCA)",scope:"Any stormwater feature near a watercourse, floodplain, or wetland requires a Conservation Authority permit in addition to municipal approval. In force January 1, 2024 — replaced O.Reg 42/06.",conf:"high",ver:"pe_001",date:"2025-03-14",url:"https://www.ontario.ca/laws/regulation/240041",label:"Ontario e-Laws — O.Reg 41/24",cdn:true,flags:[]},
        ],
        reqs:[
          {l:"Minor system design storm",v:"2-yr (residential), 5-yr (commercial), 10-yr (arterial)",n:"Return period varies by road classification and municipality. Confirm design storm with the AHJ."},
          {l:"Major system design storm",v:"100-year return period",n:"The major system uses roads, ditches, and ponds to convey what the pipe system cannot handle."},
          {l:"IDF curves",v:"Use the specific municipality's local curves",n:"Never use national or regional approximations. Request from municipal engineering department before starting design."},
          {l:"Hydrological method",v:"Rational Method Q=CiA for areas ≤ 60 ha",n:"SWMHYMO, PCSWMM, or InfoSWMM for larger catchments. Confirm the acceptable model with the AHJ."},
          {l:"Minimum pipe diameter (municipal)",v:"300 mm",n:"250 mm in some BC municipalities — confirm with local criteria."},
          {l:"Self-cleansing velocity",v:"0.75 m/s minimum",n:"Same rule as sanitary — sediment accumulation below this velocity."},
          {l:"Maximum velocity",v:"3.0 m/s",n:"Erosion protection required at outfall where velocity exceeds 1.5 m/s."},
          {l:"SWM quality (Ontario Enhanced)",v:"80% TSS removal required",n:"For most new development in Ontario. TSS = Total Suspended Solids removed before water reaches a watercourse."},
          {l:"Post-development peak flow",v:"Must not exceed pre-development",n:"Required for 2, 5, 25, and 100-year storm events."},
        ],
        calculator:{
          id:"rational",
          title:"Rational Method — Peak Flow (Q = CiA)",
          desc:"Calculate peak stormwater flow from a drainage catchment. Valid for catchments up to 60 ha. Results are used to size the minor system pipes.",
          worked_example:{
            source:"MECP Stormwater Management Planning and Design Manual (2003), Chapter 4 — Rational Method; City of Toronto Design Criteria (2023)",
            problem:"A 3.5 ha commercial parking lot in Toronto is being developed. The runoff coefficient C = 0.85. Toronto's 5-year IDF curve gives a 15-minute intensity of 80 mm/hr. Calculate the peak design flow for the minor storm sewer system.",
            solution:"Rational Method: Q = C × i × A / 360\n  (Units: C dimensionless, i in mm/hr, A in ha → Q in m³/s)\n\nWhere:\n  C = 0.85 (commercial paved surface — MECP Table 4.1)\n  i = 80 mm/hr (from Toronto 5-yr IDF curve at Tc = 15 min)\n  A = 3.5 ha\n\nQ = 0.85 × 80 × 3.5 / 360\nQ = 238 / 360\nQ = 0.661 m³/s = 661 L/s\n\nNote: The 5-year design storm governs for commercial areas per Toronto Design Criteria.",
            note:"Always obtain local IDF curves from the municipality — not from national tables. The intensity 'i' must correspond to the time of concentration (Tc) of the catchment. Confirm Tc calculation method with the AHJ.",
          },
          fields:[
            {id:"C",label:"Runoff coefficient C (dimensionless)",default:0.85,step:0.01,min:0.1,max:1.0},
            {id:"i_mmhr",label:"Rainfall intensity i (mm/hr) from local IDF",default:80,step:1},
            {id:"A_ha",label:"Catchment area A (hectares)",default:3.5,step:0.1},
          ],
          compute:(vals)=>{
            const Q_cms = (vals.C * vals.i_mmhr * vals.A_ha) / 360;
            const Q_ls = Q_cms * 1000;
            const warn = vals.A_ha > 60
              ? "⚠ Area exceeds 60 ha — Rational Method not appropriate. Use SWMHYMO or approved computer model."
              : vals.C > 0.95 ? "⚠ C > 0.95 — check runoff coefficient against MECP Table 4.1" : "✓";
            return [
              {l:"Peak flow Q",v:`${Q_ls.toFixed(0)} L/s`},
              {l:"Peak flow Q",v:`${Q_cms.toFixed(3)} m³/s`},
              {l:"Catchment area",v:`${vals.A_ha} ha`},
              {l:"Note",v:warn},
            ];
          },
        },
      },
      forcemain:{
        title:"Force Main (Pressure Sewer) Design",
        confidence:"medium", verified_by:"pe_001", last_verified:"2025-03-14",
        codes:[
          {code:"Ten States Standards",full:"Recommended Standards for Wastewater Facilities — Pumping Stations",body:"GLUMRB (joint Canadian-American public health body)",scope:"Governs wet well sizing, pump redundancy, emergency generator requirements, and alarm systems for municipal pumping stations. Widely adopted across Ontario and other Canadian provinces.",conf:"medium",ver:"pe_001",date:"2025-03-14",url:"https://10statesstandards.com/",label:"Ten States Standards",cdn:false,flags:["Joint Canadian-American standard — confirm your AHJ accepts this"]},
          {code:"CAN/CSA-B137.3",full:"Rigid PVC Pipe for Pressure Applications",body:"Canadian Standards Association (CSA)",scope:"Canadian specification for PVC force mains under pressure.",conf:"high",ver:"pe_003",date:"2024-11-05",url:"https://www.csagroup.org/store/product/CAN-CSA-B137.3-18/",label:"CSA Group — B137.3",cdn:true,flags:[]},
          {code:"CAN/CSA-B137.4",full:"Polyethylene Piping Systems for Pressure Applications",body:"Canadian Standards Association (CSA)",scope:"Canadian specification for HDPE force mains — the preferred material for directional drill (trenchless) installations.",conf:"high",ver:"pe_003",date:"2024-11-05",url:"https://www.csagroup.org/store/product/CAN-CSA-B137.4-18/",label:"CSA Group — B137.4",cdn:true,flags:[]},
          {code:"OPSS 441",full:"Construction Specification for Watermains (applied to force mains)",body:"MTO Ontario",scope:"Force main pressure testing follows the same protocol as watermain pressure testing — 1.5× working pressure for a minimum of 2 hours.",conf:"high",ver:"pe_001",date:"2025-03-14",url:"https://www.ontario.ca/page/ontario-provincial-standard-specifications",label:"MTO — OPSS 441",cdn:true,flags:[]},
        ],
        reqs:[
          {l:"Minimum pump redundancy",v:"2 pumps (duty + standby)",n:"Required for all municipal stations per Ten States Standards. Auto-alternation between pumps required."},
          {l:"Emergency generator",v:"Required for stations > 15 L/s peak flow",n:"Must start automatically on power failure. Minimum 8 hours fuel supply on site."},
          {l:"Wet well volume",v:"Minimum 10 min. retention at peak flow",n:"Allows time for operators to respond to alarms before overflow occurs."},
          {l:"Force main velocity",v:"0.9–3.0 m/s",n:"Minimum 0.9 m/s for self-scouring (prevent sedimentation). Maximum 3.0 m/s to limit water hammer risk."},
          {l:"Water hammer analysis",v:"Required for all force mains",n:"Joukowsky surge pressure must be calculated. If surge exceeds 1.5× working pressure, surge suppression is required."},
          {l:"Air release valves",v:"Required at all high points on the main",n:"Prevents air locks that reduce capacity and cause cavitation damage to the pipe."},
          {l:"Pressure testing",v:"1.5× working pressure for 2 hours minimum",n:"Per OPSS 441. All force mains must pass a hydrostatic pressure test before commissioning."},
          {l:"Pipe material",v:"PVC CAN/CSA-B137.3 or HDPE CAN/CSA-B137.4",n:"HDPE preferred for directional drill sections. Select pressure class based on operating pressure plus calculated surge."},
        ],
        calculator:{
          id:"forcemain_vel",
          title:"Force Main Velocity Checker",
          desc:"Verify that the proposed force main diameter achieves the minimum self-scouring velocity (0.9 m/s) and does not exceed the maximum (3.0 m/s).",
          worked_example:{
            source:"Ten States Standards (2022 Edition), Section 36 — Force Mains; City of Toronto Design Criteria (2023), Section 6.4",
            problem:"A pump station discharges 45 L/s into a 200 mm diameter PVC force main. Does the velocity fall within the acceptable range?",
            solution:"Step 1 — Convert flow:\n  Q = 45 L/s ÷ 1000 = 0.045 m³/s\n\nStep 2 — Pipe cross-sectional area:\n  A = π × D²/4 = π × 0.200²/4 = 0.0314 m²\n\nStep 3 — Velocity:\n  V = Q/A = 0.045 / 0.0314 = 1.43 m/s\n\nResult: 1.43 m/s — within the acceptable range of 0.9–3.0 m/s. ✓",
            note:"Check velocity at BOTH minimum daily flow AND peak pumping flow. The pipe must self-scour at minimum conditions and stay below the erosive limit at peak.",
          },
          fields:[
            {id:"Q_ls",label:"Pump discharge flow Q (L/s)",default:45,step:1},
            {id:"D_mm",label:"Force main internal diameter (mm)",type:"select",opts:[{v:100,l:"100 mm"},{v:150,l:"150 mm"},{v:200,l:"200 mm"},{v:250,l:"250 mm"},{v:300,l:"300 mm"},{v:400,l:"400 mm"}]},
          ],
          compute:(vals)=>{
            const Q=vals.Q_ls/1000, D=vals.D_mm/1000;
            const A=Math.PI*D*D/4, V=Q/A;
            const flag=V<0.9?"⚠ Below 0.9 m/s minimum — reduce pipe diameter or increase pump flow":V>3.0?"⚠ Above 3.0 m/s maximum — increase pipe diameter or reduce flow":"✓ Velocity within acceptable range (0.9–3.0 m/s)";
            return [
              {l:"Pipe flow area",v:`${(A*1e6).toFixed(0)} mm²`},
              {l:"Velocity V = Q/A",v:`${V.toFixed(2)} m/s`,flag},
              {l:"Status",v:V>=0.9&&V<=3.0?"✓ Diameter acceptable":"✗ Revise pipe diameter"},
            ];
          },
        },
      },
    },
  },

  traffic:{
    label:"Traffic", icon:"⊕", color:"#dba94d",
    desc:"Roads, signals, pavement, traffic studies. The asphalt-side of civil.",
    questions:[
      { id:"traffic_type", title:"What is the traffic engineering scope?",
        why:{ h:"Why scope determines the governing standard", b:"Road geometric design (alignment, curves, grades) is governed by the TAC Geometric Design Guide. Traffic signal design is governed by the Ontario Traffic Manual (OTM Book 12). A Transportation Impact Study for a development follows a separate process under municipal TIS guidelines. Pavement design follows the TAC Pavement Design Guide. Applying the wrong standard to the wrong scope produces incorrect results." },
        opts:[
          {id:"geometric",l:"Road geometric design",d:"Horizontal/vertical alignment, cross-section, sight distance, grades",i:"ti-route"},
          {id:"signals",l:"Traffic signals",d:"Signal warrants, phasing, timing, accessible pedestrian signals",i:"ti-traffic-lights"},
          {id:"tis",l:"Transportation Impact Study (TIS)",d:"Trip generation, Level of Service analysis, development approvals",i:"ti-report"},
          {id:"pavement",l:"Pavement design",d:"Flexible (asphalt) or rigid (concrete) road surface design",i:"ti-road"},
          {id:"idk",l:"Not sure",d:"Help me identify the right category",i:"ti-help-circle",isIDK:true},
        ],
      },
    ],
    results:{
      geometric:{
        title:"Road Geometric Design",
        confidence:"high", verified_by:"pe_004", last_verified:"2025-02-20",
        codes:[
          {code:"TAC Geometric Design Guide",full:"Geometric Design Guide for Canadian Roads",body:"Transportation Association of Canada (TAC)",scope:"Primary Canadian road design reference for all road types. Design speed drives all geometric elements — horizontal radius, vertical curves, sight distance, superelevation.",conf:"high",ver:"pe_004",date:"2025-02-20",url:"https://www.tac-atc.ca/en/resources/tac-publications",label:"TAC — Geometric Design Guide",cdn:true,flags:[]},
          {code:"MTO Geometric Design Standards",full:"Geometric Design Standards for Ontario Highways",body:"Ministry of Transportation Ontario (MTO)",scope:"Ontario-specific geometric standards for provincial highways. Supplements the TAC Guide for Ontario projects.",conf:"high",ver:"pe_004",date:"2025-02-20",url:"https://www.ontario.ca/page/geometric-design-standards-ontario-highway",label:"MTO — Geometric Design Standards",cdn:true,flags:[]},
          {code:"BC MoTI Highway Design Manual",full:"Highway Design Manual",body:"BC Ministry of Transportation and Infrastructure (MoTI)",scope:"BC-specific geometric standards for provincial highways and municipal arterials. Updated 2023.",conf:"high",ver:null,date:null,url:"https://www2.gov.bc.ca/gov/content/transportation/transportation-infrastructure/engineering-standards-guidelines",label:"BC MoTI — Highway Design Manual",cdn:true,flags:[]},
        ],
        reqs:[
          {l:"Design speed — urban local",v:"30–50 km/h",n:"All geometric elements are derived from design speed, not posted speed."},
          {l:"Design speed — urban collector",v:"60–80 km/h",n:""},
          {l:"Design speed — rural arterial / highway",v:"80–120 km/h",n:""},
          {l:"Stopping Sight Distance @ 80 km/h",v:"140 m minimum",n:"Most critical constraint for crest vertical curves. Undersized SSD is an engineering liability. Use TAC Table 2.1, not the formula alone."},
          {l:"Stopping Sight Distance @ 100 km/h",v:"210 m minimum",n:""},
          {l:"Min. horizontal radius @ 80 km/h",v:"230 m (emax = 6%)",n:"Lower radius requires higher superelevation. Check the TAC speed-radius-superelevation table."},
          {l:"Max. grade — arterial",v:"6%",n:""},
          {l:"Max. grade — collector",v:"8%",n:""},
          {l:"Max. grade — local road",v:"12%",n:"Low-volume roads only."},
          {l:"Lane width — highway through lane",v:"3.7 m",n:""},
          {l:"Lane width — urban arterial",v:"3.5 m",n:""},
          {l:"Lane width — local road",v:"3.0–3.3 m",n:""},
          {l:"Sidewalk — arterial",v:"2.0 m minimum, 3.0 m preferred",n:""},
          {l:"Bike lane width",v:"1.5 m min, 1.8 m preferred",n:""},
        ],
        calculator:{
          id:"ssd_calc",
          title:"Stopping Sight Distance — Crest Vertical Curve",
          desc:"Look up the minimum stopping sight distance (SSD) and minimum crest vertical curve K-value for a given design speed. Based on TAC Geometric Design Guide, Tables 2.1 and 3.3.",
          worked_example:{
            source:"TAC Geometric Design Guide for Canadian Roads (2017), Chapter 2 — Sight Distance, Table 2.1; Chapter 3 — Vertical Alignment, Table 3.3",
            problem:"A crest vertical curve is being designed on a rural collector road with design speed = 90 km/h and a grade change of A = 3.0%. What is the minimum SSD, minimum K-value, and minimum crest curve length?",
            solution:"Step 1 — Minimum SSD at 90 km/h:\n  From TAC Table 2.1: SSD = 170 m\n  (Based on 2.5 s perception-reaction time + wet pavement braking)\n\nStep 2 — Minimum K-value for crest curve at 90 km/h:\n  From TAC Table 3.3: K_min = 50\n  (K = L/A where L is curve length and A is grade difference in %)\n\nStep 3 — Minimum curve length:\n  L = K × A = 50 × 3.0 = 150 m\n\nResult: Design a crest vertical curve at least 150 m long.",
            note:"Always use tabulated values from TAC Table 2.1 — they account for 2.5 s perception-reaction time and braking on wet pavement at the 98th percentile friction. Do not use the SSD formula in isolation.",
          },
          fields:[
            {id:"speed",label:"Design speed (km/h)",type:"select",opts:[{v:50,l:"50 km/h — Urban local"},{v:60,l:"60 km/h — Urban collector"},{v:70,l:"70 km/h — Suburban"},{v:80,l:"80 km/h — Rural collector"},{v:90,l:"90 km/h — Rural arterial"},{v:100,l:"100 km/h — Highway"},{v:110,l:"110 km/h — Expressway"},{v:120,l:"120 km/h — Freeway"}]},
            {id:"grade_diff",label:"Algebraic grade difference A (%)",default:3.0,step:0.5},
          ],
          compute:(vals)=>{
            const ssdTable={50:65,60:85,70:110,80:140,90:170,100:210,110:255,120:300};
            const kTable={50:7,60:12,70:20,80:33,90:50,100:74,110:107,120:145};
            const ssd = ssdTable[vals.speed];
            const K = kTable[vals.speed];
            const L = +(K * vals.grade_diff).toFixed(0);
            return [
              {l:"Stopping Sight Distance (SSD)",v:`${ssd} m`,flag:"Per TAC Table 2.1 — wet pavement, 2.5 s reaction time"},
              {l:"Min. K-value (crest vertical curve)",v:`${K}`,flag:"Per TAC Table 3.3"},
              {l:"Min. curve length for A = "+vals.grade_diff+"%",v:`${L} m`},
              {l:"Governs?",v:L < ssd ? `⚠ L = ${L} m < SSD ${ssd} m — increase L to ${ssd} m` : "✓ Curve length satisfies SSD"},
            ];
          },
        },
      },
      pavement:{
        title:"Pavement Design",
        confidence:"medium", verified_by:"pe_004", last_verified:"2025-02-20",
        codes:[
          {code:"TAC Pavement Design Guide",full:"Pavement Design and Management Guide",body:"Transportation Association of Canada (TAC)",scope:"Canadian reference for flexible and rigid pavement design. Addresses freeze-thaw cycles, frost depth, and Canadian climate — critical differences from American practice.",conf:"high",ver:"pe_004",date:"2025-02-20",url:"https://www.tac-atc.ca/en/resources/tac-publications",label:"TAC — Pavement Design and Management Guide",cdn:true,flags:[]},
          {code:"OPSS 310",full:"Construction Specification for Hot Mix Asphalt",body:"MTO Ontario",scope:"Ontario specification for HMA mix types, compaction, and QC testing.",conf:"high",ver:null,date:null,url:"https://www.ontario.ca/page/ontario-provincial-standard-specifications",label:"MTO — OPSS 310",cdn:true,flags:[]},
          {code:"OPSS 330",full:"Construction Specification for Granular Base",body:"MTO Ontario",scope:"Granular A and B material requirements and compaction for Ontario.",conf:"high",ver:null,date:null,url:"https://www.ontario.ca/page/ontario-provincial-standard-specifications",label:"MTO — OPSS 330",cdn:true,flags:[]},
        ],
        reqs:[
          {l:"Subgrade strength (minimum CBR)",v:"3% (residential), 5% (collector/arterial)",n:"California Bearing Ratio. Test in the field — do not assume unless you overdesign."},
          {l:"Granular base thickness",v:"150–450 mm depending on CBR and traffic",n:"Thicker base for weaker subgrade or heavier traffic. Also provides frost protection."},
          {l:"HMA surface — residential (Ontario)",v:"HL-3 mix, 40–50 mm compacted",n:""},
          {l:"HMA surface — arterial (Ontario)",v:"HL-1 or SP-12.5 mix, 50 mm minimum",n:"Confirm mix type with municipality — designations vary by province."},
          {l:"Compaction — granular base",v:"95% Standard Proctor",n:"Per OPSS 330."},
          {l:"Compaction — asphalt",v:"95% of maximum density",n:"Per OPSS 310."},
          {l:"Design period",v:"20 years (municipal), 30–40 years (provincial)",n:""},
          {l:"Frost depth consideration",v:"Granular depth may govern over traffic load",n:"In northern Canada, frost penetration depth sets the minimum granular base thickness, not ESALs."},
        ],
        calculator:{
          id:"esal_calc",
          title:"Cumulative ESAL Estimator",
          desc:"Estimate cumulative Equivalent Standard Axle Loads (ESALs) over the design period. ESALs are the primary traffic input for pavement thickness design.",
          worked_example:{
            source:"TAC Pavement Design and Management Guide; standard pavement engineering practice as applied in Canada",
            problem:"A residential local road has an Annual Average Daily Traffic (AADT) of 500 vehicles per day, with 5% trucks. The average truck ESAL factor = 1.0 (typical light delivery truck). Design period = 20 years. Estimate cumulative ESALs.",
            solution:"Step 1 — Daily truck volume:\n  Trucks/day = AADT × truck fraction = 500 × 0.05 = 25 trucks/day\n\nStep 2 — Annual ESALs:\n  Annual ESALs = 25 trucks/day × 365 days × 1.0 ESAL factor\n  Annual ESALs = 9,125 ESALs/year\n\nStep 3 — Cumulative ESALs (20 year design period):\n  Cumulative = 9,125 × 20 = 182,500 ESALs\n\nConclusion: A residential pavement section (HL-3 on 150 mm Granular A on 300 mm Granular B) is typically adequate for 182,500 ESALs in Ontario.",
            note:"ESAL factors vary widely by truck type. A fully loaded 5-axle tractor-trailer has an ESAL factor of 2.0–3.0. For arterials, use measured truck class distribution from traffic counts.",
          },
          fields:[
            {id:"aadt",label:"AADT (vehicles per day)",default:500,step:100},
            {id:"truck_pct",label:"Truck percentage (%)",default:5,step:1},
            {id:"esal_factor",label:"Average truck ESAL factor",type:"select",opts:[{v:0.5,l:"0.5 — Light 2-axle delivery"},{v:1.0,l:"1.0 — Medium single-unit truck"},{v:2.0,l:"2.0 — Heavy tandem-axle truck"},{v:3.0,l:"3.0 — Tractor-trailer (5-axle)"}]},
            {id:"years",label:"Design period (years)",type:"select",opts:[{v:15,l:"15 years"},{v:20,l:"20 years (municipal)"},{v:30,l:"30 years"},{v:40,l:"40 years (provincial highway)"}]},
          ],
          compute:(vals)=>{
            const daily = vals.aadt * (vals.truck_pct/100) * vals.esal_factor;
            const annual = daily * 365;
            const cumul = annual * vals.years;
            const cat = cumul < 500000 ? "Light — local road pavement section" : cumul < 5000000 ? "Medium — collector / arterial section" : "Heavy — detailed pavement design required";
            return [
              {l:"Daily truck ESAL",v:daily.toFixed(1)},
              {l:"Annual ESAL",v:Math.round(annual).toLocaleString()},
              {l:"Cumulative ESAL (design period)",v:Math.round(cumul).toLocaleString()},
              {l:"Traffic category",v:cat},
            ];
          },
        },
      },
      signals:{
        title:"Traffic Signals — Design & Warrants",
        confidence:"high", verified_by:"pe_004", last_verified:"2025-02-20",
        codes:[
          {code:"OTM Book 12",full:"Traffic Signals — Ontario Traffic Manual",body:"Ministry of Transportation Ontario (MTO)",scope:"Signal warrant analysis, phasing, timing, detection, and accessible pedestrian signal (APS) requirements for Ontario. Widely adopted by Ontario municipalities.",conf:"high",ver:"pe_004",date:"2025-02-20",url:"https://www.ontario.ca/page/ontario-traffic-manual",label:"MTO — Ontario Traffic Manual Book 12",cdn:true,flags:[]},
          {code:"TAC MUTCDC",full:"Manual of Uniform Traffic Control Devices for Canada",body:"Transportation Association of Canada (TAC)",scope:"National standard for traffic signs, pavement markings, and signals across Canada. The Canadian version — distinct from the American MUTCD.",conf:"high",ver:null,date:null,url:"https://www.tac-atc.ca/en/resources/tac-publications",label:"TAC — MUTCDC",cdn:true,flags:[]},
        ],
        reqs:[
          {l:"Signal warrant analysis",v:"Required before any new signal installation",n:"OTM Book 12 lists 9 warrants. A signal is justified if any ONE is met — but engineering judgment still required."},
          {l:"Accessible Pedestrian Signals (APS)",v:"Mandatory at all new/modified signals in Ontario",n:"This is a standard design requirement, not an option. Required under the Accessibility for Ontarians with Disabilities Act (AODA)."},
          {l:"Min. pedestrian walk interval",v:"7 seconds + crossing time at 1.0 m/s",n:"Use 0.9 m/s for conservative design accommodating older pedestrians."},
          {l:"Min. vehicle green time",v:"7 seconds per phase",n:""},
          {l:"Typical signal cycle length",v:"60–120 seconds",n:"Optimize for delay and safety. Longer cycles increase pedestrian wait times."},
          {l:"Bicycle detection",v:"Required on all approaches",n:"Video detection or in-ground loop detection. Cyclists must be able to trigger the signal."},
          {l:"Emergency vehicle preemption",v:"Per local fire authority agreement",n:"Confirm requirements with the fire department and municipality before design."},
        ],
        calculator:{
          id:"ped_crossing",
          title:"Pedestrian Crossing Time Calculator",
          desc:"Calculate the minimum pedestrian crossing time required for a given crossing distance and walking speed.",
          worked_example:{
            source:"OTM Book 12 — Traffic Signals, Section 5.3 — Pedestrian Signal Timing; AODA Accessibility Standards",
            problem:"A signalized intersection in Toronto has a pedestrian crossing distance of 18 m across a four-lane arterial. What is the minimum pedestrian signal time required?",
            solution:"Step 1 — Walking speed:\n  Use 1.0 m/s for general design\n  Use 0.9 m/s for conservative / accessible design (AODA)\n\nStep 2 — Crossing time at 0.9 m/s:\n  Crossing time = 18 m / 0.9 m/s = 20 seconds\n\nStep 3 — Add clearance interval:\n  Minimum walk interval = 7 seconds\n  Total pedestrian time = Walk + Crossing time\n  = 7 + 20 = 27 seconds minimum\n\nResult: The pedestrian phase must provide at least 27 seconds.",
            note:"Always use the conservative 0.9 m/s walking speed for new signal designs in Ontario to comply with AODA accessibility requirements. Check local guidelines — some municipalities require 0.8 m/s.",
          },
          fields:[
            {id:"crossing_m",label:"Crossing distance (m)",default:18,step:1},
            {id:"walk_speed",label:"Design walking speed",type:"select",opts:[{v:1.2,l:"1.2 m/s — Fast (young pedestrians)"},{v:1.0,l:"1.0 m/s — Standard"},{v:0.9,l:"0.9 m/s — Conservative / AODA"},{v:0.8,l:"0.8 m/s — Accessible (some municipalities)"}]},
          ],
          compute:(vals)=>{
            const cross_time = vals.crossing_m / vals.walk_speed;
            const min_walk = 7;
            const total = Math.ceil(cross_time + min_walk);
            return [
              {l:"Crossing time at selected speed",v:`${cross_time.toFixed(1)} s`},
              {l:"Minimum walk interval (fixed)",v:`${min_walk} s`},
              {l:"Minimum total pedestrian phase",v:`${total} s`},
              {l:"Note",v:vals.walk_speed > 1.0 ? "⚠ Consider using 0.9 m/s for AODA compliance" : "✓"},
            ];
          },
        },
      },
      tis:{
        title:"Transportation Impact Study (TIS)",
        confidence:"high", verified_by:"pe_004", last_verified:"2025-02-20",
        codes:[
          {code:"ITE Trip Generation Manual",full:"Trip Generation Manual, 11th Edition",body:"Institute of Transportation Engineers (ITE) — adopted by reference in Canadian practice",scope:"Standard source for vehicle trip rates by land use code (LUC). Used to estimate how many trips a development generates. Note: rates are from North American data — verify applicability with your local municipality.",conf:"medium",ver:"pe_004",date:"2025-02-20",url:"https://www.ite.org/technical-resources/topics/trip-and-parking-generation/",label:"ITE — Trip Generation Manual",cdn:false,flags:["American publication — widely used in Canada but verify local municipality accepts ITE rates"]},
          {code:"TAC MUTCDC",full:"Manual of Uniform Traffic Control Devices for Canada",body:"Transportation Association of Canada (TAC)",scope:"National Canadian standard for signs, pavement markings, and signals. Referenced in TIS studies for proposed traffic control changes.",conf:"high",ver:null,date:null,url:"https://www.tac-atc.ca/en/resources/tac-publications",label:"TAC — MUTCDC",cdn:true,flags:[]},
          {code:"OTM Book 12",full:"Traffic Signals — Ontario Traffic Manual",body:"Ministry of Transportation Ontario (MTO)",scope:"Signal warrant analysis required within a TIS if the study recommends a new signal or modification to an existing one.",conf:"high",ver:"pe_004",date:"2025-02-20",url:"https://www.ontario.ca/page/ontario-traffic-manual",label:"MTO — OTM Book 12",cdn:true,flags:[]},
        ],
        reqs:[
          {l:"TIS scoping",v:"Pre-consultation with municipality required first",n:"Submit a TIS scoping memo. Confirm study area boundaries, design years, and analysis method with the AHJ before any data collection."},
          {l:"Study area",v:"All intersections where development adds ≥ 5% of peak hour volume",n:"Check your municipality's specific TIS guideline — some use a distance-based boundary instead (e.g. 500 m from site access)."},
          {l:"Design years",v:"Existing + 5-year background + build-out horizon",n:"Some municipalities require a 10-year horizon for large developments."},
          {l:"Peak hours to analyze",v:"AM peak (7–9 am) and PM peak (4–6 pm) minimum",n:"Saturday peak required if the development includes retail, restaurants, or entertainment."},
          {l:"Level of Service (LOS) standard",v:"LOS D or better at study intersections",n:"Some urban cores (City of Vancouver, parts of Toronto) accept LOS E. Confirm with AHJ."},
          {l:"Background traffic growth",v:"From municipality's traffic model or historical counts",n:"Do not apply arbitrary growth rates without municipal approval."},
          {l:"Site access",v:"Sight distance, turn lane warrants, and signal warrants",n:"All site access points must be checked for stopping sight distance (TAC SSD table) and turn lane warrants."},
          {l:"TDM (Transportation Demand Management)",v:"Required by many municipalities for large developments",n:"Strategies to reduce single-occupant vehicle trips: transit passes, bike parking, car-share, etc."},
        ],
        calculator:{
          id:"trip_gen",
          title:"Trip Generation Estimator (ITE Rates)",
          desc:"Estimate vehicle trips generated by a development using ITE Trip Generation Manual rates. Results must be confirmed with your municipality before use in a formal TIS.",
          worked_example:{
            source:"ITE Trip Generation Manual, 11th Edition — LUC 820 Shopping Centre; City of Toronto TIS Guidelines (2022)",
            problem:"A 5,000 m² (GFA) retail shopping plaza is proposed in Toronto. Estimate the number of vehicle trips generated during the weekday PM peak hour.",
            solution:"Step 1 — Identify ITE Land Use Code:\n  Retail shopping centre = LUC 820\n\nStep 2 — ITE PM Peak Hour rate for LUC 820:\n  Rate = 3.71 trips per 100 m² GFA (from ITE 11th Ed. Table)\n\nStep 3 — Calculate trips:\n  GFA = 5,000 m²\n  Trips = 3.71 × (5,000/100) = 3.71 × 50 = 185.5 trips\n  Round to 186 trips in the PM peak hour\n\nStep 4 — Directional split (LUC 820):\n  Entering: 49% = 91 vehicles\n  Exiting: 51% = 95 vehicles",
            note:"ITE rates represent average North American suburban conditions. Urban sites with high transit access, walking, or cycling will generate fewer vehicle trips. Many Canadian municipalities allow reductions for transit proximity — confirm with your AHJ.",
          },
          fields:[
            {id:"gfa",label:"Gross Floor Area (m²)",default:5000,step:100},
            {id:"luc",label:"Land use type",type:"select",opts:[
              {v:3.71,l:"Retail / Shopping Centre (LUC 820) — per 100 m²"},
              {v:1.04,l:"Office (LUC 710) — per 100 m²"},
              {v:0.62,l:"Residential — Apartment (LUC 220) — per unit"},
              {v:0.99,l:"Residential — Single Family (LUC 210) — per unit"},
              {v:7.49,l:"Fast Food Restaurant (LUC 934) — per 100 m²"},
              {v:2.36,l:"Industrial / Warehouse (LUC 150) — per 100 m²"},
            ]},
            {id:"unit_size",label:"Unit denominator",type:"select",opts:[{v:100,l:"Per 100 m² GFA"},{v:1,l:"Per dwelling unit (use GFA field for unit count)"}]},
          ],
          compute:(vals)=>{
            const trips=vals.luc*(vals.gfa/vals.unit_size);
            const entering=Math.round(trips*0.49), exiting=Math.round(trips*0.51);
            return [
              {l:"PM peak hour trips (total)",v:`${Math.round(trips)} vehicles`},
              {l:"Entering",v:`${entering} vehicles (49%)`},
              {l:"Exiting",v:`${exiting} vehicles (51%)`},
              {l:"Note",v:trips>200?"⚠ High trip generation — full TIS almost certainly required":"Confirm TIS threshold with your municipality (typically 100+ new trips triggers TIS)"},
            ];
          },
        },
      },
    },
  },

  structural:{
    label:"Structural", icon:"▦", color:"#ad94f0",
    desc:"Buildings, bridges, the things that hold load. Concrete, steel, wood.",
    questions:[
      { id:"struct_type", title:"What type of structural work?",
        why:{ h:"Why material determines the design standard", b:"In Canada, the National Building Code (NBC) sets the loads — gravity, wind, snow, seismic. Then a material-specific Canadian standard governs member design: CSA A23.3 for concrete, CSA S16 for steel, CSA O86 for wood and mass timber, CSA S6 for highway bridges. These are not interchangeable. You cannot apply concrete design rules to steel connections or use NBC loads without the correct material standard." },
        opts:[
          {id:"concrete",l:"Concrete structures",d:"Reinforced or prestressed concrete buildings, walls, slabs, foundations",i:"ti-square"},
          {id:"steel",l:"Steel structures",d:"Structural steel frames, connections, industrial structures",i:"ti-stack"},
          {id:"wood",l:"Wood / mass timber",d:"Sawn lumber, glulam, CLT, engineered wood buildings",i:"ti-trees"},
          {id:"bridges",l:"Bridges & culverts",d:"Highway bridges, pedestrian bridges, large culverts",i:"ti-bridge"},
          {id:"idk",l:"Not sure",d:"Help me identify the right structural category",i:"ti-help-circle",isIDK:true},
        ],
      },
    ],
    results:{
      concrete:{
        title:"Concrete Structure Design",
        confidence:"high", verified_by:"pe_003", last_verified:"2024-11-05",
        codes:[
          {code:"NBC 2020 Div. B Part 4",full:"National Building Code of Canada 2020 — Structural Loads and Procedures",body:"National Research Council of Canada (NRC)",scope:"Sets structural loads for all Canadian buildings: dead, live, snow, wind, earthquake, and load combinations. All Canadian structural design begins here.",conf:"high",ver:"pe_003",date:"2024-11-05",url:"https://nrc.canada.ca/en/certifications-evaluations-standards/codes-canada/codes-canada-publications/national-building-code-canada-2020",label:"NRC — National Building Code 2020",cdn:true,flags:[]},
          {code:"CSA A23.3-19",full:"Design of Concrete Structures",body:"Canadian Standards Association (CSA)",scope:"The governing Canadian standard for reinforced and prestressed concrete design. Covers members, connections, seismic detailing, deflection, and durability.",conf:"high",ver:"pe_003",date:"2024-11-05",url:"https://www.csagroup.org/store/product/A23.3-19/",label:"CSA Group — A23.3",cdn:true,flags:[]},
          {code:"CSA A23.1/A23.2-19",full:"Concrete Materials and Methods of Concrete Construction",body:"Canadian Standards Association (CSA)",scope:"Governs mix design, placement, curing, and quality control testing for concrete construction in Canada.",conf:"high",ver:"pe_003",date:"2024-11-05",url:"https://www.csagroup.org/store/product/A23.1-19-A23.2-19/",label:"CSA Group — A23.1/A23.2",cdn:true,flags:[]},
        ],
        reqs:[
          {l:"Concrete strength — interior",v:"f'c = 25 MPa minimum",n:""},
          {l:"Concrete strength — exterior exposed",v:"f'c = 30 MPa minimum",n:""},
          {l:"Concrete strength — parking / bridge deck",v:"f'c = 35 MPa minimum",n:"De-icing salt exposure drives this requirement."},
          {l:"Exposure Class C-1 — maximum w/cm",v:"0.40",n:"C-1 applies to elements exposed to de-icing salts (parking decks, bridge decks). This is the most impactful single durability decision."},
          {l:"Exposure Class C-1 — min. cementitious content",v:"335 kg/m³",n:""},
          {l:"Exposure Class C-1 — air entrainment",v:"5–8%",n:"Required for freeze-thaw and salt resistance."},
          {l:"Rebar cover — interior slab",v:"20 mm (formed), 40 mm (slabs on grade)",n:""},
          {l:"Rebar cover — exterior / exposed to weather",v:"50 mm",n:""},
          {l:"Rebar cover — soil contact",v:"75 mm",n:""},
          {l:"Seismic detailing",v:"Per NBC seismic hazard zone + CSA A23.3 Clause 21",n:"Ductile detailing required in high-seismic zones (Vancouver, Victoria). Significantly different from low-seismic Toronto."},
          {l:"Deflection limit — live load",v:"L/360",n:"For most floor and roof systems."},
          {l:"Deflection limit — total",v:"L/240",n:""},
        ],
        calculator:{
          id:"exposure_class",
          title:"Exposure Class & Minimum Cover Selector",
          desc:"Identify the correct CSA A23.1 exposure class, concrete mix requirements, and minimum rebar cover based on the element's environment.",
          worked_example:{
            source:"CSA A23.1-19, Table 2 — Exposure Classes and Limits; CSA A23.3-19, Clause 7.9 — Cover to Reinforcement",
            problem:"A parking structure deck slab in Toronto is exposed to de-icing salts tracked in by vehicles. What is the minimum concrete strength, w/cm ratio, air content, and rebar cover?",
            solution:"Step 1 — Identify Exposure Class (CSA A23.1 Table 2):\n  De-icing salt exposure on a parking deck → Class C-1\n\nStep 2 — Concrete mix requirements for Class C-1:\n  Maximum w/cm = 0.40\n  Minimum cementitious content = 335 kg/m³\n  Air entrainment = 5–8% (freeze-thaw + chloride protection)\n  Minimum f'c = 35 MPa\n\nStep 3 — Minimum rebar cover (CSA A23.3, Clause 7.9):\n  Top steel exposed to weather = 50 mm\n  Bottom steel exposed to salt splash = 50 mm\n  Toronto practice recommendation = 60 mm for parking decks\n\nStep 4 — Rebar type:\n  Epoxy-coated rebar is standard for Ontario parking structures.\n  Stainless steel rebar is required for bridge decks under CSA S6-19.",
            note:"Exposure class is the single most important durability decision in Canadian concrete design. A C-1 slab designed with interior (C-XL) requirements will begin deteriorating within 5–10 years in a Canadian climate.",
          },
          fields:[
            {id:"exposure",label:"Element exposure condition",type:"select",opts:[{v:"interior",l:"Interior — not exposed to weather"},{v:"exterior",l:"Exterior — exposed to weather, no de-icing salts"},{v:"salt",l:"Exposed to de-icing salts (parking deck, bridge)"},{v:"soil",l:"In contact with soil or below grade"}]},
            {id:"element",label:"Structural element type",type:"select",opts:[{v:"slab",l:"Slab"},{v:"beam",l:"Beam or girder"},{v:"column",l:"Column"},{v:"wall",l:"Wall"},{v:"footing",l:"Footing / foundation"}]},
          ],
          compute:(vals)=>{
            const data={
              interior:{cls:"C-XL",fc:25,wcm:0.55,air:"Not required",cover:{slab:20,beam:30,column:30,wall:20,footing:75}},
              exterior:{cls:"F-1 / F-2",fc:30,wcm:0.50,air:"Recommended 4–7%",cover:{slab:40,beam:40,column:40,wall:40,footing:75}},
              salt:{cls:"C-1",fc:35,wcm:0.40,air:"5–8% required",cover:{slab:50,beam:50,column:50,wall:50,footing:75}},
              soil:{cls:"S-1 / S-2",fc:30,wcm:0.45,air:"Recommended",cover:{slab:75,beam:75,column:75,wall:60,footing:75}},
            };
            const d = data[vals.exposure];
            return [
              {l:"Exposure Class (CSA A23.1 Table 2)",v:d.cls},
              {l:"Minimum f'c",v:`${d.fc} MPa`},
              {l:"Maximum w/cm ratio",v:d.wcm.toFixed(2)},
              {l:"Air entrainment",v:d.air},
              {l:`Minimum cover — ${vals.element}`,v:`${d.cover[vals.element]} mm`},
              {l:"Rebar note",v:vals.exposure==="salt"?"Specify epoxy-coated or stainless rebar":"Standard black rebar acceptable"},
            ];
          },
        },
      },
      bridges:{
        title:"Bridge & Culvert Design",
        confidence:"high", verified_by:"pe_003", last_verified:"2024-11-05",
        codes:[
          {code:"CAN/CSA S6-19",full:"Canadian Highway Bridge Design Code",body:"Canadian Standards Association (CSA)",scope:"The governing Canadian bridge design standard. Covers loads (CL-625 truck), seismic performance categories, concrete durability, steel fatigue, and inspection requirements.",conf:"high",ver:"pe_003",date:"2024-11-05",url:"https://www.csagroup.org/store/product/CAN-CSA-S6-19/",label:"CSA Group — S6-19",cdn:true,flags:[]},
          {code:"NBC 2020",full:"National Building Code of Canada",body:"National Research Council of Canada (NRC)",scope:"For non-highway bridges (pedestrian, private crossings) not under CSA S6 highway jurisdiction.",conf:"high",ver:"pe_003",date:"2024-11-05",url:"https://nrc.canada.ca/en/",label:"NRC — NBC 2020",cdn:true,flags:[]},
        ],
        reqs:[
          {l:"Design vehicle (highway bridges)",v:"CL-625 truck or lane load",n:"This is Canada-specific. The CL-625 is not interchangeable with the American HL-93 truck."},
          {l:"Design life",v:"75 years (standard)",n:"100 years for major crossings."},
          {l:"Bridge deck concrete",v:"f'c = 35 MPa min., w/cm ≤ 0.37",n:""},
          {l:"Bridge deck rebar",v:"Epoxy-coated or stainless steel required",n:"Per CSA S6-19. Protects against chloride penetration from de-icing salts."},
          {l:"Seismic performance category",v:"A–D per CSA S6 Clause 4.4",n:"Determined from NBC seismic hazard maps. Vancouver = high seismic. Prairie cities = generally low."},
          {l:"Fatigue (steel bridges)",v:"Stress ranges checked at FLS load combination",n:"Per CSA S6 Table 10.4. Steel fatigue governs the design life of many steel bridge components."},
          {l:"Dynamic Load Allowance (DLA)",v:"0.30 for spans < 15 m",n:"Per CSA S6 Table 3.8.4.1. Accounts for impact from moving vehicles."},
        ],
        calculator:{
          id:"bridge_moment",
          title:"Simply Supported Span — Mid-Span Bending Moment",
          desc:"Calculate the mid-span bending moment for a simply supported bridge span under a uniform load. For preliminary sizing only — not a substitute for full CSA S6 analysis.",
          worked_example:{
            source:"CAN/CSA S6-19, Clause 3.8.3 — CL-625 Truck and Lane Load; standard structural mechanics",
            problem:"A simply supported bridge span is 20 m long. The combined superimposed dead load (wearing surface, barriers, utilities) is 6 kN/m and the self-weight of the girder system is 12 kN/m. Calculate the unfactored dead load mid-span moment.",
            solution:"Total dead load: w = 12 + 6 = 18 kN/m\n\nMid-span moment for simply supported UDL:\n  M = wL²/8\n  M = 18 × 20² / 8\n  M = 18 × 400 / 8\n  M = 900 kN·m (unfactored dead load)\n\nFor factored ULS:\n  M_f = 1.25 × D × M_dead + 1.70 × L × M_live\n  (Add CL-625 live load moment via influence lines)\n\nNote: Live load from CL-625 truck must be added using influence lines and the DLA factor. This calculator is for dead load only.",
            note:"Full bridge design requires CSA S6 ULS and SLS load combinations, CL-625 truck positioning for maximum effect, dynamic load allowance, and a P.Eng. stamp. This calculator gives preliminary order-of-magnitude dead load moments only.",
          },
          fields:[
            {id:"span_m",label:"Span length L (m)",default:20,step:1},
            {id:"dead_kNm",label:"Total dead load w (kN/m)",default:18,step:0.5},
          ],
          compute:(vals)=>{
            const M = vals.dead_kNm * vals.span_m * vals.span_m / 8;
            const V = vals.dead_kNm * vals.span_m / 2;
            return [
              {l:"Mid-span moment — dead load (unfactored)",v:`${M.toFixed(0)} kN·m`},
              {l:"End shear — dead load (unfactored)",v:`${V.toFixed(0)} kN`},
              {l:"Next step",v:"Add CL-625 truck live load via influence lines for full ULS design"},
              {l:"Reminder",v:"Apply NBC/S6 load factors before comparing to section capacity"},
            ];
          },
        },
      },
      steel:{
        title:"Structural Steel Design",
        confidence:"high", verified_by:"pe_003", last_verified:"2024-11-05",
        codes:[
          {code:"NBC 2020 Div. B Part 4",full:"National Building Code of Canada 2020 — Structural Loads",body:"National Research Council of Canada (NRC)",scope:"Sets all structural loads for Canadian buildings. Required starting point for all structural design.",conf:"high",ver:"pe_003",date:"2024-11-05",url:"https://nrc.canada.ca/en/certifications-evaluations-standards/codes-canada/codes-canada-publications/national-building-code-canada-2020",label:"NRC — NBC 2020",cdn:true,flags:[]},
          {code:"CSA S16-19",full:"Design of Steel Structures",body:"Canadian Standards Association (CSA)",scope:"The governing Canadian limit states design standard for structural steel buildings. Covers members, connections, stability, and seismic detailing.",conf:"high",ver:"pe_003",date:"2024-11-05",url:"https://www.csagroup.org/store/product/S16-19/",label:"CSA Group — S16",cdn:true,flags:[]},
          {code:"CSA W47.1",full:"Certification of Companies for Fusion Welding of Steel",body:"Canadian Standards Association (CSA)",scope:"Fabricator certification required for all structural welded steel work in Canada. Division 1 or 2 certification depending on weld category.",conf:"high",ver:null,date:null,url:"https://www.csagroup.org/store/product/W47.1-19/",label:"CSA Group — W47.1",cdn:true,flags:[]},
        ],
        reqs:[
          {l:"Steel grade",v:"G40.21 350W (Fy = 350 MPa)",n:"Most common structural steel in Canada. Equivalent to ASTM A572 Grade 50 but specified under the Canadian standard."},
          {l:"Seismic Force Resisting System (SFRS)",v:"Per NBC Table 4.1.8.9 — Rd and Ro factors",n:"Type determines the seismic design force and ductility detailing required. Types include CC, LD, MD, D — higher ductility = lower seismic demand but more stringent detailing."},
          {l:"Section class (seismic)",v:"Class 1 or 2 required for ductile systems",n:"Prevents local buckling before the member reaches its plastic moment. Critical for seismic ductility."},
          {l:"Connection design — seismic",v:"Capacity-protected — connection ≥ 1.1RyMp",n:"Connections must be stronger than the connected member so the member yields before the connection fails."},
          {l:"Fireproofing",v:"Spray-applied or intumescent per NBC fire rating",n:"Confirm fire resistance rating from NBC based on occupancy and building height. Steel must be protected."},
          {l:"Camber",v:"Typically L/300 for beams > 9 m span",n:"Pre-cambering compensates for dead load deflection so the beam is level under service loads."},
          {l:"Fabricator certification",v:"CWB Division 1 or 2 certification required",n:"Canadian Welding Bureau certification. Division 1 for complete joint penetration welds in primary structural members."},
        ],
        calculator:{
          id:"steel_beam",
          title:"Steel Beam — Factored Moment Resistance",
          desc:"Calculate the factored moment resistance (Mr) of a simply supported W-section steel beam under factored loads. Preliminary check only.",
          worked_example:{
            source:"CSA S16-19, Clause 13.5 — Bending; NBC 2020, Table 4.1.3.2 — Load Combinations",
            problem:"A W310×97 steel beam (G40.21 350W) spans 8.0 m simply supported. Factored ULS load = 25 kN/m (dead + live, factored). Does the beam have adequate moment resistance?",
            solution:"Step 1 — Section properties for W310×97:\n  Zx = 1440 × 10³ mm³ (plastic section modulus)\n  Fy = 350 MPa\n\nStep 2 — Factored moment resistance (Class 1 section):\n  Mr = φ × Zx × Fy\n  Mr = 0.90 × 1440×10³ × 350\n  Mr = 453,600,000 N·mm = 454 kN·m\n\nStep 3 — Factored applied moment:\n  Mf = wL²/8 = 25 × 8.0² / 8 = 200 kN·m\n\nStep 4 — Check:\n  Mf = 200 kN·m ≤ Mr = 454 kN·m  ✓\n  Utilization = 200/454 = 44% — beam is adequate",
            note:"This calculation assumes the compression flange is fully braced (Lb ≤ Lu). If the beam is unbraced or partially braced, a lateral-torsional buckling check per CSA S16 Clause 13.6 is required. Always check deflection at SLS as well.",
          },
          fields:[
            {id:"Zx_mm3",label:"Plastic section modulus Zx (× 10³ mm³)",default:1440,step:50},
            {id:"Fy_MPa",label:"Steel yield strength Fy (MPa)",type:"select",opts:[{v:350,l:"350 MPa — G40.21 350W (standard)"},{v:300,l:"300 MPa — G40.21 300W"},{v:450,l:"450 MPa — G40.21 450W (high strength)"}]},
            {id:"wf_kNm",label:"Factored ULS load wf (kN/m)",default:25,step:1},
            {id:"span_m",label:"Span length L (m)",default:8.0,step:0.5},
          ],
          compute:(vals)=>{
            const phi=0.90;
            const Mr=phi*(vals.Zx_mm3*1000)*vals.Fy_MPa/1e6;
            const Mf=vals.wf_kNm*vals.span_m*vals.span_m/8;
            const util=Mf/Mr*100;
            return [
              {l:"Factored moment resistance Mr",v:`${Mr.toFixed(0)} kN·m`},
              {l:"Factored applied moment Mf",v:`${Mf.toFixed(0)} kN·m`},
              {l:"Utilization ratio",v:`${util.toFixed(0)}%`,flag:util>100?"⚠ Mf exceeds Mr — section is inadequate":util>85?"⚠ Over 85% utilized — check deflection carefully":"✓ Section adequate"},
              {l:"Status",v:Mf<=Mr?"✓ Mf ≤ Mr — beam adequate":"✗ Mf > Mr — select a larger section"},
            ];
          },
        },
      },
      wood:{
        title:"Wood & Mass Timber Design",
        confidence:"medium", verified_by:"pe_003", last_verified:"2024-11-05",
        codes:[
          {code:"NBC 2020 Div. B Part 4",full:"National Building Code of Canada 2020 — Structural Loads",body:"National Research Council of Canada (NRC)",scope:"Structural loads including snow, wind, and seismic for all Canadian wood buildings. NBC 2020 permits mass timber buildings up to 12 storeys under specific conditions.",conf:"high",ver:"pe_003",date:"2024-11-05",url:"https://nrc.canada.ca/en/certifications-evaluations-standards/codes-canada/codes-canada-publications/national-building-code-canada-2020",label:"NRC — NBC 2020",cdn:true,flags:[]},
          {code:"CSA O86-19",full:"Engineering Design in Wood",body:"Canadian Standards Association (CSA)",scope:"The governing Canadian standard for structural wood design — sawn lumber, glued-laminated timber (glulam), cross-laminated timber (CLT), and laminated veneer lumber (LVL).",conf:"high",ver:"pe_003",date:"2024-11-05",url:"https://www.csagroup.org/store/product/O86-19/",label:"CSA Group — O86",cdn:true,flags:[]},
          {code:"CSA O122",full:"Structural Glued-Laminated Timber",body:"Canadian Standards Association (CSA)",scope:"Specification for glulam timber production and design values in Canada.",conf:"high",ver:null,date:null,url:"https://www.csagroup.org/store/product/O122-16/",label:"CSA Group — O122",cdn:true,flags:[]},
        ],
        reqs:[
          {l:"CLT panel grades",v:"Per CSA O86 Annex B",n:"Stress grades for cross-laminated timber panels. E1 through E5 for bending-critical elements."},
          {l:"Glulam stress grades",v:"20f-E, 24f-E common for beams",n:"20f-E: Fb = 20 MPa (bending), suitable for most floor and roof beams. 24f-E for higher loads."},
          {l:"Moisture content at installation",v:"19% max (sawn lumber), 15% max (glulam/CLT)",n:"Exceeding these limits causes shrinkage and connection loosening after installation."},
          {l:"Fire design — char rate",v:"0.7 mm/min for structural fire design",n:"In a fire, wood chars at approximately 0.7 mm per minute. The char layer insulates the remaining structural section."},
          {l:"Tall wood buildings (NBC 2020)",v:"Up to 12 storeys — encapsulated mass timber",n:"NBC 2020 permits encapsulated mass timber construction up to 12 storeys. Sprinklers mandatory."},
          {l:"Connection hardware",v:"Stainless or hot-dip galvanized in exposed applications",n:"Standard black steel connectors will corrode in high-humidity or exterior exposures."},
          {l:"Duration of load (DOD) factor",v:"KD — per CSA O86 Table 5.3.2.3",n:"Wood strength is time-dependent. Short-duration loads (snow) permit higher KD than permanent dead load."},
        ],
        calculator:{
          id:"glulam_beam",
          title:"Glulam Beam — Bending Check",
          desc:"Check factored bending stress in a glulam beam against the specified bending resistance. Preliminary design check only.",
          worked_example:{
            source:"CSA O86-19, Clause 6.5 — Bending Resistance of Beams; NBC 2020 load combinations",
            problem:"A 175×570 mm glulam beam (20f-E grade) spans 7.0 m simply supported. Factored ULS load = 8 kN/m. Check bending adequacy.",
            solution:"Step 1 — Section modulus S:\n  S = bh²/6 = 175 × 570²/6 = 9,482,500 mm³ = 9.48 × 10⁶ mm³\n\nStep 2 — Factored bending resistance (Mr):\n  f'b = Fb × KD × KH × KSb × KT = 20 × 1.0 × 1.0 × 1.0 × 1.0 = 20 MPa\n  φ = 0.90\n  Mr = φ × f'b × S = 0.90 × 20 × 9.48×10⁶ = 170.6 × 10⁶ N·mm = 170.6 kN·m\n\nStep 3 — Factored applied moment:\n  Mf = wL²/8 = 8 × 7.0²/8 = 49.0 kN·m\n\nStep 4 — Check:\n  Mf = 49.0 ≤ Mr = 170.6 kN·m  ✓ — 29% utilized",
            note:"This is a simplified check with all modification factors (KD, KH, KSb, KT) = 1.0. Actual design must account for duration of load (KD), system factor (KH), service condition (KSb), and treatment factor (KT) per CSA O86 Table 5.3.2.3.",
          },
          fields:[
            {id:"b_mm",label:"Beam width b (mm)",default:175,step:25},
            {id:"h_mm",label:"Beam depth h (mm)",default:570,step:38},
            {id:"Fb_MPa",label:"Specified bending strength Fb",type:"select",opts:[{v:20,l:"20 MPa — 20f-E glulam (standard beam)"},{v:24,l:"24 MPa — 24f-E glulam (higher loads)"},{v:14,l:"14 MPa — 14c-E (column grade)"}]},
            {id:"wf_kNm",label:"Factored load wf (kN/m)",default:8,step:0.5},
            {id:"span_m",label:"Span L (m)",default:7.0,step:0.5},
          ],
          compute:(vals)=>{
            const S=vals.b_mm*vals.h_mm*vals.h_mm/6;
            const Mr=0.90*vals.Fb_MPa*S/1e6;
            const Mf=vals.wf_kNm*vals.span_m*vals.span_m/8;
            const util=Mf/Mr*100;
            return [
              {l:"Section modulus S",v:`${(S/1e6).toFixed(2)} × 10⁶ mm³`},
              {l:"Factored bending resistance Mr",v:`${Mr.toFixed(1)} kN·m`},
              {l:"Factored applied moment Mf",v:`${Mf.toFixed(1)} kN·m`},
              {l:"Utilization",v:`${util.toFixed(0)}%`,flag:util>100?"⚠ Mf > Mr — increase depth or width":util>85?"⚠ >85% utilized — check deflection":"✓ Adequate"},
            ];
          },
        },
      },
    },
  },

  civil:{
    label:"Civil", icon:"◈", color:"#52d09c",
    desc:"The land itself. Grading, earthworks, geotech, environmental.",
    questions:[
      { id:"civil_type", title:"What is the civil engineering focus?",
        why:{ h:"Why each civil sub-discipline has its own approval path", b:"Site grading and earthwork is reviewed by the municipal engineering department under a grading permit. Geotechnical work is reviewed as part of the building permit and sometimes a site plan approval. Environmental assessments are reviewed by MECP and may require a Record of Site Condition (RSC) filed with the province before a building permit can be issued. Survey work is governed by the provincial Surveys Act. Each has its own authority, approval form, and timeline." },
        opts:[
          {id:"grading",l:"Site grading & earthworks",d:"Cut/fill, compaction, retaining walls, slope stability",i:"ti-mountain"},
          {id:"geotech",l:"Geotechnical / foundations",d:"Soil investigation, bearing capacity, settlement, pile design",i:"ti-layers"},
          {id:"environmental",l:"Environmental / contaminated sites",d:"Phase I/II ESA, remediation, Record of Site Condition",i:"ti-leaf"},
          {id:"idk",l:"Not sure",d:"Help me identify the right category",i:"ti-help-circle",isIDK:true},
        ],
      },
    ],
    results:{
      grading:{
        title:"Site Grading & Earthworks",
        confidence:"medium", verified_by:"pe_002", last_verified:"2025-01-28",
        codes:[
          {code:"O.Reg 406/19",full:"On-Site and Excess Soil Management",body:"MECP Ontario",scope:"Governs movement and reuse of excess soil in Ontario. A Soil Management Plan is required if more than 100 m³ of excess soil is exported from the site. Non-compliance carries significant penalties.",conf:"high",ver:"pe_001",date:"2025-03-14",url:"https://www.ontario.ca/laws/regulation/190406",label:"Ontario e-Laws — O.Reg 406/19",cdn:true,flags:[]},
          {code:"OPSS 206",full:"Construction Specification for Grading",body:"MTO Ontario",scope:"Cut/fill, compaction tolerances, and surface finish for Ontario grading projects. Referenced by most Ontario municipalities.",conf:"high",ver:null,date:null,url:"https://www.ontario.ca/page/ontario-provincial-standard-specifications",label:"MTO — OPSS 206",cdn:true,flags:[]},
          {code:"CFEM 4th Edition",full:"Canadian Foundation Engineering Manual",body:"Canadian Geotechnical Society (CGS)",scope:"Chapter 7 covers compaction and fill design. The primary Canadian geotechnical design reference for all foundation and earthwork design.",conf:"high",ver:"pe_002",date:"2025-01-28",url:"https://www.cgs.ca/en/publications/cfem.html",label:"Canadian Geotechnical Society — CFEM",cdn:true,flags:[]},
        ],
        reqs:[
          {l:"Min. grade away from buildings",v:"2% for first 1.8 m",n:"Prevents surface water from draining toward foundation walls. Basement flooding risk below this minimum."},
          {l:"Max. slope — sodded areas",v:"3:1 (H:V)",n:"Steeper slopes require erosion control matting or a retaining structure."},
          {l:"Min. grade — paved areas",v:"0.5–1.0%",n:"Prevents surface ponding on asphalt and concrete."},
          {l:"Compaction — under roads and slabs",v:"95% Standard Proctor",n:""},
          {l:"Compaction — under footings",v:"98% Standard Proctor",n:"Higher standard because foundation settlement is more critical than slab settlement."},
          {l:"Topsoil management",v:"Strip 150–300 mm, stockpile, and protect",n:"Reuse for surface restoration. Ontario grading permits typically require this."},
          {l:"Excess soil (Ontario)",v:"Soil Management Plan if > 100 m³ exported",n:"O.Reg 406/19 — non-compliance results in Ministry orders and penalties."},
          {l:"Erosion & sediment control",v:"ESDCP required before grading permit",n:"Must be submitted and approved before any earthmoving begins."},
        ],
        calculator:{
          id:"cut_fill",
          title:"Cut & Fill Volume — Average End Area Method",
          desc:"Estimate earthwork volumes between two cross-sections using the average end area method. Standard first approximation for preliminary design.",
          worked_example:{
            source:"Standard civil engineering earthwork practice; OPSS 206 (Ontario grading specification)",
            problem:"A road section has two cross-sections 25 m apart. Section A has a net cut area of 12.5 m². Section B has a net cut area of 8.3 m². Estimate the cut volume between them, and how many 10 m³ trucks will be needed.",
            solution:"Average End Area Method:\n  V = L × (A₁ + A₂) / 2\n\nWhere:\n  L = 25 m (distance between sections)\n  A₁ = 12.5 m² (cut area at Section A)\n  A₂ = 8.3 m² (cut area at Section B)\n\nBank volume (in-situ):\n  V = 25 × (12.5 + 8.3) / 2 = 25 × 10.4 = 260 m³\n\nLoose volume (what goes into trucks):\n  Swell factor for mixed soil = 1.25\n  Loose volume = 260 × 1.25 = 325 m³\n\nNumber of 10 m³ truck loads:\n  325 / 10 = 33 trucks (round up)",
            note:"The average end area method overestimates volume at transitions between cut and fill. Use the prismoidal formula for higher accuracy on large or curved sections. Always apply a swell factor when estimating truck loads.",
          },
          fields:[
            {id:"A1",label:"Cross-section area at Station 1 (m²)",default:12.5,step:0.5},
            {id:"A2",label:"Cross-section area at Station 2 (m²)",default:8.3,step:0.5},
            {id:"L",label:"Distance between sections (m)",default:25,step:5},
            {id:"swell",label:"Soil swell factor",type:"select",opts:[{v:1.10,l:"1.10 — Sandy / granular soil"},{v:1.25,l:"1.25 — Mixed soil (typical)"},{v:1.35,l:"1.35 — Clay"},{v:1.50,l:"1.50 — Rock"}]},
            {id:"truck_m3",label:"Truck capacity (m³)",type:"select",opts:[{v:10,l:"10 m³ (standard)"},{v:16,l:"16 m³ (large dump)"},{v:23,l:"23 m³ (articulated hauler)"}]},
          ],
          compute:(vals)=>{
            const bank = vals.L * (vals.A1 + vals.A2) / 2;
            const loose = bank * vals.swell;
            const trucks = Math.ceil(loose / vals.truck_m3);
            return [
              {l:"Bank volume (in-situ)",v:`${bank.toFixed(1)} m³`},
              {l:"Loose volume (truck measure)",v:`${loose.toFixed(1)} m³`},
              {l:"Truck loads required",v:`${trucks} loads (${vals.truck_m3} m³ trucks)`},
              {l:"Note",v:"Average end area method — add 5–10% contingency for material losses"},
            ];
          },
        },
      },
      environmental:{
        title:"Environmental Site Assessment",
        confidence:"high", verified_by:"pe_001", last_verified:"2025-03-14",
        codes:[
          {code:"CSA Z769",full:"Phase I Environmental Site Assessment",body:"Canadian Standards Association (CSA)",scope:"The national Canadian standard for Phase I ESA scope, methodology, and reporting. Defines what a Phase I must include to be legally defensible.",conf:"high",ver:"pe_001",date:"2025-03-14",url:"https://www.csagroup.org/store/product/CSA-Z769-16/",label:"CSA Group — Z769",cdn:true,flags:[]},
          {code:"Ontario Reg. 153/04",full:"Records of Site Condition",body:"Ministry of the Environment, Conservation and Parks (MECP) Ontario",scope:"RSC filing requirements, Phase I/II scope, and Qualified Person (QP) requirements for Ontario contaminated sites.",conf:"high",ver:"pe_001",date:"2025-03-14",url:"https://www.ontario.ca/laws/regulation/040153",label:"Ontario e-Laws — O.Reg 153/04",cdn:true,flags:[]},
          {code:"CCME Soil Quality Guidelines",full:"Canadian Soil Quality Guidelines for the Protection of Environmental and Human Health",body:"Canadian Council of Ministers of the Environment (CCME)",scope:"National remediation criteria for all contaminants by land use. The scientific basis for contaminated site cleanup across Canada.",conf:"high",ver:"pe_001",date:"2025-03-14",url:"https://ccme.ca/en/resources/canadian-environmental-quality-guidelines",label:"CCME — Canadian Soil Quality Guidelines",cdn:true,flags:[]},
        ],
        reqs:[
          {l:"Phase I ESA",v:"Historical records + site visit + interviews — no sampling",n:"Identifies Recognized Environmental Conditions (RECs) that trigger Phase II. Required before most property transactions and development approvals."},
          {l:"Phase II ESA",v:"Triggered by RECs — soil and groundwater sampling",n:"Laboratory analysis against CCME or O.Reg 153/04 criteria."},
          {l:"RSC (Ontario)",v:"Required before rezoning to a more sensitive land use",n:"Filed through MECP's RAVS online system. Required before building permit can be issued for sensitive uses."},
          {l:"CCME residential PHC F2",v:"260 mg/kg (maximum)",n:"Maximum acceptable petroleum hydrocarbon F2 fraction for residential land use."},
          {l:"Qualified Person (QP)",v:"Required to certify the RSC in Ontario",n:"A P.Eng. or geoscientist with specific O.Reg 153/04 qualifications. Not all P.Engs are QPs."},
          {l:"Excess soil classification",v:"Required before off-site soil movement",n:"O.Reg 406/19 — soil must be characterized and documented before it leaves the site."},
        ],
        calculator:{
          id:"esa_trigger",
          title:"Phase I / RSC Trigger Checker",
          desc:"Determine whether a Phase I ESA and Record of Site Condition (RSC) are triggered by a proposed land use change.",
          worked_example:{
            source:"Ontario Regulation 153/04 as amended; CSA Z769-16 Phase I ESA Standard",
            problem:"A property in Hamilton, Ontario operated as a dry cleaning facility for 30 years. It is being converted to residential townhouses. Is a Phase I ESA required? Is an RSC required?",
            solution:"Step 1 — Former use: Commercial (dry cleaning)\nStep 2 — Proposed use: Residential (sensitive use)\nStep 3 — Is this a change to a MORE sensitive use? Yes.\n\nResults:\n✓ Phase I ESA required under CSA Z769\n✓ Phase II ESA is highly likely:\n  — Dry cleaning is a known source of chlorinated solvents (PCE, TCE)\n  — Former dry cleaning = automatic high-risk REC\n✓ RSC required under O.Reg 153/04 before building permit\n✓ QP must supervise and certify the RSC\n✓ Indoor air testing will likely be required for PCE/TCE\n\nFiling: RSC through MECP RAVS online system",
            note:"Former dry cleaning sites are among the highest-risk contaminated sites in Canada. Chlorinated solvents migrate into groundwater and soil vapour easily. Budget for remediation before making development commitments.",
          },
          fields:[
            {id:"former",label:"Former land use (most recent)",type:"select",opts:[{v:"industrial",l:"Industrial / manufacturing"},{v:"commercial",l:"Commercial / office"},{v:"dryclean",l:"Dry cleaning / auto service / fuel handling"},{v:"gas",l:"Gas station / underground fuel storage"},{v:"agriculture",l:"Agricultural"},{v:"residential",l:"Residential"},{v:"vacant",l:"Vacant / greenfield — no prior industrial"}]},
            {id:"proposed",label:"Proposed land use",type:"select",opts:[{v:"residential",l:"Residential (most sensitive)"},{v:"parkland",l:"Parkland / public open space"},{v:"commercial",l:"Commercial / retail / office"},{v:"industrial",l:"Industrial (least sensitive)"}]},
          ],
          compute:(vals)=>{
            const sensitiveProposed = ["residential","parkland"].includes(vals.proposed);
            const highRiskFormer = ["dryclean","gas","industrial"].includes(vals.former);
            const moreS = sensitiveProposed && !["residential","parkland"].includes(vals.former);
            return [
              {l:"Phase I ESA required?",v:highRiskFormer||moreS ? "Yes — required" : "Likely required for any property transaction",flag:highRiskFormer?"⚠ High-risk former use — assume contamination until Phase II confirms otherwise":""},
              {l:"Phase II ESA likely?",v:highRiskFormer ? "Yes — high-risk former use, RECs expected" : "Depends on Phase I REC findings"},
              {l:"RSC required (Ontario)?",v:moreS ? "Yes — change to more sensitive land use" : "Not triggered by land use change alone — confirm with municipality"},
              {l:"QP required?",v:moreS ? "Yes — for RSC certification under O.Reg 153/04" : "Not required unless RSC is triggered"},
            ];
          },
        },
      },
      geotech:{
        title:"Geotechnical Investigation & Foundation Design",
        confidence:"medium", verified_by:"pe_002", last_verified:"2025-01-28",
        codes:[
          {code:"CFEM 4th Edition",full:"Canadian Foundation Engineering Manual",body:"Canadian Geotechnical Society (CGS)",scope:"The primary Canadian reference for geotechnical investigation, soil classification, bearing capacity, settlement, slope stability, pile design, and foundation engineering.",conf:"high",ver:"pe_002",date:"2025-01-28",url:"https://www.cgs.ca/en/publications/cfem.html",label:"Canadian Geotechnical Society — CFEM 4th Ed.",cdn:true,flags:[]},
          {code:"NBC 2020 Div. B Part 4",full:"National Building Code — Foundation Design Requirements",body:"National Research Council of Canada (NRC)",scope:"Sets minimum requirements for site investigation, bearing capacity, and foundation design for Canadian buildings.",conf:"high",ver:"pe_003",date:"2024-11-05",url:"https://nrc.canada.ca/en/",label:"NRC — NBC 2020",cdn:true,flags:[]},
          {code:"CSA Z767",full:"Pile Driving",body:"Canadian Standards Association (CSA)",scope:"Canadian standard for driven pile installation and monitoring.",conf:"medium",ver:null,date:null,url:"https://www.csagroup.org/",label:"CSA Group — Z767",cdn:true,flags:[]},
        ],
        reqs:[
          {l:"Minimum boreholes — building footprint",v:"1 borehole per 200 m² footprint (min. 3 boreholes)",n:"More boreholes required for variable ground conditions. Geotechnical engineer determines the investigation program."},
          {l:"Borehole depth",v:"Minimum 6 m below proposed foundation level",n:"Deeper if soft or variable soils are encountered, or if pile foundations are being considered."},
          {l:"Allowable bearing pressure — rock",v:"Up to 3,000 kPa (sound rock)",n:"Must be confirmed by a geotechnical engineer on a site-specific basis."},
          {l:"Allowable bearing pressure — compact sand",v:"150–300 kPa",n:"Depends on relative density and depth. SPT N-value used to estimate."},
          {l:"Allowable bearing pressure — stiff clay",v:"100–200 kPa",n:"Consolidation settlement must be checked. Clay consolidates slowly over months to years."},
          {l:"Frost depth — foundation depth",v:"Must extend below provincial frost depth",n:"Ontario: 1.2–1.8 m. Prairie cities: 1.8–2.4 m. Northern Canada: deeper. Foundation bottom must be below frost line."},
          {l:"Groundwater",v:"Record depth during investigation",n:"Groundwater above footing level requires dewatering during construction and waterproofing of foundation walls."},
          {l:"Settlement",v:"Total ≤ 25 mm, differential ≤ 15 mm for most buildings",n:"Per CFEM and NBC. Sensitive structures (hospitals, data centres) require tighter limits."},
        ],
        calculator:{
          id:"bearing_check",
          title:"Spread Footing — Bearing Pressure Check",
          desc:"Calculate the applied bearing pressure under a spread footing and check against the allowable bearing capacity.",
          worked_example:{
            source:"Canadian Foundation Engineering Manual (CFEM), 4th Edition — Chapter 10: Spread Footings",
            problem:"A 2.0 m × 2.0 m square spread footing supports a factored column load of 400 kN and a footing self-weight of 20 kN. The allowable bearing capacity of the stiff clay subgrade is 150 kPa. Is the footing adequate?",
            solution:"Step 1 — Total load on subgrade:\n  P_total = Column load + Footing weight\n  P_total = 400 + 20 = 420 kN\n\nStep 2 — Footing area:\n  A = 2.0 × 2.0 = 4.0 m²\n\nStep 3 — Applied bearing pressure:\n  q_applied = P_total / A = 420 / 4.0 = 105 kPa\n\nStep 4 — Check against allowable:\n  q_applied = 105 kPa ≤ q_allowable = 150 kPa  ✓\n\nResult: Footing is adequate for bearing. A settlement analysis should also be performed for clay subgrades.",
            note:"This is a bearing capacity check only. For clay subgrades, consolidation settlement analysis is equally important — a footing within bearing capacity limits can still settle excessively on soft clay.",
          },
          fields:[
            {id:"P_kN",label:"Column load P (kN)",default:400,step:10},
            {id:"footing_kN",label:"Estimated footing self-weight (kN)",default:20,step:5},
            {id:"B_m",label:"Footing width B (m)",default:2.0,step:0.25},
            {id:"L_m",label:"Footing length L (m)",default:2.0,step:0.25},
            {id:"qa_kPa",label:"Allowable bearing capacity qa (kPa)",type:"select",opts:[{v:100,l:"100 kPa — Soft clay"},{v:150,l:"150 kPa — Stiff clay"},{v:250,l:"250 kPa — Compact sand"},{v:500,l:"500 kPa — Dense gravel / glacial till"},{v:3000,l:"3000 kPa — Sound rock"}]},
          ],
          compute:(vals)=>{
            const P=vals.P_kN+vals.footing_kN;
            const A=vals.B_m*vals.L_m;
            const q=P/A;
            const util=q/vals.qa_kPa*100;
            return [
              {l:"Total load on subgrade",v:`${P} kN`},
              {l:"Footing area",v:`${A.toFixed(2)} m²`},
              {l:"Applied bearing pressure q",v:`${q.toFixed(0)} kPa`,flag:q>vals.qa_kPa?"⚠ Exceeds allowable bearing capacity — increase footing size":"✓ Within allowable bearing capacity"},
              {l:"Utilization",v:`${util.toFixed(0)}%`},
              {l:"Next step",v:"Perform settlement analysis — especially for clay subgrades"},
            ];
          },
        },
      },
    },
  },

  construction:{
    label:"Construction", icon:"▣", color:"#45d0d0",
    desc:"What happens once the drawings hit the field. Specs, contracts, QC, safety.",
    questions:[
      { id:"const_type", title:"What aspect of construction?",
        why:{ h:"Why construction engineering has its own legal framework", b:"Construction engineering in Canada involves three parallel legal streams: technical specifications (OPSS, NMS, MasterFormat), contract law (CCDC 2 — a standard Canadian construction contract), and occupational health and safety law (provincial OHS regulations). Each is enforced by a different authority. Missing a requirement in any of the three streams creates project delays, change orders, or worse — worker injury. Treating specifications as a formality is the most common and costly project delivery mistake." },
        opts:[
          {id:"specs",l:"Specifications & contract documents",d:"OPSS, NMS, MasterFormat, CCDC 2 contract",i:"ti-file-text"},
          {id:"safety",l:"Construction health & safety",d:"Ontario Reg. 213/91, trenching, fall protection, confined space entry",i:"ti-shield"},
          {id:"qc",l:"Quality control & testing",d:"Concrete testing, compaction testing, asphalt, weld inspection",i:"ti-checklist"},
          {id:"idk",l:"Not sure",d:"Help me identify the right category",i:"ti-help-circle",isIDK:true},
        ],
      },
    ],
    results:{
      safety:{
        title:"Construction Health & Safety — Ontario",
        confidence:"high", verified_by:"pe_001", last_verified:"2025-03-14",
        codes:[
          {code:"O.Reg 213/91",full:"Construction Projects Regulation",body:"Ministry of Labour, Training and Skills Development (MLTSD) — Ontario",scope:"Primary Ontario construction health and safety regulation under the Occupational Health and Safety Act (OHSA). Covers shoring, fall protection, confined space, traffic protection, and all major hazards.",conf:"high",ver:"pe_001",date:"2025-03-14",url:"https://www.ontario.ca/laws/regulation/910213",label:"Ontario e-Laws — O.Reg 213/91",cdn:true,flags:[]},
          {code:"OTM Book 7",full:"Temporary Conditions — Traffic Protection",body:"Ministry of Transportation Ontario (MTO)",scope:"Standard for traffic protection plans in road construction zones. Required for any work within or adjacent to a road in Ontario.",conf:"high",ver:null,date:null,url:"https://www.ontario.ca/page/ontario-traffic-manual",label:"MTO — Ontario Traffic Manual Book 7",cdn:true,flags:[]},
          {code:"CSA Z1000",full:"Occupational Health and Safety Management",body:"Canadian Standards Association (CSA)",scope:"National Canadian OHS management system standard. Best-practice framework for construction safety programs across Canada.",conf:"medium",ver:null,date:null,url:"https://www.csagroup.org/store/product/Z1000-14/",label:"CSA Group — Z1000",cdn:true,flags:[]},
        ],
        reqs:[
          {l:"Constructor registration (Ontario)",v:"Required for projects > $50,000",n:"Constructor must register with the Ministry of Labour before construction begins. The Constructor has the highest duty of care on site."},
          {l:"Excavation protection",v:"Required for ALL trenches deeper than 1.2 m",n:"Must be sloped, shored, or shielded — no exceptions. Trench collapses kill workers. This is a life-safety requirement."},
          {l:"Fall protection",v:"Required at ≥ 3.0 m above grade (Ontario)",n:"Guardrails, safety nets, or personal fall arrest system. No exceptions."},
          {l:"Confined space entry",v:"Entry permit + atmospheric testing + rescue plan",n:"Manholes, vaults, and enclosed pipe are all confined spaces. No entry without a written permit and tested atmosphere."},
          {l:"Utility locate before excavation",v:"Ontario One Call — mandatory",n:"Call 1-800-400-2255 or visit on1call.com. Free. Required by law before any ground disturbance."},
          {l:"Traffic protection plan",v:"Required per OTM Book 7",n:"Must be prepared and approved before any work within or adjacent to a road."},
          {l:"First aid on site",v:"Minimum St. John Level 1 first aider at all times",n:""},
          {l:"WSIB coverage",v:"Required for all workers on site",n:"Request a WSIB Clearance Certificate from every contractor and subcontractor before they start work."},
        ],
        calculator:{
          id:"trench_slope",
          title:"Trench Protection — Slope Angle & Width",
          desc:"Determine the minimum required trench wall slope or protection method under Ontario O.Reg 213/91 for a given depth and soil type.",
          worked_example:{
            source:"Ontario Regulation 213/91, Sections 226–239 — Excavations; Ontario Ministry of Labour Construction Health and Safety Pocket Guide",
            problem:"A sanitary sewer trench must be excavated to a depth of 2.4 m in stiff clay in Toronto. What worker protection options are available under O.Reg 213/91?",
            solution:"O.Reg 213/91 requires worker protection for all excavations deeper than 1.2 m.\n\nFor 2.4 m depth in stiff clay, THREE options are permitted:\n\nOption 1 — Sloped walls:\n  Stiff clay slope: 1:1 (H:V) per O.Reg 213/91 Table A\n  For 2.4 m depth: trench walls slope 2.4 m out on each side\n  Total surface width = trench bottom width + 2 × 2.4 = 4.8 m extra\n  Only feasible where surface width permits\n\nOption 2 — Engineered shoring:\n  A P.Eng. must design hydraulic or timber shoring system\n  Shoring drawings must be on site during construction\n\nOption 3 — Prefabricated trench shield (box):\n  Steel trench box placed in excavation\n  Moved incrementally along the trench as work progresses\n  Most common method for urban sewer and watermain work in Ontario",
            note:"Never enter an unprotected trench deeper than 1.2 m. Trench collapses happen without warning. Verify ground conditions daily — rain, groundwater, and vibration can destabilize previously safe conditions.",
          },
          fields:[
            {id:"depth",label:"Trench depth (m)",default:2.4,step:0.1},
            {id:"soil",label:"Soil conditions",type:"select",opts:[{v:"dense_gravel",l:"Dense gravel or compact granular"},{v:"stiff_clay",l:"Stiff clay"},{v:"soft_clay",l:"Soft clay or loose fill"},{v:"rock",l:"Solid rock"}]},
          ],
          compute:(vals)=>{
            const slopes = {
              dense_gravel:{ratio:"1:1 (45°)",hFactor:1.0,note:"Suitable for sloping if surface width allows."},
              stiff_clay:{ratio:"1:1 (45°)",hFactor:1.0,note:"Monitor for tension cracks. Reassess after rain."},
              soft_clay:{ratio:"1.25:1 (38°)",hFactor:1.25,note:"⚠ Soft soils — shoring or trench shield strongly recommended."},
              rock:{ratio:"Vertical (90°) if confirmed stable",hFactor:0,note:"Must be confirmed by competent person. Loose or fractured rock may not be stable."},
            };
            const s = slopes[vals.soil];
            const extraWidth = (s.hFactor * vals.depth * 2).toFixed(2);
            return [
              {l:"Worker protection required?",v:vals.depth > 1.2 ? "Yes — O.Reg 213/91 Section 226" : "Not required — but remain vigilant"},
              {l:"Maximum slope angle",v:s.ratio},
              {l:"Extra surface width if sloped",v:s.hFactor === 0 ? "N/A (vertical)" : `${extraWidth} m wider than trench bottom`},
              {l:"Alternative protection",v:"Engineered shoring (P.Eng. design) or prefabricated trench shield"},
              {l:"Soil note",v:s.note},
            ];
          },
        },
      },
      specs:{
        title:"Construction Specifications & Contracts",
        confidence:"high", verified_by:"pe_001", last_verified:"2025-03-14",
        codes:[
          {code:"OPSS Series",full:"Ontario Provincial Standard Specifications",body:"Ministry of Transportation Ontario (MTO)",scope:"200-series: Earthwork & grading. 300-series: Pavement & granular. 400-series: Sewers & watermains. 900-series: Traffic control. Used by most Ontario municipalities as the base specification in construction contracts.",conf:"high",ver:"pe_001",date:"2025-03-14",url:"https://www.ontario.ca/page/ontario-provincial-standard-specifications",label:"MTO — Ontario Provincial Standard Specifications",cdn:true,flags:[]},
          {code:"CCDC 2",full:"Stipulated Price Contract",body:"Canadian Construction Documents Committee (CCDC)",scope:"Most common Canadian construction contract form for civil and building work. Must always be supplemented with project-specific Supplementary Conditions — the base CCDC 2 is not project-specific.",conf:"high",ver:null,date:null,url:"https://www.ccdc.org/",label:"CCDC — Construction Contract Documents",cdn:true,flags:[]},
          {code:"MasterFormat 2020",full:"Construction Specifications MasterFormat",body:"Construction Specifications Canada (CSC)",scope:"National Canadian standard for organizing construction specifications. Used for building and civil work specifications across Canada.",conf:"high",ver:null,date:null,url:"https://www.csinet.org/",label:"Construction Specifications Canada — MasterFormat",cdn:true,flags:[]},
        ],
        reqs:[
          {l:"OPSS 206",v:"Grading and earthwork",n:"Compaction standards, cut/fill tolerances, and surface finish."},
          {l:"OPSS 310 / 330",v:"Hot mix asphalt and granular base",n:"Mix types, material requirements, compaction, and QC testing for Ontario road construction."},
          {l:"OPSS 410",v:"Pipe sewer installation",n:"Trench preparation, bedding, pipe laying, backfill compaction, and testing."},
          {l:"OPSS 441",v:"Watermain installation",n:"Pressure testing (1.5× working pressure for 2 hours) and disinfection requirements."},
          {l:"CCDC 2 — Supplementary Conditions",v:"Always required — base contract is not project-specific",n:"Missing Supplementary Conditions leaves the contract ambiguous. This is the most common contract document error."},
          {l:"Shop drawing review",v:"Engineer must review and return within contract time",n:"Failure to review on time creates valid change order claims."},
          {l:"Special inspection",v:"Required for footings, piles, and structural fill",n:"Geotechnical engineer or representative must be present. Document in project records."},
          {l:"Construction Act 2017 (Ontario)",v:"Prompt payment — 28-day payment terms",n:"Ontario law. Owners must pay within 28 days of a proper invoice. Adjudication rights apply to payment disputes."},
        ],
        calculator:{
          id:"contract_items",
          title:"Contract Document Completeness Checklist",
          desc:"Verify that your construction contract package is complete before issuing for tender, based on project type.",
          worked_example:{
            source:"CCDC 2 — 2020 Stipulated Price Contract; Ontario Provincial Standard Specifications; Canadian Construction Association best practices",
            problem:"A municipal watermain replacement contract is being prepared for public tender. What documents must be in the complete tender package?",
            solution:"A complete Ontario municipal tender package includes:\n\n1. Instructions to Tenderers (bidding rules)\n2. Form of Tender (the actual bid form)\n3. CCDC 2 — Stipulated Price Contract (base document)\n4. Supplementary Conditions (project-specific modifications)\n5. Division 01 — General Requirements\n   (submittals, RFI process, schedule, testing, project closeout)\n6. Technical Specifications:\n   OPSS 441 (Watermains)\n   OPSS 410 (Pipe Sewers if applicable)\n   OPSS 409 (Air Testing)\n   OPSS 206 (Grading, if applicable)\n7. Geotechnical Data Report (for tenderers' information)\n8. Construction Drawings — stamped P.Eng.\n9. Traffic Protection Plan requirements (OTM Book 7)\n10. WSIB and insurance requirements\n\nMissing any of these creates disputes and change orders.",
            note:"In Ontario, all public construction contracts must comply with the Construction Act, 2017 — including prompt payment (28-day payment terms) and adjudication rights for payment disputes.",
          },
          fields:[
            {id:"proj_type",label:"Project type",type:"select",opts:[{v:"sewer",l:"Sewer / Watermain"},{v:"road",l:"Road construction"},{v:"building",l:"Building"},{v:"bridge",l:"Bridge / structure"}]},
          ],
          compute:(vals)=>{
            const base = [
              "Instructions to Tenderers",
              "Form of Tender (bid form)",
              "CCDC 2 — Stipulated Price Contract",
              "Project Supplementary Conditions",
              "Division 01 — General Requirements",
              "WSIB and insurance requirements",
              "P.Eng.-stamped construction drawings",
              "Construction Act 2017 — prompt payment compliance",
            ];
            const specific = {
              sewer:["OPSS 441 — Watermains","OPSS 410 — Pipe Sewers","OPSS 409 — Air Testing","Geotechnical Data Report","OTM Book 7 — Traffic Protection Plan"],
              road:["OPSS 206 — Grading","OPSS 310 — Hot Mix Asphalt","OPSS 330 — Granular Base","OTM Book 7 — Traffic Protection Plan","Pavement Design Report"],
              building:["Division 03 — Concrete","Division 05 — Structural Steel or Division 06 — Wood","OBC compliance matrix","Special inspection program","Fire protection drawings"],
              bridge:["CSA S6-19 design basis statement","Geotechnical investigation report","Load rating documentation","Fatigue analysis (if steel elements)","Independent peer review record"],
            };
            const items = [...base,...(specific[vals.proj_type]||[])];
            return items.map((d,i)=>({l:`Item ${i+1}`,v:d}));
          },
        },
      },
      qc:{
        title:"Construction Quality Control & Testing",
        confidence:"high", verified_by:"pe_001", last_verified:"2025-03-14",
        codes:[
          {code:"CSA A23.1/A23.2-19",full:"Concrete Materials and Methods — Testing",body:"Canadian Standards Association (CSA)",scope:"Governs concrete sampling, testing (slump, air content, cylinder strength), and QC requirements for Canadian construction.",conf:"high",ver:"pe_001",date:"2025-03-14",url:"https://www.csagroup.org/store/product/A23.1-19-A23.2-19/",label:"CSA Group — A23.1/A23.2",cdn:true,flags:[]},
          {code:"OPSS 330",full:"Construction Specification for Granular Base",body:"MTO Ontario",scope:"Granular base compaction testing requirements — field density testing frequency and acceptance criteria.",conf:"high",ver:null,date:null,url:"https://www.ontario.ca/page/ontario-provincial-standard-specifications",label:"MTO — OPSS 330",cdn:true,flags:[]},
          {code:"OPSS 310",full:"Construction Specification for Hot Mix Asphalt — QC",body:"MTO Ontario",scope:"Asphalt QC testing — Marshall stability, density, gradation, and acceptance criteria for HMA in Ontario.",conf:"high",ver:null,date:null,url:"https://www.ontario.ca/page/ontario-provincial-standard-specifications",label:"MTO — OPSS 310",cdn:true,flags:[]},
          {code:"CSA W47.1",full:"Certification of Companies for Fusion Welding of Steel",body:"Canadian Standards Association (CSA)",scope:"Weld inspection and qualification requirements. CWB-certified inspector required for all structural welds.",conf:"high",ver:null,date:null,url:"https://www.csagroup.org/store/product/W47.1-19/",label:"CSA Group — W47.1",cdn:true,flags:[]},
        ],
        reqs:[
          {l:"Concrete sampling frequency",v:"1 set per 50 m³ or 1 per truck for small pours",n:"Minimum 1 set per day. Each set: 1 slump, 1 air content, 2 cylinders (7-day), 2 cylinders (28-day)."},
          {l:"Concrete cylinder strength",v:"Average of 2 cylinders ≥ f'c at 28 days",n:"Per CSA A23.1. Acceptance based on 28-day compressive strength. One cylinder may fall 3.5 MPa below f'c without rejection."},
          {l:"Concrete slump",v:"Per mix design specification",n:"Maximum 80 mm for formed concrete (typical). Exceeding slump limit without admixture adjustment = reject the load."},
          {l:"Compaction testing frequency",v:"1 test per 500 m² (granular), 1 per 1,000 m² (subgrade)",n:"Per OPSS 330. Nuclear density gauge is the standard field method in Ontario. Laboratory Standard Proctor required for reference."},
          {l:"Compaction acceptance",v:"95% Standard Proctor (granular base and subgrade under roads)",n:"98% under footings and slabs-on-grade where settlement is critical."},
          {l:"Asphalt density",v:"≥ 92% of Marshall density target",n:"Per OPSS 310. In-place density by core or nuclear gauge. Minimum 3 cores per lot."},
          {l:"Weld inspection",v:"CWB-certified inspector for all structural welds",n:"Visual inspection minimum. Ultrasonic testing (UT) or radiographic testing (RT) for full penetration welds per engineer's specification."},
          {l:"Special inspection",v:"Geotechnical engineer present for footings and piles",n:"Footing inspection and pile driving monitoring must be documented and certified by the geotechnical engineer."},
        ],
        calculator:{
          id:"proctor_check",
          title:"Field Compaction — % Standard Proctor",
          desc:"Calculate the percent Standard Proctor achieved in the field based on field dry density and laboratory maximum dry density.",
          worked_example:{
            source:"OPSS 330 (Ontario) — Granular Base Compaction; CSA A23.1 — Concrete QC Sampling",
            problem:"A nuclear density gauge reads a field dry density of 1,980 kg/m³ for a granular base layer. The laboratory maximum dry density (Standard Proctor) for the same material is 2,100 kg/m³. What percent compaction has been achieved? Does it meet the OPSS 330 requirement of 95%?",
            solution:"% Standard Proctor = (Field dry density / Lab max dry density) × 100\n\n% Proctor = (1,980 / 2,100) × 100 = 94.3%\n\nResult: 94.3% < 95% minimum required per OPSS 330.\nAction required: Additional compaction passes needed. Retest after additional compaction.\n\nNote: If moisture content is not within ±2% of optimum, compaction may not improve with additional passes — check moisture and adjust if necessary.",
            note:"The Standard Proctor test (ASTM D698 / ASTM D1557 for Modified Proctor) must be performed on a representative sample of the actual material being placed. Using the wrong reference density is a common QC error.",
          },
          fields:[
            {id:"field_dd",label:"Field dry density (kg/m³)",default:1980,step:10},
            {id:"lab_mdd",label:"Laboratory max dry density — Standard Proctor (kg/m³)",default:2100,step:10},
            {id:"req_pct",label:"Required compaction",type:"select",opts:[{v:95,l:"95% Standard Proctor (roads, granular base)"},{v:98,l:"98% Standard Proctor (under footings, slabs)"},{v:100,l:"100% Standard Proctor (special structures)"}]},
          ],
          compute:(vals)=>{
            const pct=vals.field_dd/vals.lab_mdd*100;
            const pass=pct>=vals.req_pct;
            return [
              {l:"Field dry density",v:`${vals.field_dd} kg/m³`},
              {l:"Lab maximum dry density",v:`${vals.lab_mdd} kg/m³`},
              {l:"% Standard Proctor achieved",v:`${pct.toFixed(1)}%`,flag:pass?"✓ Meets requirement":"⚠ Below required compaction — additional passes required"},
              {l:"Required minimum",v:`${vals.req_pct}%`},
              {l:"Status",v:pass?"✓ PASS":"✗ FAIL — recompact and retest"},
            ];
          },
        },
      },
    },
  },
};
