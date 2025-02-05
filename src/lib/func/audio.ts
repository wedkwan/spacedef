import { writable } from 'svelte/store';
import { get } from 'svelte/store'; 
import { audioEnabled } from '$lib/stores/gstores.js';


interface MusicStore {
  audio: HTMLAudioElement | null;
  currentSrc: string;
}

const music = writable<MusicStore>({ audio: null, currentSrc: '' });


export function tocarMusica(src: string): void {
  if (!get(audioEnabled)) {
    // Se o áudio estiver desabilitado, não faz nada
    return;
  }
  music.update((m) => {
    if (m.audio) {
      m.audio.pause();
    }

    const newAudio = new Audio(src);
    newAudio.loop = true;
    newAudio.play();

    return { audio: newAudio, currentSrc: src };
  });
}

/**
 * Função para parar a música de fundo.
 */
export function paraMusica(): void {
  music.update((m) => {
    if (m.audio) {
      m.audio.pause();
      m.audio.currentTime = 0;  // Reinicia a música para o início
    }
    return { audio: null, currentSrc: '' };
  });
}

export function tocarSom(caminho: string) {
  if (!get(audioEnabled)) return;
  let efeito = new Audio(caminho);
  efeito.volume = 0.9;
  efeito.play().catch(err => console.log("Erro ao tocar som:", err));
}


  