import { API_URL, WEB_PLAYER_URL } from './constants';
import { RepeatMode } from './app';



export type PlayerState = 'nothing' | 'no-song-playing' | 'cache';


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

export async function getRecentPlayback(accessToken:string){
    const url=`${API_URL}/v1/me/player?additional_types=track`;
    try {
        const response = await fetch(url, {
            headers:{
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const data=await response.json();
        console.log(data);
        return data;
    } catch (e) {
        return false;
    }

}
export async function getRecentlyPlayedTrack(accessToken: string) {
    const url = `${API_URL}/v1/me/player/recently-played`;
  
    try {
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      let data = await res.json();
  
      if (data && data.items.length) {
        const { track: item, context } = data.items[0];
        return { item, context };
      }
  
      return;
    } catch (e) {
      return;
    }
  }
export function isUpdateStorage(prevTrack: songTracker, currentTrack: songTracker){
    if (
        !prevTrack ||
        (currentTrack && currentTrack.title !== prevTrack.title) ||
        (currentTrack && currentTrack.isPlaying !== prevTrack.isPlaying) ||
        (currentTrack && currentTrack.uri !== prevTrack.uri) ||
        (currentTrack && currentTrack.uri === prevTrack.uri && currentTrack.progressMs !== prevTrack.progressMs) ||
        (currentTrack && currentTrack.uri === prevTrack.uri && currentTrack.isSave !== prevTrack.isSave) ||
        (currentTrack && currentTrack.uri === prevTrack.uri && currentTrack.repeatState !== prevTrack.repeatState)
      ) {
        return true;
      }
      return false;
}


export function parse(rawData): songTracker {
  if (!rawData || (rawData && !rawData.item)) return;

  const {
    is_playing: isPlaying,
    progress_ms: progressMs,
    repeat_state: repeatState,
    item: {
      name: title,
      artists,
      album: { images },
      uri,
      id,
      duration_ms: durationMs,
      external_urls: { spotify: trackUrl },
    },
  } = rawData;

  let artistName = '';
  let artistUrl = '';

  if (artists?.length) {
    artistName = artists[0].name;
    artistUrl = artists[0].external_urls.spotify;
  }

  const coverPhoto = images?.length ? images[1].url : '';

  let context;
  if (rawData.context) {
    const { type, href, external_urls, uri } = rawData.context;
    context = {
      type,
      href,
      uri,
      externalUrls: external_urls,
    };
  }

  return {
    title,
    artist: {
      name: artistName,
      url: artistUrl,
    },
    repeatState,
    isPlaying,
    coverPhoto,
    uri,
    progressMs,
    context,
    durationMs,
    trackUrl,
    id,
  };
}
