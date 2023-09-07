import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
export default function Loader() {
  return (
    <section className="ml-64 flex justify-center items-center h-screen">
      <ClimbingBoxLoader size={50} />
    </section>
  );
}
