import * as React from 'react';
import styled from 'styled-components';
import { RACE_MAP_IMAGE, TEAMS_CONFIG } from '../../Config';

const TRACK_WIDTH = 1024;
const TRACK_HEIGHT = 682;
const RACER_SIZE = 70;

/**
 * Centerlines on dod-race-map.jpg (1024×682), snapped to the asphalt loop.
 * 0% = FINISH arch (right); progress follows the road clockwise:
 * FINISH → Observability → DevOps → Kubernetes → Linux → CI/CD → Helm → FINISH.
 */
const TRACK_PATH_LANE_1 =
  'M 911.0 393.0 L 925.0 435.0 L 919.0 485.0 L 890.0 545.0 L 829.0 598.0 L 732.0 626.0 L 618.0 627.0 L 498.0 623.0 L 393.0 570.0 L 278.0 537.0 L 195.0 485.0 L 129.0 420.0 L 88.0 345.0 L 107.0 261.0 L 146.0 201.0 L 210.0 128.0 L 346.0 109.0 L 501.0 83.0 L 661.0 75.0 L 790.0 95.0 L 885.0 141.0 L 910.0 215.0 L 911.0 393.0';

const TRACK_PATH_LANE_2 =
  'M 899.6 396.8 L 913.1 433.6 L 908.2 479.8 L 882.1 535.9 L 825.7 586.5 L 731.9 614.0 L 618.4 615.0 L 503.4 612.3 L 396.3 558.5 L 284.4 526.8 L 203.4 476.5 L 139.5 414.2 L 99.7 347.6 L 117.1 267.5 L 155.0 208.9 L 211.7 139.9 L 348.0 120.8 L 501.6 95.0 L 659.2 86.9 L 784.8 105.8 L 873.6 144.8 L 898.0 215.1 L 899.0 393.1';

const RaceDiv = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  position: fixed;
  left: 350px;
  top: 0;
  right: 0;
  bottom: 0;

  svg {
    height: auto;
    width: 100%;
  }

  .car {
    transition: offset-distance 2000ms linear;
    image-rendering: auto;
  }

  #car1 {
    offset-path: path('${TRACK_PATH_LANE_1}');
    offset-distance: ${(props) => `${props.distance1}%`};
    offset-rotate: auto;
    transform-origin: 35px 35px;
  }

  #car2 {
    offset-path: path('${TRACK_PATH_LANE_2}');
    offset-distance: ${(props) => `${props.distance2}%`};
    offset-rotate: auto;
    transform-origin: 35px 35px;
  }
`;

function RaceTrackSvg(props) {
  return (
    <svg
      width={TRACK_WIDTH}
      height={TRACK_HEIGHT}
      viewBox={`0 0 ${TRACK_WIDTH} ${TRACK_HEIGHT}`}
      xmlSpace="preserve"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Mapa Carrera Espacial DevOpsDays Santiago 2026"
      {...props}
    >
      <image
        width={TRACK_WIDTH}
        height={TRACK_HEIGHT}
        preserveAspectRatio="xMidYMid meet"
        xlinkHref={RACE_MAP_IMAGE}
      />

      <g className="car" id="car1">
        <image
          xlinkHref={`${TEAMS_CONFIG[0].car}.png`}
          width={RACER_SIZE}
          height={RACER_SIZE}
          x={-RACER_SIZE / 2}
          y={-RACER_SIZE / 2}
        />
      </g>
      <g className="car" id="car2">
        <image
          xlinkHref={`${TEAMS_CONFIG[1].car}.png`}
          width={RACER_SIZE}
          height={RACER_SIZE}
          x={-RACER_SIZE / 2}
          y={-RACER_SIZE / 2}
        />
      </g>
    </svg>
  );
}

function RaceTrack(props) {
  return (
    <RaceDiv distance1={props.distances[0]} distance2={props.distances[1]}>
      <RaceTrackSvg />
    </RaceDiv>
  );
}

export default RaceTrack;
