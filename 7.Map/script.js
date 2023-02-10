"use strict";

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

class Workouts {
  _date = new Date();
  _id = Date.now();

  constructor(dis, dur, coords) {
    this.dis = dis;
    this.dur = dur;
    this.coords = coords;
  }
}

class Running extends Workouts {
  type = "running";
  symbol = "🏃‍♂️";
  constructor(dis, dur, cadence, coords) {
    super(dis, dur, coords);
    this.cadence = cadence;
    this._setDes();
    this.claPace();
  }

  claPace() {
    this.pace = Math.round(this.dur / this.dis);
    return this.pace;
  }

  _setDes() {
    // prettier-ignore
    this.des = `${this.type.at(0).toUpperCase()}${this.type.slice(1)} on ${months[this._date.getMonth() - 1]} ${this._date.getDay()}`;
  }
}
class Cycling extends Workouts {
  type = "cycling";
  symbol = "🚴‍♀️";
  constructor(dis, dur, elevationGain, coords) {
    super(dis, dur, coords);
    this.elevationGain = elevationGain;
    this.claSpeed();
    this._setDes();
  }
  claSpeed() {
    this.speed = this.dur / this.dis;
    return this.speed;
  }
  _setDes() {
    // prettier-ignore
    this.des = `${this.type.at(0).toUpperCase()}${this.type.slice(1)} on ${months[this._date.getMonth() - 1]} ${this._date.getDay()}`;
  }
}

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");
class App {
  #map;
  #mapMarker;
  #allWorkouts = [];
  constructor() {
    this._getPosition();
    this._getLocalStorage()
    form.addEventListener("submit", this._newWorkout.bind(this));
    inputType.addEventListener("change", this._toggleFields.bind(this));
    containerWorkouts.addEventListener("click", this._gotoCentre.bind(this));
  }

  _getData(e, coords) {
    e.preventDefault();
    let distanceVal = +inputDistance.value;
    let durationVal = +inputDuration.value;
    let typeVal = inputType.value;
    let workout;
    if (typeVal === "running") {
      let Cadenceval = +inputCadence.value;
      if (distanceVal > 0 && durationVal > 0 && Cadenceval > 0) {
        workout = new Running(distanceVal, durationVal, Cadenceval, coords);
        this.#allWorkouts.push(workout);
        return workout;
      } else {
        alert("Please Enter valid input");
        return;
      }
    }

    if (typeVal === "cycling") {
      let ElevationVal = +inputElevation.value;
      if (distanceVal > 0 && durationVal > 0 && ElevationVal) {
        // prettier-ignore
        workout = new Cycling(distanceVal,durationVal,ElevationVal,coords);
        this.#allWorkouts.push(workout);
        return workout;
      } else {
        alert("Please Enter valid input");
        return;
      }
    }
    console.log(this.#allWorkouts);
  }

  _getPosition() {
    navigator.geolocation.getCurrentPosition(
      this._loadMap.bind(this),
      function () {
        alert("Location couldn't be found");
      }
    );
  }

  _loadMap(postion) {
    let { latitude: lat } = postion.coords;
    let { longitude: lon } = postion.coords;
    let coords = [lat, lon];
    this.#map = L.map("map").setView(coords, 13);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
      this.#map
    );
    this.#map.on("click", mapMarker => {
      this.#mapMarker = mapMarker;
      this._showForm();
    });
  }

  _showForm() {
    form.classList.remove("hidden");
    inputDistance.focus();
  }

  _clearForm() {
    // prettier-ignore
    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = " ";
  }
  _toggleFields() {
    inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
    inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
  }

  _renderList(workoutval) {
    // prettier-ignore
    let html = 
    `<li class="workout workout--${workoutval.type}" data-id="${workoutval._id}">
      <h2 class="workout__title">${workoutval.des}</h2>
      <div class="workout__details">
      <span class="workout__icon">${workoutval.symbol}</span>
      <span class="workout__value">${workoutval.dis}</span>
      <span class="workout__unit">km</span>
      </div>
      <div class="workout__details">
      <span class="workout__icon">⏱</span>
      <span class="workout__value">${workoutval.dur}</span>
      <span class="workout__unit">min</span>
      </div>
      <div class="workout__details">
      <span class="workout__icon">⚡️</span>
      <span class="workout__value">${workoutval.pace || workoutval.speed}</span>
      <span class="workout__unit">min/km</span>
      </div>
      <div class="workout__details">
      <span class="workout__icon">${
        workoutval.type === "running" ? "👣" : "⛰️"
      }</span>
      <span class="workout__value">${workoutval.cadence || workoutval.elevationGain}</span>
      <span class="workout__unit">${
        workoutval.type === "running" ? "spm" : "m"
      }</span>
      </div>
      </li>`;

    this._setLocalStorage();
    form.insertAdjacentHTML("afterend", html);
    form.style.display = "none";
    form.classList.add("hidden");
    setTimeout(() => (form.style.display = "grid"), 1000);
  }

  _newWorkout(e) {
    e.preventDefault();
    let { lat, lng } = this.#mapMarker.latlng;
    let workoutObj = this._getData(e, [lat, lng]);
    L.marker([lat, lng], { draggable: true })
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          autoClose: false,
          closeOnClick: false,
          className: `${workoutObj.type}-popup`,
        }).setContent(`${workoutObj.symbol} ${workoutObj.des}`)
      )
      .openPopup();
    this._clearForm();
    inputDistance.blur();
    this._renderList(workoutObj);
  }

  _gotoCentre(e) {
    let clicked = e.target.closest(".workout");
    if (!clicked) return;
    let clickedItem = this.#allWorkouts.find(
      map => map.id == clicked.dataset._id
    );
    this.#map.setView(clickedItem.coords, 13, {
      Animation: true,
      pan: { duration: 1 },
    });
  }

  _setLocalStorage() {
    localStorage.setItem("workout", JSON.stringify(this.#allWorkouts));
  }

  _getLocalStorage() {
    let datas = JSON.parse(localStorage.getItem("workout"));
    datas.forEach(data => {
      this._renderList(data);
    });
  }
}

let newApp = new App();
