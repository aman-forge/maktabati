"use client";

import { Button, buttonVariants } from "@components/ui/button";
import { Checkbox } from "@components/ui/checkbox";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@components/ui/field";
import { Input } from "@components/ui/input";
import { registerUser } from "@features/auth/actions";
import { type RegisterFormData, registerFormSchema } from "@features/auth/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { WarningCircleIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { cn } from "@/ui/lib/utils";
import { useAuthDialog } from "./auth-dialog-provider";

function RegisterForm() {
  const { setView } = useAuthDialog();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  async function onSubmit(data: RegisterFormData) {
    try {
      form.clearErrors("root");

      const result = await registerUser(data);

      if (!result.success) {
        form.setError("root", {
          message: result.error || "حدث خطأ غير متوقع",
        });
        toast.error(result.error || "حدث خطأ غير متوقع");
        return;
      }

      toast.success("تم إنشاء الحساب بنجاح! يرجى تسجيل الدخول.");
      setView("login");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("حدث خطأ أثناء إنشاء الحساب");
    }
  }

  return (
    <form id="register-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="gap-4">
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">إنشاء حساب جديد</h1>
          <p className="text-muted-foreground text-balance">أنشئ حساباً للوصول إلى مكتبتي</p>
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
              <FieldLabel htmlFor="password">كلمة المرور</FieldLabel>
              <Input
                {...field}
                id="password"
                type="password"
                placeholder="••••••••"
                autoComplete="new-password"
                className={cn("ltr", fieldState.error && "border-destructive")}
              />
              {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
            </Field>
          )}
        />

        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="gap-1" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="confirm-password">تأكيد كلمة المرور</FieldLabel>
              <Input
                {...field}
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                autoComplete="new-password"
                className={cn("ltr", fieldState.error && "border-destructive")}
              />
              {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
            </Field>
          )}
        />

        <Controller
          name="terms"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="gap-1" data-invalid={fieldState.invalid}>
              <div className="flex items-center gap-2 rtl">
                <Checkbox id="terms" checked={field.value} onCheckedChange={field.onChange} />
                <FieldLabel htmlFor="terms" className="text-sm font-normal gap-0 flex items-center">
                  <span className="ml-1">أوافق على</span>
                  <Link
                    href="/"
                    className={cn(
                      buttonVariants({ variant: "link", size: "sm" }),
                      "px-0 ml-1 bg-transparent hover:bg-transparent text-primary underline",
                    )}
                  >
                    شروط الخدمة
                  </Link>
                  <span className="mx-1">و</span>
                  <Link
                    href="/"
                    className={cn(
                      buttonVariants({ variant: "link", size: "sm" }),
                      "p-0 bg-transparent hover:bg-transparent text-primary underline",
                    )}
                  >
                    سياسة الخصوصية
                  </Link>
                </FieldLabel>
              </div>
              {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
            </Field>
          )}
        />

        <div className="flex flex-col gap-2">
          <Field>
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "جاري الإنشاء..." : "إنشاء حساب"}
            </Button>
          </Field>

          <FieldDescription className="text-center gap-1 flex items-center justify-center">
            لديك حساب بالفعل؟
            <Button variant={"link"} onClick={() => setView("login")} className={"p-0! h-auto"}>
              تسجيل الدخول
            </Button>
          </FieldDescription>
        </div>
      </FieldGroup>
    </form>
  );
}

export default RegisterForm;
