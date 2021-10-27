const calculateIppt = (age, pushUpCount, sitUpCount, runTime, serviceType, gender) => {
  const ageGroup = getAgeGroup(age);
  const pushUpScore = getStaticScore(0, ageGroup, pushUpCount, gender);
  const sitUpScore = getStaticScore(1, ageGroup, sitUpCount, gender);
  const runScore = getRunScore(ageGroup, runTime, gender);

  const ipptPoints = pushUpScore + sitUpScore + runScore;
// something test
  let grade = "";

  if (ipptPoints >= 85) {
    grade = "Gold";
  } else if (ipptPoints >= 75) {
    grade = "Silver";
  } else if (ipptPoints >= 61) {
    grade = "Pass";
  } else if (serviceType == "nsman") {
    grade = "Pass";
  } else if (serviceType == "active") {
    grade = "Fail";
  }

  return { ipptPoints, grade };
};

const getAgeGroup = (age) => {
  return Math.max(Math.floor((age - 22) / 3), 0);
};

// pushup = 0, situp = 1
const getStaticScore = (station, ageGroup, reps, gender) => {
  let scoreTable;

  if (station == 0 && gender == 'male') {
    scoreTable = pushupScoreTable;
  } 
  if (station == 0 && gender == 'female') {
    scoreTable = femalePushUpScoreTable;
  } 
  if (station == 1 && gender == 'male') {
    scoreTable = situpScoreTable;
  }
  else {
    scoreTable = femaleSitUpScoreTable;
  }

  // get the score from age group
  let score = scoreTable[ageGroup][reps - 1];

  // Fix for when station not complete
  if (reps == 0) {
    score = 0;
  }

  return score;
};

const getRunScore = (ageGroup, runTime) => {
  // round up to nearest 10
  runTime = Math.ceil(runTime / 10) * 10;

  // Limit the values
  runTime = Math.min(runTimes[0], runTime);
  runTime = Math.max(runTimes[runTimes.length - 1], runTime);

  // get the position in the array of the timing
  const pos = runTimes.indexOf(runTime);

  // get score
  const score = runningScoreTable[ageGroup][pos];
  console.log(score);
  return score;
};

const getRunScoreFemale = (ageGroup, runTime) => {

  runTime = Math.ceil(runTime / 10) * 10;

  // Limit the values
  runTime = Math.min(femaleRunTime[0], runTime);
  runTime = Math.max(femaleRunTime[femaleRunTime.length - 1], runTime);

  // get the position in the array of the timing
  const pos = femaleRunTime.indexOf(runTime);

  // get score
  const score = femaleRunningScoreTable[ageGroup][pos];
  console.log(score);
  return score;

}

