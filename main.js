// //Get Artist Name displayed on the page then assign artist name to variable
const artistName = document.querySelector('.artist').textContent;
console.log('Artist Name:', artistName);
const lyriks = document.getElementById('lyrics')
const tab = document.querySelector('.tab')

const API_KEY = 'f7939895e6msh068d10547e771e5p145c57jsne26169c4264f';
const URL_SEARCH = 'https://genius-song-lyrics1.p.rapidapi.com/search/';
const URL_LYRICS = 'https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/';
const header = {
  'X-RapidAPI-Key': API_KEY,
  'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
}

// use artist name variable in the params query
// use the API key variable in the RapidAPI Key header
const geniusArtist = {
  method: 'GET',
  url: URL_SEARCH,
  params: {
    q: artistName,
    per_page: '10',
    page: '1'
  },
  headers: header
};

//Display the lyrics and song name
const importLyrics = async () => {
try {
//switch to lyrics tab
lyricTab.setAttribute('class', 'other-albums current space pointer');
otherAlbs.setAttribute('class', 'space pointer');
relatedArtistsTab.setAttribute('class', 'space pointer');

contents.innerHTML = 
`<div id="lyrics">   
</div>`

  //Fetched SongID
  const geniusArtistID = await axios.request(geniusArtist);
  // console.log('Song ID:', geniusArtistID.data.hits[0].result.id);
  const songID = geniusArtistID.data.hits[0].result.id;


  //Get Lyrics API and use the Song ID to params
  const geniusLyrics = {
    method: 'GET',
    url: URL_LYRICS,
    params: {id: songID},
    headers: header
    };
  
  //Fetch Song name and update the DOM
  const songNim = geniusArtistID.data.hits[0].result.title
  document.querySelector('.song-name').textContent = songNim;
  
  //Fetch lyrics and update the DOM
  const res = await axios.request(geniusLyrics);
 
  const lyricx = res.data.lyrics.lyrics.body.html

  document.getElementById('lyrics').innerHTML= lyricx;
}catch (error) {
	console.error(error);
}
  }

//import lyrics function displays song name and lyrics on load

//===============FOR OTHER ALBUMS===========================
const SPOTIFY_URL_SEARCH = 'https://spotify23.p.rapidapi.com/search/';
const s_header = {
  'X-RapidAPI-Key': API_KEY,
  'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
}

const spotify = {
  method: 'GET',
  url: SPOTIFY_URL_SEARCH,
  params: {
    q: artistName,
    type: 'multi',
    offset: '0',
    limit: '10',
    numberOfTopResults: '5'
  },
  headers: s_header
};


//assign content div and other-albums div to variable
const contents = document.querySelector('.content');
const otherAlbs = document.querySelector('.other-albums');
const lyricTab = document.querySelector('#lyric-tab');



//add other-albums div and remove lyrics div
const importAlbums = async () => {
  try{
    contents.style.width = '390px'
    contents.style.height = '400px'
    tab.style.width = '500px'

  //update DOM for tab highlighter
  otherAlbs.setAttribute('class', 'other-albums current space pointer');
  lyricTab.setAttribute('class', 'space pointer');
  relatedArtistsTab.setAttribute('class', 'space pointer');

  //change the div inside the contents div
  contents.innerHTML = 
  `<div id="other-albums-div">   
  </div>`

  const dive = document.querySelector('#other-albums-div')
  
    // create image, title and year inside album-card
    const response = await axios.request(spotify);          
  
    // fetch artist ID
    const artID = response.data.artists.items[0].data.uri;
    // console.log(artID);
    const artistID = artID.slice(15);
    // console.log(artistID);
    
    //loop thru the API using .map to create cards
    response.data.albums.items.map((item) =>{
        
        //create cards
        const diver = document.createElement('div');
        diver.id = 'album-card';        
        dive.appendChild(diver);

        //complete the API Path and assign to variable
        const albumImg = item.data.coverArt.sources[0].url;
        const year = item.data.date.year;
        const title = item.data.name;
        
        //assign the API variables respectively
        const img = document.createElement('img');
        img.id = 'card-pic';
        img.src = albumImg;
        img.alt = 'album-pic';

        //create an a tag then append it to album-card div
        const aTag = document.createElement('a');
        aTag.href = `https://open.spotify.com/artist/${artistID}`
        aTag.target = '_blank';
        aTag.setAttribute('class', 'pointer');
        diver.appendChild(aTag);
        //append the 'img tag' to the 'a tag'
        aTag.appendChild(img);

        //create a 'p tag' for the title and append it to the album-card div
        const albName = document.createElement('p');
        albName.id = 'title';
        albName.textContent = title;
        diver.appendChild(albName);
        
        //lastly, create a 'p tag' for the year and append it to the album-card div
        const yr = document.createElement('p');
        yr.id = 'year';
        yr.textContent = year;
        diver.appendChild(yr);        
    }
    )
  }  catch (error) {
      console.error(error);
    }
    return 
    
}
//update the DOM upon clicking Other Albums

//========FOR RELATED ARTISTS================================

//assign related artists Tab to a variable
const relatedArtistsTab = document.querySelector('.related-artists');

