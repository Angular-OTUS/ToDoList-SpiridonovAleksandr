import { InjectionToken } from '@angular/core';
import { Language } from '@ngx-translate/core';

export const LANGUAGES = new InjectionToken<Language[]>('LANGUAGES');
