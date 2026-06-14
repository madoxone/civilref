// Maps a topic's subtype to its primary isometric diagram.
import { TrenchDiagram }        from './TrenchDiagram.jsx';
import { CrossingDiagram }      from './CrossingDiagram.jsx';
import { SlopeDiagram }         from './SlopeDiagram.jsx';
import { RoadDiagram }          from './RoadDiagram.jsx';
import { FootingDiagram }       from './FootingDiagram.jsx';
import { PondDiagram }          from './PondDiagram.jsx';
import { PumpStationDiagram }   from './PumpStationDiagram.jsx';
import { PavementDiagram }      from './PavementDiagram.jsx';
import { ConcreteCoverDiagram } from './ConcreteCoverDiagram.jsx';
import { BridgeSpanDiagram }    from './BridgeSpanDiagram.jsx';
import { GradingDiagram }       from './GradingDiagram.jsx';

export const DIAGRAMS = {
  watermain: TrenchDiagram,         // cover + bedding cross-section
  sanitary:  SlopeDiagram,          // slope between manholes
  storm:     PondDiagram,           // SWM pond
  forcemain: PumpStationDiagram,    // pump station + pressurized main
  geometric: RoadDiagram,           // road cross-section
  pavement:  PavementDiagram,       // layered structure
  concrete:  ConcreteCoverDiagram,  // rebar cover + exposure zone
  bridges:   BridgeSpanDiagram,     // span + CL-625
  grading:   GradingDiagram,        // drainage slopes
  geotech:   FootingDiagram,        // bearing capacity + footing
};

// Optional secondary diagrams shown alongside the main one.
export const SECONDARY_DIAGRAMS = {
  watermain: CrossingDiagram,
};