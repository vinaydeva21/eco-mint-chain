import React from "react";
import logo from "@/assets/karbonledger-logo.png";
import { Link } from "react-router-dom";

interface BrandLogoProps {
  size?: number;
  withText?: boolean;
}

const BrandLogo: React.FC<BrandLogoProps> = ({ size = 36, withText = true }) => {
  return (
    <Link to="/" className="inline-flex items-center gap-3">
      <img
        src={logo}
        width={size}
        height={size}
        loading="lazy"
        alt="KarbonLedger logo – water droplet and ledger mark"
        className="select-none"
      />
      {withText && (
        <span className="text-lg font-semibold tracking-tight">KarbonLedger</span>
      )}
    </Link>
  );
};

export default BrandLogo;