const pushupScoreTable = [
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 4, 6, 8, 9, 10, 11, 12, 13,
    14, 15, 15, 15, 16, 16, 16, 17, 17, 17, 18, 18, 18, 19, 19, 20, 20, 20, 20,
    20, 21, 21, 21, 21, 22, 22, 22, 22, 23, 23, 23, 23, 24, 24, 24, 25,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 4, 6, 8, 9, 10, 11, 12, 13, 14,
    15, 15, 15, 16, 16, 16, 17, 17, 17, 18, 18, 18, 19, 19, 20, 20, 20, 20, 20,
    21, 21, 21, 21, 22, 22, 22, 22, 23, 23, 23, 23, 24, 24, 24, 25, 25,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 4, 6, 8, 9, 10, 11, 12, 13, 14,
    15, 15, 15, 16, 16, 16, 17, 17, 17, 18, 18, 18, 19, 19, 20, 20, 20, 20, 20,
    20, 21, 21, 21, 21, 22, 22, 22, 23, 23, 23, 23, 24, 24, 24, 25, 25, 25,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 4, 6, 8, 9, 10, 11, 12, 13, 14, 15,
    15, 15, 16, 16, 16, 17, 17, 17, 18, 18, 18, 19, 19, 20, 20, 20, 20, 20, 21,
    21, 21, 21, 22, 22, 22, 22, 23, 23, 23, 23, 24, 24, 24, 25, 25, 25, 25,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 4, 6, 8, 9, 10, 11, 12, 13, 14, 15, 15,
    15, 16, 16, 16, 17, 17, 17, 18, 18, 18, 19, 19, 20, 20, 20, 20, 20, 20, 21,
    21, 21, 21, 22, 22, 22, 22, 23, 23, 23, 23, 24, 24, 25, 25, 25, 25, 25,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 4, 6, 8, 9, 10, 11, 12, 13, 14, 15, 15, 15,
    16, 16, 16, 17, 17, 17, 18, 18, 18, 19, 19, 20, 20, 20, 20, 20, 20, 21, 21,
    21, 21, 22, 22, 22, 22, 23, 23, 23, 23, 24, 24, 25, 25, 25, 25, 25, 25,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 4, 6, 8, 9, 10, 11, 12, 13, 14, 15, 15, 15,
    16, 16, 16, 17, 17, 17, 18, 18, 18, 19, 19, 20, 20, 20, 20, 20, 20, 21, 21,
    21, 21, 22, 22, 22, 22, 23, 23, 23, 23, 24, 24, 25, 25, 25, 25, 25, 25, 25,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 1, 2, 4, 6, 8, 9, 10, 11, 12, 13, 14, 15, 15, 15, 16,
    16, 16, 17, 17, 17, 18, 18, 18, 19, 19, 20, 20, 20, 20, 20, 20, 20, 21, 21,
    21, 21, 22, 22, 22, 22, 23, 23, 23, 23, 24, 25, 25, 25, 25, 25, 25, 25, 25,
  ],
  [
    0, 0, 0, 0, 0, 0, 1, 2, 4, 6, 8, 9, 10, 11, 12, 13, 14, 15, 15, 15, 16, 16,
    16, 17, 17, 17, 18, 18, 18, 19, 19, 20, 20, 20, 21, 21, 21, 21, 22, 22, 22,
    22, 23, 23, 23, 23, 24, 24, 24, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
  ],
  [
    0, 0, 0, 0, 0, 1, 2, 4, 6, 8, 9, 10, 11, 12, 13, 14, 15, 15, 15, 16, 16, 16,
    17, 17, 17, 18, 18, 18, 19, 19, 20, 20, 20, 21, 21, 21, 21, 22, 22, 22, 22,
    23, 23, 23, 23, 24, 24, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
  ],
  [
    0, 0, 0, 0, 1, 2, 4, 6, 8, 9, 10, 11, 12, 13, 14, 15, 15, 15, 16, 16, 16,
    17, 17, 17, 18, 18, 18, 19, 19, 20, 20, 20, 21, 21, 21, 21, 22, 22, 22, 22,
    23, 23, 23, 24, 24, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
    25,
  ],
  [
    0, 0, 0, 1, 2, 4, 6, 8, 9, 10, 11, 12, 13, 14, 15, 15, 15, 16, 16, 16, 17,
    17, 17, 18, 18, 18, 19, 19, 20, 20, 20, 21, 21, 21, 21, 22, 22, 22, 22, 23,
    23, 23, 24, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
    25,
  ],
  [
    0, 0, 1, 2, 4, 6, 8, 9, 10, 11, 12, 13, 14, 15, 15, 15, 16, 16, 16, 17, 17,
    17, 18, 18, 18, 19, 19, 20, 20, 20, 21, 21, 21, 22, 22, 22, 23, 23, 23, 24,
    24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
    25,
  ],
  [
    0, 1, 2, 4, 6, 8, 9, 10, 11, 12, 13, 14, 15, 15, 15, 16, 16, 16, 17, 17, 17,
    18, 18, 18, 19, 19, 20, 20, 20, 21, 21, 21, 22, 22, 22, 23, 23, 24, 24, 25,
    25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
    25,
  ],
];

