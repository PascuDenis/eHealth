import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDrugService {
  createDb() {
    const drugs = [
      { name: 'Dr DenisH', link: 'none/link/yet', descriprion: 'no description', informations: 'no informations' },
      { name: 'Narco', link: 'none/link/yet', descriprion: 'no description', informations: 'no informations' },
      { name: 'Bombasto', link: 'none/link/yet', descriprion: 'no description', informations: 'no informations' },
      { name: 'Celeritas', link: 'none/link/yet', descriprion: 'no description', informations: 'no informations' },
      { name: 'Magneta', link: 'none/link/yet', descriprion: 'no description', informations: 'no informations' },
      { name: 'RubberMan', link: 'none/link/yet', descriprion: 'no description', informations: 'no informations' },
      { name: 'Dynama', link: 'none/link/yet', descriprion: 'no description', informations: 'no informations' },
      { name: 'Dr IQ', link: 'none/link/yet', descriprion: 'no description', informations: 'no informations' },
      { name: 'Magma', link: 'none/link/yet', descriprion: 'no description', informations: 'no informations' },
      { name: 'Tornado', link: 'none/link/yet', descriprion: 'no description', informations: 'no informations' }
    ];
    return { drugs };
  }
}
