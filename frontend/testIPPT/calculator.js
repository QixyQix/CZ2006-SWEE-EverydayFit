

import { useNavigation } from '@react-navigation/native';

const pushup_score_table=[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,4,6,8,9,10,11,12,13,14,15,15,15,16,16,16,17,17,17,18,18,18,19,19,20,20,20,20,20,21,21,21,21,22,22,22,22,23,23,23,23,24,24,24,25,],[0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,4,6,8,9,10,11,12,13,14,15,15,15,16,16,16,17,17,17,18,18,18,19,19,20,20,20,20,20,21,21,21,21,22,22,22,22,23,23,23,23,24,24,24,25,25,],[0,0,0,0,0,0,0,0,0,0,0,0,1,2,4,6,8,9,10,11,12,13,14,15,15,15,16,16,16,17,17,17,18,18,18,19,19,20,20,20,20,20,20,21,21,21,21,22,22,22,23,23,23,23,24,24,24,25,25,25,],[0,0,0,0,0,0,0,0,0,0,0,1,2,4,6,8,9,10,11,12,13,14,15,15,15,16,16,16,17,17,17,18,18,18,19,19,20,20,20,20,20,21,21,21,21,22,22,22,22,23,23,23,23,24,24,24,25,25,25,25,],[0,0,0,0,0,0,0,0,0,0,1,2,4,6,8,9,10,11,12,13,14,15,15,15,16,16,16,17,17,17,18,18,18,19,19,20,20,20,20,20,20,21,21,21,21,22,22,22,22,23,23,23,23,24,24,25,25,25,25,25,],[0,0,0,0,0,0,0,0,0,1,2,4,6,8,9,10,11,12,13,14,15,15,15,16,16,16,17,17,17,18,18,18,19,19,20,20,20,20,20,20,21,21,21,21,22,22,22,22,23,23,23,23,24,24,25,25,25,25,25,25,],[0,0,0,0,0,0,0,0,1,2,4,6,8,9,10,11,12,13,14,15,15,15,16,16,16,17,17,17,18,18,18,19,19,20,20,20,20,20,20,21,21,21,21,22,22,22,22,23,23,23,23,24,24,25,25,25,25,25,25,25,],[0,0,0,0,0,0,0,1,2,4,6,8,9,10,11,12,13,14,15,15,15,16,16,16,17,17,17,18,18,18,19,19,20,20,20,20,20,20,20,21,21,21,21,22,22,22,22,23,23,23,23,24,25,25,25,25,25,25,25,25,],[0,0,0,0,0,0,1,2,4,6,8,9,10,11,12,13,14,15,15,15,16,16,16,17,17,17,18,18,18,19,19,20,20,20,21,21,21,21,22,22,22,22,23,23,23,23,24,24,24,24,25,25,25,25,25,25,25,25,25,25,],[0,0,0,0,0,1,2,4,6,8,9,10,11,12,13,14,15,15,15,16,16,16,17,17,17,18,18,18,19,19,20,20,20,21,21,21,21,22,22,22,22,23,23,23,23,24,24,24,25,25,25,25,25,25,25,25,25,25,25,25,],[0,0,0,0,1,2,4,6,8,9,10,11,12,13,14,15,15,15,16,16,16,17,17,17,18,18,18,19,19,20,20,20,21,21,21,21,22,22,22,22,23,23,23,24,24,24,25,25,25,25,25,25,25,25,25,25,25,25,25,25,],[0,0,0,1,2,4,6,8,9,10,11,12,13,14,15,15,15,16,16,16,17,17,17,18,18,18,19,19,20,20,20,21,21,21,21,22,22,22,22,23,23,23,24,24,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,],[0,0,1,2,4,6,8,9,10,11,12,13,14,15,15,15,16,16,16,17,17,17,18,18,18,19,19,20,20,20,21,21,21,22,22,22,23,23,23,24,24,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,],[0,1,2,4,6,8,9,10,11,12,13,14,15,15,15,16,16,16,17,17,17,18,18,18,19,19,20,20,20,21,21,21,22,22,22,23,23,24,24,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,],]