const situpScoreTable = [
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 6, 7, 7, 8, 9,
    10, 11, 12, 13, 13, 14, 14, 15, 16, 17, 18, 18, 19, 19, 20, 20, 20, 20, 21,
    21, 21, 21, 21, 22, 22, 22, 22, 23, 23, 23, 23, 24, 24, 24, 25,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 6, 7, 7, 8, 9, 10,
    11, 12, 13, 13, 14, 14, 15, 16, 17, 18, 18, 19, 19, 20, 20, 20, 20, 20, 21,
    21, 21, 21, 22, 22, 22, 22, 23, 23, 23, 23, 24, 24, 24, 25, 25,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 6, 7, 7, 8, 9, 10, 11,
    12, 13, 13, 14, 14, 15, 16, 17, 18, 18, 19, 19, 20, 20, 20, 20, 21, 21, 21,
    21, 22, 22, 22, 22, 23, 23, 23, 23, 24, 24, 24, 24, 25, 25, 25,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 6, 7, 7, 8, 9, 10, 11,
    12, 13, 13, 14, 14, 15, 16, 17, 18, 18, 19, 19, 20, 20, 20, 20, 20, 21, 21,
    21, 21, 22, 22, 22, 22, 23, 23, 23, 23, 24, 24, 24, 25, 25, 25, 25,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 6, 7, 7, 8, 9, 10, 11, 12,
    13, 14, 14, 15, 16, 16, 17, 18, 18, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21,
    22, 22, 22, 22, 23, 23, 23, 23, 24, 24, 24, 24, 25, 25, 25, 25, 25,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 6, 7, 7, 8, 9, 10, 11, 12, 13,
    14, 14, 15, 16, 16, 17, 18, 18, 19, 19, 20, 20, 20, 20, 20, 21, 21, 21, 21,
    22, 22, 22, 22, 23, 23, 23, 23, 24, 24, 24, 25, 25, 25, 25, 25, 25,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 6, 7, 7, 8, 9, 10, 11, 12, 13, 14,
    14, 15, 16, 16, 17, 18, 18, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 22, 22,
    22, 22, 23, 23, 23, 23, 24, 24, 24, 24, 25, 25, 25, 25, 25, 25, 25,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 6, 7, 7, 8, 9, 10, 11, 12, 13, 14,
    14, 15, 16, 16, 17, 18, 18, 19, 19, 20, 20, 20, 20, 20, 21, 21, 21, 21, 22,
    22, 22, 22, 23, 23, 23, 23, 24, 24, 24, 25, 25, 25, 25, 25, 25, 25, 25,
  ],
  [
    0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 6, 7, 7, 8, 9, 10, 11, 12, 13, 14, 14,
    15, 16, 16, 17, 18, 18, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 22, 22, 22,
    22, 23, 23, 23, 23, 24, 24, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
  ],
  [
    0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 6, 7, 7, 8, 9, 10, 11, 12, 13, 14, 14, 15,
    16, 16, 17, 18, 18, 19, 19, 20, 20, 20, 20, 20, 21, 21, 21, 21, 22, 22, 22,
    23, 23, 23, 24, 24, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
  ],
  [
    0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 6, 7, 7, 8, 9, 10, 11, 12, 13, 14, 14, 15, 16,
    16, 17, 18, 18, 19, 19, 20, 20, 20, 20, 20, 21, 21, 21, 21, 22, 22, 22, 23,
    23, 23, 24, 24, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
  ],
  [
    0, 0, 0, 1, 2, 3, 4, 5, 6, 6, 7, 7, 8, 9, 10, 11, 12, 13, 14, 14, 15, 16,
    16, 17, 18, 18, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 22, 22, 22, 23, 23,
    23, 24, 24, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
  ],
  [
    0, 0, 1, 2, 3, 4, 5, 6, 6, 7, 7, 8, 9, 10, 11, 12, 13, 14, 14, 15, 16, 16,
    17, 18, 18, 19, 19, 20, 20, 20, 20, 21, 21, 21, 22, 22, 22, 23, 23, 23, 24,
    24, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
  ],
  [
    0, 1, 2, 3, 4, 5, 6, 6, 7, 7, 8, 9, 10, 11, 12, 13, 14, 14, 15, 16, 16, 17,
    18, 18, 19, 19, 20, 20, 20, 21, 21, 21, 22, 22, 22, 23, 23, 23, 24, 24, 24,
    25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
  ],
];

