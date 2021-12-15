import { STORAGE_KEY } from "./constants";
import {Cache} from './cache';
import {displayControlItems, playMode, registerEvents,getDeviceID} from './playback';
import {parse, getAccessToken, Device, PlayerState,Token,getRecentlyPlayedTrack, getRecentPlayback, songTracker, isUpdateStorage} from "./spotify-interface";


type divType= 'please-login-box'|'spotify-player-box';
export type RepeatMode = 'track' | 'context' | 'off';

export class App{
    private track: songTracker;
    private token: Token;
    private device: Device;
    
    constructor(){
        this.token=null;
        this.track=null;
    }

    public async render(){
        this.token=await getAccessToken();
        this.device=await getDeviceID(this.token.accessToken);
        
        if (!this.isLoggedIn()){
            showUI('please-login-box');
            return;
        }
        await this.showPlayerUI();
        registerEvents(this.token,this.device.id, this.track,this.render.bind(this));
    
    }
    private async showPlayerUI(){
        showUI('spotify-player-box');
        const storedTrack=Cache.retrieve(STORAGE_KEY);
        this.track= await this.getTrack(storedTrack);

        if(isUpdateStorage(storedTrack,this.track)){
            Cache.storeWithKey(STORAGE_KEY, this.track);
        }else{
            if(!this.track){
                this.track = { ...storedTrack, isPlaying: false };
            }else{
                this.track=storedTrack;
            }
        }

        this.displayTrackInfo();
        this.startTimer();
        displayControlItems('play');
    }
    private isLoggedIn(){
        return !this.token.isAnonymous;
    }
    private async getTrack(storedTrack:songTracker){
        let track=await getRecentPlayback(this.token.accessToken);
        let type: PlayerState;

        if(track){
            if(!track.item){
                type='no-song-playing';
            }
        }else{
            if(storedTrack){
                type='cache';
            }else{
                type='nothing'
            }
        }

        switch (type) {
            case 'nothing':
            case 'no-song-playing':
              track = await getRecentlyPlayedTrack(this.token.accessToken);
              break;
            case 'cache':
              track = storedTrack;
              break;
          }
          track = parse(track);

          return track;
    
    }

    private async displayTrackInfo() {
        const playback=this.track;
        const songTitle = document.getElementById('title');
        const artistName = document.getElementById('artist');
        const coverImage = document.getElementById('cover-photo-wrapper');
        // const infoBox = document.getElementById('information-box');
        // const prevIcon = document.getElementById('prev-icon');
        // const playIcon = document.getElementById('play-icon');
        // const pauseIcon = document.getElementById('pause-icon');
        // const nextIcon = document.getElementById('next-icon');
        // const repeatIcon = document.getElementById('repeat-icon');
        // const repeatContext = document.getElementById('repeat-context');
        // const repeatOne = document.getElementById('repeat-one');
        // const divider = document.getElementById('divider');
      
        const { title, artist, coverPhoto, trackUrl } = playback;
      
        if (title) {
          songTitle.textContent = title;
          songTitle.setAttribute('title', title);
          songTitle.setAttribute('href', trackUrl);
          songTitle.setAttribute('target', '_blank');
          songTitle.style.textDecoration = 'none';
          songTitle.style.fontWeight = 'bold';
        }
      
        if (artist) {
          artistName.textContent = artist.name;
          artistName.setAttribute('title', artist.name);
          artistName.setAttribute('href', artist.url);
          artistName.setAttribute('target', '_blank');
          artistName.style.textDecoration = 'none';
          artistName.style.fontStyle = 'italic';
        }
      
        if (coverPhoto) {
          const img = document.createElement('img');
          img.setAttribute('src', coverPhoto);
          img.setAttribute('id', 'cover-photo');
          img.setAttribute('class', 'mini-spotify-right-panel mini-spotify-cover-photo');
          img.setAttribute('title', `${title} - ${artist.name}`);
          img.setAttribute('alt', `${title} - ${artist.name}`);
      
          if (document.getElementById('cover-photo')) {
            coverImage.removeChild(document.getElementById('cover-photo'));
          }
      
          coverImage.append(img);
        }
    }
    private startTimer() {
        if (!this.track) return;
    
        const durationMs = this.track.durationMs;
        const progressMs = this.track.progressMs || 0;
    
        const timer = setTimeout(async () => {
          await this.showPlayerUI();
          clearTimeout(timer);
        }, durationMs - progressMs);
      }
    
    
    
    
    private togglePlay(){
        if(this.track.isPlaying){
            displayControlItems('pause');
        }else{
            displayControlItems('play');
        }
    }
    
}


function showUI(appMode: divType){
    const loginNotification = document.getElementById('spotify-login-notification');
    const player = document.getElementById('spotify-player');

    switch(appMode){
        case 'spotify-player-box':
            player.style.display='flex';
            loginNotification.style.display='none';
            break;
        case 'please-login-box':
            player.style.display='none';
            loginNotification.style.display='flex';
            break;
    }
}