const situp_score_table=[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,4,5,6,6,7,7,8,9,10,11,12,13,13,14,14,15,16,17,18,18,19,19,20,20,20,20,21,21,21,21,21,22,22,22,22,23,23,23,23,24,24,24,25,],[0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,4,5,6,6,7,7,8,9,10,11,12,13,13,14,14,15,16,17,18,18,19,19,20,20,20,20,20,21,21,21,21,22,22,22,22,23,23,23,23,24,24,24,25,25,],[0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,4,5,6,6,7,7,8,9,10,11,12,13,13,14,14,15,16,17,18,18,19,19,20,20,20,20,21,21,21,21,22,22,22,22,23,23,23,23,24,24,24,24,25,25,25,],[0,0,0,0,0,0,0,0,0,0,0,1,2,3,4,5,6,6,7,7,8,9,10,11,12,13,13,14,14,15,16,17,18,18,19,19,20,20,20,20,20,21,21,21,21,22,22,22,22,23,23,23,23,24,24,24,25,25,25,25,],[0,0,0,0,0,0,0,0,0,0,1,2,3,4,5,6,6,7,7,8,9,10,11,12,13,14,14,15,16,16,17,18,18,19,19,20,20,20,20,21,21,21,21,22,22,22,22,23,23,23,23,24,24,24,24,25,25,25,25,25,],[0,0,0,0,0,0,0,0,0,1,2,3,4,5,6,6,7,7,8,9,10,11,12,13,14,14,15,16,16,17,18,18,19,19,20,20,20,20,20,21,21,21,21,22,22,22,22,23,23,23,23,24,24,24,25,25,25,25,25,25,],[0,0,0,0,0,0,0,0,1,2,3,4,5,6,6,7,7,8,9,10,11,12,13,14,14,15,16,16,17,18,18,19,19,20,20,20,20,21,21,21,21,22,22,22,22,23,23,23,23,24,24,24,24,25,25,25,25,25,25,25,],[0,0,0,0,0,0,0,1,2,3,4,5,6,6,7,7,8,9,10,11,12,13,14,14,15,16,16,17,18,18,19,19,20,20,20,20,20,21,21,21,21,22,22,22,22,23,23,23,23,24,24,24,25,25,25,25,25,25,25,25,],[0,0,0,0,0,0,1,2,3,4,5,6,6,7,7,8,9,10,11,12,13,14,14,15,16,16,17,18,18,19,19,20,20,20,20,21,21,21,21,22,22,22,22,23,23,23,23,24,24,24,25,25,25,25,25,25,25,25,25,25,],[0,0,0,0,0,1,2,3,4,5,6,6,7,7,8,9,10,11,12,13,14,14,15,16,16,17,18,18,19,19,20,20,20,20,20,21,21,21,21,22,22,22,23,23,23,24,24,24,25,25,25,25,25,25,25,25,25,25,25,25,],[0,0,0,0,1,2,3,4,5,6,6,7,7,8,9,10,11,12,13,14,14,15,16,16,17,18,18,19,19,20,20,20,20,20,21,21,21,21,22,22,22,23,23,23,24,24,24,25,25,25,25,25,25,25,25,25,25,25,25,25,],[0,0,0,1,2,3,4,5,6,6,7,7,8,9,10,11,12,13,14,14,15,16,16,17,18,18,19,19,20,20,20,20,21,21,21,21,22,22,22,23,23,23,24,24,24,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,],[0,0,1,2,3,4,5,6,6,7,7,8,9,10,11,12,13,14,14,15,16,16,17,18,18,19,19,20,20,20,20,21,21,21,22,22,22,23,23,23,24,24,24,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,],[0,1,2,3,4,5,6,6,7,7,8,9,10,11,12,13,14,14,15,16,16,17,18,18,19,19,20,20,20,21,21,21,22,22,22,23,23,23,24,24,24,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,],]

