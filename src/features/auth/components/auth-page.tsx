import { ArrowLeftIcon, CheckCircleIcon, LockKeyIcon } from "@phosphor-icons/react";
import { Link, useNavigate, useRouter } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";

import { authClient } from "@/features/auth/client";
import { clearClientAuthSnapshot } from "@/features/auth/client-auth-snapshot";
import { getSafeAuthRedirect } from "@/features/auth/redirect";
import { clearHasSessionHint, writeHasSessionHint } from "@/features/auth/session-storage";
import { Alert, AlertDescription, AlertTitle } from "@/ui/components/ui/alert";
import { Button } from "@/ui/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/ui/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/ui/components/ui/field";
import { Input } from "@/ui/components/ui/input";
import { Spinner } from "@/ui/components/ui/spinner";

type AuthPageProps = {
  pathname: string;
  redirect?: string;
  token?: string;
};

type AuthMode = "login" | "register" | "forgot-password" | "reset-password" | "logout";

export function AuthPage({ pathname, redirect, token }: AuthPageProps) {
  const mode = normalizeAuthMode(pathname);

  return (
    <main className="mx-auto flex min-h-[calc(100vh-var(--header-height))] w-full max-w-md items-center px-4 py-12">
      {mode === "login" && <LoginForm redirect={redirect} />}
      {mode === "register" && <RegisterForm redirect={redirect} />}
      {mode === "forgot-password" && <ForgotPasswordForm />}
      {mode === "reset-password" && <ResetPasswordForm token={token} />}
      {mode === "logout" && <LogoutView />}
    </main>
  );
}

function LoginForm({ redirect }: { redirect?: string }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const result = await authClient.signIn.email({
        email,
        password,
        callbackURL: getSafeAuthRedirect(redirect),
      });
      if (result.error) throw result.error;

      writeHasSessionHint();
      clearClientAuthSnapshot();
      await router.invalidate();
      await navigate({ href: getSafeAuthRedirect(redirect), replace: true });
    } catch (authError) {
      setError(getAuthErrorMessage(authError, "تعذر تسجيل الدخول. تحقق من البريد وكلمة المرور."));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthCard
      title="تسجيل الدخول"
      description="ادخل إلى حسابك وتابع مكتبتك وكتبك الحالية."
      footer={
        <>
          ليس لديك حساب؟{" "}
          <Link
            to="/auth/$pathname"
            params={{ pathname: "register" }}
            search={{ redirect }}
            className="text-primary underline-offset-4 hover:underline"
          >
            إنشاء حساب
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <FieldGroup className="gap-4">
          <Field data-invalid={!!error}>
            <FieldLabel htmlFor="email">البريد الإلكتروني</FieldLabel>
            <Input
              id="email"
              type="email"
              dir="ltr"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.currentTarget.value)}
              required
            />
          </Field>
          <Field data-invalid={!!error}>
            <div className="flex items-center justify-between gap-3">
              <FieldLabel htmlFor="password">كلمة المرور</FieldLabel>
              <Link
                to="/auth/$pathname"
                params={{ pathname: "forgot-password" }}
                className="text-muted-foreground hover:text-primary text-xs underline-offset-4 hover:underline"
              >
                نسيت كلمة المرور؟
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              dir="ltr"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.currentTarget.value)}
              required
            />
            <FieldError>{error}</FieldError>
          </Field>
          <Button type="submit" size="lg" disabled={isSubmitting}>
            {isSubmitting && <Spinner data-icon="inline-start" />}
            تسجيل الدخول
          </Button>
        </FieldGroup>
      </form>
    </AuthCard>
  );
}

function RegisterForm({ redirect }: { redirect?: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const result = await authClient.signUp.email({
        name,
        email,
        password,
        callbackURL: getSafeAuthRedirect(redirect),
      });
      if (result.error) throw result.error;

      writeHasSessionHint();
      clearClientAuthSnapshot();
      await router.invalidate();
      await navigate({ href: getSafeAuthRedirect(redirect), replace: true });
    } catch (authError) {
      setError(getAuthErrorMessage(authError, "تعذر إنشاء الحساب. يرجى المحاولة مرة أخرى."));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthCard
      title="إنشاء حساب"
      description="أنشئ حساباً لتتبع قراءاتك وبناء مكتبتك."
      footer={
        <>
          لديك حساب بالفعل؟{" "}
          <Link
            to="/auth/$pathname"
            params={{ pathname: "login" }}
            search={{ redirect }}
            className="text-primary underline-offset-4 hover:underline"
          >
            تسجيل الدخول
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <FieldGroup className="gap-4">
          <Field data-invalid={!!error}>
            <FieldLabel htmlFor="name">الاسم</FieldLabel>
            <Input
              id="name"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.currentTarget.value)}
              required
            />
          </Field>
          <Field data-invalid={!!error}>
            <FieldLabel htmlFor="register-email">البريد الإلكتروني</FieldLabel>
            <Input
              id="register-email"
              type="email"
              dir="ltr"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.currentTarget.value)}
              required
            />
          </Field>
          <Field data-invalid={!!error}>
            <FieldLabel htmlFor="register-password">كلمة المرور</FieldLabel>
            <Input
              id="register-password"
              type="password"
              dir="ltr"
              autoComplete="new-password"
              minLength={8}
              value={password}
              onChange={(event) => setPassword(event.currentTarget.value)}
              required
            />
            <FieldError>{error}</FieldError>
          </Field>
          <Button type="submit" size="lg" disabled={isSubmitting}>
            {isSubmitting && <Spinner data-icon="inline-start" />}
            إنشاء حساب
          </Button>
        </FieldGroup>
      </form>
    </AuthCard>
  );
}

