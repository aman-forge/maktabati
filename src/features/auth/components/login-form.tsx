"use client";

import { Button } from "@components/ui/button";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@components/ui/field";
import { Input } from "@components/ui/input";
import { type LoginFormData, loginFormSchema } from "@features/auth/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { WarningCircleIcon } from "@phosphor-icons/react";
import { createClient } from "@server/db/client";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { cn } from "@/ui/lib/utils";
import { useAuthDialog } from "./auth-dialog-provider";

function LoginForm() {
  const { closeDialog, setView } = useAuthDialog();
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormData) {
    try {
      form.clearErrors();

      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        const message =
          error.message === "Invalid login credentials"
            ? "بيانات الدخول غير صحيحة."
            : "فشل تسجيل الدخول. يرجى المحاولة مرة أخرى.";

        form.setError("root", { message });
        toast.error(message);
        return;
      }

      toast.success("تم تسجيل الدخول بنجاح.");
      closeDialog();
      window.location.reload(); // Reload after login
    } catch (error) {
      console.error("Login error:", error);
      form.setError("root", {
        message: "حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى.",
      });
      toast.error("حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى.");
    }
  }

  return (
    <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="gap-4">
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold"> تسجيل الدخول</h1>
          <p className="text-muted-foreground text-balance">مرحباً بك مجدداً في مكتبتي</p>
        </div>

        {form.formState.errors.root?.message && (
          <Field
            className="text-destructive text-sm text-center flex flex-row items-center! justify-center! gap-1 bg-destructive/10 border border-destructive p-2 rounded-lg"
            data-invalid
          >
            <WarningCircleIcon size={18} className="inline w-min" />
            <FieldError className="flex-inline p-0 m-0 w-fit">
              {form.formState.errors.root.message}
            </FieldError>
          </Field>
        )}

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="gap-1" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">البريد الإلكتروني</FieldLabel>
              <Input
                {...field}
                id="email"
                type="email"
                placeholder="m@example.com"
                autoComplete="email"
                className={cn("ltr", fieldState.error && "border-destructive")}
              />
              {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="gap-1" data-invalid={fieldState.invalid}>
              <div className="flex items-center">
                <FieldLabel htmlFor="password">كلمة المرور</FieldLabel>
                <button
                  type="button"
                  className="mr-auto text-sm text-primary underline-offset-2 hover:underline"
                >
                  هل نسيت كلمة المرور؟
                </button>
              </div>
              <Input
                {...field}
                id="password"
                type="password"
                placeholder="••••••••"
                className={cn("ltr", fieldState.error && "border-destructive")}
                autoComplete="current-password"
              />
              {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
            </Field>
          )}
        />

        <div className="flex flex-col gap-2">
          <Field>
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
            </Button>
          </Field>
          <FieldDescription className="text-center gap-1 flex items-center justify-center mt-4">
            ليس لديك حساب؟
            <Button variant={"link"} onClick={() => setView("register")} className={"p-0! h-auto"}>
              إنشاء حساب
            </Button>
          </FieldDescription>
        </div>
      </FieldGroup>
    </form>
  );
}

export default LoginForm;
