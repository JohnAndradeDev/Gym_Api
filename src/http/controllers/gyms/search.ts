import { type FastifyRequest, type FastifyReply } from "fastify";
import z from "zod";
import { makeSearchGymUseCase } from "@/use-cases/factories/make-search-gyms-use-case";

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymsQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  });

  const { q, page } = searchGymsQuerySchema.parse(request.query);

  const searchGymsUseCase = makeSearchGymUseCase();

  const { gyms } = await searchGymsUseCase.execute({
    query: q,
    page,
  });

  return reply.status(200).send({ gyms });
}
