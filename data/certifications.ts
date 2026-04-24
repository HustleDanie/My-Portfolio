export type Certification = {
  title: string
  issuer: string
  date: string
  status: string
  credentialId: string
  skills: string[]
  image: string
  link: string
  description: string
  achievements: string[]
}

export const certifications: Certification[] = [
  {
    title: "B.Sc. Computer Science",
    issuer: "University of Ibadan",
    date: "2024",
    status: "Completed",
    credentialId: "UI-CS-2024",
    skills: ["Data Structures", "Algorithms", "Software Engineering", "Database Systems", "Computer Networks", "AI/ML", "Operating Systems"],
    image: "/images/Statementofresult.jpg",
    link: "",
    description:
      "Bachelor of Science degree in Computer Science from one of Nigeria's premier universities, providing a strong foundation in computing theory and practical software development.",
    achievements: [
      "Completed comprehensive coursework in core computer science fundamentals",
      "Developed proficiency in programming languages and software development",
      "Studied advanced topics in artificial intelligence and machine learning",
      "Gained expertise in database design and management systems",
      "Built practical projects applying theoretical knowledge to real-world problems",
    ],
  },
  {
    title: "Deep Learning Specialization",
    issuer: "Coursera • DeepLearning.AI",
    date: "2024",
    status: "Completed",
    credentialId: "DL2024-UC-789",
    skills: ["Neural Networks", "Deep Learning", "TensorFlow", "Computer Vision", "NLP", "CNN", "RNN"],
    image: "/images/coursera-deep-learning-cert.png",
    link: "https://www.coursera.org/verify/specialization/CHYQIRP105AD",
    description:
      "Comprehensive specialization covering neural networks, deep learning, and practical applications in computer vision and natural language processing.",
    achievements: [
      "Built and trained deep neural networks from scratch",
      "Implemented CNN architectures for image recognition",
      "Developed sequence models using RNN and LSTM",
      "Applied transfer learning and fine-tuning techniques",
      "Mastered optimization algorithms and hyperparameter tuning",
    ],
  },
  {
    title: "Deep Learning A-Z 2025: Neural Networks, AI & ChatGPT Prize",
    issuer: "Udemy • Kirill Eremenko & Hadelin de Ponteves",
    date: "2025",
    status: "Completed",
    credentialId: "UC-88c204d5-a614-4fc4-8777-ede7f5bd343d",
    skills: ["ANN", "CNN", "RNN", "LSTM", "Self-Organizing Maps", "AutoEncoders", "TensorFlow", "PyTorch"],
    image: "/images/udemy-deep-learning-az-cert.png",
    link: "https://ude.my/UC-88c204d5-a614-4fc4-8777-ede7f5bd343d",
    description:
      "Hands-on 22.5-hour course covering supervised and unsupervised deep learning techniques across vision, sequence, and generative tasks, updated with modern transformer and ChatGPT-era workflows.",
    achievements: [
      "Built Artificial Neural Networks for tabular classification problems",
      "Implemented Convolutional Neural Networks for image recognition",
      "Developed Recurrent Neural Networks and LSTMs for time-series forecasting",
      "Applied Self-Organizing Maps and Boltzmann Machines for unsupervised learning",
      "Constructed AutoEncoders for dimensionality reduction and recommender systems",
    ],
  },
  {
    title: "LangChain - Develop LLM Powered Applications with LangChain",
    issuer: "Udemy • Eden Marco",
    date: "2025",
    status: "Completed",
    credentialId: "UC-d6d0d5e7-aae7-489b-97fc-99f7f5c38fa6",
    skills: ["LangChain", "LLMs", "RAG", "Vector Stores", "Agents", "Prompt Engineering", "OpenAI", "Python"],
    image: "/images/udemy-langchain-cert.png",
    link: "https://ude.my/UC-d6d0d5e7-aae7-489b-97fc-99f7f5c38fa6",
    description:
      "Practical 9.5-hour course on building production-ready LLM applications with LangChain, covering chains, agents, memory, and Retrieval-Augmented Generation pipelines.",
    achievements: [
      "Built end-to-end LLM applications using the LangChain framework",
      "Implemented Retrieval-Augmented Generation pipelines with vector databases",
      "Designed multi-step chains and tool-using agents for complex tasks",
      "Integrated OpenAI models with custom prompt templates and output parsers",
      "Applied memory and conversational state to multi-turn LLM workflows",
    ],
  },
]
