import { z } from "zod";

// Registration form schema
export const registerFormSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "يجب أن يحتوي الاسم على حرفين على الأقل." })
      .max(50, { message: "يجب ألا يزيد الاسم عن 50 حرفًا." })
      .regex(/^[a-zA-Zأ-ي\s]+$/, {
        message: "يمكن أن يحتوي الاسم على أحرف ومسافات فقط.",
      })
      .trim(),
    email: z
      .string()
      .email({ message: "يرجى إدخال عنوان بريد إلكتروني صالح." })
      .toLowerCase()
      .trim(),

    password: z
      .string()
      .min(6, { message: "يجب أن تحتوي كلمة المرور على 6 أحرف على الأقل." })
      .max(32, { message: "كلمة المرور طويلة جدًا." })
      .regex(/[A-Za-z]/, {
        message: "يجب أن تحتوي كلمة المرور على حرف واحد على الأقل.",
      }),

    confirmPassword: z.string(),

    terms: z.boolean().refine((val) => val === true, {
      message: "يجب الموافقة على الشروط والأحكام.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمتا المرور غير متطابقتين.",
    path: ["confirmPassword"],
  });

// Inferred TypeScript type
export type RegisterFormData = z.infer<typeof registerFormSchema>;