const runningScoreTable = [
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18,
    19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 35, 36,
    36, 37, 37, 38, 38, 39, 39, 40, 40, 41, 42, 43, 44, 46, 48, 49, 50,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18,
    19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 35, 36,
    36, 37, 37, 38, 38, 39, 39, 40, 40, 41, 42, 43, 44, 46, 48, 49, 50, 50,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 19,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 35, 36, 36,
    37, 37, 38, 38, 39, 39, 40, 40, 41, 42, 43, 44, 46, 48, 49, 50, 50, 50,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 35, 36, 36, 37,
    37, 38, 38, 39, 39, 40, 41, 42, 43, 44, 45, 46, 48, 49, 50, 50, 50, 50,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 35, 36, 36, 37, 37,
    38, 38, 39, 39, 40, 41, 42, 43, 44, 45, 46, 48, 49, 50, 50, 50, 50, 50,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 21, 22,
    23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 35, 36, 36, 37, 37, 38,
    38, 39, 39, 40, 40, 41, 42, 43, 44, 45, 46, 48, 49, 50, 50, 50, 50, 50, 50,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 23, 24,
    25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 35, 35, 36, 36, 37, 37, 38, 38,
    39, 39, 40, 40, 41, 42, 43, 44, 45, 46, 48, 49, 50, 50, 50, 50, 50, 50, 50,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 23, 24, 25,
    26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 35, 35, 36, 36, 37, 37, 38, 38, 39,
    39, 40, 40, 41, 42, 43, 44, 45, 46, 48, 49, 50, 50, 50, 50, 50, 50, 50, 50,
  ],
  [
    0, 0, 0, 0, 0, 0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 25, 26, 27,
    28, 29, 30, 31, 32, 33, 34, 35, 35, 35, 36, 36, 37, 37, 38, 38, 39, 39, 40,
    40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 50, 50, 50, 50, 50, 50, 50, 50,
  ],
  [
    0, 0, 0, 0, 0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 25, 26, 27,
    28, 29, 30, 31, 32, 33, 34, 35, 35, 35, 36, 36, 37, 37, 38, 38, 39, 39, 40,
    40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50,
  ],
  [
    0, 0, 0, 0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 25, 26, 27, 28,
    29, 30, 31, 32, 33, 34, 35, 35, 35, 36, 36, 37, 37, 38, 38, 39, 39, 40, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50,
  ],
  [
    0, 0, 0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 25, 26, 27, 28, 29,
    30, 31, 32, 33, 34, 35, 35, 35, 36, 36, 37, 37, 38, 38, 39, 39, 40, 40, 41,
    42, 43, 44, 45, 46, 47, 48, 49, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50,
  ],
  [
    0, 0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 25, 26, 27, 28, 29, 30,
    31, 32, 33, 34, 35, 35, 35, 36, 36, 37, 37, 38, 38, 39, 39, 40, 40, 41, 42,
    43, 44, 45, 46, 47, 48, 49, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50,
  ],
  [
    0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 25, 26, 27, 28, 29, 30,
    31, 32, 33, 34, 35, 35, 35, 36, 36, 37, 37, 38, 38, 39, 39, 40, 40, 41, 42,
    43, 44, 45, 46, 47, 48, 49, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
    50, 50,
  ],
];

const runTimes = [
  1100, 1090, 1080, 1070, 1060, 1050, 1040, 1030, 1020, 1010, 1000, 990, 980,
  970, 960, 950, 940, 930, 920, 910, 900, 890, 880, 870, 860, 850, 840, 830,
  820, 810, 800, 790, 780, 770, 760, 750, 740, 730, 720, 710, 700, 690, 680,
  670, 660, 650, 640, 630, 620, 610, 600, 590, 580, 570, 560, 550, 540, 530,
  520, 510,
];

