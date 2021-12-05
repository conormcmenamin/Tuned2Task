import { getAccessToken, Token, songTracker} from "./spotify-interface";
import {getCurrentTrack} from './cache';
import {CACHE_KEY} from './constants';

type divType= 'please-login-box'|'spotify-player-box';
export type RepeatMode = 'track' | 'context' | 'off';

export class App{
    private track: songTracker;
    private token: Token;
    
    constructor(){
        this.token=null;
        this.track=null;
    }

    public async render(){
        this.token=await getAccessToken();
        
        if (!this.isLoggedIn()){
            showUI('please-login-box');
            return;
        }
        await this.showPlayerUI();
    
    }
    private async showPlayerUI(){
        showUI('spotify-player-box');
        
        const storedTrack=Cache.getCurrentTrack(CACHE_KEY);
        this.track=await this.getTrack(storedTrack);

        if(){

        }else{
            if(!this.track){

            }else {

            }
        }


    }
    private isLoggedIn(){
        return !this.token.isAnonymous;
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