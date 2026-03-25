"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { type LoginFormData, loginFormSchema } from "@/types/auth";
import { createClient } from "@/utils/supabase/client";
import { useAuthDialog } from "./auth-dialog-provider";

function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
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
    <div className={cn("flex flex-col gap-6 w-full", className)} {...props}>
      <form
        id="login-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FieldGroup className="space-y-4">
          <div className="flex flex-col items-center gap-2 text-center mb-6">
            <h1 className="text-2xl font-bold"> تسجيل الدخول</h1>
            <p className="text-muted-foreground text-balance">
              مرحباً بك مجدداً في مكتبتي
            </p>
          </div>

          {form.formState.errors.root?.message && (
            <Field data-invalid>
              <FieldError>{form.formState.errors.root.message}</FieldError>
            </Field>
          )}

          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="rtl">
                <FieldLabel htmlFor="email">البريد الإلكتروني</FieldLabel>
                <Input
                  {...field}
                  className={"ltr"}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  autoComplete="email"
                />
                {fieldState.error && (
                  <FieldError>{fieldState.error.message}</FieldError>
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
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
                  className={"ltr"}
                  autoComplete="current-password"
                />
                {fieldState.error && (
                  <FieldError>{fieldState.error.message}</FieldError>
                )}
              </Field>
            )}
          />
          <Field className="pt-4">
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting
                ? "جاري تسجيل الدخول..."
                : "تسجيل الدخول"}
            </Button>
          </Field>

          <FieldDescription className="text-center gap-1 flex items-center justify-center mt-4">
            ليس لديك حساب؟
            <button
              type="button"
              onClick={() => setView("register")}
              className="underline text-primary hover:text-primary/80"
            >
              إنشاء حساب
            </button>
          </FieldDescription>
        </FieldGroup>
      </form>
    </div>
  );
}

export default LoginForm;