const femaleSitUpScoreTable = [

  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,4,6,8,10,11,12,13,14,
  15,15,16,16,17,18,18,18,19,19,20,20,20,20,20,21,21,21,
  21,22,22,22,23,23,23,24,24,25,25,25,25,25,25,25,25,25
  ],
  
  
  [0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,4,6,8,10,11,12,13,14,15,
  15,16,16,17,18,18,18,19,19,20,20,20,20,21,21,21,22,22,
  22,23,23,23,24,24,24,25,25,25,25,25,25,25,25,25,25,25
  ],
  
  
  [0,0,0,0,0,0,0,0,0,0,0,0,1,2,4,6,8,10,11,12,13,14,15,15,
  16,16,17,18,18,18,19,19,20,20,20,21,21,21,22,22,22,23,
  23,23,24,24,24,25,25,25,25,25,25,25,25,25,25,25,25,25
  ],
  
  
  [0,0,0,0,0,0,0,0,0,0,0,1,2,4,6,8,10,11,12,13,14,15,15,16,
  17,18,18,18,19,19,19,20,20,20,21,21,21,22,22,22,23,23,
  24,24,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25
  ],
  
  
  [0,0,0,0,0,0,0,0,0,0,1,2,4,6,8,10,11,12,13,14,15,16,17,
  18,18,18,19,19,19,20,20,20,21,21,21,22,22,23,23,24,24,
  25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25
  ],
  
  
  [0,0,0,0,0,0,0,0,0,1,2,4,6,8,10,11,12,14,15,15,16,17,18,
  18,18,19,19,19,20,20,20,21,21,22,22,23,23,24,24,25,25,25,
  25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25
  ],
  
  
  [0,0,0,0,0,0,0,0,1,2,4,6,8,10,11,12,14,15,15,16,17,18,18,
  18,19,19,19,20,20,20,21,21,22,22,23,23,24,24,25,25,25,25,
  25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25
  ],
  
  
  [0,0,0,0,0,0,0,1,2,4,6,8,10,11,12,14,15,15,16,17,18,18,18,
  19,19,19,20,20,20,21,21,22,22,23,23,24,24,25,25,25,25,25,
  25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25
  ],
  
  
  [0,0,0,0,0,0,1,2,4,6,8,10,12,14,15,15,16,16,17,18,18,18,19,
  19,19,20,20,21,21,22,22,23,23,24,24,25,25,25,25,25,25,25,
  25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25
  ],
  
  
  [0,0,0,0,0,1,2,4,6,8,10,12,14,15,15,16,16,17,18,18,18,19,
  19,19,20,21,21,22,22,23,23,24,24,25,25,25,25,25,25,25,25,
  25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25
  ],
  
  
  [0,0,0,0,1,2,4,6,8,10,12,14,15,15,16,16,17,18,18,18,19,19,
  19,20,21,21,22,22,23,23,24,25,25,25,25,25,25,25,25,25,25,
  25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25
  ],
  
  
  [0,0,0,1,2,4,6,8,10,12,14,15,15,16,17,18,18,18,18,19,19,19,
  20,21,21,22,22,23,24,25,25,25,25,25,25,25,25,25,25,25,25,
  25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25
  ],
  
  
  [0,0,1,2,4,6,8,10,12,14,15,15,16,17,18,18,18,18,19,19,19,
  20,21,21,22,23,24,25,25,25,25,25,25,25,25,25,25,25,25,25,
  25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25
  ],
  
  
  [0,1,2,4,6,8,10,12,14,15,15,16,17,18,18,18,18,19,19,19,20,
  21,22,23,24,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,
  25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25
  ]
  
];

