import React from "react";
import { CircleCheck, AlertTriangle } from "lucide-react";

interface FormAlertProps {
  message?: string;
  variant: "success" | "error";
}

export const FormAlert: React.FC<FormAlertProps> = ({ message, variant }) => {
  if (!message) return null;

  const getVariantStyles = (variant: "success" | "error" | "warning") => {
    switch (variant) {
      case "success":
        return {
          container:
            "bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500",
          icon: <CircleCheck className="h-4 w-4" />,
        };
      case "error":
        return {
          container:
            "bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive",
          icon: <AlertTriangle className="h-4 w-4" />,
        };
      default:
        return {
          container: "",
          icon: null,
        };
    }
  };

  const styles = getVariantStyles(variant);

  return (
    <div className={styles.container}>
      {styles.icon}
      <p>{message}</p>
    </div>
  );
};
