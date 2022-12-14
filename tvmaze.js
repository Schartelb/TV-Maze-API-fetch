/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */


/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */
async function searchShows(query) {
  // TODO: Make an ajax request to the searchShows api.  Remove
  // hard coded data.
  try{
  const res = await axios.get(`https://api.tvmaze.com/search/shows?q=${query}`) 
  const answer=[]
  for(let i=0; i<res.data.length; i++){
  answer.push(res.data[i].show)
  }
  if(answer.length===0){
    await getEpisodes(query)
  }
  return answer
}
catch{
  return
}
}



/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();
  for (let thing of shows) {
    console.log(thing.id)
    let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${thing.id}">
         <div class="card" data-show-id="${thing.id}">
           <div class="card-body">
             <h5 class="card-title">${thing.name}</h5>
             <p class="card-text">${thing.summary}</p>
           </div>
         </div>
       </div>
      `);

    $showsList.append($item);
  }
}


/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$("#search-form").on("submit", async function handleSearch (evt) {
  evt.preventDefault();

  let query = $("#search-query").val();
  if (!query) return;

  $("#episodes-area").hide();
    let shows = await searchShows(query);
  
  populateShows(shows);
});


/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

async function getEpisodes(id) {
  // TODO: get episodes from tvmaze
  //       you can get this by making GET request to
  //       http://api.tvmaze.com/shows/SHOW-ID-HERE/episodes
try{
  const res = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`) 
  let shows=[]

   for(let i=0; i<res.data.length; i++){
  shows.push(res.data[i])
  }
  populateShows(shows)
}
catch{
  return
}
}
  // TODO: return array-of-episode-info, as described in docstring above

