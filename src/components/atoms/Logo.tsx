import { Link } from "@mui/material";
import { appendUrlPath } from "../../utils/path";

type LogoProps = {
  size: number;
};

export function Logo({ size }: LogoProps) {
  return (
    <Link href={appendUrlPath("/")} underline="none" rel={"noopener"}>
      <img
        src={appendUrlPath("/assets/logo.png")}
        alt={"App logo"}
        width={size}
        height={size}
        style={"object-fit: contain; user-select: none"}
      />
    </Link>
  );
}
