export interface CareerRating {
  creativity: number;          // 1-5 scale
  technicalIntensity: number;  // 1-5 scale
  collaboration: number;       // 1-5 scale
  communication: number;       // 1-5 scale
  leadership: number;          // 1-5 scale
  flexibility: number;         // 1-5 scale (Flexible vs Structured)
}

export interface CareerExpectation {
  considerations: string[];
}

export const careerExpectations: Record<string, CareerExpectation> = {
  "3D Modeler": {
    considerations: [
      "Requires high spatial reasoning and ability to visualize complex 3D structures.",
      "Often involves repetitive task cycles like texturing, mesh optimization, and poly-reduction.",
      "Requires close coordination with animators and game engines to ensure rendering performance."
    ]
  },
  "Animator": {
    considerations: [
      "Requires strong visual storytelling and an understanding of motion physics and expressions.",
      "Project timelines can be highly deadline-driven, requiring patience through multiple feedback loops.",
      "May work on long production cycles with high attention to frame-by-frame pacing."
    ]
  },
  "Application Developer": {
    considerations: [
      "Requires continuous learning of new software packages, programming syntax, and devices.",
      "Significant time is spent troubleshooting, debugging, and testing edge cases.",
      "Typically structured around tight developer sprints, product releases, and bug fixes."
    ]
  },
  "Artificial Intelligence Engineer": {
    considerations: [
      "Requires strong mathematical foundation, statistical knowledge, and database querying.",
      "Work involves dealing with highly abstract concepts, training models, and cleaning massive datasets.",
      "Often acts as a research-intensive role where solutions require deep analytical experimentation."
    ]
  },
  "Backend Developer": {
    considerations: [
      "Focuses on invisible logic, server performance, database scalability, and application security.",
      "Requires high attention to logic and data integrity; minor errors can disrupt the entire system.",
      "Often works closely with frontend developers and system admins to plan API layouts."
    ]
  },
  "Brand Designer": {
    considerations: [
      "Requires translating business targets and customer insights into visual shapes and systems.",
      "Must present visual concepts confidently and negotiate revisions with stakeholders.",
      "Work spans diverse channels, from digital sites to physical packaging layouts."
    ]
  },
  "Business Analyst": {
    considerations: [
      "Bridges the gap between business leaders and technical engineering teams.",
      "Involves high amounts of meeting facilitation, requirements gathering, and report writing.",
      "Must be comfortable navigating complex systems and resolving conflicting stakeholder goals."
    ]
  },
  "Business Intelligence Analyst": {
    considerations: [
      "Focuses on creating dashboard reports that show historical business performance.",
      "Requires translating database tables into clean visuals for high-level business executives.",
      "Relies on accuracy and data integrity to guide critical sales or marketing strategies."
    ]
  },
  "Business Intelligence Developer": {
    considerations: [
      "Involves building the underlying pipelines, database views, and tools for data analysts.",
      "Significant focus is on data warehouse optimization, data modeling, and scripting tools.",
      "Requires balancing database engineering needs with frontend user reporting tools."
    ]
  },
  "Cloud Engineer": {
    considerations: [
      "Focuses on architecture deployment, network security clearances, and server uptime monitoring.",
      "Requires on-call support or urgent response if critical live cloud services go down.",
      "Requires staying certified in major cloud platforms (AWS, Azure, GCP) which change fast."
    ]
  },
  "Community Manager": {
    considerations: [
      "Requires strong empathy, public-facing tone, and crisis communication management.",
      "Involves monitoring digital forums, answering feedback, and scheduling campaigns daily.",
      "Often works odd hours to manage digital emergencies or real-time event updates."
    ]
  },
  "Computer Systems Analyst": {
    considerations: [
      "Involves auditing hardware capacities, database limits, and network structures.",
      "Focuses on cost-benefit assessments and evaluating if upgrades match business targets.",
      "Requires presenting cost proposals and system changes to non-technical leaders."
    ]
  },
  "Content Creator": {
    considerations: [
      "Involves managing creative scriptwriting, recording edits, and digital publishing schedules.",
      "Success is closely tied to digital metrics, algorithmic shifts, and audience feedback.",
      "High flexibility but requires self-discipline to consistently produce original work."
    ]
  },
  "Copy Editor": {
    considerations: [
      "Requires exceptional focus on grammar, factual consistency, and stylistic guidelines.",
      "Work involves detailed review of other people's text, which can be highly repetitive.",
      "Works under strict editorial cycles to meet print or online publishing windows."
    ]
  },
  "Copywriter": {
    considerations: [
      "Focuses on writing persuasive text to drive specific actions (e.g. clicks, signups).",
      "Requires balancing creative wordplay with conversion targets and search indexing (SEO).",
      "Often works on diverse client topics, requiring rapid research into new domains."
    ]
  }
};

export const careerRatings: Record<string, CareerRating> = {
  "3D Modeler": {
    creativity: 5,
    technicalIntensity: 4,
    collaboration: 3,
    communication: 3,
    leadership: 2,
    flexibility: 4
  },
  "Animator": {
    creativity: 5,
    technicalIntensity: 3,
    collaboration: 4,
    communication: 4,
    leadership: 2,
    flexibility: 4
  },
  "Application Developer": {
    creativity: 3,
    technicalIntensity: 5,
    collaboration: 4,
    communication: 3,
    leadership: 3,
    flexibility: 3
  },
  "Artificial Intelligence Engineer": {
    creativity: 4,
    technicalIntensity: 5,
    collaboration: 3,
    communication: 3,
    leadership: 3,
    flexibility: 3
  },
  "Backend Developer": {
    creativity: 2,
    technicalIntensity: 5,
    collaboration: 3,
    communication: 3,
    leadership: 2,
    flexibility: 3
  },
  "Brand Designer": {
    creativity: 5,
    technicalIntensity: 3,
    collaboration: 4,
    communication: 4,
    leadership: 3,
    flexibility: 4
  },
  "Business Analyst": {
    creativity: 2,
    technicalIntensity: 3,
    collaboration: 5,
    communication: 5,
    leadership: 4,
    flexibility: 3
  },
  "Business Intelligence Analyst": {
    creativity: 3,
    technicalIntensity: 4,
    collaboration: 4,
    communication: 4,
    leadership: 3,
    flexibility: 3
  },
  "Business Intelligence Developer": {
    creativity: 2,
    technicalIntensity: 4,
    collaboration: 3,
    communication: 3,
    leadership: 3,
    flexibility: 3
  },
  "Cloud Engineer": {
    creativity: 2,
    technicalIntensity: 5,
    collaboration: 3,
    communication: 3,
    leadership: 3,
    flexibility: 3
  },
  "Community Manager": {
    creativity: 4,
    technicalIntensity: 2,
    collaboration: 5,
    communication: 5,
    leadership: 4,
    flexibility: 4
  },
  "Computer Systems Analyst": {
    creativity: 2,
    technicalIntensity: 4,
    collaboration: 4,
    communication: 4,
    leadership: 3,
    flexibility: 3
  },
  "Content Creator": {
    creativity: 5,
    technicalIntensity: 3,
    collaboration: 3,
    communication: 4,
    leadership: 3,
    flexibility: 5
  },
  "Copy Editor": {
    creativity: 3,
    technicalIntensity: 2,
    collaboration: 3,
    communication: 4,
    leadership: 2,
    flexibility: 4
  },
  "Copywriter": {
    creativity: 5,
    technicalIntensity: 2,
    collaboration: 4,
    communication: 5,
    leadership: 3,
    flexibility: 4
  }
};
