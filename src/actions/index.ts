import { defineAction } from 'astro:actions'
import { z } from 'astro:schema'

export const server = {
  getGreeting: defineAction({
    input: z.object({
      name: z.string(),
    }),
    handler: async (input) => {
      throw new Error('bang')
      return `Hello ${input.name}`
    },
  }),
}
