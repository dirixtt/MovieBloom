import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useState } from "react";

export default function ActionAlerts({
  text,
  type,
}: {
  text: string;
  type: any;
}) {
  const [msg, setMsg] = useState<string | null>(text || null);

  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert
        severity={type}
        onClose={() => {
          setMsg(null);
        }}
      >
        {msg}
      </Alert>
    </Stack>
  );
}
