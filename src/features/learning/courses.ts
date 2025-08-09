import { Course } from "./types";

export const courses: Course[] = [
  {
    id: "aeration-cod",
    title: "Optimizing Aeration for COD Removal",
    description:
      "Learn how to tune aeration rates, SRT, and DO to maximize COD removal while minimizing energy use in CETPs.",
    level: "Intermediate",
    durationMins: 45,
    tags: ["COD", "Energy", "Aeration"],
    lessons: [
      { id: "l1", title: "Aeration fundamentals" },
      { id: "l2", title: "DO control & sensors" },
      { id: "l3", title: "SRT & F/M balancing" },
      { id: "l4", title: "Energy optimization tips" },
    ],
    quiz: {
      questions: [
        {
          id: "q1",
          prompt: "Which parameter most directly influences COD oxidation in aeration?",
          options: ["TDS", "DO", "Turbidity", "ORP"],
          answerIndex: 1,
        },
        {
          id: "q2",
          prompt: "Higher SRT generally leads to…",
          options: ["Lower sludge age", "More stable biomass", "Less nitrification", "Zero energy use"],
          answerIndex: 1,
        },
        {
          id: "q3",
          prompt: "Best practice for DO setpoint in most CETPs is around…",
          options: ["0.5 mg/L", "1.0 mg/L", "2.0 mg/L", "5.0 mg/L"],
          answerIndex: 2,
        },
      ],
    },
  },
  {
    id: "sludge-tds",
    title: "Sludge Management and TDS Control",
    description:
      "Understand sludge handling, dewatering, and strategies to manage TDS at source and during treatment.",
    level: "Beginner",
    durationMins: 35,
    tags: ["TDS", "Sludge", "Operations"],
    lessons: [
      { id: "l1", title: "What is TDS?" },
      { id: "l2", title: "Sludge generation & dewatering" },
      { id: "l3", title: "Source segregation strategies" },
      { id: "l4", title: "Monitoring & reporting" },
    ],
    quiz: {
      questions: [
        {
          id: "q1",
          prompt: "Primary contributor to TDS in CETP influent is often…",
          options: ["Stormwater", "Industrial salts & chemicals", "Sand", "Nitrates only"],
          answerIndex: 1,
        },
        {
          id: "q2",
          prompt: "Sludge dewatering improves…",
          options: ["pH", "Moisture content", "DO", "Flow"],
          answerIndex: 1,
        },
        {
          id: "q3",
          prompt: "TDS control is best addressed…",
          options: ["Only at the clarifier", "At source + process optimization", "Only with aeration", "With UV"],
          answerIndex: 1,
        },
      ],
    },
  },
  {
    id: "ph-coagulation",
    title: "pH Control and Coagulation Dosing",
    description:
      "Master pH adjustments and coagulant dosing to improve clarification without overshooting target ranges.",
    level: "Intermediate",
    durationMins: 40,
    tags: ["pH", "Coagulation", "Jar test"],
    lessons: [
      { id: "l1", title: "pH basics & instrumentation" },
      { id: "l2", title: "Coagulants & flocculation" },
      { id: "l3", title: "Jar testing workflow" },
      { id: "l4", title: "Dosing optimization" },
    ],
    quiz: {
      questions: [
        {
          id: "q1",
          prompt: "Coagulant dose is commonly optimized using…",
          options: ["pH probe offset", "Jar tests", "TDS strips", "ORP-only"],
          answerIndex: 1,
        },
        {
          id: "q2",
          prompt: "Most biological systems prefer pH around…",
          options: ["4-5", "6-9", "10-12", ">12"],
          answerIndex: 1,
        },
        {
          id: "q3",
          prompt: "Overdosing coagulant often leads to…",
          options: ["Higher DO", "Lower TDS", "Excess sludge & cost", "No change"],
          answerIndex: 2,
        },
      ],
    },
  },
];

export default courses;
