import { writable } from "svelte/store";

export type Recorde = {
  nick: string;
  score: number;
};

export const recorde = writable<Recorde>({ nick: "Desconhecido", score: 0 });

export async function carregarRecorde() {
  try {
    const response = await fetch("http://localhost:3000/records");
    if (!response.ok) {
      throw new Error("Erro ao buscar recorde.");
    }
    const data: Recorde = await response.json();
    recorde.set(data);
  } catch (error) {
    console.error("Erro ao carregar recorde:", error);
  }
}
