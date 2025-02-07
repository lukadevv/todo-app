import {
  Box,
  Link,
  Breadcrumbs as NativeBreadcrumbs,
  Paper,
  Typography,
} from "@mui/material";

export function Breadcrumbs({
  sections,
}: {
  sections: {
    name: string;
    icon?: React.ReactElement;
    href?: string;
  }[];
}) {
  return (
    <Paper
      sx={{
        p: 0,
        m: 0,
      }}
    >
      <NativeBreadcrumbs
        aria-label={"breadcrumb"}
        sx={{
          mb: 2,
          fontSize: "14px",
          p: 0.85,
          pl: 2,
        }}
      >
        {sections.map(({ icon, name, href }, index) =>
          href ? (
            <Link
              underline="hover"
              color="inherit"
              href={href}
              sx={{
                opacity: index !== sections.length - 1 ? 0.7 : 1,
                display: "flex",
                alignItems: "center",
              }}
            >
              {icon && (
                <Box
                  mr={0.5}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {icon}
                </Box>
              )}
              {name}
            </Link>
          ) : (
            <Box
              display={"flex"}
              sx={{
                opacity: index !== sections.length - 1 ? 0.7 : 1,
              }}
            >
              {icon && (
                <Box
                  mr={0.5}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {icon}
                </Box>
              )}
              <Typography
                sx={{
                  color: "inherit",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "inherit",
                }}
              >
                {name}
              </Typography>
            </Box>
          )
        )}
        <></>
      </NativeBreadcrumbs>
    </Paper>
  );
}
