import { redirect } from "next/navigation";
import Navbar from "./components/Navbar";
import { requireUser } from "./lib/hooks";


export default function Home() {
  const user = requireUser();

  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <Navbar/>
    </div>
  );
}
