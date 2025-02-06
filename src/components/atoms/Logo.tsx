import { Link } from "@mui/material";

type LogoProps = {
  size: number;
};

export function Logo({ size }: LogoProps) {
  return (
    <Link href={"/"} underline="none" rel={"noopener"}>
      <img
        src={"/assets/logo.png"}
        alt={"App logo"}
        width={size}
        height={size}
        style={"object-fit: contain; user-select: none"}
      />
    </Link>
  );
}