const femalePushUpScoreTable = [

  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,5,10,15,15,16,17,18,
  18,18,19,19,19,20,20,20,20,21,21,21,21,21,22,22,22,22,
  22,23,23,23,23,24,24,24,24,25,25,25,25,25,25,25,25,25
  ],
  
  
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,5,10,15,15,16,17,18,18,
  18,19,19,19,20,20,20,20,21,21,21,22,22,22,22,22,23,23,
  23,23,23,24,24,24,24,25,25,25,25,25,25,25,25,25,25,25
  ],
  
  
  [0,0,0,0,0,0,0,0,0,0,0,0,0,1,5,10,15,15,16,17,18,18,18,
  19,19,19,20,20,20,20,21,21,21,22,22,22,22,22,23,23,23,
  23,23,24,24,24,24,25,25,25,25,25,25,25,25,25,25,25,25,25
  ],
  
  
  [0,0,0,0,0,0,0,0,0,0,0,0,1,5,10,15,15,16,17,18,18,18,19,
  19,19,20,20,20,20,21,21,21,21,22,22,22,22,23,23,23,23,24,
  24,24,24,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25
  ],
  
  
  [0,0,0,0,0,0,0,0,0,0,0,1,5,10,15,15,16,17,18,18,18,19,19,
  19,20,20,20,20,20,21,21,21,21,21,22,22,22,22,23,23,23,
  24,24,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25
  ],
  
  
  [0,0,0,0,0,0,0,0,0,0,1,5,10,15,15,16,17,18,18,18,19,19,19,
  20,20,20,20,20,21,21,21,21,22,22,22,23,23,23,24,24,24,25,
  25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25
  ],
  
  
  [0,0,0,0,0,0,0,0,0,1,5,10,15,15,16,17,18,18,18,19,19,19,20,
  20,20,20,21,21,21,21,22,22,22,23,23,23,24,24,24,25,25,25,
  25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25
  ],
  
  
  [0,0,0,0,0,0,0,0,1,5,10,15,15,16,17,18,18,18,19,19,19,20,
  20,20,20,21,21,21,22,22,22,23,23,23,24,24,24,25,25,25,25,
  25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25
  ],
  
  
  [0,0,0,0,0,0,0,1,5,10,15,15,16,17,18,18,18,19,19,19,20,20,
  20,21,21,21,22,22,22,23,23,23,24,24,24,25,25,25,25,25,25,
  25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25
  ],
  
  
  [0,0,0,0,0,0,1,5,10,15,15,16,17,18,18,18,19,19,19,20,20,21,
  21,21,22,22,22,23,23,23,24,24,24,25,25,25,25,25,25,25,25,
  25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25
  ],
  
  
  [0,0,0,0,0,1,5,10,15,15,16,17,18,18,18,19,19,19,20,20,21,
  21,22,22,22,23,23,23,24,24,24,25,25,25,25,25,25,25,25,25,
  25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25
  ],
  
  
  [0,0,0,0,1,5,10,15,15,16,17,18,18,18,19,19,19,20,20,20,21,
  21,22,22,23,23,24,24,25,25,25,25,25,25,25,25,25,25,25,25,
  25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25
  ],
  
  
  [0,0,0,1,5,10,15,15,16,17,18,18,18,19,19,19,20,20,21,21,22,
  22,23,24,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,
  25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25
  ],
  
  
  [0,0,1,5,10,15,15,16,17,18,18,18,19,19,19,20,20,21,21,22,22,
  23,24,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,
  25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25
  ],
  
  
  [0,1,5,10,15,15,16,17,18,18,18,19,19,19,20,20,21,21,22,22,23,
  24,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,
  25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25
  ]
  
  
];

