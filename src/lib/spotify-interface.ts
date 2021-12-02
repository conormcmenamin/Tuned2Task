import { API_URL, WEB_PLAYER_URL } from './constants';
import { RepeatMode } from './app';
export interface Token{
    clientId:string;
    accessToken: string;
    accessTokenExpirationTime: number;
    isAnonymous: boolean;
}

export interface songTracker {
    title?: string;
    artist?: Artist;
    repeatState?: RepeatMode;
    isPlaying?: boolean;
    coverPhoto?: string;
    uri?: string;
    progressMs?: number;
    durationMs?: number;
    trackUrl?: string;
    id?: string;
    isSave?: boolean;
    context?: {
      type: 'artist' | 'playlist' | 'album';
      href: string;
      externalUrls: {
        spotify: string;
      };
      uri: string;
    };
  }

  export interface Artist {
    name?: string;
    url?: string;
}



export async function getAccessToken(){
    let token: Token = {
        clientId: null,
        accessToken: null,
        accessTokenExpirationTime: null,
        isAnonymous: null,
    };
    try{
        const url = `${WEB_PLAYER_URL}/get_access_token`;
        const response = await fetch(url);
        token = await response.json();
    } catch{}
    return token;
}

export async function getTrack(accessToken: string){
    const url=`${API_URL}/v1/me/player?additional_types=track`;
    try {
        const response = await fetch(url, {
            headers:{
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const data=await response.json();
        return data;
    } catch (e) {
        return false;
    }
}