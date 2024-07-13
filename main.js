// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ['A', 'T', 'C', 'G']
    return dnaBases[Math.floor(Math.random() * 4)] 
  }
  
  // Returns a random single strand of DNA containing 15 bases
  const mockUpStrand = () => {
    const newStrand = []
    for (let i = 0; i < 15; i++) {
      newStrand.push(returnRandBase())
    }
    return newStrand
  }
  
  // Finds the two most related instances of pAequor
  function findMostRelated(pAequorPopulation) {
    let maxSimilarity = 0;
    let mostRelatedPair = [];
  
    for (let i = 0; i < pAequorPopulation.length - 1; i++) {
      for (let j = i + 1; j < pAequorPopulation.length; j++) {
        const organism1 = pAequorPopulation[i];
        const organism2 = pAequorPopulation[j];
  
        // organism1.compareDNA(organism2); // For debugging purposes, uncomment this line
  
        const sharedBases = organism1.dna.reduce((count, base, index) => {
          return base === organism2.dna[index] ? count + 1 : count;
        }, 0);
  
        const similarity = (sharedBases / organism1.dna.length) * 100;
  
        if (similarity > maxSimilarity) {
          maxSimilarity = similarity;
          mostRelatedPair = [organism1, organism2];
        }
      }
    }
     console.log(`The most related pAqueours are #${mostRelatedPair[0].specimenNum} and #${mostRelatedPair[1].specimenNum}.`);
     mostRelatedPair[0].compareDNA(mostRelatedPair[1]);
    return mostRelatedPair;
  }
  
  // Returns an object whith DNA containing 15 random bases
  const pAequorFactory = (specimenNum, dna) => {
    return {
      specimenNum,
      dna,
      mutate() {
        baseMutated = Math.floor(Math.random() * this.dna.length);
        startBase = this.dna[baseMutated];
        do {
          this.dna[baseMutated] = returnRandBase();
        } while (startBase === this.dna[baseMutated]); 
        return dna;
      },
      compareDNA(otherpAequor) {
        const sharedBases = this.dna.reduce((count, base, index) => {
          return base === otherpAequor.dna[index] ? count + 1 : count;
        }, 0);
        const percentage = Math.round((sharedBases / this.dna.length) * 100);
        console.log(`Specimen #${this.specimenNum} and specimen #${otherpAequor.specimenNum} have ${percentage}% DNA in common.`);
      },
      willLikelySurvive() {
        const CGCount = this.dna.filter(base => base === 'C' || base === 'G').length;
        return CGCount / this.dna.length >= 0.6;
      },
      complementStrand() {
        const complementBases = { A: 'T', T: 'A', C: 'G', G: 'C' };
        return this.dna.map(base => complementBases[base]);
      }
    }
  };
  
  function createSurvivingpAequor(numpAequor) {
    const survivingpAequor = [];
    let specimenNum = 1;
  
    while (survivingpAequor.length < numpAequor) {
      const newpAequor = pAequorFactory(specimenNum, mockUpStrand());
      if (newpAequor.willLikelySurvive()) {
        survivingpAequor.push(newpAequor);
      }
      specimenNum++;
    }
  
    return survivingpAequor;
  }
  
  const survivingPopulation = createSurvivingpAequor(30);
  findMostRelated(survivingPopulation);