import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const Header = () => {
  const navigate = useNavigate();
  return (
    <nav className="w-full h-[60px]  text-white flex items-center justify-between  border-b">
      <Link to={"/"}>
        <h2 className=" select-none font-bold text-xl border p-1 rounded-sm hover:bg-[#30393d] ml-3">
          Js Compiler
        </h2>
      </Link>
      <Button
        variant={"outline"}
        className="mr-3"
        onClick={() => navigate("/compiler")}>
        Compiler
      </Button>
    </nav>
  );
};

export default Header;
