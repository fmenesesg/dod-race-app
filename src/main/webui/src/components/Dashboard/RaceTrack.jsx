import * as React from 'react';
import styled from 'styled-components';
import { RACE_MAP_IMAGE, TEAMS_CONFIG } from '../../Config';

const TRACK_WIDTH = 1024;
const TRACK_HEIGHT = 682;
const RACER_SIZE = 70;

/**
 * Outer-loop centerline on dod-race-map.jpg (1024×682).
 * 0% = FINISH arch; progress runs counter-clockwise on the asphalt:
 * FINISH → Helm → CI/CD → Linux → Kubernetes → DevOps → Observability → FINISH.
 * (Git / Containers / Cloud Native are infield — not on the road.)
 */
const TRACK_PATH_LANE_1 =
  'M 911.0 393.0 L 927.0 340.0 L 910.0 282.0 L 885.0 225.0 L 831.0 170.0 L 763.0 126.0 L 680.0 99.0 L 578.0 82.0 L 454.0 76.0 L 323.0 82.0 L 233.0 116.0 L 176.0 128.0 L 117.0 206.0 L 96.0 237.0 L 88.0 298.0 L 97.0 367.0 L 114.0 424.0 L 153.0 494.0 L 191.0 522.0 L 235.0 565.0 L 301.0 594.0 L 380.0 615.0 L 472.0 627.0 L 556.0 614.0 L 659.0 604.0 L 729.0 595.0 L 795.0 565.0 L 840.0 524.0 L 864.0 473.0 L 907.0 429.0 L 911.0 393.0';

const TRACK_PATH_LANE_2 =
  'M 922.5 396.5 L 938.5 336.6 L 921.0 277.2 L 893.6 216.6 L 837.5 159.9 L 766.7 114.6 L 682.0 87.2 L 578.6 70.0 L 453.5 64.0 L 318.8 70.8 L 230.5 104.3 L 166.4 120.8 L 107.1 199.3 L 84.1 235.4 L 76.1 299.6 L 85.5 370.4 L 103.5 429.8 L 145.9 503.7 L 182.6 530.6 L 230.2 576.0 L 297.9 605.6 L 378.4 626.9 L 473.8 638.9 L 557.2 625.9 L 660.5 615.9 L 734.0 605.9 L 803.1 573.9 L 850.9 529.1 L 872.6 481.4 L 918.9 430.3 L 922.9 394.3';

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
