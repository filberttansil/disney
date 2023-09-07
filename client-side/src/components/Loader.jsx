import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
export default function Loader() {
  return (
    <section className="flex justify-center items-center h-screen">
      <ClimbingBoxLoader size={50} color="#172554" />
    </section>
  );
}
