import Image from "next/image";
import Topbar from "../components/shared/Topbar";

export default function Home() {
  return (
    <div className="container">
      <h1>Welcome to Home</h1>
      <div className="h-screen border">
        <h2>Hi!</h2>
      </div>
      <div className="container h-screen border">
        <h2>Hello, World</h2>
      </div>
    </div>
  );
}
