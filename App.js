import { Canvas, useImage, Image } from "@shopify/react-native-skia";
import { useEffect } from "react";
import { useWindowDimensions } from "react-native";
import {
  useSharedValue,
  withTiming,
  Easing,
  withSequence,
  withRepeat,
} from "react-native-reanimated";

const App = () => {
  const { width, height } = useWindowDimensions();

  const bg = useImage(require("./assets/sprites/background-day.png"));
  const bird = useImage(require("./assets/sprites/yellowbird-upflap.png"));
  const pipeBottom = useImage(require("./assets/sprites/pipe-green.png"));
  const pipeTop = useImage(require("./assets/sprites/pipe-green-top.png"));
  const base = useImage(require("./assets/sprites/base.png"));

  const x = useSharedValue(width);
  useEffect(() => {
    x.value = withRepeat(
      withSequence(
        withTiming(-150, { duration: 3000, easing: Easing.linear }),
        withTiming(width, { duration: 0 })
      ) - 1
    );
  }, []);

  const pipeOffset = 0;

  return (
    <Canvas style={{ width, height }}>
      {/*back ground*/}
      <Image image={bg} width={width} height={height} fit={"cover"} />

      {/*pipe*/}
      <Image
        image={pipeTop}
        y={pipeOffset - 320}
        x={x}
        width={104}
        height={640}
      />

      <Image
        image={pipeBottom}
        y={height - 300 + pipeOffset}
        x={x}
        width={104}
        height={640}
      />

      {/*base*/}
      <Image image={base} y={height - 75} x={0} width={width} height={150} />
      {/*bird*/}
      <Image image={bird} y={height / 2} x={width / 4} width={64} height={48} />
      {/*if we want the bird to be at the center we should do height /2 - "the
      half of the bird "*/}
    </Canvas>
  );
};
export default App;
