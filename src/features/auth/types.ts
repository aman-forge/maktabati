import { z } from "zod";

// Registration form schema
export const registerFormSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "يجب أن يحتوي اسم المستخدم على 3 أحرف على الأقل." })
      .max(32, { message: "يجب ألا يزيد اسم المستخدم عن 32 حرفًا." })
      .regex(/^[a-z0-9_]+$/i, {
        message: "اسم المستخدم (إنجليزي فقط، حروف وأرقام وشرطة سفلية).",
      })
      .transform((val) => val.toLowerCase().trim()),
    first_name: z
      .string()
      .min(2, { message: "يجب أن يحتوي الاسم الأول على حرفين على الأقل." })
      .max(50, { message: "يجب ألا يزيد الاسم الأول عن 50 حرفًا." })
      .regex(/^[\p{L}\s]+$/u, {
        message: "يمكن أن يحتوي الاسم الأول على أحرف ومسافات فقط.",
      })
      .trim(),
    last_name: z
      .string()
      .min(2, { message: "يجب أن يحتوي اسم العائلة على حرفين على الأقل." })
      .max(50, { message: "يجب ألا يزيد اسم العائلة عن 50 حرفًا." })
      .regex(/^[\p{L}\s]+$/u, {
        message: "يمكن أن يحتوي اسم العائلة على أحرف ومسافات فقط.",
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
      .max(72, { message: "كلمة المرور طويلة جدًا." })
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

// Login form schema
export const loginFormSchema = z.object({
  email: z
    .string()
    .email({ message: "يرجى إدخال عنوان بريد إلكتروني صالح." })
    .toLowerCase()
    .trim(),

  password: z
    .string()
    .min(1, { message: "يرجى إدخال كلمة المرور." })
    .max(72, { message: "كلمة المرور طويلة جدًا." }),
});

// Inferred TypeScript type
export type LoginFormData = z.infer<typeof loginFormSchema>;
