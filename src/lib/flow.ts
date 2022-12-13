import { Curve, Path } from "@antv/x6";
import { Connector } from "@antv/x6/lib/registry";
// import {  } from "./index";
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
  let path;
  let direction = options.direction;
  console.log("sourcePoint: ", sourcePoint.x);
  console.log("routePoints: ", routePoints);
  console.log("targetPoint: ", targetPoint);
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
  if (routePoints && routePoints.length !== 0) {
    const points = [sourcePoint, ...routePoints, targetPoint];
    console.log("points: ", points);
    const curves = Curve.throughPoints(points);
    console.log("curves: ", curves);
    path = new Path(curves);
  } else {
    // If we have no route, use a default cubic bezier curve, cubic bezier
    // requires two control points, the control points have `x` midway
    // between source and target. This produces an S-like curve.

    path = new Path();
    path.appendSegment(Path.createSegment("M", sourcePoint));
  }
  console.log("options.raw : ", options.raw);
  console.log("options: ", options);

  console.log("path: ", path.serialize());
  return options.raw ? path : path.serialize();
};
