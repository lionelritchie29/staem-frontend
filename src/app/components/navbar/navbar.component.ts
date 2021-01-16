import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  languageList: String[] = [
    '简体中文 (Simplified Chinese)',
    '繁體中文 (Traditional Chinese)',
    '日本語 (Japanese)',
    '한국어 (Korean)',
    'ไทย (Thai)',
    'Български (Bulgarian)',
    'Español - Latinoamérica (Spanish - Latin America)',
    'Français (French)',
    'Italiano (Italian)',
    'Magyar (Hungarian)',
    'Nederlands (Dutch)',
    'Norsk (Norwegian)',
    'Português (Portuguese)',
    'Русский (Russian)',
  ]

  constructor() { }

  ngOnInit(): void {
  }

  showLanguageList(): void {
    const languageListElm: HTMLElement = document.getElementById('language-list');
    
    if (languageListElm.style.display === 'block') {
      languageListElm.style.display = 'none';
    } else {
      languageListElm.style.display = 'block';
    }
  }

}
