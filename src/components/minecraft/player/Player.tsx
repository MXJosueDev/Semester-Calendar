import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { Player3D } from "./Player3D";
import { PerspectiveCamera } from "@react-three/drei";
import { isMilestoneCompleted } from "@/utils/calendar";
import { isMilestoneCompletedBySlot } from "@/utils/milestone";

const HEAD_ROTATION_MAX_X = 0.6;
const HEAD_ROTATION_MAX_Y = 0.4;
const HEAD_ROTATION_MULTIPLIER_X = 2;
const HEAD_ROTATION_MULTIPLIER_Y = 1.5;

const Player = () => {
  const [headRotation, setHeadRotation] = useState<[number, number, number]>([0, 0, 0]);
  const frameRef = useRef<number | null>(null);
  const targetRotationRef = useRef<[number, number, number]>([0, 0, 0]);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      const normalizedX = event.clientX / window.innerWidth;
      const normalizedY = event.clientY / window.innerHeight;

      const horizontalRotation = Math.max(
        -HEAD_ROTATION_MAX_X,
        Math.min(HEAD_ROTATION_MAX_X, (normalizedX - 0.5) * HEAD_ROTATION_MULTIPLIER_X)
      );
      const verticalRotation = Math.max(
        -HEAD_ROTATION_MAX_Y,
        Math.min(HEAD_ROTATION_MAX_Y, (0.5 - normalizedY) * HEAD_ROTATION_MULTIPLIER_Y)
      );

      targetRotationRef.current = [verticalRotation, horizontalRotation, 0];

      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }

      frameRef.current = requestAnimationFrame(() => {
        setHeadRotation(targetRotationRef.current);
        frameRef.current = null;
      });
    };

    const handlePointerLeave = () => {
      targetRotationRef.current = [0, 0, 0];
      setHeadRotation([0, 0, 0]);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("blur", handlePointerLeave);
    document.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("blur", handlePointerLeave);
      document.removeEventListener("pointerleave", handlePointerLeave);

      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);



  return (
    <div className="player slot-border">
      <Canvas>
        <ambientLight intensity={1.5} color="#ffffff" />

        <PerspectiveCamera makeDefault position={[0, 1, 3.5]} />

        <Suspense fallback={null}>
          <Player3D
            helmetActive={isMilestoneCompletedBySlot("helmet")}
            chestplateActive={isMilestoneCompletedBySlot("chestplate")}
            leggingsActive={isMilestoneCompletedBySlot("leggings")}
            bootsActive={isMilestoneCompletedBySlot("boots")}
            headRotation={headRotation}
            rotation={[0, Math.PI, 0]}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Player;
