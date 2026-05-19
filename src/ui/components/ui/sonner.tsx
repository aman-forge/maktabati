"use client";

import { useTheme } from "@lonik/themer";
import {
  CheckCircleIcon,
  InfoIcon,
  SpinnerIcon,
  WarningIcon,
  XCircleIcon,
} from "@phosphor-icons/react";
import { ExternalToast, Toaster as Sonner, type ToasterProps, toast as sonnerToast } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CheckCircleIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <WarningIcon className="size-4" />,
        error: <XCircleIcon className="size-4" />,
        loading: <SpinnerIcon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast font-sans!",
        },
      }}
      id="main-app-toaster"
      richColors
      {...props}
    />
  );
};

const defaultOptions: ExternalToast = {
  toasterId: "main-app-toaster",
};

const toast = Object.assign(
  (message: string | React.ReactNode, options?: ExternalToast) =>
    sonnerToast(message, { ...defaultOptions, ...options }),
  {
    success: (message: string | React.ReactNode, options?: ExternalToast) =>
      sonnerToast.success(message, { ...defaultOptions, ...options }),

    error: (message: string | React.ReactNode, options?: ExternalToast) =>
      sonnerToast.error(message, { ...defaultOptions, ...options }),

    info: (message: string | React.ReactNode, options?: ExternalToast) =>
      sonnerToast.info(message, { ...defaultOptions, ...options }),

    warning: (message: string | React.ReactNode, options?: ExternalToast) =>
      sonnerToast.warning(message, { ...defaultOptions, ...options }),

    loading: (message: string | React.ReactNode, options?: ExternalToast) =>
      sonnerToast.loading(message, { ...defaultOptions, ...options }),

    dismiss: (id?: string | number) => sonnerToast.dismiss(id),
  },
);

export { Toaster, toast };
