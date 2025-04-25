
async function checkServerStatus() {
  try {
    var serverIP = document.currentScript.getAttribute('ip');
    var htmlindex = document.currentScript.getAttribute('index');
    var use_ip = document.currentScript.getAttribute('use_ip');
    const response = await fetch(`https://api.mcsrvstat.us/3/${serverIP}`);
    const data = await response.json();
    
    const playersElement = document.getElementById(`mc-player-list-${htmlindex}`);
    
    if (data.online) {
      document.getElementById(`mc-icon-${htmlindex}`).innerHTML = `<img src="${data.icon}" width="64px" height="64px" alt="Server Icon"/>`;
      document.getElementById(`mc-online-${htmlindex}`).innerHTML = `Server is <span style="color:green;">Online</span>`;
      if (use_ip) {
        document.getElementById(`mc-hostname-${htmlindex}`).innerHTML = `${serverIP}`;
      }
      else { 
        document.getElementById(`mc-hostname-${htmlindex}`).innerHTML = `${data.hostname}`;
      }
      document.getElementById(`mc-players-${htmlindex}`).innerHTML = `Players: ${data.players.online}/${data.players.max}`;
      document.getElementById(`mc-version-${htmlindex}`).innerHTML = `Version: ${data.version}`;
      document.getElementById(`mc-motd-${htmlindex}`).innerHTML = `Server MOTD:<br>${data.motd.html.join('<br>')}`;
      if (data.players.list) {
        var playerlist = `<p>Players:</p>`;
        playerlist += `<ul>`;
        data.players.list.forEach(function(player, i) {
          playerlist += `
          <li class="mc-player"><img src="https://api.mineatar.io/face/${player.uuid}/" width="32px" height="32px" alt="Player's head icon"/> ${player.name}</li>
          `;
        });
        playerlist += `</ul>`;
        playersElement.innerHTML = playerlist;
      } else {
        playersElement.innerHTML = `<p>No players online</p>`;
      }
    } else {
      document.getElementById(`mc-online-${htmlindex}`).innerHTML = `Server is <span style="color:red;">Offline</span>`;
    }
  } catch (error) {
    console.error('Error fetching server status:', error);
    document.getElementById(`mc-status-${htmlindex}`).innerHTML = `Unable to retrieve server status for ${serverIP}.`;
  }
}

checkServerStatus();
