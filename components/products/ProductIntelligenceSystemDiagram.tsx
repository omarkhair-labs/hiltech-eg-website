type Props = {
  slug: string;
};

const mono = "var(--font-hiltech-mono), ui-monospace, monospace";

function Label({ x, y, children, anchor = 'start' }: { x: number; y: number; children: string; anchor?: 'start' | 'middle' | 'end' }) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fill="#57635b"
      fontFamily={mono}
      fontSize="11"
      letterSpacing="1.1"
    >
      {children}
    </text>
  );
}

function Node({ x, y, w, h, label, accent = false }: { x: number; y: number; w: number; h: number; label: string; accent?: boolean }) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        fill={accent ? '#0b120d' : '#eef2ec'}
        stroke={accent ? '#8ff257' : '#8f9a91'}
        strokeWidth="1.5"
      />
      <text
        x={x + w / 2}
        y={y + h / 2 + 4}
        textAnchor="middle"
        fill={accent ? '#dfffd0' : '#263229'}
        fontFamily={mono}
        fontSize="10"
        letterSpacing="0.8"
      >
        {label}
      </text>
    </g>
  );
}

function FiberDiagram() {
  return (
    <g>
      <Label x={72} y={48}>OPTICAL ROUTE</Label>
      <path d="M80 180 C180 90 250 265 350 175 S520 95 640 178 S760 220 860 145" fill="none" stroke="#397329" strokeWidth="5" />
      <path d="M80 200 C180 110 250 285 350 195 S520 115 640 198 S760 240 860 165" fill="none" stroke="#8ff257" strokeOpacity=".45" strokeWidth="2" />
      <Node x={70} y={135} w={120} h={70} label="SOURCE" />
      <Node x={315} y={140} w={130} h={70} label="ODF" accent />
      <Node x={585} y={145} w={130} h={70} label="PATCH" />
      <Node x={805} y={110} w={95} h={95} label="CORE" />
      {[0,1,2,3,4].map((i) => <circle key={i} cx={347 + i * 20} cy={175} r="4" fill={i === 2 ? '#8ff257' : '#607066'} />)}
      <Label x={480} y={312} anchor="middle">CABLE → ODF → CONNECTOR → TRACE</Label>
    </g>
  );
}

function CopperDiagram() {
  return (
    <g>
      <Label x={72} y={48}>HORIZONTAL LINK</Label>
      {[0,1,2,3].map((i) => (
        <path
          key={i}
          d={`M90 ${130 + i * 22} C180 ${85 + i * 22} 240 ${205 + i * 22} 330 ${150 + i * 22} S470 ${95 + i * 22} 555 ${150 + i * 22}`}
          fill="none"
          stroke={i === 1 ? '#8ff257' : '#617066'}
          strokeWidth={i === 1 ? 3 : 2}
          opacity={i === 1 ? 1 : .7}
        />
      ))}
      <Node x={60} y={105} w={125} h={105} label="ENDPOINT" />
      <Node x={535} y={112} w={145} h={95} label="PATCH PANEL" accent />
      <Node x={785} y={120} w={110} h={80} label="SWITCH" />
      <path d="M680 160 H785" stroke="#397329" strokeWidth="4" />
      {[0,1,2,3,4,5].map((i) => <rect key={i} x={560 + i * 18} y={148} width="10" height="12" fill={i === 3 ? '#8ff257' : '#607066'} />)}
      <Label x={480} y={312} anchor="middle">PAIR → CABLE → TERMINATE → TEST</Label>
    </g>
  );
}

function ConnectivityDiagram() {
  return (
    <g>
      <Label x={72} y={48}>CROSS-CONNECT</Label>
      <Node x={72} y={118} w={150} h={95} label="SWITCH" />
      <Node x={405} y={105} w={175} h={120} label="PATCH FIELD" accent />
      <Node x={760} y={118} w={140} h={95} label="EQUIPMENT" />
      {[0,1,2,3,4,5,6].map((i) => <rect key={i} x={430 + i * 18} y={140} width="11" height="13" fill={i === 4 ? '#8ff257' : '#637269'} />)}
      <path d="M222 150 C300 150 310 145 405 145" fill="none" stroke="#397329" strokeWidth="3" />
      <path d="M222 182 C310 182 330 198 405 198" fill="none" stroke="#66756b" strokeWidth="2" />
      <path d="M580 146 C650 146 680 150 760 150" fill="none" stroke="#8ff257" strokeWidth="3" />
      <path d="M580 196 C655 196 690 182 760 182" fill="none" stroke="#66756b" strokeWidth="2" />
      <Label x={480} y={312} anchor="middle">PORT → PATCH → EQUIPMENT</Label>
    </g>
  );
}

function EndpointDiagram() {
  return (
    <g>
      <Label x={72} y={48}>USER EDGE</Label>
      <rect x="94" y="95" width="240" height="155" fill="#eef2ec" stroke="#87948b" strokeWidth="1.5" />
      <rect x="145" y="130" width="62" height="58" fill="#0b120d" stroke="#8ff257" strokeWidth="1.5" />
      <rect x="223" y="130" width="62" height="58" fill="#e4e9e2" stroke="#87948b" strokeWidth="1.5" />
      <Label x={176} y={215} anchor="middle">RJ45</Label>
      <Label x={254} y={215} anchor="middle">MODULE</Label>
      <path d="M207 159 H450 V105 H690" fill="none" stroke="#397329" strokeWidth="4" />
      <path d="M285 159 H470 V220 H690" fill="none" stroke="#65746a" strokeWidth="2" />
      <Node x={690} y={75} w={190} h={175} label="HORIZONTAL CABLE" accent />
      <Label x={480} y={312} anchor="middle">BOX → MODULE → OUTLET → DEVICE</Label>
    </g>
  );
}

