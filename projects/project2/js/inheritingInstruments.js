class Instrument {
  constructor(volume, family, playVerb) {
    this.volume = volume;
    this.family = family;
    this.playVerb = playVerb;
  }

  play() {
    console.log(
      this.family + " " + this.playVerb + " at " + this.volume + " dB."
    );
  }
}

class Woodwind extends Instrument {
  constructor(volume) {
    super(volume, "Woodwind", "squeaks");
  }
}

class Percussion extends Instrument {
  constructor(volume) {
    super(volume, "Percussion", "drums");
  }
}

class String extends Instrument {
  constructor(volume) {
    super(volume, "String", "strums");
  }
}

let instruments = [];
instruments[0] = new Woodwind(85);
instruments[1] = new Percussion(106);
instruments[2] = new String(92);

for (let i = 0; i < instruments.length; i++) {
  instruments[i].play();
}
