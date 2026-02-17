import { Project, ProjectCategory } from '../types';

export const projects: Project[] = [
    {
        id: 'quantum-ledger',
        title: 'Quantum Ledger',
        description: 'A hyper-secure, quantum-resistant blockchain infrastructure for next-gen financial institutions.',
        longDescription: 'Built a distributed ledger system using post-quantum cryptography algorithms, capable of processing 100k+ TPS with sub-second finality. Implemented custom consensus mechanism and smart contract runtime.',
        category: ProjectCategory.BLOCKCHAIN,
        technologies: ['Rust', 'WebAssembly', 'Substrate', 'Cryptography', 'Kubernetes'],
        imageUrl: '/projects/quantum-ledger.jpg',
        demoUrl: 'https://quantum-ledger-demo.echelon.dev',
        githubUrl: 'https://github.com/echelon/quantum-ledger',
        status: 'completed',
        completedDate: '2025-11',
        featured: true
    },
    {
        id: 'neural-canvas',
        title: 'Neural Canvas',
        description: 'An AI-powered creative suite that transforms natural language into production-ready design systems.',
        longDescription: 'Integrated GPT-4 Vision and DALL-E 3 with custom fine-tuned models to generate complete UI component libraries from text descriptions. Includes real-time collaboration and version control.',
        category: ProjectCategory.AI_ML,
        technologies: ['Python', 'PyTorch', 'React', 'WebGL', 'FastAPI', 'Redis'],
        imageUrl: '/projects/neural-canvas.jpg',
        demoUrl: 'https://neural-canvas.echelon.dev',
        status: 'completed',
        completedDate: '2025-09',
        featured: true
    },
    {
        id: 'nexus-protocol',
        title: 'Nexus Protocol',
        description: 'Cross-chain DeFi aggregator with MEV protection and gas optimization.',
        longDescription: 'Architected a multi-chain protocol aggregating liquidity across 15+ blockchains. Implemented custom routing algorithms that reduce gas costs by 40% and protect users from MEV attacks.',
        category: ProjectCategory.BLOCKCHAIN,
        technologies: ['Solidity', 'Hardhat', 'Ethers.js', 'The Graph', 'Node.js'],
        imageUrl: '/projects/nexus-protocol.jpg',
        demoUrl: 'https://nexus.finance',
        githubUrl: 'https://github.com/echelon/nexus-protocol',
        status: 'completed',
        completedDate: '2025-07',
        featured: true
    },
    {
        id: 'aurora-engine',
        title: 'Aurora Engine',
        description: 'Real-time 3D rendering engine for immersive web experiences using WebGPU.',
        longDescription: 'Built a high-performance rendering engine leveraging WebGPU for photorealistic graphics in the browser. Supports PBR materials, ray tracing, and dynamic global illumination.',
        category: ProjectCategory.CREATIVE,
        technologies: ['TypeScript', 'WebGPU', 'WGSL', 'Three.js', 'React Three Fiber'],
        imageUrl: '/projects/aurora-engine.jpg',
        demoUrl: 'https://aurora-engine.echelon.dev',
        githubUrl: 'https://github.com/echelon/aurora-engine',
        status: 'completed',
        completedDate: '2025-05',
        featured: false
    },
    {
        id: 'sentinel-ai',
        title: 'Sentinel AI',
        description: 'Autonomous security monitoring system with ML-powered threat detection.',
        longDescription: 'Developed an intelligent security platform that uses machine learning to detect anomalies and potential threats in real-time. Processes 10M+ events per second with 99.9% accuracy.',
        category: ProjectCategory.INFRASTRUCTURE,
        technologies: ['Go', 'TensorFlow', 'Kafka', 'Elasticsearch', 'Grafana'],
        imageUrl: '/projects/sentinel-ai.jpg',
        status: 'completed',
        completedDate: '2025-03',
        featured: false
    },
    {
        id: 'prism-mobile',
        title: 'Prism',
        description: 'Privacy-first mobile messaging app with end-to-end encryption and zero-knowledge architecture.',
        longDescription: 'Created a secure messaging platform that stores zero user data on servers. Implements Signal Protocol with custom extensions for group chats and media sharing.',
        category: ProjectCategory.MOBILE,
        technologies: ['React Native', 'TypeScript', 'libsignal', 'SQLCipher', 'WebRTC'],
        imageUrl: '/projects/prism-mobile.jpg',
        demoUrl: 'https://prism-app.io',
        status: 'completed',
        completedDate: '2025-01',
        featured: false
    },
    {
        id: 'flux-platform',
        title: 'Flux Platform',
        description: 'Serverless data pipeline orchestration with visual workflow builder.',
        longDescription: 'Built a comprehensive data engineering platform that allows teams to build, deploy, and monitor complex ETL pipelines through an intuitive visual interface. Auto-scales to handle petabyte-scale workloads.',
        category: ProjectCategory.INFRASTRUCTURE,
        technologies: ['TypeScript', 'AWS Lambda', 'DynamoDB', 'Step Functions', 'React Flow'],
        imageUrl: '/projects/flux-platform.jpg',
        demoUrl: 'https://flux-platform.echelon.dev',
        status: 'in-progress',
        featured: false
    },
    {
        id: 'morpheus-rag',
        title: 'Morpheus RAG',
        description: 'Enterprise-grade RAG system with multi-modal embeddings and hybrid search.',
        longDescription: 'Architected a production RAG pipeline supporting text, images, and code. Implements advanced retrieval strategies including dense, sparse, and semantic search with re-ranking.',
        category: ProjectCategory.AI_ML,
        technologies: ['Python', 'LangChain', 'Pinecone', 'OpenAI', 'FastAPI'],
        imageUrl: '/projects/morpheus-rag.jpg',
        githubUrl: 'https://github.com/echelon/morpheus-rag',
        status: 'completed',
        completedDate: '2024-12',
        featured: false
    }
];