//Get related artists
const importRelatedArtists = async () => {
  
  try {
    contents.style.width = '390px'
    contents.style.height = '400px'
    tab.style.width = '500px'
    // function importRelatedArtists {  
      //update DOM for tab highlighter
      relatedArtistsTab.setAttribute('class', 'related-artists current space pointer');
      otherAlbs.setAttribute('class', 'other-albums space pointer');
      lyricTab.setAttribute('class', 'space pointer');
    
        contents.innerHTML = 
        `<div id="related-artists-div">   
        </div>`
        
        const relArtDive = document.querySelector('#related-artists-div')
        
        const response = await axios.request(spotify);          
        
        //fetch artist ID
        const artID = response.data.artists.items[0].data.uri;
        // console.log(artID);
        const artistID = artID.slice(15);
        // console.log(artistID);
        
        const relartist = {
          method: 'GET',
          url: 'https://spotify23.p.rapidapi.com/artist_related/',
          params: {
            id: artistID
          },
          headers: s_header
  };
  
  //Fetch related artists image and name
  const infow = await axios.request(relartist);
  
  //loop thru the API using .map to create cards
  infow.data.artists.map((infows) =>{
    
    //create cards
    const relArtCardDiv = document.createElement('div');
    relArtCardDiv.id = 'rel-art-card';        
    relArtDive.appendChild(relArtCardDiv);
    
    //Fetched Image, Artist Name and Artist ID and assign it to variables
    const relArtImage = infows.images[0].url;
    const relArtNim = infows.name;
    const relArtId = infows.uri;
    const relatedArtID = relArtId.slice(15);
    
    //assign the API variables respectively
    const relArtImg = document.createElement('img');
            relArtImg.id = 'related-artist-pic';
            relArtImg.src = relArtImage;
            relArtImg.alt = 'related-artist-pic';
            
            //create an a tag then append it to rel-art-card div
            const relArtATag = document.createElement('a');
            relArtATag.href = `https://open.spotify.com/artist/${relatedArtID}`;
            relArtATag.target = '_blank';
            relArtATag.setAttribute('class', 'pointer');
            relArtCardDiv.appendChild(relArtATag);
            //append the 'img tag' to the 'a tag'
            relArtATag.appendChild(relArtImg);
            
            //create a 'p tag' for the title and append it to the rel-art-card div
            const relArtName = document.createElement('p');
            relArtName.id = 'art-name';
            relArtName.textContent = relArtNim;
            relArtCardDiv.appendChild(relArtName);
          }
          )
        }catch (error) {
          console.error(error);
        }
        return
}
//update the DOM upon clicking Related Artists
      
function init(){
    document.addEventListener('DOMContentLoaded', importLyrics);
    otherAlbs.addEventListener('click', importAlbums);
    lyricTab.addEventListener('click', importLyrics)
    relatedArtistsTab.addEventListener('click', importRelatedArtists);
      
}
init()
      
      {/* <div class="content">
      <div id="related-artists-div">
      <div id="rel-art-card">
      <a href="https://open.spotify.com/artist/06HL4z0CvFAxyc27GXpf02"><img src="./img/taylor.png" alt="related-artist-pic" id="related-artist-pic"></a>
      <p id="art-name" class="space">Related Artists Name</p>                      
      </div>
      <div id="rel-art-card">
      <img src="./img/taylor.png" alt="" class="card-pic">
      <p id="art-name" class="space">Artist 1</p>                      
      </div>
      <div id="rel-art-card">
      <img src="./img/taylor.png" alt="" class="card-pic">
      <p id="art-name" class="space">Artist 1</p>                      
      </div>
      
      </div>
    </div>  */}
    
    // ##################################
let currentMusic = 0;

const music = document.querySelector('#audio')

const seekBar  = document.querySelector('.seek-bar')
const songName = document.querySelector('.song-name')


const currentTime = document.querySelector('.start-time')
const musicDuration = document.querySelector('.running-time')
const playBtn = document.querySelector('.play')
const forwardBtn = document.querySelector('.forward-btn')
const backwardBtn = document.querySelector('.back-btn')


playBtn.addEventListener('click', () => {
  if (playBtn.className.includes('pause')){
    music.play();
  } else{
    music.pause();
  }
  
  playBtn.classList.toggle('pause');
})

//setup music
fetch('./data.json')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    
  
const setMusic = (i) => {
  seekBar.value = 0; //set range slide value to 0
  let song = data[i];
  
  currentMusic = i;
  music.src = song.path; 

  songName.innerHTML = song.name;
  artistName.innerHTML = song.artist;
  
  currentTime.innerHTML = '00:00';
  setTimeout(() =>{
    seekBar.max = music.duration;
    
    musicDuration.innerHTML = formatTime(music.duration);
  }, 300)
}
    
setMusic(0)
    
const formatTime = (time) => {
  let min = Math.floor(time/60);
  if (min < 10) {
    min = `0${min}`;
  }
  let sec = Math.floor (time % 60);
  if(sec < 10) {
    sec = `0${sec}`;
  }
  return  `${min} : ${sec}`
}

//seek bar

setInterval(() =>{
  seekBar.value = music.currentTime;
  currentTime.innerHTML = formatTime(music.currentTime)
}, 500)

seekBar.addEventListener('change', () => {
  music.currentTime = seekBar.value;
})

const playMusic = () => {
  music.play();
  playBtn.classList.remove('pause');

}

//forward and backward button

forwardBtn.addEventListener('click', () => {
  if(currentMusic >= data.length -1)  {
    currentMusic = 0;
  } else {
    currentMusic ++;
  }
  setMusic(currentMusic);
  playMusic();
  }
)
backwardBtn.addEventListener('click', () => {
  if(currentMusic <= 0)  {
    currentMusic = data.length - 1;
  } else {
    currentMusic --;
  }
  setMusic(currentMusic);
  playMusic();
  }
)
});   