import { Box, Typography, Zoom } from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts";

export function ProgressBar({
  value,
  label,
  color,
}: {
  value: number;
  label: string;
  color?: string;
}) {
  return (
    <Zoom timeout={400} in>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Gauge
          value={value}
          startAngle={-110}
          endAngle={110}
          width={160}
          sx={{
            [`& .${gaugeClasses.valueText}`]: {
              fontSize: 30,
              transform: "translate(0px, 0px)",
            },
            [`& .${gaugeClasses.valueArc}`]: {
              fill: color,
            },
            pointerEvents: "none",
            userSelect: "none",
          }}
          text={({ value }) => `${value}%`}
          height={130}
          cornerRadius={15}
        />
        <Typography
          sx={{
            opacity: 0.9,
            textTransform: "capitalize",
          }}
        >
          {label}
        </Typography>
      </Box>
    </Zoom>
  );
}
