export interface Career {
  title: string;
  category: string;
  description: string;
  responsibilities: string[];
  soft_skills: string[];
  technical_skills: string[];
}

export const careersData: Career[] = [
  {
    "title": "3D Modeler",
    "category": "Arts, Entertainment, Design",
    "description": "A 3D modeler is a technical artist responsible for creating and manipulating 3D models of real-world objects. 3D modelers are in-demand in different industries such as architecture, engineering, commercial advertising, game, and entertainment.",
    "responsibilities": [
      "Interpreting concept art and sketches to create virtual characters, environment and props",
      "Working with artists, animators and programmers to execute projects",
      "Using 3D modeling applications to create texture, depth, and other elements to make realistic looking computer graphics.",
      "Creating storyboards to visualize realistic environments for the project"
    ],
    "soft_skills": ["Creativity", "Attention to Detail", "Communication", "Collaboration"],
    "technical_skills": ["Spatial Awareness", "3D Modelling Software", "Prototyping"]
  },
  {
    "title": "Animator",
    "category": "Arts, Entertainment, Design",
    "description": "An animator creates motion pictures that entertain, inform, and inspire viewers through storytelling. Animators can work in various contexts, including movies, television, and video games.",
    "responsibilities": [
      "Making stories available to viewers through moving art",
      "Coming up with ideas for animation elements such as characters, scenes, and backgrounds",
      "Creating character sketches for new animations",
      "Collaborating with other creatives, such as designers, photographers, and other animators, to create projects"
    ],
    "soft_skills": ["Creativity", "Story Telling", "Attention to Detail", "Continuous Learning"],
    "technical_skills": ["Visual Design", "Digital Illustration", "Sketching", "Adobe After Effects", "Adobe Creative Suite"]
  },
  {
    "title": "Application Developer",
    "category": "Software & Application Development",
    "description": "An application developer designs, creates, launches, and maintains software for specific operating systems, devices, or the web. They focus on a particular area, such as mobile app development, and work with project managers and technical teams to ensure software meets end-users' needs.",
    "responsibilities": [
      "Creating specifications and prototypes for applications before writing code",
      "Writing high-quality code to ensure the completion of the applications within the set time frame",
      "Testing and troubleshooting to ensure that applications are functional and bug-free",
      "Evaluating and updating existing applications to keep them up to date",
      "Documenting design and code for future reference and maintenance"
    ],
    "soft_skills": ["Problem Solving", "Creativity", "Attention to Detail", "Communication"],
    "technical_skills": ["Programming", "Mobile App Development", "Web Development", "Cross-Platform Development", "UI/UX Design", "Command-Line Utilities"]
  },
  {
    "title": "Artificial Intelligence Engineer",
    "category": "Software & Application Development",
    "description": "An AI engineer develops complex AI algorithms to mimic human brain functions, using programming, data science, and engineering skills. They gather data from different sources to create and test machine learning models and implement AI applications through API calls or embedded code, but they do not typically write code for scalable data sharing.",
    "responsibilities": [
      "Creating and managing AI infrastructure",
      "Conducting statistical analysis to guide decision-making",
      "Automating AI processes for data science team",
      "Building AI models and assist stakeholders with implementation",
      "Collaborating with other teams to promote AI best practices"
    ],
    "soft_skills": ["Communication", "Problem Solving", "Creativity", "Time Management"],
    "technical_skills": ["Programming", "Python", "R", "Java", "C++", "Statistics", "Numeracy", "Apache Spark", "Hadoop", "MongoDB", "Algorithms", "Frameworks"]
  },
  {
    "title": "Backend Developer",
    "category": "Software & Application Development",
    "description": "A back-end developer creates the foundation of websites or applications by writing code. They are experts who build and maintain the parts that process data and take actions on websites. Back-end developers handle data storage, security, and other server-side functions that you can't see.",
    "responsibilities": [
      "Building and maintaining websites",
      "Writing high-quality code",
      "Performing quality assurance (QA) testing",
      "Assessing efficiency and speed",
      "Troubleshooting and debugging"
    ],
    "soft_skills": ["Communication", "Problem Solving", "Critical Thinking"],
    "technical_skills": ["Programming", "Frameworks", "Databases", "Servers", "Application Program Interface (API)", "Accessibility and Security Clearance"]
  },
  {
    "title": "Brand Designer",
    "category": "Digital Marketing",
    "description": "A brand designer is responsible for developing a company's public image and messaging. They may create a brand for a new company or help redesign the brand of an existing company. They also use their creativity to promote their client's products and services.",
    "responsibilities": [
      "Designing logos, packaging, and promotional materials",
      "Creating a public image and message based on client briefs",
      "Developing visuals and designs that satisfy the standards of client and marketing teams",
      "Analyzing current design trends and watching out for new technologies and techniques"
    ],
    "soft_skills": ["Leadership", "Collaboration", "Time Management", "Attention to Detail", "Flexibility"],
    "technical_skills": ["Visual Design", "Social Media Marketing", "Digital Marketing", "Typography", "UX/UI Design"]
  },
  {
    "title": "Business Analyst",
    "category": "Business Management",
    "description": "Business analysts are involved in the organisation's processes and systems to identify areas of improvement and suggest solutions that help the business achieve its objectives. They research and gather data, analysing it, and presenting the results in a meaningful way.",
    "responsibilities": [
      "Identifying business requirements and developing solutions",
      "Gathering, analysing and documenting requirements",
      "Developing functional specifications and process flows",
      "Developing test plans and testing cases for system testing",
      "Identifying opportunities for process improvements"
    ],
    "soft_skills": ["Problem Solving", "Communication Skills", "Collaboration", "Leadership", "Adaptability", "Organization"],
    "technical_skills": ["Research And Analysis", "Data Analytics", "Data Visualization", "Data Storytelling"]
  },
  {
    "title": "Business Intelligence Analyst",
    "category": "Data",
    "description": "A business intelligence analyst uses data and tools to identify and monitor current and potential customers, and create business strategies that identify future markets and improve sales of existing products through technology trends.",
    "responsibilities": [
      "Developing and managing business intelligence solutions for the organization",
      "Providing reports to improve business processes",
      "Analyzing business requirements and processes and recommending them for implementation",
      "Creating and maintaining documentation that includes the design, requirements and user manuals for the organization",
      "Identifying the development needs for the purpose of streamlining and improving the operations of the organization for efficiency and profitability"
    ],
    "soft_skills": ["Communication", "Problem Solving", "Creativity", "Collaboration", "Time Management"],
    "technical_skills": ["Project Management", "Data Analysis", "IBM Cognos Analytics", "GoodData", "Microsoft Integrations Services", "Microsoft Power BI"]
  },
  {
    "title": "Business Intelligence Developer",
    "category": "Data",
    "description": "A business intelligence developer is responsible for designing, building, and maintaining the technological tools and systems that collect, analyze, and report on data. They create user-friendly tools and ensure data is relevant.",
    "responsibilities": [
      "Translating business needs to technical specifications",
      "Maintaining and supporting data analytics platforms",
      "Creating tools to store data",
      "Conducting unit testing and troubleshooting",
      "Evaluating and improving existing BI systems"
    ],
    "soft_skills": ["Collaboration", "Communication", "Attention to Detail", "Time Management", "Problem Solving", "Multitasking"],
    "technical_skills": ["Data Analytics", "Google Analytics", "Python", "Zoho Analytics", "Hotjar", "DataBox"]
  },
  {
    "title": "Cloud Engineer",
    "category": "Software & Application Development",
    "description": "A cloud engineer manages an organization's infrastructure and moves functions to a cloud-based platform. They transfer business applications to public, private, and hybrid clouds, collaborating with other professionals to design effective cloud solutions.",
    "responsibilities": [
      "Assisting organizations with migrating their computer systems to cloud-based platforms",
      "Configuring cloud infrastructure components like networking and security services",
      "Creating the applications and databases that perform on the cloud",
      "Monitoring cloud management and data storage services"
    ],
    "soft_skills": ["Communication", "Critical Thinking", "Leadership"],
    "technical_skills": ["Operating Systems", "Cloud Providers", "Cloud Applications", "Programming", "Application Programming Interfaces (APIs)", "Web Services", "Network Security", "Databases"]
  },
  {
    "title": "Community Manager",
    "category": "Business Management",
    "description": "A community manager oversees an organization's online presence, develops campaigns to build brand awareness, engages with stakeholders, and shapes the organization's strategy by monitoring community conversations and trends.",
    "responsibilities": [
      "Managing, monitoring, developing, and executing social media strategies across all accounts",
      "Managing content creation, publishing, and campaign scheduling, while ensuring consistent brand messaging across all channels and departments",
      "Tracking and reporting on analytics and performance of social media campaigns"
    ],
    "soft_skills": ["Communication", "Problem Solving", "Leadership", "Collaboration", "Organization", "Time Management"],
    "technical_skills": ["Social Media Marketing", "Digital Marketing", "Content Management Systems", "Graphic Design", "Video Editing", "Tracking and Analytics Tools"]
  },
  {
    "title": "Computer Systems Analyst",
    "category": "Software & Application Development",
    "description": "Computer systems analysts review a company's current technology and install new systems to improve efficiency. They research software features to assess cost-effectiveness and meet with leaders to determine long-term objectives. Some also perform quality assurance, testing, and code writing.",
    "responsibilities": [
      "Selecting and configuring software and hardware to design and implement new systems",
      "Supporting the management team in deciding if IT system and infrastructure upgrades are viable",
      "Enhancing existing computer systems with new functionality",
      "Choosing and setting up new hardware and software systems",
      "Overseeing new system installation and setup, and customizing them to meet business needs",
      "Conducting tests on new systems"
    ],
    "soft_skills": ["Communication", "Critical Thinking", "Problem Solving", "Time Management", "Collaboration"],
    "technical_skills": ["Programming", "Operating Systems", "Databases", "Cybersecurity Tools", "Software Development", "Integrated Development Environments (IDEs)", "Version Control Systems"]
  },
  {
    "title": "Content Creator",
    "category": "Online Entrepreneurship",
    "description": "A content creator produces different digital outputs for multiple platforms. These outputs can be videos, pictures, or illustrations that will be posted on YouTube, Facebook, and other media.",
    "responsibilities": [
      "Identify what topics and platforms are most relevant to the target group of consumers",
      "Create marketing content that directly targets a specific group of consumers (e.g. Gen Z, senior citizens, etc.)",
      "Coordinate with company's Marketing Team regarding what and how content must be created"
    ],
    "soft_skills": ["Adaptability", "Communication", "Time Management", "Creativity"],
    "technical_skills": ["Research and Analysis", "Visual Design", "Video Editing", "Adobe Photoshop", "Adobe Premiere Pro", "Adobe After Effects"]
  },
  {
    "title": "Copy Editor",
    "category": "Arts, Entertainment, Design",
    "description": "A copy editor reviews content in the form of texts to correct grammatical, punctuation, and spelling errors. Most often, a copy editor also ensures that correct format, proper fact-checking, and proofreading are done on the contents they are tasked to work on. The goal of the copy editor is to ensure content effectively reaches the target audience.",
    "responsibilities": [
      "Copy-editing assigned content for accuracy of facts, figures, and other types of information",
      "Reviewing, revising, and counter checking assigned works for accuracy and consistency",
      "Evaluating correctness, appropriateness, and suitability of the photos, graphs, maps, illustrations and various artworks used in projects",
      "Reporting to the publisher and designated representatives in accordance with applicable publisher policies and procedures"
    ],
    "soft_skills": ["Creativity", "Collaboration", "Time Management", "Communication"],
    "technical_skills": ["Research and Analysis", "Copywriting", "Search Engine Optimization"]
  },
  {
    "title": "Copywriter",
    "category": "Digital Marketing",
    "description": "Copywriters create engaging and clear materials for different advertising channels like websites, print ads, catalogs, and more. They produce appealing written content, proofread their work for accuracy, and research keywords. They also ensure all materials are consistent with the brand voice.",
    "responsibilities": [
      "Creating high-engagement, clear, and error-free content for a variety of media that reflects the company's identity",
      "Editing and modifying work to ensure all content reach high editorial standards",
      "Collaborating with PR and marketing departments to help projects with messaging and develop a variety of marketing materials",
      "Maintaining and upholding brand guidelines to ensure brand consistency"
    ],
    "soft_skills": ["Creativity", "Story Telling", "Problem Solving", "Collaboration", "Communication"],
    "technical_skills": ["Copywriting", "Proofreading", "Research and Analysis", "Social Media Marketing", "Search Engine Optimization"]
  }
];
