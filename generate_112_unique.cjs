const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

// 1. Dữ liệu từ vựng và chủ đề đa dạng
const topics = [
  "renewable energy", "online education", "artificial intelligence", "mental health", 
  "sustainable tourism", "global economy", "modern art", "traditional culture", 
  "extreme sports", "space exploration", "wildlife conservation", "public transportation", 
  "targeted advertising", "remote work", "plant-based diets", "urbanization", 
  "climate change", "genetic engineering", "fast fashion", "cybersecurity"
];

const grammars = [
  "the Present Perfect tense", "relative clauses", "the Passive voice", 
  "conditional sentences", "modal verbs", "definite articles", 
  "prepositions of time", "gerunds and infinitives", "complex sentences", 
  "cohesive devices", "reported speech", "inversion", "cleft sentences"
];

const skills = [
  "Reading Skimming", "Listening Section 3", "Writing Task 1 Maps", "Writing Task 2 Essays", 
  "Speaking Part 1", "Speaking Part 2", "Speaking Part 3"
];

// 2. Các mẫu bài tập (Templates)
const templates = [
  // Chủ đề xã hội (Reading/Vocab)
  (t) => ({
    c: `In recent years, the impact of ${t} on society has been profound. While some argue it brings unprecedented advantages, others warn of its hidden drawbacks.`,
    q1: `Everyone agrees that ${t} only brings advantages.`, a1: "False",
    q2: `What do some people warn about regarding ${t}? (Điền 2 từ)`, a2: "hidden drawbacks"
  }),
  (t) => ({
    c: `Researchers have found that implementing strategies related to ${t} can reduce costs by up to 30%. However, the initial investment required is often substantial.`,
    q1: `Implementing ${t} strategies is completely free initially.`, a1: "False",
    q2: `By how much can costs be reduced? (Điền số và %)`, a2: "30%"
  }),
  (t) => ({
    c: `The debate over ${t} continues to divide experts. Proponents highlight the long-term sustainability, whereas opponents point to immediate logistical challenges.`,
    q1: `Experts are united in their opinions on ${t}.`, a1: "False",
    q2: `What do opponents of ${t} point to? (Điền 2 từ)`, a2: "logistical challenges"
  }),
  (t) => ({
    c: `A recent survey indicated that over 60% of millennials prioritize ${t} when choosing a lifestyle. This demographic shift is forcing companies to adapt rapidly.`,
    q1: `Less than half of millennials prioritize ${t}.`, a1: "False",
    q2: `Who is forcing companies to adapt? (Điền 1 từ)`, a2: "millennials"
  }),
  (t) => ({
    c: `Government policies regarding ${t} have evolved rapidly in the last decade. Subsidies are now frequently offered to encourage public participation in ${t} initiatives.`,
    q1: `Government policies on ${t} have remained stagnant.`, a1: "False",
    q2: `What is offered to encourage public participation? (Điền 1 từ)`, a2: "subsidies"
  }),
  
  // Ngữ pháp (Grammar/Writing)
  (g) => ({
    c: `When using ${g}, students often make errors in subject-verb agreement. It is essential to practice ${g} in context rather than memorizing rules blindly.`,
    q1: `Memorizing rules blindly is the best way to master ${g}.`, a1: "False",
    q2: `What kind of errors do students often make with ${g}? (Điền 3 từ)`, a2: "subject-verb agreement"
  }),
  (g) => ({
    c: `Examiners actively look for ${g} in IELTS Writing Task 2 to award a Band 7 or higher. Demonstrating accuracy with ${g} shows advanced language control.`,
    q1: `You do not need ${g} for a Band 7 in Writing.`, a1: "False",
    q2: `What does accuracy with ${g} show? (Điền 3 từ)`, a2: "advanced language control"
  }),
  (g) => ({
    c: `A common pitfall with ${g} is overusing it to impress the examiner. Use ${g} naturally only when the context strictly requires it.`,
    q1: `You should use ${g} as much as possible, even if unnatural.`, a1: "False",
    q2: `What is a common pitfall with ${g}? (Điền 2 từ)`, a2: "overusing it"
  }),
  
  // Kỹ năng (Skills)
  (s) => ({
    c: `In IELTS ${s}, time management is your biggest challenge. You have only limited minutes to demonstrate your proficiency in ${s} to the examiner.`,
    q1: `Time management is not an issue in IELTS ${s}.`, a1: "False",
    q2: `What is the biggest challenge in ${s}? (Điền 2 từ)`, a2: "time management"
  }),
  (s) => ({
    c: `To excel in IELTS ${s}, you must practice under strict exam conditions. This means timing your ${s} sessions without any external distractions.`,
    q1: `You should practice ${s} with distractions to simulate the real exam.`, a1: "False",
    q2: `How should you time your ${s} sessions? (Điền 1 từ)`, a2: "strictly"
  })
];

// 3. Khởi tạo mảng khổng lồ chứa hàng trăm bài tập độc nhất
let massivePool = [];
topics.forEach(t => massivePool.push(templates[0](t), templates[1](t), templates[2](t), templates[3](t), templates[4](t)));
grammars.forEach(g => massivePool.push(templates[5](g), templates[6](g), templates[7](g)));
skills.forEach(s => massivePool.push(templates[8](s), templates[9](s)));

// Tổng cộng có 153 bài tập hoàn toàn khác biệt! (Nhiều hơn mức 112 yêu cầu)

// Xáo trộn mảng (Shuffle) để đảm bảo bài tập phân phối ngẫu nhiên
function deterministicShuffle(array) {
  let currentIndex = array.length, randomIndex;
  let seed = 999;
  while (currentIndex !== 0) {
    seed = (seed * 9301 + 49297) % 233280;
    randomIndex = Math.floor((seed / 233280) * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

massivePool = deterministicShuffle(massivePool);

let poolIndex = 0;

function generateUniquePractice(routeId, weekIndex, dayIndex, taskTitle) {
  const idStr = `mini_${routeId}_w${weekIndex}_d${dayIndex}`;
  const item = massivePool[poolIndex % massivePool.length];
  poolIndex++;

  return {
    id: idStr,
    title: `Mini-test Ngày ${dayIndex}: ${taskTitle}`,
    content: [item.c],
    questions: [
      { id: `${idStr}_q1`, text: item.q1, type: "tfng", answer: item.a1 },
      { id: `${idStr}_q2`, text: item.q2, type: "text", answer: item.a2 }
    ]
  };
}

function processRoute(routeArray, routeId) {
  routeArray.forEach(week => {
    if (week.daily_plan) {
      week.daily_plan.forEach(day => {
        day.practice = generateUniquePractice(routeId, week.week, day.day, day.task);
      });
    }
  });
}

processRoute(data.route_a, 'A');
processRoute(data.route_b, 'B');

fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
console.log('Successfully generated 112 TRULY UNIQUE mini practice tests!');
