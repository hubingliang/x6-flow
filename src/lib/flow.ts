import { Curve, Path } from "@antv/x6";
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
  const res = getBezierPath({
    sourceX: sourcePoint.x,
    sourceY: sourcePoint.y,
    sourcePosition: Position.Bottom,
    targetX: targetPoint.x,
    targetY: targetPoint.y,
    targetPosition: Position.Top,
  });
  console.log(res);
  return res;
};