const running_score_table=[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,4,6,8,10,12,14,16,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,35,36,36,37,37,38,38,39,39,40,40,41,42,43,44,46,48,49,50,],[0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,4,6,8,10,12,14,16,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,35,36,36,37,37,38,38,39,39,40,40,41,42,43,44,46,48,49,50,50,],[0,0,0,0,0,0,0,0,0,0,0,0,1,2,4,6,8,10,12,14,16,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,35,36,36,37,37,38,38,39,39,40,40,41,42,43,44,46,48,49,50,50,50,],[0,0,0,0,0,0,0,0,0,0,0,1,2,4,6,8,10,12,14,16,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,35,36,36,37,37,38,38,39,39,40,41,42,43,44,45,46,48,49,50,50,50,50,],[0,0,0,0,0,0,0,0,0,0,1,2,4,6,8,10,12,14,16,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,35,36,36,37,37,38,38,39,39,40,41,42,43,44,45,46,48,49,50,50,50,50,50,],[0,0,0,0,0,0,0,0,0,1,2,4,6,8,10,12,14,16,18,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,35,36,36,37,37,38,38,39,39,40,40,41,42,43,44,45,46,48,49,50,50,50,50,50,50,],[0,0,0,0,0,0,0,0,1,2,4,6,8,10,12,14,16,18,20,22,23,24,25,26,27,28,29,30,31,32,33,34,35,35,35,36,36,37,37,38,38,39,39,40,40,41,42,43,44,45,46,48,49,50,50,50,50,50,50,50,],[0,0,0,0,0,0,0,1,2,4,6,8,10,12,14,16,18,20,22,23,24,25,26,27,28,29,30,31,32,33,34,35,35,35,36,36,37,37,38,38,39,39,40,40,41,42,43,44,45,46,48,49,50,50,50,50,50,50,50,50,],[0,0,0,0,0,0,1,2,4,6,8,10,12,14,16,18,20,22,24,25,26,27,28,29,30,31,32,33,34,35,35,35,36,36,37,37,38,38,39,39,40,40,41,42,43,44,45,46,47,48,49,50,50,50,50,50,50,50,50,50,],[0,0,0,0,0,1,2,4,6,8,10,12,14,16,18,20,22,24,25,26,27,28,29,30,31,32,33,34,35,35,35,36,36,37,37,38,38,39,39,40,40,41,42,43,44,45,46,47,48,49,50,50,50,50,50,50,50,50,50,50,],[0,0,0,0,1,2,4,6,8,10,12,14,16,18,20,22,24,25,26,27,28,29,30,31,32,33,34,35,35,35,36,36,37,37,38,38,39,39,40,40,41,42,43,44,45,46,47,48,49,50,50,50,50,50,50,50,50,50,50,50,],[0,0,0,1,2,4,6,8,10,12,14,16,18,20,22,24,25,26,27,28,29,30,31,32,33,34,35,35,35,36,36,37,37,38,38,39,39,40,40,41,42,43,44,45,46,47,48,49,50,50,50,50,50,50,50,50,50,50,50,50,],[0,0,1,2,4,6,8,10,12,14,16,18,20,22,24,25,26,27,28,29,30,31,32,33,34,35,35,35,36,36,37,37,38,38,39,39,40,40,41,42,43,44,45,46,47,48,49,50,50,50,50,50,50,50,50,50,50,50,50,50,],[0,1,2,4,6,8,10,12,14,16,18,20,22,24,25,26,27,28,29,30,31,32,33,34,35,35,35,36,36,37,37,38,38,39,39,40,40,41,42,43,44,45,46,47,48,49,50,50,50,50,50,50,50,50,50,50,50,50,50,50,],]

const run_times=[1100,1090,1080,1070,1060,1050,1040,1030,1020,1010,1000,990,980,970,960,950,940,930,920,910,900,890,880,870,860,850,840,830,820,810,800,790,780,770,760,750,740,730,720,710,700,690,680,670,660,650,640,630,620,610,600,590,580,570,560,550,540,530,520,510,]

const getAgeGrp = (age) => {

  const group = 0

  while (age >= 22)
  {
    group += 1
    age -= 3
  }

  return group
}

// pushup = 0, situp = 1

const get_static_score = (Station, age_group, reps) => {

    if (Station == 0)
    {
      score_table = pushup_score_table 
    }
    else 
    {
      score_table = situp_score_table
    }
    
    // get the score from age group
    score = score_table[age_group][reps - 1]

    // Fix for when station not complete
    if (reps == 0)
    {
        score = 0
    }

    return score;
}

const get_score = (age, numPushups, numSitups, run_secs, serviceType) => {

    age_group = getAgeGrp(age)

    puhsups_score = get_static_score( 0 , age_group, numPushups)

    situps_score = get_static_score( 1, age_group, situps )

    run_score = get_run_score( age_group, run_secs )

    totalPoints = puhsups_score + situps_score + run_score

    // find awards
    //       ipptPoints: "",
    //   grade: "",

    award = '';

    if (totalPoints > 80)
    {
       award = "Gold";
    }
    else if (totalPoints > 70)
    {
       award = "Silver";
    }    
    else if (totalPoints > 60)
    {
       award = "Pass with Incentive";
    }   
    else 
    {
       award = "Pass";
    }   
//     "nsman"
//     Award Type Total Points Required
//  >50
//  >60
// =
//         awards = [
//             Award(
//                 name=
//                 subtitle="Commando/Diver/Guards",
//                 cash=500,
//                 min_score=90,
//             ),
//             Award(
//                 name="Gold",
//                 cash=500,
//                 min_score=85,
//             ),
//             Award(
//                 name="Sliver",
//                 cash=300,
//                 min_score=75,
//             ),
//             Award(
//                 name="Pass",
//                 subtitle="NSMen incentive",
//                 min_score=61,
//             ),
//             Award(
//                 name="Pass*",
//                 subtitle="NSMen only",
//                 min_score=51,
//             ),
//             Award(
//                 name="Fail",
//                 min_score=0,
//             ),
//         ]
}


console.log(get_static_score(0, 1, 45));
export default function Calculator() {

  const navigation = useNavigation();

  return (
        null
    )
}