import { environment } from '../../../environments/environment';

const apiBaseURL: string = environment.apiBaseUrl;

export const apiBase = `${apiBaseURL}`;
export const apiSubjects = `${apiBaseURL}/subjects`;
