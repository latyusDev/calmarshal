import { redirect } from "next/navigation";
import Navbar from "./components/Navbar";


export default function Home() {

  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <Navbar/>
    </div>
  );
}
