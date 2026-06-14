// Canadian municipalities, the 5 verified ones with full profiles, and the
// provincial regulatory context for every province.

export const ALL_MUNIS = [
  "Toronto, ON","Mississauga, ON","Brampton, ON","Ottawa, ON","Hamilton, ON","London, ON",
  "Markham, ON","Vaughan, ON","Kitchener, ON","Windsor, ON","Thunder Bay, ON","Sudbury, ON",
  "Vancouver, BC","Surrey, BC","Burnaby, BC","Richmond, BC","Kelowna, BC","Victoria, BC",
  "Calgary, AB","Edmonton, AB","Red Deer, AB","Lethbridge, AB","Fort McMurray, AB",
  "Winnipeg, MB","Regina, SK","Saskatoon, SK",
  "Halifax, NS","Moncton, NB","Fredericton, NB","St. John's, NL",
  "Charlottetown, PE","Yellowknife, NT","Whitehorse, YT",
];

export const VERIFIED_MUNIS = ["Toronto, ON","Ottawa, ON","Calgary, AB","Edmonton, AB","Vancouver, BC"];

export const PROV_CONTEXT = {
  ON:{ buildingCode:"Ontario Building Code (O.Reg 332/12)", ohs:"Occupational Health & Safety Act + O.Reg 213/91 (Construction Projects)", ohsRegulator:"Ontario Ministry of Labour, Immigration, Training and Skills Development", env:"Ministry of the Environment, Conservation and Parks (MECP)", transport:"Ministry of Transportation Ontario (MTO)", oneCall:"Ontario One Call — 1-800-400-2255", esa:"O.Reg 153/04 (Records of Site Condition)" },
  AB:{ buildingCode:"National Building Code – 2023 Alberta Edition (NBC-AE)", ohs:"Alberta OHS Act, Regulation and Code", ohsRegulator:"Alberta Occupational Health and Safety", env:"Alberta Environment and Protected Areas (EPA)", transport:"Alberta Transportation and Economic Corridors", oneCall:"Alberta One-Call — 1-800-242-3447", esa:"Alberta Environmental Protection and Enhancement Act (EPEA)" },
  BC:{ buildingCode:"BC Building Code 2024", ohs:"Workers Compensation Act + OHS Regulation", ohsRegulator:"WorkSafeBC", env:"BC Ministry of Environment and Climate Change Strategy", transport:"BC Ministry of Transportation and Infrastructure (MoTI)", oneCall:"BC 1 Call — 1-800-474-6886", esa:"BC Environmental Management Act + Contaminated Sites Regulation" },
  MB:{ buildingCode:"Manitoba Building Code", ohs:"Manitoba Workplace Safety & Health Act", ohsRegulator:"SAFE Work Manitoba", env:"Manitoba Environment and Climate Change", transport:"Manitoba Transportation and Infrastructure", oneCall:"Click Before You Dig MB — 1-800-940-3447", esa:"Manitoba Contaminated Sites Remediation Act" },
  SK:{ buildingCode:"National Building Code (SK adoption)", ohs:"Saskatchewan Employment Act + OHS Regulations", ohsRegulator:"Saskatchewan Ministry of Labour Relations and Workplace Safety", env:"Saskatchewan Ministry of Environment", transport:"Saskatchewan Ministry of Highways", oneCall:"Sask 1st Call — 1-866-828-4888", esa:"Saskatchewan Environmental Management and Protection Act" },
  NS:{ buildingCode:"Nova Scotia Building Code Regulations", ohs:"Nova Scotia OHS Act", ohsRegulator:"Nova Scotia Labour, Skills and Immigration", env:"Nova Scotia Environment and Climate Change", transport:"Nova Scotia Public Works", oneCall:"Info Excavation / call before you dig", esa:"NS Contaminated Sites Regulations" },
  NB:{ buildingCode:"National Building Code (NB adoption)", ohs:"New Brunswick OHS Act", ohsRegulator:"WorkSafeNB", env:"NB Department of Environment and Local Government", transport:"NB Department of Transportation and Infrastructure", oneCall:"Info Excavation NB", esa:"NB Clean Environment Act" },
  NL:{ buildingCode:"National Building Code (NL adoption)", ohs:"NL OHS Act and Regulations", ohsRegulator:"WorkplaceNL", env:"NL Department of Environment and Climate Change", transport:"NL Department of Transportation and Infrastructure", oneCall:"call before you dig", esa:"NL Environmental Protection Act" },
  PE:{ buildingCode:"National Building Code (PEI adoption)", ohs:"PEI OHS Act", ohsRegulator:"Workers Compensation Board of PEI", env:"PEI Department of Environment, Energy and Climate Action", transport:"PEI Department of Transportation and Infrastructure", oneCall:"call before you dig", esa:"PEI Environmental Protection Act" },
  NT:{ buildingCode:"National Building Code (NWT adoption)", ohs:"NWT Safety Act + OHS Regulations", ohsRegulator:"Workers' Safety and Compensation Commission (WSCC)", env:"NWT Department of Environment and Climate Change", transport:"NWT Department of Infrastructure", oneCall:"contact local utilities", esa:"NWT Environmental Protection Act" },
  YT:{ buildingCode:"National Building Code (Yukon adoption)", ohs:"Yukon OHS Act + Regulations", ohsRegulator:"Yukon Workers' Safety and Compensation Board", env:"Yukon Department of Environment", transport:"Yukon Highways and Public Works", oneCall:"contact local utilities", esa:"Yukon Environment Act" },
};

