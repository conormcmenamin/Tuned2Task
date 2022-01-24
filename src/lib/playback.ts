import { API_URL,TIME_OUT } from "./constants";
import { Token, songTracker, parseDevice, getRecentPlayback, Device } from "./spotify-interface";
import {run_script} from './prediction';


export type playMode= 'play'|'pause'|'none';




export async function getDeviceID(accessToken: string): Promise<Device>{

  const res = await getRecentPlayback(accessToken);
  if(res.device==null)return ; 

  const {
    id: id,
    is_active: is_active,
    is_private_session: is_private_session,
    is_restricted: is_restricted,
    name: name,
    type: type,
    volume_percent: volume_percent,
  }=res.device;
  
  
  return {
    id,
    is_active,
    is_private_session,
    is_restricted,
    name,
    type,
    volume_percent,
  };

}
export async function pauseTrack(deviceId: string, accessToken: string) {
    const url = `${API_URL}/v1/me/player/pause?device_id=${deviceId}`;
    var result={}
    try {
        result = await fetch(url, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return result;
    } catch (e) {
      throw e;
    }
   
  }
  
  export async function playTrack(playback: songTracker, deviceId: string, accessToken: string) {
    const url = `${API_URL}/v1/me/player/play?device_id=${deviceId}`;
  
    const postData = {
      position_ms: playback.progressMs, // the time that current plays
    };
  
    try {
      return await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(postData),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (e) {
      throw e;
    }
  }

  export async function prev(deviceId: string, accessToken: string) {
    const url = `${API_URL}/v1/me/player/previous?device_id=${deviceId}`;
  
    try {
      return await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (e) {
      throw e;
    }
  }

  export async function next(deviceId: string, accessToken: string) {
    const url = `${API_URL}/v1/me/player/next?device_id=${deviceId}`;
  
    try {
      return await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (e) {
      throw e;
    }
  }

export function registerEvents(token: Token, device_id: string, playback: songTracker, render: () => Promise<void>) {
    const btnPrev = document.getElementById('prev');
    const btnPause = document.getElementById('pause');
    const btnPlay = document.getElementById('play');
    const btnNext = document.getElementById('next');
    const btnSave = document.getElementById('save');
    const btnUnSave = document.getElementById('un-save');
    const btnRepeat = document.getElementById('repeat');
  
    document.addEventListener('keydown', async (e) => {
      e.preventDefault();
      if (e.code === 'Space') {
        if (playback.isPlaying === true) {
          await pause();
        } else {
          await play();
        }
      }
    });
  
    btnPause.onclick = async function (e) {
      e.preventDefault();
      await pause();
    };
  
    btnPlay.onclick = async function (e) {
      e.preventDefault();
      await play();
      
    };
  
    btnPrev.onclick = async function (e) {
      e.preventDefault();
      await prev(device_id, token.accessToken);
      // after click next song, call API again to update UI
      setTimeout(async () => {
        await render();
      }, TIME_OUT);
    };
  
    btnNext.onclick = async function (e) {
      e.preventDefault();
      await next(device_id, token.accessToken);
      // after click next song, call API again to update UI
      setTimeout(async () => {
        await render();
      }, TIME_OUT);
    };
  
    // btnSave.onclick = async function (e) {
    //   e.preventDefault();
    //   if (!playback.isSave) {
    //     // add track to saved list
    //     await saveTrack(playback, token.accessToken);
    //     await render();
    //   }
    // };
  
    // btnUnSave.onclick = async function (e) {
    //   e.preventDefault();
    //   if (playback.isSave) {
    //     // remove track from saved list
    //     await removeTrack(playback, token.accessToken);
    //     await render();
    //   }
    // };
  
    // btnRepeat.onclick = async function (e) {
    //   let mode: RepeatMode = 'off';
  
    //   switch (playback.repeatState) {
    //     case 'off':
    //       mode = 'context';
    //       break;
    //     case 'context':
    //       mode = 'track';
    //       break;
    //     default:
    //       break;
    //   }
  
    //   await repeat(mode, token.accessToken);
    //   await render();
    // };
  
    async function pause() {
      displayControlItems('pause');
      await pauseTrack(device_id, token.accessToken);
      //updatesongTracker(playback, 'isPlaying', false);
      //updateTrackCache({ isPlaying: false });
    }
  
    async function play() {
      displayControlItems('play');
      await playTrack(playback, device_id, token.accessToken);
      //updatesongTracker(playback, 'isPlaying', true);
      //updateTrackCache({ isPlaying: true });
    }
  }
  
export async function displayControlItems(mode:playMode){

    var playBtn=document.getElementById('play');
    var pauseBtn=document.getElementById('pause');
    switch(mode){
        case 'play':
            playBtn.style.display='none';
            pauseBtn.style.display='flex';
            break;
        case 'pause':
            playBtn.style.display='flex';
            pauseBtn.style.display='none';
            break;
    }
  }