import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { expect, describe, it, beforeEach } from "vitest";
import { SearchGymsUseCase } from "./search-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe("Search Gyms Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsUseCase(gymsRepository);
  });

  it("should be able to search for gyms", async () => {
    await gymsRepository.create({
      title: "Test Gym",
      description: null,
      phone: null,
      latitude: -23.6552192,
      longitude: -47.1564288,
    });

    await gymsRepository.create({
      title: "TS Gym",
      description: null,
      phone: null,
      latitude: -23.6552192,
      longitude: -47.1564288,
    });

    const { gyms } = await sut.execute({
      query: "Test",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "Test Gym" })]);
  });

  it("should be able to fetch paginated gyms search", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Test Gym ${i}`,
        description: null,
        phone: null,
        latitude: -23.6552192,
        longitude: -47.1564288,
      });
    }

    const { gyms } = await sut.execute({
      query: "Test",
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Test Gym 21" }),
      expect.objectContaining({ title: "Test Gym 22" }),
    ]);
  });
});
