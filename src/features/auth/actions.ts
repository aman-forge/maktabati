"use server";

import type { RegisterFormData } from "@features/auth/types";
import { registerFormSchema } from "@features/auth/types";
import { createClient } from "@server/db/server";
import { revalidatePath } from "next/cache";

// Type for action responses
type ActionResponse<T = void> = {
  success: boolean;
  error?: string;
  data?: T;
};

/* Register a new user with email and password */
export async function registerUser(
  formData: RegisterFormData,
): Promise<ActionResponse<{ userId: string }>> {
  try {
    // Validate form data
    const validatedData = registerFormSchema.parse(formData);

    // Create Supabase client
    const supabase = await createClient();

    // Sign up the user
    const { data, error } = await supabase.auth.signUp({
      email: validatedData.email,
      password: validatedData.password,
      options: {
        data: {
          username: validatedData.username,
          first_name: validatedData.first_name,
          last_name: validatedData.last_name,
        },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    });

    if (error) {
      return {
        success: false,
        error: getArabicErrorMessage(error.message),
      };
    }

    if (!data.user) {
      return {
        success: false,
        error: "فشل إنشاء الحساب. يرجى المحاولة مرة أخرى.",
      };
    }

    // Revalidate and redirect
    revalidatePath("/");

    return {
      success: true,
      data: { userId: data.user.id },
    };
  } catch (error) {
    console.error("Registration error:", error);

    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: false,
      error: "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.",
    };
  }
}

/**
 * Reset password - send reset email
 */
export async function resetPassword(email: string): Promise<ActionResponse> {
  try {
    const supabase = await createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password`,
    });

    if (error) {
      return {
        success: false,
        error: getArabicErrorMessage(error.message),
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error("Password reset error:", error);

    return {
      success: false,
      error: "فشل إرسال رابط إعادة تعيين كلمة المرور.",
    };
  }
}

/**
 * Update password
 */
export async function updatePassword(
  newPassword: string,
): Promise<ActionResponse> {
  try {
    const supabase = await createClient();

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      return {
        success: false,
        error: getArabicErrorMessage(error.message),
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error("Update password error:", error);

    return {
      success: false,
      error: "فشل تحديث كلمة المرور.",
    };
  }
}

/**
 * Get current user session
 */
export async function getCurrentUser() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return null;
    }

    return user;
  } catch (error) {
    console.error("Get user error:", error);
    return null;
  }
}

/**
 * Resend verification email
 */
export async function resendVerificationEmail(
  email: string,
): Promise<ActionResponse> {
  try {
    const supabase = await createClient();

    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    });

    if (error) {
      return {
        success: false,
        error: getArabicErrorMessage(error.message),
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error("Resend verification error:", error);

    return {
      success: false,
      error: "فشل إعادة إرسال رسالة التحقق.",
    };
  }
}

/**
 * Helper function to translate common Supabase errors to Arabic
 */
function getArabicErrorMessage(errorMessage: string): string {
  const errorMap: Record<string, string> = {
    "User already registered": "البريد الإلكتروني مسجل بالفعل.",
    "duplicate key value": "اسم المستخدم مستخدم بالفعل. يرجى اختيار اسم آخر.",
    "Invalid login credentials": "بيانات الدخول غير صحيحة.",
    "Email not confirmed": "يرجى تأكيد بريدك الإلكتروني.",
    "Password should be at least 6 characters":
      "يجب أن تحتوي كلمة المرور على 6 أحرف على الأقل.",
    "Unable to validate email address": "عنوان البريد الإلكتروني غير صالح.",
    "Email rate limit exceeded": "تم تجاوز الحد المسموح. يرجى المحاولة لاحقاً.",
  };

  // Check if error message contains any known error
  for (const [key, value] of Object.entries(errorMap)) {
    if (errorMessage.includes(key)) {
      return value;
    }
  }

  // Default error message
  return "حدث خطأ. يرجى المحاولة مرة أخرى.";
}
