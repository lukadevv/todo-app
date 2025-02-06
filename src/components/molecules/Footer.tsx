import { Box, Card, CardContent, Typography } from "@mui/material";
import { GithubButton } from "../atoms/GitHubButton";

export function Footer() {
  return (
    <Box component={"footer"} width={"100%"} position={"relative"} mt={10}>
      <Card>
        <CardContent>
          <Box
            display={"flex"}
            flexDirection={"column"}
            width={"max-content"}
            margin={"auto"}
            gap={1}
            py={1}
          >
            <Typography
              variant="caption"
              fontWeight={600}
              textTransform={"uppercase"}
            >
              Github
            </Typography>
            <GithubButton />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