function RackDiagram() {
  return (
    <g>
      <Label x={72} y={48}>DATA ROOM FOUNDATION</Label>
      <rect x="110" y="75" width="250" height="205" fill="#0b120d" stroke="#8ff257" strokeWidth="1.5" />
      {[0,1,2,3,4,5,6,7].map((i) => (
        <rect key={i} x={135} y={98 + i * 20} width="150" height="9" fill={i === 3 ? '#8ff257' : '#526158'} />
      ))}
      <rect x="310" y="95" width="18" height="150" fill="#26372b" stroke="#6d7c71" />
      <Label x={205} y={265} anchor="middle">RACK UNITS</Label>
      <Label x={319} y={265} anchor="middle">PDU</Label>
      <path d="M360 155 H530" stroke="#397329" strokeWidth="4" />
      <Node x={530} y={105} w={155} h={100} label="PATCH / ODF" />
      <path d="M685 155 H790" stroke="#69776d" strokeWidth="2" />
      <Node x={790} y={112} w={105} h={85} label="UPLINK" />
      <Label x={480} y={312} anchor="middle">ENCLOSURE → POWER → PATCH → ACCESS</Label>
    </g>
  );
}

function PathwayDiagram() {
  return (
    <g>
      <Label x={72} y={48}>PATHWAY / MAINTAINABILITY</Label>
      <path d="M85 110 H330 V215 H610 V125 H880" fill="none" stroke="#0b120d" strokeWidth="34" strokeLinejoin="round" />
      <path d="M85 110 H330 V215 H610 V125 H880" fill="none" stroke="#8ff257" strokeWidth="3" strokeLinejoin="round" />
      <path d="M330 215 V275" stroke="#69776d" strokeWidth="22" />
      <path d="M610 125 V72" stroke="#69776d" strokeWidth="22" />
      <circle cx="330" cy="215" r="10" fill="#8ff257" />
      <circle cx="610" cy="125" r="10" fill="#397329" />
      <Label x={150} y={92}>ENTRY</Label>
      <Label x={347} y={246}>ACCESS</Label>
      <Label x={625} y={100}>BEND</Label>
      <Label x={800} y={105}>EXIT</Label>
      <Label x={480} y={312} anchor="middle">PATH → BEND → SEPARATE → ACCESS</Label>
    </g>
  );
}

function CctvDiagram() {
  return (
    <g>
      <Label x={72} y={48}>SURVEILLANCE INFRASTRUCTURE</Label>
      <g transform="translate(95 100)">
        <circle cx="36" cy="36" r="30" fill="#eef2ec" stroke="#87948b" />
        <path d="M62 30 L115 12 L104 62 Z" fill="rgba(143,242,87,.18)" stroke="#397329" />
        <Label x={36} y={92} anchor="middle">CAM 01</Label>
      </g>
      <g transform="translate(95 205)">
        <circle cx="36" cy="36" r="30" fill="#eef2ec" stroke="#87948b" />
        <path d="M62 30 L115 12 L104 62 Z" fill="rgba(143,242,87,.18)" stroke="#397329" />
        <Label x={36} y={92} anchor="middle">CAM 02</Label>
      </g>
      <path d="M210 136 H410 M210 241 H410" stroke="#397329" strokeWidth="3" />
      <Node x={410} y={132} w={150} h={105} label="POE / NETWORK" accent />
      <path d="M560 184 H700" stroke="#8ff257" strokeWidth="4" />
      <Node x={700} y={132} w={185} h={105} label="CONTROL / REVIEW" />
      <Label x={480} y={312} anchor="middle">CAMERA → LINK → CONTROL → REVIEW</Label>
    </g>
  );
}

export default function ProductIntelligenceSystemDiagram({ slug }: Props) {
  return (
    <svg
      viewBox="0 0 960 340"
      role="img"
      aria-label="Illustrative physical system context"
      className="hiltech-product-intelligence-system-svg"
      data-intel-system-diagram
    >
      <rect width="960" height="340" fill="#f3f5f0" />
      <path d="M0 70H960M0 170H960M0 270H960M160 0V340M480 0V340M800 0V340" stroke="#0a0e0b" strokeOpacity=".035" />
      {slug === 'fiber-optic-systems' ? <FiberDiagram /> : null}
      {slug === 'copper-cat6-cabling' ? <CopperDiagram /> : null}
      {slug === 'patch-cords-connectivity' ? <ConnectivityDiagram /> : null}
      {slug === 'faceplates-keystone-rj45' ? <EndpointDiagram /> : null}
      {slug === 'cabinets-racks-pdu' ? <RackDiagram /> : null}
      {slug === 'cable-management-duct-systems' ? <PathwayDiagram /> : null}
      {slug === 'cctv-security' ? <CctvDiagram /> : null}
    </svg>
  );
}
