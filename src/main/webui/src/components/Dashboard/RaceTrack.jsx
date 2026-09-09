import * as React from 'react';
import styled from 'styled-components';
import { RACE_MAP_IMAGE, TEAMS_CONFIG } from '../../Config';

const TRACK_WIDTH = 1024;
const TRACK_HEIGHT = 682;
const RACER_SIZE = 70;
const RACER_ANCHOR = RACER_SIZE / 2;

/**
 * Centerlines on dod-race-map.jpg (1024×682).
 * Path starts at the FINISH arch (right) and follows the circuit counter-clockwise.
 */
const TRACK_PATH_LANE_1 =
  'M 928 418 Q 868 260 780 155 Q 560 52 300 95 Q 95 145 88 310 Q 120 395 255 365 Q 470 345 560 360 Q 710 335 770 455 Q 835 565 735 615 Q 520 655 245 615 Q 115 520 145 430 Q 260 360 520 375 Q 760 365 928 418';

const TRACK_PATH_LANE_2 =
  'M 948 438 Q 888 280 800 175 Q 580 72 320 115 Q 115 165 108 330 Q 140 415 275 385 Q 490 365 580 380 Q 730 355 790 475 Q 855 585 755 635 Q 540 675 265 635 Q 135 540 165 450 Q 280 380 540 395 Q 780 385 948 438';

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
    offset-anchor: ${RACER_ANCHOR}px ${RACER_ANCHOR}px;
  }

  #car1 {
    offset-path: path('${TRACK_PATH_LANE_1}');
    offset-distance: ${(props) => `${props.distance1}%`};
    offset-rotate: auto;
  }

  #car2 {
    offset-path: path('${TRACK_PATH_LANE_2}');
    offset-distance: ${(props) => `${props.distance2}%`};
    offset-rotate: auto;
  }

  .racer {
    transform: translate(${-RACER_ANCHOR}px, ${-RACER_ANCHOR}px);
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
          className="racer"
          xlinkHref={`${TEAMS_CONFIG[0].car}.png`}
          width={RACER_SIZE}
          height={RACER_SIZE}
        />
      </g>
      <g className="car" id="car2">
        <image
          className="racer"
          xlinkHref={`${TEAMS_CONFIG[1].car}.png`}
          width={RACER_SIZE}
          height={RACER_SIZE}
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
