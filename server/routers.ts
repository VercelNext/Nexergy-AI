import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { invokeLLM } from "./_core/llm";
import { createDataIngestion, createDigitalTwinGoal } from "./db";

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  ai: router({
    analyzeLLM: publicProcedure
      .input(z.object({ prompt: z.string() }))
      .mutation(async ({ input }) => {
        try {
          const response = await invokeLLM({
            messages: [
              {
                role: "system",
                content: "You are NEXERGY AI, an advanced operational intelligence platform providing technical, actionable analysis for industrial operations. Be concise, specific, and focus on actionable insights.",
              },
              {
                role: "user",
                content: input.prompt,
              },
            ],
          });

          const content = response.choices[0]?.message.content || "No response generated";
          return {
            content,
          };
        } catch (error) {
          console.error("LLM Error:", error);
          throw new Error("Failed to generate intelligence analysis");
        }
      }),
  }),

  ingestion: router({
    submit: publicProcedure
      .input(z.object({
        sourceName: z.string(),
        sourceType: z.string(),
        metadata: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const result = await createDataIngestion({
          sourceName: input.sourceName,
          sourceType: input.sourceType,
          metadata: input.metadata,
          status: 'pending',
        });
        return { 
          success: true, 
          id: result.id,
          message: "Recibido. Activando agentes específicos para completar el flujo de trabajo hacia el diseño del Gemelo Digital."
        };
      }),
  }),

  digitalTwin: router({
    configureGoal: publicProcedure
      .input(z.object({
        ingestionId: z.number(),
        goalType: z.string(),
        description: z.string(),
        optimizationTarget: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const result = await createDigitalTwinGoal(input);
        return { success: true, id: result.id };
      }),
  }),
});

export type AppRouter = typeof appRouter;
