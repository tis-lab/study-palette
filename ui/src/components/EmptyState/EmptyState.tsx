import type { ReactNode } from "react";
import { Avatar, Typography } from "@mui/material";
import { EmptyStateRoot } from "./EmptyState.styles";

export interface Props {
  icon?: ReactNode;
  title?: string;
  description: string;
  children?: ReactNode;
}

export default function EmptyState({ icon, title, description, children }: Props) {
  return (
    <EmptyStateRoot>
      {icon && <Avatar>{icon}</Avatar>}
      {title && (
        <Typography component="p" variant="subtitle1">
          {title}
        </Typography>
      )}
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
      {children}
    </EmptyStateRoot>
  );
}