const femaleRunningScoreTable = [
  [
  0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,4,6,8,10,12,14,16,18,20,21,22,23,24,25,26,
  27,28,29,30,30,31,31,32,32,33,33,34,34,35,35,35,36,36,36,37,37,37,38,38,38,
  39,39,41,41,42,42,43,43,44,44,45,45,46,46,47,47,48,49,50
  ],
  
  [0,0,0,0,0,0,0,0,0,0,0,0,1,2,4,6,8,10,12,14,16,18,20,21,22,23,24,25,26,27
  ,28,29,30,30,31,31,32,32,33,33,34,34,35,35,35,36,36,36,37,37,37,38,38,38,
  39,39,41,41,42,42,43,43,44,44,45,45,46,46,47,48,49,50,50,50
  ],
  
  [0,0,0,0,0,0,0,0,0,0,0,1,2,4,6,8,10,12,14,16,18,20,21,22,23,24,25,26,27,28,
  29,30,30,31,31,32,32,33,33,34,34,35,35,35,36,36,36,37,37,37,38,38,38,39,39,41,
  41,42,42,43,43,44,44,45,45,46,46,47,48,49,50,50,50,50
  ],
  
  [0,0,0,0,0,0,0,0,0,0,1,2,4,6,8,10,12,14,16,18,20,21,22,23,24,25,26,27,28,29,
  30,30,31,31,32,32,33,33,34,34,35,35,35,36,36,36,37,37,37,38,38,38,39,39,41,41,
  42,42,43,43,44,44,45,45,46,46,47,48,49,50,50,50,50,50
  ],
  
  [0,0,0,0,0,0,0,0,0,1,2,4,6,8,10,12,14,16,18,20,21,22,23,24,25,26,27,28,29,30,
  30,31,31,32,32,33,33,34,34,35,35,35,36,36,36,37,37,37,38,38,38,39,39,41,41,42,
  42,43,43,44,44,45,45,46,46,47,48,49,50,50,50,50,50,50
  ],
  
  [0,0,0,0,0,0,0,0,1,2,4,6,8,10,12,14,16,18,20,21,22,23,24,25,26,27,28,29,30,30,
  31,31,32,32,33,33,34,34,35,35,35,36,36,36,37,37,37,38,38,38,39,39,41,41,42,42,
  43,43,44,44,45,45,46,46,47,48,49,50,50,50,50,50,50,50
  ],
  
  [0,0,0,0,0,0,0,1,2,4,6,8,10,12,14,16,18,20,21,22,23,24,25,26,27,28,29,30,30,31,
  31,32,32,33,33,34,34,35,35,35,36,36,36,37,37,37,38,38,38,39,39,41,41,42,42,43,43,
  44,44,45,45,46,46,47,48,49,50,50,50,50,50,50,50,50
  ],
  
  [0,0,0,0,0,0,1,2,4,6,8,10,12,14,16,18,20,21,22,23,24,25,26,27,28,29,30,30,31,31,
  32,32,33,33,34,34,35,35,35,36,36,36,37,37,37,38,38,38,39,39,41,41,42,42,43,43,44,
  44,45,45,46,46,47,48,49,50,50,50,50,50,50,50,50,50
  ],
  
  [0,0,0,0,0,1,2,4,6,8,10,12,14,16,18,20,21,22,23,24,25,26,27,28,29,30,30,31,31,32,
  32,33,33,34,34,35,35,35,36,36,36,37,37,37,38,38,38,39,39,41,41,42,42,43,43,44,44,
  45,45,46,46,47,48,49,50,50,50,50,50,50,50,50,50,50
  ],
  
  [0,0,0,0,1,2,4,6,8,10,12,14,16,18,20,21,22,23,24,25,26,27,28,29,30,30,31,31,32,32,
  33,33,34,34,35,35,35,36,36,36,37,37,37,38,38,38,39,39,41,41,42,42,43,43,44,44,45,45,
  46,46,47,48,49,50,50,50,50,50,50,50,50,50,50,50
  ],
  
  [0,0,0,1,2,4,6,8,10,12,14,16,18,20,21,22,23,24,25,26,27,28,29,30,30,31,31,32,32,33,
  33,34,34,35,35,35,36,36,36,37,37,37,38,38,38,39,39,41,41,42,42,43,43,44,44,45,46,47,
  48,49,50,50,50,50,50,50,50,50,50,50,50,50,50,50
  ],
  
  [0,0,1,2,4,6,8,10,12,14,16,18,20,21,22,23,24,25,26,27,28,29,30,30,31,31,32,32,33,33,
  34,34,35,35,35,36,36,36,37,37,37,38,38,38,39,39,41,41,42,42,43,43,44,44,45,46,47,48,
  49,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50
  ],
  
  [0,1,2,4,6,8,10,12,14,16,18,20,21,22,23,24,25,26,27,28,29,30,30,31,31,32,32,33,33,34,
  34,35,35,35,36,36,36,37,37,37,38,38,38,39,39,41,41,42,42,43,43,44,45,46,47,48,49,50,
  50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50
  ],
  
  [1,2,4,6,8,10,12,14,16,18,20,21,22,23,24,25,26,27,28,29,30,30,31,31,32,32,33,33,34,
  34,35,35,35,36,36,36,37,37,37,38,38,38,39,39,41,41,42,42,43,44,45,46,47,48,49,50,50,
  50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50
  ],
  
];

const femaleRunTime = [1330,1320,1310,1300,1290,1280,1270,1260,1250,1240,1230,1220,1210,1200,1190,
1180,1170,1160,1150,1140,1130,1120,1110,1100,1090,1080,1070,1060,1050,1040,1030,1020,1010,1000,
990,980,970,960,950,940,930,920,910,900,890,880,870,860,850,840,830,820,810,800,790,780,770,760,
750,740,730,720,710,700,690,680,670,660,650,640,630,620,610,600];



export { calculateIppt };
