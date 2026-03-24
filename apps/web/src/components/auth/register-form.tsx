"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import type React from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { registerUser } from "@/actions/auth";
import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { type RegisterFormData, registerFormSchema } from "@/types/auth";
import { useAuthDialog } from "./auth-dialog-provider";

function RegisterForm({ className, ...props }: React.ComponentProps<"div">) {
  const { setView } = useAuthDialog();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  async function onSubmit(data: RegisterFormData) {
    try {
      setErrorMessage("");
      form.clearErrors("root");

      const result = await registerUser(data);

      if (!result.success) {
        setErrorMessage(result.error || "حدث خطأ غير متوقع");
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
      setErrorMessage("حدث خطأ أثناء إنشاء الحساب");
      toast.error("حدث خطأ أثناء إنشاء الحساب");
    }
  }

  return (
    <div className={cn("flex flex-col gap-6 w-full", className)} {...props}>
      <form
        id="register-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FieldGroup className="max-w-md mx-auto w-full gap-4">
          <div className="flex flex-col items-center gap-2 text-center mb-6">
            <h1 className="text-2xl font-bold">إنشاء حساب جديد</h1>
            <p className="text-muted-foreground text-balance">
              أنشئ حساباً للوصول إلى مكتبتي
            </p>
          </div>

          {form.formState.errors.root?.message && (
            <Field data-invalid>
              <FieldError>{form.formState.errors.root.message}</FieldError>
            </Field>
          )}

          <Controller
            name="username"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="username">
                  اسم المستخدم (بالإنجليزية)
                </FieldLabel>
                <Input
                  {...field}
                  id="username"
                  type="text"
                  placeholder="username"
                  dir="ltr"
                  autoComplete="username"
                />
                {fieldState.error && (
                  <FieldError>{fieldState.error.message}</FieldError>
                )}
              </Field>
            )}
          />

          <Controller
            name="first_name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="first_name">الاسم الأول</FieldLabel>
                <Input
                  {...field}
                  id="first_name"
                  type="text"
                  placeholder="أحمد"
                  autoComplete="given-name"
                  dir="rtl"
                />
                {fieldState.error && (
                  <FieldError>{fieldState.error.message}</FieldError>
                )}
              </Field>
            )}
          />

          <Controller
            name="last_name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="last_name">اسم العائلة</FieldLabel>
                <Input
                  {...field}
                  id="last_name"
                  type="text"
                  placeholder="محمد"
                  autoComplete="family-name"
                  dir="rtl"
                />
                {fieldState.error && (
                  <FieldError>{fieldState.error.message}</FieldError>
                )}
              </Field>
            )}
          />

          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">البريد الإلكتروني</FieldLabel>
                <Input
                  {...field}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  dir="ltr"
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
                <FieldLabel htmlFor="password">كلمة المرور</FieldLabel>
                <Input
                  {...field}
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  dir="ltr"
                  autoComplete="new-password"
                />
                {fieldState.error && (
                  <FieldError>{fieldState.error.message}</FieldError>
                )}
              </Field>
            )}
          />

          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="confirm-password">
                  تأكيد كلمة المرور
                </FieldLabel>
                <Input
                  {...field}
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  dir="ltr"
                  autoComplete="new-password"
                />
                {fieldState.error && (
                  <FieldError>{fieldState.error.message}</FieldError>
                )}
              </Field>
            )}
          />

          <Controller
            name="terms"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <div className="flex items-center gap-2 rtl">
                  <Checkbox
                    id="terms"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <FieldLabel
                    htmlFor="terms"
                    className="text-sm font-normal gap-0 flex items-center"
                  >
                    <span className="ml-1">أوافق على</span>
                    <Link
                      href="#"
                      className={cn(
                        buttonVariants({ variant: "link", size: "sm" }),
                        "px-0 ml-1 bg-transparent hover:bg-transparent text-primary underline",
                      )}
                    >
                      شروط الخدمة
                    </Link>
                    <span className="mx-1">و</span>
                    <Link
                      href="#"
                      className={cn(
                        buttonVariants({ variant: "link", size: "sm" }),
                        "p-0 bg-transparent hover:bg-transparent text-primary underline",
                      )}
                    >
                      سياسة الخصوصية
                    </Link>
                  </FieldLabel>
                </div>
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
              {form.formState.isSubmitting ? "جاري الإنشاء..." : "إنشاء حساب"}
            </Button>
          </Field>

          <FieldDescription className="text-center gap-1 flex items-center justify-center mt-4">
            لديك حساب بالفعل؟
            <button
              type="button"
              onClick={() => setView("login")}
              className="underline text-primary hover:text-primary/80"
            >
              تسجيل الدخول
            </button>
          </FieldDescription>
        </FieldGroup>
        {errorMessage && (
          <p className="text-destructive text-sm text-center mt-2">
            {errorMessage}
          </p>
        )}
      </form>
    </div>
  );
}

export default RegisterForm;
