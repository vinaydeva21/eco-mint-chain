import React from "react";
import logo from "@/assets/karbonledger-logo.png";
import { Link } from "react-router-dom";
interface BrandLogoProps {
  size?: number;
  withText?: boolean;
}
const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 36,
  withText = true
}) => {
  return <Link to="/" className="inline-flex items-center gap-3">
      
      {withText}
    </Link>;
};
export default BrandLogo;