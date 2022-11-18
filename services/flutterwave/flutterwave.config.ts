import Flw from "flutterwave-node-v3";

const FlutterWave = new Flw(
  process.env.FLUTTERWAVE_TEST_PUBLIC_KEY,
  process.env.FLUTTERWAVE_TEST_SECRET_KEY,
);

export default FlutterWave;
