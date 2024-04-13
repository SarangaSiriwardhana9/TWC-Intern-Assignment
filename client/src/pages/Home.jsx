
import { useSelector } from "react-redux";
export default function Home() {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  return (
    <div className="relative min-h-screen bg-[#083F46] overflow-hidden">

     
    </div>
  );
}
