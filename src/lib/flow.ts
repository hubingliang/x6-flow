import { Connector } from "@antv/x6/lib/registry";
import { getBezierPath, Position } from "./getBezierPath";

export interface SmoothConnectorOptions extends Connector.BaseOptions {
  direction?: "H" | "V";
}

export const flow: Connector.Definition<SmoothConnectorOptions> = function (
  sourcePoint,
  targetPoint,
  routePoints,
  options = {}
) {
  let direction = options.direction;
  if (!direction) {
    direction =
      Math.abs(sourcePoint.x - targetPoint.x) >=
      Math.abs(sourcePoint.y - targetPoint.y)
        ? "H"
        : "V";
  }
  const position = {
    sourcePosition:
      direction === "H"
        ? sourcePoint.x - targetPoint.x > 0
          ? Position.Left
          : Position.Right
        : sourcePoint.y - targetPoint.y > 0
        ? Position.Top
        : Position.Bottom,
    targetPosition:
      direction === "H"
        ? sourcePoint.x - targetPoint.x > 0
          ? Position.Right
          : Position.Left
        : sourcePoint.y - targetPoint.y > 0
        ? Position.Bottom
        : Position.Top,
  };
  const res = getBezierPath({
    sourceX: sourcePoint.x,
    sourceY: sourcePoint.y,
    sourcePosition: position.sourcePosition,
    targetX: targetPoint.x,
    targetY: targetPoint.y,
    targetPosition: position.targetPosition,
  });
  console.log(res);
  return res;
};