export const MUNI_PROFILES = {
  "Toronto, ON":{
    prov:"ON",
    water:{ authority:"Toronto Water — Engineering & Construction Services", doc:"City of Toronto Design Criteria for Sewers and Watermains", url:"https://www.toronto.ca/services-payments/water-environment/engineering-construction-water-management/", coverWater:"1.7 m minimum to obvert (≈2.0 m under arterial roads)", coverSan:"1.8 m minimum to obvert; 2.4 m under roadways", coverConf:"medium", idf:"City of Toronto IDF curves (2019 update — Engineering Services)", trunkAuthority:"Toronto Water (city operates its own water/sewer; no separate regional utility)", note:"Toronto operates its own water and wastewater systems directly — there is no separate regional authority above the City." },
  },
  "Ottawa, ON":{
    prov:"ON",
    water:{ authority:"City of Ottawa — Infrastructure Services (Water & Sewer)", doc:"City of Ottawa Sewer Design Guidelines + Water Distribution Design Guidelines", url:"https://ottawa.ca/en/business/development-applications/development-application-review-process/engineering", coverWater:"2.4 m minimum to obvert (Ottawa's frost depth exceeds Toronto's)", coverSan:"2.5 m minimum to obvert", coverConf:"medium", idf:"City of Ottawa IDF curves (rainfall intensity from City climate stations)", trunkAuthority:"City of Ottawa operates its own systems", note:"Ottawa is colder than Toronto — design cover is deeper. Confirm exact depth-of-cover in the current City of Ottawa guidelines." },
  },
  "Calgary, AB":{
    prov:"AB",
    water:{ authority:"City of Calgary — Water Resources", doc:"City of Calgary Standard Specifications (Waterworks & Sewer) + Design Guidelines for Subdivision Servicing", url:"https://www.calgary.ca/water.html", coverWater:"2.4 m minimum to obvert (cold-climate frost protection)", coverSan:"2.5 m minimum to obvert", coverConf:"medium", idf:"City of Calgary IDF curves (Water Resources)", trunkAuthority:"City of Calgary Water Resources", note:"Calgary's design standards are administered by Water Resources; confirm frost depth and bury requirements in the current Calgary Standard Specifications." },
  },
  "Edmonton, AB":{
    prov:"AB",
    water:{ authority:"EPCOR — Water Services & Drainage Services (NOT the City of Edmonton)", doc:"EPCOR Design and Construction Standards (Water, Sanitary & Drainage)", url:"https://www.epcor.com/", coverWater:"2.5 m minimum to obvert (one of the deepest frost depths among major Canadian cities)", coverSan:"2.5–3.0 m minimum to obvert", coverConf:"medium", idf:"EPCOR / City of Edmonton IDF curves", trunkAuthority:"EPCOR (assumed City drainage services in 2017)", note:"Critical: in Edmonton, water, wastewater AND stormwater drainage are all operated by EPCOR — not the City. Submit design to EPCOR, not a City department." },
  },
  "Vancouver, BC":{
    prov:"BC",
    water:{ authority:"City of Vancouver — Engineering Services (local); Metro Vancouver (regional trunk & supply)", doc:"City of Vancouver Engineering Design Manual + Subdivision & Servicing Bylaw", url:"https://vancouver.ca/home-property-development/water-and-sewers.aspx", coverWater:"1.0–1.2 m minimum to obvert (mild coastal climate — minimal frost)", coverSan:"1.0 m minimum to obvert", coverConf:"medium", idf:"City of Vancouver IDF curves; Metro Vancouver rainfall data", trunkAuthority:"Metro Vancouver (regional water supply and regional sewerage/trunk mains)", note:"Vancouver's mild climate means shallow cover. Local distribution is City of Vancouver; regional supply and trunk sewers are Metro Vancouver — confirm which applies to your pipe size." },
  },
};