function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const result = await authClient.requestPasswordReset({
        email,
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
      if (result.error) throw result.error;
      setSent(true);
    } catch (authError) {
      setError(getAuthErrorMessage(authError, "تعذر إرسال رابط إعادة التعيين."));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthCard
      title="إعادة تعيين كلمة المرور"
      description="سنرسل رابطاً آمناً إلى بريدك الإلكتروني."
      footer={
        <Link
          to="/auth/$pathname"
          params={{ pathname: "login" }}
          className="text-primary inline-flex items-center gap-1 underline-offset-4 hover:underline"
        >
          <ArrowLeftIcon data-icon="inline-start" />
          العودة لتسجيل الدخول
        </Link>
      }
    >
      {sent ? (
        <Alert>
          <CheckCircleIcon data-icon="inline-start" />
          <AlertTitle>تم إرسال الرابط</AlertTitle>
          <AlertDescription>
            تحقق من بريدك الإلكتروني لإكمال إعادة تعيين كلمة المرور.
          </AlertDescription>
        </Alert>
      ) : (
        <form onSubmit={handleSubmit}>
          <FieldGroup className="gap-4">
            <Field data-invalid={!!error}>
              <FieldLabel htmlFor="forgot-email">البريد الإلكتروني</FieldLabel>
              <Input
                id="forgot-email"
                type="email"
                dir="ltr"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.currentTarget.value)}
                required
              />
              <FieldError>{error}</FieldError>
            </Field>
            <Button type="submit" size="lg" disabled={isSubmitting}>
              {isSubmitting && <Spinner data-icon="inline-start" />}
              إرسال رابط إعادة التعيين
            </Button>
          </FieldGroup>
        </form>
      )}
    </AuthCard>
  );
}

function ResetPasswordForm({ token }: { token?: string }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!token) {
      setError("رابط إعادة التعيين غير صالح أو انتهت صلاحيته.");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      const result = await authClient.resetPassword({ newPassword: password, token });
      if (result.error) throw result.error;
      await navigate({ to: "/auth/$pathname", params: { pathname: "login" }, replace: true });
    } catch (authError) {
      setError(getAuthErrorMessage(authError, "تعذر تحديث كلمة المرور."));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthCard title="كلمة مرور جديدة" description="اختر كلمة مرور قوية لحسابك.">
      <form onSubmit={handleSubmit}>
        <FieldGroup className="gap-4">
          <Field data-invalid={!!error}>
            <FieldLabel htmlFor="new-password">كلمة المرور الجديدة</FieldLabel>
            <Input
              id="new-password"
              type="password"
              dir="ltr"
              autoComplete="new-password"
              minLength={8}
              value={password}
              onChange={(event) => setPassword(event.currentTarget.value)}
              required
            />
            <FieldError>{error}</FieldError>
          </Field>
          <Button type="submit" size="lg" disabled={isSubmitting || !token}>
            {isSubmitting && <Spinner data-icon="inline-start" />}
            حفظ كلمة المرور
          </Button>
        </FieldGroup>
      </form>
    </AuthCard>
  );
}

function LogoutView() {
  const navigate = useNavigate();
  const router = useRouter();

  useEffect(() => {
    void authClient.signOut().finally(async () => {
      clearHasSessionHint();
      clearClientAuthSnapshot();
      await router.invalidate();
      await navigate({ to: "/", replace: true });
    });
  }, [navigate, router]);

  return (
    <AuthCard title="تسجيل الخروج" description="جار إنهاء الجلسة الحالية.">
      <div className="text-muted-foreground flex items-center gap-2 text-sm">
        <Spinner />
        يرجى الانتظار...
      </div>
    </AuthCard>
  );
}

function AuthCard({
  title,
  description,
  footer,
  children,
}: {
  title: string;
  description: string;
  footer?: ReactNode;
  children: ReactNode;
}) {
  return (
    <Card className="w-full rounded-2xl">
      <CardHeader>
        <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-2xl">
          <LockKeyIcon />
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {children}
        {footer && <p className="text-muted-foreground text-center text-sm">{footer}</p>}
      </CardContent>
    </Card>
  );
}

function normalizeAuthMode(pathname: string): AuthMode {
  switch (pathname) {
    case "sign-in":
    case "login":
      return "login";
    case "sign-up":
    case "register":
      return "register";
    case "forgot":
    case "forgot-password":
      return "forgot-password";
    case "reset":
    case "reset-password":
      return "reset-password";
    case "logout":
      return "logout";
    default:
      return "login";
  }
}

function getAuthErrorMessage(error: unknown, fallback: string) {
  if (error && typeof error === "object" && "message" in error) {
    const message = String((error as { message?: unknown }).message ?? "");
    if (message) return message;
  }

  return fallback;
}
