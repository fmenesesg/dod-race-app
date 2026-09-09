import * as React from 'react';
import styled from 'styled-components';
import { RACE_MAP_IMAGE, TEAMS_CONFIG } from '../../Config';

const TRACK_WIDTH = 1024;
const TRACK_HEIGHT = 682;

/**
 * Open centerlines on dod-race-map.jpg (1024×682): start near Kubernetes (bottom-left)
 * → finish arch on the right.
 */
const TRACK_PATH_LANE_1 =
  'M 205 592 Q 108 508 90 385 Q 104 262 245 198 Q 405 106 575 84 Q 750 78 910 190 Q 974 296 956 408 Q 942 438 928 452';

const TRACK_PATH_LANE_2 =
  'M 225 572 Q 128 488 110 365 Q 124 242 265 178 Q 425 86 595 64 Q 770 58 930 170 Q 994 276 976 388 Q 962 418 948 432';

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
    offset-distance: ${props => `${props.distance1}%`};
    offset-rotate: auto;
    transform-origin: 35px 35px;
  }

  #car2 {
    offset-path: path('${TRACK_PATH_LANE_2}');
    offset-distance: ${props => `${props.distance2}%`};
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
        <image xlinkHref={`${TEAMS_CONFIG[0].car}.png`} width="70" height="70" />
      </g>
      <g className="car" id="car2">
        <image xlinkHref={`${TEAMS_CONFIG[1].car}.png`} width="70" height="70" />
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
