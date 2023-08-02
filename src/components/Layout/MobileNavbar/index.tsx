import React, { useEffect, useState } from "react";
import { useLocation, Link, LinkProps } from "react-router-dom";
import { HeaderMenuTitles } from "../../../data";

interface CustomLinkProps extends LinkProps {
  active: boolean;
}

const CustomLink: React.FC<CustomLinkProps> = ({ active, ...props }) => {
  return (
    <Link
      {...props}
      className={`cursor-pointer hover:text-primary ${
        active
          ? "bg-gradient-to-r from-cyan-300 text-transparent to-emerald-300"
          : "text-white"
      }`}
    />
  );
};

const MobileNavbar: React.FC = () => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    const pathSegments = location.pathname.split("/");
    setCurrentPath(pathSegments[pathSegments.length - 1]);
  }, [location]);

  return (
    <div
      className="fixed bottom-0 w-full border-t-[2px] p-[14px] py-[10px] px-5 
      border-[#132236] bg-[#071018] flex justify-between text-xl z-10"
    >
      {HeaderMenuTitles.map((item, index) => (
        <CustomLink
          to={item.link}
          active={currentPath === item.link}
          key={index}
        >
          {item.content}
        </CustomLink>
      ))}
    </div>
  );
};

export default MobileNavbar;
