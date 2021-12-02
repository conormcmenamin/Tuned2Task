import { getAccessToken, Token, songTracker} from "./spotify-interface";

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
        console.log(this.isLoggedIn());
        if (!this.isLoggedIn()){
            showUI('please-login-box');
            return;
        }
        await this.showPlayerUI();
    
    }
    private async showPlayerUI(){
        showUI('spotify-player-box');

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