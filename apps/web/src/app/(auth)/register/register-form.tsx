"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { type RegisterFormData, registerFormSchema } from "@/types/auth";

function RegisterForm({ className, ...props }: React.ComponentProps<"div">) {
  const router = useRouter();
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

      toast.success("تم إنشاء الحساب بنجاح! يرجى التحقق من بريدك الإلكتروني.");
      router.push("/login");
    } catch (error) {
      console.error("Registration error:", error);
      setErrorMessage("حدث خطأ أثناء إنشاء الحساب");
      toast.error("حدث خطأ أثناء إنشاء الحساب");
    }
  }

  return (
    <div
      className={cn("flex w-screen overflow-x-hidden", className)}
      {...props}
    >
      <form
        id="register-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="p-6 md:p-0 flex-1 mb-16 md:mb-0 mt-16 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]"
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
                    className="text-sm font-normal gap-0"
                  >
                    <span className="ml-1">أوافق على</span>
                    <Link
                      href="#"
                      className={cn(
                        buttonVariants({ variant: "link", size: "sm" }),
                        "px-0 ml-1",
                      )}
                    >
                      شروط الخدمة
                    </Link>
                    و
                    <Link
                      href="#"
                      className={cn(
                        buttonVariants({ variant: "link", size: "sm" }),
                        "p-0",
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

          <Field>
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "جاري الإنشاء..." : "إنشاء حساب"}
            </Button>
          </Field>

          <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
            أو باستخدام
          </FieldSeparator>

          <Field className="grid grid-cols-4 gap-2">
            <Button variant="outline" type="button" disabled>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-5 w-5"
              >
                <title>Apple</title>
                <path
                  d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                  fill="currentColor"
                />
              </svg>
              <span className="sr-only">تسجيل الدخول باستخدام ابل</span>
            </Button>
            <Button variant="outline" type="button" disabled>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-5 w-5"
              >
                <title>Google</title>
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              <span className="sr-only">تسجيل الدخول باستخدام جوجل</span>
            </Button>
            <Button variant="outline" type="button" disabled>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-5 w-5"
              >
                <title>Meta</title>
                <path
                  d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z"
                  fill="currentColor"
                />
              </svg>
              <span className="sr-only">تسجيل الدخول باستخدام ميتا</span>
            </Button>
            <Button variant="outline" type="button" disabled>
              <svg fill="none" viewBox="0 0 1200 1227" className="h-5 w-5">
                <title>X</title>
                <path
                  className="fill-current"
                  d="M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z"
                />
              </svg>
              <span className="sr-only">تسجيل الدخول باستخدام اكس</span>
            </Button>
          </Field>

          <FieldDescription className="text-center gap-1 flex items-center justify-center">
            لديك حساب بالفعل؟
            <Link href="/login" className="underline">
              تسجيل الدخول
            </Link>
          </FieldDescription>
        </FieldGroup>
        <p className="p-2">{errorMessage}</p>
      </form>
      <Image
        src="/wallpaper.jpg"
        alt="Image"
        width={500}
        height={500}
        loading="eager"
        className="hidden lg:block flex-1 h-screen object-cover dark:brightness-[0.6] dark:grayscale-0 md:p-0 rounded-none sticky top-0"
      />
    </div>
  );
}

export default RegisterForm;

