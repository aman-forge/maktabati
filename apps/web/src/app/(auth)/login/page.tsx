import LoginForm from "./login-form";

export default function LoginPage() {
  return (
    <div className="bg-background md:bg-muted flex min-h-[calc(100vh-60px)] flex-col items-center justify-center">
      <LoginForm />
    </div>
  );
}
