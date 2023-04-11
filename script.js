const percentage = document.querySelector('.percentage');
const charging = document.querySelector('.charging');
const level = document.querySelector('.level');

let animate = 0;
window.addEventListener('load',battery);

function battery () {
  //Get Battery Api
  const status = navigator.getBattery()
  .then(battery => {
  //Set Battery level
  percentage.innerText = battery.level * 100 + '%';
  //animation
  setLevel(battery.level * 100);
  
  //when level up or dwon
  battery.onlevelchange = change;
  //check if charger is connect or not
  if (battery.charging) {
    charging.innerText = 'Connected';
    document.querySelector('.fa-bolt').style.display = 'inline-block';
  }else {
    charging.innerText = 'Disconnect';
    document.querySelector('.fa-bolt').style.display = 'none';
  };
  //when cabel Connected or not
  battery.onchargingchange = charge;
  
 });
 
}


function setLevel (per) {
  let interval;
  //Level up animation
  if (level.style.height == 0) {
    interval = setInterval(() => {
      animate++;
      level.style.height = `${animate}%`;
      //clear interval
      if (animate == per) {
        clearInterval(interval);
      };
    
    }, 10);
    
  }else {
    level.style.height = `${per}%`;
  };
  //batterys color low mid and high
  if (per < 20) {
    level.style.background = '#D35151';
  }else if (per > 20 && per < 50){
    level.style.background = '#D9A748';
  }else {
    level.style.background = '#58A548';
  };
  
  
}

//callback
function change () {
  battery()
}

//callback
function charge() {
  battery()
}

//Kshapii